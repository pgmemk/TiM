'use strict'

import React from 'react'
import {
  NativeModules,
  Text,
  findNodeHandle,
  Dimensions,
  Alert,
  Linking,
  PixelRatio,
  Platform,
  PermissionsAndroid,
  StyleSheet
} from 'react-native'

import Camera from 'react-native-camera'
import querystring from 'querystring'
import AsyncStorage from '../Store/Storage'
import DeviceInfo from 'react-native-device-info'
import PushNotifications from 'react-native-push-notification'
import Keychain from 'react-native-keychain'
import ENV from './env'
import { getDimensions, getOrientation } from 'react-native-orient'
import platformUtils from './platformUtils'
import { post as submitLog } from './debug'
import bankStyles from '../styles/bankStyles'
import Actions from '../Actions/Actions'
import chatStyles from '../styles/chatStyles'
import locker from './locker'
import clone from 'clone'

// import Orientation from 'react-native-orientation'

// var orientation = Orientation.getInitialOrientation()
// Orientation.addOrientationListener(o => orientation = o)

var crypto = require('crypto')
var debug = require('debug')('tradle:app:utils')
var Q = require('q')
var collect = require('stream-collector')
var typeforce = require('typeforce')
var t = require('tcomb-form-native');
var equal = require('deep-equal')
// var moment = require('moment');
var dateformat = require('dateformat')
var Backoff = require('backoff')
var extend = require('xtend')
var fetch = global.fetch || require('whatwg-fetch')
var levelErrors = require('levelup/lib/errors')

const Cache = require('lru-cache')
const mutexify = require('mutexify')
var strMap = {
  'Please fill out this form and attach a snapshot of the original document': 'fillTheFormWithAttachments',
  'Please fill out this form': 'fillTheForm',
  'Please take a **selfie** picture of your face': 'takeAPicture'
}
var translatedStrings = {
  en: preParseStrings(require('./strings_en.json'), ENV),
  nl: preParseStrings(require('./strings_nl.json'), ENV)
}

const tradle = require('@tradle/engine')
const protocol = tradle.protocol
const tradleUtils = tradle.utils
var constants = require('@tradle/constants');

const TYPE = constants.TYPE
const TYPES = constants.TYPES

const VERIFICATION = TYPES.VERIFICATION
const MONEY = TYPES.MONEY
const FORM = TYPES.FORM
const ORGANIZATION = TYPES.ORGANIZATION

const MY_PRODUCT = 'tradle.MyProduct'
const MESSAGE = 'tradle.Message'
const ITEM = 'tradle.Item'
const DOCUMENT = 'tradle.Document'
const PRODUCT_APPLICATION = 'tradle.ProductApplication'
const CUR_HASH = constants.CUR_HASH
const NONCE = constants.NONCE
const ROOT_HASH = constants.ROOT_HASH
const PREV_HASH = constants.PREV_HASH
const SIG = constants.SIG
const FORM_ERROR = 'tradle.FormError'
const FORM_REQUEST = 'tradle.FormRequest'
const PHOTO = 'tradle.Photo'
const PHOTO_ID = 'tradle.PhotoID'
const PASSWORD_ENC = 'hex'
const MAX_WIDTH = 800

var LocalizedStrings = require('react-native-localization')
let defaultLanguage = new LocalizedStrings({ en: {}, nl: {} }).getLanguage()
var dictionaries = require('@tradle/models').dict

var strings = translatedStrings[defaultLanguage]
var dictionary = dictionaries[defaultLanguage]

var propTypesMap = {
  'string': t.Str,
  'boolean': t.Bool,
  'date': t.Dat,
  'number': t.Num
};
var models, me;
var BACKOFF_DEFAULTS = {
  randomisationFactor: 0,
  initialDelay: 1000,
  maxDelay: 60000
}

var DEFAULT_FETCH_TIMEOUT = 5000
var stylesCache = {}

var defaultPropertyValues = {}
var hidePropertyInEdit = {}

