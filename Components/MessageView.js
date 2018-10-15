console.log('requiring MessageView.js')
'use strict';

import React, { Component } from 'react'
import {
  // StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import Reflux from 'reflux'
import reactMixin from 'react-mixin'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';
import { makeResponsive } from 'react-native-orient'

import constants from '@tradle/constants'
const {
  TYPE,
} = constants
const {
  VERIFICATION,
  FORM
} = constants.TYPES

import utils, { translate } from '../utils/utils'
import ArticleView from './ArticleView'
import PhotoList from './PhotoList'
import PhotoView from './PhotoView'
// import StringChooser from './StringChooser'
import ShowRefList from './ShowRefList'
import VerificationView from './VerificationView'
import NewResource from './NewResource'
import PageView from './PageView'
import Actions from '../Actions/Actions'
import Store from '../Store/Store'
import ResourceMixin from './ResourceMixin'
import defaultBankStyle from '../styles/defaultBankStyle.json'
import platformStyles from '../styles/platform'
import buttonStyles from '../styles/buttonStyles'
import StyleSheet from '../StyleSheet'

const NAV_BAR_CONST = Platform.OS === 'ios' ? 64 : 56

class MessageView extends Component {
  static displayName = 'MessageView';
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    verification: PropTypes.object,
    // verify: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      resource: props.resource,
      isConnected: props.navigator.isConnected,
      // promptVisible: false,
      isLoading: utils.isStub(props.resource),
      // showDetails: true,
      showDetails: false,
      bankStyle: props.bankStyle || defaultBankStyle
    };
    let currentRoutes = props.navigator.getCurrentRoutes();
    let len = currentRoutes.length;
    if (!currentRoutes[len - 1].onRightButtonPress  &&  currentRoutes[len - 1].rightButtonTitle) {
      if (this.props.isReview)
        currentRoutes[len - 1].onRightButtonPress = props.action
      else
        currentRoutes[len - 1].onRightButtonPress = this.verifyOrCreateError.bind(this)
    }
    this.createVerification = this.createVerification.bind(this)
    this.showVerification = this.showVerification.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onPageLayout = this.onPageLayout.bind(this)
    this.getRefResource = this.getRefResource.bind(this)

  }
  componentWillMount() {
    // if (this.props.resource.id)
    let {resource, isReview, search, application} = this.props
    if (isReview)
      return
    if (resource.id) {
      Actions.getItem({resource, search, application})
      return
    }
    let m = utils.getModel(resource[TYPE])
    let vCols = utils.getViewCols(m)
    if (!vCols)
      return
    Actions.getItem({resource, search, application})
  }

  componentDidMount() {
    this.listenTo(Store, 'onAction');
  }
  onAction(params) {
    let { action, currency, style, country, backlink, isConnected } = params
    if (action == 'connectivity') {
      this.setState({isConnected: isConnected})
      return
    }
    if (!params.resource)
      return
    let { bankStyle, application, resource, search } = this.props
    if (utils.getId(params.resource) !== utils.getId(resource))
      return
    if (action === 'verifyOrCorrect') {
      this.verifyOrCreateError()
      return
    }
     if (action === 'getItem') {
      let state = {
        resource: params.resource,
        isLoading: false
      }
      if (currency)
        state.currency = currency
      if (country)
        state.country = country
      if (style) {
        let styleMerged = {}
        if (bankStyle)
          _.extend(styleMerged, bankStyle)
        else
          _.extend(styleMerged, defaultBankStyle)
        _.extend(styleMerged, style)
        state.bankStyle = styleMerged
      }
      this.setState(state)
    }
    else if (action === 'exploreBacklink') {
      if (backlink !== this.state.backlink || params.backlinkAdded) {
        let r = params.resource || this.state.resource
        this.setState({backlink: backlink, backlinkList: params.list || r[backlink], showDetails: false, showDocuments: false, resource: r})
        Actions.getItem({resource: r, application, search: search  ||  application != null})
      }
    }
    else if (action === 'showDetails')
      this.setState({showDetails: true, backlink: null, backlinkList: null, showDocuments: false})
    else if (action === 'showDocuments')
      this.setState({showDocuments: true, backlink: null, backlinkList: params.list, showDetails: false})
  }

  addNew(itemBl) {
    this.setState({hideMode: false})
    let me = utils.getMe()

    let { defaultPropertyValues, bankStyle, navigator, search } = this.props
    let resource = this.state.resource
    let ref = itemBl.items.ref
    // resource if present is a container resource as for example subreddit for posts or post for comments
    // if to is passed then resources only of this container need to be returned
    let r = {[TYPE]: ref};
    let rType = resource[TYPE]
    // let rModel = utils.getModel(rType)

    let blModel = utils.getModel(ref)
    // let refProps = utils.getPropertiesWithAnnotation(blModel, 'ref')
    // for (let p in refProps) {
    //   let pref = refProps[p].ref
    //   if (pref === rType  ||  rModel.subClassOf === pref) {
    //     containerProp = p
    //     break
    //   }
    // }

    let refProps = utils.getPropertiesWithRef(rType, blModel)
    let containerProp = refProps.filter(prop => prop.name === itemBl.items.backlink)[0].name

    r[containerProp] = utils.buildRef(resource)

    // if (this.props.resource.relatedTo  &&  props.relatedTo) // HACK for now for main container
    //   r.relatedTo = this.props.resource.relatedTo;
    r.from = me
    r.to = utils.isItem(r) ? me : resource.to
    r._context = resource._context
    let model = utils.getModel(r[TYPE])

    navigator.push({
      title: model.title,
      id: 4,
      component: NewResource,
      backButtonTitle: 'Back',
      rightButtonTitle: 'Done',
      passProps: {
        model: model,
        bankStyle: /*this.state.bankStyle ||*/ bankStyle,
        resource: r,
        prop: itemBl,
        search,
        // containerResource: resource,
        doNotSend: true,
        defaultPropertyValues: defaultPropertyValues,
        currency: this.props.currency || this.state.currency,
        callback: (resource) => {
          navigator.pop()
        }
      }
    })
  }

  verifyOrCreateError() {
    let { application } = this.props
    let { resource } = this.state
    if (utils.isEmpty(this.state.errorProps)) {
      Alert.alert(
        translate('verifyPrompt'), // + utils.getDisplayName(resource),
        null,
        [
          {text: 'Cancel', onPress: () => console.log('Canceled!')},
          {text: 'Ok', onPress: this.createVerification},
        ]
      )
    }
    else {
      let properties = utils.getModel(this.state.resource[TYPE]).properties
      let msg = ''
      for (let p in this.state.errorProps)
        msg += msg ? ', ' + properties[p].title : properties[p].title
      msg = translate('pleaseCorrectFields', msg)
      let from = (application ? application.applicant : resource.from).title || 'Applicant'
      Alert.alert(
        translate('sendEditRequestPrompt', from),
        null,
        // msg,
        [
          {text: 'Cancel', onPress: () => console.log('Canceled!')},
          {text: 'Ok', onPress: this.createError.bind(this, msg)},
        ]
      )
   }
 }
 createError(text) {
    let errors = []
    for (let p in this.state.errorProps) {
      errors.push({name: p, error: this.state.errorProps[p] || 'Please correct this property'})
    }
    let { resource, application, navigator } = this.props
    let isReadOnlyChat = utils.isReadOnlyChat(resource)
    let context, to
    if (application) {
      to = application.applicant
      context = application._context
    }
    else {
      to = isReadOnlyChat ? resource._context : resource.from
      context = resource._context
    }
    let formError = {
      _t: 'tradle.FormError',
      errors: errors,
      prefill: resource,
      from: utils.getMe(),// resource.to,
      to: to,
      _context: context,
      message: text || translate('pleaseCorrectTheErrors')
    }
    Actions.addMessage({msg: formError, application: application})
    navigator.pop()
  }
  onCheck(prop, message) {
    let errorProps = {}

    if (this.state.errorProps)
      _.extend(errorProps, this.state.errorProps)
    if (this.state.errorProps  &&  this.state.errorProps[prop.name])
      delete errorProps[prop.name]
    else
      errorProps[prop.name] = message
    this.setState({errorProps: errorProps})
  }

  getRefResource(resource, prop) {
    this.state.prop = prop;
    // this.state.propValue = utils.getId(resource.id);
    this.showRefResource(resource, prop)
    // Actions.getItem(resource.id);
  }

  showVerification(resource, document) {
    // Case when resource is a model. In this case the form for creating a new resource of this type will be displayed
    let model = utils.getModel(document[TYPE]);
    let title = model.title; //utils.getDisplayName(resource, model.properties);
    let newTitle = title;
    // Check if I am a customer or a verifier and if I already verified this resource
    let isVerifier = !resource && utils.isVerifier(document)
    let route = {
      title: newTitle,
      id: 5,
      backButtonTitle: 'Back',
      component: MessageView,
      parentMeta: model,
      passProps: {
        bankStyle: this.state.bankStyle || this.props.bankStyle,
        resource: resource,
        currency: this.props.currency,
        document: document,
        isVerifier: isVerifier
      }
    }
    this.props.navigator.push(route);
  }
  render() {
    let { backlink, bankStyle, resource } = this.state
    if (this.state.isLoading)
      return this.showLoading({bankStyle, component: MessageView})
    let { lensId, style, navigator, currency, isVerifier, defaultPropertyValues, verification, application } = this.props

    let rModel = utils.getModel(utils.getType(resource))
    let isWrapper = utils.getPrefillProperty(rModel)
    let model = isWrapper ? rModel : utils.getLensedModel(resource, lensId);
    // let model = search ? rModel : utils.getLensedModel(resource, lensId);
    let isVerification = model.id === VERIFICATION
    let isVerificationTree = isVerification &&  (resource.method || (resource.sources  &&  resource.sources.length))
    let isForm = model.subClassOf === FORM
    let t = resource.dateVerified ? resource.dateVerified : resource._time
    let date
    if (isForm  &&  t)
      date = utils.formatDate(new Date(t), true)
    else
      date = t ? utils.formatDate(new Date(t)) : utils.formatDate(new Date())
    // let photos = resource.photos
    let mainPhoto, inRow
    let photos = utils.getResourcePhotos(model, resource)
    if (!backlink) {
      let mainPhotoProp = utils.getMainPhotoProperty(model)
      if (mainPhotoProp) {
        mainPhoto = resource[mainPhotoProp]
        if (photos) {
          if (mainPhotoProp !== 'photos')
            photos = photos.filter(p => p.url !== mainPhoto)
        }
      }
      else if (!photos  ||  !photos.length) {
        photos = utils.getResourcePhotos(model, resource)
        mainPhoto = photos && photos[0]
      }
      if (!mainPhoto  &&  photos)
        mainPhoto = photos[0]

      inRow = photos ? photos.length - 1 : 0
      if (inRow  &&  inRow > 4)
        inRow = 5;
    }
    let propertySheet
    bankStyle = bankStyle || style
    let styles = createStyles({bankStyle})
    if (isVerificationTree)
      propertySheet = <VerificationView navigator={navigator}
                                        resource={resource}
                                        bankStyle={bankStyle}
                                        currency={currency}
                                        showVerification={this.showVerification}/>
    // Don't show photostrip on backlink tab
    let photoList
    if (!backlink && photos  &&  photos.length > 1) {
      // Don't show the main photo in the strip
      photoList = photos.slice()
      photoList.splice(0, 1)
    }

    let photoStrip = <View style={styles.photoListStyle}>
                      <PhotoList photos={photoList} resource={resource} isView={true} navigator={navigator} numberInRow={inRow} />
                    </View>


    let content = <View style={styles.rowContainer}>
                    {msg}
                    {propertySheet}
                    {separator}
                    {verificationTxID}
                  </View>

    let checkProps
    if (!isVerification && isVerifier) /* && !utils.isReadOnlyChat(resource)*/
      checkProps = this.onCheck
    let actionPanel, allowToAddBacklink
    if (/*this.props.isReview  || */ isVerificationTree)
      actionPanel = content
    else {
      let m = model, r = resource
      let allowToAddBacklinks = utils.getPropertiesWithAnnotation(m, 'allowToAdd')
      for (let p in allowToAddBacklinks) {
        if (allowToAddBacklinks[p].items) {
          allowToAddBacklinks = allowToAddBacklinks[p]
          break
        }
      }
                                 // parentResource={isPrefill && resource}

      actionPanel = <ShowRefList {...this.props}
                                 backlink={backlink || allowToAddBacklink}
                                 resource={r}
                                 backlinkList={this.state.backlinkList}
                                 showDetails={this.state.showDetails}
                                 model={m}
                                 application={application}
                                 showDocuments={this.state.showDocuments}
                                 errorProps={this.state.errorProps}
                                 bankStyle={bankStyle}
                                 onPageLayout={this.onPageLayout}
                                 isVerifier={isVerifier}
                                 showRefResource={this.getRefResource}
                                 defaultPropertyValues={defaultPropertyValues}
                                 checkProperties={checkProps} >
                      {content}
                    </ShowRefList>
    }
        // <FromToView resource={resource} navigator={this.props.navigator} />
        // <MoreLikeThis resource={resource} navigator={this.props.navigator}/>
    let verificationTxID, separator
    if (verification  &&  verification.txId) {
      verificationTxID =
          <View style={styles.txIdView}>
            <Text style={styles.title}>Verification Transaction Id</Text>
            <Text style={styles.verification} onPress={this.onPress.bind(this, 'https://tbtc.blockr.io/tx/info/' + verification.txId)}>{verification.txId}</Text>
          </View>
      separator = <View style={styles.separator}></View>
    }

    let msg
    if (resource.message  &&  resource.message.length)
      msg = <View><Text style={styles.itemTitle}>{resource.message}</Text></View>

    // let isVerification = this.props.resource[TYPE] === constants.TYPES.VERIFICATION
    // borderBottomColor: bankStyle.productRowBgColor
    let dateView
    if (isVerificationTree || isForm) {
      dateView = <View style={styles.band}>
                  <Text style={styles.dateLabel}>{isVerificationTree ? translate(model.properties.dateVerified, model) : translate('creationDate')}</Text>
                  <Text style={styles.dateValue}>{date}</Text>
                </View>
    }
    let title = isVerification  ? this.makeViewTitle(model, styles) : null
    let footer = this.renderFooter(backlink ||  allowToAddBacklink, styles)
    let contentSeparator = utils.getContentSeparator(bankStyle)
    let bigPhoto
    if (mainPhoto  &&  !checkProps)
      bigPhoto = <View style={styles.photoBG} ref='bigPhoto'>
                   <PhotoView resource={resource} mainPhoto={mainPhoto} navigator={navigator}/>
                 </View>
    let height = utils.dimensions(MessageView).height - 80
    return (
      <PageView style={[platformStyles.container, {height}]} separator={contentSeparator} bankStyle={bankStyle} >
      <ScrollView
        ref='messageView'
        keyboardShouldPersistTaps="always">
        {dateView}
        {bigPhoto}
        {photoStrip}
        {actionPanel}
      </ScrollView>
        {title}
        {footer}
      </PageView>
    );
  }
  onPageLayout(height, scrollDistance) {
    let scrollTo = height + scrollDistance - NAV_BAR_CONST
    if (this.refs.bigPhoto) {
      this.refs.bigPhoto.measure((x,y,w,h,pX,pY) => {
        this.refs.messageView.scrollTo({y: scrollTo - h, animated: true})
      })
    }
    else
      this.refs.messageView.scrollTo({y: scrollTo})
  }
  makeViewTitle(model, styles) {
    let rTitle
    // let bankStyle = this.state.bankStyle || this.props.bankStyle
    if (this.props.bankStyle  &&  !this.props.bankStyle.logoNeedsText)
      rTitle = <View style={styles.viewTitle}>
                 <Text style={styles.viewTitleText}>{translate(model)}</Text>
               </View>
    return rTitle
  }

  renderFooter(backlink, styles) {
    if (!backlink  ||  !backlink.allowToAdd)
      return
    let me = utils.getMe()
    let resource = this.props.resource

    // Allow employee to add backlinks only to the resource he created
    if (me  &&  me.isEmployee  &&  !utils.isMyMessage({resource})) //  &&  resource[TYPE] !== DRAFT_APPLICATION)
      return

    let icon = 'md-add' //Platform.OS === 'ios' ?  'md-more' : 'md-menu'
    let color = Platform.OS === 'android' ? 'red' : '#ffffff'
    return (
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.addNew(backlink)}>
            <View style={[buttonStyles.menuButton, {opacity: 0.4}]}>
              <Icon name={icon}  size={33}  color={color}/>
            </View>
          </TouchableOpacity>
        </View>
     )
  }

  onPress(url) {
    this.props.navigator.push({
      id: 7,
      component: ArticleView,
      backButtonTitle: 'Back',
      passProps: {url: url}
    });
  }
  createVerification() {
    let { navigator, resource, application } = this.props
    navigator.pop();
    let model = utils.getModel(resource[TYPE]);
    let me = utils.getMe();
    let from = resource.from;
    let document = {
      id: utils.getId(resource),
      title: resource.message ? resource.message : model.title
    }
    let to = [utils.getId(from)]
    if (utils.isReadOnlyChat(resource))
      to.push(utils.getId(resource.to))
    let r = {
      [TYPE]: VERIFICATION,
      document: document,
      from: me,
      to: resource.to,
    }
    if (resource._context)
      r._context = resource._context
    else if (application  &&  application._context)
      r._context = application._context
    let params = {to: to, r: r}
    if (r._context)
      params.context = r._context
    Actions.addVerification(params)
  }
}
reactMixin(MessageView.prototype, Reflux.ListenerMixin);
reactMixin(MessageView.prototype, ResourceMixin);
MessageView = makeResponsive(MessageView)

