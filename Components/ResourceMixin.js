import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native'
import {Column as Col, Row} from 'react-native-flexbox-grid'

import constants from '@tradle/constants'

var { TYPE } = constants
var { PROFILE, ORGANIZATION } = constants.TYPES

import StyleSheet from '../StyleSheet'
import PhotoList from './PhotoList'
import NetworkInfoProvider from './NetworkInfoProvider'
import Accordion from './Accordion'
import PageView from './PageView'
import defaultBankStyle from '../styles/defaultBankStyle.json'
import utils, { translate } from '../utils/utils'
import platformStyles from '../styles/platform'
import ApplicationView from './ApplicationView'

const debug = utils.logger('ResourceMixin')
const NOT_SPECIFIED = '[not specified]'
const TERMS_AND_CONDITIONS = 'tradle.TermsAndConditions'
const APPLICATION = 'tradle.Application'

const skipLabelsInJSON = {
  'tradle.PhotoID': {
    'address': ['full']
  }
}
const hideGroupInJSON = {
  'tradle.PhotoID': ['address']
}
const showCollapsedMap = {
  'tradle.PhotoID': 'scanJson',
  'tradle.SanctionsCheck': 'rawData',
  'tradle.CentrixCheck': 'rawData',
  'tradle.CorporationExistsCheck': 'rawData',
  'tradle.documentChecker.Check': 'rawData'
}

import Markdown from './Markdown'
var component