var utils = {
  isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  },
  setMe(meR) {
    me = meR;
    if (!me)
      return

    if (me.languageCode) {
      strings = translatedStrings[me.languageCode]
      if (me.dictionary)
        dictionary = me.dictionary
      else if (dictionaries[me.languageCode])
        dictionary = dictionaries[me.languageCode]
    }
    if (!strings)
      strings = translatedStrings[defaultLanguage]
  },
  getMe() {
    return me;
  },
  isMe(resource) {
    let me = this.getMe()
    return me  &&  me[ROOT_HASH] === resource[ROOT_HASH]
  },
  setModels(modelsRL) {
    models = modelsRL;
  },
  getModels() {
    return models;
  },
  // temporary, let's hope
  interpretStylesPack(stylesPack) {
    let interpreted = {}
    Object.keys(stylesPack).forEach(prop => {
      // booHoo => BOO_HOO
      if (prop.charAt(0) === '_')
        return
      const localName = utils.splitCamelCase(prop).join('_').toUpperCase()
      interpreted[localName] = stylesPack[prop]
    })

    return interpreted
  },
  splitCamelCase(str) {
    return str.split(/(?=[A-Z])/g)
  },
  getModel(modelName) {
    return models ? models[modelName] : null;
  },
  getDefaultLanguage() {
    return defaultLanguage
  },
  translate(...args) {
    if (typeof args[0] === 'string')
      return utils.translateString(...args)
    if (args.length === 1)
      return utils.translateModel(args[0])
    else
      return utils.translateProperty(args[0], args[1])
  },
  translateProperty(property, model) {
    if (!dictionary)
      return property.title || utils.makeLabel(property.name)
    // HACK for property that changes title in case it is upload or scan
    if (property.title  &&  this.isWeb()  &&  model.id === PHOTO_ID  &&  property.name === 'scan')
      return property.title
    let translations = dictionary.properties[property.name]
    let val
    if (translations)
      val = translations[model.id] || translations.Default

    return val || property.title || utils.makeLabel(property.name)
  },
  translateModel(model, isPlural) {
    if (dictionary  &&  dictionary.models[model.id])
      return dictionary.models[model.id]
    return model.title ? model.title : this.makeModelTitle(model, isPlural)
  },
  translateString(...args) {
    if (!strings)
      return args[0]

    let s = strings[args[0]]
    if (!s)
      return args[0]

    // if (args.length === 2  &&  typeof args[1] === 'object') {
    //   let pos = 0
    //   do {
    //     let i1 = s.indexOf('{', pos)
    //     if (i1 === -1)
    //       break
    //     let i2 = s.indexOf('}, i1')
    //     if (i2 === -1)
    //       break
    //     s = s.substring(0, i1) + args[1][s.substring(i1 + 1, i2)] + s.substring(i2 + 1)
    //   } while(true)
    // }
    // else
    if (args.length > 1) {
      for (let i=1; i<args.length; i++) {
        let insert = '{' + i + '}'
        let idx = s.indexOf(insert)
        if (idx === -1)
          continue
        s = s.substring(0, idx) + args[i] + s.substring(idx + insert.length)
      }
    }
    return s ? s : args[0]
  },
  clone(resource) {
    return clone(resource)
    // return JSON.parse(JSON.stringify(resource))
  },
  compare(r1, r2, isInlined) {
    if (!r1 || !r2)
      return (r1 || r2) ? false : true

    if (isInlined) return equal(r1, r2)

    let properties = this.getModel(r1[TYPE]).value.properties
    let exclude = ['time', ROOT_HASH, CUR_HASH, PREV_HASH, NONCE, 'verifications', '_sharedWith']
    for (var p in r1) {
      if (!properties[p]  ||  exclude.indexOf(p) !== -1)
        continue
      if (r1[p] === r2[p])
        continue
      if (Array.isArray(r1[p])) {
        if (!r2[p])
          return false
        if (r1[p].length !== r2[p].length)
          return false
        if (!r1[p].some((r) => r2[p].some((rr2) => equal(r, rr2))))
          return false
      }
      else if (typeof r1[p] === 'object') {
        if (!r2[p]  ||  !properties[p]) // internal props like _context
          return false
        if (properties[p].ref === MONEY) {
          if (r1[p].currency !== r2[p].currency  ||  r1[p].value !== r2[p].value)
            return false
        }
        else if (properties[p].inlined  ||  (properties[p].ref  &&  this.getModel(properties[p].ref).value.inlined))
          return this.compare(r1[p], r2[p], true)
        else if (utils.getId(r1[p]) !== utils.getId(r2[p]))
          return false
      }
      else if (r1[p]  ||  r2[p])
        return false
    }
    return true
  },

  getStringName(str) {
    return strMap[str]
  },
  createAndTranslate(s, isEnumValue) {
    let stringName = s.replace(/\w\S*/g, function(txt) {
      return  isEnumValue
            ? txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            : txt
    })
    stringName = stringName.replace(/[^a-zA-Z0-9]/g, '')
    // stringName = stringName.charAt(0).toLowerCase() + stringName.slice(1)
    let t = utils.translate(stringName)
    // return t !== stringName ? t : (isEnumValue ? s : utils.makeLabel(s))
    return t !== stringName ? t : s
  },
  makeModelTitle(model, isPlural) {
    if (typeof model === 'string')
      return this.makeModelTitle(this.getModel(model).value, isPlural)
    if (isPlural  &&  model.plural)
      return model.plural
    if (model.title)
      return isPlural ? model.title + 's' : model.title
    let label = model.id.split('.')[1]
    if (isPlural)
      label += 's'
    return label
          // insert a space before all caps
          .replace(/([A-Z])/g, ' $1')
          // uppercase the first character
          .replace(/^./, function(str){ return str.toUpperCase(); }).trim()
  },
  makeLabel(label) {
    return label
          .replace(/_/g, ' ')
          // insert a space before all caps
          .replace(/([A-Z])/g, ' $1')
          // uppercase the first character
          .replace(/^./, function(str){ return str.toUpperCase(); })
  },
  arrayToObject(arr) {
    if (!arr)
      return;

    var obj = arr.reduce(function(o, v, i) {
      o[v.trim()] = i;
      return o;
    }, {});
    return obj;
  },
  objectToArray(obj) {
    if (!obj)
      return;

    return Object.keys(obj).map(function (key) {return obj[key]});
  },
  getImplementors(iModel, excludeModels) {
    var implementors = [];
    for (var p in models) {
      var m = models[p].value;
      if (excludeModels) {
        var found = false
        for (var i=0; i<excludeModels.length && !found; i++) {
          if (p === excludeModels[i])
            found = true
          else {
            var em = this.getModel(p).value
            if (em.subClassOf  &&  em.subClassOf === excludeModels[i])
              found = true;
          }
        }
        if (found)
          continue
      }
      if (m.interfaces  &&  m.interfaces.indexOf(iModel) != -1)
        implementors.push(m);
    }
    return implementors;
  },
  getAllSubclasses(iModel) {
    var subclasses = [];
    for (var p in models) {
      var m = models[p].value;
      if (m.subClassOf  &&  m.subClassOf === iModel)
        subclasses.push(m);
    }
    return subclasses;
  },
  isSubclassOf(type, subType) {
    if (typeof type === 'string')
      return this.getModel(type).value.subClassOf === subType
    if (type.type)  {
      if (type.type === 'tradle.Model')
      return type.subClassOf === subType
    }
    return this.getModel(type[TYPE]).value.subClassOf === subType
  },
  isMyProduct(type) {
    return this.isSubclassOf(type, MY_PRODUCT)
  },
  isForm(type) {
    return this.isSubclassOf(type, FORM)
  },
  isVerification(type) {
    return this.isSubclassOf(type, VERIFICATION)
  },
  getFontSize(fontSize) {
    // return fontSize
    let fontScale = PixelRatio.getFontScale()
    if (fontScale <= 3)
      return fontSize
    return Math.floor(fontSize * (fontScale < 3.5 ? 0.95 : 0.9))
  },
  getId(r) {
    if (typeof r === 'string') {
      return r
      // var idArr = r.split('_');
      // return idArr.length === 2 ? r : idArr[0] + '_' + idArr[1];
    }
    if (!r) debugger
    if (r.id) {
      return r.id
      // var idArr = r.id.split('_');
      // return idArr.length === 2 ? r.id : idArr[0] + '_' + idArr[1];
    }
    else {
      let m = this.getModel(r[TYPE])
      let id = r[TYPE] + '_' + r[ROOT_HASH]
      return  m  &&  (m.value.subClassOf === FORM  ||  m.value.id === VERIFICATION  ||  m.value.id === MY_PRODUCT)
            ? id + '_' + (r[CUR_HASH] || r[ROOT_HASH])
            : id
    }
  },
  getType(r) {
    if (typeof r === 'string')
      return r.split('_')[0]
    return r[TYPE] || this.getId(r).split('_')[0]
  },
  getItemsMeta(metadata) {
    var props = metadata.properties;
    var required = utils.arrayToObject(metadata.required);
    // if (!required)
    //   return;
    var itemsMeta = {};
    for (var p in props) {
      if (props[p].type == 'array')  //  &&  required[p]) {
        itemsMeta[p] = props[p];
    }
    return itemsMeta;
  },
  makeTitle(resourceTitle, prop) {
    return (resourceTitle.length > 28) ? resourceTitle.substring(0, 28) + '...' : resourceTitle;
  },
  getPropertiesWithAnnotation(meta, annotation) {
    let props = {}
    for (let p in meta)
      if (meta[p][annotation])
        props[p] = meta[p]

    return props
  },
  getDisplayName(resource, meta) {
    if (!meta) {
      if (resource.title)
        return resource.title
      if (resource.id)
        return ""
      meta = this.getModel(resource[TYPE]).value.properties
    }
    let m = resource[TYPE] ? this.getModel(resource[TYPE]) : null
    var displayName = '';
    for (var p in meta) {
      if (p.charAt(0) === '_')
        continue
      if (!meta[p].displayName) {
        if (!displayName  &&  m  &&  resource[p]  &&  m.value.subClassOf === 'tradle.Enum')
          return resource[p];
        continue
      }
      let dn = this.getStringValueForProperty(resource, p, meta)
      if (dn)
        displayName += displayName.length ? ' ' + dn : dn;
    }
    if (!displayName.length  &&  m) {
      let vCols = m.value.viewCols
      if (!vCols)
        return displayName
      let excludeProps = []
      if (this.isMessage(m))
        excludeProps = ['from', 'to']
      for (let i=0; i<vCols.length  &&  !displayName.length; i++) {
        let prop =  vCols[i]
        if (meta[prop].type === 'array')
          continue
        if (!resource[prop]  ||  excludeProps.indexOf[prop])
          continue
        displayName = this.getStringValueForProperty(resource, prop, m.value.properties)
      }
    }
    return displayName;
  },

  getStringValueForProperty(resource, p, meta) {
    let displayName = ''
    if (resource[p]) {
      if (meta[p].type !== 'object')
        return resource[p];
      if (resource[p].title)
        return resource[p].title;
      if (meta[p].ref) {
        if (meta[p].ref == constants.TYPES.MONEY)  {
          let c = this.normalizeCurrencySymbol(resource[p].currency)
          return (c || '') + resource[p].value
        }
        else
          return this.getDisplayName(resource[p], this.getModel(meta[p].ref).value.properties);
      }
    }
    else if (meta[p].displayAs) {
      var dn = this.templateIt(meta[p], resource);
      if (dn)
        return dn
    }
    return displayName
  },

  getPropStringValue(prop, resource) {
    let p = prop.name
    if (!resource[p]  &&  prop.displayAs)
      return this.templateIt(prop, resource);
    if (prop.type == 'object')
      return resource[p].title || this.getDisplayName(resource[p], this.getModel(resource[p][TYPE]).value.properties);
    else
      return resource[p] + '';
  },

  template (t, o) {
    return t.replace(/{([^{}]*)}/g,
        function (a, b) {
          var r = o[b - 1];
          return typeof r === 'string' ||
                 typeof r === 'number' ?
                 r : a;
        }
     )
  },
  templateIt1(prop, resource, m) {
    if (resource.id  &&  resource.title)
      return resource.title
    let pgroup = prop.group
    if (!pgroup.length)
      return prop.displayAs
    let group = []
    let hasSetProps
    let props = resource[TYPE] ? this.getModel(resource[TYPE]).value.properties : m.properties
    for (let i=0; i<pgroup.length; i++) {
      let p = pgroup[i]
      let v =  resource[p] ? resource[p] : ''
      if (v)
        hasSetProps = true
      if (typeof v === 'object')
        v = v.title ? v.title : utils.getDisplayName(v, this.getModel(props[p].ref).value.properties)
      else if (props[p].range  &&  props[p].range  === 'check')
        v = ''
      group.push(v)
    }

    if (hasSetProps) {
      let s = this.template(prop.displayAs, group).trim()
      s = s.replace(/[,\s+,]+[,,]/g, ',')
      if (s.charAt(0) === ',')
        s = s.replace(/,/, '')

      if (s.charAt(s.length - 1) !== ',')
        return s
      let i = s.length - 2
      while(s.charAt(i) === ' ')
        i--
      i = (i < s.length - 2) ? i : s.length - 1
      return s.substring(0, i)
    }
  },
  // templateIt1(prop, resource) {
  //   let pgroup = prop.group
  //   let group = []
  //   let hasSetProps
  //   pgroup.forEach((p) => {
  //     let v =  resource[p] ? resource[p] : ''
  //     if (v)
  //       hasSetProps = true
  //     group.push(v)
  //   })
  //   if (!hasSetProps)
  //     return
  //   else
  //     return this.template(prop.displayAs, group).trim()
  // },

  // parentModel for array type props
  templateIt(prop, resource, parentModel) {
    var template = prop.displayAs;
    if (typeof template === 'string')
      return this.templateIt1(prop, resource, parentModel)
    var val = '';
    let self = this
    if (template instanceof Array) {
      template.forEach(function(t) {
        if (t.match(/[a-z]/i)) {
          if (resource[t]) {
            if (val  &&  val.charAt(val.length - 1).match(/[a-z,]/i))
              val += ' ';

            if ((typeof resource[t] !== 'object'))
              val += resource[t]
            else {
              if (resource[t].title)
                val += resource[t].title
              else {
                let m = self.getModel(resource[t][TYPE]).value
                val += self.getDisplayName(resource[t], m.properties)
              }
            }
          }
        }
        else if (val.length  &&  val.indexOf(t) != val.length - 1)
          val += t;
      });
    }
    return val;
  },
  formatDate(date, noTime) {
    // var dayDiff = moment(new Date()).dayOfYear() - moment(date).dayOfYear();
    var date = new Date(date);
    var now = new Date()

    var dayDiff = Math.floor((now.getTime() - date.getTime()) / (3600 * 24 * 1000))
    var noTime = true
    var val;
    switch (dayDiff) {
    case 0:
      noTime = false
      val = dateformat(date, 'h:MM TT')
      // val = moment(date).format('h:mA') //moment(date).fromNow();
      break;
    case 1:
      noTime = false
      val = 'yesterday, ' + (noTime ? '' : dateformat(date, 'h:MM TT'))
      // val = moment(date).format('[yesterday], h:mA');
      break;
    default:
      val = dateformat(date, 'mmm d, yyyy' + (noTime ? '' : ', h:MM TT'));
      // val = moment(date).format('LL');
    }
    return val;
  },
  keyByValue: function (map, value) {
    for (var k in map) {
      if (map[k] === value) return k
    }
  },
  splitMessage(message) {
    if (!message)
      return []
    var lBr = message.indexOf('[');
    var msg;
    if (lBr == -1)
      return [message];
    var rBr = message.indexOf(']', lBr);
    if (rBr == -1)
      return [message];
    if (message.charAt(rBr + 1) != '(')
      return [message];
    var rRoundBr = message.indexOf(')', rBr);
    if (rRoundBr == -1)
      return [message];
    else {
      if (lBr)
        return [message.substring(0, lBr), message.substring(lBr + 1, rBr), message.substring(rBr + 2, rRoundBr)];
      else
        return [message.substring(lBr + 1, rBr), message.substring(rBr + 2, rRoundBr)];
    }
  },
  getImageUri(url) {
    if (!url)
      return null;
    if (typeof url === 'object')
      url = url.url
    if (url.indexOf('data') === 0 || url.indexOf('assets-') === 0 || url.indexOf('http') === 0)
      return url;
    else if (url.indexOf('file:///') === 0)
      return url.replace('file://', '')
    else if (url.indexOf('../') === 0)
      return url
    // else if (url.indexOf('/var/mobile/') == 0)
    //   return url;
    else
      return 'http://' + url;
  },
  sendSigned(driver, opts) {
    if (opts.msg[TYPE] == 'tradle.SelfIntroduction') {
      opts.public = true
    }

    return driver.sign(opts.msg)
      .then((signed) => {
        opts.msg = signed
        return driver.send(opts)
      })
  },
  dedupeVerifications(list) {
    var vFound = {}
    var i = list.length
    while (i--) {
      var r = list[i]
      if (r[TYPE] !== VERIFICATION) continue

      var docType = r.document && r.document[TYPE]
      if (!docType) continue

      var org = r.organization && r.organization.id
      if (!org) continue

      var vid = docType + org
      if (vFound[vid]) {
        list.splice(i, 1)
      } else {
        vFound[vid] = true
      }
    }
  },

  isMyMessage(r) {
    var fromHash = utils.getId(r.from);
    var me = utils.getMe()
    if (fromHash == this.getId(me))
      return true;
    if (this.getModel(r[TYPE]).value.subClassOf == MY_PRODUCT) {
      let org = r.from.organization
      if (org  &&  utils.getId(r.from.organization) !== utils.getId(this.props.to))
        return true
    }
  },
  isVerifiedByMe(resource) {
    if (!resource.verifications)
      return false
    var lastAdditionalInfoTime, verifiedByMe
    if (resource.additionalInfo) {
      resource.additionalInfo.forEach(function(r) {
        if (lastAdditionalInfoTime  &&  lastAdditionalInfoTime < r.time)
          lastAdditionalInfoTime = r.time;
      });
    }
    /*
    resource.verifications.forEach(function(r) {
      var rh = r.from[ROOT_HASH];
      if (!rh)
        rh = utils.getId(r.from).split('_')[1];

      if (rh === me[ROOT_HASH]  &&  (!lastAdditionalInfoTime  ||  lastAdditionalInfoTime < r.time))
        verifiedByMe = true
    });
    */
    return verifiedByMe
  },
  isReadOnlyChat(resource, context) {
    let me = this.getMe()
    if (!me)
      return false
    if (!resource.to || !resource.from)
      return false
    let meId = this.getId(me)
    let fromId = this.getId(resource.from)
    let toId = this.getId(resource.to)
    let isReadOnly = toId !== meId  &&  fromId !== meId
    if (isReadOnly || !context  || (resource[constants.TYPE] !== FORM_ERROR  &&   resource[constants.TYPE] !== FORM_REQUEST))
      return isReadOnly
    // Form error can be used only by context originating contact
    return !isReadOnly  &&  context
           ? meId  !== this.getId(context.from)
           : isReadOnly
  },
  buildRef(resource) {
    if (!resource[TYPE] && resource.id)
      return resource
    let m = this.getModel(resource[TYPE]).value
    // let isForm = m.subClassOf === FORM
    // let id = utils.getId(resource)
    // if (isForm)
    //   id += '_' + resource[CUR_HASH]
    let ref = {
      id: utils.getId(resource),
      title: resource.id ? resource.title : utils.getDisplayName(resource)
    }
    if (resource.time)
      ref.time = resource.time
    return ref
  },
  hasSupportLine(resource) {
    let me = this.getMe()
    if (resource._hasSupportLine)
      return true
    if (!me.isEmployee)
      return

    if (me.organization._hasSupportLine) {
      if (resource[TYPE] === TYPES.PROFILE)
        return true
      if (resource[TYPE] === PRODUCT_APPLICATION) {
        if (resource._relationshipManager)
          return true
      }
    }
    else if (resource[TYPE] === TYPES.ORGANIZATION  && utils.getId(me.organization) === utils.getId(resource))
      return true
  },
  optimizeResource(resource, doNotChangeOriginal) {
    let res = doNotChangeOriginal ? utils.clone(resource) : resource

    var properties = this.getModel(res[TYPE]).value.properties
    Object.keys(res).forEach(p => {
      if (p.charAt(0) === '_'  ||  !properties[p])
        return
      if (properties[p].type === 'object') {
        if (res[p]  &&  res[p].id  &&  res[p].title) {
          res[p] = this.buildRef(res[p])
          return
        }
        if (properties[p].ref  &&  !this.getModel(properties[p].ref).value.inlined) {

          // if (properties[p].ref !== MONEY  &&  properties[p].ref !== PHOTO) {

          // TODO: remove this after we add resource validation
          // on the server side
          //
          // currently there are some bad prefill values floating around (empty objects)
          if (p === 'prefill') {
            if (!Object.keys(res[p]).length)
              delete res[p]
            return
          }

          res[p] = this.buildRef(res[p])
        }
        return
      }
      if (properties[p].type !== 'array'  ||
         !properties[p].items.ref         ||
          properties[p].inlined)
        return
      var arr = []
      res[p].forEach(function(r) {
        if (typeof r === 'string')
          return
        if (r.id) {
          if (r.photo)
            delete r.photo
          arr.push(r)
          return
        }
        var rr = {}
        rr.id = utils.getId(r)
        const type = utils.getType(r)
        var m = this.getModel(type)
        rr.title = utils.getDisplayName(r, m.properties)
        arr.push(rr)
      })
      res[p] = arr
    })

    return res
  },

  /**
   * fast but dangerous way to read a levelup
   * it's dangerous because it relies on the underlying implementation
   * of levelup and asyncstorage-down, and their respective key/value encoding sechemes
   */
  async dangerousReadDB(db) {
    // return new Promise((resolve, reject) => {
    //   collect(db.createReadStream(), (err, data) => {
    //     if (err) reject(err)
    //     else resolve(data)
    //   })
    // })

    if (Platform.OS === 'web') {
      return new Promise(function (resolve, reject) {
        collect(db.createReadStream(), function (err, results) {
          if (err) reject(err)
          else resolve(results)
        })
      })
    }

    await Q.ninvoke(db, 'open')

    const prefix = db.location + '!'
    // dangerous!
    const keys = db.db._down.container._keys.slice()
    if (!keys.length) return []

    const pairs = await AsyncStorage.multiGet(keys.map((key) => prefix + key))
    return pairs
      .filter((pair) => pair[1] != null)
      .map((pair) => {
        pair[1] = pair[1].slice(2)
        try {
          pair[1] = pair[1] && JSON.parse(pair[1])
        } catch (err) {
        }

        return {
          key: pair[0].slice(prefix.length + 2),
          value: pair[1]
        }
      })
  },
  isEmployee(resource) {
    if (!me || !me.isEmployee)
      return false
    let myId = this.getId(me.organization)
    if (resource[TYPE] === ORGANIZATION)
      return this.getId(resource) === myId ? true : false
    if (!resource.organization)
      return true
    if (utils.getId(resource.organization) === utils.getId(me.organization))
      return true
  },
  isVerifier(resource, verification) {
    let me = this.getMe()
    if (!this.isEmployee(resource))
      return false
    let model = this.getModel(resource[TYPE]).value
    if (!me.organization)
      return false
    if (model.subClassOf === FORM) {
      return  (utils.getId(me) === utils.getId(resource.to)  ||  this.isReadOnlyChat(resource)) &&
             !utils.isVerifiedByMe(resource)               // !verification  &&  utils.getId(resource.to) === utils.getId(me)  &&
    }
    if (model.id === TYPES.VERIFICATION)
      return  utils.getId(me) === utils.getId(resource.from)
  },
  // measure(component, cb) {
  //   let handle = typeof component === 'number'
  //     ? component
  //     : findNodeHandle(component)

  //   RCTUIManager.measure(handle, cb)
  // },

  scrollComponentIntoView (container, component) {
    const handle = platformUtils.getNode(component)
    let currentScrollOffset = container.getScrollOffset && container.getScrollOffset().y
    const scrollView = container.refs && container.refs.scrollView || container
    const scrollResponder = scrollView.getScrollResponder()
    const additionalOffset = utils.isWeb() ? 0 : 120
    let autoScroll
    if (typeof currentScrollOffset === 'undefined') {
      if (utils.isWeb()) currentScrollOffset = 0
      else autoScroll = true
    }

    setTimeout(function () {
      if (autoScroll) {
        platformUtils.autoScroll(scrollView, handle, additionalOffset)
      } else {
        manualScroll(scrollView, handle)
      }
    }, 50)

    function manualScroll (scrollView, handle) {
      platformUtils.measure(scrollView, handle, function (err, rect) {
        if (err) {
          debugger
          return
        }

        // left,top,width,right describe the offset
        // and size of the component we want to scroll into view
        //
        // currentScrollOffset is how far down we've scrolled already

        const { left, top, width, height } = rect

        let keyboardScreenY = Dimensions.get('window').height;
        if (scrollResponder.keyboardWillOpenTo) {
          keyboardScreenY = scrollResponder.keyboardWillOpenTo.endCoordinates.screenY;
        }

        // how much space we have from the component's bottom to the keyboard's top
        // top + height
        let componentBottomY = top + height
        let keyboardTopY = currentScrollOffset + keyboardScreenY
        let bottomExpansionNeeded = componentBottomY - keyboardTopY + additionalOffset

        let topExpansionNeeded = currentScrollOffset - top + platformUtils.navBarHeight * 2
        let scrollOffsetY
        if (bottomExpansionNeeded > 0) {
          scrollOffsetY = currentScrollOffset + bottomExpansionNeeded
        } else if (topExpansionNeeded > 0) {
          scrollOffsetY = currentScrollOffset - topExpansionNeeded
        } else {
          return
        }

        platformUtils.scrollTo(scrollView, 0, scrollOffsetY)
      });
    }
  },

  onNextTransitionStart(navigator, fn) {
    let remove = normalizeRemoveListener(navigator.navigationContext.addListener('willfocus', () => {
      remove()
      setTimeout(fn, 0)
    }))

    return remove
  },

  onNextTransitionEnd(navigator, fn) {
    let remove = normalizeRemoveListener(navigator.navigationContext.addListener('didfocus', () => {
      remove()
      setTimeout(fn, 0)
    }))

    return remove
  },

  /**
   * optimized multi-get from levelup
   * @param  {Object} opts
   * @param  {levelup} opts.db
   * @param  {Array} opts.keys
   * @param  {Boolean} opts.strict (optional) - if true, fail if any keys is not found
   * @return {[type]}      [description]
   */
  multiGet(opts) {
    let strict = opts.strict
    let loc = opts.db.location
    let keys = opts.keys
    return AsyncStorage.multiGet(keys.map(function (key) {
      return loc + '!' + key
    }))
    .then(function (results) {
      if (strict) {
        if (results.some(function (r) {
          return !r[1]
        })) {
          throw new levelErrors.NotFoundError()
        }

        return results.map(parseDBValue)
      } else {
        return results.map(function (pair) {
          return {
            value: parseDBValue(pair),
            reason: pair[1] ? null : new levelErrors.NotFoundError()
          }
        })
      }
    })
  },

  joinURL(...parts) {
    var first = parts.shift()
    var rest = parts.join('/')
    var addSlash
    if (first[first.length - 1] === '/') first = first.slice(0, -1)
    if (rest[0] === '/') rest = rest.slice(1)

    return first + '/' + rest
  },

  promiseDelay(millis) {
    return Q.Promise((resolve) => {
      setTimeout(resolve, millis)
    })
  },

  // TODO: add maxTries
  tryWithExponentialBackoff(fn, opts) {
    opts = opts || {}
    const backoff = Backoff.exponential(extend(BACKOFF_DEFAULTS, opts))
    return fn().catch(backOffAndLoop)

    function backOffAndLoop () {
      const defer = Q.defer()
      backoff.once('ready', defer.resolve)
      backoff.backoff()
      return defer.promise
        .then(fn)
        .catch(backOffAndLoop)
    }
  },

  fetchWithTimeout(url, opts, timeout) {
    return Q.race([
      fetch(url, opts),
      Q.Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(new Error('timed out'))
        }, timeout)
      })
    ])
  },

  fetchWithBackoff(url, opts, requestTimeout) {
    return utils.tryWithExponentialBackoff(() => {
      return utils.fetchWithTimeout(url, opts, requestTimeout || DEFAULT_FETCH_TIMEOUT)
    })
  },

  normalizeCurrencySymbol(symbol) {
    // TODO: remove this after fixing encoding bug
    if (!symbol  ||  typeof symbol === 'string')
      return symbol
    else
      return symbol.symbol
    // return symbol ? (symbol === '¬' ? '€' : symbol) : symbol
  },
  isSimulator() {
    if (utils.isWeb()) return false

    return DeviceInfo.getModel() === 'Simulator' || DeviceInfo.isEmulator()
  },
  toOldStyleWrapper: function (wrapper) {
    if (!wrapper.permalink) return wrapper

    if (wrapper.object) {
      const payload = wrapper.object[TYPE] === 'tradle.Message' ? wrapper.object.object : wrapper.object
      const link = protocol.linkString(payload)
      wrapper[CUR_HASH] = link
      wrapper[ROOT_HASH] = payload[ROOT_HASH] || link
      wrapper.from = { [ROOT_HASH]: wrapper.author }
      // wrapper.to = wrapper.author
      wrapper.parsed = {
        data: payload
      }

      wrapper[TYPE] = payload[TYPE]
    }
    else if (wrapper.objectinfo) {
      wrapper[CUR_HASH] = wrapper.objectinfo.link
      wrapper[ROOT_HASH] = wrapper.objectinfo.permalink
      wrapper[TYPE] = wrapper.objectinfo.type
    }
    else {
      wrapper[CUR_HASH] = wrapper.link
      wrapper[ROOT_HASH] = wrapper.permalink
      wrapper[TYPE] = wrapper.type
    }

    return wrapper
  },
  setupSHACaching: function setupSHACaching (protocol) {
    const merkle = protocol.DEFAULT_MERKLE_OPTS
    if (merkle._caching) return

    const cache = new Cache({ max: 500 })
    protocol.DEFAULT_MERKLE_OPTS = {
      _caching: true,
      leaf: function leaf (a) {
        const key = 'l:' + a.data.toString('hex')
        const cached = cache.get(key)
        if (cached) return cached

        const val = merkle.leaf(a)
        cache.set(key, val)
        return val
      },
      parent: function parent (a, b) {
        const key = 'p:' + a.hash.toString('hex') + b.hash.toString('hex')
        const cached = cache.get(key)
        if (cached) return cached

        const val = merkle.parent(a, b)
        cache.set(key, val)
        return val
      }
    }
  },

  generateSalt: function (opts) {
    opts = opts || {}
    const salt = crypto.randomBytes(opts.length || 32)
    return opts.enc ? salt.toString(opts.enc) : salt
  },

  hashPassword: function (opts) {
    if (typeof opts === 'string') opts = { password: opts }
    // if (utils.isWeb()) {
    //   const result = utils.kdf(opts)
    //   return { hash: result.key, salt: result.salt }
    // }

    const salt = opts.salt || utils.generateSalt()
    const saltStr = salt.toString(PASSWORD_ENC)
    const hash = crypto.createHash('sha256')
      .update(opts.password + saltStr)
      .digest()

    return { hash, salt }

    // TODO: pbkdf2Sync with ~100000 iterations
    // but currently kdf takes ~7 seconds for 10000!
    // const result = utils.kdf(opts)
    // return { hash: result.key, salt: result.salt }
  },

  kdf: function (opts) {
    if (typeof opts === 'string') opts = { password: opts }

    const password = opts.password
    const salt = opts.salt || utils.generateSalt({ length: opts.saltBytes || 32 })
    const iterations = opts.iterations || 10000
    const keyBytes = opts.keyBytes || 32
    const digest = opts.digest || 'sha256'
    const key = crypto.pbkdf2Sync(password, salt, iterations, keyBytes, digest)
    return { key, salt }
  },

  setPassword: function (username, password) {
    debug(`saving password for username "${username}", service ${ENV.serviceID}`)
    return Keychain.setGenericPassword(username, password, ENV.serviceID)
  },

  getPassword: function (username) {
    return Keychain.getGenericPassword(username, ENV.serviceID)
  },

  /**
   * store hashed and salted password
   * @param {[type]} username [description]
   * @param {[type]} password [description]
   */
  setHashedPassword: function (username, password) {
    const result = utils.hashPassword({ password })
    return utils.setPassword(username, result.hash.toString(PASSWORD_ENC) + result.salt.toString(PASSWORD_ENC))
  },

  getHashedPassword: function (username) {
    return utils.getPassword(username)
      .then(encoded => {
        const salt = encoded.slice(-64) // 32 bytes in hex
        const hash = encoded.slice(0, encoded.length - 64)
        return {
          hash: new Buffer(hash, PASSWORD_ENC),
          salt: new Buffer(salt, PASSWORD_ENC)
        }
      })
  },

  checkHashedPassword: function (username, password) {
    return utils.getHashedPassword(username)
      .then(stored => {
        const hash = utils.hashPassword({
          password,
          salt: stored.salt
        }).hash

        return stored.hash.equals(hash)
      })
      .catch(err => {
        return false
      })
  },

  resetPasswords: function () {
    return Promise.all([
      Keychain.resetGenericPasswords(),
      Keychain.resetGenericPasswords(ENV.serviceID)
    ])
  },
  isAndroid: ENV.isAndroid,
  isIOS: ENV.isIOS,
  isWeb: ENV.isWeb,
  fetch: fetch,
  /* from react-native/Libraries/Utilities */
  groupByEveryN: function groupByEveryN<T>(array: Array<T>, n: number): Array<Array<?T>> {
    var result = [];
    var temp = [];

    for (var i = 0; i < array.length; ++i) {
      if (i > 0 && i % n === 0) {
        result.push(temp);
        temp = [];
      }
      temp.push(array[i]);
    }

    if (temp.length > 0) {
      while (temp.length !== n) {
        temp.push(null);
      }
      result.push(temp);
    }

    return result;
  },

  promiseThunky: function (fn) {
    let promise
    return function () {
      return promise ? promise : promise = fn.apply(this, arguments)
    }
  },

  getTopNonAuthRoute: function (navigator) {
    const routes = navigator.getCurrentRoutes()
    let top
    while (top = routes.pop()) {
      if (!top || top.component.displayName !== 'PasswordCheck') break
    }

    return top
  },
  // orientation() {
  //   // disallow PORTRAITUPSIDEDOWN
  //   return orientation === 'PORTRAITUPSIDEDOWN' ? 'LANDSCAPE' : orientation.replace(/-LEFT|-RIGHT/, '')
  // },
  dimensions(Component) {
    return getDimensions(Component)
  },
  styleFactory(Component, create) {
    if (!Component.displayName) throw new Error('component must have "displayName"')

    return () => {
      var key = Component.displayName
      if (!stylesCache[key]) {
        stylesCache[key] = {}
      }

      var subCache = stylesCache[key]
      var dimensions = getDimensions(Component)
      var subKey = dimensions.width + 'x' + dimensions.height
      if (!subCache[subKey]) {
        var orientation = getOrientation(Component)
        var { width, height } = dimensions
        var switchWidthHeight = !utils.isWeb() && (
          (orientation === 'PORTRAIT' && width > height) ||
          (orientation === 'LANDSCAPE' && width < height)
        )

        if (switchWidthHeight) {
          dimensions = { width: height, height: width }
        }

        subCache[subKey] = create({ dimensions })
      }

      return subCache[subKey]
    }
  },
  resized: function (props, nextProps) {
    return props.orientation !== nextProps.orientation ||
          props.width !== nextProps.width              ||
          props.height !== nextProps.height
  },
  imageQuality: 0.2,
  restartApp: function () {
    if (utils.isWeb()) {
      window.location.reload()
    } else {
      NativeModules.CodePush.restartApp(false)
    }
  },

  isImageDataURL(dataUrl) {
    if (!dataUrl) return false

    const mime = utils.getMimeType({ dataUrl })
    return /^image\//.test(mime)
  },

  getMimeType({ dataUrl }) {
    // data:image/jpeg;base64,...
    return dataUrl.slice(5, dataUrl.indexOf(';'))
  },

  readFile: Platform.OS == 'web' && function readFile (file, cb) {
    var reader  = new FileReader();
    reader.addEventListener('load', function () {
      cb(null, reader.result)
    }, false)

    reader.addEventListener('error', cb)
    reader.readAsDataURL(file)
  },

  readImage: Platform.OS == 'web' && function readImage (file, cb) {
    utils.readFile(file, function (err, dataUrl) {
      const mime = utils.getMimeType({ dataUrl })
      if (!/^image\//.test(mime)) {
        return cb(null, {
          url: dataUrl
        })
        // return cb(new Error('invalid format'))
      }

      const image = new window.Image()
      image.addEventListener('error', function (err) {
        if (!err) err = new Error('failed to load image')

        cb(err)
      })

      image.addEventListener('load', function () {
        cb(null, {
          url: dataUrl,
          width: image.width,
          height: image.height
        })
      })

      image.src = dataUrl
    })
  },
  printStack: tradleUtils.printStack.bind(tradleUtils),
  addCatchLogger: function (name, fn) {
    return function () {
      return fn.apply(this, arguments)
        .catch(err => {
          console.warn(`${name} failed:`, err.stack || err.message || err)
          throw err
        })
    }
  },
  getPhotoProperty(resource) {
    let props = this.getModel(resource[constants.TYPE]).value.properties
    let photoProp
    for (let p in resource) {
      if (props[p].ref === PHOTO  &&  props[p].mainPhoto)
        return props[p]
    }
    return props.photos
  },

  locker,
  getMainPhotoProperty(model) {
    let mainPhoto
    let props = model.properties
    for (let p in props) {
      if (props[p].mainPhoto)
        mainPhoto = p
    }
    return mainPhoto
  },
  getResourcePhotos(model, resource) {
    var mainPhoto, photos
    let props = model.properties
    for (let p in resource) {
      if (!props[p] ||  (props[p].ref !== PHOTO && (!props[p].items || props[p].items.ref !== PHOTO)))
        continue
      if (props[p].mainPhoto) {
        mainPhoto = resource[p]
        continue
      }
      if (!photos)
        photos = []
      if (props[p].items)
        resource[p].forEach((r) => photos.push(r))
      else
        photos.push(resource[p])
    }
    if (!photos) {
      if (mainPhoto)
        return [mainPhoto]
    }
    else {
      if (!mainPhoto)
        return photos
      photos.splice(0, 0, mainPhoto)
      return photos
    }
  },
  getPropertiesWithRange(range, model) {
    let props = model.properties
    let rProps = []
    for (let p in props)
      if (props[p].range === range)
        rProps.push(props[p])
    return rProps
  },
  fromMicroBlink: function (result) {
    const { mrtd, usdl, eudl, image } = result
    if (mrtd) {
      return {
        [TYPE]: 'tradle.Passport',
        givenName: mrtd.secondaryId,
        surname: mrtd.primaryId,
        nationality: {
          id: 'tradle.Country_abc',
          title: mrtd.nationality.slice(0, 2)
        },
        issuingCountry: {
          id: 'tradle.Country_abc',
          title: mrtd.issuer.slice(0, 2)
        },
        passportNumber: mrtd.documentNumber,
        sex: {
          id: 'tradle.Sex_abc',
          title: mrtd.sex === 'M' ? 'Male' : 'Female'
        },
        dateOfExpiry: mrtd.dateOfExpiry,
        dateOfBirth: mrtd.dateOfBirth,
        photos: [
          {
            url: image.base64,
            // width: image.width,
            // height: image.height,
            // isVertical: image.width < image.height
          }
        ]
      }
    }
  },
  fromAnyline: function (result) {
    const { scanMode, cutoutBase64, barcode, reading, data } = result
    // as produced by newtondev-mrz-parser
    // {
    //       documentCode: documentCode,
    //       documentType: 'PASSPORT',
    //       documentTypeCode: documentType,
    //       issuer: issuerOrg,
    //       names: names,
    //       documentNumber: documentNumber,
    //       nationality: nationality,
    //       dob: dob,
    //       sex: sex,
    //       checkDigit: {
    //         documentNumber: {value: checkDigit1, valid: checkDigitVerify1},
    //         dob: {value: checkDigit2, valid: checkDigitVerify2},
    //         expiry: {value: checkDigit3, valid: checkDigitVerify3},
    //         personalNumber: {value: checkDigit4, valid: checkDigitVerify4},
    //         finalCheck: {value: checkDigit5, valid: checkDigitVerify5},
    //         valid: (checkDigitVerify1 && checkDigitVerify2 && checkDigitVerify3 && checkDigitVerify4 && checkDigitVerify5)
    //       },
    //       expiry: expiry,
    //       personalNumber: personalNumber
    //     }

    // if (scanMode === 'MRZ') {
    //   const { names, nationality, issuer, dob, expiry, sex, documentNumber, personalNumber } = data
    //   return {
    //     [TYPE]: 'tradle.Passport',
    //     givenName: names[0],
    //     surname: names.lastName,
    //     passportNumber: documentNumber || personalNumber,
    //     nationality: {
    //       id: 'tradle.Country_abc',
    //       title: nationality.abbr.slice(0, 2)
    //     },
    //     issuingCountry: {
    //       id: 'tradle.Country_abc',
    //       title: issuer.abbr.slice(0, 2)
    //     },
    //     sex: {
    //       id: 'tradle.Sex_abc',
    //       title: sex.full
    //     },
    //     // todo: set offset by country
    //     dateOfExpiry: dateFromParts(expiry),
    //     dateOfBirth: dateFromParts(dob),
    //     photos: [
    //       {
    //         url: cutoutBase64
    //       }
    //     ]
    //   }
    // }

    if (scanMode === 'MRZ') {
      // as returned by the `mrz` package
      // {
      //   "isValid": true,
      //   "format": "TD3",
      //   "documentType": {
      //     "code": "P",
      //     "label": "Passport",
      //     "type": "",
      //     "isValid": true
      //   },
      //   "issuingCountry": {
      //     "code": "UTO",
      //     "isValid": false,
      //     "error": "The country code \"UTO\" is unknown"
      //   },
      //   "lastname": "ERIKSSON",
      //   "firstname": "ANNA MARIA",
      //   "nationality": {
      //     "code": "UTO",
      //     "isValid": false,
      //     "error": "The country code \"UTO\" is unknown"
      //   },
      //   "birthDate": {
      //     "year": "69",
      //     "month": "08",
      //     "day": "06",
      //     "isValid": true
      //   },
      //   "sex": {
      //     "code": "F",
      //     "label": "Féminin",
      //     "isValid": true
      //   },
      //   "expirationDate": {
      //     "year": "94",
      //     "month": "06",
      //     "day": "23",
      //     "isValid": true
      //   },
      //   "personalNumber": {
      //     "value": "ZE184226B",
      //     "isValid": true
      //   }
      // }

      const {
        issuingCountry,
        nationality,
        lastname,
        firstname,
        birthDate,
        sex,
        expirationDate,
        documentNumber,
        personalNumber
      } = data

      return {
        [TYPE]: 'tradle.Passport',
        givenName: firstname.split(' ')[0],
        surname: lastname,
        passportNumber: documentNumber || personalNumber,
        nationality: {
          id: 'tradle.Country_abc',
          title: nationality.code.slice(0, 2)
        },
        issuingCountry: {
          id: 'tradle.Country_abc',
          title: issuingCountry.code.slice(0, 2)
        },
        sex: {
          id: 'tradle.Sex_abc',
          title: sex.code === 'M' ? 'Male' : 'Female'
        },
        // todo: set offset by country
        dateOfExpiry: dateFromParts(expirationDate),
        dateOfBirth: dateFromParts(birthDate),
        photos: [
          {
            url: cutoutBase64
          }
        ]
      }
    }
  },
  submitLog: async function () {
    const me = utils.getMe()
    try {
      const res = await submitLog(ENV.serverToSendLog + '?' + querystring.stringify({
        firstName: me.firstName,
        lastName: me.lastName
      }))

      if (res.status > 300) {
        const why = await res.text()
        throw new Error(why)
      } else {
        Alert.alert('Success!', 'The log was sent to the Tradle developer team!')
      }

      return true
    } catch (err) {
      Alert.alert('Failed to send log', err.message)
      return false
    }
  },
  getPermalink(object) {
    return object[ROOT_HASH] || protocol.linkString(object)
  },
  addContactIdentity: async function (node, { identity, permalink }) {
    if (!permalink) permalink = utils.getPermalink(identity)

    // defensive copy
    identity = utils.clone(identity)

    let match
    try {
      match = await node.addressBook.byPermalink(permalink)
      if (equal(match.object, identity)) return
    } catch (err) {
      // oh well, I guess we have to do things the long way
    }

    return node.addContactIdentity(identity)
  },

  urlsEqual: function urlsEqual (a, b) {
    return trimTrailingSlashes(a) === trimTrailingSlashes(b)
  },
  isMessage(m) {
    if (typeof m === 'string')
      m = this.getModel(m).value
    else if (m[TYPE])  // resource was passed
      m = this.getModel(m[TYPE]).value

    if (m.isInterface  &&  (m.id === MESSAGE || m.id === DOCUMENT || m.id === ITEM))
      return true
    if (m.interfaces && m.interfaces.indexOf(MESSAGE) !== -1)
      return true
  },
  getEnumProperty(model) {
    let props = model.properties
    for (let p in props)
      if (p !== TYPE)
        return p
  },
  requestCameraAccess: async function (opts={}) {
    if (utils.isAndroid()) {
      const check = PermissionsAndroid.check || PermissionsAndroid.checkPermission
      const request = PermissionsAndroid.request || PermissionsAndroid.requestPermission
      // const alreadyGranted = check.call(PermissionsAndroid, PermissionsAndroid.PERMISSIONS.CAMERA)
      // if (alreadyGranted) return true

      return await request.call(
        PermissionsAndroid,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': utils.translate('cameraAccess'),
          'message': utils.translate('enableCameraAccess')
        }
      )
    }

    const { video=true, audio=false } = opts

    if (!(video || audio)) throw new Error('expected "video" and/or "audio"')

    let request
    if (video && audio) {
      request = Camera.checkDeviceAuthorizationStatus()
    } else if (video) {
      request = Camera.checkVideoAuthorizationStatus()
    } else {
      request = Camera.checkAudioAuthorizationStatus()
    }

    const granted = await request
    if (granted) return true

    Alert.alert(
      utils.translate('cameraAccess'),
      utils.translate('enableCameraAccess'),
      [
        { text: 'Cancel' },
        {
          text: 'Settings',
          onPress: () => {
            Linking.openURL('app-settings:')
          }
        }
      ]
    )
  },
  onTakePic(prop, data, formRequest) {
    if (!data)
      return
    // Disable FormRequest
    let isFormRequest = formRequest[TYPE] === FORM_REQUEST

    if (isFormRequest) {
      var params = {
        value: {documentCreated: true},
        doneWithMultiEntry: true,
        resource: formRequest,
        meta: utils.getModel(formRequest[TYPE]).value
      }
      Actions.addItem(params)
    }
    let photo = {
      url: data.data,
      height: data.height,
      width: data.width
    }
    let propName = (typeof prop === 'string') ? prop : prop.name
    Actions.addItem({
      disableFormRequest: isFormRequest ? formRequest : null,
      resource: {
        [TYPE]: isFormRequest ? formRequest.form : formRequest.prefill[TYPE],
        [propName]: photo,
        _context: formRequest._context,
        from: utils.getMe(),
        to: formRequest.from  // FormRequest.from
      }
    })
  },
  isSealableModel: function (model) {
    return model.subClassOf === 'tradle.Form' || model.subClassOf === 'tradle.MyProduct' || model.id === 'tradle.Verification'
  },
  isSavedItem(r) {
    let type = this.getType(r)
    let m = this.getModel(type).value
    if (!m.interfaces || m.interfaces.indexOf(ITEM) === -1)
      return
    let toId = utils.getId(r.to)
    let fromId = utils.getId(r.from)
    return toId === fromId  &&  toId === utils.getId(this.getMe())
  },
  getContentSeparator(bankStyle) {
    let separator = {}
    if (bankStyle) {
      if (bankStyle.NAV_BAR_BORDER_COLOR) {
        separator.borderTopColor = bankStyle.NAV_BAR_BORDER_COLOR
        separator.borderTopWidth = bankStyle.NAV_BAR_BORDER_WIDTH ||  StyleSheet.hairlineWidth
      }
    }
    return separator
  },
  parseMessage(resource, message, bankStyle, idx) {
    let i1 = message.indexOf('**')
    let formType, message1, message2
    let messagePart
    if (i1 === -1)
      return message
    formType = message.substring(i1 + 2)
    let i2 = formType.indexOf('**')
    if (i2 !== -1) {
      message1 = message.substring(0, i1)
      message2 = i2 + 2 === formType.length ? '' : formType.substring(i2 + 2)
      formType = formType.substring(0, i2)
    }
    let key = this.getDisplayName(resource).replace(' ', '_') + (idx || 0)
    idx = idx ? ++idx : 1
    return <Text key={key} style={[chatStyles.resourceTitle, resource.documentCreated ? {color: bankStyle.INCOMING_MESSAGE_OPAQUE_TEXT_COLOR} : {}]}>{message1}
             <Text style={{color: bankStyle.LINK_COLOR}}>{formType}</Text>
             <Text>{utils.parseMessage(resource, message2, bankStyle, idx)}</Text>
           </Text>
  },
  addDefaultPropertyValuesFor(provider) {
    defaultPropertyValues[this.getId(provider)] = provider._defaultPropertyValues
  },
  addHidePropertyInEditFor(provider) {
    hidePropertyInEdit[this.getId(provider)] = provider._hidePropertyInEdit
  },
  isHidden(p, resource) {
    let modelName = resource[TYPE]
    if (!this.isMessage(this.getModel(modelName).value))
      return
    // Check if the resource is one of the remedition resources
    // and in a reviewing after scan process - there are no from or to in it
    let isReview = !resource.from
    if (isReview)
      return
    let meId = this.getId(me)
    let provider = (utils.getId(resource.from) === meId) ? resource.to.organization : resource.from.organization
    if (!provider)
      return

    let hiddenProps = hidePropertyInEdit[utils.getId(provider)]
    if (hiddenProps) {
      hiddenProps = hiddenProps[modelName]
      return hiddenProps  &&  hiddenProps.indexOf(p) !== -1
    }
  },

  parseMessageFromDB(message) {
    let object = message
    while (object[TYPE] === MESSAGE) {
      let key = object.recipientPubKey
      if (!Buffer.isBuffer(key.pub)) {
        key.pub = new Buffer(key.pub.data)
      }

      object = object.object
      if (!object) break
    }

    return message
  },

  // isResourceInMyData(r) {
  //   let toId = utils.getId(r.to)
  //   let fromId = utils.getId(r.from)
  //   return toId === fromId  &&  toId === utils.getId(utils.getMe())
  // },
  getMessageWidth(component) {
    let width = component ? this.dimensions(component).width : this.dimensions().width
    width = width > MAX_WIDTH ? MAX_WIDTH : width
    // if (width > 800)
    //   width = 800
    // width = Math.floor(utils.dimensions().width * 0.7)
    return Math.floor(width * 0.7)
  },
  getContentWidth(component) {
    let width = component ? this.dimensions(component).width : this.dimensions().width
    return ENV.fullScreen ? width - 20 : Math.min(width, MAX_WIDTH)
  },
  setGlobal: function (key, val) {
    global[key] = val
  }
}