var createStyles = utils.styleFactory(MessageView, function ({ dimensions, bankStyle }) {
  return StyleSheet.create({
    itemTitle: {
      fontSize: 18,
      margin: 5,
      marginBottom: 0,
      color: '#7AAAC3'
    },
    title: {
      fontSize: 18,
      // fontFamily: 'Avenir Next',
      marginHorizontal: 7,
      color: '#9b9b9b'
    },
    verification: {
      fontSize: 18,
      marginVertical: 3,
      marginHorizontal: 7,
      color: '#7AAAC3',
    },
    separator: {
      height: 1,
      backgroundColor: '#eeeeee',
      marginHorizontal: 15
    },
    photoBG: {
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
      borderColor: bankStyle.linkColor,
      borderTopWidth: 1,
      borderBottomWidth: 1
    },
    photoListStyle: {
      flexDirection: 'row',
      alignSelf: 'center',
      // paddingBottom: 4,
    },
    footer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-end',
      height: 45,
      paddingHorizontal: 10,
      backgroundColor: 'transparent',
      // borderColor: '#eeeeee',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#cccccc',
    },

    band: {
      height: 30,
      backgroundColor: '#fafafa',
      // borderColor:  '#f7f7f7',
      borderBottomWidth: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderBottomColor: '#eee',
      // paddingRight: 10,
      // paddingTop: 3,
      // marginTop: -10,
    },
    date: {
      fontSize: 14,
      marginTop: 5,
      marginRight: 10,
      alignSelf: 'flex-end',
      color: '#2E3B4E'
      // color: '#b4c3cb'
    },
    dateLabel: {
      fontSize: 14,
      marginTop: 5,
      marginRight: 10,
      color: '#999999'
      // color: '#b4c3cb'
    },
    dateValue: {
      fontSize: 14,
      marginTop: 5,
      marginRight: 10,
      color: '#555555'
      // color: '#b4c3cb'
    },
    txIdView: {
      padding :10,
      flex: 1
    },
    viewTitle: {
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: bankStyle.navBarBackgroundColor,
      borderTopColor: bankStyle.contextBackgroundColor,
      borderTopWidth: StyleSheet.hairlineWidth,
      height: 45,
      justifyContent: 'center'
    },
    viewTitleText: {
      fontSize: 24,
      color:  bankStyle.contextBackgroundColor
    }
  })
})