var ResourceMixin = {
  showRefResource(resource, prop) {
    let type = utils.getType(resource)
    let model = utils.getModel(type);
    let title = utils.getDisplayName(resource);
    let modelTitle = translate(model)
    if (title  &&  title.length)
      title = title + ' -- ' + modelTitle
    else
      title = modelTitle
    let isMessageView, isApplicationView
    if (type === APPLICATION)
      isApplicationView = true
    else if (!utils.isStub(resource))
      isMessageView = utils.isMessage(resource)
    else
      isMessageView = (type !== ORGANIZATION  &&  type !== PROFILE)

    let {bankStyle, search, currency, country, navigator} = this.props
    if (isMessageView) {
      navigator.push({
        id: 5,
        component: require('./MessageView'),
        backButtonTitle: 'Back',
        title,
        passProps: {
          bankStyle: bankStyle,
          resource: resource,
          search: search,
          currency: currency,
          country: country,
        }
      })
    }
    else if (isApplicationView) {
      navigator.push({
        title: title,
        id: 34,
        component: ApplicationView,
        // titleTextColor: '#7AAAC3',
        backButtonTitle: 'Back',
        passProps: {
          resource,
          search,
          bankStyle,
          application: resource
        }
      })
    }
    else {
      navigator.push({
        title: title,
        id: 3,
        component: require('./ResourceView'),
        // rightButtonTitle: 'Edit',
        backButtonTitle: 'Back',
        passProps: {
          resource: resource,
          prop: prop,
          bankStyle: bankStyle || defaultBankStyle,
          currency: this.props.currency
        }
      })
    }
  },
  showResources(resource, prop) {
    this.props.navigator.push({
      id: 10,
      title: translate(prop, utils.getModel(resource[TYPE])),
      backButtonTitle: 'Back',
      component: require('./ResourceList'),
      passProps: {
        modelName: prop.items.ref,
        filter: '',
        resource: resource,
        prop: prop,
        bankStyle: this.props.bankStyle || defaultBankStyle,
        currency: this.props.currency
      }
    });
  },

  renderItems({value, prop, cancelItem, component}) {
    let { bankStyle, navigator, resource } = this.props
    let linkColor = (bankStyle  &&  bankStyle.linkColor) || '#7AAAC3'
    let itemsMeta = prop.items.properties;
    let pModel
    let ref = prop.items.ref;
    if (!itemsMeta) {
      if (ref) {
        pModel = utils.getModel(ref);
        itemsMeta = pModel.properties;
      }
    }
    let counter = 0;
    let vCols = pModel  &&  pModel.viewCols;
    if (!vCols) {
      vCols = [];
      for (let p in itemsMeta) {
        if (p.charAt(0) !== '_'  &&  !itemsMeta[p].hidden)
          vCols.push(p);
      }
    }
    let cnt = value.length;
    return value.map((v) => {
      let ret = [];
      counter++;
      let displayName
      vCols.forEach((p) =>  {
        let itemMeta = itemsMeta[p];
        if (!v[p]  &&  !itemMeta.displayAs)
          return
        if (itemMeta.displayName) {
          displayName = v[p]
          return
        }
        let value;
        if (itemMeta.displayAs)
          value = utils.templateIt(itemMeta, v, pModel)
        else if (itemMeta.type === 'date')
          value = utils.formatDate(v[p]);
        else if (itemMeta.type === 'boolean')
          value = v[p] ? 'Yes' : 'No'
        else if (itemMeta.type !== 'object') {
          if (p == 'photos') {
            ret.push(
               <PhotoList photos={v.photos} navigator={navigator} numberInRow={4} resource={resource} isView={true}/>
            );
            return
          }
          else
            value = v[p];
        }
        else if (itemMeta.ref)
          value = v[p].title  ||  utils.getDisplayName(v[p], utils.getModel(itemMeta.ref));
        else
          value = v[p].title;

        if (!value)
          return
        let item = <View>
                     <Text style={itemMeta.skipLabel ? {height: 0} : [styles.itemText, {fontSize: 16}]}>{itemMeta.skipLabel ? '' : itemMeta.title || utils.makeLabel(p)}</Text>
                     <Text style={styles.itemText}>{value}</Text>
                   </View>

        if (cancelItem)
          item = <TouchableOpacity underlayColor='transparent' onPress={cancelItem.bind(this, prop, v)}>
                   <View style={styles.row}>
                     {item}
                     <Icon name='ios-close-circle-outline' size={28} color={linkColor} />
                   </View>
                 </TouchableOpacity>


        ret.push(
            <View key={this.getNextKey()}>
              {item}
            </View>
        )
      })
      if (!ret.length) {
        let vTitle = displayName || v.title  ||  translate(utils.getModel(utils.getType(v)))

        let image = v.photo  &&  <Image source={{uri: v.photo}} style={styles.thumb} />
        let color = cancelItem ? '#757575' : linkColor
        let item = <View style={{flexDirection: 'row', paddingVertical: 7}}>
                    {image}
                    <Text style={[styles.itemText, {color}]}>{vTitle}</Text>
                  </View>
        if (cancelItem) {
          item = <TouchableOpacity underlayColor='transparent' key={this.getNextKey()} onPress={cancelItem.bind(this, prop, v)}>
                   <View style={styles.row}>
                     {item}
                     <Icon name='md-close' size={20} color={linkColor} style={{marginTop: 12}} />
                   </View>
                 </TouchableOpacity>
          }
        else {
          let isMessageView
          if (resource._message)
            isMessageView = true
          else
            isMessageView = (ref !== ORGANIZATION  &&  ref !== PROFILE)
          let id = isMessageView && 5 || 3
          let component = isMessageView && require('./MessageView') || require('./ResourceView')
          item =  <TouchableOpacity underlayColor='transparent' style={{paddingVertical: 5}} key={this.getNextKey()} onPress={() => {
                    navigator.push({
                     title: vTitle,
                     id,
                     component,
                     backButtonTitle: 'Back',
                     bankStyle,
                     passProps: {resource: v}
                    })
                  }}>
                   {item}
                 </TouchableOpacity>
        }
        ret.push(item)
        // ret.push(
        //   <View style={{justifyContent: 'center', paddingVertical: 5}} key={this.getNextKey()}>
        //    {item}
        //  </View>
        // );
      }

      let sep = counter !== cnt  &&  <View style={styles.itemSeparator}></View>
      return (
        <View key={this.getNextKey()} style={styles.item} >
           {ret}
           {sep}
        </View>
      )
    });
  },
  renderSimpleProp(val, pMeta, modelName, component) {
    let { bankStyle } = this.props
    if (Array.isArray(val)) {
      if (pMeta.items.backlink)
        return <View  key={this.getNextKey()} />

      let vCols = pMeta.viewCols;
      if (!vCols)
        vCols = pMeta.items.ref  &&  utils.getModel(pMeta.items.ref).viewCols
      val = <View style={{marginHorizontal: 7}}>{this.renderItems({value: val, prop: pMeta, component})}</View>
      let title = pMeta.title || utils.makeLabel(pMeta.name)
      const titleEl = <Text style={styles.title}>{title}</Text>
      let icon
      let cnt = val.length;
      if (cnt > 3  &&  modelName !== TERMS_AND_CONDITIONS)
        icon = <Icon name={'ios-arrow-down'} size={15} color='#7AAAC3' style={{position: 'absolute', right: 10, top: 10}}/>
      let header = <View style={{flexDirection: 'row'}}>
                    {titleEl}
                    {icon}
                  </View>

      let separator = <View style={styles.separator}></View>;
      if (cnt > 3)
        val = <View key={this.getNextKey()}>
                {separator}
                <Accordion
                  sections={[title]}
                  header={header}
                  content={val}
                  underlayColor='transparent'
                  easing='easeIn' />
             </View>
      else {
        val = <View key={this.getNextKey()}>
               {titleEl}
               {val}
             </View>
      }
    }
    else  {
      if (pMeta.units  &&  pMeta.units.charAt(0) != '[')
        val += ' ' + pMeta.units

      if (val === NOT_SPECIFIED)
        val = <Text style={[styles.description, {color: bankStyle.linkColor}]}>{val}</Text>
      else if (typeof val === 'number')
        val = <Text style={styles.description}>{val}</Text>;
      else if (typeof val === 'boolean')
        val = <Text style={styles.description}>{val ? 'Yes' : 'No'}</Text>;
      else if (pMeta.signature) {
        let { width } = utils.dimensions(component)
        let h = 200
        let w = width - 40
        // if (width > height)
        //   w = (width * 70)/(height - 100)
        // else
        //   w = (height * 70)/(width - 100)
        // w = Math.round(w)
        val = <View style={styles.container}>
                <Image style={{maxWidth: w, height: h}} source={{uri: val}} resizeMode='contain'/>
              </View>
      }
      else if (typeof val === 'string'  &&  pMeta.type !== 'object'  &&  (val.indexOf('http://') == 0  ||  val.indexOf('https://') === 0))
        val = <Text onPress={this.onPress.bind(this, val)} style={[styles.description, {color: '#7AAAC3'}]}>{val}</Text>;
      // else if (modelName === TERMS_AND_CONDITIONS) {
      //   val = <Text style={[styles.description, {flexWrap: 'wrap'}]}>{val}</Text>;
      else if (pMeta.markdown) {
        // markdownStyles.color = bankStyle.linkColor
        val = <View style={styles.container}>
                <Markdown markdownStyles={utils.getMarkdownStyles(bankStyle)}>
                  {val}
                </Markdown>
              </View>
      }
      else {
        if (pMeta.range === 'model')
          val = translate(utils.getModel(val))
        val = <Text style={[styles.description]}>{val}</Text>;
      }
    }
    return val
  },
  showJson(params) {
    let { json } = params
    if (!Array.isArray(json))
      return this.showJsonPart(params)
    return json.map((r) => {
      let p = _.cloneDeep(params)
      p.json = r
      p.jsonRows = []
      return this.showJsonPart(p)
    })
  },
  showJsonPart(params) {
    let {prop, json, isView, jsonRows, skipLabels, indent, isOnfido, isBreakdown} = params
    // let json = JSON.parse(jsonStr)
    // let jsonRows = []
    let { resource, bankStyle } = this.props
    bankStyle = bankStyle || defaultBankStyle

    let rType = resource[TYPE]

    let hideGroup = prop  &&  hideGroupInJSON[rType]
    let showCollapsed = showCollapsedMap  &&  showCollapsedMap[rType]
    skipLabels = !skipLabels  &&  prop  &&  skipLabelsInJSON[rType]  &&  skipLabelsInJSON[rType][prop]

    // let bg = isView ? bankStyle.myMessageBackgroundColor : bankStyle.verifiedHeaderColor
    let backgroundColor = isView ? bankStyle.linkColor : bankStyle.verifiedHeaderColor
    let color = isView ? '#ffffff' : bankStyle.verifiedHeaderTextColor
    let backlinksBg = {backgroundColor, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginHorizontal: isView ? 0 : -10}
    if (prop) {
      let cols = []
      let state
      let icon
      if (showCollapsed  &&  showCollapsed === prop.name)
        icon = <Icon size={20} name='ios-arrow-down' color='#ffffff' style={{position: 'absolute', top: 15, right: 20}} />
      if (isOnfido) {
        let color = json.result === 'clear' ? '#f1ffe7' : 'red'
        cols.push(<Col sm={1} md={1} lg={1} style={{paddingVertical: 5, backgroundColor}} key={this.getNextKey()}>
                    <Text style={[styles.bigTitle, {color: color, alignSelf: 'center'}]}>{json.result}</Text>
                    {icon}
                  </Col>)
      }
      let style = {opacity: 0.7, ...backlinksBg}

      cols.push(<Col sm={1} md={1} lg={1} style={style} key={this.getNextKey()}>
                 <Text  style={[styles.hugeTitle, {color, paddingVertical: 10}]}>{translate(prop)}</Text>
                 {!isOnfido  &&  icon}
               </Col>)
      let colSize = state ? 2 : 1
      jsonRows.push(<Row size={colSize} style={styles.gridRow} key={this.getNextKey()} nowrap>
                      {cols}
                    </Row>)

    }
    if (!indent)
      indent = 0
    let textStyle = indent === 1 ||  !isBreakdown  ? styles.bigTitle : styles.title

    if (prop  ||  !isBreakdown) {
      for (let p in json) {
        let jVal = json[p]
        if (typeof jVal === 'object'  ||  p === 'result')
          continue
        let label
        if (!skipLabels  ||  skipLabels.indexOf(p) === -1)
          label = <Text style={[styles.title, {flex: 1}]}>{utils.makeLabel(p)}</Text>
        let val
        jVal += ''
        if (jVal.indexOf('http://') === 0  ||  jVal.indexOf('https://') === 0)
          val = <Text style={[styles.title, {flex: 1, color: bankStyle.linkColor}]} onPress={() => Linking.openURL(jVal)}>{jVal}</Text>
        else
          val = <Text style={[styles.title, {flex: 1, color: '#2e3b4e'}]}>{jVal}</Text>
        jsonRows.push(<Row size={2} style={styles.gridRow} key={this.getNextKey()} nowrap>
                        <Col sm={1} md={1} lg={1} style={{paddingVertical: 5, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
                          {label}
                          </Col>
                        <Col sm={1} md={1} lg={1} style={{paddingVertical: 5}} key={this.getNextKey()}>
                          {val}
                        </Col>
                      </Row>)
      }
    }
    else if (isOnfido  &&  !indent) {
      jsonRows.push(<Row size={2} style={styles.gridRow} key={this.getNextKey()} nowrap>
                      <Col sm={2} md={2} lg={2} style={{paddingVertical: 5}} key={this.getNextKey()}>
                        <Text  style={[styles.bigTitle, {color: color, paddingVertical: 10}]}>{translate('Breakdown')}</Text>
                      </Col>
                    </Row>)

    }
    for (let p in json) {
      if (isOnfido) {
        if  (isBreakdown  && p === 'result')
          continue
        if (p === 'properties')
          continue
      }
      // if (p === 'document_numbers' || p === 'breakdown' || p === 'properties')
      //   continue
      if (prop  &&  hideGroup  &&  hideGroup.indexOf(p) !== -1)
        continue
      let jVal = json[p]
      if (typeof jVal === 'object') {
        if (utils.isEmpty(jVal)  ||  this.checkIfJsonEmpty(jVal))
          continue
        if (Array.isArray(jVal)) {
          let arrRows = []
          jVal.forEach((js) => {
            if (typeof js === 'object')
              this.showJson({json: js, isView, jsonRows: arrRows, indent: indent - 1})
            else {
              jsonRows.push(<Row size={2} style={{paddingVertical: 5}} key={this.getNextKey()}>
                              <Col sm={1} md={1} lg={1} style={{paddingVertical: 5, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
                                <Text style={[styles.title, {flex: 1}]}>{utils.makeLabel(p)}</Text>
                              </Col>
                              <Col sm={1} md={1} lg={1} style={{paddingVertical: 5}} key={this.getNextKey()}>
                                <Text style={[styles.title, {flex: 1, color: '#2e3b4e'}]}>{js + ''}</Text>
                              </Col>
                            </Row>)
            }
          })
          continue
        }
        // HACK for Onfido
        let arrow
        if (showCollapsed  &&  showCollapsed === p)
          arrow = <Icon color={bankStyle.linkColor} size={20} name={'ios-arrow-down'} style={{marginRight: 10, marginTop: 7}}/>

        // HACK for Onfido
        if (p !== 'breakdown') {
          let result
          if (isOnfido && isBreakdown) {
            let color = isBreakdown  &&  jVal.properties ? {color: '#757575'} : {color: jVal.result === 'clear' ?  'green' : 'red'}
            result = <Text style={[textStyle, color]}>{jVal.result}</Text>
          }
          jsonRows.push(<Row size={2} style={{paddingVertical: 5}} key={this.getNextKey()}>
                         <Col sm={1} md={1} lg={1} style={{paddingVertical: 5, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
                           <Text style={textStyle}>{utils.makeLabel(p)}</Text>
                         </Col>
                         <Col sm={1} md={1} lg={1} style={{paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between'}} key={this.getNextKey()}>
                           {result}
                           {arrow}
                         </Col>
                       </Row>)

          if (isBreakdown  &&  jVal.properties)
            continue
        }
        else if (isOnfido)
          isBreakdown = true

        let params = {json: jVal, isView, jsonRows, skipLabels, indent: indent + 1, isOnfido, isBreakdown}
        this.showJson(params)
        continue
      }
    }
    if (!prop)
      return

    if (showCollapsed  &&  showCollapsed == prop.name) {
      let [header, ...content] = jsonRows
      return <Accordion key={this.getNextKey()}
               sections={[utils.makeLabel(showCollapsed)]}
               header={header}
               content={content}
               underlayColor='transparent'
               easing='easeOutQuad' />
    }
    return jsonRows
  },
  checkIfJsonEmpty(json) {
    for (let p in json) {
      if (!json[p])
        continue
      if (typeof json[p] !== 'object')
        return false
      if (!this.checkIfJsonEmpty(json[p]))
        return false
    }
    return true
  },
  showLoading(params) {
    if (!params.component)
      return

    component = params.component
    let style = params.style || {}
    let bankStyle = this.props.bankStyle || this.state.bankStyle
    let contentSeparator = utils.getContentSeparator(bankStyle)

    let lstyles = createStyles({bankStyle})
    let network = <NetworkInfoProvider connected={this.state.isConnected} resource={this.state.resource} />
    return (
      <PageView style={[platformStyles.container, style, {alignItems: 'center'}]} separator={contentSeparator} bankStyle={bankStyle} >
        <View style={lstyles.loadingIndicator}>
          <View style={platformStyles.container}>
            {network}
            <Text style={lstyles.loading}>{translate('inProgress')}</Text>
            <ActivityIndicator size='large' style={lstyles.indicator} />
          </View>
        </View>
      </PageView>
    )
  },

  addDataSecurity(resource) {
    let { txId, blockchain, networkName } = resource
    let { bankStyle, onPageLayout } = this.props
    let content

    let lstyles = createStyles({bankStyle})

    let header = (<View style={{padding: 10}} key={this.getNextKey()}>
                    <View style={[styles.textContainer, styles.row]}>
                      <Text style={lstyles.bigTitle}>{translate('dataSecurity')}</Text>
                      <Icon color={bankStyle.linkColor} size={20} name={'ios-arrow-down'} style={{marginRight: 10, marginTop: 7}}/>
                    </View>
                    <View style={styles.separator} />
                  </View>)
    if (blockchain === 'corda') {
      let description = 'You\'ll be able to verify this transaction when you launch your Corda node.'
      content = <View style={{paddingHorizontal: 10}}>
                 <View style={{flexDirection: 'row', paddingVertical: 3}}>
                   <Text style={styles.dsTitle}>Blockchain: </Text>
                   <Text style={styles.dsValue}>{blockchain}</Text>
                 </View>
                 <View style={{flexDirection: 'row'}}>
                   <Text style={styles.dsTitle}>Network: </Text>
                   <Text style={styles.dsValue}>{networkName}</Text>
                 </View>
                 <View>
                   <Text style={styles.title}>TxID: </Text>
                   <Text style={styles.dsValue}>{txId}</Text>
                 </View>
                 <Text style={[styles.content, {marginTop: 20}]}>{description}</Text>
                </View>
    }
    else {
      const description = 'This app uses blockchain technology to ensure you can always prove the contents of your data and whom you shared it with.'
      const urls = utils.getBlockchainExplorerUrlsForTx({ blockchain, networkName, txId })
      if (urls.length) {
        const renderRow = (url, i) => {
          url = url.replace('$TXID', txId)
          return this.getBlockchainExplorerRow(url, i, styles)
        }

        const txs = <View>{urls.map(renderRow)}</View>
        content = <View style={{paddingHorizontal: 10}}>
                     <TouchableOpacity onPress={this.onPress.bind(this, 'http://thefinanser.com/2016/03/the-best-blockchain-white-papers-march-2016-part-2.html/')}>
                       <Text style={styles.content}>{description}
                         <Text style={lstyles.learnMore}> Learn more</Text>
                       </Text>
                     </TouchableOpacity>
                     {txs}
                    </View>
      }
    }
    return <Accordion
                sections={['txId']}
                onPress={() => {
                  this.refs.propertySheet.measure((x,y,w,h,pX,pY) => {
                    if (h  &&  y > pY)
                      onPageLayout(pY, h)
                  })
                }}
                header={header}
                content={content}
                underlayColor='transparent'
                easing='easeIn' />
  },
  getBlockchainExplorerRow(url, i, styles) {
    const { bankStyle } = this.props
    let key = `url${i}`
    return (
      <TouchableOpacity onPress={this.onPress.bind(this, url)} key={key}>
        <Text style={[styles.description, {color: bankStyle.linkColor}]}>{translate('independentBlockchainViewer') + ' ' + (i+1)}</Text>
      </TouchableOpacity>
    )
  },
}

var createStyles = utils.styleFactory(component || PhotoList, function ({ dimensions, bankStyle }) {
  return StyleSheet.create({
    loadingIndicator: {
      alignSelf: 'center',
      marginTop: dimensions.height - 300,
    },
    loading: {
      fontSize: 17,
      alignSelf: 'center',
      color: bankStyle.linkColor
    },
    indicator: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      marginTop: 20
    },
    learnMore: {
      color: bankStyle.linkColor,
      paddingHorizontal: 7
    },
    bigTitle: {
      fontSize: 20,
      // fontFamily: 'Avenir Next',
      color: bankStyle.linkColor,
      marginTop: 3,
      marginBottom: 0,
      marginHorizontal: 7
    },
  })
})

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  container: {
    margin: 10,
    flex: 1
  },
  thumb: {
    width:  25,
    height: 25,
    marginRight: 2,
    borderRadius: 5
  },
  itemText: {
    fontSize: 18,
    marginBottom: 0,
    // marginHorizontal: 7,
    color: '#757575',
  },
  itemSeparator: {
    height: 1,
    marginTop: 5,
    backgroundColor: '#eeeeee',
    // marginHorizontal: 15
  },
  separator: {
    height: 1,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: -10,
    alignSelf: 'stretch',
    backgroundColor: '#eeeeee'
  },
  item: {
    paddingTop: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight: 3
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 0,
    marginHorizontal: 7,
    color: '#9b9b9b'
  },
  description: {
    fontSize: 18,
    marginVertical: 3,
    marginHorizontal: 7,
    color: '#2E3B4E',
  },
  hugeTitle: {
    fontSize: 24,
    // fontFamily: 'Avenir Next',
    // marginTop: 3,
    marginBottom: 0,
    marginHorizontal: 7
  },
  bigTitle: {
    fontSize: 20,
    // fontFamily: 'Avenir Next',
    // color: '#7AAAC3',
    marginTop: 3,
    marginBottom: 0,
    marginHorizontal: 7
  },
  dsTitle: {
    width: 90,
    fontSize: 16,
    // fontFamily: 'Avenir Next',
    marginTop: 3,
    marginBottom: 0,
    marginHorizontal: 7,
    color: '#9b9b9b'
  },
  dsValue: {
    fontSize: 18,
    marginHorizontal: 7,
    color: '#2E3B4E',
  },
  content: {
    color: '#9b9b9b',
    fontSize: 16,
    marginHorizontal: 7,
    paddingBottom: 10
  },
  gridRow: {
    borderBottomColor: '#f5f5f5',
    paddingVertical: 5,
    // paddingRight: 7,
    borderBottomWidth: 1
  },

})

module.exports = ResourceMixin;
/*
  showJsonPart(params) {
    let {prop, json, isView, jsonRows, skipLabels, indent, isOnfido, isBreakdown} = params
    // let json = JSON.parse(jsonStr)
    // let jsonRows = []
    let rType = this.props.resource[TYPE]
    let hideGroup = prop  &&  hideGroupInJSON[rType]
    let showCollapsed = ENV.showCollapsed  &&  ENV.showCollapsed[rType]
    skipLabels = !skipLabels  &&  prop  &&  skipLabelsInJSON[rType]  &&  skipLabelsInJSON[rType][prop]
    let bankStyle = this.state.bankStyle ||  this.props.bankStyle || defaultBankStyle

    // let bg = isView ? bankStyle.myMessageBackgroundColor : bankStyle.verifiedHeaderColor
    let bg = isView ? bankStyle.linkColor : bankStyle.verifiedHeaderColor
    let color = isView ? '#ffffff' : bankStyle.verifiedHeaderTextColor
    let backlinksBg = {backgroundColor: bg, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginHorizontal: isView ? 0 : -10}
    if (prop) {
      let state
      if (isOnfido) {
        let color = json.result === 'clear' ? 'green' : 'red'
        state = <Text style={[styles.bigTitle, {color: color, alignSelf: 'center'}]}>{json.result}</Text>
      }
      let style = {opacity: 0.7, ...backlinksBg}
      jsonRows.push(<View style={style} key={this.getNextKey()}>
                      <Text  style={[styles.hugeTitle, {color: color, paddingVertical: 10}]}>{translate(prop)}</Text>
                      {state}
                    </View>)
    }
    if (!indent)
      indent = 0
    let textStyle = indent === 1 ||  !isBreakdown  ? styles.bigTitle : styles.title

    let linkColor = bankStyle.linkColor
    if (prop  ||  !isBreakdown) {
      for (let p in json) {
        if (typeof json[p] === 'object'  ||  p === 'result')
          continue
        let label
        if (!skipLabels  ||  skipLabels.indexOf(p) === -1)
          label = <Text style={[styles.title, {flex: 1}]}>{utils.makeLabel(p)}</Text>
        jsonRows.push(<View style={{flexDirection: 'row', paddingVertical: 3, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
                        {label}
                        <Text style={[styles.title, {flex: 1, color: '#2e3b4e'}]}>{json[p] + ''}</Text>
                      </View>)
      }
    }
    else if (isOnfido  &&  !indent) {
      jsonRows.push(<View style={backlinksBg} key={this.getNextKey()}>
                      <Text  style={[styles.bigTitle, {color: color, paddingVertical: 10}]}>{translate('Breakdown')}</Text>
                    </View>)

    }
    for (let p in json) {
      if (isOnfido) {
        if  (isBreakdown  && p === 'result')
          continue
        if (p === 'properties')
          continue
      }
      // if (p === 'document_numbers' || p === 'breakdown' || p === 'properties')
      //   continue
      if (prop  &&  hideGroup  &&  hideGroup.indexOf(p) !== -1)
        continue
      if (typeof json[p] === 'object') {
        if (utils.isEmpty(json[p])  ||  this.checkIfJsonEmpty(json[p]))
          continue
        if (Array.isArray(json[p])) {
          let arrRows = []
          json[p].forEach((js) => {
            if (typeof js === 'object')
              this.showJson({json: js, isView: isView, jsonRows: arrRows, indent: indent - 1})
            else {
              arrRows.push(<View style={{paddingVertical: 3, paddingRight: 10, paddingLeft: isView ? 10 * (indent) : 10 * (indent - 1)}} key={this.getNextKey()}>
                             <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                               <Text style={[styles.title, {flex: 1}]}>{utils.makeLabel(p)}</Text>
                               <Text style={[styles.title, {flex: 1, color: '#2e3b4e'}]}>{js + ''}</Text>
                             </View>
                          </View>)
            }
          })

          jsonRows.push(<View style={{paddingVertical: 3, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
                           {arrRows}
                        </View>
                        )
          continue
        }
        // if (isBreakdown  &&  json[p].properties) {
        //   jsonRows.push(<View style={{paddingVertical: 10, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
        //               <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        //                 <Text style={styles.bigTitle}>{utils.makeLabel(p)}</Text>
        //                 <Text style={styles.bigTitle}>{json[p].result}</Text>
        //               </View>
        //               <View style={{height: 1, marginTop: 5, marginBottom: 10, marginHorizontal: -10, alignSelf: 'stretch', backgroundColor: '#eeeeee'}} />
        //             </View>)
        //   continue
        // }
        let arr, arrow
        if (showCollapsed  &&  showCollapsed === p) {
          arr = []
          jsonRows.push(arr)
          arrow = <Icon color={bankStyle.linkColor} size={20} name={'ios-arrow-down'} style={{marginRight: 10, marginTop: 7}}/>
        }
        else
          arr = jsonRows
        // HACK for Onfido
        if (p !== 'breakdown') {
          let result
          if (isOnfido && isBreakdown) {
            let color = isBreakdown  &&  json[p].properties ? {color: '#757575'} : {color: json[p].result === 'clear' ?  'green' : 'red'}
            result = <Text style={[textStyle, color]}>{json[p].result}</Text>
          }

          arr.push(<View style={{paddingVertical: 3, paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={textStyle}>{utils.makeLabel(p)}</Text>
                        {result}
                        {arrow}
                      </View>
                    </View>)
          if (isBreakdown  &&  json[p].properties)
            continue
        }
        else if (isOnfido)
          isBreakdown = true

// tada.push("<View style={{paddingVertical: 10, paddingHorizontal: isView ? 10 : 0}} key={this.getNextKey()}><Text style={styles.bigTitle}>{" + utils.makeLabel(p) + "}</Text></View>")
        let params = {json: json[p], isView, jsonRows: arr, skipLabels, indent: indent + 1, isOnfido, isBreakdown: isBreakdown}
        this.showJson(params)
        continue
      }
      // let label
      // if (!skipLabels  ||  skipLabels.indexOf(p) === -1)
      //   label = <Text style={[styles.title, {flex: 1}]}>{utils.makeLabel(p)}</Text>
      // jsonRows.push(<View style={{flexDirection: 'row', paddingRight: 10, paddingLeft: isView ? 10 * (indent + 1) : 10 * (indent - 1)}} key={this.getNextKey()}>
      //                 {label}
      //                 <Text style={[styles.title, {flex: 1, color: '#2e3b4e'}]}>{json[p]}</Text>
      //               </View>)
// tada.push("<View style={{flexDirection: 'row', paddingHorizontal: isView ? 10 : 0}} key={this.getNextKey()}><Text style={[styles.title, {flex: 1}]}>{" + utils.makeLabel(p) + "}</Text><Text style={[styles.title, {flex: 1, color: '#2e3b4e'}]}>{" + json[p] + "}</Text></View>")
    }
    if (!prop)
      return

    if (showCollapsed) {
      for (let i=0; i<jsonRows.length; i++) {
        if (Array.isArray(jsonRows[i])) {
          let arr = jsonRows[i]
          let header = arr[0]
          arr.splice(0, 1)
          let content = <View>{arr}</View>
          let row =  <Accordion
                       sections={[utils.makeLabel(showCollapsed)]}
                       header={header}
                       style={{alignSelf: 'stretch'}}
                       content={<View>{arr}</View>}
                       underlayColor='transparent'
                       easing='easeOutQuad' />
          jsonRows.splice(i, 1, row)
        }
      }
    }
    return jsonRows

    // if (!jsonRows.length)
    //   return <View/>
    // let backlinksBg = {backgroundColor: '#96B9FA'}
    // let title = <View style={backlinksBg} key={this.getNextKey()}>
    //               <Text  style={[styles.bigTitle, {color: '#ffffff', paddingVertical: 10}]}>{translate(prop)}</Text>
    //             </View>
    // return <View key={this.getNextKey()} >
    //           {title}
    //           <View style={{height: 1, marginBottom: 10, alignSelf: 'stretch', backgroundColor: this.props.bankStyle.linkColor}} />
    //           {jsonRows}
    //         </View>
  },
*/