if (__DEV__) {
  ;['setPassword', 'getPassword'].forEach(method => {
    utils[method] = utils.addCatchLogger(method, utils[method])
  })
}

function trimTrailingSlashes (str) {
  return str.replace(/\/+$/, '')
}

function normalizeRemoveListener (addListenerRetVal) {
  return () => {
    if (addListenerRetVal.remove) {
      addListenerRetVal.remove()
    } else {
      addListenerRetVal()
    }
  }
}

/**
 * recover Buffer objects
 * @param  {Object} json
 * @return {Object} json with recovered Buffer-valued properties
 */
function rebuf (json) {
  if (Object.prototype.toString.call(json) !== '[object Object]') return json

  if (json &&
    json.type === 'Buffer' &&
    json.data &&
    !Buffer.isBuffer(json) &&
    Object.keys(json).length === 2) {
    return new Buffer(json.data)
  } else {
    for (var p in json) {
      json[p] = rebuf(json[p])
    }

    return json
  }
}

function parseDBValue (pair) {
  return pair[1] && rebuf(JSON.parse(pair[1]))
}

function dateFromParts (parts) {
  const date = new Date()
  date.setUTCHours(0)
  date.setUTCMinutes(0)
  date.setUTCSeconds(0)
  date.setUTCMilliseconds(0)
  date.setUTCFullYear(Number(parts.year))
  date.setUTCMonth(Number(parts.month) - 1)
  date.setUTCDate(Number(parts.day))
  return date
}

