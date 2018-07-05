console.log('requiring ApplicationView.js')
'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import { LazyloadScrollView } from 'react-native-lazyload'
import reactMixin from 'react-mixin'
import Icon from 'react-native-vector-icons/Ionicons'
import { makeResponsive } from 'react-native-orient'

import constants from '@tradle/constants'
const {
  TYPE,
  ROOT_HASH
} = constants
const {
  PROFILE,
  IDENTITY,
  MESSAGE
} = constants.TYPES

import utils, {
  getFontSize as fontSize,
  translate
} from '../utils/utils'
import ApplicationTabs from './ApplicationTabs'
import PageView from './PageView'
import Actions from '../Actions/Actions'
import Reflux from 'reflux'
import Store from '../Store/Store'
import ResourceMixin from './ResourceMixin'
import MessageList from './MessageList'
import ENV from '../utils/env'
import StyleSheet from '../StyleSheet'
import HomePageMixin from './HomePageMixin'
import NetworkInfoProvider from './NetworkInfoProvider'

import platformStyles from '../styles/platform'
import buttonStyles from '../styles/buttonStyles'
import debug from '../utils/debug'
import ConversationsIcon from './ConversationsIcon'

const ASSIGN_RM = 'tradle.AssignRelationshipManager'
const DENIAL = 'tradle.ApplicationDenial'
const APPROVAL = 'tradle.ApplicationApproval'
const APPLICATION = 'tradle.Application'

const ScrollView = LazyloadScrollView
const LAZY_ID = 'lazyload-list'
let INSTANCE_ID = 0

