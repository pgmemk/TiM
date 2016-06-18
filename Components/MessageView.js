'use strict';

var utils = require('../utils/utils');
var translate = utils.translate
var constants = require('@tradle/constants');
var ArticleView = require('./ArticleView');
// var FromToView = require('./FromToView');
var PhotoList = require('./PhotoList');
var PhotoView = require('./PhotoView');
var ShowPropertiesView = require('./ShowPropertiesView');
var ShowMessageRefList = require('./ShowMessageRefList');
// var MoreLikeThis = require('./MoreLikeThis');
var NewResource = require('./NewResource');
// var VerificationButton = require('./VerificationButton');
var Actions = require('../Actions/Actions');
var Reflux = require('reflux');
var Store = require('../Store/Store');
var reactMixin = require('react-mixin');
var extend = require('extend');
var ResourceMixin = require('./ResourceMixin');
var buttonStyles = require('../styles/buttonStyles');
var HELP_COLOR = 'blue'
var NetworkInfoProvider = require('./NetworkInfoProvider')
// import Prompt from 'react-native-prompt'

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  PropTypes,
  Alert,
} from 'react-native'

import React, { Component } from 'react'

class MessageView extends Component {
  props: {
    navigator: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    verification: PropTypes.object,
    // verify: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      resource: props.resource,
      isConnected: this.props.navigator.isConnected,
      promptVisible: false
    };
    var currentRoutes = this.props.navigator.getCurrentRoutes();
    var currentRoutesLength = currentRoutes.length;
    if (currentRoutes[currentRoutesLength - 1].rightButtonTitle)
      currentRoutes[currentRoutesLength - 1].onRightButtonPress = this.verifyOrCreateError.bind(this)
  }
  componentDidMount() {
    this.listenTo(Store, 'onAction');
  }
  onAction(params) {
    if (params.action === 'addVerification' ||  params.action === 'addAdditionalInfo') {
      this.props.navigator.pop();
      Actions.messageList({
        modelName: constants.TYPES.MESSAGE,
        to: params.resource
      });
    }
    else if (params.action == 'connectivity') {
      this.setState({isConnected: params.isConnected})
    }
  }
  verifyOrCreateError() {
    let resource = this.props.resource
    let model = utils.getModel(resource[constants.TYPE]).value
    if (utils.isEmpty(this.state.errorProps)) {
      Alert.alert(
        'Verify ' + utils.getDisplayName(resource, model.properties),
        null,
        [
          {text: 'Ok', onPress: this.verify.bind(this)},
          {text: 'Cancel', onPress: () => console.log('Canceled!')},
        ]
      )
    }
    else {
      Alert.alert(
        'Please correct the errors and re-submit',
        null,
        [
          {text: 'Ok', onPress: this.createError.bind(this)},
          {text: 'Cancel', onPress: () => console.log('Canceled!')},
        ]
      )
      // AlertIOS.prompt(
      //   'Please write a message to the customer',
      //   null,
      //   [
      //     {text: 'Submit', onPress: this.createError.bind(this)},
      //     {text: 'Cancel', null},
      //   ]
      // )
   }
  }
  createError(text) {
    let errors = []
    for (let p in this.state.errorProps) {
      errors.push({name: p, error: this.state.errorProps[p] || 'Please correct this property'})
    }
    let resource = this.props.resource

    let formError = {
      _t: 'tradle.FormError',
      errors: errors,
      prefill: resource,
      from: resource.to,
      to: resource.from,
      message: text || translate('pleaseCorrectTheErrors')
    }
    Actions.addMessage(formError)
    this.props.navigator.pop()

  }
  onCheck(prop, message) {
    let errorProps = {}

    if (this.state.errorProps)
      extend(errorProps, this.state.errorProps)
    if (this.state.errorProps  &&  this.state.errorProps[prop.name])
      delete errorProps[prop.name]
    else
      errorProps[prop.name] = message
    this.setState({errorProps: errorProps})
  }

  getRefResource(resource, prop) {
    var model = utils.getModel(this.props.resource[constants.TYPE]).value;

    this.state.prop = prop;
    this.state.propValue = utils.getId(resource.id);
    this.showRefResource(resource, prop)
    // Actions.getItem(resource.id);
  }
  render() {
    var resource = this.state.resource;
    var modelName = resource[constants.TYPE];
    var model = utils.getModel(modelName).value;
    var date = utils.formatDate(new Date(resource.time))
    var inRow = resource.photos ? resource.photos.length : 0
    if (inRow  &&  inRow > 4)
      inRow = 5;
    var actionPanel =
          <ShowMessageRefList resource={resource}
                              navigator={this.props.navigator}
                              additionalInfo={this.additionalInfo.bind(this)}
                              currency={this.props.currency}
                              bankStyle={this.props.bankStyle} />
        // <FromToView resource={resource} navigator={this.props.navigator} />
        // <MoreLikeThis resource={resource} navigator={this.props.navigator}/>
    var verificationTxID, separator
    if (this.props.verification  &&  this.props.verification.txId) {
      verificationTxID =
          <View style={{padding :10, flex: 1}}>
            <Text style={styles.title}>Verification Transaction Id</Text>
            <Text style={styles.verification} onPress={this.onPress.bind(this, 'http://tbtc.blockr.io/tx/info/' + this.props.verification.txId)}>{this.props.verification.txId}</Text>
          </View>
      separator = <View style={styles.separator}></View>
    }
    else {
      verificationTxID = <View />
      separator = <View />
    }

    // let verificationButton = this.props.isVerifier
    //                        ? <VerificationButton resource={resource} verify={this.verify.bind(this)} verificationList={this.showResources.bind(this)} edit={this.edit.bind(this)} />
    //                        : <View />
    // let editButton = this.props.isVerifier
    //                ? <VerificationButton resource={resource} edit={this.edit.bind(this)} />
    //                : <View />
    // let message = <View style={{padding: 10}}>
    //                 <Text style={styles.itemTitle}>click done for verifying or check the properties that should be corrected and click Done button</Text>
    //               </View>
    return (
      <ScrollView  ref='this' style={styles.container}>
        <NetworkInfoProvider connected={this.state.isConnected} />
        <View style={styles.band}><Text style={styles.date}>{date}</Text></View>
        <View style={styles.photoBG}>
          <PhotoView resource={resource} navigator={this.props.navigator}/>
        </View>
        {actionPanel}
        <View style={{marginTop: -3}}>
          <PhotoList photos={resource.photos} resource={resource} isView={true} navigator={this.props.navigator} numberInRow={inRow}/>
          <View style={styles.rowContainer}>
            <View><Text style={resource.message ? styles.itemTitle : {height: 0}}>{resource.message}</Text></View>
            <ShowPropertiesView navigator={this.props.navigator}
                                resource={resource}
                                bankStyle={this.props.bankStyle}
                                errorProps={this.state.errorProps}
                                currency={this.props.currency}
                                checkProperties={this.props.isVerifier ? this.onCheck.bind(this) : null}
                                excludedProperties={['tradle.Message.message', 'time', 'photos']}
                                showRefResource={this.getRefResource.bind(this)}/>
            {separator}
            {verificationTxID}
          </View>
        </View>
      </ScrollView>
    );
  }
  onPress(url) {
    this.props.navigator.push({
      id: 7,
      component: ArticleView,
      backButtonTitle: translate('back'),
      passProps: {url: url}
    });
  }

  additionalInfo(resource, prop, msg) {
    var rmodel = utils.getModel(resource[constants.TYPE]).value;
    msg = msg.length ? msg : 'Please submit more info';
    var r = {
      _t: prop.items.ref,
      from: utils.getMe(),
      to: resource.from,
      time: new Date().getTime(),
      message: msg
    };
    r[prop.items.backlink] = {
      id: resource[constants.TYPE] + '_' + resource[constants.ROOT_HASH],
      title: utils.getDisplayName(resource, rmodel.properties)
    }
    Actions.addVerification(r);
  }

  verify() {
    var resource = this.props.resource;
    var model = utils.getModel(resource[constants.TYPE]).value;
    // this.props.navigator.pop();
    var me = utils.getMe();
    var from = this.props.resource.from;
    var verificationModel = constants.TYPES.VERIFICATION // model.properties.verifications.items.ref;
    var verification = {
      document: {
        id: resource[constants.TYPE] + '_' + resource[constants.ROOT_HASH] + '_' + resource[constants.CUR_HASH],
        title: resource.message ? resource.message : model.title
      },
      to: {
        id: from.id,
        title: from.title
      },
      from: {
        id: me[constants.TYPE] + '_' + me[constants.ROOT_HASH] + '_' + me[constants.CUR_HASH],
        title: utils.getDisplayName(me, utils.getModel(me[constants.TYPE]).value.properties)
      },
      time: new Date().getTime()
    }
    verification[constants.TYPE] = verificationModel;

    if (verificationModel === constants.TYPES.VERIFICATION)
      Actions.addVerification(verification);
    else {
      this.props.navigator.replace({
        title: resource.message,
        id: 4,
        component: NewResource,
        backButtonTitle: resource.firstName,
        rightButtonTitle: 'Done',
        titleTextColor: '#7AAAC3',
        passProps: {
          model: utils.getModel(verificationModel).value,
          resource: verification,
          // callback: this.createVerification.bind(self)
        }
      });
    }
  }
  createVerification(resource) {
    Actions.addVerification(resource, true);
  }
}
reactMixin(MessageView.prototype, Reflux.ListenerMixin);
reactMixin(MessageView.prototype, ResourceMixin);

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    margin: 5,
    marginBottom: 0,
    color: '#7AAAC3'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
    marginHorizontal: 7,
    color: '#9b9b9b'
  },
  verification: {
    fontSize: 16,
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
    backgroundColor: '#CEE7F5',
    alignItems: 'center',
  },
  band: {
    height: 30,
    backgroundColor: '#f7f7f7',
    alignSelf: 'stretch',
    // paddingRight: 10,
    // paddingTop: 3,
    // marginTop: -10,
  },
  rowContainer: {
    paddingBottom: 10,
    // paddingHorizontal: 10
  },
  date: {
    fontSize: 14,
    marginTop: 5,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#2E3B4E'
    // color: '#b4c3cb'
  },
});

module.exports = MessageView;
  // edit() {
  //   let rmodel = utils.getModel('tradle.FormError').value
  //   let title = translate(rmodel)
  //   // let form = this.props.resource

  //   this.props.navigator.push({
  //     title: title,
  //     id: 4,
  //     component: MessageView,
  //     // titleTextColor: '#999999',
  //     backButtonTitle: translate('back'),
  //     rightButtonTitle: translate('done'),
  //     passProps: {
  //       model: rmodel,
  //       createFormError: true,
  //       resource: this.props.resource,
  //       // resource: {
  //       //   to: form.from,
  //       //   from: form.to,
  //       //   _t: 'tradle.FormError',
  //       //   prefill: form,
  //       //   message: translate('pleaseCorrectTheErrors', translate(rmodel), form.from.formatted)
  //       // },
  //     }
  //   })
  // }