function preParseStrings (strings, { appName, profileTitle }) {
  // TODO: generalize if we need to replace other variables
  const preparsed = {}

  for (let key in strings) {
    let str = strings[key]
    preparsed[key] = str.replace(/{appName}/g, appName)
    preparsed[key] = str.replace(/{profileTitle}/g, strings[profileTitle])
  }

  preparsed.profile = strings[profileTitle]
  return preparsed
}

module.exports = utils;
/*
  getDisplayName1(resource, meta) {
    if (!meta) {
      if (resource.title)
        return resource.title
      if (resource.id)
        return ""
      meta = this.getModel(resource[TYPE]).value.properties
    }
    let dProps = this.getPropertiesWithAnnotation(meta, 'displayName')

    let m = this.getModel(resource[TYPE])
    let vCols = m  &&  m.value.viewCols
    var displayName = '';
    if (vCols) {
      vCols.forEach((p) => {
        if (dProps[p]) {
          let dn = this.getPropStringValue(meta[p], resource)
          displayName += displayName.length ? ' ' + dn : dn;
        }
      })
      // if (displayName.length)
      //   return displayName
    }
    // if models does not have viewCols or not all displayName props are listed in viewCols
    for (var p in meta) {
      if (p.charAt(0) === '_')
        continue
      if (vCols  &&  vCols.indexOf(p) !== -1)
        continue
      if (dProps)  {
        if (!dProps[p]) {
          if (!displayName  &&  m  &&  resource[p]  &&  m.value.subClassOf === 'tradle.Enum')
            return resource[p];
          continue
        }
        else {
          let dn = this.getPropStringValue(meta[p], resource)
          displayName += displayName.length ? ' ' + dn : dn;
        }
      }
      // let dn = this.getPropStringValue(meta[p], resource)
      // displayName += displayName.length ? ' ' + dn : dn;
    }
    return displayName;
  },
*/