class ApplicationView extends Component {
  static displayName = 'ApplicationView';
  constructor(props) {
    super(props);
    this._lazyId = LAZY_ID + INSTANCE_ID++

    let me = utils.getMe()
    let { resource, action, navigator } = props
    this.state = {
      resource: resource,
      isLoading: true,
      isConnected: props.navigator.isConnected,
    }
    let currentRoutes = navigator.getCurrentRoutes()
    let len = currentRoutes.length

    this.openChat = this.openChat.bind(this)
    this.approve = this.approve.bind(this)
    this.deny = this.deny.bind(this)

    if (!currentRoutes[len - 1].onRightButtonPress  &&  currentRoutes[len - 1].rightButtonTitle)
      currentRoutes[len - 1].onRightButtonPress = action.bind(this)
  }
  componentWillMount() {
    let { resource, search, backlink } = this.props

    // if (resource.id  ||  resource[TYPE] === PROFILE  ||  resource[TYPE] === ORGANIZATION)
    // if (resource.id || !resource[constants.ROOT_HASH])
    let rtype = utils.getType(resource)
    let m = utils.getModel(rtype)
    if (m.inlined)
      return
    if (m.subClassOf  &&  utils.getModel(m.subClassOf).inlined)
      return
    Actions.getItem( {resource, search, backlink} )
  }
  componentDidMount() {
    this.listenTo(Store, 'handleEvent');
  }
  handleEvent(params) {
    let {resource, action, error, to, backlink, application} = params

    let isMe = utils.isMe(this.props.resource)
    if (resource  &&  resource[ROOT_HASH] !== this.props.resource[ROOT_HASH])
      return

    switch (action) {
    case 'getItem':
      this.setState({
        resource: resource,
        isLoading: false
      })
      break
    case 'exploreBacklink':
      if (backlink !== this.state.backlink || params.backlinkAdded) {
        if (backlink.items.backlink) {
          let r = params.resource || this.state.resource
          this.setState({backlink: backlink, showDetails: false, showDocuments: false}) //, resource: r})
          Actions.getItem({resource: r, application: resource, search: true, backlink: backlink})
        }
        else
          this.setState({backlink: backlink, showDetails: false})
      }
      break
    case 'showDetails':
      if (this.state.backlink)
        this.setState({showDetails: true, backlink: null})
      break
    case 'assignRM_Confirmed':
      if (application[ROOT_HASH] === this.props.resource[ROOT_HASH]) {
        Actions.hideModal()
        this.setState({resource: application, isLoading: false})
      }
      break
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.orientation !== nextProps.orientation    ||
           this.state.resource    !== nextState.resource       ||
           this.state.isLoading   !== nextState.isLoading      ||
           this.state.backlink    !== nextState.backlink
  }

  render() {
    let { resource, backlink, isLoading, hasRM, isConnected } = this.state
    let { navigator, bankStyle, currency, dimensions } = this.props

    hasRM = hasRM  ||  resource.relationshipManagers
    let isRM = hasRM  &&  utils.isRM(resource)
    let styles = createStyles({ hasRM, isRM, bankStyle })

    let network = <NetworkInfoProvider connected={isConnected} resource={resource} />
    if (isLoading)
      return this.showLoading({bankStyle, component: ApplicationView})
    let modelName = resource[TYPE];
    let model = utils.getModel(modelName)

    let me = utils.getMe()

    let { width } = utils.dimensions(ApplicationView)

    let bgcolor = Platform.OS === 'android' ? 'transparent' : bankStyle.linkColor
    let color = Platform.OS !== 'android' ? '#ffffff' : bankStyle.linkColor
    let iconName = 'ios-person-add-outline'
    let icolor
    let rmStyle
    if (hasRM) {
      iconName = 'ios-person'
      icolor = '#ffffff'
      rmStyle = styles.hasRM
    }
    else {
      icolor = bankStyle.linkColor
      rmStyle = styles.noRM
    }

    let assignRM
    if (!isRM)
      assignRM = <TouchableOpacity onPress={() => this.assignRM()}>
                    <View style={[buttonStyles.menuButton, rmStyle]}>
                      <Icon name={iconName} color={icolor} size={fontSize(30)}/>
                    </View>
                  </TouchableOpacity>
    let routes = navigator.getCurrentRoutes()
    let home
    if (__DEV__)
       home = <TouchableOpacity onPress={() => {navigator.jumpTo(routes[1])}} style={styles.homeButton}>
                  <View style={[buttonStyles.homeButton]}>
                    <Icon name='ios-home' color={bankStyle.linkColor} size={33}/>
                  </View>
                </TouchableOpacity>
    let footer = <View style={styles.footer}>
                  <View style={styles.row}>
                    {home}
                    <TouchableOpacity onPress={this.openChat} style={styles.openChatPadding}>
                      <View style={[buttonStyles.conversationButton, styles.conversationButton]}>
                        <ConversationsIcon size={30} color={color} style={styles.conversationsIcon} />
                      </View>
                    </TouchableOpacity>
                    {assignRM}
                  </View>
                </View>
    let contentSeparator = utils.getContentSeparator(bankStyle)
    return (
      <PageView style={platformStyles.container} separator={contentSeparator} bankStyle={bankStyle}>
        <ScrollView  ref='this' style={{width: utils.getContentWidth(ApplicationView), alignSelf: 'center'}} name={this._lazyId}>
        {network}
          <ApplicationTabs  lazy={this._lazyId}
                            resource={resource}
                            navigator={navigator}
                            currency={currency}
                            backlink={backlink}
                            showDetails={this.state.showDetails}
                            approve={this.approve}
                            deny={this.deny}
                            bankStyle={bankStyle}/>
        </ScrollView>
       {footer}
      </PageView>
     );
  }

  assignRM() {
    let resource = this.state.resource || this.props.resource
    let me = utils.getMe()
    if (utils.isRM(resource)) {
      Alert.alert(translate('youAreTheRM'))
      return
    }
    Alert.alert(
      translate('areYouSureYouWantToServeThisCustomer', resource.from.title),
      null,
      [
        {text: translate('cancel'), onPress: () => {}},
        {text: translate('Yes'), onPress: () => {
          let me = utils.getMe()
          let msg = {
            [TYPE]: ASSIGN_RM,
            employee: {
              id: utils.makeId('tradle.Identity', me[ROOT_HASH])
            },
            application: resource,
            _context: resource._context,
            from: me,
            to: resource.to
          }
          Actions.addChatItem({resource: msg})
          this.setState({hasRM: true})
          Actions.showModal({title: 'In progress...', showIndicator: true})
        }}
      ]
    )
  }
  openChat() {
    let { navigator, bankStyle } = this.props
    let resource = this.state.resource || this.props.resource
    let me = utils.getMe()
    let title
    let name = resource.applicantName || resource.applicant.title
    if (name)
      title = name  + '  →  ' + me.organization.title
    else
      title = me.organization.title
    let style = resource.style ? this.mergeStyle(resource.style) : bankStyle
    let route = {
      component: MessageList,
      id: 11,
      backButtonTitle: 'Back',
      title: title,
      passProps: {
        resource: resource._context,
        filter: '',
        search: true,
        modelName: MESSAGE,
        application: resource,
        currency: resource.currency,
        bankStyle: style,
      }
    }
    navigator.push(route)
  }
  approve() {
    let resource = this.state.resource || this.props.resource
    console.log('Approve was chosen!')
    // if (resource.status === 'approved') {
    //   Alert.alert('Application was approved')
    //   return
    // }
    let isApplication = resource[TYPE] === APPLICATION
    let applicant = isApplication ? resource.applicant : resource.from
    let approvalPhrase = applicant.title ? 'approveApplicationFor' : 'approveApplication'
    Alert.alert(
      translate(approvalPhrase, applicant.title || ''),
      null,
      [
        {text: translate('cancel'), onPress: () => {
          console.log('Canceled!')
        }},
        {text: translate('Approve'), onPress: () => {
          Actions.hideModal()
          let title = utils.makeModelTitle(utils.getModel(resource.product || resource.requestFor))
          let me = utils.getMe()
          let msg = {
            [TYPE]: APPROVAL,
            application: resource,
            message: 'Your application for \'' + title + '\' was approved',
            _context: isApplication ? resource._context : resource,
            from: me,
            to: applicant
          }
          Actions.addMessage({msg: msg})
        }}
      ]
    )
  }
  deny() {
    let resource = this.state.resource || this.props.resource
    let isApplication = resource[TYPE] === APPLICATION
    let applicantTitle = utils.getDisplayName(resource.applicant || resource.from)
    Alert.alert(
      translate('denyApplication', applicantTitle),
      null,
      [
        {text: translate('cancel'), onPress: () => {
          console.log('Canceled!')
        }},
        {text: translate('Deny'), onPress: () => {
          Actions.hideModal()
          let title = utils.makeModelTitle(utils.getModel(resource.product ||  resource.requestFor))
          let me = utils.getMe()
          let msg = {
            [TYPE]: DENIAL,
            application: resource,
            message: 'Your application for \'' + title + '\' was denied',
            _context: isApplication ? resource._context : resource,
            from: me,
            to: resource.applicant || resource.from
          }
          Actions.addMessage({msg: msg})
        }}
      ]
    )

  }
}

reactMixin(ApplicationView.prototype, Reflux.ListenerMixin);
reactMixin(ApplicationView.prototype, ResourceMixin);
reactMixin(ApplicationView.prototype, HomePageMixin)
ApplicationView = makeResponsive(ApplicationView)

var createStyles = utils.styleFactory(ApplicationView, function ({ dimensions, hasRM, isRM, bankStyle }) {
  let bgcolor = Platform.OS === 'android' ? 'transparent' : bankStyle.linkColor
  let color = Platform.OS !== 'android' ? '#ffffff' : bankStyle.linkColor
  let paddingRight = Platform.OS === 'android' ? 0 : 10
  return StyleSheet.create({
    row: {
      flex: 1,
      paddingHorizontal: 10,
      marginRight: -10,
      flexDirection: 'row',
      // alignItems: 'flex-end'
      // justifyContent: 'space-between'
    },
    footer: {
      height: 45,
      backgroundColor: '#efefef',
      borderColor: '#eeeeee',
      borderWidth: 1,
      alignItems: 'flex-end',
      paddingRight: 10,
    },
    conversationsIcon: {
      marginLeft: 9,
      marginRight: 9
    },
    hasRM: {
      backgroundColor: isRM && bankStyle.linkColor || '#CA9DF2',
      opacity: 0.5
    },
    noRM: {
      backgroundColor: '#ffffff',
      opacity: 0.5,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: bankStyle.linkColor
    },
    homeButton: {
      alignSelf: 'flex-start',
      paddingRight: paddingRight
    },
    openChatPadding: {
      paddingRight: paddingRight
    },
    conversationButton: {
      backgroundColor: bgcolor,
      borderColor: bgcolor,
      borderWidth: 1,
      opacity: 0.5
    }
  })
})

module.exports = ApplicationView;
  // chosenApprove() {
  //   let resource = this.props.resource
  //   console.log('Approve was chosen!')
  //   if (!resource._appSubmitted)
  //     Alert.alert('Application is not yet submitted')
  //   else if (resource.status === 'approved') {
  //     Alert.alert('Application was approved')
  //     return
  //   }
  //   let applicant = resource[TYPE] === APPLICATION ? utils.getDisplayName(resource.applicant) : resource.from.title
  //   Actions.showModal({
  //     title: translate('approveApplication', translate(applicant)),
  //     buttons: [
  //       {
  //         text: translate('cancel'),
  //         onPress: () => {  Actions.hideModal(); console.log('Canceled!')}
  //       },
  //       {
  //         text: translate('Approve'),
  //         onPress: () => {
  //           console.log('Approve was chosen!')
  //           if (!resource._appSubmitted)
  //             Alert.alert('Application is not yet submitted')
  //           else
  //             this.approve(resource)
  //         }
  //       },
  //     ]
  //   })
  // }
  // chosenDeny() {
  //   let resource = this.props.resource
  //   if (resource.status === 'denied') {
  //     Alert.alert('Application was denied')
  //     return
  //   }
  //   let applicant = resource[TYPE] === APPLICATION ? utils.getDisplayName(resource.applicant) : resource.from.title
  //   Actions.showModal({
  //     title: translate('denyApplication', translate(applicant)),
  //     buttons: [
  //       {
  //         text: translate('cancel'),
  //         onPress: () => {  Actions.hideModal(); console.log('Canceled!')}
  //       },
  //       {
  //         text: translate('Deny'),
  //         onPress: () => {
  //           console.log('Deny was chosen!')
  //           this.deny(resource)
  //         }
  //       },
  //     ]
  //   })
  // }
