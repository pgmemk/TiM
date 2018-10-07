console.log('requiring ShowPropertiesView.js')
'use strict';

import Icon from 'react-native-vector-icons/Ionicons'
import reactMixin from 'react-mixin'
import dateformat from 'dateformat'

import constants from '@tradle/constants'
import utils, { translate } from '../utils/utils'
import RowMixin from './RowMixin'
import ResourceMixin from './ResourceMixin'
import defaultBankStyle from '../styles/defaultBankStyle.json'
var NOT_SPECIFIED = '[not specified]'
var DEFAULT_CURRENCY_SYMBOL = '£'
var TERMS_AND_CONDITIONS = 'tradle.TermsAndConditions'

const PHOTO = 'tradle.Photo'
const METHOD = 'tradle.Method'
const PARTIAL = 'tradle.Partial'

const {
  TYPE,
  ROOT_HASH
} = constants
const {
  IDENTITY,
  MONEY,
  ENUM
} = constants.TYPES

import Prompt from 'react-native-prompt'
import StyleSheet from '../StyleSheet'
import {
  // StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native'
import PropTypes from 'prop-types'

import React, { Component } from 'react'
class ShowPropertiesView extends Component {
  static displayName = 'ShowPropertiesView';

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    checkProperties: PropTypes.bool,
    currency: PropTypes.string,
    bankStyle: PropTypes.object,
    errorProps: PropTypes.object,
    excludedProperties: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      promptVisible: null,
      uncheck: null
    }
  }

  render() {
    let viewCols = this.getViewCols()
    return (
      <View style={{paddingBottom: 100}} key={this.getNextKey()}>
        {viewCols}
      </View>
    );
    // return (
    //   <ScrollView ref={(scroll) => {this.scroll = scroll}} style={{paddingBottom: 100}} key={this.getNextKey}>
    //     {viewCols}
    //   </ScrollView>
    // );
  }
  // scrollToBottom() {
  //   this.scroll.scrollToEnd()
  // }
  shouldComponentUpdate(nextProps, nextState) {
    // Prompt for employee to write a correction message
    if (this.state.promptVisible !== nextState.promptVisible)
      return true
    if (this.state.uncheck !== nextState.uncheck)
      return true
    if (this.props.resource !== nextProps.resource)
      return true
    if (this.props.isVerifier !== nextProps.isVerifier)
      return true
    // if (!this.props.errorProps  ||  !nextProps.errorProps)
    //   return true
    return this.props.errorProps != nextProps.errorProps
  }
  getViewCols(resource, model) {
    if (!resource)
      resource = this.props.resource
    let { checkProperties, excludedProperties, bankStyle, currency, showRefResource } = this.props
    var modelName = utils.getType(resource)
    if (!model)
      model = this.props.model  ||  utils.getModel(modelName)
    if (model.id !== modelName  &&  utils.getModel(modelName).subClassOf !== model.id)
      model = utils.getModel(modelName)
    var vCols

    let styles = createStyles({bankStyle: bankStyle || defaultBankStyle})
    var props = model.properties;
    // if (checkProperties) {
    //   vCols = utils.getEditCols(model)
    //   if (vCols)
    //     vCols = Object.keys(vCols)
    // }
    // else {
      vCols = model.viewCols
      if (vCols)
        vCols = utils.ungroup(model, vCols)
    // }
    // see if it is inlined resource like 'prefill' in tradle.FormPrefill and show all of the properties
    if (!resource[ROOT_HASH]) {
      if (!vCols)
        vCols = []
      for (let p in resource) {
        if (p.charAt(0) !== '_'  && props[p]  &&  vCols.indexOf(p) === -1)
          vCols.push(p)
      }
    }

    if (excludedProperties) {
      var mapped = [];
      excludedProperties.forEach((p) =>  {
        if (props[p]) {
          mapped.push(p);
        }
      })
      excludedProperties = mapped;
    }

    if (!vCols)
      vCols = utils.getViewCols(model)
    var isMessage = utils.isMessage(this.props.resource)
    if (!isMessage) {
      var len = vCols.length;
      for (var i=0; i<len; i++) {
        if (props[vCols[i]].displayName) {
          vCols.splice(i, 1);
          len--;
        }
      }
    }
    let isPartial = model.id === PARTIAL
    let isMethod = model.subClassOf === METHOD
    let me = utils.getMe()

    var viewCols = []
    vCols.forEach((p) => {
      if (excludedProperties  &&  excludedProperties.indexOf(p) !== -1)
        return;
      if (utils.isHidden(p, resource))
        return
      var pMeta = props[p];
      // if (pMeta.type === 'array'  &&  pMeta.items.ref  &&  !pMeta.inlined)
      //   return
      var val = resource[p];
      if (pMeta.range === 'json') {
        if (!val  ||  utils.isEmpty(val))
          return
        let jsonRows = []

        let isOnfido = isMethod  &&  resource.api  &&  resource.api.name === 'onfido'

        let params = {prop: pMeta, json: val, isView: true, jsonRows, isOnfido}
        // let params = {prop: pMeta, json: val, isView: true, jsonRows: jsonRows, isOnfido: isOnfido, scrollToBottom: this.scrollToBottom.bind(this)}
        let jVal = this.showJson(params)
        if (jVal   &&  typeof !Array.isArray(jVal))
          viewCols.push(jVal)
        else if (jVal.length)
          viewCols.push(
            <View key={this.getNextKey()}>
               <View style={isDirectionRow ? {flexDirection: 'row'} : {flexDirection: 'column'}}>
                 {jVal}
               </View>
             </View>
             )
        return
      }
      var isRef;
      var isItems
      var isDirectionRow;
      // var isEmail
      let isUndefined = !val  &&  (typeof val === 'undefined')
      if (isUndefined) {
        if (pMeta.displayAs)
          val = utils.templateIt(pMeta, resource);
        else if (checkProperties) {
          if (p.indexOf('_group') === p.length - 6) {
            viewCols.push(
              <View style={{padding: 15}} key={this.getNextKey()}>
                <View style={styles.groupStyle}>
                  <Text style={styles.groupStyleText}>{translate(pMeta, model)}</Text>
                </View>
              </View>
            )
            return
          }
          else
            val = NOT_SPECIFIED
        }
        else
          return;
      }
      else if (pMeta.type === 'date')
        val = utils.formatDate(val)
      else if (pMeta.ref) {
        if (pMeta.ref === PHOTO) {
          if (vCols.length === 1  &&  resource._time)
            viewCols.push(
              <View  key={this.getNextKey()} style={{padding: 10}}>
                <Text style={styles.title}>{translate('Date')}</Text>
                <Text style={[styles.title, styles.description]}>{dateformat(new Date(resource._time), 'mmm d, yyyy')}</Text>
              </View>
            )
          if (!checkProperties)
            return
          val = <Image source={{uri: val.url}} resizeMode='cover' style={styles.thumb} />
        }
        else if (pMeta.ref == MONEY) {
          let CURRENCY_SYMBOL = currency ? currency.symbol || currency : DEFAULT_CURRENCY_SYMBOL
          let c = utils.normalizeCurrencySymbol(val.currency)
          val = (c || CURRENCY_SYMBOL) + val.value
        }
        else if (pMeta.ref === IDENTITY) {
          let title = val.title
          if (!title)
            title = val.id.split('_')[0] === me[ROOT_HASH] ? 'Me' : 'Not me'
          val = <Text style={[styles.title, styles.linkTitle]}>{title}</Text>
        }
        else if (pMeta.inlined  ||  utils.getModel(pMeta.ref).inlined) {
          if (utils.isStub(val)) {
            val[TYPE] = utils.getType(val.id)
            val = <TouchableOpacity onPress={showRefResource.bind(this, val, pMeta)}>
                    <Text style={[styles.title, styles.linkTitle]}>{val.title}</Text>
                  </TouchableOpacity>
            isRef = true
          }
          else {
            if (!val[TYPE])
              val[TYPE] = pMeta.ref
            let pViewCols = this.getViewCols(val, utils.getModel(val[TYPE]), bankStyle)
            if (pViewCols.length)
              pViewCols.forEach((v) => viewCols.push(v))
            else {
              val = <TouchableOpacity onPress={showRefResource.bind(this, val, pMeta)}>
                      <Text style={[styles.title, styles.linkTitle]}>{utils.getDisplayName(val)}</Text>
                    </TouchableOpacity>
              isRef = true
            }
          }
          // return
        }
        else if (pMeta.mainPhoto)
          return
        // Could be enum like props
        else if (utils.getModel(pMeta.ref).subClassOf === ENUM)
          val = utils.translateEnum(val)
        else if (showRefResource) {
          // ex. property that is referencing to the Organization for the contact
          var value = val[TYPE] ? utils.getDisplayName(val) : val.title;
          if (!value)
            value = translate(utils.getModel(utils.getType(val)))
          val = <TouchableOpacity onPress={showRefResource.bind(this, val, pMeta)}>
                 <Text style={[styles.title, styles.linkTitle]}>{value}</Text>
               </TouchableOpacity>

          isRef = true;
        }
      }

      if (isUndefined) {
        if (!checkProperties)
          return
        val = <Text style={styles.title}>{NOT_SPECIFIED}</Text>
      }
      let checkForCorrection = this.getCheckForCorrection(pMeta)
      if (!isRef) {
        if (isPartial  &&  p === 'leaves') {
          let labels = []
          let type = val.find((l) => l.key === TYPE  &&  l.value).value
          let lprops = utils.getModel(type).properties
          val.forEach((v) => {
            let key
            if (v.key.charAt(0) === '_') {
              if (v.key === TYPE) {
                key = 'type'
                value = utils.getModel(v.value).title
              }
              else
                return
            }
            else {
              key = lprops[v.key]  &&  lprops[v.key].title
              if (v.value  &&  v.key  && (v.key === 'product'  ||  v.key === 'form'))
                value = utils.getModel(v.value).title
              else
                value = v.value || '[not shared]'
              if (typeof value === 'object')
                value = value.title
            }

            if (!key)
              return
            labels.push(<View style={styles.row} key={this.getNextKey()}>
                           <Text style={[styles.title]}>{key}</Text>
                           <Text style={[styles.title, {color: '#2e3b4e'}]}>{value}</Text>
                        </View>)
          })
          return <View style={{paddingLeft: 10}} key={this.getNextKey()}>
                    <Text  style={[styles.title, {paddingVertical: 3}]}>{'Properties Shared'}</Text>
                    {labels}
                  </View>
        }
        isItems = Array.isArray(val)
        let iref = isItems  &&  pMeta.items.ref
        if (iref) {
          if (iref === PHOTO)
            return
          if (utils.getModel(iref).subClassOf === ENUM) {
            let values = val.map((v) => utils.getDisplayName(v)).join(', ')
            viewCols.push(
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={this.getNextKey()}>
                <View style={{paddingLeft: 10}}>
                  <Text style={styles.title}>{utils.translate(pMeta, model)}</Text>
                  <Text style={styles.description}>{values}</Text>
                </View>
                {checkForCorrection}
              </View>
              )
            return
          }
        }
        val = this.renderSimpleProp(val, pMeta, modelName, ShowPropertiesView)
      }
      var title
      if (!pMeta.skipLabel  &&  !isItems)
        title = <Text style={modelName === TERMS_AND_CONDITIONS ? styles.bigTitle : styles.title}>{utils.translate(pMeta, model)}</Text>

      let isPromptVisible = this.state.promptVisible !== null
      if (isPromptVisible)
        console.log(this.state.promptVisible)
      if (checkProperties)
        isDirectionRow = true

      let style = [styles.textContainer, {padding: 10}]
      if (isDirectionRow) {
        style.push({flexDirection: 'row'})
        if (checkForCorrection)
          style.push({justifyContent: 'space-between', flex: 10})
      }
      else
        style.push({flexDirection: 'column'})

      viewCols.push(
        <View key={this.getNextKey()}>
           <View style={isDirectionRow ? {flexDirection: 'row'} : {flexDirection: 'column'}}>
             <View style={[style, {flexDirection: 'column'}]}>
               {title}
               {val}
             </View>
             {checkForCorrection}
           </View>
         </View>
      )
    })
    if (resource.txId) { // || utils.isSealableModel(model)) {
      viewCols.push(
          <View key={this.getNextKey()} ref='propertySheet'>
            {this.addDataSecurity(resource)}
          </View>
        )
    }
    return viewCols;
  }
  getCheckForCorrection(pMeta) {
    let { checkProperties, errorProps, bankStyle } = this.props
    if (!checkProperties)
      return
    let p = pMeta.name
    let isPromptVisible = this.state.promptVisible !== null

    return <View>
              <TouchableOpacity underlayColor='transparent' onPress={() => {
                if (errorProps  &&  errorProps[p]) {
                  delete errorProps[p]
                  this.setState({promptVisible: null, uncheck: p})
                }
                else
                  this.setState({promptVisible: pMeta})
              }}>
                <Icon key={p} name={errorProps && errorProps[p] ? 'ios-close-circle' : 'ios-radio-button-off'} size={30} color={this.props.errorProps && errorProps[p] ? 'deeppink' : bankStyle.linkColor} style={{marginTop: 10, marginRight: 10}}/>
              </TouchableOpacity>
              <Prompt
                title={translate('fieldErrorMessagePrompt')}
                placeholder={translate('thisValueIsInvalidPlaceholder')}
                visible={isPromptVisible}
                onCancel={() => this.setState({ promptVisible: null })}
                onSubmit={(value) => {
                  this.setState({ promptVisible: null})
                  this.props.checkProperties(this.state.promptVisible, value)
                }}/>
           </View>
  }
  onPress(url, event) {
    Linking.openURL(url)
  }
}
reactMixin(ShowPropertiesView.prototype, RowMixin);
reactMixin(ShowPropertiesView.prototype, ResourceMixin);