module.exports = MessageView;
/* Draft variant
  addNew(itemBl) {
    this.setState({hideMode: false})
    let me = utils.getMe()

    let { defaultPropertyValues, bankStyle, navigator, search } = this.props
    let resource = this.state.resource
    let ref = itemBl.items.ref
    if (ref === FORM_PREFILL) {
      let rmodel = utils.getModel(ref)
      navigator.push({
        title: translate('formChooser'),
        id: 33,
        component: StringChooser,
        backButtonTitle: 'Back',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        passProps: {
          strings:   utils.getModel(resource.requestFor).forms,
          bankStyle: this.props.bankStyle,
          isReplace: true,
          callback:  (val) => {
            let model = utils.getModel(val)
            navigator.replace({
              title: translate(model),
              id: 4,
              component: NewResource,
              backButtonTitle: 'Back',
              rightButtonTitle: 'Done',
              passProps: {
                model: model,
                prop: rmodel.properties.prefill,
                bankStyle: this.state.bankStyle || bankStyle,
                containerResource: {[TYPE]: FORM_PREFILL, draft: resource, from: me, to: resource.to},
                resource: {[TYPE]: val },
                currency: this.props.currency || this.state.currency,
              }
            })
          }
        }
      });

      return
    }

    // resource if present is a container resource as for example subreddit for posts or post for comments
    // if to is passed then resources only of this container need to be returned
    let r = {[TYPE]: ref};
    let rType = resource[TYPE]
    let rModel = utils.getModel(rType)

    let blModel = utils.getModel(ref)
    // let refProps = utils.getPropertiesWithAnnotation(blModel, 'ref')
    // for (let p in refProps) {
    //   let pref = refProps[p].ref
    //   if (pref === rType  ||  rModel.subClassOf === pref) {
    //     containerProp = p
    //     break
    //   }
    // }

    let refProps = utils.getPropertiesWithRef(rType, blModel)
    let containerProp = refProps.filter(prop => prop.name === itemBl.items.backlink)[0].name

    r[containerProp] = utils.buildRef(resource)

    // if (this.props.resource.relatedTo  &&  props.relatedTo) // HACK for now for main container
    //   r.relatedTo = this.props.resource.relatedTo;
    r.from = me
    r.to = utils.isItem(r) ? me : resource.to
    r._context = resource._context
    let model = utils.getModel(r[TYPE])

    navigator.push({
      title: model.title,
      id: 4,
      component: NewResource,
      backButtonTitle: 'Back',
      rightButtonTitle: 'Done',
      passProps: {
        model: model,
        bankStyle: bankStyle,
        resource: r,
        prop: itemBl,
        search,
        // containerResource: resource,
        doNotSend: true,
        defaultPropertyValues: defaultPropertyValues,
        currency: this.props.currency || this.state.currency,
        callback: (resource) => {
          navigator.pop()
        }
      }
    })
  }

*/