var createStyles = utils.styleFactory(ShowPropertiesView, function ({ dimensions, bankStyle }) {
  return StyleSheet.create({
    textContainer: {
      flex: 1,
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    title: {
      fontSize: 16,
      // fontFamily: 'Avenir Next',
      marginTop: 3,
      marginBottom: 0,
      marginHorizontal: 7,
      color: '#9b9b9b'
    },
    linkTitle: {
      fontSize: 18,
      color: bankStyle.linkColor
    },
    description: {
      fontSize: 18,
      marginVertical: 3,
      marginHorizontal: 7,
      color: '#2E3B4E',
    },
    icon: {
      width: 40,
      height: 40
    },
    groupStyle: {
      borderBottomColor: bankStyle.linkColor,
      borderBottomWidth: 1,
      paddingBottom: 5
    },
    groupStyleText: {
      fontSize: 22,
      color: bankStyle.linkColor
    },
    bigTitle: {
      fontSize: 20,
      // fontFamily: 'Avenir Next',
      marginTop: 3,
      marginBottom: 0,
      marginHorizontal: 7,
      color: '#7AAAC3'
    },
    thumb: {
      width: 40,
      height: 40
    }
  })
})

module.exports = ShowPropertiesView;

// let content
// let header = (<View style={{padding: 10}} key={this.getNextKey()}>
//                 <View style={[styles.textContainer, styles.row]}>
//                   <Text style={styles.bigTitle}>{translate('dataSecurity')}</Text>
//                   <Icon color={bankStyle.linkColor} size={20} name={'ios-arrow-down'} style={{marginRight: 10, marginTop: 7}}/>
//                 </View>
//                 <View style={styles.separator} />
//               </View>)
// if (blockchain === 'corda') {
//   let description = 'You\'ll be able to verify this transaction when you launch your Corda node.'
//   content = <View style={{paddingHorizontal: 10}}>
//              <View style={{flexDirection: 'row', paddingVertical: 3}}>
//                <Text style={styles.dsTitle}>Blockchain: </Text>
//                <Text style={styles.dsValue}>{blockchain}</Text>
//              </View>
//              <View style={{flexDirection: 'row'}}>
//                <Text style={styles.dsTitle}>Network: </Text>
//                <Text style={styles.dsValue}>{networkName}</Text>
//              </View>
//              <View>
//                <Text style={styles.title}>TxID: </Text>
//                <Text style={styles.dsValue}>{txId}</Text>
//              </View>
//              <Text style={[styles.content, {marginTop: 20}]}>{description}</Text>
//             </View>
// }
// else {
//   let description = 'This app uses blockchain technology to ensure you can always prove the contents of your data and whom you shared it with.'
//   let txs = (
//     <View>
//       {
//         BLOCKCHAIN_EXPLORERS.map((url, i) => {
//           url = url.replace('$TXID', txId)
//           return this.getBlockchainExplorerRow(url, i, styles)
//         })
//       }
//     </View>
//   )

//   content = <View style={{paddingHorizontal: 10}}>
//                <TouchableOpacity onPress={this.onPress.bind(this, 'http://thefinanser.com/2016/03/the-best-blockchain-white-papers-march-2016-part-2.html/')}>
//                  <Text style={styles.content}>{description}
//                    <Text style={styles.learnMode}> Learn more</Text>
//                  </Text>
//                </TouchableOpacity>
//                {txs}
//               </View>
// }
// let self = this
// let row = <Accordion
//             sections={['txId']}
//             onPress={() => {
//               self.refs.propertySheet.measure((x,y,w,h,pX,pY) => {
//                 if (h  &&  y > pY)
//                   onPageLayout(pY, h)
//               })
//             }}
//             header={header}
//             content={content}
//             underlayColor='transparent'
//             easing='easeIn' />
// viewCols.push(
//     <View key={this.getNextKey()} ref='propertySheet'>
//       {row}
//     </View>
//   )
// learnMode: {
//   color: bankStyle.linkColor,
//   paddingHorizontal: 7
// },
// separator: {
//   height: 1,
//   marginTop: 5,
//   marginBottom: 10,
//   marginHorizontal: -10,
//   alignSelf: 'stretch',
//   backgroundColor: bankStyle.linkColor
// },
// dsTitle: {
//   width: 90,
//   fontSize: 16,
//   // fontFamily: 'Avenir Next',
//   marginTop: 3,
//   marginBottom: 0,
//   marginHorizontal: 7,
//   color: '#9b9b9b'
// },
// dsValue: {
//   fontSize: 18,
//   marginHorizontal: 7,
//   color: '#2E3B4E',
// },
// content: {
//   color: '#9b9b9b',
//   fontSize: 16,
//   marginHorizontal: 7,
//   paddingBottom: 10
// },
