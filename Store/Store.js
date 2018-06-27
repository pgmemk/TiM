console.log('requiring Store.js')
'use strict';

import '../utils/perf'
import path from 'path'
import { parse as parseURL } from 'url'
import ReactNative, {
  Alert,
  NetInfo,
  Platform,
  AppState,
  InteractionManager
} from 'react-native'
import _ from 'lodash'
import pick from 'object.pick'
import dotProp from 'dot-prop'
const noop = () => {}
const promiseIdle = () => InteractionManager.runAfterInteractions(noop)
// const { ApolloClient, createNetworkInterface } = require('apollo-client')

import Analytics from '../utils/analytics'
import AsyncStorage from './Storage'
import * as LocalAuth from '../utils/localAuth'
import Push from '../utils/push'
import createSemaphore from 'psem'
import EventEmitter from 'events'
import Promise, { coroutine as co } from 'bluebird'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'
import plugins from '@tradle/biz-plugins'
import appPlugins from '../plugins'

import yukiConfig from '../yuki.json'

import Reflux from 'reflux'
import Actions from '../Actions/Actions'
import Debug from 'debug'

import deepEqual from 'deep-equal'
import once from 'once'

import createProcessor from 'level-change-processor'

const SENT = 'Sent'
const SENDING = 'Sending'
const QUEUED = 'Queued'

const ADD = 1
const DELETE = -1

var debug = Debug('tradle:app:store')
import employee from '../people/employee.json'

const FRIEND = 'Tradler'
const ALREADY_PUBLISHED_MESSAGE = '[already published](tradle.Identity)'

import { getCoverPhotoForRegion, getYukiForRegion } from './locale'

import Q from 'q'
Q.longStackSupport = true
Q.onerror = function (err) {
  debug(err.stack)
  throw err
}

import ENV from '../utils/env'
// const graphqlEndpoint = `${ENV.LOCAL_TRADLE_SERVER.replace(/[/]+$/, '')}/graphql`
// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: graphqlEndpoint
//   })
// })

// import AddressBook from 'NativeModules'.AddressBook;
import tradle from '@tradle/engine'
var myCustomIndexes
// build indexes to enable searching by subClassOf
// and by from + subClassOf

const tradleUtils = tradle.utils
const protocol = tradle.protocol
const {
  NONCE,
  TYPE,
  SIG,
  SEQ,
  ROOT_HASH,
  CUR_HASH,
  PREV_HASH,
  ORG,
  ORG_SIG,
} = tradle.constants

// const MSG_LINK = '_msg'
const IS_MESSAGE = '_message'
const NOT_CHAT_ITEM = '_notChatItem'

import utils from '../utils/utils'
import graphQL from './graphql/graphql-client'
import storeUtils from './utils/storeUtils'
import { models as baseModels, data as sampleData } from '@tradle/models'

const ObjectModel = baseModels['tradle.Object']
const NON_VIRTUAL_OBJECT_PROPS = Object.keys(ObjectModel.properties).filter(p => {
  return !ObjectModel.properties[p].virtual
})

const voc = require('./voc')

import sampleProfile from '../data/sampleProfile.json'
import welcome from '../data/welcome.json'

import sha from 'stable-sha1'
var Keychain = ENV.useKeychain !== false && !utils.isWeb() && require('../utils/keychain')
var translate = utils.translate
import promisify from 'pify'
var collect = promisify(require('stream-collector'))
import debounce from 'debounce'
import asyncstorageDown from 'asyncstorage-down'
import levelup from 'levelup'
import mutexify from 'mutexify'
import DeviceInfo from 'react-native-device-info'
// import updown from 'level-updown'

import leveldown from 'cachedown'
leveldown.setLeveldown(asyncstorageDown)
var level = function (loc, opts) {
  opts = opts || {}
  opts.db = opts.db || function () {
    return leveldown.apply(null, arguments)
      .maxSize(100) // max cache size
  }

  return levelup(loc, opts)
}

// import enforceOrder from '@tradle/receive-in-order'
import Multiqueue from '@tradle/multiqueue'

import Cache from 'lru-cache'
const NEXT_HASH = '_n'
const LAST_MESSAGE_TIME = 'lastMessageTime'

import constants from '@tradle/constants'
const {
 ORGANIZATION,
 IDENTITY,
 IDENTITY_PUBLISHING_REQUEST,
 MESSAGE,
 SIMPLE_MESSAGE,
 FINANCIAL_PRODUCT,
 PROFILE,
 VERIFICATION,
 FORM,
 MODEL,
 CUSTOMER_WAITING ,
 SELF_INTRODUCTION,
 FORGET_ME,
 FORGOT_YOU,
 MONEY,
 SETTINGS,
 ENUM
} = constants.TYPES

const REMEDIATION_SIMPLE_MESSAGE = 'tradle.RemediationSimpleMessage'

// const SHARED_RESOURCE     = 'tradle.SharedResource'
const LENS                = 'tradle.Lens'
const SEAL                = 'tradle.Seal'
const INTERSECTION        = 'tradle.Intersection'
const MY_IDENTITIES_TYPE  = 'tradle.MyIdentities'
const INTRODUCTION        = 'tradle.Introduction'
const PRODUCT_REQUEST     = 'tradle.ProductRequest'
const CONTEXT             = 'tradle.Context'
const PARTIAL             = 'tradle.Partial'
const MY_PRODUCT          = 'tradle.MyProduct'
const FORM_ERROR          = 'tradle.FormError'
const EMPLOYEE_ONBOARDING = 'tradle.EmployeeOnboarding'
const MY_EMPLOYEE_PASS    = 'tradle.MyEmployeeOnboarding'
const FORM_REQUEST        = 'tradle.FormRequest'
const NEXT_FORM_REQUEST   = 'tradle.NextFormRequest'
const PAIRING_REQUEST     = 'tradle.PairingRequest'
const PAIRING_RESPONSE    = 'tradle.PairingResponse'
const PAIRING_DATA        = 'tradle.PairingData'
const ITEM                = 'tradle.Item'
const DOCUMENT            = 'tradle.Document'
const MY_IDENTITIES       = MY_IDENTITIES_TYPE + '_1'
const REMEDIATION         = 'tradle.Remediation'
const CONFIRM_PACKAGE_REQUEST = 'tradle.ConfirmPackageRequest'
const VERIFIABLE          = 'tradle.Verifiable'
const MODELS_PACK         = 'tradle.ModelsPack'
const STYLES_PACK         = 'tradle.StylesPack'
const TOUR                = 'tradle.Tour'
const CURRENCY            = 'tradle.Currency'
const APPLICATION_SUBMITTED  = 'tradle.ApplicationSubmitted'
const APPLICATION_SUBMISSION = 'tradle.ApplicationSubmission'
const PHOTO_ID            = 'tradle.PhotoID'
const PERSONAL_INFO       = 'tradle.PersonalInfo'
const BASIC_CONTACT_INFO  = 'tradle.BasicContactInfo'
const ASSIGN_RM           = 'tradle.AssignRelationshipManager'
const NAME                = 'tradle.Name'
const APPLICANT           = 'tradle.onfido.Applicant'
const CONFIRMATION        = 'tradle.Confirmation'
const APPLICATION_DENIAL  = 'tradle.ApplicationDenial'
const APPLICATION_APPROVAL= 'tradle.ApplicationApproval'
const COUNTRY             = 'tradle.Country'
const PHOTO               = 'tradle.Photo'
const SELFIE              = 'tradle.Selfie'
const BOOKMARK            = 'tradle.Bookmark'
const SHARE_REQUEST       = 'tradle.ShareRequest'
const APPLICATION         = 'tradle.Application'
// const DRAFT_APPLICATION   = 'tradle.DraftApplication'
// const FORM_PREFILL        = 'tradle.FormPrefill'
const VERIFIED_ITEM       = 'tradle.VerifiedItem'
const DATA_BUNDLE         = 'tradle.DataBundle'
const DATA_CLAIM          = 'tradle.DataClaim'
const CHECK               = 'tradle.Check'
const LEGAL_ENTITY        = 'tradle.legal.LegalEntity'

const MY_ENVIRONMENT      = 'environment.json'

const WELCOME_INTERVAL = 600000
const MIN_SIZE_FOR_PROGRESS_BAR = 30000

import AWSClient from '@tradle/aws-client'

// increase timeouts
AWSClient.CLOSE_TIMEOUT = 2000
AWSClient.SEND_TIMEOUT = 10000
AWSClient.CATCH_UP_TIMEOUT = 10000
AWSClient.CONNECT_TIMEOUT = 10000

import dns from 'dns'
import map from 'map-stream'
import Blockchain from '@tradle/cb-blockr' // use tradle/cb-blockr fork
// var defaultKeySet = midentity.defaultKeySet
import createKeeper from '@tradle/keeper'
import cachifyKeeper from '@tradle/keeper/cachify'
import Restore from '@tradle/restore'
import crypto from 'crypto'
import { loadOrCreate as loadYuki } from './yuki'
import Aviva from '../utils/aviva'
import monitorMissing from '../utils/missing'
import identityUtils from '../utils/identity'
import getBlockchainAdapter from '../utils/network-adapters'
import mcbuilder, { buildResourceStub, enumValue } from '@tradle/build-resource'

import Errors from '@tradle/errors'
import validateResource, { Errors as ValidateResourceErrors } from '@tradle/validate-resource'
// @ts-ignore
const { sanitize } = validateResource.utils

// import tutils from '@tradle/utils'
var isTest, originalMe;
var currentEmployees = {}

// var tim;
var PORT = 51086
var TIM_PATH_PREFIX = 'me'
// If app restarts in less then 10 minutes keep it authenticated
const AUTHENTICATION_TIMEOUT = LocalAuth.TIMEOUT
const ON_RECEIVED_PROGRESS = 0.66
const NUM_MSGS_BEFORE_REG_FOR_PUSH = __DEV__ ? 3 : 10
const ALL_MESSAGES = '_all'
var models = {}
var modelsWithAddOns = {}
var lenses = {}
var list = {};
var msgToObj = {}
var enums = {}
var chatMessages = {}

var contextIdToResourceId = {}

var temporaryResources = {}
var employees = {};
var db;
var ldb;
var isLoaded;
var me;
var language
var dictionary = {}
var isAuthenticated
var meDriver

// var cursor = {}
// var publishedIdentity
var ready;
var TOP_LEVEL_PROVIDERS = ENV.topLevelProviders || [ENV.topLevelProvider]
var SERVICE_PROVIDERS_BASE_URL_DEFAULTS = __DEV__ ? [].concat(ENV.LOCAL_TRADLE_SERVERS) : TOP_LEVEL_PROVIDERS.map(t => t.baseUrl)
var SERVICE_PROVIDERS_BASE_URLS
var HOSTED_BY = TOP_LEVEL_PROVIDERS.map(t => t.name)
// import ALL_SERVICE_PROVIDERS from '../data/serviceProviders'
var SERVICE_PROVIDERS = []
var publishRequestSent = []
var driverInfo = (function () {
  const clientToIdentifiers = new Map()
  const byUrl = {}
  const byIdentifier = {}
  const byPath = {}
  const wsClients = {
    add({ client, url, identifier, path }) {
      const identifiers = clientToIdentifiers.get(client) || []
      if (identifiers.indexOf(identifier) === -1) identifiers.push(identifier)

      clientToIdentifiers.set(client, identifiers)

      if (url) byUrl[url] = client
      if (identifier) byIdentifier[identifier] = client
      if (path) byPath[path] = client

      return client
    },
    providers({ client, url }) {
      if (!client) client = byUrl[url]

      return client && clientToIdentifiers.get(client) || []
    },
    getPath({ client }) {
      return utils.keyByValue(byPath, client)
    },
    getBaseUrl({ client, identifier }) {
      if (!client) client = wsClients.byIdentifier[identifier]

      return utils.keyByValue(byUrl, client)
    },
    getFullUrl({ client, identifier }) {
      if (!client) client = wsClients.byIdentifier[identifier]

      const base = wsClients.getBaseUrl({ client }).replace(/[/]+$/, '')
      const path = wsClients.getPath({ client }).replace(/^[/]/, '')
      return `${base}/${path}`
    },
    byUrl,
    byIdentifier
  }

  const restoreMonitors = {}
  restoreMonitors.add = function ({ node, identifier, url, receive }) {
    if (restoreMonitors[identifier]) return

    restoreMonitors[identifier] = monitorMissing({
      node,
      counterparty: identifier,
      url: `${url}/restore`,
      receive
    })
  }

  return {
    wsClients,
    restoreMonitors,
    identifierProp: TLS_ENABLED ? 'pubKey' : 'permalink'
  }
  // whitelist: [],
})()

// const KEY_SET = [
//   { type: 'bitcoin', purpose: 'payment' },
//   { type: 'bitcoin', purpose: 'messaging' },
//   { type: 'ec', purpose: 'sign', curve: 'p256' },
//   { type: 'ec', purpose: 'update', curve: 'p256' }
// ]

const ENCRYPTION_KEY = 'accountkey'
const DEVICE_ID = 'deviceid'
const ANALYTICS_KEY = 'analyticskey'

// const ENCRYPTION_SALT = 'accountsalt'
const TLS_ENABLED = false
const POLITE_TASK_TIMEOUT = __DEV__ ? 60000 : 6000

const {
  newAPIBasedVerification,
  newIdscanVerification,
  newAu10tixVerification,
  newVisualVerification,
  newVerificationTree,
  randomDoc,
  newFormRequestVerifiers
} = require('../utils/faker')

const disableBlockchainSync = node => {
  // disable sync
  if (node) {
    node.sealwatch.sync = function () {
      // hang
    }
  }
}

const getEmployeeBookmarks = ({ me, botPermalink }) => {
  const createdByBot = [
    APPLICATION,
    // DRAFT_APPLICATION,
    VERIFICATION,
    SEAL,
    'tradle.SanctionsCheck',
    'tradle.CorporationExistsCheck',
  ].map(id => {
    const model = utils.getModel(id)
    return {
      [TYPE]: BOOKMARK,
      message: utils.makeModelTitle(model, true),
      bookmark: {
        [TYPE]: id,
        _org: botPermalink
      },
      from: utils.buildRef(me)
    }
  })

  return createdByBot
}

// var Store = Reflux.createStore(timeFunctions({
var Store = Reflux.createStore({
  mixins: [TimerMixin],

  // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
  listenables: [Actions],
  // this will be called by all listening components as they register their listeners
  init() {
    return this.ready = this._init()
  },
  async _init() {
    const self = this
    // Setup components:
    db = level('TiM.db', { valueEncoding: 'json' });
    this._emitter = new EventEmitter()

    // ldb = levelQuery(level('TiM.db', { valueEncoding: 'json' }));
    // ldb.query.use(jsonqueryEngine());
    ;['get', 'put', 'batch', 'del'].forEach(method => {
      db[method] = promisify(db[method].bind(db))
    })

    this.announcePresence = debounce(this.announcePresence.bind(this), 100)
    this._loadedResourcesDefer = Q.defer()

    this._enginePromise = new Promise(resolve => {
      this._resolveWithEngine = resolve
    })

    this._mePromise = new Promise(resolve => {
      this._resolveWithMe = resolve
    })

    this._pushSemaphore = createSemaphore().go()

    if (ENV.registerForPushNotifications) {
      this.setupPushNotifications()
    }

    getAnalyticsUserId({ promiseEngine: this._enginePromise })
      .then(Analytics.setUserId)
      .then(() => Analytics.sendEvent({
        category: 'init',
        action: 'app_open'
      }))

    this._envPromise = this.loadEnv()
    this.cache = new Cache({max: 500, maxAge: 1000 * 60 * 60})

    // this.lockReceive = utils.locker({ timeout: 600000 })
    this._connectedServers = {}

    this._identityPromises = {}
    const connectivityPromise = Promise.race([
        NetInfo.getConnectionInfo()
          .then(isConnected => this._handleConnectivityChange(isConnected)),
        // timeout after 2s
        Promise.delay(2000)
    ])
    .catch(err => debug('failed to get network connectivity', err.message))

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      async (isConnected) => {
        // make sure events arrive after initial fetch
        await connectivityPromise
        this._handleConnectivityChange(isConnected)
      }
    );

    // NetInfo.isConnected.addEventListener(
    //   'change',
    //   this._handleConnectivityChange.bind(this)
    // );

    // // if (utils.isSimulator()) {
    // //   // isConnected always returns false on simulator
    // //   // https://github.com/facebook/react-native/issues/873
    // //   this.isConnected = true
    // // } else {
    //   NetInfo.isConnected.fetch().done(
    //     (isConnected) => {
    //       this.isConnected = isConnected
    //     }
    //   );
    // }
    // storeUtils.init({db, list, contextIdToResourceId, models})
    storeUtils.addModels({models, enums})
    this.loadModels()
    // await storeUtils.loadModels()
    // utils.setModels(models);
    utils.setModels(this.getModels())
    this.loadStaticData()
    // if (true) {
    if (false) {
      return await this.wipe()
    }

    await this.getReady()
    if (ENV.yukiOn) {
      await this._setupYuki()
    }
  },

  async _setupYuki() {
    const node = await this._enginePromise
    this._yuki = await loadYuki({
      node,
      db: level('~yuki')
    })

    await this.addYuki()
    await this._yuki.welcome()
    // this.postHistory()
  },

  onAcceptTermsAndChat(params) {
    me._termsAccepted = true;
    return this.dbPut(utils.getId(me), me)
    .then(() =>  {
      this.setMe(me)
      let bot = this._getItem(utils.makeId(PROFILE, params.bot))
      let provider = this._getItem(bot.organization)
      this.trigger({action: 'getProvider', provider: provider, termsAccepted: true})
    })
  },
  async getReady() {
    let me
    try {
      me = await this.getMe()
    } catch(err)  {
      debug('Store.init ' + err.stack)
    }

    this._noSplash = []
    let doMonitor = true
    if (!me  &&  ENV.autoRegister) { //  &&  (ENV.registrationWithoutTermsAndConditions || !ENV.landingPage)) {
      me = await this.autoRegister()
      doMonitor = false
    }
    await this.getSettings()

    if (!utils.isEmpty(list))
      isLoaded = true;

    await this._loadedResourcesDefer.promise
    if (me) {
      await this.getDriver(me)
      if (doMonitor)
        this.monitorTim()
    }

    if (me && me.registeredForPushNotifications) {
      Push.resetBadgeNumber()
    }
  },
  monitorLog() {
    let self = this
    const process = this.wrapWithIdentityFetcher(async (data) => {
      const { value } = data
      switch (value.topic) {
      case 'sent':
        return self.sent(value.link)
      case 'newobj':
        let {objectinfo} = value
        if (!objectinfo)
          break
        return self.newObject(value)
      case 'readseal':
        return self.readseal(value)
      case 'error':
        debugger
        console.log(data)
      }
    })

    const logProcessor = createProcessor({
      feed: meDriver.changes,
      // db to store pointer to latest processed log position
      db: level('./whatever-path-to-log-state.db'),
      worker: async (data, cb) => {
        // debugger
        try {
          await process(data)
        } catch (err) {
          debug('failed to process entry', data, err)
        } finally {
          cb()
        }
      }
    })
  },
  async sent(link) {
    let objId = msgToObj[link]
    if (!objId)
      return
    let r = this._getItem(objId)

    if (r && r._sendStatus !== SENT) {
      r._msg = link
      r._sendStatus = SENT
      r._sentTime = new Date().getTime()

      let rr = await this._keeper.get(r[CUR_HASH])
      let res = {}
      _.extend(res, rr)
      _.extend(res, r)
      this.rewriteStubs(res)
      this.addVisualProps(res)
      this.trigger({action: 'updateItem', sendStatus: SENT, resource: res})
      this.dbPut(objId, r)
    }
    let msg = await meDriver.objects.get(link)
    // this.maybeWatchSeal(msg)
  },
  async newObject (msg) {
    let {objectinfo, link} = msg
    let objId = utils.getId({
      [TYPE]: objectinfo.type,
      [ROOT_HASH]: objectinfo.permalink,
      [CUR_HASH]: objectinfo.link,
    })
    msgToObj[link] = objId
    if (msg.author === me[CUR_HASH])
      return

    let obj = await this._keeper.get(link)

    // debugger

    msg.object = utils.clone(obj)

    // this.maybeWatchSeal(msg)

    const payload = msg.object.object
    const originalPayload = payload[TYPE] === MESSAGE ? payload.object : payload
    debug('newObject:', originalPayload[TYPE])
    if (!objectinfo.author) {
      debug('ignoring double-wrapped object on first pass', originalPayload[TYPE])
      return
    }

    if (payload[TYPE] === MESSAGE) {
      let obj = msg.object
      try {
        const saved = await meDriver.saveObject({ object: originalPayload })
        // save object as if it came from BOT
        obj.from = {[ROOT_HASH]: saved.object  &&  saved.object._org  || saved.author}
        debug('newObject (unwrapped):', originalPayload[TYPE])
      } catch (err) {
        if (err.type !== 'exists') throw err
        obj.from = {[ROOT_HASH]: msg.objectinfo.author}
      }
      obj.objectinfo = msg.objectinfo
      try {
        const originalRecipient = await meDriver.addressBook.byPermalink(msg.object.object._recipient)
        obj.to = {[ROOT_HASH]: originalRecipient.permalink}
        obj.parsed = {data: payload.object}

        let rtype
        let t = obj.parsed.data[TYPE]
        if (t === PRODUCT_REQUEST)
          rtype = obj.parsed.data.requestFor
        else if (t === FORM_REQUEST)
          rtype = obj.parsed.data.form
        else
          rtype = t

        // let bot = this._getItem(utils.makeId(PROFILE, obj.from[ROOT_HASH]))
        // // let debugStr = 'SharedContext: org = ' + (bot.organization && bot.organization.title) + '; isEmployee = ' + utils.isEmployee(bot) + '; type = ' + rtype + '; hasModel = ' + this.getModel(rtype)
        // // debug(debugStr)
        // if (utils.isEmployee(bot)  &&  !this.getModel(rtype)) {
        //   // debug('SharedContext: request for models')
        //   await this.onAddMessage({msg: utils.requestForModels(), isWelcome: true})
        // }

        obj[ROOT_HASH] = protocol.linkString(obj.parsed.data)
        if (!obj.parsed.data[CUR_HASH])
          obj[CUR_HASH] = obj[ROOT_HASH]

        await this.putInDb(obj, true)
        this.triggerReceivedMessage(msg)
      } catch (err) {
        console.error('1. failed to process received message', err)
      }

      return
    }

    if (payload[TYPE] === VERIFICATION && payload.sources) {
      const sourceToAuthor = await lookupSourceAuthors(meDriver, payload.sources)
      for (let [verification, author] of sourceToAuthor) {
        let a = this._getItem(utils.makeId(PROFILE, author.permalink))
        verification.from = this.buildRef(a)
        verification.from.organization = utils.clone(a.organization)
      }
      // debugger
    }
    else if (payload[TYPE] === PARTIAL) {
      msg.object[ROOT_HASH] = msg.objectinfo.permalink

      payload.context = msg.object.forContext || msg.object.context
      payload.leaves = tradle.partial.interpretLeaves(payload.leaves)

      let partialPermalink = payload.leaves.find(l => l.key === ROOT_HASH && l.value)
      if (partialPermalink)
        msg.partialinfo.permalink = partialPermalink.value
      else
        msg.partialinfo.permalink = msg.partialinfo.link

      let from = utils.makeId(PROFILE, msg.partialinfo.author)
      let fromR = this._getItem(from)
      payload.from = fromR ? this.buildRef(fromR) : {id: from}

      let type = payload.leaves.find(l => l.key === TYPE && l.value).value
      payload.type = type
      let r = {
        [TYPE]: type,
        [ROOT_HASH]: msg.partialinfo.permalink,
        [CUR_HASH]: msg.partialinfo.link
      }
      payload.resource = {id: utils.getId(r)}
      let pid = utils.makeId(PROFILE, msg.objectinfo.author)
      payload.providerInfo = utils.clone(this._getItem(pid).organization)
      // debugger
    }
    // else if (payload[TYPE] === CONFIRM_PACKAGE_REQUEST)
    //   debugger

    const old = utils.toOldStyleWrapper(msg)

    let toId = utils.makeId(PROFILE, msg.recipient)
    let to = this._getItem(toId)
    old.to = this.buildRef(to)
    // // old.to = { [ROOT_HASH]: meDriver.permalink }
    // let rtype = old.parsed.data[TYPE]
    // if (utils.isContext(rtype)  &&  me.isEmployee) {
    //   let pid = utils.makeId(PROFILE, old.from[ROOT_HASH])
    //   let bot = this._getItem(pid)
    //   // debug('monitorTim: org = ' + (bot.organization && bot.organization.title) + '; isEmployee = ' + utils.isEmployee(bot) + '; type = ' + old.parsed.data.product + '; hasModel = ' + (this.getModel(old.parsed.data.product)!== null))
    //   if (utils.isEmployee(bot)  &&  !this.getModel(old.parsed.data.requestFor)) {
    //     debug('request for models')
    //     await this.onAddMessage({msg: utils.requestForModels(), isWelcome: true})
    //   }
    // }
    try {
      await this.putInDb(old, true)
      if (payload[TYPE] === PARTIAL)
        this.onGetAllPartials(payload)
      this.triggerReceivedMessage(msg)
    } catch (err) {
      debugger
      console.error('2. failed to process received message', err)
    }
  },

  triggerReceivedMessage(msg) {
    const payload = msg.object.object
    const deepPayload = payload[TYPE] === MESSAGE ? payload.object : payload
    this.trigger({
      action: 'receivedMessage',
      msg,
      payloadType: payload[TYPE],
      deepPayloadType: deepPayload[TYPE]
    })
  },

  isEmployeeMode() {
    const me = utils.getMe()
    return me && me.isEmployee
  },

  wrapWithIdentityFetcher(fn) {
    const self = this
    return async function (...args) {
      try {
        return await fn.apply(this, args)
      } catch (err) {
        if (!self.isEmployeeMode() || err.type !== 'unknownidentity') throw err

        await self.requestIdentity({
          [err.property]: err.value
        })

        return await fn.apply(this, args)
      }
    }
  },

  async getObject(link, noBody) {
    try {
      let obj = await meDriver.objects.get(link)
      // let kobj = await this._keeper.get(link)
      return obj.object
    } catch (err) {
      console.log('getObject: ', err)
    }
  },
  readseal(seal) {
    let self = this
    const link = seal.link
    return meDriver.objects.get(link)
      .then((obj) => {
        if (obj.object[TYPE] === IDENTITY && obj.link === meDriver.link) {
          return
        }

        return save({ ...seal, ...obj })
      })

    function save (wrapper) {
        // return
      const getFromTo = wrapper.type === 'tradle.Message'
        ? Q(wrapper)
        : getAuthorForObject(wrapper)

      return getFromTo
        .then(msgInfo => {
          // wrapper.from = { [ROOT_HASH]: msgInfo.author }
          // wrapper.to = { [ROOT_HASH]: msgInfo.recipient }
          wrapper = utils.toOldStyleWrapper(wrapper)

          let from = self._getItem(utils.makeId(PROFILE, msgInfo.author))
          let to = self._getItem(utils.makeId(PROFILE, msgInfo.recipient))

          wrapper.from = self.buildRef(from)
          wrapper.to = self.buildRef(to)
          if (!wrapper.objectinfo) {
            wrapper.objectinfo = tradleUtils.pick(wrapper, 'author', 'type', 'link', 'permalink', 'prevlink')
          }

          return self.putInDb(wrapper)
        })
        .catch(function (err) {
          console.error('unable to get message for object', wrapper)
          debugger
        })
    }

    function getAuthorForObject (wrapper) {
      // objects don't really have a from/to
      // so this will need to be redesigned
      const msgStream = meDriver.objects.messagesWithObject({
        permalink: wrapper.permalink,
        link: link
      })

      return Q.all([
        meDriver.addressBook.lookupIdentity({ permalink: wrapper.author }),
        collect(msgStream)
      ])
      .spread(function (authorInfo, messages) {
        const match = messages.filter(m => m.author === authorInfo.permalink)[0]
        // if (!match) throw new Error('unable to get message for object')
        if (!match) {
          console.error('unable to get message for object', wrapper)
          throw new Error('unable to get message for object')
        }
        return match
      })
    }
  },
  _handleConnectivityChange(isConnected) {
    if (isConnected === this.isConnected) return

    debug('network connectivity changed, connected: ' + isConnected)
    this.isConnected = isConnected
    this.trigger({action: 'connectivity', isConnected: isConnected})
    console.log('_handleConnectivityChange: ' + isConnected)
    if (!meDriver) return

    if (isConnected) {
      meDriver.resume()
    } else {
      meDriver.pause()
    }
    // Alert.alert('Store: ' + isConnected)
  },

  getMe() {
    return db.get(MY_IDENTITIES)
    .then((value) => {
      if (value) {
        let key = MY_IDENTITIES
        this._setItem(key, value)
        return db.get(value.currentIdentity.replace(PROFILE, IDENTITY))
      }
    })
    .then ((value) => {
      this._setItem(utils.getId(value), value)
      return db.get(utils.getId(value).replace(IDENTITY, PROFILE))
    })
    .then((value) => {
      me = value
      let changed
      if (me.isAuthenticated) {
        // if (Date.now() - me.dateAuthenticated > AUTHENTICATION_TIMEOUT) {
        delete me.isAuthenticated
        delete me.dateAuthenticated
        changed = true
        // }
      }
      // HACK for the case if employee removed
      if (me.isEmployee  &&  !me.organization) {
        delete me.isEmployee
        changed = true
      }

      if (changed)
        this.dbPut(utils.getId(me), me)

      this.setMe(me)
      let key = utils.getId(me)
      this._setItem(key, me)
      return me
    })
    // .catch(function(err) {
      // debugger
      // return self.loadModels()
    // })
  },
  setMe(newMe) {
    me = newMe
    if (SERVICE_PROVIDERS.length  &&  me.organization  &&  !me.organization.url) {
      let orgId = utils.getId(me.organization)
      let o = SERVICE_PROVIDERS.filter((r) => {
        return r.org == orgId ? true : false
      })
      if (o && o.length) {
        if (o[0].url)
          me.organization.url = o[0].url
      }
    }
    utils.setMe(me)
    this._resolveWithMe(me)
  },
  onUpdateMe(params) {
    let r = _.clone(me)
    _.extend(r, params)
    this.setMe(r)
    let meId = utils.getId(r)
    this._setItem(meId, r)
    return this.dbPut(meId, r)
      // .then(() => {
      //   if (params.registered) {
      //     this.trigger({action: 'registered'})
      //   } else if (params)
      // })
  },
  onSetAuthenticated(authenticated) {
    if (!authenticated) meDriver.pause()
    if (!me) me = utils.getMe()

    let meId = utils.getId(me)
    let r = {}
    this.onUpdateMe({
      isAuthenticated: authenticated,
      dateAuthenticated: Date.now()
    })

    this.trigger({ action: 'authenticated', value: authenticated })
  },
  getSettings() {
    let self = this
    let key = SETTINGS + '_1'
    return db.get(key)
    .then((value) => {
      if (value) {
        self._setItem(key, value)
      }
    })
    .catch(() => {
      // debugger
      // return self.loadModels()
    })
  },

  setBusyWith(reason) {
    if (this.busyWith) {
      debug(`${this.busyWith.name} took ${(Date.now() - this.busyWith.start)}ms`)
    }

    this.busyWith = {
      name: reason && translate(reason),
      start: Date.now()
    }

    if (reason) {
      debug(`busy with ${this.busyWith.name}`)
    }

    this.triggerBusy()
  },

  triggerBusy() {
    this.trigger({ action: 'busy', activity: this.busyWith.name })
  },

  async buildDriver (...args) {
    this.setBusyWith('initializingEngine')
    const ret = await this._buildDriver(...args)
    this.buildCustomIndexes()
    this.setBusyWith(null)
    return ret
  },
  buildCustomIndexes() {
    let self = this
    myCustomIndexes = tradle.dbs.msgMeta({
      node: meDriver,
      db: 'msgMetaIIII.db',
      props: [
        'subClassOf',
        'fromAndSubClassOf',
        'timeAndFromAndSubClassOf',
        'typeAndToAndTime',
        'typeAndTime'
      ],
      getProps: function (wrapper) {
        const payload = wrapper.object.object
        const props = {}
        // get payload
        const model = self.getModel(payload[TYPE])
        if (!model)
          return props

        props.author = wrapper.author
        props.recipient = wrapper.recipient
        props.timestamp = payload._time || wrapper.timestamp
        if (model.subClassOf) {
          props.subClassOf = model.subClassOf
          props.fromAndSubClassOf = wrapper.author + '!' + model.subClassOf
          props.timeAndFromAndSubClassOf = payload._time + '!' + wrapper.author + '!' + model.subClassOf
        }
        props.typeAndTime = payload[TYPE] + '!' + (payload._time || wrapper.timestamp)
        props.typeAndToAndTime = payload[TYPE] + '!' + wrapper.recipient + '!' + (payload._time || wrapper.timestamp)

        return props
      }
    })
    return myCustomIndexes
  },
  async _buildDriver ({ keys, identity, encryption }) {
    let self = this
    // let keeper = level('unencrypted-keeper', {
    //   valueEncoding: {
    //     encode: json => JSON.stringify(json),
    //     decode: json => utils.rebuf(JSON.parse(json))
    //   }
    // })

    let keeper = createKeeper({
      path: path.join(TIM_PATH_PREFIX, 'keeper'),
      db: asyncstorageDown,
      encryption: encryption
    })

    cachifyKeeper(keeper, {
      max: 100
    })

    const { wsClients, restoreMonitors, identifierProp } = driverInfo

    // let whitelist = driverInfo.whitelist
    // let tlsKey = driverInfo.tlsKey

    // return Q.ninvoke(dns, 'resolve4', 'tradle.io')
    //   .then(function (addrs) {
    //     console.log('tradle is at', addrs)

    meDriver = new tradle.node({
      getBlockchainAdapter,
      name: 'me',
      dir: TIM_PATH_PREFIX,
      identity: identity,
      keys: keys,
      keeper: keeper,
      leveldown: leveldown,
      // dht: dht,
      // port: port,
      // sendThrottle: 10000,
      syncInterval: 10 * 60 * 1000,
      // unchainThrottle: 10 * 60 * 1000,
      // afterBlockTimestamp: constants.afterBlockTimestamp,
      // afterBlockTimestamp: 1445976998,
      // relay: {
      //   // address: addrs[0],
      //   address: '54.236.214.150',
      //   port: 25778
      // }
    })

    // blockr.io has been shut down

    if (me && me.isEmployee) {
      disableBlockchainSync(meDriver)
    }

    meDriver.setMaxListeners(0)

    debug('me: ' + meDriver.permalink, 'isEmployee:', me && me.isEmployee)
    meDriver = tradleUtils.promisifyNode(meDriver)

    // TODO: figure out of we need to publish identities
    meDriver.identityPublishStatus = meDriver.identitySealStatus
    meDriver._multiGetFromDB = utils.multiGet
    meDriver.addressBook.setCache(new Cache({ max: 500 }))
    meDriver.pause()

    let noProviders
    if (!SERVICE_PROVIDERS_BASE_URLS) {
      let settingsId = SETTINGS + '_1'
      let settings = this._getItem(settingsId)
      fixOldSettings(settings)

      let updateSettings
      if (settings  &&  settings.urls) {
        let urls = settings.urls
        // HACK for non-static ip
        if (SERVICE_PROVIDERS_BASE_URL_DEFAULTS) {
          SERVICE_PROVIDERS_BASE_URL_DEFAULTS.forEach((url) => {
            let found
            urls.forEach((u) => {
              if (u === url)
                found = true
            })
            if (!found) {
              updateSettings = true
              urls.push(url)
            }
          })
        }
        SERVICE_PROVIDERS_BASE_URLS = urls
        if (updateSettings)
          this.dbPut(settingsId, settings)
      }
      else {
        SERVICE_PROVIDERS_BASE_URLS = SERVICE_PROVIDERS_BASE_URL_DEFAULTS ? SERVICE_PROVIDERS_BASE_URL_DEFAULTS.slice() : []
        let settings = {
          [TYPE]: SETTINGS,
          [ROOT_HASH]: '1',
          [CUR_HASH]: '1',
          urls: SERVICE_PROVIDERS_BASE_URLS,
          hashToUrl: {},
          urlToId: {}
        }
        this._setItem(settingsId, settings)
        this.dbPut(settingsId, settings)
      }
    }

    // if (TLS_ENABLED) {
    //   tlsKey = keys.filter((k) => k.type === 'dsa')[0]
    //   if (tlsKey) tlsKey = DSA.parsePrivate(tlsKey.priv)
    // }

    // if (tlsKey) tlsKey = kiki.toKey(tlsKey).priv()

    const tlsKey = driverInfo.tlsKey = TLS_ENABLED && meDriver.keys.filter(k => k.get('purpose') === 'tls')[0]
    // let fromPubKey = meDriver.identity.pubkeys.filter(k => k.type === 'ec' && k.purpose === 'sign')[0]
    meDriver._send = function (msg, recipientInfo, cb) {
      const start = Date.now()
      const monitor = setInterval(function () {
        debug(`still sending to ${recipientInfo.permalink} after ${(Date.now() - start)/1000|0} seconds`, msg.unserialized.object[TYPE])
      }, 5000)

      trySend(msg, recipientInfo, function (err, result) {
        clearInterval(monitor)
        cb(err, result)
      })
      .catch(function (err) {
        console.log('developer error', err.stack)
        cb(err)
      })
    }

    const trySend = co(function* (msg, recipientInfo, cb) {
      const recipientHash = recipientInfo.permalink
      if (self._yuki && recipientHash === self._yuki.permalink) {
        return self._yuki.receive({ message: msg.unserialized.object })
          .then(() => cb(), cb)
      }

      let transport = wsClients.byIdentifier[recipientHash]
      if (!transport) {
        let hashToUrl = self._getItem(SETTINGS + '_1').hashToUrl
        const url = hashToUrl  &&  hashToUrl[recipientHash]
        transport = url && wsClients.byUrl[url]
      }

      const identifier = self.getIdentifier(recipientInfo)
      if (!transport) {
        meDriver.sender.pause(identifier)
        // Alert.alert('meDriver._send recipient not found ' + recipientHash)
        return cb(new Error('recipient not found'))
      }

      debug(`pushing msg to ${identifier} into network stack`)
      if (transport instanceof AWSClient) {
        try {
          yield transport.ready()
          yield transport.send({
            link: msg.unserialized.link,
            message: msg
          })
        } catch (err) {
          if (/timetravel/i.test(err.type)) {
            self.abortUnsent({ to: identifier })
            debug('aborting time traveler message', err.stack)
            err = new tradle.errors.WillNotSend('aborted')
          }

          return cb(err)
        }

        cb()
        return
      }

      transport.send(identifier, msg, function (err) {
        if (err) debug(`failed to deliver message to ${identifier}: ${err.message}`)
        else debug(`delivered message to ${identifier}`)

        cb(err)
      })

      // transport.setTimeout(60000)
    })

    // receive flow:
    // 1. transport
    // 2. multiqueue (persists messages until processed, enforces order of processing)
    // 3. meDriver.receive

    const multiqueue = this.multiqueue = Multiqueue.create({
      db: level('receive-queue.db', { valueEncoding: 'json' }),
      autoincrement: false
    })

    Multiqueue.monitorMissing({ multiqueue, debounce: 1000 })
      .on('batch', function ({ queue, lane, missing }) {
        if (!queue) queue = lane // compat with v1

        const monitor = restoreMonitors[queue]
        if (!monitor) return

        monitor.request({
          seqs: missing
        })
      })

    const processor = Multiqueue.process({
      multiqueue,
      worker: async function ({ value, queue, lane }) {
        if (!queue) queue = lane // compat with v1

        // load non plain-js props (e.g. Buffers)
        const { length } = value
        const msg = utils.parseMessageFromDB(value.message)

        try {
          await self.receive({
            length,
            msg,
            from: queue
          })
        } catch (err) {
          debug('failed to process message', err)
        }
      }
    })

    processor.start()

    this.queueReceive = function queueReceive ({ msg, from }) {
      let length
      if (Buffer.isBuffer(msg)) {
        length = msg.length
        msg = tradleUtils.unserializeMessage(msg)
      }

      // if (failOneOutOf(3)) {
      //   debug('dropping', msg.object[TYPE])
      //   return
      // }

      const link = tradleUtils.hexLink(msg)
      return multiqueue.enqueue({
        seq: msg[SEQ],
        value: {
          link,
          message: msg,
          length
        },
        queue: from,
        // compat with v1
        lane: from
      })
    }

    // meDriver.objects = timeFunctions(meDriver.objects)
    // meDriver = timeFunctions(meDriver)
    this.getInfo({serverUrls: SERVICE_PROVIDERS_BASE_URLS, retry: true})

    // .then(() => {
    //   if (me && utils.isEmpty(chatMessages))
    //     this.initChats()
    // })
    .catch((err) => {
      debug('initial getInfo failed:', err)
      throw err
    })

    this._resolveWithEngine(meDriver)
    return this._enginePromise
  },
  promiseEngine() {
    return this._enginePromise
  },
  async abortUnsent({ to }) {
    const links = await meDriver.abortUnsent({ to })
    debug(`aborted unsent messages to ${to}: ${links}`)
    debugger
    // TODO: mark messages as undelivered
    // offer user to resend them
  },

  async initChats() {
    let meId = utils.getId(me)
    let myOrgId, myBotId
    if (me.organization) {
      myOrgId = utils.getId(me.organization)
      myBotId = utils.getId(this.getRepresentative(myOrgId))
    }

    for (let p in list) {
      let rr = this._getItem(p)
      if (!utils.isMessage(rr))
        continue
      if (rr[TYPE] === SELF_INTRODUCTION  ||  rr[TYPE] === SEAL)
        continue
      let r = utils.clone(rr)
      let m = this.getModel(r[TYPE])
      this.addVisualProps(r)

      if (r._context) {
        let c = this._getItem(r._context)
        // context could be empty if ForgetMe was requested for the provider where form was originally created
        // if (c  &&  c._readOnly) {
        let cId = utils.getId(r._context)
        if (!c) {
          // if (!this.client  &&  me  &&  me.isEmployee) {
          //   meDriver = await this.getDriver(me)
          //   this.client = await graphQL.initClient(meDriver)
          // }
          if (this.client) {
            c = await this._getItemFromServer(cId)
            if (r[TYPE] === ASSIGN_RM) {
              this.dbPut(cId, c)
              this._setItem(cId, c)
            }
          }
          // else
          //   continue
        }
        if (utils.isReadOnlyChat(r)           ||
            r[TYPE] === APPLICATION_DENIAL    ||
            r[TYPE] === APPLICATION_APPROVAL  ||
            (r[TYPE] === CONFIRMATION  &&  utils.getId(r.from) === meId)) {
          this.addMessagesToChat(cId, r, true)
          continue
        }
        else {
          // Check if the message was sent by the party that is not one of the 2 original parties of the context
          let fromId = utils.getId(r.from)
          let toId = utils.getId(r.to)

          let chkId = (toId === meId) ? fromId : toId

          if (!c) {
            if (me.isEmployee)
              this.addMessagesToChat(chkId, r, true)
            else
              debugger
            continue
          }
          this.addVisualProps(c)
          let cTo = utils.getId(c.to)
          let cFrom = utils.getId(c.from)
          if (chkId !== cTo  &&  chkId !== cFrom) {
            if (!me.isEmployee) {
            //   if (r.to.organization && r.from.organization) {
            //     let orgId = myOrgId === r.to.organization.id
            //               ? r.from.organization.id
            //               : r.to.organization.id
            //     this.addMessagesToChat(orgId, r, true)
            //     continue
            //   }
            // }
            // else {
              let chatId = utils.getId(cTo === meId ? cFrom : cTo)
              let chat = this._getItem(chatId)
              if (chat.organization  &&  cFrom === meId)
                this.addMessagesToChat(utils.getId(chat.organization), r, true)
              else
                this.addMessagesToChat(chatId, r, true)
              continue
            }
          }
        }
        if (chatMessages[cId])
          this.addMessagesToChat(cId, r, true)
      }

      let addedToProviders = []
      if (r._sharedWith) {
        r._sharedWith.forEach((shareInfo) => {
          // if (shareInfo.bankRepresentative === meId)
          //   this.addMessagesToChat(utils.getId(r.to), r, true, shareInfo.timeShared)
          // else  {
          let rep = this._getItem(shareInfo.bankRepresentative)
          let orgId = rep.organization ? utils.getId(rep.organization) : utils.getId(rep)
          if (myOrgId !== orgId) {
            this.addMessagesToChat(orgId, r, true, shareInfo.timeShared)
            addedToProviders.push(orgId)
          }
          // }
        })
      }
      if (m.id === VERIFICATION  &&  meId === utils.getId(r.from)  && r.to)
        this.addMessagesToChat(utils.getId(r.to), r, true)
      // Shared context
      else if (utils.isContext(m)) {
        if (utils.isReadOnlyChat(r))   //  &&  r._readOnly)
          this.addMessagesToChat(utils.getId(r.from), r, true)
        if (r.contextId)
          contextIdToResourceId[r.contextId] = r
      }
      else  if (r.to) { // remove
        let fromId = utils.getId(r.from)
        let rep = this._getItem(meId === fromId ? utils.getId(r.to) : fromId)
        if (rep) {
          let orgId = rep.organization ? utils.getId(rep.organization) : utils.getId(rep)
          if (addedToProviders.indexOf(orgId) === -1)
            this.addMessagesToChat(orgId, r, true)
        }
      }
    }
    for (let id in chatMessages) {
      if (id === ALL_MESSAGES)
        continue
      let arr = chatMessages[id]
      arr.sort((a, b) => a.time - b.time)
      chatMessages[id] = this.filterChatMessages(arr, id)
    }
  },
  // Filtered result contains only messages that get displayed
  filterChatMessages(messages, orgId, lastId) {
    let meId = utils.getId(me)
    let productToForms = {}
    let productApp = {}
    let removeMsg = []
    let pl
    let self = this
    let allMessages = chatMessages[ALL_MESSAGES]
    // Compact all FormRequests that were fulfilled
    for (let i=messages.length - 1; i>=0; i--) {
      let r = this._getItem(messages[i].id)

      let product
      if (utils.isContext(r[TYPE]))
        product = r.requestFor
      else if (r._context) {
        let c = this._getItem(r._context)
        product = c  &&  c.requestFor
      }
      let removed

      if (product) {
        if (r[TYPE] === FORM_REQUEST  &&  !r._document) {// && r._documentCreated)
        // delete list[id]
          let forms = productToForms[product]
          if (!forms)
            productToForms[product] = {}
          let formIdx = productToForms[product][r.form]
          if (typeof formIdx !== 'undefined'  &&  !r._documentCreated) {
            removeMsg.push(formIdx)
            removed = true
          }
            // messages.splice(formIdx, 1)

          productToForms[product][r.form] = i
        }
        if (utils.isContext(r)) {
          let productIdx = productApp[product]
          if (productIdx  &&  !removed) {
            removeMsg.push(productIdx)
            removed = true
          }
            // messages.splice(productIdx, 1)
          // else
          productApp[product] = i
        }
      }
      // leave only the last PL
      if (r[TYPE] === FORM_REQUEST) {
        let m = this.getModel(r.form)
        if (m  &&  utils.isContext(m)) {
          if (!pl)
            pl = i
          else if (!removed)
            removeMsg.push(i)
        }
      }
      if (!removed)
        addPhoto(r)
      // if (r[TYPE] === PRODUCT_LIST) {
      //   if (!pl)
      //     pl = i
      //   else
      //     removeMsg.push(i)
      // }
    }
    if (removeMsg.length) {
      // let batch = []
      removeMsg.sort((i1, i2) => {return i2 - i1})
      for (let i=0; i<removeMsg.length; i++) {
        let idx = removeMsg[i]
        // let rid = messages[idx].id
        // batch.push({type: 'del', key: rid})
        // this._deleteItem(rid)
        let msg = messages[idx]
        messages.splice(idx, 1)
        for (let ii=0; ii<allMessages.length; ii++) {
          if (allMessages[ii].id === msg.id)
            allMessages.splice(ii, 1)
        }
      }
      // db.batch(batch)
    }
    return messages
    function addPhoto(r) {
      // let r = self._getItem(rr.id)

      // Check if there was request for the next form after multy-entry form
      let fromId = utils.getId(r.from)

      if (!me.isEmployee  &&  fromId !== meId  &&  list[fromId]) {
        let rFrom = self._getItem(fromId)
        if (!rFrom.bot) {
          let photos = rFrom.photos
          if (photos)
            r.from.photo = photos[0]
          else
            r.from.photo = employee
        }
      }
      let m = self.getModel(r[TYPE])
      // r.from.photos = list[utils.getId(r.from)].value.photos;
      // var to = list[utils.getId(r.to)]
      // if (!to) console.log(r.to)
      // r.to.photos = to  &&  to.value.photos;
      if (m.subClassOf === FORM) {
        // set organization and photos for items properties for better displaying
        let form = self._getItem(utils.getId(r.to))
        // if (orgId  &&  r._sharedWith  &&  r._sharedWith.length > 1) {
        //   // if (utils.getId(r.to.organization) !== toOrgId) {
        //   //   let filteredVerifications = self.getSharedVerificationsAboutThisForm(r, toOrgId)
        //   // }
        // }
        r.to.organization = form.organization
        for (let p in r) {
          if (!m.properties[p]  ||  m.properties[p].type !== 'array' ||  !m.properties[p].items.ref)
            continue
          let pModel = self.getModel(m.properties[p].items.ref)
          if (pModel.properties.photos) {
            let items = r[p]
            items.forEach((ir) => {
              let irRes = self._getItem(utils.getId(ir))
              // HACK - bad forgetMe
              let itemPhotos = irRes  && irRes.photos
              if (itemPhotos)
                ir.photo = itemPhotos[0].url
            })
          }
        }
      }
      return true

    }
  },
  async getInfo(params) {
    let serverUrls = params.serverUrls
    if (!serverUrls.length)
      return
    let retry = params.retry
    let id = params.id
    let newServer = params.newServer
    let maxAttempts = params.maxAttempts
    debug('fetching provider info from', serverUrls)
    await Q.allSettled(serverUrls.map(async (url) => {
      let providers
      try {
        providers = await this.getServiceProviders({url: url, hash: params.hash, retry: retry, id: id, newServer: newServer})
      } catch (err) {
        Errors.rethrow(err, 'developer')

        // only forgive individual errors for batch getInfo
        if (id || maxAttempts > 0) throw err

        return []
      }

      if (utils.getMe()) {
        providers.forEach(provider => this.addProvider(provider))
      }

      // TODO: this doesn't belong here
      if (!this.client  &&  me.isEmployee  &&  SERVICE_PROVIDERS)
        this.client = graphQL.initClient(meDriver, me.organization.url)

      // don't wait for this
      this.subscribeForPushNotifications(providers.map(p => p.hash))
      return providers
    }))
  },
  addYuki() {
    const sp =  utils.clone(yukiConfig)
    let yuki = getYukiForRegion()
    if (yuki) {
      sp.org.name = yuki.name
      if (yuki.photos)
        sp.org.photos = yuki.photos
    }
    sp.bot = {
      [ROOT_HASH]: this._yuki.permalink,
      [CUR_HASH]: this._yuki.permalink,
      pub: this._yuki.identity,
      profile: {
        name: {
          firstName: (yuki && yuki.name) || 'Yuki'
        }
      }
    }

    // if (!SERVICE_PROVIDERS)
    //   SERVICE_PROVIDERS = []
    // sp.org.contacts = [utils.optimizeResource(me)]

    this.parseProvider(sp)
    return this.addInfo(sp)
  },

  getMyEmployerBotPermalink() {
    if (me && me.isEmployee) {
      const rep = this.getRepresentative(me.organization)
      return rep[ROOT_HASH]
    }
  },

  async _preSendCheck(opts) {
    if (!__DEV__) return

    if (opts.to) {
      if (!opts.to.permalink) {
        debugger
        Alert.alert(`STOP USING FINGERPRINT!`)
      } else {
        const botPermalink = this.getMyEmployerBotPermalink()
        if (botPermalink && opts.to.permalink !== botPermalink) {
          // should not happen
          debugger
          Alert.alert('PREVENTING SEND TO THE WRONG BOT')
          throw new Error('invalid recipient, expected my own bot')
          // opts.other.forward = opts.to.permalink
          // opts.to.permalink = botPermalink
        }

          // opts.to = botPermalink
      }
    }

    if (opts.object && opts.object[SIG]) {
      try {
        validateResource({
          models: this.getModels(),
          resource: opts.object,
        })
      } catch (err) {
        Alert.alert('Preventing send of invalid resource', err.message)
        throw err
      }

      try {
        await promisify(tradleUtils.extractSigPubKey)(opts.object)
      } catch (err) {
        Alert.alert('Preventing send of object with an invalid signature')
        throw err
      }
    }
  },

  _maybePrepForEmployerBot(object) {
    const org = this.getMyEmployerBotPermalink()
    if (org) {
      delete object[ORG_SIG]
      object[ORG] = org
    }
  },

  async createObject(object) {
    const node = await this._enginePromise
    const me = utils.getMe()
    if (me.isEmployee) {
      object = _.clone(object)
      this._maybePrepForEmployerBot(object)
    }

    return node.createObject({ object })
  },

  async meDriverSend(sendParams) {
    await this._preSendCheck(sendParams)
    await this.maybeWaitForIdentity(sendParams.to)
    return await this.meDriverExec('send', sendParams)
  },

  async meDriverSignAndSend(sendParams) {
    await this._preSendCheck(sendParams)
    await this.maybeWaitForIdentity(sendParams.to)
    return await this.meDriverExec('signAndSend', sendParams)
  },

  async meDriverReceive(...args) {
    return await this.meDriverExec('receive', ...args)
  },

  async meDriverExec(method, ...args) {
    // give animations a chance to animate
    if (method === 'sign' || method === 'send' || method === 'signAndSend') {
      await this._preSendCheck(...args)
    }

    if (method === 'sign' || method === 'signAndSend') {
      this._maybePrepForEmployerBot(args[0].object)
    }

    // give animations a chance to animate
    await this.onIdle()

    const ret = await meDriver[method](...args)
    if (method === 'send' || method === 'signAndSend') {
      Analytics.sendEvent({
        category: 'message',
        action: 'send',
        label: ret.object.object[TYPE]
      })
    }

    return ret
  },

  async maybeWaitForIdentity({ permalink }) {
    if (permalink in this._identityPromises) {
      // debug('maybeWaitForIdentity: ' + permalink)
      await this._identityPromises[permalink]
    }
  },

  async addContactIdentity({ identity, permalink }) {
    try {
      this.validateResource(identity)
    } catch (err) {
      debug('received invalid identity', err.message)
      throw err
    }

    if (!permalink) permalink = utils.getPermalink(identity)
    if (!(permalink in this._identityPromises)) {
      this._identityPromises[permalink] = this._enginePromise
        .then(engine => utils.addContactIdentity(engine, { identity, permalink }))
    }

    // if meDriver is not available, don't lock everything up
    // add identity as soon as engine is available
    if (meDriver) await this._identityPromises[permalink]
  },

  onSetProviderStyle(stylePack) {
    // const style = utils.interpretStylesPack(stylePack)
  },
  addToSettings(provider) {
    let r = this._getItem(SETTINGS + '_1')
    if (!r.hashToUrl)
      r.hashToUrl = {}

    // save provider's employee
    // if (!hashToUrl[provider.hash]) {
    r.hashToUrl[provider.hash] = getProviderUrl(provider)
    return this.dbPut(SETTINGS + '_1', r)
    // }
  },

  async addAWSProvider(provider) {
    const self = this
    const node = await this._enginePromise
    const counterparty = provider.hash
    const url = getProviderUrl(provider)
    const { wsClients } = driverInfo
    let client = wsClients.byUrl[url] || wsClients.byIdentifier[counterparty]
    if (client) return

    const myBotPermalink = this.getMyEmployerBotPermalink()
    if (myBotPermalink && myBotPermalink !== counterparty) {
      // we don't need this client as all comm will go through
      // our own provider's bot
      debug(`not creating aws client for ${counterparty}. All comm will go through my employer`)
      return
    }
    client = new AWSClient({
      endpoint: url,
      iotEndpoint: provider.connectEndpoint && provider.connectEndpoint.endpoint,
      parentTopic: provider.connectEndpoint && provider.connectEndpoint.parentTopic,
      node,
      counterparty,
      getSendPosition: () => {
        return monitorMissing.getTip({
          node,
          counterparty,
          sent: true
        })
      },
      getReceivePosition: () => {
        return monitorMissing.getReceivePosition({
          node,
          counterparty,
          queue: this.multiqueue.queue(counterparty)
        })
      },
      // position,
      // TODO: generate long-lived clientId: `${node.permalink}${nonce}`
      clientId: utils.getIotClientId({
        permalink: node.permalink,
        provider
      }),
      retryOnSend: 3 // then give up and re-queue
    })

    const checkMissing = (() => {
      const onMissing = _.debounce(() => {
        if (!_.size(missing)) return

        // TODO: request missing messages directly
        missing = {}
        debug('aws-client detected missing messages, reconnecting')
        client.reset()
      })

      let queueMonitorTimeout
      let missing = {}
      return ({ tip, seq }) => {
        if (tip >= seq) {
          for (let i = seq; i <= tip; i++) {
            delete missing[i]
          }

          return
        }

        missing[tip + 1] = true
        onMissing()
      }
    })();

    client.onmessage = async (msg) => {
      debug(`receiving msg ${msg._n} from ${counterparty}`)
      const result = await this.queueReceive({ msg, from: counterparty })
      checkMissing(result)
    }

    client.on('disconnect', function () {
      self.setProviderOnlineStatus(provider.hash, false)
    })

    client.on('connect', function () {
      self.setProviderOnlineStatus(provider.hash, true)
    })

    wsClients.add({
      client,
      url,
      identifier: counterparty,
      path: provider.id
    })

    meDriver.sender.resume(counterparty)
  },

  addProvider(provider) {
    let self = this
    if (utils.isAWSProvider(provider)) {
      return this.addAWSProvider(provider)
    }

    const url = getProviderUrl(provider)
    // let httpClient = driverInfo.httpClient
    // httpClient.addRecipient(
    //   provider.hash,
    //   utils.joinURL(provider.url, provider.id, 'send')
    // )

    // let whitelist = driverInfo.whitelist
    // if (provider.txId)
    //   whitelist.push(provider.txId)
    const { tlsKey, wsClients, restoreMonitors } = driverInfo
    // const identifier = tlsKey ? tlsKey.pubKeyString : meDriver.permalink

    // const identifier = tradle.utils.serializePubKey(identifierPubKey).toString('hex')
    debug('adding provider', provider.hash, url)

    let transport = wsClients.byUrl[url] || wsClients.byIdentifier[provider.hash]
    const transportExists = !!transport
    let wsClient
    if (!transport) {
      wsClient = this.getWsClient(url)
      transport = this.getTransport(wsClient)
    }

    wsClients.add({
      client: transport,
      url: url,
      identifier: provider.hash,
      path: provider.id
    })

    restoreMonitors.add({
      node: meDriver,
      url: `${url.replace(/\/+$/, '')}/${provider.id}`,
      identifier: provider.hash,
      receive: this.queueReceive.bind(this)
    })

    if (transportExists) return

    // const url = utils.joinURL(base, 'ws?from=' + identifier).replace(/^http/, 'ws')
    // const wsClient = new WebSocketClient({
    //   url: url,
    //   autoConnect: true,
    //   // for now, till we figure out why binary
    //   // doesn't work (socket.io parser errors on decode)
    //   forceBase64: true
    // })

    transport.on('presence', updatePresence)

    wsClient.on('disconnect', function () {
      onTransportConnectivityChanged(false)
    })

    wsClient.on('connect', function () {
      onTransportConnectivityChanged(true)
      // request presence information
      wsClient.sendCustomEvent('presence')
    })

    wsClient.on('presence', function (present) {
      debug('presence updated', present)
      // the below only handles the known parties
      // TODO: handle the new arrivals in `present`

      wsClients
        .providers({ client: transport })
        .forEach(permalink => {
          const isPresent = present.indexOf(permalink) !== -1
          updatePresence(permalink, isPresent)
        })

      // const permalinks = wsClients.providers({ client: transport })
      // permalinks.forEach(permalink => {
      //   const isPresent = present.indexOf(permalink) !== -1
      //   updatePresence(permalink, isPresent)
      // })

      // const newArrivals = present.filter(permalink => {
      //   if (permalinks.indexOf(permalink) === -1) {
      //     const { hashToUrl={} } = self._getItem(SETTINGS + '_1')
      //     return !hashToUrl[permalink]
      //   }
      // })

      // if (newArrivals.length) self.getInfo([url])
    })

    function onTransportConnectivityChanged (connected) {
      if (connected) {
        self._handleConnectivityChange(true)
        self._connectedServers[url] = true
      } else {
        delete self._connectedServers[url]
        transport.clients().forEach(function (c) {
          // reset OTR session, restart on connect
          debug('aborting pending sends due to disconnect')
          c.destroy()
        })
      }

      const numConnected = Object.keys(self._connectedServers).length
      if (numConnected === 0) {
        self._handleConnectivityChange(false)
        // self.trigger({ action: 'onlineStatus', online: false })
      } else if (numConnected === 1) {
        self._handleConnectivityChange(true)
        // self.trigger({ action: 'onlineStatus', online: true })
      }

      wsClients
        .providers({ client: transport })
        .forEach(permalink => updatePresence(permalink, connected))
    }

    // let timeouts = {}
    transport.on('receiving', function (msg) {
      onTransportConnectivityChanged(true)
    })

    // transport.on('404', function (recipient) {
    //   if (!timeouts[recipient]) {
    //     timeout = setTimeout(function () {
    //       delete timeouts[recipient]
    //       transport.cancelPending(recipient)
    //     }, 10000)
    //   }
    // })

    transport.on('message', async function (msg, from) {
      debug('queuing receipt of msg from', from)
      if (!wsClients.byIdentifier[from]) {
        wsClients.add({
          client: transport,
          url: url,
          identifier: from
        })
      }

      // const unlock = await self.lockReceive(from)
      // try {
        await self.queueReceive({ msg, from })
        debug('received msg from', from)
      // } finally {
      //   unlock()
      // }
    })

    transport.setTimeout(40000)
    transport.on('timeout', function (identifier) {
      debug(`connection timed out with ${identifier}, canceling pending to trigger resend`)
      transport.cancelPending(identifier)
    })

    function updatePresence (recipient, present) {
      if (present) {
        meDriver.sender.resume(recipient)
      } else {
        meDriver.sender.pause(recipient)
        transport.cancelPending(recipient)
        // try again soon. Todo: make this smarter
        setTimeout(() => meDriver.sender.resume(recipient), 10000)
      }
      // self.trigger({action: 'onlineStatus', online: present})
      self.setProviderOnlineStatus(recipient, present)
    }
  },

  queueReceive({ msg, from }) {
    throw new Error('override me')
  },

  async receiveIntroduction({ identifier, msg }) {
    const { wsClients } = driverInfo
    const payload = msg.object
    const { identity } = payload
    const permalink = utils.getPermalink(identity)
    await this.addContactIdentity({ identity, permalink })
    await this.addContact(payload, permalink, msg.forPartials || msg.forContext)
    if (identifier) {
      const url = wsClients.getBaseUrl({ identifier })
      await this.addToSettings({hash: permalink, url: url})
    }
  },

  receiveSelfIntroduction({ identifier, msg }) {
    const payload = msg.object
    const { wsClients } = driverInfo
    const rootHash = utils.getPermalink(payload.identity)
    let name = payload.name
    if (!name  ||  !name.length) {
      name = payload.identity.name
      if (name)
        name = name.formatted
    }
    if (!name && payload.message)
      name = payload.message.split(' ')[0]

    // const rootHash = payload.identity[ROOT_HASH] || protocol.linkString(payload.identity)
    Alert.alert(
      translate('newContactRequest', name),
      payload.message || null,
      [
        {text: translate('Ok'),
        onPress: async () => {
          await this.addContactIdentity({ identity: payload.identity })
          await this.addContact(payload, rootHash)
          if (identifier) {
            const url = wsClients.getBaseUrl({ identifier })
            this.addToSettings({hash: rootHash, url: url})
          }
        }},
        {text: translate('cancel'), onPress: () => console.log('Canceled!')},
      ]
    )
  },

  // async receivePairingRequest({ payload }) {
  //   const rootHash = utils.getPermalink(payload.identity)
  //   Alert.alert(
  //     translate('pairingRequest'),
  //     null,
  //     [
  //       {text: translate('Ok'),
  //       onPress: () => {
  //         this.trigger({action: 'acceptingPairingRequest', resource: payload})
  //         // return self.onProcessPairingRequest(list[PAIRING_DATA + '_1'].value, payload)
  //         // .then(() => {
  //         //   Alert.alert(translate('pairingRequestWasProcesseed'))
  //         // })
  //         // .catch((err) => {
  //         //   debugger
  //         // })
  //       }},
  //       {text: translate('cancel'), onPress: () => console.log('Canceled!')},
  //     ]
  //   )
  // },

  triggerProgress(update) {
    debug(`progress receiving from ${update.recipient[ROOT_HASH]}: ${update.progress}`)
    this.trigger({
      action: 'progressUpdate',
      ...update
    })
  },

  async receive(opts) {
    await this.ready

    const self = this
    let { msg, from, isRetry, length } = opts
    const { wsClients, identifierProp } = driverInfo
    const identifier = from

    let progressUpdate
    let willAnnounceProgress = willShowProgressBar({ length })
    try {
      if (Buffer.isBuffer(msg)) {
        msg = tradleUtils.unserializeMessage(msg)
      }

      const payload = msg.object
      const isNested = payload[TYPE] === MESSAGE
      const originalPayload = isNested ? payload.object : payload
      const originalMsg = isNested ? payload : msg
      debug(`receiving ${originalPayload[TYPE]}`)
      let pid = utils.makeId(PROFILE, from)
      let org = this._getItem(pid).organization
      progressUpdate = willAnnounceProgress && {
        recipient: this._getItem(org)
      }
      switch (originalPayload[TYPE]) {
      // because INTRODUCTION, SELF_INTRODUCTION carry the identities
      // required for their own validation, they need to be handled earlier
      case INTRODUCTION:
        await this.receiveIntroduction({
          identifier: isNested ? null : identifier,
          msg: originalMsg
        })
        break
      case SELF_INTRODUCTION:
        await this.receiveSelfIntroduction({
          identifier: isNested ? null : identifier,
          msg: originalMsg
        })
        break
      case SEAL:
        // TODO: this should run in 'newobject' processing
        await this.receiveSeal(msg.object)
      default:
        break
      }
    } catch (err) {
      debug('experienced error receiving message: ' + (err.stack || err.message))
      if (progressUpdate) {
        this.triggerProgress({ ...progressUpdate, progress: 1 })
      }

      let payload
      try {
        // debugger
        payload = JSON.parse(msg)
      } catch (err) {
        debug('received invalid json from ' + from)
        return
      }

      if (payload[TYPE] === PAIRING_REQUEST) {
        console.error('received pairing request, but pairing not supported yet')
        // this.receivePairingRequest({ payload })
      }

      return

      // else if (payload[TYPE] === PAIRING_RESPONSE) {
      //   return self.onProcessPairingResponse(list[PAIRING_DATA + '_1'].value, payload)
      //   .then(() => {
      //     debugger
      //     Alert.alert('Pairing was successful')
      //   })
      //   .catch((err) => {
      //     debugger
      //     Alert.alert(err)
    //   })
      // }
    }

    // const prop = 'pubKey'
    // const identifier = tradle.utils.deserializePubKey(new Buffer(from, 'hex'))

    // const identifier = prop === 'permalink' ? from : {
    //   type: 'ec',
    //   curve: 'curve25519',
    //   pub: new Buffer(from, 'hex')
    // }

    if (progressUpdate) {
      this.triggerProgress({ ...progressUpdate, progress: ON_RECEIVED_PROGRESS })
    }

    meDriver.sender.resume(identifier)
    try {
      await this.meDriverReceive(msg, { [identifierProp]: identifier })
    } catch (err) {
      if (err.type === 'unknownidentity') {
        if (isRetry) {
          debug('giving up on receiving message', err)
          return
        }

        // avoid emitting two progress updates in finally {}
        progressUpdate = null
        try {
          await this.requestIdentity({
            [err.property]: err.value
          })

          await this.receive({ ...opts, isRetry: true })
        } catch (err) {
          debug('failed to fetch identity', err)
        }
      }

      console.warn('failed to receive msg:', err, msg)
    } finally {
      if (progressUpdate) {
        this.triggerProgress({ ...progressUpdate, progress: 1 })
      }

      Analytics.sendEvent({
        category: 'message',
        action: 'receive',
        label: msg.object[TYPE]
      })
    }
  },

  gql(method, params) {
    return graphQL[method]({ ...params, client: this.client })
  },

  async requestIdentity(params) {
    const identity = await this.gql('getIdentity', params)
    await this.addContactAndIdentity({ identity })
  },

  async addContactAndIdentity({ identity, permalink, profile={} }) {
    if (!permalink) permalink = utils.getPermalink(identity)
    await this.addContactIdentity({ identity, permalink })
    await this.addContact({ identity, profile: {} }, permalink)
  },

  async receiveCordaSeal(seal) {
    const node = await this._enginePromise
    return await Q.nfcall(node.actions.readSeal, {
      blockchain: seal.blockchain,
      networkName: seal.network,
      link: seal.link,
      // hack to make actions validator happy
      basePubKey: {
        pub: new Buffer(0),
        curve: 'secp256k1'
      },
      sealAddress: seal.address || '<n/a>',
      txId: seal.txId,
      headerHash: seal.headerHash,
      prevHeaderHash: seal.prevHeaderHash,
      // confirmations claimed by the server
      // are not to be trusted
      confirmations: 0,
      addresses: seal.address ? [seal.address] : []
    })
  },

  async receiveSeal(seal) {
    if (seal.blockchain === 'corda') {
      return this.receiveCordaSeal(seal)
    }

    const node = await this._enginePromise
    const adapter = getBlockchainAdapter({
      blockchain: seal.blockchain,
      networkName: seal.network
    })

    if (!adapter) {
      debug(`can't process seal, don't have blockchain adapter`, JSON.stringify(seal))
      debugger
      return
    }

    let { basePubKey, blockchain, network, headerHash, link, address, txId } = seal
    if (basePubKey) {
      const { pub } = basePubKey
      basePubKey = {
        pub: new Buffer(pub, 'hex'),
        curve: adapter.curve || 'secp256k1'
      }
    } else {
      // hack to make actions validator happy
      basePubKey = {
        pub: new Buffer(0),
        curve: 'secp256k1'
      }
    }

    try {
      await node.watchSeal({
        chain: {
          blockchain,
          networkName: seal.network
        },
        basePubKey,
        link,
        headerHash,
        txId,
        address,
      })

      node.sealwatch.sync()
    } catch (err) {
      if (err.type !== 'exists') {
        debugger
        throw err
      }
    }

    // await promisify(node.actions.readSeal)(action)
  },

  setProviderOnlineStatus(permalink, online) {
    // if (!SERVICE_PROVIDERS) return

    const provider = SERVICE_PROVIDERS.find(provider => {
      return provider.permalink === permalink
    })

    if (!provider) return

    const org = this._getItem(provider.org)
    org._online = online

    this.trigger({action: 'onlineStatus', online: online, resource: org})
    // if (online)
    //   this.trigger({action: 'connectivity', isConnected: online})
    this.announcePresence()
  },

  announcePresence() {
    let l = this.searchNotMessages({modelName: ORGANIZATION})
    this.trigger({ action: 'list', list: l, modelName: ORGANIZATION })
  },

  // onPairingRequestAccepted(payload) {
  //   return this.onProcessPairingRequest(this._getItem(PAIRING_DATA + '_1'), payload)
  //   .then(() => {
  //     this.trigger({action: 'pairingRequestAccepted'})
  //   })
  //   .catch((err) => {
  //     debugger
  //     this.trigger({action: 'invalidPairingRequest', error: (err.fullType === 'exists' ? translate('thisDeviceWasAlreadyPaired') : translate('invalidPairingRequest'))})
  //   })
  // },

  getIdentifier(identityInfo) {
    identityInfo = identityInfo || meDriver.identityInfo
    return TLS_ENABLED ? this.getIdentifierPubKey(identityInfo) : identityInfo.permalink
  },

  getIdentifierPubKey(identityInfo) {
    identityInfo = identityInfo || meDriver.identityInfo
    const purpose = TLS_ENABLED ? 'tls' : 'sign'
    const key = tradleUtils.find(identityInfo.keys || identityInfo.object.pubkeys, k => {
      const kPurpose = k.purpose || k.get('purpose')
      return kPurpose === purpose
    })

    return key.pubKeyString || key.pub
  },

  // Gets info about companies in this app, their bot representatives and their styles
  async getServiceProviders(params) {
    let originalUrl = params.url
    let retry = params.retry
    let id = params.id
    let hash = params.hash
    let newServer = params.newServer
    // return Q.race([
    //   fetch(utils.joinURL(url, 'info'), { headers: { cache: 'no-cache' } }),
    //   Q.Promise(function (resolve, reject) {
    //     setTimeout(function () {
    //       reject(new Error('timed out'))
    //     }, 5000)
    //   })
    // ])

    // Make sure not to get all providers from this server
    // but the ones customer requested before
    var providerIds
    if (!id) {
      let settings = this._getItem(SETTINGS + '_1')
      if (settings  &&  settings.urlToId  &&  settings.urlToId[originalUrl])
        providerIds = settings.urlToId[originalUrl]
    }
    const doFetch = retry
                  ? utils.fetchWithBackoff
                  : utils.fetchWithTimeout

    let url = utils.joinURL(originalUrl, 'info')
    let languageCode
    if (me) {
      language = me.language
      if (language) {
        language = this._getItem(utils.getId(language))
        languageCode = language.code
      }
    }
    if (!languageCode)
      languageCode = utils.getDefaultLanguage()
    if (languageCode)
      url += '?lang=' + languageCode

    let response = await doFetch(url, { headers: { cache: 'no-cache' } }, 5000)
    if (response.status > 300)
      throw new Error('Cannot access: ' + url)

    let json = await response.json()
    json = utils.normalizeGetInfoResponse(json)
    if (json.dictionary) {
      _.extend(dictionary, json.dictionary)
      if (me) {
        me.dictionary = dictionary
        if (language)
          me.language = language
        this.setMe(me)
      }
    }
    let newProviders
    if (!SERVICE_PROVIDERS.length) {
      // SERVICE_PROVIDERS = []
      newProviders = true
    }

    var promises = []
    json.providers.forEach(sp => {
      this.parseProvider(sp, params, providerIds, newProviders)
      promises.push(this.addInfo(sp, originalUrl, newServer))
    })
    if (utils.getMe())
      this.setMe(utils.getMe())
    let results = await Q.allSettled(promises)

    let isSandbox = json.providers[0].sandbox
    if (isSandbox)
      this.onHasTestProviders()
    else  {
      let list = this.searchNotMessages({modelName: ORGANIZATION})
      this.trigger({
        action: 'list',
        list: list,
        modelName: ORGANIZATION
      })
    }
    return results
      .filter(r => r.state === 'fulfilled')
      .map(r => r.value)
    // .catch((err) => {
    //   debugger
    // })
  },
  parseProvider(sp, params, providerIds, newProviders) {
    if (!params)
      params = {}
    let originalUrl = params.url
    let id = params.id
    let hash = params.hash

    if (id)  {
      if (sp.id !== id)
        return
    }
    if (sp.org.name.indexOf('[TEST]') === 0)
      return
    if (hash) {
      if (sp.bot[ROOT_HASH] !== hash)
        return
    }
    else if (providerIds  &&  providerIds.indexOf(sp.id) === -1)
      return
    // else if (sp.id !== 'eres'  &&  !list[PROFILE + '_' + sp.bot[ROOT_HASH]])
    //   return
    if (!sp.org[ROOT_HASH]) {
      sp.org[ROOT_HASH] = protocol.linkString(sp.org)
    }

    let isDuplicate = SERVICE_PROVIDERS.some((r) => r.org === utils.getId(sp.org))
    if (isDuplicate)
      return

    sp.bot.permalink = sp.bot.pub[ROOT_HASH] || protocol.linkString(sp.bot.pub)
    let newSp = {
      id: sp.id,
      org: utils.getId(sp.org),
      url: originalUrl,
      style: sp.style,
      permalink: sp.bot.permalink,
      sandbox: sp.sandbox,
      // publicConfig: sp.publicConfig,
      connectEndpoint: sp.connectEndpoint
    }
    // Check is this is an update SP info
    let oldSp
    for (let i=0; !newProviders  &&  i<SERVICE_PROVIDERS.length; i++) {
      let r = SERVICE_PROVIDERS[i]
      if (r.id === sp.id  &&  r.url === originalUrl) {
        oldSp = SERVICE_PROVIDERS[i]
        SERVICE_PROVIDERS[i] = newSp
        break
      }
    }
    if (!oldSp)
      SERVICE_PROVIDERS.push(newSp)

    // promises.push(self.addInfo(sp, originalUrl, newServer))
  },
  async addInfo(sp, url, newServer) {
    // TODO: evaluate security of this
    await this.addContactIdentity({
      identity: sp.bot.pub
    })

    var okey
    if (sp.org) {
      if (!sp.org[ROOT_HASH])
        sp.org[ROOT_HASH] = protocol.linkString(sp.org)
      okey = utils.getId(sp.org)
    }

    var hash = protocol.linkString(sp.bot.pub)
    var ikey = utils.makeId(IDENTITY, hash)
    var batch = []
    var org = this._getItem(okey)
    if (org) {
      // allow to unhide the previously hidden provider
      if (newServer  &&  org._inactive)
        org._inactive = false
      delete org._noSplash
      if (!org._isTest  &&  sp.sandbox === true)
        org._isTest = true
      this._mergeItem(okey, sp.org)
    }
    else {
      org = {}
      _.extend(org, sp.org)
      if (sp.sandbox) {
        delete org.sandbox
        org._isTest = true
      }
      // if (newOrg.name.indexOf('[TEST]') === 0)
      //   newOrg._isTest = true
    }
    if (sp.tour)
      org._tour = sp.tour

    this.configProvider(sp, org)
    this.resetForEmployee(me, org)
    batch.push({type: 'put', key: okey, value: org})

    org._online = true
    if (sp.style) {
      org.style = sp.style
      let logo = sp.style.logo
      if (logo) {
        if (!org.photos)
          org.photos = [logo]
        else if (org.photos[0].url !== logo.url)
          org.photos.splice(0, 0, logo)
      }
      // sp.style.splashscreen = 'https://s3.amazonaws.com/tradle-public-images/aviva.html'
    }
    this._setItem(okey, org)
    if (!list[ikey]) {
      var profile = {
        [TYPE]: PROFILE,
        [ROOT_HASH]: hash,
        [CUR_HASH]: hash,
        firstName: sp.bot.profile.name.firstName || sp.id + 'Bot',
        organization: this.buildRef(sp.org)
        // organization: {
        //   id: okey,
        //   title: sp.org.name
        // }
      }
      if (sp.bot.profile.name.lastName)
        profile.lastName = sp.bot.profile.name.lastName
      profile.formatted = sp.bot.profile.name.formatted || (profile.lastName ? profile.firstName + ' ' + profile.lastName : profile.firstName)
      profile.photos = []
      if (sp.bot.profile.photo)
        profile.photos.push(sp.bot.profile.photo)
      else
        profile.photos.push(employee)
      if (sp.isEmployee)
        profile.isEmployee = true
      else
        profile.bot = true
      // profile[ROOT_HASH] = r.pub[ROOT_HASH] //?????
      var identity = {
        [ROOT_HASH]:   hash,
        txId: sp.bot.txId
      }
      _.extend(identity, sp.bot.pub)
      if (identity.name) {
        identity.firstName = identity.name.firstName
        identity.formatted = identity.name.formatted || identity.firstName
        delete identity.name
      }

      var pkey = utils.getId(profile)

      batch.push({type: 'put', key: ikey, value: identity })
      batch.push({type: 'put', key: pkey, value: profile })
      this._setItem(ikey, identity)
      this._setItem(pkey, profile)
    }
    if (!this._getItem(okey).contacts) {
      this._mergeItem(okey, { contacts: [] })
      // list[okey].value.contacts = []
    }

    var pkey = utils.makeId(PROFILE, hash)

    var curOkeyVal = this._getItem(okey)
    var newContact = {
      id:     pkey,
      // title: list[pkey].value.formatted
    }

    this._mergeItem(okey, { contacts: [...curOkeyVal.contacts, newContact] })
    // list[okey].value.contacts.push({
    //   id:     pkey,
    //   titile: list[pkey].formatted
    // })

    if (batch.length)
      await db.batch(batch)

    const common = {
      hash,
      txId: sp.bot.txId,
      aws: sp.aws,
      connectEndpoint: sp.connectEndpoint
    }

    if (!sp.isEmployee)
      return { ...common, id: sp.id, url }

    let orgSp = SERVICE_PROVIDERS.filter((r) => utils.getId(r.org) === okey)[0]
    return { ...common, id: orgSp.id, url: orgSp.url, identity: sp.bot.pub}
  },
  resetForEmployee(me, org) {
    if (!me  ||  !me.isEmployee  ||  utils.getId(me.organization) !== utils.getId(org))
      return
    let myOrg = me.organization
    if (myOrg._canShareContext === org._canShareContext &&
        myOrg._hasSupportLine === org._hasSupportLine)
      return
    myOrg._canShareContext = org._canShareContext
    myOrg._hasSupportLine = org._hasSupportLine
    this.setMe(me)
    this.dbPut(utils.getId(me), me)
  },
  configProvider(sp, org) {
    let config = sp.publicConfig
    if (!config)
      return
    let orgId = utils.getId(org)
    org._isTest = sp.sandbox
    for (let p in config)
      org['_' + p] = config[p]

    if (org._country) {
      // let countries = this.searchNotMessages({modelName: COUNTRY})
      let country = this.getModel(COUNTRY).enum.filter((c) => {
        return c.id === org._country ||  c.title === org._country
      })
      // let country = countries.filter((c) => {
      //   return c.code === org._country ||  c.country === org._country
      // })
      if (country)
        org.country = this.buildRef(country[0])
      delete org._country
    }
    if (org._currency) {
      // let currencies = this.searchNotMessages({modelName:'tradle.Currency'})
      let currencies = this.getModel(CURRENCY).enum
      let currency = currencies.filter((c) => {
        return c.code === org._currency || c.id === org._currency
      })
      delete org._currency
      if (currency  &&  currency.length) {
        org.currency = utils.clone(currency[0])
        let code = currency[0].id
        if (currency[0].symbol)
          org.currency.symbol = currency[0].symbol
        else {
          let currencies = this.getModel(MONEY).properties.currency.oneOf
          for (let i=0; i<currencies.length  &&  !org.currency.symbol; i++) {
            if (currencies[i][code])
              org.currency.symbol = currencies[i][code]
          }
        }
        this._setItem(orgId, org)
        this.dbPut(orgId, org)
      }
    }
    // if (org._defaultPropertyValues) {
    //   debugger
    //   for (let m in org._defaultPropertyValues) {
    //     let mm = this.getModel(m)
    //     let props = mm.properties
    //     let mObj = org._defaultPropertyValues[m]
    //     for (let p in mObj) {
    //       if (props[p].ref  &&  this.getModel(props[p].ref).subClassOf === ENUM) {
    //         let enumList = this.searchNotMessages({modelName: props[p].ref})
    //         let eprop = utils.getEnumProperty(this.getModel(props[p].ref))
    //         let val = enumList.filter((eVal) => eVal[eprop] === mObj[p])
    //         if (val.length)
    //           mObj[p] = this.buildRef(val[0])
    //       }
    //     }
    //   }
    //   utils.addDefaultPropertyValuesFor(org)
    // }
    if (org._hidePropertyInEdit)
      utils.addHidePropertyInEditFor(org)
    if (config.greeting) {
      if (typeof config.greeting === 'string')
        org._greeting = config.greeting
      else
        org._greeting = utils.isWeb() ? config.greeting.web : config.greeting.mobile
    }
  },

  async addContact(data, hash, noMessage) {
    data = utils.clone(data)

    var ikey = utils.makeId(IDENTITY, hash)
    var pkey = utils.makeId(PROFILE, hash)

    var profile = this._getItem(pkey)
    var identity = this._getItem(ikey)

    var batch = []
    var newContact = !profile  ||  !identity
    var isDevicePairing = data[TYPE]  &&  data[TYPE] === PAIRING_REQUEST
    if (newContact) {
      if (data.name === '')
        data.name = data.identity.name && data.identity.name.formatted
      if (isDevicePairing) {
        profile = {
          [TYPE]: PROFILE,
          [ROOT_HASH]: hash,
          firstName:  me.firstName,
          formatted: me.formatted
        }
      }
      else {
        profile = {
          [TYPE]: PROFILE,
          [ROOT_HASH]: hash,
          ...data.profile
        }

        if (!profile.firstName  &&  data.name) {
          profile.firstName = data.name || data.message.split(' ')[0]

          if (!profile.formatted)
            profile.formatted = profile.firstName
        }
        profile._unread = 1
        if (noMessage)
          profile._inactive = true
      }
      if (!profile.firstName)
        profile.firstName = `[${translate('nameUnknown')}]`

      profile.formatted = profile.firstName + (data && data.lastName ? ' ' + data.lastName : '')
      var identity = data.identity
      identity[ROOT_HASH] = hash
      identity[CUR_HASH] = hash

      batch.push({type: 'put', key: ikey, value: identity })
      batch.push({type: 'put', key: pkey, value: profile })
      this._setItem(ikey, identity)
      this._setItem(pkey, profile)
    }
    // HACK
    if (!profile.firstName.length) {
      profile.firstName = identity.name.firstName
      profile.formatted = identity.name.formatted || profile.firstName
    }
    if (!isDevicePairing) {
      if (!this._getItem(utils.getId(profile)).bot)
        this.trigger({action: 'newContact', newContact: profile})
    }

    if (!isDevicePairing) {
      let r = this._getItem(utils.getId(profile))
      // if ((r  &&  r.bot) || noMessage);
      if (r  &&  !r.bot && !noMessage) {
        if (profile._inactive) {
          profile._inactive = false
          batch.push({type: 'put', key: pkey, value: profile })
        }

      }
    }

    if (batch.length)
      return db.batch(batch)
  },
  findKey (keys, where) {
    var match
    keys.some(function (k) {
      for (let p in where) {
        if (k[p] !== where[p]) return false
      }

      match = k
      return true
    })

    return match
  },
  async onStart() {
    this.triggerBusy()
    var self = this;
    const [hasTouchID] = await Promise.all([
      LocalAuth.hasTouchID(),
      this.ready
    ])

    // isLoaded = true
    self.trigger({
      action: 'start',
      models: models,
      me: me,
      hasTouchID
    });

    await this.maybeRequestUpdate()
  },
  onSetPreferences(preferences) {
    this.preferences = preferences
  },

  onAddMessage (params) {
    let r = params.msg
    let { isWelcome, requestForForm, disableAutoResponse, cb, application } = params

    if (application) {
      r.to = application._context.from
      r._context = application._context
    }
    var self = this
    let m = this.getModel(r[TYPE])
    let isContext = utils.isContext(m) // r[TYPE] === PRODUCT_APPLICATION
    var props = m.properties;
    if (!r._time)
      r._time = new Date().getTime();
    var toOrg
    // r.to could be a reference to a resource
    var to = this._getItem(r.to)
    let toType
    if (to)
      toType = to[TYPE]
    let isReadOnlyContext, orgId, orgRep
    if (toType === ORGANIZATION) {
      orgId = utils.getId(r.to)
      orgRep = this.getRepresentative(orgId)
      // if (me.isEmployee  &&  utils.getId(me.organization) === orgId)
      //   return
      if (!orgRep) {
        var params = {
          action: 'addMessage',
          error: 'No ' + r.to.name + ' representative was found'
        }
        this.trigger(params);
        return
      }
      toOrg = r.to
      r.to = orgRep
    }
    else {
      let toM = this.getModel(toType)
      isReadOnlyContext = utils.isContext(toM)  &&  utils.isReadOnlyChat(to)
    }
    let isSelfIntroduction = r[TYPE] === SELF_INTRODUCTION

    var rr = {};
    var context
    if (r._context) {
      rr._context = r._context
      context = this.findContext(r._context)
    }
    rr[IS_MESSAGE] = true

    if (isContext)
      rr.contextId = this.getNonce()
    for (let p in r) {
      if (!props[p])
        continue
      if (!isSelfIntroduction  &&  props[p].ref  &&  !props[p].id)
        rr[p] = this.buildRef(r[p])
      else
        rr[p] = r[p];
    }

    let isCustomerWaiting = r[TYPE] === CUSTOMER_WAITING
    // rr[NONCE] = this.getNonce()
    let toChain = {
      [TYPE]: rr[TYPE],
      // [NONCE]: rr[NONCE],
      time: r._time
    }
    if (rr.message)
      toChain.message = rr.message
    if (rr.photos)
      toChain.photos = rr.photos
    if (isSelfIntroduction)
      toChain.profile = { firstName: me.firstName }
    if (r.list)
      rr.list = r.list
    let required = m.required
    if (required) {
      required.forEach((p) => {
        if (props[p].type === 'object'  &&  !props[p].inlined  &&  !this.getModel(props[p].ref).inlined)
          toChain[p] = this.buildSendRef(rr[p])
        else
          toChain[p] = rr[p]
      })
      // HACK
      delete toChain.from
      delete toChain.to
    }
    var batch = []
    var error
    var welcomeMessage
    // var promise = Q(protocol.linkString(toChain))
    let applicant
    if (application  &&  utils.isRM(application))
      applicant = this._getItem(utils.getId(application.applicant))
    else
      applicant = r.to
    let hash = applicant[ROOT_HASH]
    if (!hash)
      hash = this._getItem(utils.getId(r.to))[ROOT_HASH]
    var toId = utils.makeId(IDENTITY, hash)
    rr._sendStatus = self.isConnected ? SENDING : QUEUED
    var noCustomerWaiting
    // let firstTime
    return this._loadedResourcesDefer.promise
    .then(() => {
      let promise = isContext
                  ? this.searchMessages({modelName: m.id, to: toOrg})
                  : Q()
      return promise
    })
    .then((result) => {
      if (result) {
        result = result.filter((r) => {
          return (r.message === r.message  &&  !r._documentCreated) ? true : false
        })
        if (result.length) {
          result.forEach((r) => {
            const rid = utils.getId(r)
            self._mergeItem(rid, { _documentCreated: true })
          })
        }
      }
      return this.maybeWaitForIdentity({ permalink: hash })
    })
    .then(() => this.meDriverExec('sign', { object: toChain }))
    .then((result) => {
      toChain = result.object
      let hash = protocol.linkString(result.object)

      rr[ROOT_HASH] = r[ROOT_HASH] = rr[CUR_HASH] = r[CUR_HASH] = hash
      if (isContext) {
        rr._context = r._context = {id: utils.getId(r), title: r.requestFor}
        contextIdToResourceId[rr.contextId] = rr

        self.addLastMessage(r, batch)
      }
      else if (!isWelcome  &&  !application)
        self.addLastMessage(r, batch)

      if (!isWelcome) //  ||  utils.isEmployee(r.to))
        return
      if (!orgRep)
        return
      if (orgRep.lastMessageTime) {
        isWelcome = orgRep.lastMessage === r.message
        if (!isWelcome)
          return;
      }
      // var wmKey = SIMPLE_MESSAGE + '_Welcome' + toOrg.name.replace(' ', '_')// + '_' + new Date().getTime()
      // Create welcome message without saving it in DB
      // welcomeMessage = {}
      if (me.txId)
        return

      // ProductApplication was requested as a part of verification process from different provider
      if (isContext)
        isWelcome = false
      // Avoid sending CustomerWaiting request after SelfIntroduction or IdentityPublishRequest to
      // prevent the not needed duplicate expensive operations for obtaining ProductList
      return self.getDriver(me)
      .then(() => {
        if (!self.isConnected  ||  publishRequestSent[orgId])
          return
        // TODO:
        // do we need identity publish status anymore
        return meDriver.identityPublishStatus()
      })
      .then((status) => {
        if (!status/* || !self.isConnected*/)
          return
        publishRequestSent[orgId] = true
        if (!status.watches.link  &&  !status.link  &&  !me.isEmployee) {
          if (isCustomerWaiting)
            noCustomerWaiting = true
          return self.publishMyIdentity(orgRep)
        }
        else {
          let id = to.organization ? utils.getId(to.organization) : utils.getId(to)
          if (chatMessages[id]  &&  chatMessages[id].length)
            return
          // self.updateMe()
          var allMyIdentities = self._getItem(MY_IDENTITIES)
          var all = allMyIdentities.allIdentities
          var curId = allMyIdentities.currentIdentity

          let identity = all.filter((id) => id.id === curId)
          console.log('Store.onAddMessage: type = ' + r[TYPE] + '; to = ' + r.to.title)
          let rtitle = (r.to.organization  &&  r.to.organization.title) || utils.getDispalyName(r.to)
          var msg = {
            message: me.firstName + ' is waiting for the response',
            [TYPE]: SELF_INTRODUCTION,
            identity: identity[0].publishedIdentity,
            name: me.firstName,
            profile: {
              firstName: me.firstName
            },
            from: me,
            to: r.to
          }
          if (isCustomerWaiting)
            noCustomerWaiting = true
          return self.onAddMessage({msg: msg, disableAutoResponse: disableAutoResponse})
        }
      })
    })
    .then(() => {
      if (isWelcome  &&  utils.isEmpty(welcomeMessage))
        return;

      // Temporary untill the real hash is known
      var key = utils.getId(rr)

      rr.to = self.buildRef(isReadOnlyContext ? context.to : r.to)
      rr.from = rr.from || r.from
      if (isContext)
        rr.to.organization = self.buildRef(to)
      rr._outbound = true

      if (!application) {
        self._setItem(key, rr)

        if (!toOrg)
            toOrg = to.organization ? to.organization : to
        let isDenial = rr[TYPE] === APPLICATION_DENIAL
        let isApproval = rr[TYPE] === APPLICATION_APPROVAL
        if (isApproval  ||  isDenial ||  rr[TYPE] === CONFIRMATION)
          self.trigger({action: 'updateRow', resource: application || r.application, forceUpdate: true})
        if (isApproval)
          Actions.showModal({title: 'In process...', showIndicator: true})

        self.addMessagesToChat(utils.getId(toOrg), rr)
      }
      this.addVisualProps(rr)

      var params = {
        action: 'addMessage',
        resource: isWelcome ? welcomeMessage : rr
      }
      if (error)
        params.error = error
      if (r[TYPE]  !== SELF_INTRODUCTION)
        self.trigger(params)
      if (batch.length  &&  !error  &&  (isReadOnlyContext || self._getItem(toId).pubkeys))
        return self.getDriver(me)
    })
    .then(() => {
      // SelfIntroduction or IdentityPublishRequest were just sent
      if (noCustomerWaiting)
        return
      if (isReadOnlyContext)
        return self.sendMessageToContextOwners(toChain, [context.from, context.to], context)
      let toRes = self._getItem(toId)
      if (toRes)
        return toRes.pubkeys
      else if (me.isEmployee) {
        let rep = this.getRepresentative(me.organization)
        return this._getItem(utils.makeId(IDENTITY, rep[ROOT_HASH])).pubkeys
      }
    })
    .then((pubkeys) => {
      if (pubkeys) {
        // let sendParams = self.packMessage(r, toChain)
        let sendParams = self.packMessage(toChain, r.from, r.to, context)
        if (disableAutoResponse) {
          if (!sendParams.other)
            sendParams.other = {}
          sendParams.other.disableAutoResponse = true
        }
        const method = toChain[SIG] ? 'send' : 'signAndSend'
        return self.meDriverExec(method, sendParams)
        .catch(function (err) {
          debugger
        })
      }
    })
    .then((result) => {
      if (!requestForForm  &&  isWelcome)
        return
      if (isWelcome  &&  utils.isEmpty(welcomeMessage))
        return
      if (isReadOnlyContext)
        return
      // cleanup temporary resources from the chat message references and from the in-memory storage - 'list'
      if (!toOrg)
        toOrg = to.organization ? to.organization : to

      let orgId = utils.getId(toOrg)
      // self.deleteMessageFromChat(orgId, rr)
      // delete list[rr[TYPE] + '_' + tmpKey]

      // saving the new message
      const data = utils.toOldStyleWrapper(result.message)
      if (data)  {
        rr[ROOT_HASH] = data[ROOT_HASH]
        rr[CUR_HASH] = data[CUR_HASH]
      }
      var key = utils.getId(rr)

      self.dbBatchPut(key, rr, batch)
      // rr._sendStatus = self.isConnected ? SENDING : QUEUED

      self._setItem(key, rr)
      if (isContext)
        return this.searchMessages({modelName: FORM_REQUEST, to: to})
    })
    .then((result) => {
      if (result) {
        result.forEach((r) => {
          if (r._documentCreated  &&  !r._document) {
            let rId = utils.getId(r)
            batch.push({type: 'del', key: rId})
            this.deleteMessageFromChat(orgId, r)
            this._deleteItem(rId)
          }
        })
      }
      // self.addMessagesToChat(orgId, rr)
      return db.batch(batch)
    })
    .catch((err) => {
      debugger
    })
    .finally(() => {
      if (cb)
        cb(rr)
    })
  },

  packMessage(toChain, from, to, context) {
    var sendParams = {}
    if (toChain[CUR_HASH]) {
      sendParams.link = toChain[CUR_HASH]
      from = toChain.from
      to = toChain.to
      context = toChain._context
    }
    else
      sendParams.object = toChain

    if (typeof to === 'string'  ||  utils.isStub(to))
      to = this._getItem(utils.getId(to))
    let provider, hash
    if (to[ROOT_HASH] === me[ROOT_HASH]) {
      provider = this._getItem(from)
      hash = provider[ROOT_HASH]
    }
    else
      provider = to
    hash = provider[ROOT_HASH]

    // if (!hash)
    //   hash = provider[ROOT_HASH]

    var isEmployee
    if (me.organization) {
      isEmployee = utils.isEmployee(to)
      // See if the sender is in a process of verifying some form in shared context chat
      if (!isEmployee  &&  context)
        isEmployee = context.contextId ? context : utils.isReadOnlyChat(this._getItem(context))
      if (!isEmployee  &&  to) {
        if (utils.getId(from) === utils.getId(me)) {
          let rep = this.getRepresentative(me.organization)
          isEmployee = utils.getId(rep) !== utils.getId(to)
        }
      }
    }
    // if (me.isEmployee)
    //   isEmployee = (!to.organization ||  utils.getId(to.organization) === utils.getId(me.organization))

    // let isEmployee = me.isEmployee && (!r.to.organization || utils.getId(r.to.organization) === utils.getId(me.organization))
    if (isEmployee) {
      let arr
      if (SERVICE_PROVIDERS.length) {
        // debugger
        // let myRepHash = this.getRepresentative(me.organization)[ROOT_HASH]
        // arr = SERVICE_PROVIDERS.filter((sp) => {
        //   let reps = this.getRepresentatives(sp.org)
        //   let talkingToBot = reps.filter((r) => {
        //     return r[ROOT_HASH] === hash  &&  hash !== myRepHash ? true : false
        //   })
        //   return talkingToBot  &&  talkingToBot.length ? true : false
        // })
      }
      else  {
        if (!to.bot)
          arr = [to]
      }
      if (!arr  ||  !arr.length) {
        var toRootHash = hash

        let rep = this.getRepresentative(me.organization)
        if (rep[ROOT_HASH] !== toRootHash)
          sendParams.other = {
            forward: toRootHash
          }
        sendParams.to = { permalink: rep[ROOT_HASH] }
      }
    }
    if (context) {
      if (!sendParams.other)
        sendParams.other = {}
      // let cId = utils.getId(context)
      // sendParams.other.context = cId.split('_')[1]

      let contextId = context.contextId  || this._getItem(context).contextId
      // let contextId = this._getItem(context).contextId
      if (!contextId) {
        this.findContextId(utils.getId(context))
      }
      if (contextId)
        sendParams.other.context = contextId
       if (!utils.isContext(toChain[TYPE])) {
        let c = this._getItem(context)
        // will be null for PRODUCT_APPLICATION itself
        if (c) {
          c.lastMessageTime = new Date().getTime()
          c._formsCount = c._formsCount ? ++c._formsCount : 1
          this.dbPut(utils.getId(context), c)
        }
      }
    }
    if (!sendParams.to) {
      var toId = utils.makeId(IDENTITY, hash)
      sendParams.to = { permalink: hash }
    }
    return sendParams
  },
  findContextId(resourceId) {
    for (let id in contextIdToResourceId) {
      let rid = utils.getId(contextIdToResourceId[id])
      if (rid === resourceId)
        return id
    }
  },
  findContext(resourceOrId) {
    let rId
    if (typeof resourceOrId === 'object') {
      if (!resourceOrId.id)
        return resourceOrId
      rId = resourceOrId.id
    }
    else
      rId = resourceOrId
    let cId = this.findContextId(rId)
    if (cId)
      return contextIdToResourceId[cId]
    else
      return this._getItem(rId)
  },

  // Every chat has it's own messages array where
  // all the messages present in order they were received
  addMessagesToChat(id, r, isInit, timeShared) {
    if (r._documentCreated  &&  !isInit)
      return
    if (!r._time  &&  !timeShared)
      return
    // if (r.sharedWith) {
    //   if (r[TYPE] !== VERIFICATION) {
    //     if (id.split('_')[0] === ORGANIZATION) {
    //       let o = this._getItem(utils.getId(r.to)).organization
    //       if (utils.getId(o) !== id)
    //         return
    //     }
    //   }
    // }
    // Check if this is a shared context
    if (r[TYPE] === SELF_INTRODUCTION  ||  r[TYPE] === CUSTOMER_WAITING)
      return
    if (r._context) {
      let c = this._getItem(r._context)
      // context could be empty if ForgetMe was requested for the provider where form was originally created
      // if (c  &&  c._readOnly)
      if (utils.isReadOnlyChat(r))
        id = utils.getId(r._context)
    }
    let messages = chatMessages[id]
    let allMessages = chatMessages[ALL_MESSAGES]
    let noMessages
    if (!allMessages) {
      allMessages = []
      noMessages = true
      chatMessages[ALL_MESSAGES] = allMessages
    }
    else if (!isInit) {
      // Request for remediation
      if (r[TYPE] === DATA_CLAIM)
        Actions.showModal({title: 'Connecting to ' + this._getItem(id).name, showIndicator: true})
      // request for remediation failed
      else if (r[TYPE] === SIMPLE_MESSAGE) {
        if (!noMessages  &&  utils.getType(allMessages[allMessages.length - 1].id) === DATA_CLAIM)
          Actions.hideModal()
      }
    }
    let rid = utils.getId(r)
    if (messages  &&  messages.length) {
      if (!isInit) {
        if (r[TYPE] === FORM_REQUEST  &&  utils.isContext(r.form)) {
          // This is request for productList
          let msgId = messages[messages.length - 1].id
          if (this._getItem(msgId).form === r.form) {
            messages.splice(messages.length - 1, 1)
            let allIdx = allMessages.findIndex(({ id }) => id === msgId)
            if (allIdx !== -1)
              allMessages.splice(allIdx, 1)
          }
        }
        let idx = -1
        for (let i=0; i<messages.length  &&  idx === -1; i++)
          if (messages[i].id === rid)
            idx = i

        if (idx !== -1) {
          if (r._time === list[rid].value._time)
            return
          messages.splice(idx, 1)
        }
      }
    }
    else {
      messages = []
      chatMessages[id] = messages
    }
    let stub = {id: utils.getId(r), time: timeShared || r._time}
    messages.push(stub)
    let allIdx = allMessages.findIndex(({ id }) => id === rid)
    if (allIdx !== -1)
      return
    allMessages.push(stub)
  },
  // cleanup
  deleteMessageFromChat(id, r) {
    let rid = utils.getId(r)

    let allMessages = chatMessages[ALL_MESSAGES]
    let allIdx = allMessages.findIndex(({ id }) => id === rid)
    if (allIdx !== -1)
      allMessages.splice(allIdx, 1)

    let messages = chatMessages[id]
    if (messages) {
      let idx = messages.findIndex(({ id }) => id === rid)
      if (idx !== -1)
        messages.splice(idx, 1)
    }
  },
  getRepresentatives(org) {
    let rep = this.getRepresentative(org)
    return rep ? [rep] : []
    // let orgId = typeof org === 'string' ? org : utils.getId(org)
    // var result = this.searchNotMessages({modelName: PROFILE, all: true})
    // var orgRep = [];
    // result.some((ir) =>  {
    //   if (!ir.organization) return

    //   if (utils.getId(ir.organization) === orgId)
    //     orgRep.push(ir)
    // })

    // return orgRep.length ? orgRep : null
  },

  getRepresentative(orgId) {
    if (typeof orgId === 'object')
      orgId = utils.getId(orgId)
    if (currentEmployees[orgId])
      return currentEmployees[orgId]
    let org = this._getItem(orgId)
    // if (org.name.toUpperCase() === 'YUKI')
    //   return me
    var result = this.searchNotMessages({modelName: PROFILE, all: true})
    if (!result.length)
      return
    var orgRep;
    result.some((ir) =>  {
      if (!ir.organization) return

      if (utils.getId(ir.organization) === orgId  &&  ir.bot) {
        orgRep = ir
        return true
      }
    })

    return orgRep
  },
  async onGetRequestedProperties({resource, currentResource, noTrigger}) {
    let rtype = resource[TYPE]
    if (!plugins.length  &&  !appPlugins.length)
      return

    let allPlugins = plugins && plugins.slice() || []
    let appP = require('../plugins')
    appP.forEach(p => allPlugins.push(p))

    let _context = resource._context
    if (_context  &&   utils.isStub(_context))
      _context = this._getItem(_context.id)

    // if (appPlugins)
    //   appPlugins.forEach(p => allPlugins.push(p))
    let context = this.getBizPluginsContext()
    let moreInfo

    for (let i=0; i<allPlugins.length; i++) {
      let plugin = allPlugins[i]
      if (!plugin(context).validateForm)
        continue
      moreInfo = plugin(context).validateForm.call(
          {models: {[rtype]: this.getModel(rtype)}},
          {application: _context, form: resource, currentResource: currentResource}
      )
      if (moreInfo  &&  utils.isPromise(moreInfo))
        moreInfo = await moreInfo
      if (moreInfo  &&  moreInfo.requestedProperties)
        break
    }
    if (!moreInfo) {
      this.trigger({action: 'formEdit', requestedProperties: {}})
      return
    }
    // let moreInfo = plugin().validateForm({application: resource._context, form: r})
    let rprops = {}
    let message, deleteProperties, notRequired
    if (moreInfo) {
      deleteProperties = moreInfo.deleteProperties
      message = moreInfo.message
      let requestedProperties = moreInfo.requestedProperties
      if (requestedProperties) {
        requestedProperties.forEach((r) => {
          rprops[r.name] = r.message || ''
        })
      }
    }

    if (!noTrigger)
      this.trigger({action: 'formEdit', requestedProperties: rprops, resource, message, deleteProperties})
    return rprops
    // return rprops
  },
  getBizPluginsContext() {
    return {
      bot: {
        objects: {
          get: link => this._keeper.get(link)
        }
      },
      productsAPI: {},
      models: this.getModels()
    }
  },
  async onAddVerification(params) {
    let { r, dontSend, notOneClickVerification, noTrigger } = params

    let to = params.to || [r.to]
    let docStub = params.document || r.document
    let docId = utils.getId(docStub)
    let document = this._getItem(docId)
    let docFromServer
    if (!document) {
      if (me.isEmployee) {
        document = await this._getItemFromServer(docId)
        if (!document)
          document = docStub
        else
          docFromServer = true
      }
      else if (r[NOT_CHAT_ITEM])
        document = docStub
    }
    r.document = document
    if (dontSend)
      r._inbound = true

    let context = r._context
    if (!context) {
      context = document._context
      if (context)
        r._context = context
    }

    let isAssignRM = document[TYPE] === ASSIGN_RM
    if (isAssignRM) {
      Actions.hideModal()
      if (!docFromServer)
        document = await this._getItemFromServer(document)
      let application = await this._getItemFromServer(document.application)
      if (!application._context)
        application._context = await this._getItemFromServer(utils.getId(context))
      this.trigger({action: 'assignRM_Confirmed', application: application})
    }
    // if (__DEV__) {
    //   let newV = newVerificationTree(r, 4)
    //   if (newV) {
    //     delete newV.from
    //     extend(r, newV, true)
    //   }
    // }

    let time = r && r._time || new Date().getTime()
    let self = this
    let fromId = utils.getId(r  &&  r.from || me)
    let from = this._getItem(fromId)
    let newVerification
    let isReadOnly
    let key
    let result

    if (!dontSend) {
      result = await self.createObject({
                  [TYPE]: VERIFICATION,
                  document: this.buildSendRef(document),
                  time: time
                })
    }

    if (result) {
      r = utils.clone(result.object)
      this.rewriteStubs(r)
      r[ROOT_HASH] = result.permalink
      r[CUR_HASH] = result.link
      r.from = this.buildRef(me, dontSend)
      let toR = this._getItem(to[0])
      if (!toR)
        debugger
      // HACK
      r.to = toR  &&  this.buildRef(toR) || {id: to[0]}
      r[IS_MESSAGE] = true
      r._context = context
    }
    newVerification = this.buildRef(r, dontSend)
    // if (!context)
    //   context = document._context
    // if (context)
    //   r._context = context
    if (!dontSend)
      await this.sendMessageToContextOwners(r, to, context)
      // await this.sendMessageToContextOwners(result.object, to, context)

    if (!r._sharedWith) {
      r._sharedWith = []
      // Case where employee verifies the form
      if (me &&  me.isEmployee) {
        let rep = this.getRepresentative(me.organization)
        if (utils.getId(rep.organization) === utils.getId(r.from))
          this.addSharedWith(r, rep, r._time)
        else
          this.addSharedWith(r, r.from, r._time)
      }
      else
        this.addSharedWith(r, r.from, r._time)
    }
    var batch = [];
    key = utils.getId(r)
    this.dbBatchPut(key, r, batch);
    let len = batch.length

    if (r._context) {
      let notReadOnly
      if (me.isEmployee)  {
        if (utils.isReadOnlyChat(r))
          isReadOnly = true
        else
          notReadOnly = true
      }
      if (!notReadOnly) {
        let cId = utils.getId(r._context)
        let c = this._getItem(cId);
        if (!c  &&  me.isEmployee)
          c = await this._getItemFromServer(cId)
        if (c)
          isReadOnly = utils.isReadOnlyChat(c) //c  &&  c._readOnly
      }
    }
    // let docId = utils.getId(r.document)
    let doc = document // this._getItem(r.document)
    let meId = utils.getId(me)
    let myBotId = me.isEmployee ? utils.getId(this.getRepresentative(me.organization)) : null
    if (!me.isEmployee  ||  (r.to.id === meId  &&  r.from.id === myBotId)) {
      if (!isReadOnly) {
        doc._verificationsCount = !doc._verificationsCount ? 1 : ++doc._verificationsCount
        this.dbBatchPut(docId, doc, batch);
        this.addBacklinksTo(ADD, me, r, batch)
        this.setMe(me)
        this.trigger({action: 'addItem', resource: utils.clone(me)})
        this.addBacklinksTo(ADD, this._getItem(r.from), r, batch)
      }
      if (r.sources) {
        let docs = []
        getDocs(r.sources, docId, docs)
        let supportingDocs = docs.map((r) => this.buildRef(r, dontSend))
        doc._supportingDocuments = supportingDocs
        this.dbPut(docId, doc)
        this._setItem(docId, doc)
      }
    }
    this._setItem(key, r)
    await db.batch(batch)

    this.addVisualProps(r)
    // var rr = {};
    // extend(rr, from);
    // rr.verifiedByMe = r;

    context = r._context ? this._getItem(r._context) : null
    if (isReadOnly)
      this.addMessagesToChat(utils.getId(r._context), r)
    if (fromId === utils.getId(me)) {
      to.forEach((recipient) => {
        this.addMessagesToChat(utils.getId(recipient), r)
      })
    }
    else if (context && params.isThirdPartySentRequest) {
      let id
      if (me.isEmployee) {
        let rep = this.getRepresentative(me.organization)
        id = utils.getId(context.to) === utils.getId(rep) ? context.from : context.to
        this.addMessagesToChat(utils.getId(id), r)
      }
      else {
        let cOrg = this._getItem(id).organization
        this.addMessagesToChat(utils.getId(cOrg), r)
      }
    }
    else
      this.addMessagesToChat(from.organization ? utils.getId(from.organization) : fromId, r)
    if (!isAssignRM  &&  !noTrigger) {
      if (notOneClickVerification)
        this.trigger({action: 'addItem', resource: r});
      else
        this.trigger({action: 'addVerification', resource: r});
    }
    if (!doc  ||  docFromServer)
      return

    if (!r.txId) {
      if (!doc.verifications)
        doc.verifications = [];
      doc.verifications.push(newVerification);
    }
    else {
      for (var i=0; i<doc.verifications.length; i++) {
        let hash = this.getRootHash(doc.verifications)
        if (hash === r[ROOT_HASH])
        // if (utils.getId(doc.verifications).split('_')[1] === r[ROOT_HASH])
          doc.verifications.push(newVerification)
      }
    }
    this.trigger({action: 'getItem', resource: doc})
    // if (!verificationRequest._sharedWith)
    //   verificationRequest._sharedWith = []
    // verificationRequest._sharedWith.push(fromId)
    await this.dbPut(docId, doc);

    function getDocs(varr, rId, docs) {
      if (!varr)
        return
      varr.forEach((v) => {
        if (v.method) {
          if (utils.getId(v.document) !== rId)
            docs.push(v.document)
        }
        else if (v.sources)
          getDocs(v.sources, rId, docs)
      })
    }
  },
  addVisualProps(r) {
    let from = this._getItem(r.from || me)
    if (from  &&  from.organization) {
      r.from.organization = from.organization
      let fOrg = this._getItem(from.organization)
      if (fOrg.photos)
        r.from.photo = fOrg.photos[0]
      if (!fOrg._online)
        r.from.organization._online = false
      else
        r.from.organization._online = true
      if (r[TYPE] === VERIFICATION)
        r.organization = from.organization
    }
    let to = this._getItem(r.to)
    if (to && to.organization) {
      r.to.organization = to.organization
      let toOrg = this._getItem(to.organization)
      if (toOrg.photos)
        r.to.photo = toOrg.photos[0]
      if (!toOrg._online)
        r.to.organization._online = false
      else
        r.to.organization._online = true
    }
    if (r && r._verifiedBy) {
      let verifiedBy = this._getItem(r._verifiedBy)
      if (verifiedBy.organization)
        r._verifiedBy.organization = verifiedBy.organization
      if (verifiedBy.photos)
        r._verifiedBy.photo = verifiedBy.photos[0]
    }
    if (r._context  &&  !utils.isContext(r[TYPE])) {
      let c = this.findContext(r._context)
      if (c)
        r._context = c
    }
    return r
  },
  sendMessageToContextOwners(v, recipients, context) {
    return Q.all(recipients.map((to) => {
      let sendParams = this.packMessage(v, me, to, context)
      return this.meDriverSend(sendParams)
    }))
  },
  onGetTo(resource) {
    this.onGetItem({resource: resource, action: 'getTo'});
  },
  onGetFrom(resource) {
    this.onGetItem({resource: resource, action: 'getFrom'});
  },
  addSharedWith(r, shareWith, time, shareBatchId, lens) {
    // if (!r._sharedWith)
    //   r._sharedWith = []
    let id = utils.getId(shareWith)
    // if (id === utils.getId(utils.getMe()))
    //   debugger
    // let hasThisShare = r._sharedWith.some((r) => r.shareBatchId === shareBatchId)
    let hasThisShare = r._sharedWith  &&  r._sharedWith.some((r) => r.bankRepresentative === id)
    if (!hasThisShare) {
      if (!r._sharedWith)
        r._sharedWith = []
      r._sharedWith.push(this.createSharedWith(id, time, shareBatchId, lens))
    }
  },

  async onGetItem(params) {
    var {resource, action, noTrigger, search, backlink, backlinks, forwardlink} = params
    // await this._loadedResourcesDefer.promise

    const resModel = this.getModel(utils.getType(resource))
    if (!resModel) {
      throw new Error(`missing model for ${res[TYPE]}`)
    }

    if (search)
      return await this.onGetItemFromServer(params)

    let rId = utils.getId(resource)
    let r = this._getItem(rId)
    var res = {};
    if (!r) {
      if (me.isEmployee) {
        res = await this._getItemFromServer(rId)
        r = pick(res, TYPE)
      }
    }
    if (utils.isMessage(r)) {
      let kres
      try {
        if (r._latest  ||  me.isEmployee)
          kres = await this._keeper.get(r[CUR_HASH])
        else {
          let latest = this.findLatestResource(r)
          kres = await this._keeper.get(latest[CUR_HASH])
        }
        this.rewriteStubs(kres)
      }
      catch (err) {
        if (me.isEmployee) {
          return await this.onGetItemFromServer(params)
          // kres = await this._getItemFromServer(rId)
        }
      }
      _.extend(res, kres)
    }

    _.extend(res, r)
if (!res[SIG]  &&  res._message)
  debugger
// if (res[TYPE] === FORM_ERROR)
//   debugger
    var props = backlinks || (backlink ? {[backlink.name]: backlink} : resModel.properties)

    for (let p in props) {
      if (p.charAt(0) === '_'  ||  props[p].hidden)
        continue;
      var items = props[p].items;
      if (!items  ||  !items.backlink)
        continue;
      let blList = await this.getBacklinkResources(props[p], res)
      res[p] = blList
    }

    if (noTrigger)
      return res

    let retParams = { resource: res, action: action || 'getItem'}
    if (utils.isMessage(res)) {
      let meId = utils.getId(me)
      let rep = utils.getId(res.from) === meId ? res.to : res.from
      let orgR = rep.organization
      if (orgR) {
        let org = this._getItem(orgR)
        if (org.currency)
          retParams.currency = org.currency
        if (org.country)
          retParams.country = org.country
        if (org.style)
          retParams.style = org.style
      }
    }
    this.trigger(retParams);
    return res
  },
  async onGetItemFromServer(params) {
    var {resource, action, noTrigger, search, backlink, forwardlink, application} = params
    let isApplication = resource[TYPE] === APPLICATION
    let rId = utils.getId(resource)
    let r
    if (!isApplication  ||  resource.id  ||  (!backlink  &&  !forwardlink))
      r = await this._getItemFromServer(rId, backlink)
    else {
      let prop
      let blProp = backlink ||  forwardlink
      if (blProp) {
        let ref = blProp.items.ref
        let submissions = utils.getModel(APPLICATION).properties.submissions
        if (ref === APPLICATION_SUBMISSION)
          prop = submissions
        else
          prop = blProp
        let resourceWithBacklink = await this._getItemFromServer(rId, prop)
        if (resourceWithBacklink  &&  resourceWithBacklink[prop.name]) {
          r = _.cloneDeep(resource)
          r[prop.name] = resourceWithBacklink[prop.name]
          if (prop === submissions)
            this.organizeSubmissions(r)
        }
        else
          r = resource
      }
      // r = _.cloneDeep(resource)
      // let ref = utils.getModel(APPLICATION).properties.submissions.items.ref
      // let hash = r[CUR_HASH]
      // let l = await this.searchServer({modelName: ref, filterResource: {'application._permalink': r[ROOT_HASH]}, noTrigger: true})
      // if (!l)
      //   return
      // r.submissions = l.list
      // this.organizeSubmissions(r)
    }

    let list
    let m = this.getModel(r[TYPE])
    if (isApplication) {
      let link = forwardlink  ||  backlink
      if (link) {
        let linkName = link.name
        if (r[linkName]) {
          // list = await this.getObjects(r[forwardlinkName], forwardlink)
          list = await this.getObjects(r[linkName], link)
          // if (link.items.ref !== VERIFIED_ITEM)
          //   list = await Promise.all(r[linkName].map((fl) => this._getItemFromServer(utils.getId(fl))))
          // else
          //   list = await Promise.all(r[linkName].map((fl) => this._getItemFromServer(utils.getId(fl.verification))))

          r[linkName] = list
        }
      }
      if (r.relationshipManagers) {
        r.relationshipManagers.forEach(relationshipManager => {
          let rmId = relationshipManager.id.replace(IDENTITY, PROFILE)
          let rm = this._getItem(rmId)
          if (rm)
            relationshipManager.title = utils.getDisplayName(rm)
        })
      }
      if (!r._context) {
        let context = await this.getContext(r.context, r)
        if (context)
          r._context = context
      }
    }
    else if (application) {
      // let forms = application.forms
      // if (!forms  ||  !forms.length)
      //   return
      // let items = utils.getPropertiesWithAnnotation(m, 'items')
      // let backlinks = {}
      // for (let p in items) {
      //   if (items[p].items.backlink)
      //     backlinks[p] = items[p]
      // }
      // if (!utils.isEmpty(backlinks)) {
      //   let hasBacklinks
      //   forms.forEach(f => {
      //     let t = utils.getType(f)
      //     let tm = utils.getModel(t)
      //     for (let p in backlinks) {
      //       let bl = backlinks[p]
      //       if (bl.items.ref === t  ||  utils.getModel(bl.items.ref).subClassOf === t) {
      //         if (!r[p])
      //           r[p] = []
      //         r[p].push(f)
      //         r['_' + p + 'Count'] = r[p].length
      //         hasBacklinks = true
      //       }
      //     }
      //   })
      // }
      if (!r._context) {
        let context = await this.getContext(application.context, r)
        if (context)
          r._context = context
      }
    }
    if (!r._context) {
      // if (!resource._context)
      //   debugger
      r._context = resource._context
    }

    if (isApplication  &&  !r._context) {
      let context = await this.getContext(r.context, r)
      if (context)
        r._context = context
    }
    let retParams = { resource: r, action: action || 'getItem', forwardlink, backlink}
    if (list)
      retParams.list = list
    this.trigger(retParams)
    return r
  },
  async getObjects(list, prop) {
    if (!list.length)
      return
    let links
    if (prop) {
      if (prop.items.ref !== VERIFIED_ITEM)
        links = list.map((fl) => this.getCurHash(fl)) // fl[CUR_HASH] || fl.id.split('_')[2])
      else
        links = list.map((fl) => this.getCurHash(fl.verifications)) // utils.getId(fl.verification).split('_')[2])
    }
    else
      links = Object.keys(list)

    let newLinks = []
    let cachedList = []
    links.forEach((l) => {
      let r = this.cache.get(l)
      if (r)
        cachedList.push(r)
      else
        newLinks.push(l)
    })
    if (!newLinks.length)
      return cachedList

    let objects = await graphQL.getObjects(newLinks, this.client)
    objects.forEach((obj) => {
      let r = this.convertToResource(obj)
      this.cache.set(r[CUR_HASH], r)
    })

    return links.map(l => this.cache.get(l))
  },
  async getItemFromDeepLink({type, link, permalink}) {
    let resource
    if (link  &&  permalink) {
      let id = utils.makeId(type, link, permalink)
      resource = this._getItem(id)
      if (!resource)
        resource = await this._getItemFromServer(id)
    }
    else {
      let list = this.searchServer({modelName: type, filterResource: {permalink}, noTrigger: true})
      if (list.length)
        resource = list[0]
    }
    if (resource)
      this.trigger({ resource, action: 'getItemFromDeepLink'})
  },
  async getBacklinkResources(prop, res) {
    let items = prop.items
    if (!items  ||  !items.backlink)
      return
    var backlink = items.backlink
    var itemsModel = this.getModel(items.ref);
    var params = {
      modelName: items.ref,
      resource: res,
      meta: itemsModel,
      prop: prop,
      props: itemsModel.properties
    }
    var meta = this.getModel(items.ref)
    // var isMessage = true // utils.isMessage(meta)
    // var result = isMessage ? await this.searchMessages(params) : this.searchNotMessages(params)
    // if (isMessage) {
    let result = await this.searchMessages(params)
    if (result  &&  result.length) {
      res['_' + prop.name + 'Count'] = result.length
      if (result[0][IS_MESSAGE])
        return result.filter((r) => r._latest)
    }
    return result
  },
  onExploreBacklink(resource, prop, backlinkAdded) {
    // return this.searchMessages({
    //   prop: prop,
    //   modelName: prop.items.ref,
    //   to: resource
    // })
    // .then((list) => {
      this.trigger({
        action: 'exploreBacklink',
        resource: resource,
        backlink: prop,
        // list: list,
        backlinkAdded: backlinkAdded
      })
    // })
    // .catch((err) => {
    //   debugger
    // })
  },
  onExploreForwardlink(resource, prop, forwardlinkAdded) {
    // return this.searchMessages({
    //   prop: prop,
    //   modelName: prop.items.ref,
    //   to: resource
    // })
    // .then((list) => {
      this.trigger({
        action: 'exploreForwardlink',
        resource: resource,
        forwardlink: prop,
        // list: list,
        forwardlinkAdded: forwardlinkAdded
      })
    // })
    // .catch((err) => {
    //   debugger
    // })
  },
  onGetDetails(resource) {
    this.trigger({action: 'showDetails', resource: resource})
  },
  onGetDocuments(resource, docs) {
    let list = docs.map((r) => this._getItem(utils.getId(r)))
    this.trigger({action: 'showDocuments', list: list, resource: resource})
  },
  getItem(resource) {
    var self = this;
    var modelName = resource[TYPE];
    var meta = this.getModel(modelName)
    var foundRefs = [];
    var refProps = this.getRefs(resource, foundRefs, meta.properties);
    var newResource = {};
    _.extend(newResource, resource);
    for (var i=0; i<foundRefs.length; i++) {
     // foundRefs.forEach(function(val) {
       var val = foundRefs[i];
       if (val.state === 'fulfilled') {
         var propValue = utils.getId(val.value)
         var prop = refProps[propValue];
         newResource[prop] = val.value;
         newResource[prop].id = propValue
         if (!newResource[prop].title)
            newResource[prop].title = utils.getDisplayName(newResource);
       }
     }
     return newResource;
  },
  getDependencies(resultList) {
    var newResult = resultList.map((resource) => {
      return this.getItem(resource);
    });
    return newResult;
  },
  getRefs(resource, foundRefs, props) {
    let refProps = [];
    for (let p in resource) {
      if (!props[p])
        continue
      if (props[p].type !== 'object')
        continue
      let ref = props[p].ref;
      if (!ref  ||  !resource[p])
        continue
      // reference property could be set as a full resource (for char to have all info at hand when displaying the message)
      // or resource id
      let rValue = utils.getId(resource[p])

      refProps[rValue] = p;
      let value = this._getItem(rValue)
      if (value)
        foundRefs.push({value, state: 'fulfilled'})
    }
    return refProps
  },
  onAddModelFromUrl(url) {
    let model, props;
    return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      model = responseData;
      props = model.properties;

      var err = '';
      var id = model.id;

      if (!id)
        err += '"id" is required. Could be something like "myGithubId.nameOfTheModel"';
      var key = id;
      // if (models[key])
      //   err += '"id" is not unique';
      var message = model.message;
      var from = props.from;
      if (!from)
        err += '"from" is required. Should have {ref: "' + PROFILE + '"}';

      var to = props.to;
      if (!to)
        err += '"to" is required. Should have {ref: "' + PROFILE + '"}';
      var time = props._time;
      if (!time)
        err += '"time" is required';

      if (err.length) {
        this.trigger({action: 'newModelAdded', err: err});
        return;
      }
      // model.interfaces = [];
      // model.interfaces.push(MESSAGE);
      // var rootHash = sha(model);
      // model[ROOT_HASH] = rootHash;
      model[constants.OWNER] = this.buildRef(me)
      // model[constants.OWNER] = {
      //   id: PROFILE + '_' + me[ROOT_HASH],
      //   title: utils.getDisplayName(me, self.getModel(PROFILE).properties),
        // photos: me.photos
      // }
      // Wil need to publish new model
      return this.dbPut(key, model);
    })
    .then(() => {
      if (!me.myModels)
        me.myModels = [];
      var key = model.id;
      me.myModels.push({key: key, title: model.title});

      this.setPropertyNames(props);

      models[key] = {
        key: key,
        value: model
      };
      this.trigger({action: 'newModelAdded', newModel: model});
    })
    .catch((err) => {
      err = err;
    })
    .done();
  },
  setPropertyNames(props) {
    for (let p in props) {
      var val = props[p]
      if (!val.name && typeof val !== 'function')
        props[p].name = p;
      if (!val.title)
        val.title = utils.makeLabel(p);
    }
  },
  onSaveTemporary(resource) {
    temporaryResources[resource[TYPE]] = resource
  },
  async onGetTemporary(type) {
    var r = temporaryResources[type]
    // if (!r) {
    //   r = {_t: type}
    //   if (type === SETTINGS)
    //     r.url = SERVICE_PROVIDERS_BASE_URL || SERVICE_PROVIDERS_BASE_URL_DEFAULT
    // }
    let requestedProperties = r  &&  await this.onGetRequestedProperties({resource: r, noTrigger: true})
    this.trigger({action: 'getTemporary', resource: r, requestedProperties})
  },

  async onAddAll(resource, to, message) {
    this._pushSemaphore.stop()
    try {
      await this._onAddAll(...arguments)
    } finally {
      this._pushSemaphore.go()
    }
  },

  async _onAddAll(resource, to, message) {
    let rId = utils.getId(resource)
    let r = this._getItem(rId)
    r._documentCreated = true
    this.trigger({action: 'addItem', resource: r})
    this.dbPut(rId, r)
    let context = resource._context
    // prepare some whitespace
    const numRows = 5
    const white = ' '.repeat(40)
    const messages = new Array(numRows).fill(white)
    const title = `${translate('importing')}...          ` // extra whitespace on purpose

    Actions.showModal({
      title,
      message: messages.join('\n')
    })

    for (let i = 0; i < resource.items.length; i++) {
      await utils.promiseDelay(200)
      let item = resource.items[i]
      item._context = context
      item.to = to
      item.from = me
      let itemType = utils.getType(item)
      let itemModel = this.getModel(itemType)
      let displayName = ''
      if (itemModel) displayName += itemModel.title

      let resourceDisplayName = item.title || utils.getDisplayName(item)
      if (resourceDisplayName) {
        displayName += ': ' + resourceDisplayName
      }

      if (i > 0) {
        let last = messages.length - 1
        messages[last] = messages[last].replace('importing', 'imported')
      }

      // let's not run out of room on the screen
      let next = displayName // `importing "${displayName}"`
      if (next.length > 30) {
        next = next.slice(0, 27) + '...'
      }

      let idx = Math.min(numRows - 1, i)
      if (messages[idx].trim()) {
        messages.shift()
        messages.push(next)
      } else {
        messages[idx] = next
      }

      Actions.showModal({
        title,
        message: messages.join('\n\n')
      })

      let promiseAddItem = this.onAddChatItem({ resource: item, noTrigger: true })
      let promiseSentEvent = new Promise(resolve => meDriver.once('sent', resolve))
      await Promise.all([
        promiseAddItem,
        Promise.race([
          promiseSentEvent,
          // force continue loop
          utils.promiseDelay(2000)
        ])
      ])
    }

    await utils.promiseDelay(200)
    Actions.hideModal()

    this.onAddMessage({msg: {
      [TYPE]: REMEDIATION_SIMPLE_MESSAGE,
      message: message,
      time: new Date().getTime(),
      _context: resource._context,
      from: this.buildRef(me),
      to: this.buildRef(r.from)
    }})

    // bulk example:

    // const signed = await Q.all(resource.items.map(form => {
    //   return applicant.createObject({ object: form })
    // }))

    // // store `signed` in `list`

    // const result = await meDriver.signAndSend({
    //   to: to,
    //   object: {
    //     [TYPE]: 'tradle.ConfirmPackageResponse',
    //     message: REMEDIATION_SIMPLE_MESSAGE,
    //     sigs: signed.map(wrapper => wrapper.object[SIG])
    //   }
    // })
  },
  async onOpenURL(url) {
    let URL = parseURL(url.replace('/#', ''))
    let pathname = URL.pathname || URL.hostname
    if (!pathname) {
      Alert.alert('failed to parse URL')
      return
    }
    pathname = pathname.replace(/^\//, '')

    let query = URL.query
    // if (!query) {
    //   if (pathname === 'scan') {
    //     this.trigger({action: pathname})
    //     return
    //   }
    //   if (pathname !== 'conversations') //  &&  pathname !== 'profile')
    //     return
    // }

    let qs = query && require('querystring').parse(query) || {}

    switch(pathname) {
    case 'chat':
      this.onGetProvider(qs)
      break
    case 'conversations':
    case 'scan':
      this.trigger({action: pathname})
      break
    case 'r':
      await this.getItemFromDeepLink(qs)
      break
    case 'applyForProduct':
      await this.onApplyForProduct(qs)
      break
    case 'profile':
      this.trigger({action: 'profile'})
      break
    }
    // this.trigger({action: 'deepLink', url})
  },
  async onAddChatItem(params) {
    _.extend(params, {isMessage: true})
    await this.onAddItem(params)
  },
  async onAddItem(params) {
    var self = this
    var {resource, disableFormRequest, isMessage, disableAutoResponse, doneWithMultiEntry,
         value, chat, shareWith, cb, meta, isRegistration, provider, noTrigger, lens} = params
    if (!value)
      value = resource

    delete temporaryResources[resource[TYPE]]
    if (!meta)
      meta = this.getModel(resource[TYPE])

    // let isMessage = utils.isMessage(resource)
    if (isMessage)
      resource[IS_MESSAGE] = true

    // Check if there are references to other resources
    var refProps = {};
    var foundRefs = [];
    var props = meta.properties;

    if (meta.id == VERIFICATION  ||  meta.subClassOf === VERIFICATION) {
      // debugger
      return await this.onAddVerification({r: resource, notOneClickVerification: true, noTrigger: noTrigger, dontSend: resource[NOT_CHAT_ITEM]});
    }
    else if (meta.id === BOOKMARK)
      resource.to = this.buildRef(resource.from)
    // Check if the recipient is not one if the creators of this context.
    // If NOT send the message to the counterparty of the context
    let context = resource._context || value._context
    let isRemediation
    if (context) {
      let savedContext = this._getItem(context)
      if (savedContext) //  &&  me.isEmployee)
        context = savedContext
      if (!context)
        debugger
      isRemediation = context.requestFor === REMEDIATION

      // with employee it could be context that was started by different employee
      if (!me.isEmployee) {
        let toId = utils.getId(resource.to)
        if (toId !== utils.getId(context.to)  &&  toId !== utils.getId(context.from))
          resource.to = utils.clone(utils.getId(context.to) === utils.getId(me) ? context.from : context.to)
      }
    }

    let isSelfIntroduction = meta[TYPE] === SELF_INTRODUCTION
    var isNew = !resource[ROOT_HASH];

    if (!isNew  &&  !resource[CUR_HASH])
      resource[CUR_HASH] = protocol.linkString(resource)

    var checkPublish
    // try {
    // var isBecomingEmployee = isNew ? false : await becomingEmployee(resource)
    // if (isBecomingEmployee) {
    //   if (isBecomingEmployee.error) {
    //     this.trigger({action: 'addItem', error: isBecomingEmployee.error})
    //     return
    //   }
    //   isBecomingEmployee = isBecomingEmployee.isBecomingEmployee
    // }
    let results = []
    // let exclude = ['to', 'from']
    for (let p in resource) {
      if (!props[p] ||  props[p].type !== 'object')
        continue
      var ref = props[p].ref;
      if (!ref  ||  !resource[p])
        continue
      // if (isMessage  &&  exclude.indexOf(p) !== -1)
      //   continue
      let refModel = this.getModel(ref)
      if (refModel.inlined  ||  utils.isEnum(refModel))
        continue;

      var rValue = utils.getId(resource[p])
      if (!rValue)
        continue
      if (!refProps[rValue])
        refProps[rValue] = []
      refProps[rValue].push(p)
      // if (list[rValue]) {
      //   var elm = {value: this._getItem(rValue), state: 'fulfilled'};
      //   foundRefs.push(elm);
      // }
      // else
      //   results.push(await db.get(rValue))
      let elm = this._getItem(rValue)
      if (!elm  &&  me.isEmployee) {
        elm = await this._getItemFromServer(rValue)
        foundRefs.push({value: elm, state: 'fulfilled'})
        // debugger
      }
      else {
        // HACK for scanned Identity
        if (!elm) {
          if (ref === IDENTITY)
            foundRefs.push({value: resource[p], state: 'fulfilled'})
        }
        else if (!utils.isMessage(elm))
          foundRefs.push({value: elm, state: 'fulfilled'})
        else {
          let kres
          try {
            kres = await this._keeper.get(elm[CUR_HASH])
          } catch (err) {
            if (me.isEmployee)
              kres = await this._getItemFromServer(utils.getId(elm))
            debugger
          }
          let r = _.cloneDeep(kres)
          // results.push(r)
          // if (results.length) {
          //   // let r = results[0]
            _.extend(r, elm)
            foundRefs.push({value: r, state: 'fulfilled'})
          // }
        }
      }
    }
    // Add items properties if they were created
    var json = utils.clone(value) // maybe not the best way to copy, try `clone`?
    for (let p in resource) {
      if (!props[p])
        continue
      if (props[p].type === 'array')
        json[p] = resource[p];
      if (!json[p]  &&  props[p].readOnly)
        json[p] = resource[p];
      let ref = props[p].ref
      // Check if valid enum value
      if (ref  &&  utils.isEnum(ref)) {
        if (!json[p])
          continue
        if ((typeof json[p] === 'string')  ||  !this._getItem(utils.getId(json[p]))) {
          let enumList = this.searchNotMessages({modelName: ref})
          let eprop = utils.getEnumProperty(this.getModel(ref))
          let val = enumList.filter((eVal) => eVal[eprop] === json[p])
          if (val.length) {
            if (resource[p] === json[p])
              resource[p] = this.buildRef(val[0])
            json[p] = this.buildRef(val[0])
          }
        }
      }
    }
    if (isMessage) {
      json.from = json.from || resource.from
      json.to = json.to || resource.to
    }
    // if (!json[TYPE])
    //   json[TYPE] = meta.id;
    var error = this.checkRequired(json, props);
    if (error) {
      foundRefs.forEach((val) => {
        var propValue = utils.getId(val.value)
        var propsToSet = refProps[propValue];
        propsToSet.forEach((p) => json[p] = val.value)
      });

      this.trigger({
        action: 'addItem',
        // list: list,
        resource: json,
        error: error
      });
      return;
    }
    // fix dates and money
    for (let pp in json) {
      if (props[pp]  &&  props[pp].type === 'date')
        json[pp] = new Date(json[pp]).getTime()
      else if (props[pp]  &&  props[pp].ref === MONEY) {
        if (typeof json[pp].value === 'string')
          json[pp].value = parseFloat(json[pp].value)
      }
    }
    // if (!isSelfIntroduction  &&  !doneWithMultiEntry)
    //   resource = utils.optimizeResource(resource, true)
    if (refProps) {
      let allFoundRefs = foundRefs.concat(results);
      allFoundRefs.forEach((val) => {
        if (val.state !== 'fulfilled')
          return
        var value = val.value;
        var propValue = utils.getId(value)
        var propsToSet = refProps[propValue];
        if (propsToSet)
          propsToSet.forEach((p) => json[p] = this.buildRef(value, true))
      })
    }
    // var isMessage = utils.isMessage(meta)
    if (isMessage  &&  !json._documentCreated  &&  (!isRemediation ||  !json._time))
      json._time = new Date().getTime();
    if (isNew  ||  !value._documentCreated) //(meta.id !== FORM_ERROR  &&  meta.id !== FORM_REQUEST  &&  !meta.id === FORM_ERROR))
      resource._time = new Date().getTime();

    var returnVal
    if (!resource  ||  isNew)
      returnVal = json
    else {
      returnVal = {};
      _.extend(returnVal, resource);
      for (let p in json) {
        // Could be metadata property that is why it preceeds the next 'else'
        if (!returnVal[p])
          returnVal[p] = json[p];
        else if (!props[p])
          continue
        else if (!props[p].readOnly  &&  !props[p].immutable)
          returnVal[p] = json[p];
      }
    }
    // case for Remediation WealthCV -> CVItems. Linking items to container
    var readOnlyBacklinks = []
    if (!isRegistration) {
      for (let pr in props) {
        let prop = props[pr]
        if (utils.isContainerProp(prop, meta))
          readOnlyBacklinks.push(prop)
      }
    }
    if (readOnlyBacklinks.length) {
      for (let i=0; i<readOnlyBacklinks.length; i++) {
        let prop = readOnlyBacklinks[i]
        let pm = self.getModel(prop.ref)
        // let isRefMessage = utils.isMessage(pm)
        // if (isRefMessage) {
          let result = await this.searchMessages({modelName: prop.ref, context: context})
          if (result  &&  result.length)
            returnVal[prop.name] = this.buildRef(result[0])
        // }
      }

    }
    let displayableProps = utils.getPropertiesWithAnnotation(meta, 'displayAs')
    if (displayableProps  &&  !utils.isEmpty(displayableProps)) {
      for (let p in displayableProps) {
        let pValue = utils.templateIt(props[p], returnVal)
        if (pValue)
          returnVal[p] = pValue
      }
    }

    // if (!isRegistration) {
    //   // HACK to not to republish identity
    //   if (returnVal[TYPE] !== PROFILE)
    //     returnVal[NONCE] = self.getNonce()
    // }
    if (chat) {
      let chatId = utils.getId(chat)
      returnVal.to = self.buildRef(self.getRepresentative(chatId))
    }

    if (isRegistration)
      await handleRegistration()
    else if (isMessage  &&  !returnVal[NOT_CHAT_ITEM])
      await handleMessage(noTrigger, returnVal, lens)
    else
      await save(returnVal, returnVal[NOT_CHAT_ITEM]) //, isBecomingEmployee)
    if (disableFormRequest) {
      // let fr =  disableFormRequest // this._getItem(disableFormRequest)
      if (!disableFormRequest._documentCreated) {
        let fr = utils.clone(disableFormRequest)
        let addDocumentCreated
        if (fr[TYPE] === FORM_REQUEST) {
          let form = fr.form || disableFormRequest.form
          addDocumentCreated = form === resource[TYPE]
        }
        else if (fr[TYPE] === FORM_ERROR) {
          let prefillForm = fr.prefill || disableFormRequest
          addDocumentCreated = prefillForm.prefill[TYPE] === resource[TYPE]
        }
        if (addDocumentCreated) {
          fr._documentCreated = true
          fr._document = utils.getId(returnVal)//resource) /// NEW
          let key = utils.getId(fr)
          self._setItem(key, fr)
          self.dbPut(key, fr)
          self.trigger({action: 'addItem', resource: fr})
        }
      }
      //   })
      // }
    }
    if (cb) {
      if (returnVal[TYPE] !== SETTINGS)
        cb(returnVal)
      else {
        // return newly created provider
        SERVICE_PROVIDERS.forEach((r) => {
          if (r.id === returnVal.id  &&  utils.urlsEqual(r.url, returnVal.url))
            cb(self._getItem(utils.getId(r.org)))
        })
      }
    }
    // }
    // catch (err) {
    //   debugger
    //   debug('onAddItem', err.stack)
    // }
    function handleRegistration () {
      self.trigger({action: 'runVideo'})
      return Q.all([
        self.loadDB(),
        utils.resetPasswords()
      ])
      .then(() => self.getDriver(returnVal))
      .then(() => {
        if (!resource || isNew) {
          returnVal[ROOT_HASH] = protocol.linkString(meDriver.identity)
        }

        return save(returnVal)
      })
    }

    async function handleMessage (noTrigger, returnVal, lens) {
      // TODO: fix hack
      // hack: we don't know root hash yet, use a fake
      if (returnVal._documentCreated)  {
        // when all the multientry forms are filled out and next form is requested
        // do not show the last form request for the multientry form it is confusing for the user
        if (doneWithMultiEntry) {
          let ptype = returnVal[TYPE] === FORM_REQUEST && returnVal.product
          if (ptype) {
            let multiEntryForms = self.getModel(ptype).multiEntryForms
            if (multiEntryForms  &&  multiEntryForms.indexOf(returnVal.form) !== -1) {
              let rid = returnVal.from.organization.id
              self.deleteMessageFromChat(rid, returnVal)
              let id = utils.getId(returnVal)
              delete list[id]
              db.del(id)
              let params = {action: 'addItem', resource: returnVal}
              self.trigger(params);
              return
            }
          }
        }
        try {
          // return new Promise(resolve => meDriver.objects.get(returnVal[CUR_HASH]))
          let res = await self._keeper.get(returnVal[CUR_HASH])
          let r = utils.clone(res)
          _.extend(r, returnVal)
          self._setItem(utils.getId(returnVal), returnVal)
          let params = {action: 'addItem', resource: r}
          // return self.disableOtherFormRequestsLikeThis(returnVal)
          // .then(() => {
            // don't save until the real resource is created
          // list[utils.getId(returnVal)].value = returnVal
          self.trigger(params);
          await self.onIdle()
          save(returnVal, true)
          return
        } catch(err) {
          debugger
        }
        // })
      }
      // Trigger painting before send. for that set ROOT_HASH to some temporary value like NONCE
      // and reset it after the real root hash will be known
      let isNew = returnVal[ROOT_HASH] == null
      if (isNew) {
        returnVal._outbound = true
        returnVal._latest = true
      }
      else if (!returnVal[SIG])
        debugger
      let rModel = self.getModel(returnVal[TYPE])
      let isContext = utils.isContext(rModel)
      let isForm = rModel.subClassOf === FORM
      returnVal[IS_MESSAGE] = true
      let prevResId, prevResCached
      if (isNew) {
        if (rModel.id === PRODUCT_REQUEST)
          await deactivateFormRequests()
        if (isContext  &&  !returnVal.contextId)
          returnVal.contextId = self.getNonce()
      }
      else {
        let prevRes
        prevResId = utils.getId(returnVal)
        try {
          prevRes = await self._keeper.get(returnVal[CUR_HASH])
        } catch(err) {
          prevRes = await self._getItemFromServer(utils.getId(returnVal))
        }
        prevResCached = self._getItem(prevResId)
        _.extend(prevResCached, prevRes)
        self.rewriteStubs(prevResCached)
        if (utils.compare(returnVal, prevResCached)) {
          self.trigger({action: 'noChanges'})
          return
        }
        if (isForm)
          await deactivateFormRequests()
      }

      let rId = utils.getId(returnVal.to)
      let to = self._getItem(rId)
      // let permalink = to[ROOT_HASH]
      let toChain = {}

      let exclude = ['to', 'from', 'verifications', CUR_HASH, 'idOld', '_message', '_sharedWith', '_sendStatus', '_context', '_online',  '_termsAccepted', '_latest', '_outbound']
      // if (isNew)
      //   exclude.push(ROOT_HASH)
      _.extend(toChain, returnVal)
      for (let p of exclude)
        delete toChain[p]

      let properties = rModel.properties

      self.rewriteStubs(toChain)
      let keepProps = [TYPE, ROOT_HASH, CUR_HASH, PREV_HASH, '_time']
      // if (isNew) {

      for (let p in toChain) {
        let prop = properties[p]

        if (!isNew  &&  !prop  &&  !keepProps.includes(p)) // !== TYPE && p !== ROOT_HASH && p !== PREV_HASH  &&  p !== '_time')
          delete toChain[p]
        if (!prop  ||  prop.partial)
          continue
        let isObject = prop.type === 'object'
        let isArray = prop.type === 'array'

        let ref = prop.ref  ||  isArray  &&  prop.items.ref

        if (!ref)
          continue

        let refM = self.getModel(ref)
        if (!refM  ||  refM.inlined)
          continue

        if (isObject)
          toChain[p] = self.buildSendRef(returnVal[p])
        else
          toChain[p] = returnVal[p].map(v => self.buildSendRef(v))
      }
      // else {
      //   for (let p in toChain) {
      //     let prop = properties[p]
      //     if (!prop  && p !== TYPE && p !== ROOT_HASH && p !== PREV_HASH  &&  p !== '_time')
      //       delete toChain[p]
      //     else if (prop  &&  prop.type === 'object' &&
      //              prop.ref /*&&  !returnVal.id*/   &&
      //              !self.getModel(prop.ref).inlined &&
      //              !prop.inlined                    &&
      //              !prop.partial)
      //       toChain[p] = self.buildSendRef(returnVal[p])
      //   }

      //   const nextVersionScaffold = mcbuilder.scaffoldNextVersion({
      //     _link: returnVal[CUR_HASH],
      //     _permalink: returnVal[ROOT_HASH],
      //     ...returnVal
      //   })

      //   _.extend(toChain, nextVersionScaffold)
      //   _.extend(returnVal, nextVersionScaffold)
      // }
      if (!isNew) {
        if (!returnVal[SIG]) debugger

        const nextVersionScaffold = mcbuilder.scaffoldNextVersion({
          _link: returnVal[CUR_HASH],
          _permalink: returnVal[ROOT_HASH],
          ...returnVal
        })

        _.extend(toChain, nextVersionScaffold)
        _.extend(returnVal, nextVersionScaffold)
      }
      // }

      // toChain._time = returnVal._time

      let key = utils.makeId(IDENTITY, to[ROOT_HASH])

      // let sendParams = self.packMessage(toChain, returnVal.from, returnVal.to, returnVal._context)
      toChain = sanitize(toChain).sanitized
      try {
        validateResource({ resource: toChain, models: self.getModels() })
      } catch (err) {
        if (Errors.matches(err, ValidateResourceErrors.InvalidPropertyValue))
        // if (err.name === 'InvalidPropertyValue')
          self.trigger({action: 'validationError', validationErrors: {[err.property]: translate('invalidPropertyValue')}})
        else
          self.trigger({action: 'validationError', error: err.message})
        return
      }
      try {
        let data = await self.createObject(toChain)
        let hash = data.link
        if (isNew)
          returnVal[ROOT_HASH] = hash
        returnVal[CUR_HASH] = hash

        let returnValKey = utils.getId(returnVal)
        if (isContext)
          contextIdToResourceId[returnVal.contextId] = returnVal

        if (!returnVal._context  &&  utils.isContext(rModel)) {
          let {requestFor, product} = returnVal
          returnVal._context = {id: returnValKey, title: product ? product : requestFor}
        }

        self._setItem(returnValKey, returnVal)
        let org
        let isSavedItem = utils.isSavedItem(returnVal)
        if (isSavedItem) {
          let meId = utils.getMe()
          self.addMessagesToChat(meId, returnVal)
        }
        else {
          let toR = self._getItem(utils.getId(returnVal.to))
          let id = toR.organization ? utils.getId(toR.organization) : utils.getId(toR)
          self.addMessagesToChat(id, returnVal)
          org = toR.organization
          org = self._getItem(utils.getId(org))
        }
        // org = self._getItem(utils.getId(org))

        let params;

        let isBookmark = returnVal[TYPE] === BOOKMARK
        let sendStatus = self.isConnected ? SENDING : QUEUED
        if (returnVal[TYPE] === DATA_CLAIM) {
          // org = self._getItem(utils.getId(org))
          // Actions.showModal({title: 'Connecting to ' + org.name, showIndicator: true})
          params = {action: 'getForms', to: org}
          // params = {action: 'showProfile', importingData: true}
        }
        // Bookmark is not sent
        else if (!isBookmark) {
          returnVal._sendStatus = sendStatus
          // if (isNew)
          self.addVisualProps(returnVal)
          if (!params)
            params = { action: 'addItem', resource: returnVal }
        }

        let m = self.getModel(returnVal[TYPE])
        try {
          if (!noTrigger)
            self.trigger(params);
        } catch (err) {
          debugger
        }

        if (!isSavedItem  &&  !isBookmark) {
          // let sendParams = {link: hash }
          // if (me.isEmployee) {
          //   let rep = self.getRepresentative(utils.getId(me.organization))
          //   let toRootHash = self._getItem(utils.getId(returnVal.to))[ROOT_HASH]

          //   if (rep[ROOT_HASH] !== toRootHash)
          //     sendParams.other = {
          //       forward: toRootHash
          //     }
          //   sendParams.to = { permalink: rep[ROOT_HASH] }
          // }
          // else
          //   sendParams.to = { permalink: permalink }

          // if (returnVal._context) {
          //   sendParams.other = {
          //     context: self._getItem(utils.getId(returnVal._context))[ROOT_HASH]
          //   }
          // }
          let sendParams = self.packMessage(returnVal)
          await self.meDriverSend(sendParams)
        }
        if (isBookmark) {
          let bookmark = returnVal.bookmark
          let bm = self.getModel(bookmark[TYPE])
          let bmProps = bm.properties
          for (let p in bookmark) {
            if (!Array.isArray(bookmark[p]))
              continue
            let prop = bmProps[p]
            if (!prop.ref)
              continue
            bookmark[p] = bookmark[p].map((r) => self.buildRef(r))
          }
          self.onHasBookmarks()
        }
        if (readOnlyBacklinks.length) {
          readOnlyBacklinks.forEach((prop) => {
            let topR = returnVal[prop.name]
            if (topR) {
              topR = self._getItem(topR)
              if (topR) {
                let items = utils.getPropertiesWithAnnotation(self.getModel(topR[TYPE]), 'items')
                for (let pName in items) {
                  if (items[pName].items.ref === returnVal[TYPE]) {
                    if (!topR[pName])
                      topR[pName] = []
                    topR[pName].push(self.buildRef(returnVal))
                  }
                }
              }
            }
          })
        }

        delete returnVal._sharedWith
        delete returnVal.verifications
        await save(returnVal, true, lens)

        if (returnVal[TYPE] === ASSIGN_RM) {
          let app = self._getItem(returnVal.application)
          let appToUpdate
          if (app)
            appToUpdate = utils.clone(app)
          else {
            let appId = utils.getId(returnVal.application)
            if (foundRefs) {
              let l = foundRefs.filter((r) => utils.getId(r.value) === appId)
              if (l.length)
                app = l[0].value
            }
            if (!app)
              app = await self._getItemFromServer(returnVal.application)
            if (!app)
              appToUpdate = utils.clone(returnVal.applications)
            else {
              appToUpdate = app
              self._setItem(utils.getId(app), app)
            }
          }
          if (!appToUpdate._context)
            appToUpdate._context = returnVal._context

          if (!appToUpdate.relationshipManagers)
            appToUpdate.relationshipManagers = []
          appToUpdate.relationshipManagers.push(self._makeIdentityStub(me))
          self.trigger({action: 'updateRow', resource: appToUpdate })
          self.trigger({action: 'getItem', resource: appToUpdate})
        //   self.dbPut(utils.getId(app), app)
        }
        let rId = utils.getId(returnVal.to)
        let to = self._getItem(rId)

        if (!isNew) {
          let prevRes = self._getItem(prevResId)
          prevRes._latest = false
          prevResCached._latest = false

          let org = to.organization ? self._getItem(to.organization) : to
          // Draft project
          // self.trigger({action: 'getItem', resource: returnVal, to: org})
          self.trigger({action: 'updateItem', resource: prevResCached, to: org})
          self.dbPut(prevResId, prevResCached)
        }

        if (!isNew  ||  self.getModel(returnVal[TYPE]).subClassOf !== FORM)
          return
        let allFormRequests = await self.searchMessages({modelName: FORM_REQUEST, to: to})
        let formRequests = allFormRequests  &&  allFormRequests.filter((r) => {
          if (r.document === returnVal[NONCE])
            return true
        })
        if (formRequests  &&  formRequests.length) {
          let req = formRequests[0]
          req.document = utils.getId(returnVal)
          // returnVal = req
          return await save(req, true)
        }
      } catch (err) {
        debug('Store._putResourceInDB:', err.stack)
      }

    }
    async function deactivateFormRequests() {
      let org = returnVal.to.organization
      let orgId = utils.getId(org ? org : returnVal.to)

      let allFormRequests = await self.searchMessages({modelName: FORM_REQUEST, to: self._getItem(orgId)})
      if (!allFormRequests)
        return
      // Check the current form request as fulfilled since there is going
      // to be a fresh one after updating the resource
      allFormRequests.forEach((r) => {
        if (!r._documentCreated) {
          r._documentCreated = true
          self._getItem(r)._documentCreated = true
          self.addVisualProps(r)
          self.dbPut(utils.getId(r), r)
          self.trigger({action: 'updateItem', resource: r})
          // self.trigger({action: 'addItem', resource: r})
        }
      })
    }
    async function save(returnVal, noTrigger, lens) {
      let r = {
        modelName: returnVal[TYPE],
        resource: returnVal,
        dhtKey: returnVal[ROOT_HASH],
        isRegistration: isRegistration,
        noTrigger: noTrigger,
        lens: lens,
        prop: params.prop
      }
      if (params.maxAttempts)
        r.maxAttempts = params.maxAttempts
      return await self._putResourceInDB(r)
    }
  },
  _makeIdentityStub(r) {
    return {
      id: utils.getId(r).replace(PROFILE, IDENTITY),
      // title: utils.getDisplayName(r)
    }
  },
  async insurePublishingIdentity(org) {
    if (!me)
      return
    let orgId = utils.getId(org)
    if (!this.isConnected  ||  publishRequestSent[orgId])
      return
    let meDriver = await this.getDriver(me)
    let status = await meDriver.identityPublishStatus()
    if (status/* || !self.isConnected*/) {
      publishRequestSent[orgId] = true
      if (!status.watches.link  &&  !status.link) {
        let orgRep = this.getRepresentative(orgId)
        await this.publishMyIdentity(orgRep)
      }
    }
  },
  async onApplyForProduct({ host, provider, product, contextId }) {
    let newProvider = await this.onAddApp({ url: host, permalink: provider, noTrigger: true, addSettings: true })
    if (!newProvider)
      return
    let org = this._getItem(newProvider.org)
    let resource = {
      [TYPE]: PRODUCT_REQUEST,
      requestFor: product,
      from: me,
      to: this.getRepresentative(org),
      contextId
    }
    if (me)
      await this.insurePublishingIdentity(org)
    await this.onAddChatItem({resource, noTrigger: true,  })
    this.trigger({ action: 'applyForProduct', provider: org })
  },
  async onGetIdentity({prop, permalink, link, firstName, lastName }) {
    let identityId = utils.makeId(IDENTITY, permalink, link)
    let profile = {
      [TYPE]: PROFILE,
      [ROOT_HASH]: permalink,
      [CUR_HASH]: link,
      firstName
    }
    await db.put(utils.getId(profile), profile)
    this.trigger({action: 'formEdit', prop, value: {id: identityId, title: firstName}})
  },
  async onGetProductList({resource}) {
    if (resource[TYPE] !== ORGANIZATION) {
      let org = resource.organization
      if (!org)
        return
      resource = this._getItem(org)
    }
    let orgId = utils.getId(resource)
    let messages = chatMessages[utils.getId(resource)]
    if (!messages)
      return
    let rIdx = _.findLastIndex(messages, (r) => {
      if (utils.getType(r) === FORM_REQUEST) {
        if (this._getItem(r).form === PRODUCT_REQUEST)
          return true
      }
      return false
    })
    if (rIdx === -1)
      return
    let pl = this._getItem(messages[rIdx])
    try {
      let kr = await this._keeper.get(pl[CUR_HASH])
      let productListR = utils.clone(kr)
      _.extend(productListR, pl)
      this.trigger({action: 'productList', resource: productListR, to: resource})
    } catch (err) {
      debug('Store.onGetProductList: ' + err.stack)
      return
    }

  },
  async onAddApp({ url, permalink, noTrigger, addSettings }) {
    try {
      await this.getInfo({serverUrls: [url], retry: false}) //, hash: permalink })
    } catch (err) {
      if (!noTrigger)
        this.trigger({
          action: 'addApp',
          error: `Server at ${url} is unavailable: ` + err.message
        })

      return
    }

    const newProvider = tradleUtils.find(SERVICE_PROVIDERS, r => {
      if (permalink) {
        return r.permalink === permalink
      }

      return utils.urlsEqual(r.url, url)
    })

    if (!newProvider) {
      return this.trigger({
        action: 'addApp',
        error: `no provider found at url: ${url}`
      })
    }

    // !!!! Review why we need addToSettings
    if (addSettings)
      this.addSettings(newProvider)
    else
      this.addToSettings(newProvider)
    if (!noTrigger)
      this.trigger({ action: 'addApp' })
    return newProvider
  },

  onGetMe() {
    this.trigger({action: 'getMe', me: me})
  },
  async onCleanup() {
    // var me  = utils.getMe()
    if (!me)
      return
    // Delete all resources but the last one. Every time custome enters the chat RM will receive
    // CustomerWaiting and the customer will receive ProductList message. So there is no point to keep them
    let result = await this.searchMessages({to: me, modelName: CUSTOMER_WAITING, isForgetting: true})
    if (!result)
      return
    if (result.length)
      delete result[result.length - 1]
    await this.cleanup(result)
    // result = await this.searchMessages({to: me, modelName: PRODUCT_LIST, isForgetting: true});
    // if (result  &&  result.length) {
    //   delete result[result.length - 1]
    //   return this.cleanup(result)
    // }
  },
  async onShareMany(resources, shareWithList, originatingResource) {
    if (me.isEmployee)
      await this.shareAll(resources, shareWithList, originatingResource)
    else {
      for (let r in resources)
        await this.onShare(resources[r], shareWithList, originatingResource)
    }
  },

  async shareAll(resources, to, formResource) {
    var documentCreated = formResource._documentCreated
    var key = utils.getId(formResource)
    var r = this._getItem(key)
    // disable FormRequest from being used again
    r._documentCreated = true

    let kr = await this._keeper.get(r[CUR_HASH])
    let resource = utils.clone(r)
    _.extend(resource, kr)

    this.addVisualProps(resource)
    this.trigger({action: 'addItem', context: formResource.context, resource: resource})
    if (documentCreated)
      return

    // Get representative
    to = this._getItem(to)
    var toOrgId
    if (to[TYPE] === ORGANIZATION) {
      toOrgId = utils.getId(to)
      to = this.getRepresentative(toOrgId)
      // let oid = utils.makeId(ORGANIZATION, to[ROOT_HASH])
      // to = this.getRepresentative(oid)
    }
    else
      toOrgId = utils.getId(to.organization)
    if (!to)
      return

    var ikey = utils.makeId(IDENTITY, to[ROOT_HASH])
    var opts = {
      to: {fingerprint: this.getFingerprint(this._getItem(ikey))},
      // share seal if it exists
      seal: true
    }
    if (formResource  &&  formResource._context) {
      let context = utils.getId(formResource._context)
      opts.other = { context: this._getItem(context).contextId }
    }
      // opts.other = {context: utils.getId(formResource._context).split('_')[1]}

    let batch = []
    // Get the whole resources
    let documents = resources.map((d) => {
      let document = utils.isStub(d) &&  this._getItem(utils.getId(d)) || d
      if (!document._context)
        document._context = formResource._context
      return document
    })
    let shareBatchId = new Date().getTime()
    // debugger
    let doShareDocuments = (typeof formResource.requireRawData === 'undefined')  ||  formResource.requireRawData
    if (doShareDocuments) {
      let errorMsg = await this.shareForms({documents, to, formRequest: formResource, batch, shareBatchId})
      if (errorMsg) {
        this.trigger({action: 'addItem', errorMsg: 'Sharing failed: ' + errorMsg, resource: document, to: this._getItem(toOrgId)})
        return
      }
    }
    if (r[TYPE] === FORM_REQUEST)
      r._document = utils.getId(documents[0])

    this.dbBatchPut(key, r, batch)
    // utils.optimizeResource(document)
    let docStubs = []
    if (doShareDocuments) {
      documents.forEach((document) => {
        this.addLastMessage(document, batch, to)
        let documentId = utils.getId(document)
        this.dbBatchPut(documentId, document, batch)
        document._sendStatus = SENT
        this._setItem(documentId, document)
        this.trigger({action: 'addItem', sendStatus: SENT, resource: document, to: this._getItem(toOrgId)})
        docStubs.push(this.buildRef(document, true))
      })
      // this.trigger({action: 'updateItem', sendStatus: SENT, resource: document, to: this._getItem(toOrgId)})
    }
    // let m = this.getModel(VERIFICATION)
    let docModel = this.getModel(documents[0][TYPE])
    var params = {
      modelName: VERIFICATION,
      to: documents[0],
      noTrigger: true,
      // meta: m,
      prop: docModel.properties['verifications'],
      // props: m.properties
    }

    let verifications
    if (me.isEmployee) {
      params.search = me.isEmployee,
      params.filterResource = {document: docStubs}
      verifications  = await this.searchServer(params)
      verifications = verifications  &&  verifications.list
    }
    else
      verifications  = await this.searchMessages(params)
    if (!verifications) {
      if (batch.length)
        await db.batch(batch)
      return
    }
    await this.shareVerifications({verifications, to, formRequest: formResource, batch, shareBatchId})
    if (!doShareDocuments)
      this.addLastMessage(verifications[verifications.length - 1], batch, to)

    await db.batch(batch)
  },

  async onShare(resource, shareWithList, originatingResource) {
    const self = this
    if (utils.isContext(resource[TYPE])) {
      let listOfProviders = []
      let list = shareWithList.map((id) => {
        let rep = this.getRepresentative(id)
        listOfProviders.push(rep.organization.title)
        return this.buildRef(rep)
      })
      listOfProviders = listOfProviders.join(', ')

      let msg = {
        [TYPE]: 'tradle.ShareContext',
        context: this.buildRef(resource),
        with: list
      }

      let permalink
      if (me.isEmployee)
        permalink = this.getRepresentative(me.organization)[ROOT_HASH]
      else
        permalink = originatingResource[TYPE] === ORGANIZATION
                  ?  this.getRepresentative(originatingResource)[ROOT_HASH]
                  :  originatingResource[ROOT_HASH]

      return this.createObject(msg)
      .then((data) => {
        let shareContext = utils.clone(msg)
        shareContext.from = this.buildRef(me)
        let time = new Date().getTime()
        shareContext._time = time
        shareContext._context = shareContext.context
        shareContext.to = utils.clone(resource.from)
        shareContext.message = translate('sharedWith', translate(this.getModel(resource.product)), listOfProviders)
        let hash = data.link
        shareContext[ROOT_HASH] = shareContext[CUR_HASH] = hash
        let key = utils.getId(shareContext)
        this.dbPut(key, shareContext)
        this._setItem(key, shareContext)
        this.addMessagesToChat(shareContext.to.id, shareContext, false, time)
        this.trigger({action: 'addMessage', resource: shareContext})
        let sendParams = {
          to: {permalink: permalink},
          link: hash,
          other: {
            context: resource.contextId //resource[ROOT_HASH]
          }      // let sendParams = {
        }
        return this.meDriverSend(sendParams)
      })
      .catch((err) => {
        debugger
      })
    }
    let document = resource.document
    if (document  &&  document[TYPE] === LEGAL_ENTITY) {
      let links = { [document[ROOT_HASH]]: document }
      await this.getAllLinkedResources(document, links)
      if (links) {
        await this.shareAll(Object.values(links), shareWithList, originatingResource)
        return
      }
    }

    await this.shareAll([resource.document || resource], shareWithList, originatingResource)
  },

  async getAllLinkedResources(resource, links) {
    let model = utils.getModel(resource[TYPE])

    if (utils.isImplementing(model, INTERSECTION)) {
      let refs = utils.getPropertiesWithAnnotation(model, 'ref')
      for (let p in refs) {
        if (utils.isEnum(refs[p].ref))
          continue
        let value = resource[p]
        if (!value)
          continue

        if (!links[this.getRootHash(value)]) {
          if (!value[TYPE])
            value = await this.onGetItem({resource: value, noTrigger: true})
          links[this.getRootHash(value)] = value
          let vType = utils.getType(value)
          if (vType === LEGAL_ENTITY)
            await this.getAllLinkedResources(value, links)
        }
      }
      return
    }

    let backlinks = utils.getPropertiesWithAnnotation(model, 'items')

    if (utils.isEmpty(backlinks))
      return
    let backlinksList = {}
    for (let p in backlinks) {
      if (backlinks[p].items.backlink)
        backlinksList[p] = backlinks[p]
    }
    if (utils.isEmpty(backlinksList))
      return

    let rWithBl = await this.onGetItem({resource, backlinks: backlinksList, noTrigger: true})

    for (let p in backlinksList) {
      let rl = rWithBl[p]
      if (!rl  ||  !rl.length)
        continue
      for (let i=0; i<rl.length; i++) {
        let r = rl[i]
        if (links[r[ROOT_HASH]])
          continue
        links[r[ROOT_HASH]] = r
        await this.getAllLinkedResources(r, links)
      }
    }
  },

  async shareResources(resources, to, formRequest, shareBatchId) {
    let hashes = resources.map((d) => d[CUR_HASH] || this._getItem(d)[CUR_HASH])
    let sr = {
      [TYPE]: SHARE_REQUEST,
      links: hashes,
      with:  [{
        id: utils.makeId(IDENTITY, to[ROOT_HASH], to[CUR_HASH]),
      }]
    }
    let msg = this.packMessage(sr, me, to)
    if (!msg.other)
      msg.other = {}
    msg.other.context = formRequest._context.contextId
    msg.seal =  true
    await this.meDriverSignAndSend(msg)
  },
  async shareVerifications({verifications, to, formRequest, batch, shareBatchId}) {
    var time = new Date().getTime()
    try {
      if (me.isEmployee) {
        await this.shareResources(verifications, to, formRequest, shareBatchId)
        verifications.forEach(resource => this.handleSharedVerification({resource, to, time, formRequest, batch, shareBatchId}))
      }
      else
        await Promise.all(verifications.map(resource => this.shareVerification({resource, to, formRequest, batch, shareBatchId})))
    }
    catch(err) {
      console.log(err)
      debugger
    }
  },
  async shareForms({documents, to, formRequest, batch, shareBatchId}) {
    var time = new Date().getTime()
    try {
      if (me.isEmployee) {
        await this.shareResources(documents, to, formRequest, shareBatchId)
        documents.forEach(resource => this.handleSharedDoc({resource, to, batch, formRequest, shareBatchId}))
      }
      else
        await Promise.all(documents.map(resource => this.shareForm({resource, to, formRequest, batch, shareBatchId})))
    }
    catch(err) {
      console.log(err)
      debugger
    }
  },
  handleSharedDoc({resource, to, batch, formRequest, shareBatchId}) {
    if (!resource._sharedWith) {
      resource._sharedWith = []
      if (!utils.isMyProduct(resource)  &&  !utils.isSavedItem(resource))
        this.addSharedWith(resource, resource.to, resource._time, shareBatchId)
    }
    let time = new Date().getTime()
    this.addSharedWith(resource, to, time, shareBatchId, formRequest.lens)
    let orgId = utils.getId(to.organization)
    this.addMessagesToChat(orgId, resource, false, time)

    if (utils.isSavedItem(resource)) {
      resource._creationTime = resource._time
      resource._sentTime = new Date().getTime()
      let docId = utils.getId(resource)
      resource.to = to
      this._setItem(docId, resource, batch)
      this.dbBatchPut(docId, resource)
    }
  },

  handleSharedVerification({resource, to, formRequest, shareBatchId, batch}) {
    if (!resource._sharedWith) {
      resource._sharedWith = []
      this.addSharedWith(resource, resource.from, resource._time, shareBatchId)
    }
    let time = new Date().getTime()
    this.addSharedWith(resource, to, time, shareBatchId, formRequest.lens)
    resource._sendStatus = this.isConnected ? SENDING : QUEUED
    let orgId = utils.getId(to.organization)
    this.addMessagesToChat(orgId, resource, false, time)

    this.addVisualProps(resource)
    let toOrg = this._getItem(orgId)
    resource._sentTime = new Date().getTime()
    resource._sendStatus = SENT
    let vId = utils.getId(resource)
    if (!resource._context)
      resource._context = formRequest._context
    this._setItem(vId, resource)
    this.dbBatchPut(vId, resource, batch)
    this.trigger({action: 'addItem', context: resource.context, resource: resource, to: toOrg})
  },
  async shareResource({resource, to, formRequest, shareBatchId}) {
    var time = new Date().getTime()
    let hash = resource[CUR_HASH] || this._getItem(resource)[CUR_HASH]
    try {
      let opts = {
        other: {
          context:  formRequest._context.contextId,
        },
        to: { permalink: to[ROOT_HASH] },
        seal: true,
        link: hash
      }
      await this.meDriverSend(opts)
    }
    catch(err) {
      console.log(err)
      return
    }
  },
  async shareForm({resource, to, formRequest, batch, shareBatchId}) {
    await this.shareResource({resource, to, formRequest, shareBatchId})
    this.handleSharedDoc({resource, to, formRequest, batch, shareBatchId})
  },
  async shareVerification({resource, to, formRequest, batch, shareBatchId}) {
    await this.shareResource({resource, to, formRequest, shareBatchId})
    this.handleSharedVerification({resource, to, formRequest, batch, shareBatchId})
    // if (ver) {
    //   ver._sentTime = new Date().getTime()
    //   this.trigger({action: 'updateItem', sendStatus: SENT, resource: ver, to: toOrg})
    //   ver._sendStatus = SENT
    // }
  },
  createSharedWith(toId, time, shareBatchId, lens) {
    let stub = {
      bankRepresentative: toId,
      timeShared: time,
      shareBatchId: shareBatchId
    }
    if (lens)
      stub.lens = lens
    return stub
  },
  checkRequired(resource, meta) {
    var type = resource[TYPE];
    var rootHash = resource[ROOT_HASH];
    var oldResource = (rootHash) ? list[utils.makeId(type, rootHash)] : null;
    var required = meta.required;
    if (!required)
      return;
    for (var i=0; i<required.length; i++) {
      var prop = required[i];
      if (!resource[prop] && (!oldResource || !oldResource[prop]))
        return 'Please add "' + meta.properties[prop].title + '"';
    }
  },
  onReloadModels() {
    this.loadModels()
  },
  async onRequestWipe(opts={}) {
    if (opts.confirmed) {
      Actions.reloadDB()
      return
    }

    const ok = await new Promise(resolve => {
      Alert.alert(translate('areYouSureAboutWipe'), '', [
        {
          text: 'Cancel',
          onPress: () => resolve(false)
        },
        {
          text: 'OK',
          onPress: () => resolve(true)
        }
      ])
    })

    if (!ok) return

    try {
      await this.forceReauth()
    } catch (err) {
      debug('refusing to wipe', err)
      return
    }

    Actions.reloadDB({ silent: true })
  },
  async forceReauth() {
    this.onSetAuthenticated(false)
    await LocalAuth.signIn()
  },
  async onGetModels(providerId) {
    let provider = this._getItem(providerId)
    let modelPacks = await this.searchMessages({modelName: MODELS_PACK})
    if (!modelPacks) {
      let retModels = []
      for (let m in models)
        retModels.push(models[m].value)
      this.trigger({action: 'models', list: retModels})
      return
    }
    let otherProviderModels = []
    let requestedModelsPack = modelPacks.filter((mp) => {
      let org = this._getItem(utils.getId(mp.from)).organization
      if (utils.getId(org) === providerId)
        return true
      mp.models.forEach((m) => {
        otherProviderModels.push(m.id)
      })
    })
    let requestedModels = requestedModelsPack.length && requestedModelsPack[0].models.slice(0) || []
    let retModels = []
    for (let m in models) {
      if (otherProviderModels.indexOf(m) === -1)
        retModels.push(models[m].value)
    }
    requestedModels.forEach((m) => {
      if (!retModels.some((mm) => mm.id === m.id))
        retModels.push(m)
    })
    retModels.sort((a, b) => {
      let aTitle
      if (a.title)
        aTitle = a.title
      else {
        let arr = a.id.split('.')
        aTitle = utils.makeLabel(arr[arr.length - 1])
      }
      let bTitle
      if (b.title)
        bTitle = b.title
      else {
        let arr = b.id.split('.')
        bTitle = utils.makeLabel(arr[arr.length - 1])
      }
      return aTitle > bTitle ? -1 : 1
    })
    this.trigger({action: 'models', list: retModels})
  },

  wipe(opts) {
    return Q.all([
      AsyncStorage.clear(),
      utils.resetPasswords()
    ])
    .then(() => AsyncStorage.getAllKeys())
    .then(keys => {
      if (__DEV__) {
        return new Promise(resolve => {
          Alert.alert(
            'AsyncStorage has ' + keys.length + ' keys',
            'Press OK to restart',
            [{ text: translate('ok'), onPress: resolve }]
          )
        })
      }
    })
    .then(() => utils.restartApp())
    .then(() => {
      return new Promise(resolve => {
        // hang, just in case, to prevent any further processing from running
      })
    })
  },
  async onReloadDB(opts) {
    var self = this

    const destroyTim = meDriver ? meDriver.destroy() : Promise.resolve()
    await Promise.race([
      destroyTim,
      Promise.delay(5000)
    ])

    await this.wipe(opts)
  },
  async autoRegister(noMeYet) {
    Analytics.sendEvent({
      category: 'registration',
      action: 'sign_up',
      label: 'auto-reg'
    })

    let me
    if (!noMeYet) {
      try {
        me = await this.getMe()
      } catch(err) {
        debug('Store.autoRegister', err.stack)
      }
    }
    if (me)
      return

    let r = { [TYPE]: PROFILE, firstName: FRIEND }
    let coverPhoto = getCoverPhotoForRegion()
    if (coverPhoto) {
      r.coverPhoto = coverPhoto
      // let res = await fetch(coverPhoto.url)
      // let blob = await res.blob()
      // var objectURL = URL.createObjectURL(blob);
      // let src = objectURL;
      // r.coverPhoto = {
      //   url: src,
      //   width: coverPhoto.width,
      //   height: coverPhoto.height
      // }
    }
    await this.onAddItem({resource: r, isRegistration: true})
  },
  async onGetProvider(params) {
    await this.ready
    await this._loadedResourcesDefer.promise
    // backwards compat
    let permalink = params.permalink || params.provider
    let serverUrl = params.url || params.host
    let providerBot = permalink && this._getItem(utils.makeId(PROFILE, permalink))
    if (!providerBot  &&  serverUrl) {
      await this.onAddItem({
        resource: {[TYPE]: SETTINGS, url: serverUrl},
        maxAttempts: 5
      })
      providerBot = this._getItem(utils.makeId(PROFILE, permalink))
    }
    if (providerBot) {
      let provider = this._getItem(utils.getId(providerBot.organization))
      await this.insurePublishingIdentity(provider)
      this.trigger({action: 'getProvider', provider: provider, termsAccepted: params.termsAccepted})
    }
  },
  getProviderById(providerId) {
    // if (!SERVICE_PROVIDERS)
    //   return
    let provider
    SERVICE_PROVIDERS.forEach((sp) => {
      if (sp.id === providerId)
        provider = this._getItem(sp.org)
    })
    return provider
  },
  onMessageList(params) {
    this.onList(params);
  },
  async onList(params) {
    if (isLoaded) {
      await this.getList(params)
      return
    }
    this.loadDB()
    isLoaded = true;
    if (params.modelName)
      await this.getList(params);
  },

  async getList(params) {
    let {modelName, first, prop, isAggregation, isChat} = params
    var meta = this.getModel(modelName)
    let isMessage = modelName === MESSAGE || isChat || utils.isItem(meta) // utils.isMessage(meta)
    // HACK for now
    if (!isMessage)
      isMessage = meta.subClassOf === FORM  ||  modelName === VERIFICATION
    // if (params.prop)
    //   debugger
    if (params.search &&  me  &&  me.isEmployee  &&  meta.id !== PROFILE  &&  meta.id !== ORGANIZATION  &&  !utils.isEnum(meta)) {
      try {
        return await this.searchServer(params)
      } catch (error) {
        Alert.alert(error.message)
        return
      }
    }

    if (!isMessage) {
      let {isTest, spinner, sponsorName, list, search} = params
      let result = await this._searchNotMessages(params)
      let isOrg = modelName === ORGANIZATION
      if (!result) {
        // First time. No connection no providers yet loaded
        if (!this.isConnected  &&  isOrg)
          this.trigger({action: 'list', alert: translate('noConnection'), first: first, modelName: modelName})
        return
      }
      // if (!SERVICE_PROVIDERS)
      //   this.trigger({action: 'onlineStatus', onlineStatus: false})

      if (isOrg) {
        let r1 = result.filter((r) => r.priority)
        if (r1) {
          let r2 = result.filter((r) => !r.priority)
          result = r1.concat(r2)
        }
      }
      else if (modelName === PROFILE  &&  !search) {
        result = result.filter((r) => !r._inactive)
      }

      if (isAggregation)
        result = this.getDependencies(result);
      if (sponsorName) {
        result = result.filter((r) => r.name === sponsorName)
      }
      let retParams = list
                    ? { action: 'filteredList', list: result}
                    : { action: sponsorName ? 'sponsorsList' : 'list',
                        list: result,
                        isTest: isTest,
                        modelName: modelName,
                        spinner: spinner,
                        isAggregation: isAggregation
                      }
      if (prop)
        retParams.prop = prop;
      retParams.first = first
      this.trigger(retParams);
      return
    }
    if (!this.readAllOnce) {
      this.readAllOnce = true
    }
    let {to, context, loadEarlierMessages, allLoaded, spinner, switchToContext,
         isForgetting, limit, listView, _readOnly, gatherForms, lastId, endCursor} = params
    let shareableResources, result, retParams, resourceCount

    if (me.isEmployee  &&  meta.id === MESSAGE  &&  context) {
      let myBot = this.getRepresentative(me.organization)
      result = await this.searchServer({
        noTrigger: switchToContext ? false : true,
        modelName,
        endCursor,
        context: context,
        limit: limit,
        to: to,
        lastId: lastId,
        direction: loadEarlierMessages ? 'up' : 'down'
      })
      endCursor =  result.endCursor
      resourceCount = result.resourceCount
      result = result.list
      // return result
    }
    else
      result = await this._searchMessages(params)

    if (!result) {
      if (loadEarlierMessages)
        this.trigger(    {
            action: !listView  &&  !prop && !_readOnly ? 'messageList' : 'list',
            loadEarlierMessages: true,
            to,
            first,
            modelName,
            endCursor,
            isAggregation
          })
      else {
        retParams = {
          action: !listView  &&  !prop && !_readOnly && modelName !== BOOKMARK ? 'messageList' : 'list',
          list: result,
          modelName,
          isChat,
          to,
          isAggregation
        }
        this.trigger(retParams)
      }
      return
    }
    if (isAggregation)
      result = this.getDependencies(result);

    if ((ENV.hideVerificationsInChat  ||  ENV.hideProductApplicationInChat)  &&
        modelName === MESSAGE      &&
        to                         &&
        to[TYPE] === ORGANIZATION  &&
        !isForgetting) {
      for (let i=result.length - 1; i>=0; i--)
        if (result[i][TYPE] === VERIFICATION) {
          if (ENV.hideVerificationsInChat)
            result.splice(i, 1)
        }
        else if (utils.isContext(result[i])) {
          if (ENV.hideProductApplicationInChat)
            result.splice(i, 1)
        }
    }
    retParams = {
      action: !listView  &&  !prop && !_readOnly && modelName !== BOOKMARK ? 'messageList' : 'list',
      list: result,
      spinner: spinner,
      modelName,
      isChat,
      to,
      isAggregation,
      endCursor
    }
    // Paint splash screen before opening chat only on app start
    // if (params.checkForSplash  &&  to) {
    //   let toOrgId = utils.getId(to)
    //   if (this._noSplash.indexOf(toOrgId) === -1) {
    //     this._noSplash.push(toOrgId)
    //     let newTo = utils.clone(to)
    //     newTo._noSplash = true
    //     this._setItem(toOrgId, newTo)
    //     // this.trigger({action: 'list', list: this.searchMessages({modelName: ORGANIZATION}), forceUpdate: true})
    //   }
    // }

    let hasMore = limit  &&  result.length > limit
    if (loadEarlierMessages || hasMore) {
      if (hasMore)
        result.splice(0, 1)
      retParams.loadEarlierMessages = true
    }
    if (resourceCount)
      retParams.resourceCount = resourceCount
    if (params.addedItem)
      retParams.addedItem = true
    // if (params.modelName === FORM)
    //   retParams.requestedModelName = FORM
    // retParams.requestedModelName = modelName
    if (!isAggregation  &&  to  &&  !prop) {
      // if (to[TYPE] !== PROFILE  ||  !me.isEmployee) {
      //   // // let to = list[utils.getId(to)].value
      //   // // if (to  &&  to[TYPE] === ORGANIZATION)
      //   // // entering the chat should clear customer's unread indicator
      //   shareableResources = await this.getShareableResources({foundResources: result, to, context})
      // }
      let toId = utils.getId(to)
      if (me.isEmployee  && to[TYPE] === PROFILE) {
        // debugger
        let to = this._getItem(toId)
        if (!to.bot) {
          to._unread = 0
          this.dbPut(toId, to)
          .then(() => {
            this.trigger({action: 'updateRow', resource: to})
          })
        }
      }
      let orgId

      if (to[TYPE] === PRODUCT_REQUEST  &&  utils.isReadOnlyChat(to)) {
        if (!context)
          context = to
        // Filter out the resource submitted by employee in the shared context chat.
        // Otherwise there are duplicates messages submitted by employee and its bot
        let cId = utils.getId(context)
        let meId = utils.makeId(IDENTITY, me[ROOT_HASH])
        let meProfileId = utils.getId(utils.getMe())

        let assignedRM = await this.searchMessages({modelName: ASSIGN_RM})
        let rm = assignedRM && assignedRM.filter((r) => utils.getId(r.application) === cId  &&  meId === utils.getId(r.employee))
        if (rm && rm.length) {
          result = result.filter((r) => !rm[utils.getId(r)])
          result = result.filter((r) => !(r[TYPE] === FORM_ERROR && utils.getId(r.from) !== meProfileId))
        }
        result.forEach(r => this.addVisualProps(r))
        retParams.list = result
      }
      else {
        if (to.organization)
          orgId = utils.getId(to.organization)
        else if (to[TYPE] === ORGANIZATION)
          orgId = utils.getId(to)

        if (orgId) {
          let rep = this.getRepresentative(orgId)
          if (rep  &&  !rep.bot)
            retParams.isEmployee = true

          // Filter forms verified by a different provider and leave only verifications
          if (modelName === MESSAGE) {
            result.forEach(r => this.addVisualProps(r))
            let rmIdx = []
            if (!me.isEmployee) {
              let lastFrForPr
              for (let i=result.length - 1; i>=0; i--) {
                let r = result[i]
                if (r[TYPE] === FORM_REQUEST  &&  r.form === PRODUCT_REQUEST) {
                  if (lastFrForPr)
                    result.splice(i, 1)
                  else
                    lastFrForPr = i
                }
              }
            }
            let sharedVerifiedForms = []
            for (let i=0; i<result.length; i++) {
              let r = result[i]
              let m = this.getModel(r[TYPE])
              // So not show remediation PA in chat
              if (m.id === PRODUCT_REQUEST  &&  r.requestFor === REMEDIATION) {
                rmIdx.push(i)
                continue
              }
              // Product created in Remediation show only from profile view
              if (m.subClassOf === MY_PRODUCT  &&  r._context) {
                if (this._getItem(utils.getId(r._context)).requestFor === REMEDIATION) {
                  rmIdx.push(i)
                  continue
                }
              }
              if (m.subClassOf !== FORM  ||  m.id === DATA_BUNDLE)
                continue
              // Case when event to display ML is before the new resource was sent
              let formCreatorId = r.to.organization
                                ? utils.getId(r.to.organization)
                                : utils.getId(this._getItem(utils.getId(r.to)).organization)
              if (formCreatorId === orgId)
                continue
              // let fId = utils.getId(r)
              // let thisProviderVerifications = {}
              // for (let ii = i+1; ii<result.length  &&  !to._canShareContext; ii++) {
              //   let v = result[ii]
              //   if (v[TYPE] !== VERIFICATION)
              //     continue
              //   if (utils.getId(v.document) === fId) {
              //     // debugger
              //     let vFromId = utils.getId(v.from.organization)
              //     // If this is this provider's verification then the form was shared
              //     //  without verification and the stub needs to be shown
              //     if (vFromId === orgId) {
              //       thisProviderVerifications[fId] = true
              //       let idx = sharedVerifiedForms.indexOf(i)
              //       if (idx !== -1)
              //         sharedVerifiedForms.splice(idx, 1)
              //       break
              //     }
              //     else if (thisProviderVerifications[fId])
              //       break
              //     if (sharedVerifiedForms.indexOf(i) === -1)
              //       sharedVerifiedForms.push(i)
              //   }
              // }
            }
            if (rmIdx.length) {
              for (let i=rmIdx.length - 1; i>=0; i--)
                result.splice(rmIdx[i], 1)
            }
            if (sharedVerifiedForms.length) {
              for (let i = sharedVerifiedForms.length - 1; i>=0; i--)
                result.splice(sharedVerifiedForms[i], 1)
            }
            // Commented out because of too much blinking wehn re-rendering the list
            // Pin last unfulfilled Form Request from current context
            // let ii, rContext
            // if (result.length) {
            //   for (ii = result.length - 1; ii>=0; ii--) {
            //     if (result[ii]._context) {
            //       rContext = result[ii]._context
            //       break
            //     }
            //   }
            // }
            // if (rContext) {
            //   for (; ii>=0; ii--) {
            //     let r = result[ii]
            //     if (r[TYPE] === FORM_REQUEST) {
            //       if  (!r._documentCreated  &&  utils.getId(r._context) === utils.getId(rContext)) {
            //         result.splice(ii, 1)
            //         result.push(r)
            //       }
            //       break
            //     }
            //   }
            // }
          }
        }
      }

      if (!context  &&  modelName !== PRODUCT_REQUEST) {
        for (let i=result.length - 1; i>=0  &&  !context; i--) {
          let res = result[i]
          let contextIdToContext = {}
          if (/*res[TYPE] === FORM_REQUEST  &&  */ res._context) {
            context = res._context
            if (!context.contextId) {
              let c = this._getItem(context)
              if (!c) {
                let cId = utils.getId(context)
                let c = contextIdToContext[cId]
                if (!c)
                  c = await this._getItemFromServer(context)
                contextIdToContext[cId] = c
              }
              context = c
            }

          }
        }
        // context = await this.getCurrentContext(to, orgId)
      }
    }
    retParams.first = first
    if (context) {
      retParams.context = context
      if (switchToContext)
        retParams.switchToContext = switchToContext

      if (to[TYPE] !== PROFILE  ||  !me.isEmployee) {
        // // let to = list[utils.getId(to)].value
        // // if (to  &&  to[TYPE] === ORGANIZATION)
        // // entering the chat should clear customer's unread indicator
        retParams.shareableResources = await this.getShareableResources({foundResources: result, to, context})
      }

    }
    // if (shareableResources)
    //   retParams.shareableResources = shareableResources
    if (prop)
      retParams.prop = prop
    if (gatherForms  &&  modelName === MESSAGE) {
      if (!context  &&  result  &&  result.length) {
        for (let i=result.length  &&  !context; i>=0; i--)
          context = result[0][TYPE] === FORM_REQUEST  && result[0]._context
      }
      if (context)
        retParams.productToForms = await this.gatherForms(utils.getId(to), context)
    }
    this.trigger(retParams)
  },

  async getCurrentContext(to, orgId) {
    // let c = await this.searchMessages({modelName: PRODUCT_APPLICATION, to: to})
    let c
    if (me.isEmployee)
      c = await this.searchServer({modelName: CONTEXT, to: to})
    else
      c = await this.searchMessages({modelName: CONTEXT, to: to})
    if (!c  ||  !c.length)
      return

    let meId = utils.getId(me)
    let talkingToCustomer = !orgId  &&  me.isEmployee  &&  to  &&  to[TYPE] === PROFILE  &&  utils.getId(to) !== meId
    if (talkingToCustomer) {
      // Use the context that was already started if such exists
      let contexts = c.filter((r) => !r._readOnly && r._formsCount)

      let lastContext = c[c.length - 1]
      let currentProduct = utils.getProduct(lastContext)
      contexts = c.filter((r) => {
        if (r._readOnly)
          return false
        return (utils.getProduct(r) === currentProduct)
      })
      return contexts.length ? contexts[0] : c[c.length - 1]
    }
    if (c.length === 1)
      return utils.isReadOnlyChat(c[0]) ? null : c[0]

    let contexts = c.filter((r) => !utils.isReadOnlyChat(r) && r._formsCount)
    if (!contexts)
      return
    if (!contexts.length)
      return c[c.length - 1]
    if (contexts.length === 1)
      return contexts[0]
    contexts.sort((a, b) => {
      return b.lastMessageTime - a.lastMessageTime
    })
    return contexts[0]
  },
  async searchServer(params) {
    if (!this.client) {
      Alert.alert(translate('serverIsUnreachable'))
      return
    }
    let {direction, first, noTrigger, modelName, application, context, filterResource, endCursor, limit} = params
    if (modelName === MESSAGE)
      return await this.getChat(params)
    let myBot = me.isEmployee  &&  this.getRepresentative(me.organization)
    if (!filterResource)
      filterResource = {}
    else
      filterResource = utils.clone(filterResource)
    let applicantId = application  &&  application.applicant.id.replace(IDENTITY, PROFILE)
    let applicant = applicantId  &&  this._getItem(applicantId)
    if (me.isEmployee) {
      if (application  &&  (!filterResource  ||  !filterResource._org)) {
        let applicant = this._getItem(applicantId)
        if (applicant  &&  applicant.organization) {
          if (!filterResource)
            filterResource = {[TYPE]: modelName}
          filterResource._org = myBot[ROOT_HASH]
        }
      }
      if (modelName === APPLICATION) {
        if (!filterResource || !Object.keys(filterResource).length)
          filterResource = {[TYPE]: modelName}
        filterResource.archived = false
        if (!filterResource._org  &&  !filterResource.context)
          filterResource._org = myBot[ROOT_HASH]
      }
    }

    _.extend(params, {client: this.client, filterResource: filterResource, endCursor, noPaging: !endCursor})
    let result = await graphQL.searchServer(params)
    if (!result  ||  !result.edges  ||  !result.edges.length) {
      if (!noTrigger)
        this.trigger({action: 'list', resource: filterResource, isSearch: true, direction: direction, first: first})
      return
    }

    let newCursor = limit  &&  result.pageInfo  &&  result.pageInfo.endCursor
        // if (result.edges.length < limit)
        //   cursor.endCursor = null
    let list = result.edges.map((r) => this.convertToResource(r.node))
    if (me.isEmployee  &&  modelName === APPLICATION) {
      let contexts
      let contextIds = list
        .map(({ context }) => context)
        .filter(context => typeof context === 'string')

      let contextsResult = await utils.batchProcess({
        data: contextIds,
        batchSize: 30,
        worker: async (batch) => {
          return await graphQL.searchServer({
            modelName: PRODUCT_REQUEST,
            filterResource: {
              [TYPE]: PRODUCT_REQUEST,
              contextId: batch
            },
            client: this.client,
            noPaging: true
          })
        }
      })
      let contextsList = contextsResult  &&  contextsResult.edges
      if (contextsList) {
        contextsList = contextsList.filter(val => val)
        contexts = contextsList.map(({ node }) => this.convertToResource(node))
        list.forEach((r) => {
          let contextId = r.context
          if (typeof contextId === 'object')
            return
          let context = contexts.filter((c) => c.contextId === contextId)
          // Case when no forms yet submitted
          if (context.length) {
            r._context = context[0]
            this.addVisualProps(r._context)
          }
          let id = utils.getId(r.applicant).replace(IDENTITY, PROFILE)
          let applicant = this._getItem(id)
          if (applicant) {
            if (r.applicantName) {
              if (applicant.formatted.charAt(0) === '[') {
                applicant.formatted = r.applicantName
                db.put(id, applicant)
              }
              return
            }
            if (applicant.organization)
              r.applicant.title = applicant.organization.title
            else
              r.applicant.title = utils.getDisplayName(applicant)
          }
        })
      }
    }

    if (!noTrigger)
      this.trigger({action: 'list', list, endCursor: newCursor, resource: filterResource, direction, first})
    return {list, endCursor: newCursor}
  },
  async getChat(params) {
    let myBot = me.isEmployee  &&  this.getRepresentative(me.organization)
    let { application, endCursor, context, to, noTrigger, filterResource,
          switchToContext, direction, limit, modelName, loadEarlierMessages } = params
    let contextId
    let applicantId = application  &&  application.applicant.id.replace(IDENTITY, PROFILE)
    let applicant = applicantId  &&  this._getItem(applicantId)
    let importedVerification
    // Right now we request all imported verificationsthe first time.
    // May be we'll decide to page them too
    if (application  &&  !endCursor) {
      context = application._context
      if (!application.context)
        application = await this._getItemFromServer(application)
      contextId = application.context
      var params = {
        client: this.client,
        author: me[ROOT_HASH],
        context: contextId,
        filterResource: {_payloadType: VERIFICATION}
      }

      importedVerification = graphQL.getChat(params)
    }
    else if (context)
      contextId = context.contextId
    else if (!filterResource)
      return
    if (!context  &&  contextId) {
      context = await this.searchServer({
        modelName: PRODUCT_REQUEST,
        noTrigger: true,
        filterResource: {contextId: contextId, _org: myBot[ROOT_HASH]}
      })
      context = context  &&  context.list  &&  context.list.length  &&  context.list[0]
    }
    let author //, recipient
    if (application) {
      author = applicant  &&  this.getRootHash(applicant) // (applicant[ROOT_HASH] || applicantId.split('_')[1])
      // recipient = myBot[ROOT_HASH]
    }
    else {
      // recipient = myBot[ROOT_HASH]
      if (to)
        author = to[TYPE] === PROFILE ? to[ROOT_HASH] : this.getRepresentative(to)[ROOT_HASH]
      else if (!context  &&  !contextId)
        author = myBot[ROOT_HASH]
    }
    let all = graphQL.getChat({
      client: this.client,
      context: contextId,
      filterResource,
      limit,
      direction,
      endCursor,
      author,
      application: application
      // recipient,
    })
    let result = await Promise.all([all, importedVerification ||  Q()])

    let chatItems = []
    let table = `rl_${MESSAGE.replace(/\./g, '_')}`

    let inbound = true
    let outbound = false
    if (!result  ||  !result.length)
      return
    let resourceCount = result[0]  &&  result[0].edges.length
    for (let j=0; j<2; j++) {
      let response = result[j]
      if (!response) // ||  !Array.isArray(response))
        continue
      let list = response.edges
      // HACK
      let filteredList = list.filter(r => r.node.object[TYPE] !== MODELS_PACK)
      list = filteredList
      if (list  &&  list.length) {
        list.forEach(li => {
        // for (let i=0; i<result.length; i++) {
          let rr = this.convertMessageToResource(li.node, application)
          if (rr[TYPE] === FORM_REQUEST  &&  rr.form === PRODUCT_REQUEST) //  &&  rr._documentCreated)
            return
          if (rr[TYPE] == NEXT_FORM_REQUEST  ||  rr[TYPE] === INTRODUCTION  ||  rr[TYPE] === MODELS_PACK)
            return
          if (rr[TYPE] === VERIFICATION  &&  !rr.document.title) {
            let docId = utils.getId(rr.document)
            let docs = chatItems.filter((r) => utils.getId(r) === docId)
            if (docs  &&  docs.length)
              rr.document.title = utils.getDisplayName(docs[0])
          }
          if (li.node._time)
            rr._time = li.node._time
          if (!rr._context)
            rr._context = context
          if (typeof li.node._inbound != 'undefined') {
            if (li.node._inbound) {
              rr._inbound = true
              rr._outbound = false
            }
            else {
              rr._outbound = true
              rr._inbound = false
            }
          }
          else if (li.node.originalSender === me[ROOT_HASH]) {
            rr._outbound = true
            rr._inbound = false
          }
          else {
            rr._inbound = inbound
            rr._outbound = outbound
          }
          rr._recipient = li._recipient
          chatItems.push(rr)
        })
      }
      if (!application) {
        inbound = false
        outbound = true
      }
    }
    // Filter out resources like Introduction
    chatItems = chatItems.filter((r) => r._time)
    chatItems = _.uniqBy(chatItems, CUR_HASH)

    chatItems.sort((a, b) => {
      return a._time - b._time
    })
    if (context) {
      let formTypes = []
      let lastFormRequest
      // Filter out form requests for the same form type
      for (let i=chatItems.length - 1; i>=0; i--) {
        let r = chatItems[i]
        if (r[TYPE] === FORM_REQUEST)  {
          if (lastFormRequest)
            r._documentCreated = true
          else
            lastFormRequest = r
          if (formTypes.indexOf(r.form) !== -1)
            chatItems.splice(i, 1)
          else
            formTypes.push(r.form)
        }
      }
    }
    if (!noTrigger)
      noTrigger = filterResource  &&  filterResource._payloadType
    let newCursor = limit  &&  result[0].pageInfo  &&  result[0].pageInfo.endCursor
    if (!noTrigger) {
      let style
      if (application) {
        let applicant = this._getItem(applicantId)
        if (applicant  &&  applicant.organization) {
          let applicantOrgId = utils.getId(applicant.organization)
          style = SERVICE_PROVIDERS.filter((sp) => sp.org === applicantOrgId)[0].style
        }
      }
      let shareables
      if (!application)
        shareables = await this.getShareableResources({foundResources: chatItems, to, context: context})
      this.trigger({action: 'messageList', shareableResources: shareables, modelName, to: params.to, allLoaded: resourceCount < limit, list: chatItems, bankStyle: style, context, endCursor: newCursor, switchToContext, loadEarlierMessages})
    }
    return {list: chatItems, endCursor: newCursor, resourceCount}
  },
  convertMessageToResource(msg) {
    let r = this.convertToResource(msg.object)
    if (msg.context) {
      let context = contextIdToResourceId[msg.context]
      if (context)
        r._context = context
    }
    let recipientLink = msg._recipient
    let recipientId = utils.makeId(PROFILE, recipientLink)
    let recipient = this._getItem(recipientId)
    r.to = {
      id: recipientId,
      title: recipient && utils.getDisplayName(recipient.organization || recipient)
    }
    let authorLink = msg._author
    let authorId = utils.makeId(PROFILE, authorLink)
    let author = this._getItem(authorId)
    r.from = { id: authorId }
    if (author)
      r.from.title = utils.getDisplayName(author.organization || author)

    this.addVisualProps(r)
    return r
  },
  convertToResource(r) {
    r = utils.clone(r)
    utils.deepRemoveProperties(r, ({ key, value }) => key === '__typename' || value == null)
    if (!r[TYPE])
      return r
    const m = this.getModel(r[TYPE])
    const propNames = Object.keys(m.properties)
    const toKeep = NON_VIRTUAL_OBJECT_PROPS.concat(propNames)
    let rr = pick(r, toKeep)

    _.extend(rr, {
      [ROOT_HASH]: r._permalink,
      [CUR_HASH]: r._link,
      [TYPE]: r[TYPE],
    })

    let lr = this._getItem(utils.getId(rr))
    if (lr) {
      let rr = pick(r, toKeep)
      let mr = {}

      _.extend(mr, lr)
      delete mr._verifiedBy

      _.extend(mr, rr)
      rr = mr
    }
    if (!rr._time)
      rr._time = r._time

    let seal = r._seal
    if (seal) {
      rr.txId = seal.txId
      rr.sealedTime = seal.timestamp
      rr.blockchain = seal.blockchain
      rr.networkName = seal.network
    }

    let authorId = utils.makeId(PROFILE, r._org  ||  r._author)
    let author = this._getItem(authorId)
    let authorTitle = r._authorTitle || (author && author.organization &&  utils.getDisplayName(author.organization))
    let myOrgRep = this.getRepresentative(me.organization)
    let myOrgRepId = utils.getId(myOrgRep)
    // let from, to
    switch (m.id) {
    case FORM_ERROR:
    case FORM_REQUEST:
    case APPLICATION_SUBMITTED:
    case APPLICATION_DENIAL:
    case APPLICATION_APPROVAL:
    case CONFIRMATION:
      rr.from = {id: myOrgRepId, title: utils.getDisplayName(me.organization)}
      rr.to = {id: authorId, title: authorTitle}
      break
    case APPLICATION:
      this.organizeSubmissions(rr)
    default:
      rr.from = {id: authorId, title: authorTitle}
      rr.to = {id: myOrgRepId, title: utils.getDisplayName(me.organization)}
      break
    }
    let props = m.properties
    for (let p in rr) {
      if (typeof rr[p] !== 'object')
        continue
      if (rr[p].edges) {
        rr[p] = rr[p].edges.map(r => this.convertToResource(r.node))
        rr['_' + p + 'Count'] = rr[p].length
      }
      else if (props[p]  &&  props[p].inlined) {
        if (props[p].type === 'object'  &&  props[p].ref)
          this.convertInlineRefs(props[p].ref, rr[p])
        else if (props[p].type === 'array'  &&  props[p].items.ref)
          rr[p] = rr[p].map(v => this.convertInlineRefs(props[p].items.ref, v))
      }
    }
    // for (let p in rr) {
    //   if (typeof rr[p] === 'object'  &&  rr[p].edges) {
    //     rr[p] = rr[p].edges.map(r => this.convertToResource(r.node))
    //     rr['_' + p + 'Count'] = rr[p].length
    //   }
    // }

    // if (!rr._context  &&  rr[ROOT_HASH] !== rr[CUR_HASH]) {
    //   let origRid = utils.makeId(rr[TYPE], rr[ROOT_HASH])
    //   let origR = this._getItem(origRid)
    //   if (origR  &&  origR._context) {
    //     if (!origR._context.contextId)

    //     rr._context = origR._context
    //   }
    // }
    rr[IS_MESSAGE] = true
    this.rewriteStubs(rr)
    this.addVisualProps(rr)
    return rr
  },
  convertInlineRefs(ref, rr, isArray) {
    let pm = this.getModel(ref)
    if (pm.abstract  ||  pm.subClassOf === ENUM)
      return rr
    let props = pm.properties
    for (let p in rr) {
      if (!props[p]  ||  !rr[p][TYPE])
        continue
      let m = this.getModel(rr[p][TYPE])
      if (m.subClassOf === ENUM  ||  props[p].inlined)
        continue
      rr[p] = this.makeStub(rr[p])
    }
    if (rr._author) {
      let authorId = utils.makeId(PROFILE, rr._author)
      let author = this._getItem(authorId)
      let authorTitle = rr._authorTitle || (author && author.organization &&  utils.getDisplayName(author.organization))
      rr.from = {id: authorId, title: authorTitle}
    }
    return rr
  },

  organizeSubmissions (application) {
    const submissions = application.submissions
    if (!submissions)
      return
    let submissionStubs
    if (Array.isArray(submissions))
      submissionStubs = submissions.map((sub) => sub.submission)
    else {
      const { submissions={} } = application
      if (!submissions.edges ||  !submissions.edges.length)
        return
      submissionStubs = submissions.edges.map(s => s.node.submission)
    }
    if (application.forms)
      application.forms = []
    if (application.verifications)
      application.verifications = []
    if (application.editRequests)
      application.editRequests = []
    if (application.products)
      application.products = []
    submissionStubs.forEach(sub => {
      let m = this.getModel(utils.getType(sub))
      let type = m.subClassOf || m.id
      let stub = this.makeStub(sub)
      switch (type) {
      case FORM:
        if (m.id === PRODUCT_REQUEST)
          return
        if (!application.forms)
          application.forms = []
        application.forms.push(stub)
        application._formsCount = application.forms.length
        break
      case VERIFICATION:
        if (!application.verifications)
          application.verifications = []
        application.verifications.push(stub)
        application._verificationsCount = application.verifications.length
        break
      case FORM_ERROR:
        if (!application.editRequests)
          application.editRequests = []
        application.editRequests.push(stub)
        application._editRequestsCount = application.editRequests.length
        break
      case MY_PRODUCT:
        if (!application.products)
          application.products = []
        application.products.push(stub)
        application._productsCount = application.products.length
      }
    })
    return application
  },

  makeStub(sub) {
    return {
      id: sub.id  ||  [sub[TYPE], sub._permalink, sub._link].join('_'),
      title: sub.title || sub._displayName
    }
  },
  onListSharedWith(resource, chat) {
    let sharedWith = resource._sharedWith
    if (!sharedWith)
      return null
    let chatId = utils.getId(chat)
    let shareWithMapping = {}
    let result = []
    sharedWith.forEach((r) => {
      let bot = this._getItem(r.bankRepresentative)
      let org = this._getItem(utils.getId(bot.organization))
      if (utils.getId(org) === chatId)
        return
      result.push(org)
      shareWithMapping[r.bankRepresentative] = org
    })
    this.trigger({action: 'listSharedWith', list: result, sharedWith: shareWithMapping})
  },
  async _searchNotMessages(params) {
    await this._loadedResourcesDefer.promise
    let result = this.searchNotMessages(params)
    if (result.length  ||  params.modelName !== ORGANIZATION)
      return result
    let props = this.getModel(ORGANIZATION).properties

    let forms = await Promise.all(result.map((r) => this.getBacklinkResources(props['forms'], r)))
    result.forEach((r, i) => {
      if (forms[i])
        r._formsCount = forms[i].length
    })
    return result
  },
  searchNotMessages(params) {
    if (params.list)
      return params.list.map((r) => this._getItem(r))
    var foundResources = {};
    let {modelName, limit, to, start, notVerified, query, all, isTest, sortProperty, asc} = params
    var meta = this.getModel(modelName)
    if (utils.isEnum(meta))
      return this.getEnum(params)
    if (params.search)
      all = true
    let ids = myCustomIndexes
    // Product chooser for example
    var props = meta.properties;
    var containerProp, resourceId;
    var foundRecs = 0

    let isOrg = modelName == ORGANIZATION

    let sortProp = sortProperty || (isOrg ? LAST_MESSAGE_TIME : meta.sort)

    var isProfile = modelName === PROFILE
    var isIdentity = modelName === IDENTITY
    // to variable if present is a container resource as for example subreddit for posts or post for comments
    // if to is passed then resources only of this container need to be returned
    if (to) {
      for (let p in props) {
        if (props[p].ref  &&  props[p].ref === to[TYPE]) {
          containerProp = p;
          resourceId = utils.getId(to)
        }
      }
    }
    var searchProp
    if (query) {
      let pidx = query.indexOf(':')
      if (pidx !== -1) {
        let p = query.substring(0, pidx).trim()
        let prop = utils.getPropByTitle(props, p)
        if (prop) {
          searchProp = prop.name
          query = query.substring(pidx + 1).trim()
        }
      }
    }
    var required = meta.required;
    var meId = me ? utils.getId(me) : null
    var subclasses = utils.getAllSubclasses(modelName).map((r) => r.id)
    for (var key in list) {
      var r = this._getItem(key);
      let rtype = r[TYPE]
      if (rtype !== modelName) {
        if (subclasses) {
          if (subclasses.indexOf(rtype) === -1)
            continue;
        }
        else
          continue
      }
      else if (notVerified  &&  (r.verifications  &&  r.verifications.length))
        continue
      if (r.canceled)
        continue;
      if (isOrg  &&  r._inactive)
        continue
      if (containerProp  &&  (!r[containerProp]  ||  utils.getId(r[containerProp]) !== resourceId))
        continue;
      if (isOrg  &&  r.name.indexOf('[TEST]') === 0)
        continue
      if (!query) {
        if (start  &&  foundRecs < start) {
          foundRecs++
          continue
        }
        foundResources[key] = r
        if (limit  &&  Object.keys(foundResources).length === limit)
          break
        continue;
      }
      var fr = this.checkCriteria({r, query, prop: searchProp})
      if (fr) {
        if (start  &&  foundRecs < start) {
          foundRecs++
          continue
        }
        foundResources[key] = r
        if (limit  &&  Object.keys(foundResources).length === limit)
          break
      }
    }
    // Don't show current 'me' contact in contact list or my identities list
    if (!containerProp  &&  me  &&  isProfile) {
      if (!isTest) {
        var myIdentities = this._getItem(MY_IDENTITIES).allIdentities;
        myIdentities.forEach((meId) =>  {
          if (foundResources[meId.id])
             delete foundResources[meId.id];
        })
      }
    }
    if (utils.isEmpty(foundResources))
      return []
    var result = utils.objectToArray(foundResources);
    // if (isProfile) {
    //   result.forEach(function(r) {
    //     if (r.organization) {
    //       var res = list[utils.getId(r.organization.id)];
    //       if (res  &&  res.value) {
    //         var photos = res.value.photos;
    //         if (photos)
    //           r.organization.photo = photos[0].url;
    //       }
    //     }
    //   });
    // }
    if (isProfile  &&  !all  &&  me.isEmployee) {
      let retPeople = []
      // Filter out the employees of other service providers from contact list
      // This will go away when thru-bot communications will deployed
      result.forEach((r) => {
        if (!r.organization) {
          retPeople.push(r)
          return
        }
        let orgId = utils.getId(r.organization)
        if (r.isEmployee  &&  utils.getId(r.organization) !== orgId) {
          let orgs = SERVICE_PROVIDERS.filter((rr) => {
            return rr.org === orgId ? true : false
          })
          if (!orgs.length)
            retPeople.push(r)
        }
      })
      result = retPeople
    }
    if (isOrg) {
      // cloning orgs to re-render the org list with the correct number of forms
      let retOrgs = []
      result.forEach((r) => {
        let orgId = utils.getId(r)
        let rr = _.clone(r)
        if (this._noSplash  &&  this._noSplash.indexOf(utils.getId(rr)) !== -1)
          rr._noSplash = true
        retOrgs.push(rr)
      })
      // Allow all providers in chooser
      if (!params.prop  &&  !all)
        result = retOrgs.filter((r) => r._isTest === isTest)
      // result = retOrgs
    }
    if (result.length === 1  ||  !sortProp)
      return result || []
    // sortProp = sortProperty || sortProp
    asc = (typeof asc != 'undefined') ? asc : false;
    if (props[sortProp].type == 'date') {
      result.sort((a,b) => {
        var aVal = a[sortProp] ? a[sortProp] : 0;
        var bVal = b[sortProp] ? b[sortProp] : 0;
        if (asc)
          return aVal - bVal;
        else
          return bVal - aVal;
      });
    }
    else if (props[sortProp].type == 'string')  {
      let sortPropToR = {}
      let arr = result.map((r) => {
        sortPropToR[r[sortProp]] = r
        return r[sortProp]
      })
      arr.sort();
      if (asc)
        arr = arr.reverse();
      result = arr.map((s) => sortPropToR[s])
    }
    else if (props[sortProp].type == 'number') {
      result.sort((a, b) => asc ? a[sortProp] - b[sortProp] : b[sortProp] - a[sortProp])
    }
    else if (props[sortProp].ref) {
      let sortPropToR = {}
      let arr = result.map((r) => {
        sortPropToR[r[sortProp].title] = r
        return r[sortProp].title
      })
      arr.sort();
      if (asc)
        arr = arr.reverse();
      result = arr.map((s) => sortPropToR[s])
      // result.sort(function(a, b) {
      //   return asc ? a[sortProp].title - b[sortProp].title : b[sortProp].title - a[sortProp].title
      // })
    }

    return result;
  },
  getEnum(params) {
    let result
    let enumList = enums[params.modelName]
    if (params.query)
      return enumList.filter((r) => this.checkCriteria({r, query: params.query}))
    else
      return enumList
  },
  checkCriteria({r, query, prop, isChooser}) {
    if (!query)
      return r
    if (isChooser) {
      let dn = utils.getDisplayName(r)
      return (dn.toLowerCase().indexOf(query.toLowerCase()) !== -1) ? r : null
    }
    let rtype = r[TYPE]
    let rModel = this.getModel(rtype)
    let props = rModel.properties
    if (prop  &&  rr[prop]) {
      let val = utils.getStringPropertyValue(r, prop, props)
      return (val.toLowerCase().indexOf(query.toLowerCase()) === -1) ? null : r
    }
    var combinedValue = '';
    for (var rr in props) {
      if (!r[rr]  ||  rr.charAt(0) === '_'  ||   Array.isArray(r[rr]))
        continue;
      if (props[rr].type === 'object') {
        let title = utils.getDisplayName(r[rr], rModel)
        combinedValue += combinedValue ? ' ' + title : title
        continue
      }
      else if (props[rr].type === 'date') {
        continue
        if (!isNaN(r[rr])) {
          let d = new Date(r[rr]).toString()
          combinedValue += combinedValue ? ' ' + d : d
          continue
        }

      }

      combinedValue += combinedValue ? ' ' + r[rr] : r[rr];
    }
    if (rtype === BOOKMARK)
      combinedValue += utils.makeModelTitle(rtype)
    if (!combinedValue)
      return
      // return r

    if (combinedValue.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      return r
    return
  },
  async _searchMessages(params) {
    await this._loadedResourcesDefer.promise
    let result = await this.searchMessages(params)
    if (!result  ||  params.prop)
      return result
    // Don't show the remediation resources
    let to = params.to
    if (!to)
      return result
    let rep = to
    if (to[TYPE]  &&  to[TYPE] === ORGANIZATION)
      rep = this.getRepresentative(params.to)
    if (!rep)
      return result
    return result.filter((r) => this.isChatItem(r, utils.getId(rep)))
  },

  async searchAllMessages(params) {
    // await this._loadedResourcesDefer.promise
    var self = this

    // var {resource, query, context, _readOnly, to, isForgetting, lastId, limit, prop, checkForSplash} = params
    var {resource, query, context, _readOnly, to, isForgetting, lastId, limit, prop} = params
// console._time('searchAllMessages')
    var _readOnly = _readOnly  || (context  && utils.isReadOnlyChat(context)) //(context  &&  context._readOnly)
    var foundResources = [];

    // var required = model.required;
    var meId = utils.getId(me)
    var meOrgId = me.isEmployee ? utils.getId(me.organization) : null;
    var myBotId = me.isEmployee ?  utils.getId(this.getRepresentative(me.organization)) : null

    let filterOutForms = !isForgetting  &&  to  &&  to[TYPE] === ORGANIZATION  //&&  !utils.isEmployee(params.to)

    var chatTo = to
    if (chatTo  &&  chatTo.id)
      chatTo = this._getItem(utils.getId(chatTo))
    var chatId = chatTo ? utils.getId(chatTo) : null;
    var isChatWithOrg = chatTo  &&  chatTo[TYPE] === ORGANIZATION;
    var toOrgId
    var toOrg
    let thisChatMessages

    if (isChatWithOrg) {
      var rep = this.getRepresentative(chatId)
      if (!rep)
        return
      chatTo = rep
      chatId = utils.getId(chatTo)
      // isChatWithOrg = false
      toOrgId = utils.getId(to)
      toOrg = this._getItem(toOrgId)
      thisChatMessages = chatMessages[toOrgId]
    }
    else {
      if (chatTo) {
        if (chatTo.organization  &&  !meOrgId) {
          toOrgId = utils.getId(chatTo.organization)
          thisChatMessages = chatMessages[toOrgId]
        }
        else {
          if (meId !== chatId)
            thisChatMessages = chatMessages[chatId]
        }
      }
    }
    if (!thisChatMessages  ||  !thisChatMessages.length)
      return null
    // if (isChatWithOrg  &&  !chatTo.name) {
    //   chatTo = list[chatId].value;
    // }
    var testMe = chatTo ? chatTo.me : null;
    if (testMe) {
      if (testMe === 'me') {
        if (!originalMe)
          originalMe = me;
        testMe = originalMe[ROOT_HASH];
      }

      isTest = true;
      var meId = utils.makeId(PROFILE, testMe)
      me = this._getItem(meId);
      this.setMe(me);
      var myIdentities = this._getItem(MY_IDENTITIES);
      if (myIdentities)
        myIdentities.currentIdentity = meId;
    }
    // var lastPL
    // var sharedWithTimePairs = []
    var from = params.from
    var limit = limit + 1

    let resourceId = resource ? utils.getId(resource) : null
    let links = []
    let j
    if (lastId) {
      j = thisChatMessages.findIndex(({ id }) => id === lastId)
      if (j === thisChatMessages.length - 1)
        return
      j = j - 1
    }
    else
      j = thisChatMessages.length - 1

    let start = j
    let refs = []
    let all = {}
    if (typeof lastId === 'undefined' || j) {
      let isBacklinkProp = (prop  &&  prop.items  &&  prop.items.backlink)
      for (let i=j; i>=0; i--) {
        if (isChatWithOrg  &&  meOrgId === toOrgId) {
          let item = this._getItem(thisChatMessages[i].id)
          if (item._originalSender  ||  item._forward)
            continue
        }
        if (!isBacklinkProp) {
          let item = this._getItem(thisChatMessages[i].id)
          if (!this.isChatItem(item, chatId))
            continue
        }
        this.addReferenceLink(thisChatMessages[i], links, all, refs)
        if (limit  &&  links.length === limit)
          break
      }
    }
    if (!links.length)
      return
    let allLinks
    if (refs.length) {
      allLinks = links.slice()
      refs.forEach((r) => {
        if (links.indexOf(r) === -1)
          allLinks.push(r)
      })
    }
    else
      allLinks = links

    let startTime = Date.now()
    let cnt = start
    var list = []
    let refsObj = {}

    return Promise.all(allLinks.map(link => {
      return this.handleOne({ link, links, all, isForgetting, refsObj, refs, filterOutForms, foundResources, context, toOrgId, chatTo, chatId, prop, query })
    }))
    .then((l) => {
      if (!foundResources.length)
        return

      foundResources.forEach((r) => {
        if (r[TYPE] === VERIFICATION)
          r.document = refsObj[utils.getId(r.document)] || r.document
        else if (r[TYPE] === FORM_ERROR) {
          let prefill = refsObj[utils.getId(r.prefill)]
          if (prefill)
            r.prefill = prefill

        }
        this.addVisualProps(r)
      })
      // Minor hack before we intro sort property here
      let sortedFR = []

      for (let i=links.length - 1; i>=0; i--) {
        let fr = foundResources.find((r) => r[CUR_HASH] === links[i])
        if (fr)
          sortedFR.push(fr)
      }
      foundResources = sortedFR
      // foundResources.sort((a, b) => a._time - b._time)
      let list = []
      let len = foundResources.length
      for (let i=0; i<len; i++) {
        let r = foundResources[i]
        if (r[TYPE] === FORM_REQUEST  &&  r.requestFor === PRODUCT_REQUEST) {
          if (i < len - 1) {
            let r2 = foundResources[i + 1]
            if (r2[TYPE] === FORM_REQUEST  &&  r2.requestFor === PRODUCT_REQUEST) {
              foundResources.splice(i, 1)
              len--
            }
          }
        }
      }
      utils.pinFormRequest(foundResources)
// console.timeEnd('searchAllMessages')
      return foundResources
    })
    .catch((err) => {
      debugger
    })
  },
  addReferenceLink(stub, links, all, refs) {
    let r = this._getItem(stub)
    if (!r)
      return
    if (r[TYPE] === VERIFICATION) {
      let doc = this._getItem(r.document.id)
      if (doc  &&  doc.from.id !== r.to.id) {
        refs.push(doc[CUR_HASH])
        all[doc[CUR_HASH]] = utils.getId(r.document)
      }
    }
    else if (r[TYPE] === FORM_ERROR) {
      if (r.prefill.id) {
        let prefill = this._getItem(r.prefill.id)
        let phash = prefill ? prefill[CUR_HASH] : this.getCurHash(r.prefill) //r.prefill.id.split('_')[2]
        refs.push(phash)
        all[phash] = utils.getId(r.prefill)
      }
    }
    let link = this.addLink(links, stub)
    if (link)
      all[link] = stub.id
  },
  async handleAll(params) {
    let { link, links, all, refsObj, refs, resource, to, foundResources, list, prop, query } = params
    let objects = await this.getObjects(all)
    // objects.forEach((r) => {
    //   if (refs.indexOf(r[CUR_HASH]))
    //     refsObj[utils.getId(r)] = r
    // })
    let checked = []
    objects.forEach((rr) => {
      if (links.indexOf(rr[CUR_HASH]) === -1)
        return
      let rId = utils.getId(rr)
      let r = this._getItem(rId)
      this._setItem(rId, r)
      _.extend(r, rr)

      if (r._context  &&  !utils.isContext(r[TYPE])) {
        let rcontext = this.findContext(r._context)
        if (!rcontext) {
          let rcontextId = utils.getId(r._context)
          rcontext = refsObj[rcontextId]
          if (!rcontextId) {
            rcontext = this._getItemFromServer(rcontextId)
            refsObj[rcontextId] = rcontext
          }
        }
        r._context = rcontext
      }
      let hash = r[CUR_HASH]
      if (refs.indexOf(hash) !== -1) {
        refsObj[utils.getId(r)] = r
        if (links.indexOf(hash) === -1)
          return
      }

      _.extend(params, { r })
      let backlink = prop ? (prop.items ? prop.items.backlink : prop) : null;
      let isBacklinkProp = (prop  &&  prop.items  &&  prop.items.backlink)
      try {
        if (isBacklinkProp) {
          let container = resource  ||  to
          let isOrganization = container[TYPE] === ORGANIZATION
          if (isOrganization  && ['to', 'from'].indexOf(backlink) !== -1)
            container = this.getRepresentative(utils.getId(container))


          let rId = utils.getId(container)
          if (r[backlink]  &&  utils.getId(r[backlink]) === rId)
            list.push(r)
          else if (isOrganization  && r._sharedWith  &&  r._sharedWith.length > 1) {
            if (r._sharedWith.some((sh) => sh.bankRepresentative === rId))
              list.push(r)
          }
          if (query)
            checked.push(this.checkAndFilter(params))
        }
        else
          checked.push(this.checkResource(params))
        if (checked   &&  isBacklinkProp) {
          if (query)
            list.push(r)
        }
      } catch (err) {
      }
    })
    if (checked.length)
      await Promise.all(checked)
  },
  async handleOne(params) {
    let { link, links, all, refsObj, refs, resource, to, prop, list, query, isChooser } = params
    let rId = all[link]
    let r = this._getItem(rId)
    if (!r)
      return
    if (isChooser  &&  !r._latest)
      return
    let object
    try {
      // object = await this.getObject(link)
      object = await this._keeper.get(link)
    } catch(err) {
      // debugger
      console.log(err)
      if (me.isEmployee)
        object = await this._getItemFromServer(rId)
      // if (me.isEmployee)
      //   return this._getItemFromServer(rId)
    }
    if (!object)
      return

    let obj = utils.clone(object)
    this.rewriteStubs(obj)
    _.extend(r, obj)
    this._setItem(rId, r)
    if (r._context  &&  !utils.isContext(r[TYPE])) {
      let rcontext = this.findContext(r._context)
      if (!rcontext) {
        let rcontextId = utils.getId(r._context)
        rcontext = refsObj[rcontextId]
        if (!rcontextId) {
          rcontext = this._getItemFromServer(rcontextId)
          refsObj[rcontextId] = rcontext
        }
      }
      r._context = rcontext
    }
    // list = this.transformResult(result)
    let hash = r[CUR_HASH]
    if (refs.indexOf(hash) !== -1) {
      refsObj[utils.getId(r)] = r
      if (links.indexOf(hash) === -1)
        return
    }

    let checked
    try {
      _.extend(params, { r })
      let backlink = prop ? (prop.items ? prop.items.backlink : prop) : null;
      let isBacklinkProp = (prop  &&  prop.items  &&  prop.items.backlink)
      if (isBacklinkProp) {
        let container = resource  ||  to
        let isOrganization = container[TYPE] === ORGANIZATION
        if (isOrganization  && ['to', 'from'].indexOf(backlink) !== -1)
          container = this.getRepresentative(utils.getId(container))

        let rId = this.getRootHash(container) //utils.getId(container)
        let blId = r[backlink]  &&  this.getRootHash(r[backlink])
        // if (r[backlink]  &&  utils.getId(r[backlink]) === rId)
        if (blId === rId)
          list.push(r)
        else if (isOrganization  && r._sharedWith  &&  r._sharedWith.length > 1) {
          if (r._sharedWith.some((sh) => sh.bankRepresentative === rId))
            list.push(r)
        }
        if (query)
          checked = await this.checkAndFilter(params)
      }
      else if (isChooser  &&  resource  &&  prop) {
        let rModel = this.getModel(resource[TYPE])

        if (utils.isImplementing(rModel, INTERSECTION)) {
          // If the intersection resource has a different property set to the value in the list, filter it out
          // !!! in future should filter out all resources
          // for which relationships were already created for this Entity
          let refProps = utils.getPropertiesWithAnnotation(rModel, 'ref')
          let doExclude
          for (let p in refProps) {
            if (p === prop.name  ||  !resource[p])
              continue
            if (resource[p].id === utils.getId(r))
              doExclude = true
          }
          if (doExclude)
            return
        }
        checked = await this.checkResource(params)
      }
      else
        checked = await this.checkResource(params)
      if (checked   &&  isBacklinkProp) {
        if (query)
          list.push(r)
        return r
      }
    } catch (err) {
    }
  },
  rewriteStubs(resource) {
    let type = resource[TYPE]
    let props = this.getModel(type).properties
    for (let p in resource) {
      if (!props[p])
        continue
      if (props[p].type !== 'object'  &&  props[p].type !== 'array')
        continue
      if (props[p].range === 'json')
        continue
      if (typeof resource[p] !== 'object')
        continue

      let stub = resource[p]
      if (Array.isArray(stub)) {
        resource[p] = stub.map(s => s._link ?  this.makeStub(s) : s)
        continue
      }
      if (!stub[TYPE])
        continue
      let m = utils.getModel(stub[TYPE])
      if (utils.isEnum(m))  {
        continue
        // newStub.id = [m.id, r.id].join('_')
        // newStub._displayName = m.enums.filter({id, title} => r.id === id)[0].title
      }
      if (!stub._link)
        continue
      resource[p] = this.makeStub(stub)
    }
    if (type === FORM_REQUEST  ||  type === FORM_ERROR) {
      if (resource.prefill  &&  !utils.isStub(resource.prefill))
        this.rewriteStubs(resource.prefill)
    }
  },
  addLink(links, r) {
    let item = this._getItem(r.id)
    // let link = item[MSG_LINK]
    let link = item[CUR_HASH]
    links.push(link)
    return link
  },
  async checkResource(params) {
    let { r, foundResources, context, toOrgId, chatTo, chatId, prop, query, isForgetting } = params
    // var key = thisChatMessages[i].id
    // var r = this._getItem(key)
    if (r.canceled)
      return
    if (r[TYPE] === BOOKMARK) {
      if (query)
        this.checkAndFilter(params)
      else
        foundResources.push(this.fillMessage(r))
      return
    }

    if (context) {
      if (!this.inContext(r, context))
        return
    }
    var isFormError = r[TYPE] === FORM_ERROR
    if (r.message  &&  r.message.length)  {
      let meId = utils.getId(me)
      if (r[TYPE] === SELF_INTRODUCTION  &&  !isForgetting && (utils.getId(r.to) !== meId))
        return
      if (r.message === ALREADY_PUBLISHED_MESSAGE)
        return
      if (chatTo.organization  &&  r[TYPE] === CUSTOMER_WAITING) {
        var rid = utils.getId(chatTo.organization);
        if (!utils.isEmployee(this._getItem(rid)))
          return
      }
    }

    var isSharedWith //, timeResourcePair = null
    var m = this.getModel(r[TYPE])
    var isVerificationR = r[TYPE] === VERIFICATION  ||  m.subClassOf === VERIFICATION
    if (r._sharedWith  &&  toOrgId) {
      isSharedWith = r._sharedWith.some((r) => {
        let org = this._getItem(r.bankRepresentative).organization
        return (org) ? utils.getId(org) === toOrgId : false
      })
      // isSharedWith = sharedWith.length !== 0
    }

    if (chatTo) {
      // backlinks like myVerifications, myDocuments etc. on Profile
      var isForm = m.subClassOf === FORM
      var isItem = utils.isItem(m)
      var isMyProduct = m.subClassOf === MY_PRODUCT
      let isContext = utils.isContext(m)
      let isDataClaim = m.id == DATA_CLAIM
      if ((!r.message  ||  r.message.trim().length === 0) && !r.photos &&  !isVerificationR  &&  !isForm  &&  !isMyProduct && !isContext && !isDataClaim  &&  !isItem)
        // check if this is verification resource
        return;
      // var fromID = utils.getId(r.from);
      var toID = utils.getId(r.to);

      if (params.strict) {
        if (chatId !== toID)
          return
      }
    }
    if (params.strict  &&  chatId !== utils.getId(r.to))
      return

    if (r._sharedWith  &&  toOrgId  &&  !isSharedWith)
      return
    if (isVerificationR) {
      var doc = {};
      let document = r.document
      for (let p in document) {
        if (p === 'verifications') continue

        var val = document[p]
        switch (typeof val) {
        case 'object':
          if (val) {
            if (Array.isArray(val))
              doc[p] = val.slice(0)
            else
              doc[p] = _.clone(val)
          }
          break
        default:
          doc[p] = val
          break
        }
      }

      r.document = doc;
    }
    // primitive filtering for this commit
    await this.checkAndFilter(params)
  },
  // Don't show this item in chat it was originated in but show it where it was shared
  isChatItem(item, chatId) {
    if (!item[NOT_CHAT_ITEM])
      return true
    if (!item._sharedWith  ||  item._sharedWith.length <= 1)
      return false
    if (utils.getId(item.from) === chatId  ||  utils.getId(item.to) === chatId)
      return false
    return true
  },
  async checkAndFilter(params) {
    let { r, foundResources, prop, query, filterOutForms, isChooser } = params
    if (!query) {
      if (!filterOutForms  ||  !(await this.doFilterOut({r, prop}))) {
        foundResources.push(this.fillMessage(r))
        return true
      }
    }
    let isVerificationR = r[TYPE] === VERIFICATION
    let isBookmark = r[TYPE] === BOOKMARK
    let checkVal = isVerificationR ? this._getItem(r.document) : r
    let fr = this.checkCriteria({r: isBookmark ? r.bookmark : r, query, isChooser})

    if (fr) {
      // foundResources[key] = this.fillMessage(r);
      if (!filterOutForms  ||  !(await this.doFilterOut({r, prop}))) {
        foundResources.push(this.fillMessage(r))
        return true
      }
    }
    return false
  },
  async doFilterOut(params) {
    let {r, prop} = params
    let m = this.getModel(r[TYPE])
    if (utils.isContext(m)  &&  (r.requestFor === REMEDIATION || !this.getModel(r.requestFor)))
      return true
    // if (r._notSent)
    //   return true
    if (r._context       &&
        !prop            &&
        (m.subClassOf === FORM || m.id === VERIFICATION) &&
        this._getItem(utils.getId(r._context)).requestFor === REMEDIATION) {
      let org = m.subClassOf === FORM ? this._getItem(utils.getId(r.to)) : this._getItem(utils.getId(r.from))
      let remMsg = await this.searchMessages({modelName: REMEDIATION_SIMPLE_MESSAGE, to: org})
      if (remMsg  &&  remMsg.length)
        return r._time < remMsg[0]._time + 30000

      return true
    }
    if (r._inactive)
      return true
    if (m.subClassOf === MY_PRODUCT  &&
        r._context                   &&
        this._getItem(utils.getId(r._context)).requestFor === REMEDIATION)
      return true


    return false
  },
  findLatestResource(resource) {
    let arr = this.findAllResourceVersions(resource)
    let latest = arr.filter(r => r._latest)
    return latest  &&  latest[0]
  },
  findAllResourceVersions(resource) {
    let arr = []
    if (!resource.to)
      return arr

    let toId = utils.getId(resource.to)
    let messages = chatMessages[toId]
    if (!messages) {
      let to = this._getItem(toId)
      if (!to.organization)
        return arr
      messages = chatMessages[utils.getId(to.organization)]
      if (!messages)
        return arr
    }

    let hash = this.getRootHash(resource)
    let type = utils.getType(resource)

    let partialId = [type, hash].join('_') + '_'
    let len = messages.length
    for (let i=len - 1; i>=0; i--) {
      let stub = messages[i]
      let id = stub.id
      if (id.indexOf(partialId) === 0) {
        let r = this._getItem(id)
        if (r._latest)
          arr.push(r)
      }
    }
    return arr
  },
  async searchMessages(params) {
    // await this._loadedResourcesDefer.promise
    var self = this

    if (params.modelName === MESSAGE)
      return await this.searchAllMessages(params)

    let {resource, query, modelName, prop, context, _readOnly, to, listView, isForgetting, lastId, limit, isChooser} = params

    let model = this.getModel(modelName)

    _readOnly = _readOnly  || (context  && utils.isReadOnlyChat(context)) //(context  &&  context._readOnly)
    if (_readOnly  &&  utils.isContext(modelName))
      return this.getAllSharedContexts()
    if (typeof prop === 'string')
      prop = model[prop];

    limit++

    let backlink = prop ? (prop.items ? prop.items.backlink : prop) : null;
    let foundResources = [];
    let props = model.properties;

    // let required = model.required;
    let meId = utils.getId(me)
    let meOrgId = me.isEmployee ? utils.getId(me.organization) : null;
    let myBotId = me.isEmployee ?  utils.getId(this.getRepresentative(me.organization)) : null

    let filterOutForms = !listView  &&  !isForgetting  &&  to  &&  to[TYPE] === ORGANIZATION  //&&  !utils.isEmployee(params.to)

    let chatTo = to
    if (chatTo  &&  chatTo.id)
      chatTo = this._getItem(utils.getId(chatTo))
    let chatId = chatTo ? utils.getId(chatTo) : null;
    let isChatWithOrg = chatTo  &&  chatTo[TYPE] === ORGANIZATION;
    let toOrgId
    let toOrg
    let thisChatMessages

    if (isChatWithOrg) {
      let rep = this.getRepresentative(chatId)
      if (!rep)
        return
      chatTo = rep
      chatId = utils.getId(chatTo)
      // isChatWithOrg = false
      toOrgId = utils.getId(to)
      toOrg = this._getItem(toOrgId)
      thisChatMessages = chatMessages[toOrgId]
    }
    else {
      if (chatTo  &&  !prop) {
        if (chatTo.organization  &&  !meOrgId) {
          toOrgId = utils.getId(chatTo.organization)
          thisChatMessages = chatMessages[toOrgId]
        }
        else {
          if (meId !== chatId)
            thisChatMessages = chatMessages[chatId]
        }
      }
//       else if (chatId === meId) {
// console.log('What are we doing here!!! chatId: ' + chatId)
//         thisChatMessages = chatMessages[chatId]
//       }
    }
    let isForm = modelName === FORM
    let isBacklinkProp = (prop  &&  prop.items  &&  prop.items.backlink)
    if (!thisChatMessages  &&  (!to || chatId === meId  || isBacklinkProp)) {
      let allMessages = chatMessages[ALL_MESSAGES]
      thisChatMessages = []
      let isInterface = model.isInterface
      let isVerification = modelName === VERIFICATION
      let isMessage = model.id === MESSAGE
      if (!allMessages)
        return
      //Object.keys(list).forEach(key => {
      let resourceId = resource ? utils.getId(resource) : null
      allMessages.forEach((res, i) => {
        let r = self._getItem(res.id)
        let type = r[TYPE]
        let m = self.getModel(type)
        if (!m) return
        if (isBacklinkProp) {
          if (resourceId)  {
            if (r[backlink]  &&  utils.getId(r[backlink]) !== resourceId)
              return
          }
          else if (me.isEmployee) {
            if (isForm) {
              this.addVisualProps(r)
              if (!r.to.organization  ||  utils.getId(r.to.organization) !== meOrgId)
                return
            }
            else if (isVerification) {
              this.addVisualProps(r)
              if (!r.from.organization  ||  utils.getId(r.from.organization) !== meOrgId)
                return
            }
          }
        }
        // This is the case when backlinks are requested on Profile page
        let addMessage = type === modelName  ||  (!isForm  &&  m.subClassOf === model.id)
        if (!addMessage) {
          if (isForm) {
            if (m.subClassOf === FORM) {
              // Make sure to not return Items and Documents in this list
              let ilen = m.interfaces  &&  m.interfaces.length
              if (isForgetting  ||  !ilen  ||  (ilen === 1  &&  m.interfaces[0] === VERIFIABLE))
                addMessage = true
            }
          }
          else if (isForgetting  || (isInterface  &&  m.interfaces  &&  m.interfaces.indexOf(model.id) !== -1)) //  && (!isMessage  ||  m.value.interfaces.length === 1))) {
            addMessage = true
        }
        if (addMessage)
          thisChatMessages.push({id: res.id, time: r._time})

      })

      thisChatMessages.sort((a, b) => {
        return a.time - b.time
      })
    }

    if (!thisChatMessages  ||  !thisChatMessages.length)
      return null
    // if (isChatWithOrg  &&  !chatTo.name) {
    //   chatTo = list[chatId].value;
    // }
    let testMe = chatTo ? chatTo.me : null;
    if (testMe) {
      if (testMe === 'me') {
        if (!originalMe)
          originalMe = me;
        testMe = originalMe[ROOT_HASH];
      }

      isTest = true;
      let meId = utils.makeId(PROFILE, testMe)
      me = this._getItem(meId);
      this.setMe(me);
      let myIdentities = this._getItem(MY_IDENTITIES);
      if (myIdentities)
        myIdentities.currentIdentity = meId;
    }
    // let lastPL
    // let sharedWithTimePairs = []
    let from = params.from
    let isAllMessages = model.isInterface;
    let implementors = isAllMessages ? utils.getImplementors(modelName) : null;
    let isVerification = modelName === VERIFICATION  ||  model.subClassOf === VERIFICATION;

    let links = []
    let j
    if (lastId) {
      j = thisChatMessages.findIndex(({ id }) => id === lastId)
      if (j === thisChatMessages.length - 1)
        return
      j = isBacklinkProp ? j + 1 : j - 1
    }
    else
      j = isBacklinkProp ? 0 : thisChatMessages.length - 1

    let start = j
    let refs = []
    let all = {}
    if (isBacklinkProp) {
      for (let i=j; i<thisChatMessages.length; i++) {
        let type = utils.getType(thisChatMessages[i])
        let m = this.getModel(type)
        if (type !== modelName) {
          if (model.isInterface) {
            if (!m.interfaces  ||  m.interfaces.indexOf(modelName) === -1)
              continue
          }
          else if (m.subClassOf !== modelName)
            continue
        }
        if (isForm  &&  type === PRODUCT_REQUEST)
          continue
        this.addReferenceLink(thisChatMessages[i], links, all, refs)
        // addReferenceLink(thisChatMessages[i])
        if (limit  &&  links.length === limit)
          break
      }
    }
    else if (typeof lastId === 'undefined' || j) {
      for (let i=j; i>=0; i--) {
        let cMsg = thisChatMessages[i]
        if (isAllMessages) {
          if (implementors.indexOf(this.getModel(utils.getType(cMsg.id))) === -1)
            continue
        }
        else {
          let mType = utils.getType(cMsg)
          if (mType !== modelName  &&  this.getModel(mType).subClassOf !== modelName)
            continue
        }
        if (isChatWithOrg  &&  meOrgId === toOrgId) {
          let item = this._getItem(cMsg.id)
          if (item._originalSender  ||  item._forward)
            continue
        }
        this.addReferenceLink(cMsg, links, all, refs)
        // addReferenceLink(thisChatMessages[i])
        if (limit  &&  links.length === limit)
          break
      }
    }
    if (!links.length)
      return
    let allLinks
    if (refs.length) {
      allLinks = links.slice()
      refs.forEach((r) => {
        if (links.indexOf(r) === -1)
          allLinks.push(r)
      })
    }
    else
      allLinks = links

    let startTime = Date.now()
    let cnt = start
    let list = []
    let refsObj = {}

    return Promise.all(allLinks.map(link => {
      return this.handleOne({ link, links, all, isForgetting, refsObj, isBacklinkProp, refs, list, filterOutForms, foundResources, context, toOrgId, chatTo, chatId, prop, query, resource, to, isChooser })
      // return handleOne(r)
    }))
    .then((l) => {
      if (isBacklinkProp) {
        let l = list.filter((r) => {
          if (r.hasOwnProperty('_latest')  &&  !r._latest)
            return false
          if (links.indexOf(r[CUR_HASH]) === -1)
            return false
          if (r[TYPE] === VERIFICATION) {
            let d = refsObj[utils.getId(r.document)]
            if (d)
              r.document = d
          }
          this.addVisualProps(r)
          return true
        })
        return l
      }
      if (!foundResources.length)
        return

      foundResources.forEach((r) => {
        if (r[TYPE] === VERIFICATION)
          r.document = refsObj[utils.getId(r.document)] || r.document
        else if (r[TYPE] === FORM_ERROR) {
          let prefill = refsObj[utils.getId(r.prefill)]
          if (prefill)
            r.prefill = prefill
        }
        this.addVisualProps(r)
      })
      // Minor hack before we intro sort property here
      foundResources.sort((a, b) => a._time - b._time)
      let result = params._readOnly  &&  utils.isContext(modelName)
                 ? foundResources.filter((r) => utils.isReadOnlyChat(r)) //r._readOnly)
                 : foundResources

      // let result = params._readOnly  &&  modelName === PRODUCT_APPLICATION
      //            ? foundResources.filter((r) => utils.isReadOnlyChat(r)) //r._readOnly)
      //            : foundResources.reverse()
      if (result  &&  result.length  &&  isBacklinkProp  &&  modelName === FORM) {
        // Filter out the older versions of the resources
        return getFreshResources(result)
      }
      else
        return result
    })
    .catch((err) => {
      debugger
    })

    function getFreshResources(result) {
    // Filter out the older versions of the resources
      let rootHashes = []
      let newResult = result.reverse().filter((r) => {
        let ret = rootHashes.indexOf(r[ROOT_HASH]) === -1
        if (ret)
          rootHashes.push(r[ROOT_HASH])
        return ret
      })
      return newResult.reverse()
    }
  },

  // getCurHash(r) {
  //   if (r[CUR_HASH])
  //     return r[CUR_HASH]
  //   let l = this._getItem(r)
  //   if (l)
  //     return l[CUR_HASH]
  //   l = r.id.split('_')
  //   return l[l.length - 1]
  // },
  async onGetAllContexts(params) {
    if (me.isEmployee) {
      _.extend(params, {modelName: FORM_REQUEST})
      let list = await this.searchMessages(params)
      let contextIds = []
      let contexts = []
      let promisses = []
      list  &&  list.forEach((r) => {
        if (!r._context)  // FormRequest for ProductRequest
          return
        let cId = utils.getId(r._context)
        if (contextIds.indexOf(cId) !== -1)
          return
        contextIds.push(cId)
        if (r._context[ROOT_HASH]) {
          this.addVisualProps(r._context)
          contexts.push(r._context)
        }
        else {
          let c = this._getItem(cId)
          if (c)
            contexts.push(c)
          else
            promisses.push(this._getItemFromServer(cId))
        }
      })
      if (promisses.length) {
        let l = await Promise.all(promisses)
        l.forEach((r) => contexts.push(r))
      }
      contexts.sort((a, b) => b._time - a._time)
      this.trigger({action: 'allContexts', list: contexts, to: params.to})
    }
    else {
      _.extend(params, {modelName: PRODUCT_REQUEST})
      let list = await this.searchMessages(params)
      let l = list  &&  list.filter((r) => r._formsCount)
      this.trigger({action: 'allContexts', list: l.length && l || list, to: params.to})
    }
  },
  onHasPartials() {
    let list = this.searchNotMessages({modelName: PARTIAL})
    if (list.length)
      this.trigger({action: 'hasPartials', count: list.length})
  },
  async onHasBookmarks() {
    let list = await this.searchMessages({modelName: BOOKMARK, to: me })
    if (list  &&  list.length) {
      let style
      if (me.isEmployee) {
        let id = utils.getId(me.organization)
        style = this._getItem(id).style
      }
      this.trigger({action: 'hasBookmarks', count: list.length, bankStyle: style})
    }
  },
  onHasTestProviders() {
    const list = this.searchNotMessages({modelName: ORGANIZATION, isTest: true}) || []
    const testProviders = list.length  &&  list.filter((r) => r._isTest)
    if (testProviders.length) {
      this.trigger({action: 'hasTestProviders', list: testProviders})
    }
  },
  onGetAllPartials(resource) {
    let plist = this.searchNotMessages({modelName: PARTIAL})
    if (!plist.length)
      return

    let allContextsArr = plist.filter((r) => utils.isContext(r))
    let allContexts ={}
    allContextsArr.forEach((a) => allContexts[a.resource.id] = a)

    let providers = {}
    let owners = {}
    let allResources = {}
    plist.forEach((r) => {
      let pId = utils.getId(r.providerInfo)
      let stats = providers[pId]
      if (!stats) {
        stats = {
          openApps: {},
          completedApps: {},
          applications: [],
          formRequests: [],
          forms: [],
          formCorrections: [],
          verifications: [],
          formErrors: [],
          myProducts: [],
          providerInfo: r.providerInfo
        }
        providers[pId] = stats
      }
      let t = r.type || r.leaves.filter((prop) => prop.key === TYPE)[0].value
      let ownerId
      // in case of form request or form error the partial will have a bot as a sender
      // in this case we need to check the context to see who those requests were sent to
      let owner
      if (t !== FORM_REQUEST  &&  t !== FORM_ERROR) {
        ownerId = r.from.id
        owner = r.from
      }
      else {
        let pa = allContexts[utils.makeId(PRODUCT_REQUEST, r.context)]
        owner = pa ? pa.from : r.from
        ownerId = owner.id
      }
      if (!owners[pId])
        owners[pId] = {}
      let providerCustomerStats = owners[pId][ownerId]
      if (!providerCustomerStats) {
        providerCustomerStats = {
          owner: owner,
          openApps: {},
          completedApps: {},
          applications: [],
          formRequests: [],
          forms: [],
          formCorrections: [],
          verifications: [],
          formErrors: [],
          myProducts: [],
          providerInfo: r.providerInfo
        }
        owners[pId][ownerId] = providerCustomerStats
      }

      let l = r.leaves

      allResources[r.resource.id] = r

      switch (t) {
      case FORM_REQUEST:
        stats.formRequests.push(r)
        providerCustomerStats.formRequests.push(r)
        break
      case FORM_ERROR:
        stats.formErrors.push(r)
        providerCustomerStats.formErrors.push(r)
        break
      case VERIFICATION:
        stats.verifications.push(r)
        providerCustomerStats.verifications.push(r)
        break
      case PRODUCT_REQUEST:
        let product = l.filter((prop) => prop.key === 'requestFor')[0].value
        if (this.getModel(product)) {
          stats.applications.push({productType: product, product: r})
          providerCustomerStats.applications.push({productType: product, product: r})
        }
        break
      default:
        if (this.getModel(t).subClassOf === MY_PRODUCT) {
          stats.myProducts.push({[t] : r})
          providerCustomerStats.myProducts.push(r)
        }
        else {
          let id = r.resource.id.split('_')
          if (id.length === 2  ||  id[1] === id[2]) {
            stats.forms.push(r)
            providerCustomerStats.forms.push(r)
          }
          else {
            stats.formCorrections.push(r)
            providerCustomerStats.formCorrections.push(r)
          }
        }
      }
    })
    for (let p in providers) {
      providers[p].verifications.forEach((v) => {
        let docId = v.leaves.filter((prop) => prop.key === 'document')[0].value.id
        // HACK till modified forms paritals fixed
        if (allResources[docId]) {
          let docOwner = allResources[docId].from.id
          owners[p][docOwner].verifications.push(v)
        }
      })
    }

    for (let p in owners) {
      let o = owners[p]
      let pruned = {}
      for (let r in o) {
        if (o[r].applications.length)
          pruned[r] = o[r]
      }
      owners[p] = pruned
    }
    let self = this
    // provider customers per product stats
    for (let pc in owners) {
      let providerCustomers = owners[pc]
      for (let p in providerCustomers) {
        let customer = providerCustomers[p]
        let allPerApp = []
        customer.allPerApp = allPerApp
        customer.applications.forEach((a) => {
          let allStats = {
            app: a,
            product: a.productType,
            forms: [],
            formErrors: [],
            verifications: [],
            formCorrections: [],
            formRequests: []
          }
          allPerApp.push(allStats)
          let formModels = this.getModel(a.productType).forms
          let productContext = a.product.context
          customer.forms.forEach((f) => {
            if (productContext === f.context)
              allStats.forms.push(f)
            // let formType = f.leaves.find(l => l.key === TYPE && l.value).value
            // if (formModels.indexOf(formType) !== -1)
            //   allStats.forms.push(f)
          })
          customer.formCorrections.forEach((f) => {
            if (productContext === f.context)
              allStats.formCorrections.push(f)
            // let formType = f.leaves.find(l => l.key === TYPE && l.value).value
            // if (formModels.indexOf(formType) !== -1)
            //   allStats.formCorrections.push(f)
          })
          customer.verifications.forEach((f) => {
            if (productContext === f.context)
              allStats.verifications.push(f)
            // let doc = v.leaves.find(l => l.key === 'document' && l.value).value
            // if (formModels.indexOf(doc.id.split('_')[0]) !== -1)
            //   allStats.verifications.push(v)
          })
          customer.formRequests.forEach((f) => {
            if (productContext === f.context)
              allStats.formRequests.push(f)
            // let forRequestType = f.leaves.find(l => l.key === 'product' && l.value).value
            // if (forRequestType === a.productType)
            //   allStats.formRequests.push(f)
          })
          customer.formErrors.forEach((f) => {
            if (productContext === f.context)
              allStats.formErrors.push(f)
            // let forRequestType = f.leaves.find(l => l.key === 'product' && l.value).value
            // if (forRequestType === a.productType)
            //   allStats.formErrors.push(f)
          })
        })
      }
      getProviderPerCustomerPerProductStats(providers[pc], providerCustomers, resource)
    }

    for (let p in providers) {
      let stats = providers[p]
      let pId = stats.providerInfo.id
      let apps = stats.applications
      apps.forEach((a) => {
        let product = a.productType
        let forms = this.getModel(product).forms
        let ownerId = a.product.from.id
        let uniqueVerifications = {}
        let verifications = owners[pId][ownerId].verifications
        verifications.forEach((v) => {
          let doc = v.leaves.filter((prop) => prop.key === 'document')[0].value.id
          let docType = doc.split('_')[0]
          // if (!owners[pId][ownerId].forms)
          //   return
          // if (!allResources[doc]  ||  allResources[doc].from.id !== ownerId)
          //   return
          if (forms.indexOf(docType) !== -1) {
            if (!uniqueVerifications[docType])
              uniqueVerifications[docType] = v
          }
        })
        if (Object.keys(uniqueVerifications).length === forms.length) {
          if (verifications.length) {
            verifications.sort((a, b) => a._time - b._time)

            owners[pId][ownerId].completedApps[product] = verifications[verifications.length - 1]._time
            if (!stats.completedApps[product])
              stats.completedApps[product] = 1
            else
              stats.completedApps[product]++
          }
        }
        else {
          if (!stats.openApps[product])
            stats.openApps[product] = 1
          else
            stats.openApps[product]++
        }
      })
    }
    this.trigger({action: 'allPartials', list: plist, stats: Object.values(providers), owners: owners })

    function getProviderPerCustomerPerProductStats(provider, providerCustomers, resource) {
      provider.applications.forEach((a) => {
        for (let p in providerCustomers) {
          let app = providerCustomers[p]
          app.allPerApp.forEach((appProps) => {
            appProps.stats = {}
            let appStats = appProps.stats[appProps.product] = {
              product: appProps.product,
              formErrors: appProps.formErrors.length,
              formCorrections: appProps.formCorrections.length,
              verifications: appProps.verifications.length,
              forms: appProps.forms.length
            }
            if (!resource || resource.providerInfo.id !== provider.providerInfo.id)
              return

            let m = self.getModel(appProps.product)
            let t = resource.leaves.filter((prop) => prop.key === TYPE)[0].value
            if (t !== VERIFICATION  &&  resource.from.id !== p)
              return
            if (m.forms.indexOf(t) === -1  &&  t !== VERIFICATION)
              return
            switch (t) {
            case FORM_REQUEST:
              appStats.changed = 'formRequests'
              break
            case FORM_ERROR:
              appStats.changed = 'formErrors'
              break
            case VERIFICATION:
              let docId = resource.leaves.filter((prop) => prop.key === 'document')[0].value.id
              let docType = docId.split('_')[0]
              if (m.forms.indexOf(docType)  !== -1) {
                app.allPerApp.forEach((a) => {
                  a.forms.forEach((f) => {
                    if (f.resource.id === docId)
                      appStats.changed = 'verifications'
                  })
                })
              }
              break
            case PRODUCT_REQUEST:
              appStats.changed = 'productApplications'
              break
            default:
              if (self.getModel(t).subClassOf === MY_PRODUCT)
                appStats.changed = 'myProducts'
              else
                appStats.changed = 'forms'
            }
          })
        }
      })
    }
  },
  onGetAllSharedContexts() {
    Q.all([this._loadedResourcesDefer])
    .then(() => {
      let list = this.getAllSharedContexts()
      if (!list)
        return
      this.trigger({action: 'allSharedContexts', count: list.length, list: list})
    })
  },
  inContext(r, context) {
    return r._context && utils.getId(r._context) === utils.getId(context)
  },
  getSearchResult(result) {
    return result.map((r) => {
      return r.value
    })
  },

  fillMessage(r) {
    return r

    let resource = {};
    _.extend(resource, r);
    if (!r.verifications  ||  !r.verifications.length)
      return resource;
    for (var i=0; i<resource.verifications.length; i++) {
      var v = resource.verifications[i];
      var vId = utils.getId(v)
      var ver = {};
      _.extend(ver, this._getItem(vId));
      resource.verifications[i] = ver;
      if (ver.organization  &&  !ver.organization.photos) {
        var orgPhotos = this._getItem(utils.getId(ver.organization.id)).photos;
        if (orgPhotos)
          ver.organization.photo = orgPhotos[0].url;
      }
      // resource._time = ver._time;
    }
    return resource;
  },
  async onListMultientry({formRequest, to, context, filter}) {
    let shareables = await this.getShareableResources({filter, foundResources: [formRequest], to, context: context  ||  formRequest.context})
    let multientryResources = shareables.multientryResources
    let list
    if (multientryResources) {
      // multientryResources
      multientryResources = multientryResources[formRequest.form]
      if (multientryResources)
        list = multientryResources.map((r) => r.document)
    }

    this.trigger({action: 'multiEntryList', list})
  },
  // Gathers resources that were created on this official account to figure out if the
  // customer has some other official accounts where he already submitted this information
  async getShareableResources(params) {
    let {foundResources, to, context, filter} = params
    if (!foundResources)
      return
    if (me.isEmployee)
      return await this.getShareableResourcesForEmployee(params)
    var shareType, formRequest
    var meId = utils.getId(me)
    var simpleLinkMessages = {}
    var meId = utils.getId(utils.getMe())

    var hasVerifiers = []
    let formToProduct = {}
    for (var i=foundResources.length - 1; i>=0  &&  !shareType; i--) {
      var r = foundResources[i]
      if (me  &&  utils.getId(r.to) !== meId  &&  utils.getId(r.from) !== meId)
        continue;
      // documentCreated identifier is set when the document of this type was created
      // and we don't want to create it again from this same notification
      if (r[TYPE] !== FORM_REQUEST  ||  r._documentCreated  ||  r.form === PRODUCT_REQUEST)
        continue;
      if (utils.getId(r.to)  !==  meId)
        continue
      let rr = simpleLinkMessages[r.form]
      if (rr) {
        rr._documentCreated = true
        this._getItem(utils.getId(rr))._documentCreated = true
        continue
      }
      simpleLinkMessages[r.form] = r
      var msgModel = this.getModel(r.form);

      if (!shareType                          &&
          msgModel                            &&
          msgModel.subClassOf !== MY_PRODUCT  &&
          !msgModel.notShareable              &&
          !utils.isContext(msgModel)) {
        shareType = msgModel.id
        formRequest = r
        formToProduct[msgModel.id] = r.product
        if (r.verifiers)
          hasVerifiers[msgModel.id] = r.verifiers
      }
    }
    var shareableResources = {};
    var shareableResourcesRootToR = {}
    var shareableResourcesRootToOrgs = {}

    var isOrg = to  &&  to[TYPE] === ORGANIZATION
    var org = isOrg ? to : (to.organization ? this._getItem(utils.getId(to.organization)) : null)
    var reps = isOrg ? this.getRepresentatives(org) : [utils.getId(to)]
    var self = this

    var productsToShare = await this.searchSharables({modelName: MY_PRODUCT, to: utils.getMe(), strict: true })
    if (productsToShare  &&   productsToShare.length) {
      productsToShare.forEach((r) => {
        let fromId = utils.getId(r.from)
        if (r._sharedWith) {
          let sw = r._sharedWith.filter((r) => {
            if (reps.filter((rep) => {
                    if (utils.getId(rep) === r.bankRepresentative)
                      return true
                  }).length)
              return true
          })
          if (sw.length)
            return
        }
        if (shareableResourcesRootToR[r[ROOT_HASH]]) {
          let arr = shareableResources[r[TYPE]]
          let skip
          for (let i=0; i<arr.length  &&  !skip; i++) {
            if (r[ROOT_HASH] === rr[ROOT_HASH]) {
              if (r._time < rr._time)
                skip = true
              else
                arr.splice(i, 1)
            }
          }
          if (skip)
            return
        }
        let rr = {
          [TYPE]: VERIFICATION,
          document: r,
          organization: this._getItem(utils.getId(r.from)).organization
        }

        this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
      })
    }
    if (!shareType)
      return {verifications: shareableResources}
    let toId = utils.getId(to)
    let l = await this.searchSharables({modelName: VERIFICATION, filterResource: {[TYPE]: shareType}})
    // if (!l)
    //   return
    let verifiedShares = {}
    if (l) {
      l.forEach((val) => {
        checkOneVerification(val)
        verifiedShares[utils.getId(val.document)] = val
      })
    }
    // Allow sharing non-verified forms
    let curContext = context || await this.getCurrentContext(to)
    if (hasVerifiers  &&  hasVerifiers[shareType])
      return
    let verModel = this.getModel(shareType)
    let result = await this.searchSharables({modelName: shareType}) //, context: shareType === LEGAL_ENTITY ? formRequest._context : null})
    let promises = []
    if (result) {
      if (shareType === LEGAL_ENTITY)
        result.forEach((r) => promises.push(this.onGetItem({resource: r, noTrigger: true, backlink: verModel.properties.ownersOfThisEntity})))

      if (promises.length)
        result = await Promise.all(promises)
      result.forEach((r) => {
        if (r.verificationsCount)
          return
        if (verifiedShares[utils.getId(r)])
          return
        if (shareType === LEGAL_ENTITY  &&  r.ownersOfThisEntity  &&  r.ownersOfThisEntity.length)
          return
        if (this.checkIfWasShared(r, to))
          return
        if (filter  &&  utils.getDisplayName(r).indexOf(filter) === -1)
          return
        if (!curContext  ||  (r._context  &&  utils.getId(curContext) !== utils.getId(r._context))) {
          let rr = {
            [TYPE]: VERIFICATION,
            document: r,
            organization: this._getItem(utils.getId(r.to)).organization
          }
          this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
        }
      })
    }
    let multientryResources = shareableResources  &&  this.getMultiEntriesToShare(shareableResources, formToProduct)
    return {verifications: shareableResources, multientryResources: multientryResources, providers: shareableResourcesRootToOrgs}
    function checkOneVerification(val) {
      let id = utils.getId(val.to.id);

      var doc = val.document
      var docType = utils.getType(doc) //(doc.id && doc.id.split('_')[0]) || doc[TYPE];
      if (shareType  !== docType)
        return;
      // Filter out the verification from the same company
      // var fromId = utils.getId(val.from)
      // var fromOrgId = utils.getId(self._getItem(fromId).organization)
      // if (fromOrgId === toId)
      //   return
      var document = doc.id ? self._getItem(utils.getId(doc.id)) : doc;
      if (!document  ||  document._inactive)
        return;

      if (self.checkIfWasShared(document, to))
        return
      // Check if there is at least one verification by the listed in FormRequest verifiers
      if (hasVerifiers  &&  hasVerifiers[docType]) {
        let verifiers = hasVerifiers[docType]
        let foundVerifiedForm
        verifiers.forEach((v) => {
          let provider = SERVICE_PROVIDERS.filter((sp) => sp.id === v.id  &&  utils.urlsEqual(sp.url, v.url))
          if (!provider.length)
            return
          let spReps = self.getRepresentatives(provider[0].org)
          let sw = val._sharedWith.filter((r) => {
            return spReps.some((rep) => utils.getId(rep) === r.bankRepresentative)
          })
          if (sw.length)
            foundVerifiedForm = true
        })
        if (!foundVerifiedForm)
          return
      }

      var value = {};
      _.extend(value, val);
      value.document = document;

      self.addVisualProps(value)
      self.addAndCheckShareable(value, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
    }
  },

  async getShareableResourcesForEmployee(params) {
    let {foundResources, to, context} = params
    if (!foundResources)
      return
    if (context) {
      if (context._appSubmitted)
        return
      let appSubmitted = await this.searchServer({modelName: APPLICATION_SUBMITTED, filterResource: {context: context.contextId}, search: me.isEmployee, noTrigger: true })
      if (appSubmitted  &&  appSubmitted.list  &&  appSubmitted.list.length)
        return
    }
    let shareType, formRequest
    let simpleLinkMessages = {}
    let meId = utils.getId(me)
    let repId, myRep
    if (me.isEmployee) {
      myRep = this.getRepresentative(me.organization)
      repId = myRep[ROOT_HASH]
    }

    let hasVerifiers = []
    let formToProduct = {}
    let contexts = {}
    let toR = (to.organization  &&  this._getItem(to.organization)) || to
    let myBot = this.getRepresentative(me.organization)
    let myBotId = utils.getId(myBot)
    let contextToId = {}
    for (let i=foundResources.length-1; i>=0; i--) {
      let r = foundResources[i]
      if (utils.getId(r.to) !== meId     &&
          utils.getId(r.from) !== meId   &&
          utils.getId(r.to) !== myBotId  &&
          utils.getId(r.from) !== myBotId)
        continue;

      if (r[TYPE] !== FORM_REQUEST  ||  r._documentCreated  ||  r.form === PRODUCT_REQUEST)
        continue;
      // if (utils.getId(r.to)  !==  meId)
      //   continue
      let rr = simpleLinkMessages[r.form]
      if (rr) {
        rr._documentCreated = true
        this._getItem(utils.getId(rr))._documentCreated = true
        continue
      }
      simpleLinkMessages[r.form] = r
      let msgModel = this.getModel(r.form);
      if (msgModel  &&
          msgModel.subClassOf !== MY_PRODUCT  &&
          !msgModel.notShareable              &&
          !utils.isContext(msgModel)) {
        let productModel = this.getModel(r.product)
        if (!productModel)
          continue

        if (!r._context  &&  r[TYPE] === FORM_REQUEST) {
          let c = contexts[r.context]
          if (!c)
            c = await this.getContext(r.context, r)
          if (!c)
            continue
          contexts[utils.getId(c)] = c
          r._context = c
        }

        let res = await this.searchServer({modelName: MESSAGE, filterResource: {_payloadType: r.form}, to: toR, search: me.isEmployee, context: r._context, noTrigger: true })
        contexts[utils.getId(r._context)] = r._context

        if (!shareType) {
          shareType = msgModel.id
          formRequest = r
        }
        formToProduct[msgModel.id] = r.product
        if (r.verifiers)
          hasVerifiers[msgModel.id] = r.verifiers
      }
    }
    if (!shareType)
      return {verifications: shareableResources}
    let shareableResources = {};
    let shareableResourcesRootToR = {}
    let shareableResourcesRootToOrgs = {}

    let isOrg = to  &&  to[TYPE] === ORGANIZATION
    let org = isOrg ? to : (to.organization ? this._getItem(utils.getId(to.organization)) : null)
    let reps = isOrg ? this.getRepresentatives(org) : [utils.getId(to)]
    let self = this

    // Allow sharing non-verified forms
    // let context = await this.getCurrentContext(to)
    let typeToDocs = {}
    let docs = []

    if (hasVerifiers  &&  hasVerifiers[shareType])
      return
    let ll = await this.searchSharables({
      modelName: shareType,
      filterResource: {_org: myRep[CUR_HASH]},
      noTrigger: true,
    })

    if (!ll  ||  !ll.list  ||  !ll.list.length)
      return

    // Don't share forms from the same context
    let submittedForms = await this.searchServer({
      modelName: MESSAGE,
      context: {contextId: formRequest.context},
      noTrigger: true,
      filterResource: {
        _payloadType: shareType,
        _inbound: false
      }
    })
    let excludeForms = {}
    if (submittedForms  &&  submittedForms.list)
      submittedForms.list.forEach(r => excludeForms[utils.getId(r)] = r)

    let formList =  ll.list.filter((r) => {
      let dId = utils.getId(r)
      if (excludeForms[dId])
        return false
      docs.push(dId)
      return true
    })
    let promises = []
    if (shareType === LEGAL_ENTITY) {
      let m = this.getModel(LEGAL_ENTITY)
      formList.forEach((r) => promises.push(this.onGetItem({resource: r, noTrigger: true, search: true, backlink: m.properties.ownersOfThisEntity})))
      let result = await Promise.all(promises)
      let l = {}
      result.forEach(r => {
        if (!r.ownersOfThisEntity  ||  !r.ownersOfThisEntity.length)
          l[r[ROOT_HASH]] = r
      })
      let filteredFormList = formList.filter((r) => l[r[ROOT_HASH]])
      formList = filteredFormList
    }
    typeToDocs[shareType] = formList
    if (!docs.length)
      return

    let toId = utils.getId(to)
    // let l = await this.searchMessages({modelName: VERIFICATION, search: me.isEmployee})
    let result = await this.searchSharables({modelName: VERIFICATION, filterResource: {document: docs}, properties: ['document'], noTrigger: true,})
    let verifiedShares ={}
    if (result  &&  result.list) {
      let rep
      if (me.isEmployee) {
        let representative = this.getRepresentative(me.organization)
        rep = utils.getId(representative)
      }
      let contextId = context && utils.getId(context)

      let l = result.list
      l.forEach((val) => {
        checkOneVerification(val, contextId)
        verifiedShares[utils.getId(val.document)] = val
      })
    }
    for (let t in typeToDocs) {
      let list = typeToDocs[t]

      list.forEach((d) => {
        if (verifiedShares[utils.getId(d)])
          return
        let rr = {
          [TYPE]: VERIFICATION,
          document: d,
          organization: this._getItem(utils.getId(d.from)).organization
        }
        this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
      })
    }

    let multientryResources = shareableResources  &&  this.getMultiEntriesToShare(shareableResources, formToProduct)
    return {verifications: shareableResources, multientryResources: multientryResources, providers: shareableResourcesRootToOrgs}
    function checkOneVerification(val, contextId) {
      let id = utils.getId(val.to.id);
      if (id !== meId) {
        if (me.isEmployee  &&  id !== utils.getId(myRep))
          return
      }
      let frId = utils.getId(val.from.id)
      let fr = self._getItem(frId)
      if (!fr)
        return

      let doc = val.document
      let docType = utils.getType(doc) // (doc.id && doc.id.split('_')[0]) || doc[TYPE];
      if (shareType !== docType)
        return;
      // Filter out the verification from the same company
      // let fromId = utils.getId(val.from)
      // let fromOrgId = utils.getId(self._getItem(fromId).organization)
      // if (fromOrgId === toId)
      //   return
      let document = typeToDocs[docType].filter((d) => utils.getId(d) === doc.id)[0]
      if (!document)
        return
      if (context  &&  document._context) {
        if (utils.getId(context) === contextId)
          return
      }
      // // let document = doc.id ? self._getItem(utils.getId(doc.id)) : doc;
      // // if (!document  ||  document._inactive)
      // //   return;

      // if (self.checkIfWasShared(document, to))
      //   return
      // Check if there is at least one verification by the listed in FormRequest verifiers
      if (hasVerifiers  &&  hasVerifiers[docType]) {
        let verifiers = hasVerifiers[docType]
        let foundVerifiedForm
        verifiers.forEach((v) => {
          let provider = SERVICE_PROVIDERS.filter((sp) => sp.id === v.id  &&  utils.urlsEqual(sp.url, v.url))
          if (!provider.length)
            return
          let spReps = self.getRepresentatives(provider[0].org)
          let sw = val._sharedWith.filter((r) => {
            return spReps.some((rep) => utils.getId(rep) === r.bankRepresentative)
          })
          if (sw.length)
            foundVerifiedForm = true
        })
        if (!foundVerifiedForm)
          return
      }
      let value = {};
      _.extend(value, val);
      value.document = document;

      self.addVisualProps(value)
      return self.addAndCheckShareable(value, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
    }
  },
  getMultiEntriesToShare(shareableResources, formToProduct) {
    let multientryResources = {}
    for (let t in shareableResources) {
      let docs = shareableResources[t]
      // let rm = []
      docs.forEach((ver, i) => {
        let doc = ver.document
        let requestFor = formToProduct[t]
        if (!requestFor)
          return
        let multiEntryForms = this.getModel(requestFor).multiEntryForms
        if (!multiEntryForms || multiEntryForms.indexOf(t) === -1)
          return
        let meContexts = multientryResources[t]
        if (!meContexts) {
          meContexts = []
          multientryResources[t] = meContexts
        }
        meContexts.push(ver)

        // let c = doc._context
        // if (!c) {
        //   // let context = this.searchServer({modelName: MESSAGE, filterResource: {_payloadType: doc[TYPE], object___link: doc[CUR_HASH]}})
        //   return
        // }
        // let cId = utils.getId(c)
        // let meContexts = multientryResources[t]
        // if (!meContexts) {
        //   meContexts = {}
        //   multientryResources[t] = meContexts
        // }
        // if (!meContexts[cId])
        //   meContexts[cId] = []
        // meContexts[cId].push(ver)
        // meContexts.push(ver)
        // rm.push[i]
      })
      // if (rm) {
      //   for (let i=rm.length - 1; i>=0; i--)
      //     docs.splice(rm[i], 1)
      // }
    }
    return multientryResources
  },
  checkIfWasShared(document, to) {
    let toId
    if (utils.getType(to) === PROFILE)
      toId = utils.getId(to.organization)
    else
      toId = utils.getId(to)
    if (document._sharedWith) {
      if (document._sharedWith.some((r) => {
        let org = this._getItem(r.bankRepresentative).organization
        return org  &&  utils.getId(org) === toId
      }))
        return true
    }
  },
  // Allow sharing only the last version of the resource
  addAndCheckShareable(verification, to, shareables) {
    let { shareableResources, shareableResourcesRootToR } = shareables
    let r = verification.document

    let docType = r[TYPE]
    let docModel = this.getModel(docType)
    let isMyProduct = docModel.subClassOf === MY_PRODUCT
    let isItem = utils.isSavedItem(r)
    // Allow sharing only of resources that were filled out by me
    if (!isMyProduct) {
      let fromId = utils.getId(r.from)
      if (fromId !== utils.getId(me)) {
        if (!me.isEmployee)
          return
        else {
          let rep = this.getRepresentative(me.organization)
          if (rep  &&  utils.getId(rep) !== fromId)
            return
        }
      }
    }
    if (to[TYPE] === ORGANIZATION  &&  !to._isTest) {
      let rToOrg = r.to.organization
      if (rToOrg) {
        if (this._getItem(rToOrg)._isTest)
          return
      }
    }

    var v = shareableResources[docType];
    if (!v)
      shareableResources[docType] = [];
    else if (verification.from  &&   shareableResourcesRootToR[r[ROOT_HASH]]) {
      let arr = shareableResources[r[TYPE]]
      let vFromId = utils.getId(verification.from)
      for (let i=0; i<arr.length; i++) {
        let rr = arr[i].document
        if (r[ROOT_HASH] === rr[ROOT_HASH]) {
          // if (utils.getId(arr[i].from) === vFromId) {
            if (r._time < rr._time) {
              this.addSharedWithProvider(verification, shareables)
              return
            }
            else
              arr.splice(i, 1)
          // }
        }
      }
    }
    // Check that this is not the resource that was send to me as to an employee
    let meId = utils.getId(me)
    if (utils.getId(r.to) !== meId  ||  isMyProduct  ||  isItem) {
      // Don't add this verification if it's for a previous copy of the document
      // If the this is the newer copy remove the older and push this one
      if (shareableResources[docType].length) {
        let sr = shareableResources[docType]
        for (let i=0; i<sr.length; i++) {
          let d = sr[i].document
          if (d[ROOT_HASH] !== r[ROOT_HASH])
            continue
          // Don't add the verification for teh previous copy of the document
          if (!r[PREV_HASH] || d[PREV_HASH] === r[CUR_HASH])
            return
          if (r[PREV_HASH] === d[CUR_HASH]) {
            sr.splice(i, 1)
            break
          }
        }
      }
      shareableResources[docType].push(verification)
      shareableResourcesRootToR[r[ROOT_HASH]] = r
      this.addSharedWithProvider(verification, shareables)
      return true
    }
  },
  addSharedWithProvider(verification, shareables) {
    let {
      shareableResources,
      shareableResourcesRootToR,
      shareableResourcesRootToOrgs
    } = shareables
    let hash = verification.document[ROOT_HASH]
    let o = shareableResourcesRootToOrgs[hash]
    if (!o) {
      o = []
      shareableResourcesRootToOrgs[hash] = o
    }
    else {
      let org = verification.organization
      if (!org) {
        if (verification._verifiedBy)
          org = verification._verifiedBy
        else {
          let rep = this._getItem(verification.from)
          org = rep && rep.organization
        }
      }

      let oId = utils.getId(org)
      let oo = o.filter((r) => utils.getId(r) === oId)
      if (oo.length)
        return
    }
    o.push(verification.organization)
  },
  async searchSharables(params) {
    let { modelName, search } = params
    if (!me.isEmployee)
      return await this.searchMessages(params)
    _.extend(params, {noTrigger: true, search: me.isEmployee})
    let model = this.getModel(modelName)
    if (me.isEmployee  &&  model.id !== PROFILE  &&  model.id !== ORGANIZATION) {
      // LEGAL ENTITY
      // if (modelName === 'tradle.LegalEntity')
      return await this.searchServer(params)
    }
  },

  getNonce() {
    return crypto.randomBytes(32).toString('hex')
  },
  async _putResourceInDB(params) {
    var {modelName, isRegistration, noTrigger, dhtKey, maxAttempts, lens, prop} = params
    var value = params.resource
    // Cleanup null form values
    for (let p in value) {
      if (!value[p]  &&  (typeof value[p] === 'undefined'))
        delete value[p];
    }
    if (!value[TYPE])
      value[TYPE] = modelName;

    var model = this.getModel(modelName)
    var props = model.properties;
    var newLanguage

    var isMessage = utils.isMessage(value)
    var originalR = list[utils.getId(value)]
    var isNew = (isMessage  &&  value[ROOT_HASH] === value[CUR_HASH]) || (!isMessage  &&  !originalR)
    if (value[TYPE] === SETTINGS) {
      if (isNew) {
        if (SERVICE_PROVIDERS_BASE_URL_DEFAULTS.includes(value.url))
          isNew = false
        else {
          value[ROOT_HASH] = 1
          value[CUR_HASH] = 1
        }
      }
    }
    else if (isNew)
      value[CUR_HASH] = dhtKey //isNew ? dhtKey : value[ROOT_HASH]

    let isInMyData = isMessage &&  utils.isSavedItem(value)
    var batch = [];
    value._time = value._time || new Date().getTime();
    let isForm = model.subClassOf === FORM
    if (isMessage) {
      if (/*isNew  &&*/  isForm  &&  !isInMyData) {
        if (!value._sharedWith)
          value._sharedWith = []
        this.addSharedWith(value, value.to, value._time, value._time, lens)
      }
      // if (isNew)
      //   this.addVisualProps(value)
      if (!isNew  &&  !isForm) {
        let prevRes = list[utils.makeId(value[TYPE], value[ROOT_HASH], value[PREV_HASH])]
        if (prevRes) {
          prevRes = prevRes.value
          prevRes[NEXT_HASH] = value[CUR_HASH]
          this.dbBatchPut(utils.getId(prevRes), prevRes, batch)
        }
      }

      if (props['to']  &&  props['from'])
        this.addLastMessage(value, batch)
    }
    else if (model.id === ORGANIZATION) {
      // Avoid race condition and update provider state ASAP
      let org = this._getItem(value)
      if ((!org._noTour  &&  value._noTour) ||  (!org._noSplash  &&  value._noSplash)) {
        this.trigger({action: 'addItem', resource: value})
        noTrigger = true
      }
    }
    var iKey = utils.getId(value) //modelName + '_' + value[ROOT_HASH];
    this.dbBatchPut(iKey, value, batch);

    var mid;

    if (isRegistration) {
      let sample = utils.clone(sampleProfile)
      _.extend(sample, value)
      value = sample
      return this.registration(value)
    }

    if (value[TYPE] === SETTINGS)
      return await this.addSettings(value, maxAttempts ? maxAttempts : 1, true)

    let meId = utils.getId(me)
    if (isMessage  &&  isNew) {
      if (isForm)
        this.addLastMessage(value, batch)
      this.addBacklinksTo(ADD, me, value, batch)
      if (value[TYPE] === SELFIE) {
        me = utils.clone(me)
        if (!me.photos)
          me.photos = []
        else (me.photos.length === 1  &&  me.photos[0].url === sampleProfile.photos[0].url)
          me.photos = []

        me.photos.push(utils.clone(value.selfie))
        this.dbBatchPut(meId, me, batch)
        this._setItem(meId, me)
      }
      this.setMe(me)
      if (!noTrigger)
        this.trigger({action: 'addItem', resource: me})

      let toR = utils.getId(value.from) === meId
              ? this._getItem(value.to)
              : this._getItem(value.from)
      if (toR.organization) {
        this.addVisualProps(value)
        this.addBacklinksTo(ADD, this._getItem(toR.organization), value, batch)
      }
    }
    if (iKey === meId) {
      if (!value.photos  ||  !value.photos.length)
        value.photos = utils.clone(sampleProfile.photos)
    }

    let self = this
    try {
      await db.batch(batch)
      // let value = await db.get(iKey)

      if (isMessage) {
        let r = this.addVisualProps(value)
        if (r === value)
          r = value
      }
      this._setItem(iKey, value)
      if (isMessage  &&  !isInMyData) {
        let toId = utils.getId(value.to)
        if (toId === meId)
          toId = utils.getId(value.from)
        if (value[NOT_CHAT_ITEM]  ||  (value.to.organization  &&  value.from.organization  &&  utils.getId(value.to.organization)  !== utils.getId(value.from.organization))) {
          let org = this._getItem(toId).organization
          this.addMessagesToChat(utils.getId(org), value)
        }
        else if (value._context  &&  utils.isReadOnlyChat(value._context))
          this.addMessagesToChat(utils.getId(value._context), value)

      }
      if (!isNew  &&  iKey === meId) {
        if (me.language || value.language) {
          if (value.language) {
            if (!me.language  ||  (utils.getId(me.language) !== utils.getId(value.language)))
              newLanguage = this._getItem(utils.getId(value.language))
          }
        }

        Object.assign(me, value)
        // extend(me, value)
        this.setMe(me)
        if (newLanguage) {
          let lang = this._getItem(utils.getId(me.language))
          value.languageCode = lang.code
          this.dbPut(iKey, value)

          me.language = lang
          me.languageCode = lang.code
          this.setMe(me)
          var urls = []
          // if (SERVICE_PROVIDERS.length) {
          SERVICE_PROVIDERS.forEach((sp) => {
            if (urls.indexOf(sp.url) === -1)
              urls.push(sp.url)
          })
          await this.getInfo({serverUrls: urls})
          // }
        }
      }
      let contact
      if (isMessage) { //  &&  value[TYPE] === NAME) {
        contact = this._getItem(value.from)
        if (!contact.bot)
          contact = await this.changeName(value, contact)
      }
      if (contact)
        this.trigger({action: 'addItem', resource: contact})

      var  triggerParams = {action: newLanguage ? 'languageChange' : 'addItem', resource: value};
      // registration or profile editing
      if (!noTrigger) {
        this.trigger(triggerParams);
      }
      // if (utils.isItem(model)) {
      let cObj = getContainerProp(model)
      if (cObj  &&  cObj.length === 1) {
        let { container, item } = cObj[0]
        if (container  &&  value[container.name]) {
          let iId = utils.getId(value[container.name])
          let cRes = this._getItem(iId)
          if (!cRes)
            cRes = await this._getItemFromServer(iId)
          this.onExploreBacklink(cRes, item, true)
        }
      }
      if (model.subClassOf === FORM) {
        // let mlist = this.searchMessages({modelName: FORM})
        let olist = this.searchNotMessages({modelName: ORGANIZATION})
        this.trigger({action: 'list', modelName: ORGANIZATION, list: olist, forceUpdate: true})
      }
    } catch(err)  {
      debugger
      if (!noTrigger) {
        this.trigger({action: 'addItem', error: err.message, resource: value})
      }
      err = err;
    }
    function getContainerProp(model) {
      let props = model.properties
      let refProps = utils.getPropertiesWithAnnotation(model, 'ref')
      let cObj = []
      for (let p in refProps) {
        let l = props[p]
        let container = self.getModel(l.ref)
        // if (!utils.isMessage(container))
        //   continue
        let cProps = container.properties
        let containerBl = utils.getPropertiesWithAnnotation(container, 'items')
        for (let c in containerBl)  {
          if (cProps[c].allowToAdd  &&  cProps[c].items.ref === model.id)
            cObj.push({container: props[p], item: cProps[c]})
        }
      }
      return cObj
    }
  },
  addLastMessage(value, batch, sharedWith) {
    let model = this.getModel(value[TYPE])

    let exclude = [CUSTOMER_WAITING, SELF_INTRODUCTION, SEAL, MODELS_PACK, STYLES_PACK]
    if (exclude.includes(model.id))
      return
    if (model.id === SIMPLE_MESSAGE  &&  value.message  && value.message === ALREADY_PUBLISHED_MESSAGE)
      return
    if (value._context  &&  utils.isReadOnlyChat(value._context))
      return

    let to = this._getItem(utils.getId(value.to));
    let toId = utils.getId(to)
    if (toId !== meId  &&  to.bot)
      to = this._getItem(utils.getId(to.organization))

    let dn
    let messageType = model.id
    if (sharedWith) {
      let sharedWithOrg = this._getItem(utils.getId(sharedWith.organization))
      let orgName = sharedWithOrg.name
      // let orgName = utils.getDisplayName(to, this.getModel(ORGANIZATION).value.properties)
      if (model.subClassOf !== MY_PRODUCT && model.subClassOf !== FORM)
        return
      dn = translate('sharedForm', translate(model), orgName)
      sharedWithOrg.lastMessage = dn
      sharedWithOrg.lastMessageTime = value._time
      sharedWithOrg.lastMessageType = messageType
      batch.push({type: 'put', key: utils.getId(sharedWithOrg), value: sharedWithOrg});
      this.trigger({action: 'list', modelName: ORGANIZATION, list: this.searchNotMessages({modelName: ORGANIZATION}), forceUpdate: true})
      return
    }

    let from = this._getItem(utils.getId(value.from));
    let fromId = utils.getId(from)
    let meId = utils.getId(me)
    let isNew = !value[ROOT_HASH] || !this._getItem(utils.getId(value))

    if (fromId !== meId  &&  from.bot)
      from = this._getItem(utils.getId(from.organization))

    if (model.id === FORM_REQUEST  &&  value.product) {
      let m = this.getModel(value.product)
      if (m.forms.indexOf(value.form) !== 0)
        return
      dn = translate('formRequest', translate(this.getModel(value.product)))
      messageType = FINANCIAL_PRODUCT
    }
    else if (model.id === VERIFICATION) {
      let docType = utils.getType(value.document) // utils.getId(value.document).split('_')[0]
      dn = translate('receivedVerification', translate(this.getModel(docType)))
    }
    else if (model.id === PRODUCT_REQUEST) {
      let m = this.getModel(value.requestFor)
      dn = utils.makeModelTitle(m)
    }
    else if (model.subClassOf === MY_PRODUCT)
      dn = translate('receivedProduct', translate(model))
    else if (model.subClassOf === FORM) {
      if (isNew)
        dn = translate('submittingForm', translate(model))
      else if (fromId !== meId)
        dn = translate('receivedForm', translate(model))
      else
        dn = translate('submittingModifiedForm', translate(model))
    }
    else {
      dn = value.message || utils.getDisplayName(value);
      if (!dn)
        return
    }
    let r
    if (toId !== meId) {
      r = to
      to.lastMessage = 'You: ' + dn
    }
    else {
      r = from
      from.lastMessage = dn
    }
    r.lastMessageTime = value._time;
    r.lastMessageType = messageType
    batch.push({type: 'put', key: utils.getId(r), value: r});
    this.trigger({action: 'list', modelName: ORGANIZATION, list: this.searchNotMessages({modelName: ORGANIZATION}), forceUpdate: true})
  },

  addBacklinksTo(action, resource, msg, batch) {
    let msgModel = this.getModel(utils.getType(msg))

    // if (!msgModel.interfaces  ||  msgModel.interfaces.indexOf(MESSAGE) === -1)
    if (!utils.isMessage(msg))
      return
    let msgId = utils.getId(msg)
    let rId = utils.getId(resource)
    if (resource[TYPE] === PROFILE  &&  resource.bot)
      resource = this._getItem(resource.organization)
    let resModel = this.getModel(resource[TYPE])

    let isProfile = resource[TYPE] === PROFILE
    let isOrg = resource[TYPE] === ORGANIZATION
    var props = resModel.properties
    let changedCounts
    let myBotId = me.isEmployee ? utils.getId(this.getRepresentative(me.organization)) : null
    for (let p in props) {
      if (p.charAt(0) === '_'  ||  props[p].hidden)
        continue;
      var items = props[p].items;
      if (!items  ||  !items.backlink)
        continue;
      var backlink = items.backlink;
      if (!msg[backlink])
        continue

      var itemsModel = this.getModel(items.ref)
      if (itemsModel.isInterface) {
        if (!msgModel.interfaces  ||  msgModel.interfaces.indexOf(items.ref) === -1)
          continue
      }
      else if (itemsModel.id !== msg[TYPE]  &&  msgModel.subClassOf !== itemsModel.id)
        continue
      let isForm = items.ref === FORM
      if (isForm  &&  msgModel.id === PRODUCT_REQUEST)
        continue

      if (isProfile  &&  items.ref === FORM) {
        // For employee
        if (utils.isItem(msgModel)                    ||
            utils.isDocument(msgModel))
          continue
        if (me.isEmployee) {
          if (msg.to.id !== myBotId)
            continue
        }
      }
      let upCounter = utils.getId(msg[backlink]) === rId
      // backlink will have a property corresponding to provider representative
      if (!upCounter  &&  isOrg  &&  (backlink === 'to'  ||  backlink === 'from')) {
        if (msg[backlink].organization  &&  msg[backlink].organization.id === rId)
          upCounter = true
      }
      if (upCounter) {
        let cntProp = '_' + p + 'Count'
        changedCounts = true

        let cnt = resource[cntProp]
        if (cnt)
          resource[cntProp] = action === ADD ? ++cnt : --cnt
        else
          resource[cntProp] = action === ADD ? 1 : 0
        break
      }
    }
    if (!changedCounts)
      return
    rId = utils.getId(resource)
    if (batch)
      this.dbBatchPut(rId, resource, batch);
    else
      this.dbPut(rId, resource)
    if (!isProfile)
      this.trigger({action: 'updateRow', resource: resource, forceUpdate: true})
  },
  registration(value) {
    isLoaded = true;

    me = value
    // meDriver = null
    var pKey = utils.getId(me)
    var batch = [];
    var publishedIdentity = meDriver.identity
    var mid = {
      [TYPE]: MY_IDENTITIES_TYPE,
      currentIdentity: pKey,
      allIdentities: [{
        id: pKey,
        title: utils.getDisplayName(value),
        privkeys: me.privkeys,
        publishedIdentity: publishedIdentity
      }]};
    delete me.privkeys

    batch.push({type: 'put', key: pKey, value: me});
    batch.push({type: 'put', key: MY_IDENTITIES, value: mid});///
    var identity = {
      [ROOT_HASH]: me[ROOT_HASH],
      [TYPE]: IDENTITY
    }
    _.extend(identity, publishedIdentity)
    var iKey = utils.getId(identity)
    if (me.language) {
      me.language = this._getItem(utils.getId(me.language))
      me.languageCode = me.language.code
    }
    batch.push({type: 'put', key: iKey, value: identity});
    return db.batch(batch)
    .then(() => {
      var  params = {action: 'addItem', resource: value, me: value, isRegistration: true};
      this.setMe(me)
      return this.trigger(params);
    })
    .then((value) => {
      this._setItem(iKey, identity)
      this._setItem(pKey, me)
      if (mid)
        this._setItem(MY_IDENTITIES, mid)

      this.monitorTim()
      // return this.initIdentity(me)
    })
    .catch((err) => {
      err = err;
    });
  },
  // !!! review and remove the legacy code for several providers on one server
  addSettings: co(function* addSettings (value, maxAttempts, getAllProviders) {
    var self = this
    var v = value.url
    if (v.charAt(v.length - 1) === '/')
      v = v.substring(0, v.length - 1)
    if (v.indexOf('http') === -1)
      v = 'https://' + v
    var key = SETTINGS + '_1'
    const settings = this._getItem(key)
    let allProviders, oneProvider
    if (value.id) {
      // if (SERVICE_PROVIDERS) {
      if (SERVICE_PROVIDERS.some((r) => r.id === value.id  &&  r.url === value.url)) {
        if (settings  &&  settings.urls.indexOf(value.url) === -1) {
          self._mergeItem(key, { urls: [...settings.urls, value.url] })
          value = self._getItem(key)
          return self.dbPut(key, value)
        }
        return
      }
      // }
      // We don't have this provider yet
      if (settings  &&  settings.urls.indexOf(value.url) !== -1) {
        // check if all providers were fetched from this server.
        if (!Object.keys(settings.urlToId).length)
          allProviders = true
        // check if this provider was already requested but
        // it was not picked up or it was removed on server and may be added again
        else if (settings.urlToId[value.id].indexOf(value.id) !== -1)
          oneProvider = true
      }
    }
    else if (getAllProviders  &&  settings.urlToId[value.url]) {
      delete settings.urlToId[value.url]
      self._setItem(key, settings)
    }
    let gotInfo
    if (maxAttempts !== -1) {
      let attempts = 0
  //     let waitTime = 1000
  //     let maxWait = 60000
      while (true) {
        try {
          yield this.getInfo({serverUrls: [v], retry: false, id: value.id, hash: value.hash, newServer: true, maxAttempts: maxAttempts})
          gotInfo = true
          break;
        }
        catch (err) {
          if (attempts === maxAttempts) {
            console.log('No access to the server: ' + v)
            this.trigger({action: 'noAccessToServer'})
            return
          }
          attempts++
        }
      }
    }
    if (!gotInfo)
      try {
        yield this.getInfo({serverUrls: [v], retry: true, hash: value.hash, id: value.id, newServer: true})
      } catch (err) {
        self.trigger({action: 'addItem', error: err.message, resource: value})
      }
    if (allProviders  &&  settings)
      return
    if (settings) {
      let addHash
      if (settings.urls.indexOf(v) === -1) {
        self._mergeItem(key, { urls: [...settings.urls, v] })
        addHash = true
      }
      else if (value.hash) {
        addHash = true

        if (settings.hashToUrl) {
          let hasAllProvidersFromThisServer = true
          for (let h in settings.hashToUrl) {
            let provider = self._getItem(utils.makeId(PROFILE, h))
            let org = self._getItem(provider.organization)
            if (org.url === v)
              hasAllProvidersFromThisServer = false
          }
          addHash = !hasAllProvidersFromThisServer
        }
      }
      // Case when scanning QR code for not yet added server
      if (value.hash  &&  addHash) {
        let sp = SERVICE_PROVIDERS.filter((sp) => sp.permalink === value.hash)
        value.id = sp[0].id

        // var hashToUrl = settings.hashToUrl
        // if (!hashToUrl[value.hash])
        //   hashToUrl[value.hash] = v

        // self._mergeItem(key, { hashToUrl: hashToUrl })
        // value = self._getItem(key)
      }
      // else {
        // Save the fact that only some providers are needed from this server
      if (value.id) {
        var urlToId = settings.urlToId
        if (!urlToId[v])
          urlToId[v] = [value.id]
        else if (urlToId[v].indexOf(value.id) === -1)
          urlToId[v].push(value.id)
        else
          return

        self._mergeItem(key, { urlToId: urlToId })
      }
      // }
    }
    else {
      value.urls = SERVICE_PROVIDERS_BASE_URL_DEFAULTS.concat(v)
      self._setItem(key, value)
    }
    value = self._getItem(key)
    self.trigger({action: 'addItem', resource: value})
    return self.dbPut(key, value)
  }),
  forgetAndReset() {
    var orgs = this.searchNotMessages({modelName: ORGANIZATION})
    var togo = orgs.length
    var promises = []

    for (let org of orgs)
      promises.push(this.onForgetMe(org, true))

    return Q.all(promises)
    .then(() => {
      // debugger
      // wait for all ForgotYou messages or timeout before changing the server url
      var defer = Q.defer()
      setTimeout(() => defer.reject('forget me request was timed out'), 10000)
      meDriver.on('message', onMessage)
      return defer.promise

      function onMessage (meta) {
        if (meta[TYPE] === FORGOT_YOU) {
          if (--togo === 0) {
            meDriver.removeListener('message', onMessage)
            defer.resolve()
          }
        }
      }
   })
   .then(() => {
      // debugger
      return meDriver.destroy()
   })

  },
  getFingerprint(r) {
    var pubkeys = r.pubkeys
    if (!pubkeys) {
      // Choose any employee from the company to send the notification about the customer
      if (r[TYPE] === ORGANIZATION) {
        var employees = this.searchNotMessages({modelName: PROFILE, prop: 'organization', to: r})
        if (employees.length)
          pubkeys = list[utils.makeId(IDENTITY, employees[0][ROOT_HASH])].pubkeys
      }
    }
    if (pubkeys) {
      for (var i=0; i<pubkeys.length; i++) {
        var key = pubkeys[i]
        if (key.purpose === 'sign'  &&  key.type === 'ec')
          return key.fingerprint
      }
    }
  },

  async maybeRequireFreshUser() {
    const { previous, current } = await this._envPromise
    const { resetCheckpoint=0 } = current
    const previousResetCheckpoint = previous.resetCheckpoint || 0
    if (resetCheckpoint <= previousResetCheckpoint) return

    await new Promise(resolve => {
      Alert.alert(
        translate('incompatibleVersion'),
        translate('resetIsRequired'),
        [{ text: translate('ok'), onPress: resolve }]
      )
    })

    await this.onReloadDB()
  },

  async maybeRequestUpdate() {
    if (__DEV__) return

    let isLatest
    try {
      isLatest = await utils.isLatestVersion()
    } catch (err) {
      debug('failed to check if latest version', err.message)
      return
    }

    if (isLatest) return

    const willUpdate = await new Promise(resolve => {
      Alert.alert(
        translate('updateAppTitle'),
        translate('updateAppMessage'),
        [
          { text: translate('later'), onPress: () => resolve(false) },
          { text: translate('updateNow'), onPress: () => resolve(true) }
        ],
      )
    })

    if (!willUpdate) return

    try {
      utils.openInAppStore()
    } catch (err) {
      debug('failed to open app store', err.message)
    }
  },

  // TODO: simplify getDriver to use this
  async loadIdentityAndKeys(me) {
    var mePub = me[ROOT_HASH] ? this._getItem(utils.makeId(IDENTITY, me[ROOT_HASH])).pubkeys : me.pubkeys

    var mePriv
    var identity
    var allMyIdentities = this._getItem(MY_IDENTITIES)
    if (allMyIdentities) {
      var all = allMyIdentities.allIdentities
      var curId = allMyIdentities.currentIdentity
      all.some(id => {
        if (id.id === curId) {
          // currentIdentity = id
          mePriv = id.privkeys
          identity = id.publishedIdentity
          mePub = mePub || identity.pubkeys
          return true
        }
      })
    }

    if (identity) {
      await this.maybeRequireFreshUser()
    }

    if (mePub) {
      const lookupKeys = Keychain
        ? Keychain.lookupKeys(mePub)
        : Promise.resolve(mePriv.map(k => tradleUtils.importKey(k)))

      const [keys, encryptionKey] = await Promise.all([
        lookupKeys,
        utils.getPassword(ENCRYPTION_KEY)
      ])

      return { keys, encryptionKey, identity }
    }

    const { encryptionKey, identityInfo } = await this.createNewIdentity()
    return {
      ...identityInfo,
      encryptionKey
    }
  },

  getDriver(me) {
    if (this._loadingEngine) return this._enginePromise

    this._loadingEngine = true

    if (me.language)
      language = list[utils.getId(me.language)] && this._getItem(utils.getId(me.language))

    return this.loadIdentityAndKeys(me)
    .then(result => {
      if (!Keychain) {
        let privkeys = result.keys.map(k => {
          return k.toJSON ? k.toJSON(true) : k
        })
        let myIdentities = this._getItem(MY_IDENTITIES)
        if (myIdentities) {
          let currentIdentity = myIdentities.currentIdentity
          myIdentities.allIdentities.forEach((r) => {
             if (r.id === currentIdentity)
               r.privkeys = privkeys
          })
          this.dbPut(MY_IDENTITIES, myIdentities)
        }
        else
          me.privkeys = privkeys
        // me['privkeys'] = result.keys.map(k => {
        //   return k.toJSON ? k.toJSON(true) : k
        // })
      }

      // if (!Keychain) me['privkeys'] = result.keys.map(k => k.toJSON(true))
      // me[NONCE] = me[NONCE] || this.getNonce()
      // driverInfo.deviceID = result.deviceID
      return this.buildDriver({
        identity: result.identity,
        keys: result.keys,
        encryption: {
          key: new Buffer(result.encryptionKey, 'hex')
        }
      })
    }, err => {
      debugger
      throw err
    })
  },
  async setupPushNotifications() {
    const node = await this._enginePromise
    const onSent = ({ message, object }) => {
      const type = object.object[TYPE]
      const model = this.getModel(type)
      const isForm = model && model.subClassOf === FORM
      if (type === SIMPLE_MESSAGE || isForm) {
        this.registerForPushNotifications()
        node.removeListener('sent', onSent)
      }
    }

    node.on('sent', onSent)
    const me = await this._mePromise
    if (me.registeredForPushNotifications || me.pushNotificationsAllowed === false) {
      node.removeListener('sent', onSent)
    }

    Push.init({ node, me, Store: this })
    // Push.register()
  },
  async registerForPushNotifications() {
    await this._pushSemaphore.wait()
    await utils.promiseDelay(1000)
    Push.register()
  },
  subscribeForPushNotifications(providers) {
    const current = this.getMyPushNotificationSubscriptions()
    const added = _.difference(providers, current)
    if (!added.length) return

    return Promise.all(added.map(async hash => {
      try {
        await Push.subscribe(hash)
        return hash
      } catch (err) {
        console.log(`failed to subscribe for push notifications from ${hash}`, err.message)
      }
    }))
    .then(results => {
      // in case "me" changed while we were subscribing
      const current = this.getMyPushNotificationSubscriptions()
      const successful = _.difference(results.filter(r => r), current)
      if (successful.length) {
        const pushSubscriptions = current.concat(successful)
        return this.onUpdateMe({ pushSubscriptions })
      }
    })
  },
  isRegisteredForPushNotifications() {
    return utils.getMe().registeredForPushNotifications
  },
  getMyPushNotificationSubscriptions() {
    return utils.getMe().pushSubscriptions || []
  },
  async createNewIdentity() {
    const encryptionKey = crypto.randomBytes(32).toString('hex')
    // const globalSalt = crypto.randomBytes(32).toString('hex')

    this.setBusyWith('generatingKeys')
    try {
      // don't run in parallel, keychain is touchy
      const identityInfo = await identityUtils.generateIdentity()
      if (__DEV__) {
        this.setBusyWith('setting encryption key')
      }

      await utils.setPassword(ENCRYPTION_KEY, encryptionKey)
      this.setBusyWith(null)
      return {
        encryptionKey,
        identityInfo
      }
    } catch (err) {
      if (!/authentication failed/.test(err.message)) {
        // Alert.alert(
        //   'Something went wrong...',
        //   'Please restart the app and try again'
        // )

        throw err
      }

      // user doesn't have passcode enabled
      await new Promise(resolve => {
        Alert.alert(
          translate('youShallNotPass'),
          translate('enablePasscodeFirst'),
          [
            { text: 'OK', onPress: resolve }
          ]
        )
      })

      // retry
      return await this.createNewIdentity()
    }
  },

  publishMyIdentity(orgRep, disableAutoResponse) {
    var self = this
    if (me.isEmployee)
      return
    var msg = {
      [TYPE]: IDENTITY_PUBLISHING_REQUEST,
      // [NONCE]: self.getNonce(),
      identity: meDriver.identity,
      profile: {
        firstName: me.firstName
      }
    }
    var opts = {
      object: msg,
      to: { permalink: orgRep[ROOT_HASH] }
    }
    if (disableAutoResponse)
      opts.other = { disableAutoResponse: true }

    return this.meDriverSignAndSend(opts)
    .catch((err) => {
      debugger
    })
  },
  monitorTim() {
    this._keeper = {}
    ;['get', 'put', 'batch', 'del'].forEach(method => {
      this._keeper[method] = promisify(meDriver.keeper[method].bind(meDriver.keeper))
    })

    this.monitorLog()
  },
  dbPut(key, value) {
    let v = utils.isMessage(value)  &&  value[TYPE] !== CONFIRM_PACKAGE_REQUEST ? utils.optimizeResource(value, true) : value
    return db.put(key, v)
  },
  dbBatchPut(key, value, batch) {
    let v = utils.isMessage(value)  &&  value[TYPE] !== CONFIRM_PACKAGE_REQUEST ? utils.optimizeResource(value, true) : value
    batch.push({type: 'put', key: key, value: v})
  },
  async maybeWatchSeal(msg) {
    let target = msg.object.object
    const type = target[TYPE]
    let model = this.getModel(type)
    if (!model) return

    const sup = model.subClassOf
    let link
    if (type === IDENTITY_PUBLISHING_REQUEST) {
      target = target.identity
    } else {
      switch (sup) {
      case PRODUCT_REQUEST:
        return
      case FORM:
      case MY_PRODUCT:
      case VERIFICATION:
        break
      default:
        return
      }
    }

    let otherGuy = msg.author === meDriver.permalink ? msg.recipient : msg.author
    const identityInfo = await meDriver.addressBook.lookupIdentity({ permalink: otherGuy })
    const chainPubKey = tradleUtils.chainPubKey(
      identityInfo.object,
      meDriver.network
    )

    if (!chainPubKey) {
      debug(`chain key not found in identity, can't add watch for seal`)
      return
    }

    try {
      await meDriver.watchSeal({
        chain: {
          blockchain: chainPubKey.type,
          networkName: chainPubKey.networkName
        },
        object: target,
        basePubKey: chainPubKey
      })
    } catch (err) {
      debug('failed to add seal watch', err.stack)
      debugger
      // .done()
    }

    // meDriver.watchSeal({
    //   link: msg.link,
    //   basePubKey: msg.object.recipientPubKey
    // }).done()
  },

  // updateMe() {
  //   db.put(utils.getId(me), me)
  // },

  putInDb(obj, onMessage) {
    return this._loadedResourcesDefer.promise
    .then(() => this._putInDb(obj, onMessage) || Q())
  },
  async _putInDb(obj, onMessage) {
    // defensive copy
    var self = this
    var val = _.clone(obj.parsed.data)
    if (val[TYPE] === INTRODUCTION)
      return
    if (val[TYPE] === SIMPLE_MESSAGE  &&  val.message === ALREADY_PUBLISHED_MESSAGE)
      return

    this.rewriteStubs(val)
    val[ROOT_HASH] = val[ROOT_HASH]  ||  obj[ROOT_HASH]
    val[CUR_HASH] = obj[CUR_HASH]

    let valId = utils.getId(val)
    let inDB = this._getItem(valId)
    if (inDB) {
      if (obj.txId) {
        inDB.txId = obj.txId
        inDB.sealedTime = obj.timestamp
        inDB.blockchain = obj.blockchain
        inDB.networkName = obj.networkName
        await db.put(valId, inDB)
      }
      return
    }
    let originalSender = obj.object.originalSender
    if (originalSender)
      val._originalSender = originalSender
    let forward = obj.object.forward
    if (forward)
      val._forward = forward
    val[IS_MESSAGE] = true

    // val[MSG_LINK] = obj[MSG_LINK]

    var fromId = obj.objectinfo  &&  obj.objectinfo.author
               ? obj.objectinfo.author
               : obj.from[ROOT_HASH]
    fromId = utils.makeId(PROFILE, fromId)

    var from = this._getItem(fromId)
    var me = utils.getMe()
    if (utils.getId(me) === fromId)
      val._time = val._time || obj.timestamp
    else {
      val._sentTime = val._time || obj.timestamp
      if (!val._time)
        val._time = new Date().getTime()
    }
    // var from = list[PROFILE + '_' + obj.from[ROOT_HASH]].value
    var type = val[TYPE]
    if (type === FORGET_ME) {
      // Alert.alert("Received ForgetMe from " + obj.from[ROOT_HASH])
      let to = this._getItem(obj.to)
      this.forgetMe(to)
      return
    }
    if (onMessage  &&  val[TYPE] === FORGOT_YOU) {
      // this.trigger({action: 'messageList', to: me})
      await this.forgotYou(from)
      return
    }
    var isConfirmation
    var model = this.getModel(type)
    if (!model) {
      if (val.message  &&  val.message.indexOf('Congratulations! You were approved for: ') != -1) {
        isMessage = true
        type = SIMPLE_MESSAGE
        val[TYPE] = type
        model = models[SIMPLE_MESSAGE].value
        isConfirmation = true
      }
      else
        return;
    }
    // val.permissionKey = obj.permissionKey
    var key = utils.getId(val)
    var batch = []
    var representativeAddedTo, noTrigger, isRM, application
    // var isServiceMessage
    let isMessage = true
    if (model.id === IDENTITY)
      representativeAddedTo = this.putIdentityInDB(val, batch)
    else {
      // var isMessage = utils.isMessage(model)
      // if (isMessage) {
        // if (val[TYPE] === PRODUCT_LIST  &&  (!val.list || !val.list.length))
        //   return
        let ret = await this.putMessageInDB(val, obj, batch, onMessage)
        if (ret) {
          noTrigger = ret.noTrigger
          application = ret.application
          isRM = ret.isRM
        }
        if (type === VERIFICATION)
          return
      // }
      // else
      //   this.dbBatchPut(key, val, batch)
    }
    // ??? Does not work when sharing MyProduct for another product; like CertifiedID for PersonalAccount
    // if (model.subClassOf === MY_PRODUCT)
    //   val._sharedWith = [this.createSharedWith(utils.getId(val.from.id), new Date().getTime())]

    self._mergeItem(key, val)

    var resultList

    let isMyMessage
    if (isMessage) {
      var toId = obj.to.id ||  utils.makeId(PROFILE, obj.to[ROOT_HASH])
      var meId = utils.getId(me)
      isMyMessage = isMessage ? (toId !== meId  &&  fromId !== meId) : false
    }

    await db.batch(batch)
    // if (model.id === PRODUCT_LIST  &&  isMyMessage) {
    //   // var orgList = this.searchNotMessages({modelName: ORGANIZATION})
    //   // this.trigger({action: 'list', list: orgList, forceUpdate: true})
    //   this.trigger({action: 'getItem', resource: this._getItem(utils.getId(from.organization))})
    // }
    let triggerForModel
    if (isConfirmation  &&  isMyMessage) {
      var fOrg = from.organization
      var org = fOrg ? this._getItem(utils.getId(fOrg)) : null
      var msg = {
        message: me.firstName + ' is waiting for the response',
        [TYPE]: CUSTOMER_WAITING,
        from: me,
        to: org,
        time: new Date().getTime()
      }
      this.onAddMessage({msg: msg, isWelcome: true})
    }
    else if (isMessage  &&  !noTrigger) {
      if (onMessage) {
        let meId = utils.getId(me)
        if (me.isEmployee) {
          let isReadOnlyChat
          let context
          if (val._context) {
            context = this.findContext(val._context)
            if (context)
              isReadOnlyChat = utils.isReadOnlyChat(context)
          }
          else
            isReadOnlyChat = utils.isReadOnlyChat(val)
          if (!val._context  ||  isReadOnlyChat) {
            let notMeId = toId === meId ? fromId  : toId
            let notMe = this._getItem(notMeId)
            if (notMe  &&  !notMe.bot) {
              ++notMe._unread
              this.dbPut(utils.getId(notMe), notMe)
              // this.trigger({action: 'updateRow', resource: notMe})
            }
            if (isReadOnlyChat  &&  context) {
              let contact = this._getItem(val.from)
              let hasNameChanged
              if (contact.firstName === FRIEND)
                hasNameChanged = this.changeName(val, contact)
              if (hasNameChanged) {
                context.from = this.buildRef(contact)
                let contextId = utils.getId(context)
                this._setItem(contextId, context)
                this.dbPut(contextId, context)
                this.trigger({action: 'updateRow', resource: context, forceUpdate: true})
              }
            }
          }
          if (val[TYPE] === PRODUCT_REQUEST)  {
            if (!this.getModel([val.requestFor]))
              triggerForModel = val.requestFor
          }
          else if (val[TYPE] === FORM_REQUEST) {
            if (!this.getModel([val.form]))
              triggerForModel = val.product
          }
          else if (!this.getModel(val[TYPE]))
             triggerForModel = val[TYPE]
          if (isReadOnlyChat  &&  utils.isContext(val)  &&  !triggerForModel)
            this.onGetAllSharedContexts()
        }
      }
      if (triggerForModel) {
        this._emitter.once('model:' + triggerForModel, () => {
          if (utils.isContext(val))
            this.onGetAllSharedContexts()
          else
            this.trigger({action: 'addItem', resource: val})
        })
        return
      }
      if (val[TYPE] === FORM_REQUEST) {
        if (utils.isContext(val.form)) {
          this.onGetProductList({resource: val.from})
          this.trigger({action: 'addItem', resource: val})
        }
        else {
          var fid = this._getItem(val.from)
          let productToForms = await this.gatherForms(fid, val._context)
          if (val._context)
            val._context = this.findContext(val._context)
          let shareables
          if (!me.isEmployee  ||  !from.organization  ||  utils.getId(from.organization) !== utils.getId(me.organization))
            shareables = await this.getShareableResources({foundResources: [val], to: val.from, context: val._context})
          this.trigger({action: 'addItem', resource: val, shareableResources: shareables, productToForms: productToForms})
        }
      }
      else {
        if (val[TYPE] === FORM_ERROR  &&  val.prefill.id) {
          let memPrefill = this._getItem(val.prefill)
          let phash = memPrefill ? memPrefill[CUR_HASH] : this.getCurHash(val.prefill) //  val.prefill.id.split('_')[2]
          let prefill
          try {
            prefill = await this._keeper.get(phash)
          } catch (err) {
            prefill = await this._getItemFromServer(val.prefill.id)
          }
          let p = {}
          if (memPrefill)
            _.extend(p, memPrefill)
          _.extend(p, prefill)
          val.prefill = p
        }
        else if (utils.isItem(model)) {
          let props = model.properties
          for (let p in props) {
            if (utils.isContainerProp(props[p], model)) {
              let cRes = application  &&  await this._getItemFromServer(val[p]) || this._getItem(val[p])
              if (cRes )
                this.trigger({action: 'getItem', resource: cRes, application})
            }
          }
        }
        this.trigger({action: 'addItem', resource: val})
        // if (from.organization  && this.isYuki(from.organization))
        //   this.trigger({action: 'yuki', yuki: {resource: val, organization: this._getItem(from.organization)}})
      }
    }
    else if (representativeAddedTo /* &&  !triggeredOrgs*/) {
      var orgList = this.searchNotMessages({modelName: ORGANIZATION})
      this.trigger({action: 'list', modelName: ORGANIZATION, list: orgList, forceUpdate: true})
    }
    else if (!isMessage  &&  val[TYPE] === PARTIAL)
      this.trigger({action: 'hasPartials'})

    if (utils.isWeb()  &&  val[TYPE] === APPLICATION_SUBMITTED  && ENV.offerKillSwitchAfterApplication  &&  !utils.getMe().useGesturePassword) {
      setTimeout(() => {
        this.trigger({action: 'offerKillSwitchAfterApplication'})
      }, 2000)
    }
  },
  // isYuki(fromOrg) {
  //   return utils.getId(fromOrg) === utils.getId(yukiConfig.org)
  // },
  putIdentityInDB(val, batch) {
    var profile = {}
    // var me = utils.getMe()
    if (val.name) {
      for (let p in val.name) {
        profile[p] = val.name[p]
      }
      delete val.name
    }
    if (val.location) {
      for (let p in val.location)
        profile[p] = val.location[p]
      delete val.location
    }
    _.extend(profile, val)
    profile[TYPE] = PROFILE
    delete profile.pubkeys
    delete profile.v
    let key = utils.getId(val)
    var profileKey = utils.getId(profile)
    let v = list[key] ? this._getItem(profileKey) : null
    if (!v  &&  me  &&  val[ROOT_HASH] === me[ROOT_HASH])
      v = me
    if (v)  {
      var vv = {}
      _.extend(vv, v)
      _.extend(vv, profile)
      profile = vv
    }
    var org
    if (val.organization) {
      // if (val.organization.title === 'Rabobank'  &&  val.securityCode)
      //   return
      org = list[utils.getId(val.organization)]  &&  this._getItem(utils.getId(val.organization))
      if (org) {
        profile.organization = val.organization
        delete val.organization
      }
    }
    batch.push({type: 'put', key: profileKey, value: profile})
    this._setItem(profileKey, profile)
    var representativeAddedTo
    batch.push({type: 'put', key: key, value: val})
    if (org) {
      var doAdd
      if (!org.contacts)
        doAdd = true
      else {
        var i = 0
        for (; i<org.contacts.length; i++) {
          if (org.contacts[i][ROOT_HASH] === key)
            break
        }
        doAdd = i !== org.contacts.length
      }
      if (doAdd)  {
        var representative = {
          id: key,
          title: val.formatted || val.firstName
        }
        var oo = {}
        _.extend(oo, org)
        if (!oo.contacts)
          oo.contacts = []
        oo.contacts.push(representative)
        var orgKey = utils.getId(org)
        this._setItem(orgKey, oo)
        batch.push({type: 'put', key: orgKey, value: oo})
        representativeAddedTo = org[ROOT_HASH]
      }
    }
    return representativeAddedTo
  },
  // isThirdPartyResource(r) {
  //   if (!r._context)
  //     return
  //   let context = this._getItem(r._context)
  //   let contextTo = this._getItem(context.to).organization // this._getItem(document.to).organization
  //   let rFrom = this._getItem(r.from).organization

  //   if (utils.getId(rFrom)  !==  utils.getId(contextTo))  //}  &&  val._context  &&  utils.isReadOnlyChat(val._context)) {
  //     return true
  // },

  async putMessageInDB(val, obj, batch, onMessage) {
    let self = this

    let fromId = (obj.from  &&  obj.from[ROOT_HASH]) || (obj.objectinfo  &&  obj.objectinfo.author)
    let fromProfile = utils.makeId(PROFILE, fromId)

    // if (obj.objectinfo && obj.objectinfo.author)
    //   fromProfile = utils.makeId(PROFILE, obj.objectinfo.author)
    // else
    //   fromProfile = utils.makeId(PROFILE, obj.from[ROOT_HASH])

    var from = this._getItem(fromProfile)
    let type = val[TYPE]
    var model = this.getModel(type)
    let isContext = utils.isContext(model)
    if (!from) {
      if (type !== SELF_INTRODUCTION)
        return
      let name = val.name || (val.identity.name && val.identity.name.formatted)
      from = {
        [TYPE]: PROFILE,
        [ROOT_HASH]: obj.objectinfo.author,
        firstName: name ?  name.charAt(0).toUpperCase() + name.slice(1) : 'NewCustomer' + Object.keys(list).length
      }
    }
    let key = utils.getId(val)

    // var toId = [PROFILE, obj.to[ROOT_HASH]].join('_')
    var toId = obj.to.id || utils.makeId(PROFILE, obj.to[ROOT_HASH])
    var to = this._getItem(toId)
    var meId = utils.getId(me)
    var fOrg
    if (me  &&  from[ROOT_HASH] === me[ROOT_HASH])
      fOrg = to.organization
    else if (me.isEmployee) {
      if (from.organization  && utils.getId(from.organization) === utils.getId(me.organization))
        fOrg = to.organization
    }
    if (!fOrg)
      fOrg = from.organization
    var org = fOrg ? this._getItem(utils.getId(fOrg)) : null
    let isFormRequest = type === FORM_REQUEST

    var inDB
    if (onMessage) {
      let fromId = utils.getId(from)
      let profileModel = this.getModel(PROFILE)
      val.from = {
        id: fromId,
        title: from.formatted || from.firstName
      }
      if (obj.object.forward  &&  obj.object.forward === me[ROOT_HASH]) {
        val.to = {
          id: utils.getId(me),
          title: me.formatted || me.firstName
        }
        to = me
        toId = meId
      }
      else
        val.to = {
          id: toId,
          title: to.formatted || to.firstName
        }
    }
    else {
      let inDB = this._getItem(key)
      val.from = inDB.from
      val.to = inDB.to
      val._context = inDB._context
      val._sharedWith = inDB._sharedWith
      if (inDB.verifications)
        val.verifications = inDB.verifications
      // if (val.txId  &&  !inDB.txId) {
      //   val._time = inDB._time
      //   val.sealedTime = val._time || obj.timestamp
      // }
    }

    let contextId, context
    if (obj.object  &&  obj.object.context) {
      context = contextIdToResourceId[obj.object.context]
      if (context)
        contextId = utils.getId(context)
      else
        // Original request was made by another employee
        // if (me.isEmployee) {
        context = await this.getContext(obj.object.context, val)
      if (context) {
        val._context = this.buildRef(context)
        if (me.isEmployee  &&  isFormRequest  &&  val.product) {
          // Someone is applying to my provider
          let meApplying = context.from.organization  &&  context.from.organization.id === me.organization.id
          let meServing = context.to.organization.id === me.organization.id
          if (meApplying  ||  meServing) {
            let pModel = this.getModel(val.product)
            let forms = pModel.forms
            context._startForm = val.form
            contextId = utils.getId(context)
            contextIdToResourceId[obj.object.context] = context
            // if (meServing) {
            //   this._setItem(contextId, context)
            //   this.dbBatchPut(contextId, context, batch)
            //   this.addMessagesToChat(utils.getId(fOrg || utils.getId(from)), context)
            // }
            // val._context = this.buildRef(context)
          }
        }
      }


      // let context = this._getItem(contextId)
      // let r = await meDriver.objects.get({link: context[CUR_HASH], body: false})
      // contextId = utils.makeId(context)
    }
    // HACK for showing verification in employee's chat
    let isVerification = type === VERIFICATION
    if (isVerification) {
      let document = this._getItem(utils.getId(val.document))
      if (!document) {
        // debugger
        if (me.isEmployee)
          document = await this._getItemFromServer(utils.getId(val.document))
      }

      // let context
      // if (contextId)
      //   context = this._getItem(contextId)
      // else
      if (!context  && document && document._context)
        context = this._getItem(document._context)
      // let context = this._getItem(obj.object.context ? this._getItem(PRODUCT_APPLICATION + '_' + obj.object.context) : document._context)
      // context = context ? this._getItem(context) : null
      if (obj.from  &&  obj.objectinfo.author  &&  obj.from[ROOT_HASH] !== obj.objectinfo.author) {
        from = this._getItem(utils.makeId(PROFILE, obj.from[ROOT_HASH]))
        val._verifiedBy = from.organization
        // val.from = {id: utils.makeId(PROFILE, obj.objectinfo.author)}
      }
      // else if (context  &&  document) {
      //   let toBot = this._getItem(utils.getId(context.to))
      //   let originalTo = toBot.organization // this._getItem(document.to).organization
      //   let verificationFrom = from.organization

      //   if (verificationFrom  &&  utils.getId(verificationFrom)  !==  utils.getId(originalTo)) { //}  &&  val._context  &&  utils.isReadOnlyChat(val._context)) {
      //     val._verifiedBy = from.organization
      //     to = this._getItem(document.from)  // document from is not changing but to does depending on what party verifies or asks for corrections
      //     toId = utils.getId(to)
      //     from = this._getItem(utils.clone(context.to))
      //     // isThirdPartySentRequest = true
      //   }
      // }
    }
    let isReadOnly = utils.getId(to) !== meId  &&  utils.getId(from) !== meId
    let isNew = val[ROOT_HASH] === val[CUR_HASH]
    // HACK for showing verification in employee's chat
    let isThirdPartySentRequest
    if (contextId  &&  !isContext) {
      if (!context) {
        context = this._getItem(contextId)
        if (!context)
          context = await this.getContext(obj.object.context, val)
      }

      // Avoid doubling the number of forms
      if (context) {
        isThirdPartySentRequest = !isFormRequest  &&  utils.getId(from) !== utils.getId(context.from)  &&  utils.getId(from) !== utils.getId(context.to)

        if (isThirdPartySentRequest  &&  isVerification)
          isThirdPartySentRequest = utils.getId(to) !== utils.getId(context.from)  &&  utils.getId(to) !== utils.getId(context.to)
        if (!inDB)
          context._formsCount = context._formsCount ? ++context._formsCount : 1
        context.lastMessageTime = new Date().getTime()
        this.dbBatchPut(contextId, context, batch)
        val._context = this.buildRef(context)
      }
    }
    else if (isFormRequest  &&  isNew) {
      let product = val.product
      // let contexts = await this.searchMessages({modelName: PRODUCT_APPLICATION, to: org})
      let contexts = await this.searchMessages({modelName: CONTEXT, to: org})
      if (contexts) {
        let i = contexts.length - 1
        for (; i>=0; i--)
          if (contexts[i].requestFor === product) {
            val._context = this.buildRef(contexts[i])
            break
          }
      }
    }
    if (isFormRequest) {
      ///=============== TEST VERIFIERS
      if (isNew) {
        // Prefill for testing and demoing

        let orgs = {}
        this.searchNotMessages({modelName: ORGANIZATION}).forEach((r) => orgs[utils.getId(r)] = r)

        newFormRequestVerifiers(from, SERVICE_PROVIDERS, val, orgs)
        //============
        if (SERVICE_PROVIDERS.length && val.verifiers) {
          if (!val.message) {
            val.message = 'Please have this form verified by one of our trusted associates'
          }

          val.verifiers.forEach((v) => {
            let serviceProvider = SERVICE_PROVIDERS.find((sp) => {
              if (!sp.url)
                return
              if (!utils.urlsEqual(sp.url, v.url)) return
              if (v.id) return v.id === sp.id

              return v.permalink === sp.permalink
            })

            if (serviceProvider) {
              v.provider = serviceProvider.org
              let org = self._getItem(v.provider)
              v.name = org.name
              v.id = serviceProvider.id
              v.photo = org.photos && org.photos[0].url
            }
          })
        }
      }

      let formRequests = await this.searchMessages({modelName: FORM_REQUEST, to: org})
      if (formRequests)
        formRequests.forEach((r) => {
          if (!r._documentCreated  &&  r.form === val.form) {
            r._documentCreated = true
            let rId = utils.getId(r)
            this._getItem(rId)._documentCreated = true
            this.dbBatchPut(rId, r, batch)
            // batch.push({type: 'put', key: rId, value: r})
            // // this.addVisualProps(r)
            this.trigger({action: 'updateItem', resource: r})
          }
        })
    }
    if (val[TYPE] === DATA_BUNDLE) {
      Actions.showModal({title: translate('importingData', val.items.length, val.from.title), showIndicator: true})
      setTimeout(() => Actions.hideModal(), 3000)
      let result = await Promise.all(val.items.map(item => meDriver.saveObject({object: item})))
      let orgR = this._getItem(val.from).organization
      let orgId = utils.getId(orgR)
      for (let i=0; i<result.length; i++) {
        let item = result[i]
        let r = item.object
        r[ROOT_HASH] = item.permalink
        r[CUR_HASH] = item.link
        let m = this.getModel(r[TYPE])
        let isMyMessage = r[TYPE] !== VERIFICATION  &&  m.subClassOf !== MY_PRODUCT
        r.from = isMyMessage ? this.buildRef(me) : val.from
        r.to = isMyMessage ? val.from : this.buildRef(me)
        if (!r._time)
          r._time = new Date().getTime()
        if (!utils.isItem(m))
          r[IS_MESSAGE] = true
        r[NOT_CHAT_ITEM] = true
        if (context)
          r._context = context
        await this.onAddChatItem({resource: r, noTrigger: true})
      }

      // let bundleItems = result.map((item) => {
      //   let r = item.object
      //   r[ROOT_HASH] = item.permalink
      //   r[CUR_HASH] = item.link
      //   let m = this.getModel(r[TYPE])
      //   let isMyMessage = r[TYPE] !== VERIFICATION  &&  m.subClassOf !== MY_PRODUCT
      //   r.from = isMyMessage ? this.buildRef(me) : val.from
      //   r.to = isMyMessage ? val.from : this.buildRef(me)
      //   r[IS_MESSAGE] = true
      //   r[NOT_CHAT_ITEM] = true
      //   if (context)
      //     r._context = context
      //   return this.onAddChatItem({resource: r, noTrigger: true})
      //   // let rId = utils.getId(r)
      //   // this._setItem(rId, r)
      //   // this.addMessagesToChat(orgId, r)
      //   // this.dbBatchPut(rId, r, batch)
      // })
      // let items = await Promise.all(bundleItems)
      Actions.hideModal()
    }

    var noTrigger, isRM, application
    var isModelsPack = type === MODELS_PACK

    if (isModelsPack) {
      noTrigger = true
      let stopHere = await modelsPackHandler()
      if (stopHere)
        return
      this.addMessagesToChat(utils.getId(fOrg), val)
    }
    else {
      let isMyProduct = model.subClassOf === MY_PRODUCT
      if (contextId  &&  me.isEmployee  &&  (isMyProduct || model.subClassOf === FORM)) {
        // Update application row and view if on stack
        let applications = await this.searchServer({modelName: APPLICATION, noTrigger: true, filterResource: {context: context.contextId}})
        let app = applications  &&  applications.list.length && applications.list[0]
        if (app) {
          application = app
          if (utils.isRM(app)) {
            isRM = true
            if (context  &&  !app._context)
              app._context = context
            this.trigger({action: 'updateRow', resource: app, forceUpdate: true})
            await this.onGetItem({resource: app, backlink: this.getModel(APPLICATION).properties.submissions, search: true})
            // this.trigger({action: 'getItem', resource: app})
          }
        }
      }
      if (isMyProduct)
        Actions.hideModal()

      noTrigger = val.from.id === meId
    }
    var isStylesPack = type === STYLES_PACK
    if (isStylesPack) {
      org.style = utils.clone(val) //utils.interpretStylesPack(val)
      let exclude = [ROOT_HASH, CUR_HASH, TYPE]
      let spProps = this.getModel(STYLES_PACK).properties
      for (let p in org.style) {
        if (!spProps[p]  &&  exclude.indexOf(p) === -1)
          delete org.style[p]
      }
      this.dbBatchPut(utils.getId(org), org, batch)
      this.trigger({action: 'customStyles', provider: org})
      noTrigger = true
    }
    if (type === SEAL)
      noTrigger = true

    if (!val._time)
      val._time = obj.timestamp

    // let isVerification = type === VERIFICATION  || (model  && model.subClassOf === VERIFICATION)
    if (isVerification) {
      // debugger
      await this.onAddVerification({r: val, notOneClickVerification: false, dontSend: true, isThirdPartySentRequest: isThirdPartySentRequest})
      return
    }
    if (!isReadOnly) {
      let meId = utils.getId(to)
      if (type === MY_EMPLOYEE_PASS) {
        await setupEmployee()
        this.client = graphQL.initClient(meDriver, me.organization.url)
      }
      else {
        let fromId = utils.getId(val.from)
        let fr = this._getItem(fromId)
        let changeFr = await this.changeName(val, fr)
        if (changeFr)
          this.trigger({action: 'addItem', resource: changeFr})
      }
      this.addLastMessage(val, batch)
    }
    if (list[key]) {
      let v = {}
      _.extend(v, val)
      this._setItem(key, v)
    }
    if (!noTrigger) {
      if (!context)
        context = val._context ? this._getItem(utils.getId(val._context)) : null
      if (isReadOnly) {
        if (isContext)
          this.addMessagesToChat(utils.getId(val), val)
        else if (val._context) {
          let cId = utils.getId(context)
          if (val._context  &&  utils.isReadOnlyChat(val)) // context._readOnly)
            this.addMessagesToChat(cId, val)

          let changed = true
          // if (type === ASSIGN_RM)
          //   context._assignedRM = val.employee
          // else
          if (type === APPLICATION_DENIAL)
            context._denied = true
          else if (type === APPLICATION_SUBMITTED)
            context._appSubmitted = true
          else if (type === APPLICATION_APPROVAL)
            context._approved = true
          else if (type !== ASSIGN_RM)
            changed = false
          if (changed) {
          // if (type === ASSIGN_RM  ||  type === APPLICATION_DENIAL ||  type === APPLICATION_SUBMITTED  ||  type === APPLICATION_APPROVAL) {              this._setItem(cId, context)
            this.trigger({action: 'updateRow', resource: context, forceUpdate: true})
            this.dbBatchPut(cId, context, batch)
          }
        }
      }
      // Check that the message was send to the party that is not anyone who created the context it was send from
      // That is possible if the message was sent from shared context
      else if (isThirdPartySentRequest) {
        if (!context)
          debugger
        let chat
        if (me.isEmployee)
          chat = utils.getId(context.to) === utils.getId(this.getRepresentative(me.organization)) ? context.from : context.to
        else
          chat = utils.getId(context.to) === meId ? context.from : context.to
        let chatR = this._getItem(chat)
        let id  = chatR && chatR.organization ? utils.getId(chatR.organization) : utils.getId(chatR)
        this.addMessagesToChat(id, val)
      }
      else {
        let oId = utils.getId(org ? org : from)
        if (isFormRequest  &&  val.form === PRODUCT_REQUEST) {
          let messages = chatMessages[oId]
          if (messages  &&  messages.length) {
            let r = this._getItem(messages[messages.length - 1])
            if (r[TYPE] === FORM_REQUEST  &&  r.form === PRODUCT_REQUEST  &&  !r._documentCreated) {
              noTrigger = true
              return
            }
          }
        }
        this.addMessagesToChat(oId, val)
      }
    }
    this.dbBatchPut(key, val, batch)
    this.addVisualProps(val)
    // if (!switchToContext  &&  isFormRequest  &&  context  &&  context._startForm)
    //   switchToContext = true
    // if (!noTrigger  &&  switchToContext) {
    //   Alert.alert(
    //     `The application for ${utils.makeModelTitle(resource.product)} was started by another employee`,
    //     'Do you want to switch to it and continue from there?',
    //     [
    //       {text: translate('cancel'), onPress: () => console.log('Canceled!')},
    //       {text: translate('Ok'),     onPress: () => switchToChatContext(context, val.from)},
    //     ]
    //   )
    //   // noTrigger = true
    // }
    // // }
    return { noTrigger, application, isRM }

    // async function switchToChatContext(context, to) {
    //   await self.searchServer({modelName: MESSAGE, to: self._getItem(to.organization ||  to), context: context, switchToContext: true})
    // }
    async function setupEmployee() {
      me.isEmployee = true
      me.organization = self.buildRef(org)
      self.resetForEmployee(me, org)
      // let bookmark = {
      //   [TYPE]: BOOKMARK,
      //   message: 'My Customers',
      //   bookmark: {
      //     [TYPE]: APPLICATION,
      //     relationshipManagers: [self._makeIdentityStub(me)]
      //   },
      //   from: me
      // }
      // await self.onAddChatItem({resource: bookmark, noTrigger: true})

      const bookmarks = getEmployeeBookmarks({
        me,
        botPermalink: self.getRepresentative(me.organization)[ROOT_HASH]
      })

      for (const bookmark of bookmarks) {
        // can we do this in parallel?
        await self.onAddChatItem({resource: bookmark, noTrigger: true})
      }

      if (me.firstName === FRIEND) {
        let toRep = self.getRepresentative(utils.getId(org))
        toRep = self._getItem(toRep)
        let result = []
        let arr = [NAME, PERSONAL_INFO, APPLICANT, BASIC_CONTACT_INFO]
        for (let j=0; j<arr.length; j++) {
          let sr = await self.searchMessages({modelName: arr[j], to: org})
          if (sr)
            result = result.concat(sr)
        }

        if (result.length) {
          let fRes = result.find((r) => utils.getId(r.from) === meId)
          me.firstName = fRes.firstName || fRes.givenName
        }
      }
      self._setItem(meId, me)
      await self.dbPut(meId, me)
      disableBlockchainSync(meDriver)
    }
    async function modelsPackHandler() {
      // org.products = []
      let pList = val.models || []
      pList.forEach((m) => {
        if (!self.getModel(m.id))
          self._emitter.emit('model:' + m.id)
        m._versionId = val.versionId

        storeUtils.parseOneModel(m, models, enums)
        batch.push({type: 'put', key: m.id, value: m})
      })
      utils.setModels(self.getModels())
      // utils.setModels(models)

      if (val.lenses) {
        val.lenses.forEach((l) => {
          batch.push({type: 'put', key: l.id, value: l})
          lenses[l.id] = l
        })
      }
      await db.batch(batch)
      // let orgId = utils.getId(org)
      // list[orgId].value = org
      // self.dbBatchPut(utils.getId(org), org, batch)
      // self.trigger({action: 'getItem', resource: org})
      // noTrigger = hasNoTrigger(orgId)
      if (!self.preferences  ||  self.preferences.firstPage !== 'chat' ||  !ENV.autoRegister)
        return
        // ENV.autoRegister                &&
        // org.products.length === 1) {
      let meRef = self.buildRef(utils.getMe())
      let pa = await self.searchMessages({modelName: PRODUCT_REQUEST})
      let product = org.products[0]
      let hasThisProductApp
      if (pa  &&  pa.some((r) => r.requestFor === product))
        return true
      if (org._greeting) {
        let msg = {
          [TYPE]: SIMPLE_MESSAGE,
          [ROOT_HASH]: val.from.title.replace(' ', '_') + '_1',
          message: translate(org._greeting),
          time: new Date().getTime(),
          from: val.from,
          to: meRef
        }
        let msgId = utils.getId(msg)
        self._setItem(msgId, msg)
        self.addMessagesToChat(utils.getId(org), msg)
        self.trigger({action: 'addMessage', resource: msg})
        db.put(msgId, msg)
      }
      self.onAddMessage({
        msg: {
          [TYPE]: PRODUCT_REQUEST,
          requestFor: product,
          from: meRef,
          to: val.from
        }
      })
      return true
    }

  },
  async getContext(contextId, val) {
    let context
    if (me.isEmployee) {
      let myOrgRep = this.getRepresentative(me.organization)
      // let msg = await this.searchServer({modelName: MESSAGE, noTrigger: true, filterResource: {contextId: contextId}})
      let contexts = await this.searchServer({modelName: PRODUCT_REQUEST, noTrigger: true, filterResource: {contextId: contextId}})
      if (!contexts  ||  !contexts.list) {
        debugger
        return
      }
      let meId = utils.getId(me)
      let botId = utils.getId(utils.getId(this.getRepresentative(me.organization)))
      let list = contexts.list
      if (list.length === 1)
        context = list[0]
      else {
        let meContext = list.filter((c) => c.from.id === meId)
        if (!meContext.length)
          meContext = list.filter((c) => c.from.id === botId)

        context = meContext  &&  meContext[0] ||  contexts[0]
        context.to = utils.clone(val.from)
      }
      this.addVisualProps(context)
    }
    else {
      let contexts = await this.searchMessages({modelName: PRODUCT_REQUEST})
      if (contexts  &&  contexts.list)
        contexts = contexts.list.filter((c) => c.contextId === contextId)
      context = contexts[0]
      context.from = utils.clone(val.from)
    }
    contextIdToResourceId[contextId] = context
    return context
  },
  async changeName(val, fr) {
    let fromId = utils.getId(fr)
    let meId = utils.getId(me)
    let isMe = utils.getId(fr) === meId
    if (val[TYPE] === NAME  ||  val[TYPE] === APPLICANT) {
      if (isMe)
        fr = utils.clone(fr)
      fr.firstName = val.givenName
      fr.lastName = val.surname
      fr.formatted = utils.templateIt(this.getModel(PROFILE).properties.formatted, fr)
      this._setItem(fromId, fr)
      if (isMe)
        this.setMe(fr)
      await this.dbPut(fromId, fr)
      return fr
    }
    if (fr.firstName !== FRIEND  ||  !val.scanJson)
      return
    let firstName, lastName
    let personal = val.scanJson.personal
    if (personal) {
      firstName = personal.firstName
      lastName = personal.lastName
    }
    else {
      let properties = val.scanJson.properties
      if (!properties)
        return
      firstName = properties.first_name
      lastName = properties.last_name
    }
    if (!firstName)
      return
    firstName = firstName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())

    if (isMe)
      fr = utils.clone(fr)

    fr.firstName = firstName
    if (lastName)
      fr.lastName = lastName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
    else
      lastName = ''
    if (fr.formatted)
      fr.formatted = firstName + ' ' + lastName
    if (isMe)
      this.setMe(fr)

    this._setItem(fromId, fr)
    await this.dbPut(fromId, fr)
    return fr
  },
  loadMyResources() {
    //   this._loadedResourcesDefer.resolve()
    // return
    const self = this;
    let myId
    // console._time('dbStream')
    var orgContacts = {}
    return utils.dangerousReadDB(db)
    .then((results) => {
      if (!results.length)
        return
        // return self.loadModels();

      results.forEach((data) => {
        if (data.value == null) return
        let dtype = data.value.type
        if (dtype === MODEL) {
          let m = data.value
          if (models[data.key])
            return
          models[data.key] = data;
          self.setPropertyNames(m.properties)
          if (utils.isEnum(m))
            storeUtils.createEnumResources(m, enums)
          return
        }
        if (data.value[TYPE] === LENS) {
          let lens = data.value
          if (lenses[lens.id])
            return
          lenses[lens.id] = lens
        }
        if (dtype === CUSTOMER_WAITING  ||  dtype === SELF_INTRODUCTION  ||  (dtype === FORM_REQUEST && data.value.product === PRODUCT_REQUEST))
          return
        isLoaded = true
        if (!myId  &&  data.key === MY_IDENTITIES) {
          myId = data.value.currentIdentity;
          if (list[myId]) {
            me = this._getItem(myId)
            utils.setMe(me)
          }
        }
        if (!me  &&  myId  && data.key == myId) {
          me = data.value
          utils.setMe(me)
        }
        let rtype = data.value[TYPE]
        if (rtype === PROFILE) {
          if (data.value.securityCode)
            employees[data.value.securityCode] = data.value

          const org = data.value.organization
          if (org) {
            const orgId = utils.getId(org)
            if (!orgContacts[orgId])
              orgContacts[orgId] = []
            var c = orgContacts[orgId]
            c.push(self.buildRef(data.value))
          }
        }

        self._setItem(data.key, data.value)
      })
      var sameContactList = {}
      for (let p in orgContacts) {
        if (!list[p])
          continue
        var org = this._getItem(p)
        if (!org.contacts  ||  org.contacts.length !== orgContacts[p].length) {
          org.contacts = orgContacts[p]
          continue
        }
        var newContact
        orgContacts[p].forEach((c) => {
          var i = 0
          for (; i<org.contacts.length; i++) {
            var id = utils.getId(org.contacts[i])
            if (utils.getId(c) === id)
              break
          }
          if (i !== org.contacts.length)
            newContact = true
        })
        if (newContact)
          org.contacts = orgContacts[p]
        else
          sameContactList[p] = p
      }
      // this.loadStaticData()

      for (var s in sameContactList)
        delete orgContacts[s]
      if (!utils.isEmpty(orgContacts)) {
        var results = this.searchNotMessages({modelName: ORGANIZATION})
        self.trigger({action: 'list', modelName: ORGANIZATION, list: results})
      }

      console.log('Stream ended');
      // var noModels = utils.isEmpty(models);
      // if (noModels)
      //   return self.loadModels();
      if (me  &&  (!list[utils.getId(me)] || !list[utils.makeId(IDENTITY, me[ROOT_HASH])]))
        me = null
      console.log('Stream closed');
      utils.setModels(self.getModels()) //models);
    })
    .then(() => {
      if (me  &&  me.isEmployee) {
        let changed
        let orgId = utils.getId(me.organization)
        let org = this._getItem(orgId)
        if (org._canShareContext !== me.organization._canShareContext) {
          changed = true
          me.organization._canShareContext = org._canShareContext
        }
        if (org._hasSupportLine !== me.organization._hasSupportLine) {
          changed = true
          me.organization._hasSupportLine = org._hasSupportLine
        }
        if (changed) {
          let meId = utils.getId(me)
          db.put(meId, me)
          self._setItem(meId, me)
        }
      }
      if (me  &&  utils.isEmpty(chatMessages)) {
        return this.initChats()
        // if (me) {
        //   // db resource do not have properties needed for rendering
        //   let allMessages = self.searchMessages({modelName: MESSAGE, to: me})
        //   if (allMessages) {
        //     allMessages.forEach((r) => {
        //       r = self.addVisualProps(r)
        //       self._setItem(utils.getId(r), r)
        //     })
        //   }
        // }
      }
    })
    .then(() => {
      if (SERVICE_PROVIDERS.length)
        SERVICE_PROVIDERS.forEach((p) => this._getItem(p.org)._online = true)
      else {
        let orgs = self.searchNotMessages({modelName: ORGANIZATION, all: true})
        if (orgs.length)
          orgs.forEach((org) => {
            self._getItem(utils.getId(org))._online = false
          })
      }
      this._loadedResourcesDefer.resolve()
    })
    .catch(err => {
      debugger
      console.error('err: ' + err.message, err.stack);
    })
  },
  // Received by employee/bot request from customer. And all the customer resources on FI side gets deleted
  forgetMe(resource) {
    let batch = []
    let ids = []

    return this.searchMessages({modelName: MESSAGE, to: resource, isForgetting: true})
    .then((result) => {
      result.forEach((r) => {
        let id = utils.getId(r)
        batch.push({type: 'del', key: id})
        ids.push(id)
      })
      let id = utils.getId(resource)
      ids.push(id)
      batch.push({type: 'del', key: id})

      return db.batch(batch)
    })
    .then(() => {
      ids.forEach((id) => {
        this.deleteMessageFromChat(utils.getId(resource), this._getItem(id))
        delete list[id]
      })
      this.trigger({action: 'messageList', modelName: MESSAGE, to: resource, forgetMeFromCustomer: true, isChat: true})
      return this.meDriverSignAndSend({
        object: { [TYPE]: FORGOT_YOU },
        to: { permalink: resource[ROOT_HASH] }
      })
    })
    .catch((err) => {
      debugger
    })
  },
  // Creates resources from subClassOf tradle.Enum models that have 'enum' model property
  // createEnumResources(model) {
  //   if (!utils.isEnum(model)  ||  !model.enum)
  //     return
  //   let eProp
  //   for (let p in model.properties) {
  //     if (p !== TYPE) {
  //       eProp = p
  //       break
  //     }
  //   }
  //   model.enum.forEach((r) => {
  //     let enumItem = {
  //       [TYPE]: model.id,
  //       [ROOT_HASH]: r.id,
  //       [eProp]: r.title
  //     }
  //     this.loadStaticItem(enumItem)
  //   })
  // },
  // Cleanup and notify customer that FI successfully forgotten him
  forgotYou(resource) {
    var org = this._getItem(utils.getId(resource.organization))
    var orgId = utils.getId(org)
    var msg = {
      [TYPE]: FORGOT_YOU,
      // [NONCE]: this.getNonce(),
      message: translate('youAreForgotten'),
      from: this.buildRef(org),
      to: this.buildRef(me),
      [IS_MESSAGE]: true
    }
    msg[ROOT_HASH] = sha(msg)

    var reps = this.getRepresentatives(orgId)
    var promises = []
    reps.forEach((r) =>
      promises.push(meDriver.forget(r[ROOT_HASH]))
    )
    var batch = []
    var notDeleted = {}
    return Q.allSettled(promises)
    .then((result) => {
      result.forEach((data) => {
        if (data.state !== 'fulfilled')
          return
        data.value.forEach((r) => {
          r = utils.toOldStyleWrapper(r)
          var rId = utils.getId(r)
          var res = this._getItem(rId)
          if (!res) {
            let idx = r[TYPE].indexOf('Confirmation')
            if (idx === -1)
              return
            let realProductType = r[TYPE].substring(0, r[TYPE].length - 'Confirmation'.length)
            let m = this.getModel(realProductType)
            if (!m  ||  m.subClassOf !== FINANCIAL_PRODUCT)
              return
            // This is confirmation for getting the product
            rId = utils.makeId(SIMPLE_MESSAGE, r[ROOT_HASH])
            res = list[rId]
            if (!res)
              return
            res = res.value
            r = res
          }
          var isVerification = r[TYPE] === VERIFICATION
          var model = this.getModel(r[TYPE])
          var isForm = !isVerification  &&  model.subClassOf === FORM
          var deleted = !(res._sharedWith && res._sharedWith.length > 1)
          if (!deleted) {
            var fromId = utils.getId(res.from)
            var toId = utils.getId(res.to)
            var sharedWith = res._sharedWith || []
            var sharedWithKeys = sharedWith.map((r) => r.bankRepresentative)
            reps.forEach((r) => {
              var rId = utils.getId(r)
              var idx = sharedWithKeys.indexOf(rId)
              if (idx !== -1)
                sharedWith.splice(idx, 1)
            })
            let contextId = res  &&  res._context  &&  utils.getId(res._context)
            if (contextId) {
              for (let i=0; i<batch.length; i++) {
                if (batch[i].key === contextId  &&  batch[i].type === 'del') {
                  batch.splice(i, 1)
                  let c = this._getItem(contextId)
                  c._inactive = true
                  this.dbBatchPut(contextId, c, batch)
                  notDeleted[contextId] = c
                  break
                }
              }
              notDeleted[contextId] = res._context
            }
            if (res[TYPE] === VERIFICATION) {
              let documentId = utils.getId(res.document)
              for (let i=0; i<batch.length; i++) {
                if (batch[i].key === documentId  &&  batch[i].type === 'del') {
                  batch.splice(i, 1)
                  let doc = this._getItem(documentId)
                  doc._inactive = true
                  this.dbBatchPut(documentId, doc, batch)
                  notDeleted[documentId] = doc
                  break
                }
              }
            }
            this.dbBatchPut(rId, res, batch)
          }
          if (isVerification) {
            // var myVerifications = me.myVerifications.filter(function(r) {
            //   var verification = list[utils.getId(r)]
            //   if (!verification)
            //     return false
            //   verification = verification.value
            //   return utils.getId(verification) === rId ? false : true
            // })
            // if (myVerifications.length != me.myVerifications.length) {
            //   me.myVerifications = myVerifications
            //   batch.push({type: 'put', key: utils.getId(me), value: me})
            // }
            // Cleanup form from the deleted verification
            if (deleted) {
              var docPair = list[utils.getId(res.document)]
              if (docPair) {
                var doc = this._getItem(utils.getId(res.document))
                if (doc.verifications) {
                  var verifications = doc.verifications.filter((r) => {
                    return (utils.getId(r) === rId) ? false : true
                  })
                  if (doc.verifications.length != verifications.length) {
                    doc.verifications = verifications
                    for (var i=0; i<data.length; i++) {
                      if (data[i][ROOT_HASH] === doc[ROOT_HASH]  &&  !data[i].deleted)
                        this.dbBatchPut(utils.getId(doc), doc, batch)
                    }
                  }
                }
              }
            }
          }
          if (deleted  &&  !notDeleted[rId]) {
            if (res._sharedWith) {
              res._sharedWith.forEach((r) => {
                let org = this._getItem(r.bankRepresentative).organization
                // this.deleteMessageFromChat(utils.getId(org), res)
              })
            }
            // delete list[rId]
            // this.deleteMessageFromChat(orgId, r)
            this.addBacklinksTo(DELETE, me, res)
            batch.push({type: 'del', key: rId})
          }
        })
      })
      this.trigger({action: 'addItem', resource: me})
      let hasDeleted
      batch.forEach((r) => {
        if (r.type === 'del') {
          hasDeleted = true
          delete list[r.key]
        }
      })
      if (hasDeleted)
        this.trigger({action: 'addItem', resource: utils.getMe()})
      // this.trigger({action: 'messageList', list: [msg], resource: org, to: resource})
      this.trigger({action: 'messageList', list: [msg], to: org, isChat: true})
      let messages = chatMessages[orgId]
      let allMessages = chatMessages[ALL_MESSAGES]
      messages.forEach((r) => {
        let idx = allMessages.findIndex(({ id }) => id === r.id)
        allMessages.splice(idx, 1)
      })
      chatMessages[orgId] = []

      return db.batch(batch)
    })
    .then(() => this.searchMessages({to: org, modelName: MESSAGE, isForgetting: true}))
    .then((result) => {
      batch = []
      if (result) {
        let allMessages = chatMessages[ALL_MESSAGES]
        result.forEach((r) => {
          let doDelete = r[TYPE] === SELF_INTRODUCTION  ||  (r[TYPE] === SIMPLE_MESSAGE  &&  r.message  &&  r.message.indexOf('Congratulations') === 0)
          if (doDelete) {
            var id = utils.getId(r)
            batch.push({type: 'del', key: id})
            delete list[id]
            let idx = allMessages.findIndex(({ id }) => id === r.id)
            allMessages.splice(idx, 1)
          }
        })
      }
      // resource.numberOfForms = 0

      // reps.forEach((r) => {
      //   r.lastMessageTime = null
      //   r.lastMessage = null
      //   delete publishRequestSent[utils.getId(r.organization)]
      // })
      delete publishRequestSent[orgId]

      org.lastMessage = null
      org.lastMessageTime = null
      org.lastMessageType = null
      org._formsCount = 0
      this.trigger({action: 'list', modelName: ORGANIZATION, list: this.searchNotMessages({modelName: ORGANIZATION/*, to: org*/})})
      batch.push({type: 'put', key: orgId, value: org})
      if (batch.length)
        return db.batch(batch)
    })
    .catch((err) => {
      debugger
    })
  },

  async getAllSharedContexts() {
    let list = await this.searchMessages({modelName: PRODUCT_REQUEST})
    if (!list  ||  !list.length)
      return
    let l = list.filter((r) => {
      let isReadOnly = utils.isReadOnlyChat(r)
      if (isReadOnly)
        this.addVisualProps(r)
      return isReadOnly
    })
    let promises = []
    for (let i=0; i<l.length; i++) {
      let r = l[i]
      promises.push(this.searchMessages({modelName: MESSAGE, to: r}))
      // let forms = await this.searchMessages({modelName: MESSAGE, to: r})
    }
    let pa = await Q.all(promises)
    pa.forEach((forms, i) => {
      let r = l[i]
      if (!forms  ||  r._approved)
        return
      let result = forms.map((rr) => {
        if (rr[TYPE] === APPLICATION_SUBMITTED) {
          r._appSubmitted = true
          this.dbPut(utils.getId(r), r)
        }
        else if (this.getModel(rr[TYPE]).subClassOf === MY_PRODUCT) {
          r._approved = true
          this.dbPut(utils.getId(r), r)
        }
      })
    })
    l.sort((a, b) => b._sentTime - a._sentTime)
    return l
  },
  cleanup(result) {
    if (!result.length)
      return Q()

    var batch = []
    var meId = utils.getId(me)
    result.forEach((r) => {
      batch.push({type: 'del', key: utils.getId(r), value: r})
      if (this.getModel(r[TYPE]).interfaces) {
        let id = (utils.getId(r.from) === meId) ? utils.getId(r.to) : utils.getId(r.from)
        let rep = this._getItem(id)
        let orgId = rep.bot  &&  rep.organization ? utils.getId(rep.organization) : utils.getId(rep)

        this.deleteMessageFromChat(orgId, r)
      }
      delete list[utils.getId(r)]
    })
    return db.batch(batch)
    .catch((err) => {
      err = err
    })
  },
  onForgetMe(resource, noTrigger) {
    // var me = utils.getMe()
    var msg = {
      [TYPE]: FORGET_ME,
      // [NONCE]: this.getNonce()
    }
    var rId = utils.getId(resource)
    var orgReps = resource[TYPE] === ORGANIZATION
                ? this.getRepresentatives(rId)
                : [resource]

    let promises = []

    for (let rep of orgReps) {
      let id = utils.makeId(IDENTITY, rep[ROOT_HASH])
      let r = this._getItem(id)

      let sendParams = this.packMessage(msg, me, r)
      promises.push(this.meDriverSignAndSend(sendParams)

      // promises.push(this.meDriverSignAndSend({
      //   object: msg,
      //   to: { fingerprint: this.getFingerprint(r) }
      // })
    )}

    return Q.all(promises)
    .then((results) => {
      if (noTrigger)
        return
      // var result = this.searchMessages({to: resource, modelName: MESSAGE});
      msg[ROOT_HASH] = results[0].object.permalink
      msg[CUR_HASH] = results[0].object.link
      msg.message = translate('inProgress')
      // reverse to and from to display as from assistent
      let pid = utils.makeId(PROFILE, results[0].message.recipient)
      msg.from = this.buildRef(list[pid].value)
      msg.to = this.buildRef(me)
      msg[IS_MESSAGE] = true

      let mId = utils.getId(msg)
      list[mId] = {
        key: mId,
        value: msg
      }
      let batch = []

      this.addMessagesToChat(utils.getId(rId), msg)

      batch.push({type: 'put', key: mId, value: msg})
      // result.push(msg)
      this.trigger({action: 'addMessage', to: resource, resource: msg, isChat: true})

      resource.lastMessage = translate('requestedForgetMe')
      resource.lastMessageTime = new Date().getTime()
      resource.lastMessageType = FORGET_ME
      this.trigger({action: 'list', modelName: ORGANIZATION, list: this.searchNotMessages({modelName: ORGANIZATION}), forceUpdate: true})

      batch.push({type: 'put', key: rId, value: resource})
      db.batch(batch)
    })
    .catch(function (err) {
      debugger
    })
  },

  // Devices one
  // onGenPairingData() {
  //   if (!SERVICE_PROVIDERS.length) {
  //     this.trigger({action: 'genPairingData', error: 'Can\'t connect to server'})
  //     return
  //   }
  //   let pairingData = {
  //     nonce: crypto.randomBytes(32).toString('base64'),
  //     identity: meDriver.link,
  //     firstName: me.firstName,
  //     rendezvous: {
  //       url: SERVICE_PROVIDERS[0].url + '/' + SERVICE_PROVIDERS[0].id
  //     }
  //   }
  //   let dbPairingData = utils.clone(pairingData)
  //   dbPairingData[TYPE] = PAIRING_DATA
  //   // db.put(PAIRING_DATA + '_1', pairingData)
  //   list[PAIRING_DATA + '_1'] = {key: PAIRING_DATA + '_1', value: dbPairingData}
  //   this.trigger({action: 'genPairingData', pairingData: JSON.stringify(pairingData)})
  // },

  // onSendPairingRequest (pairingData) {
  //   // device 2 sends pairing request
  //   let publishedIdentity
  //   let deviceId

  //   let myIdentities = this._getItem(MY_IDENTITIES)
  //   if (myIdentities) {
  //     publishedIdentity = myIdentities.allIdentities[0].publishedIdentity
  //     deviceId = this._getItem(utils.makeId(IDENTITY, pairingData.identity)).deviceId
  //   }

  //   let promise = myIdentities
  //               ? Q()
  //               : this.createNewIdentity()
  //               // : Q.ninvoke(tradleUtils, 'newIdentity', {
  //               //       networkName,
  //               //       keys: KEY_SET
  //               //   })
  //   return promise
  //   .then(({ encryptionKey, identityInfo }) => {
  //     if (!identityInfo)
  //       return
  //     publishedIdentity = identityInfo.identity
  //     let mePub = publishedIdentity.pubkeys
  //     let mePriv = identityInfo.keys
  //     let currentIdentity = utils.makeId(PROFILE, pairingData.identity)
  //     var myIdentities = {
  //       [TYPE]: MY_IDENTITIES_TYPE,
  //       currentIdentity: currentIdentity,
  //       allIdentities: [{
  //         id: currentIdentity,
  //         // title: utils.getDisplayName(value, models[me[TYPE]].value.properties),
  //         privkeys: mePriv,
  //         publishedIdentity: publishedIdentity
  //       }]
  //     }
  //     var profile = {
  //       [TYPE]: PROFILE,
  //       [ROOT_HASH]: pairingData.identity,
  //       firstName: pairingData.firstName,
  //       formatted: pairingData.firstName,
  //     }
  //     deviceId = identityInfo.link
  //     var identity = {
  //       [TYPE]: IDENTITY,
  //       [ROOT_HASH]: pairingData.identity,
  //       pubkeys: mePub,
  //       deviceId: deviceId
  //     }
  //     let batch = []
  //     list[currentIdentity] = {
  //       key: currentIdentity,
  //       value: profile
  //     }
  //     let identityId = utils.getId(identity)
  //     list[identityId] = {
  //       key: identityId,
  //       value: identity
  //     }
  //     list[MY_IDENTITIES] = {
  //       key: MY_IDENTITIES,
  //       value: myIdentities
  //     }
  //     batch.push({type: 'put', key: MY_IDENTITIES, value: myIdentities})
  //     batch.push({type: 'put', key: currentIdentity, value: profile})
  //     batch.push({type: 'put', key: utils.getId(identity), value: identity})
  //     db.batch(batch)
  //   })
  //  .then(() => {
  //     const pairingReq = {
  //       [TYPE]: PAIRING_REQUEST,
  //       identity: publishedIdentity
  //     }

  //     const hmac = crypto.createHmac('sha256', pairingData.nonce)
  //     hmac.update(tradleUtils.stringify(pairingReq))
  //     pairingReq.auth = hmac.digest('base64')

  //     const url = pairingData.rendezvous.url
  //     let transport = driverInfo.wsClients.byUrl[url]
  //     if (!transport) {
  //       let wsClient = this.getWsClient(url, deviceId)
  //       transport = this.getTransport(wsClient, deviceId)
  //       driverInfo.wsClients.byUrl[url] = transport
  //     }
  //     let self = this
  //     transport.on('message', (msg, from) => {
  //       try {
  //         const payload = JSON.parse(msg)
  //         if (payload[TYPE] === PAIRING_RESPONSE) {
  //           transport.destroy()
  //           delete driverInfo.wsClients.byUrl[url]

  //           return self.onProcessPairingResponse(this._getItem(PAIRING_DATA + '_1'), payload)
  //           .then(() => {
  //             debugger
  //             Alert.alert('Pairing was successful')
  //             this.trigger({action: 'pairingSuccessful'})
  //           })
  //           .catch((err) => {
  //             debugger
  //             Alert.alert(err)
  //           })
  //         }
  //       } catch (err) {
  //         debugger
  //       }
  //     })

  //     // if (!transport) {
  //     //   let wsClient = this.getWsClient(url, meDriver.permalink)
  //     //   transport = this.getTransport(wsClient, meDriver.permalink)
  //     //   driverInfo.wsClients.byUrl[url] = transport
  //     // }
  //     const pairingReqStr = tradleUtils.stringify(pairingReq)

  //     function send () {
  //       return Q.ninvoke(transport, 'send', pairingData.identity, pairingReqStr)
  //         .then(() => {
  //           // debugger
  //           let dbPairingData = utils.clone(pairingData)
  //           dbPairingData[TYPE] = PAIRING_DATA
  //           // db.put(PAIRING_DATA + '_1', pairingData)
  //           list[PAIRING_DATA + '_1'] = {key: PAIRING_DATA + '_1', value: dbPairingData}
  //         })
  //         .catch((err) => {
  //           debugger
  //         })
  //     }

  //     return utils.tryWithExponentialBackoff(send)
  //   })
  //     // .then(() => {
  //     //   this.trigger({action: 'sentPairingRequest', pairingData: pairingData})
  //     // })
  // },

  // onProcessPairingRequest(pairingData, pairingReq) {
  //   const myPubKeys = meDriver.identity.pubkeys
  //   const alreadyPaired = pairingReq.identity.pubkeys.some(a => {
  //     return myPubKeys.some(b => {
  //       return a.pub === b.pub
  //     })
  //   })

  //   const verify = crypto.createHmac('sha256', pairingData.nonce)
  //   verify.update(tradleUtils.stringify(tradleUtils.omit(pairingReq, 'auth')))
  //   if (verify.digest('base64') !== pairingReq.auth) {
  //     return Promise.reject(new Error('invalidPairingRequest'))
  //   }

  //   if (alreadyPaired) {
  //     // won't work because prev is not right
  //     return sendResponse()
  //   }

  //   const allPubKeys = meDriver.identity.pubkeys.concat(pairingReq.identity.pubkeys)
  //   const pubkeys = allPubKeys.map(pk => tradleUtils.clone(pk))
  //   let identity = {
  //           keys: meDriver.keys.concat(pairingReq.identity.pubkeys),
  //           identity: tradleUtils.clone(meDriver.identity, {
  //             pubkeys: pubkeys // allPubKeys.map(pk => tradleUtils.clone(pk))
  //           })
  //         }
  //   return Q.ninvoke(meDriver, 'updateIdentity', identity)
  //   .then(() => {
  //     let batch = []
  //     batch.push({type: 'put', key: PAIRING_REQUEST + '_1', value: pairingReq})
  //     this.updatePubkeys(batch)
  //     // let batch = []
  //     // let id = IDENTITY + '_' + utils.getMe()[ROOT_HASH]
  //     // let myIdentity = list[id].value

  //     // myIdentity.pubkeys = allPubKeys.map(pk => tradleUtils.clone(pk))

  //     // updatePubkeys(myIdentity.pubkeys)
  //     // let myIdentities = list[MY_IDENTITIES].value
  //     // let currentIdentity = myIdentities.currentIdentity
  //     // myIdentities.allIdentities.forEach((r) => {
  //     //   if (r.id === currentIdentity)
  //     //     r.publishedIdentity.pubkeys = utils.clone(myIdentity.pubkeys)
  //     // })

  //     // batch.push({type: 'put', key: MY_IDENTITIES, value: myIdentities})
  //     // batch.push({type: 'put', key: id, value: myIdentity})
  //     // batch.push({type: 'put', key: PAIRING_REQUEST + '_1', value: pairingReq})

  //     // // If pairing request was not verified what do we want to do
  //     // db.batch(batch)
  //   })
  //   .then(() => {
  //     return sendResponse()
  //   })

  //   function sendResponse () {
  //     const getPrev = meDriver.identity[PREV_HASH] ? Q.ninvoke(meDriver.keeper, 'get',  meDriver.identity[PREV_HASH]) : Promise.resolve(meDriver.identity)
  //     return getPrev.then(prev => {
  //       const pairingRes = {
  //         [TYPE]: PAIRING_RESPONSE,
  //         // can we make it secure without sending prev?
  //         prev: prev,
  //         identity: meDriver.identity
  //       }

  //       const url = pairingData.rendezvous.url
  //       let transport = driverInfo.wsClients.byUrl[url]
  //       const pairingResStr = tradleUtils.stringify(pairingRes)
  //       return utils.tryWithExponentialBackoff(send)

  //       function send () {
  //         return Q.ninvoke(transport, 'send', tradleUtils.hexLink(pairingReq.identity), pairingResStr)
  //           .then(() => {
  //             db.put(PAIRING_RESPONSE + '_1', pairingRes)
  //             debugger
  //           })
  //           .catch((err) => {
  //             debugger
  //           })
  //       }
  //     })
  //   }
  // },
  // updatePubkeys(batch, identity) {
  //   let myIdentities = this._getItem(MY_IDENTITIES)
  //   let currentIdentity = myIdentities.currentIdentity

  //   let id = currentIdentity.replace(PROFILE, IDENTITY)
  //   list[id].value = identity || meDriver.identity

  //   myIdentities.allIdentities.forEach((r) => {
  //     if (r.id === currentIdentity)
  //       r.publishedIdentity = this._getItem(id)
  //   })

  //   batch.push({type: 'put', key: MY_IDENTITIES, value: myIdentities})
  //   batch.push({type: 'put', key: id, value: this._getItem(id)})

  //   // If pairing request was not verified what do we want to do
  //   db.batch(batch)
  // },

  // onProcessPairingResponse (pairingData, pairingRes) {
  //   // device 2 validate response
  //   if (tradleUtils.hexLink(pairingRes.prev) !== pairingData.identity)
  //     return Promise.reject(new Error('prev identity does not match expected'))

  //   let pubkeys = this._getItem(utils.makeId(IDENTITY, pairingData.identity)).pubkeys
  //   const hasMyKeys = pubkeys.every(myKey => {
  //     return pairingRes.identity.pubkeys.some(theirKey => {
  //       return deepEqual(theirKey, myKey)
  //     })
  //   })
  //   // const hasMyKeys = meDriver.identity.pubkeys.every(myKey => {
  //   //   return pairingRes.identity.pubkeys.some(theirKey => {
  //   //     return deepEqual(theirKey, myKey)
  //   //   })
  //   // })

  //   if (!hasMyKeys)
  //     return Promise.reject(new Error(translate('deviceDoesNotHaveMyKeys')))

  //   let batch = []
  //   this.updatePubkeys(batch, pairingRes.identity)


  //   // let myIdentities = list[MY_IDENTITIES].value
  //   // let currentIdentity = myIdentities.currentIdentity

  //   // myIdentities.allIdentities.forEach((r) => {
  //   //   if (r.id === currentIdentity)
  //   //     r.publishedIdentity.pubkeys = pairingRes.identity.pubkeys
  //   // })

  //   // let id = IDENTITY + '_' + pairingData.identity
  //   // list[id].value.pubkeys = utils.clone(pairingRes.identity.pubkeys)
  //   // let batch = []
  //   // batch.push({type: 'put', key: MY_IDENTITIES, value: myIdentities})
  //   // batch.push({type: 'put', key: id, value: list[id].value})
  //   // db.batch(batch)

  //   let me = this._getItem(utils.makeId(PROFILE, pairingData.identity))
  //   return this.getDriver(me)
  //   .then(() =>  this.addContactIdentity({ identity: pairingRes.prev }))
  //   .then(() => {
  //     Q.ninvoke(meDriver, 'setIdentity', {
  //       keys: meDriver.keys.concat(pairingRes.identity.pubkeys),
  //       identity: pairingRes.identity
  //     })
  //   })
  //   .then(() => {
  //     this.setMe(me)
  //     // let me = utils.getMe()
  //     // let oldId = IDENTITY + '_' + me[ROOT_HASH]
  //     // delete list[oldId]

  //     // let oldProfileId = utils.getId(me)
  //     // let profile = list[oldProfileId].value
  //     // delete list[oldProfileId]

  //     // profile[ROOT_HASH] = pairingRes.identity[ROOT_HASH]
  //     // profile[CUR_HASH] = pairingRes.identity[ROOT_HASH]

  //     // let newId = IDENTITY + '_' + pairingRes.identity[ROOT_HASH]
  //     // list[newId] = {
  //     //   key: newId,
  //     //   value: utils.clone(pairingRes.identity)
  //     // }
  //     // let newProfileId = PROFILE + '_' +  pairingRes.identity[ROOT_HASH]
  //     // list[newProfileId] = {
  //     //   key: newProfileId,
  //     //   value: profile
  //     // }
  //     // let myIdentities = list[MY_IDENTITIES].value
  //     // myIdentities.currentIdentity = newProfileId
  //     // myIdentities.allIdentities.forEach((r) => {
  //     //   if (r.id !== oldProfileId)
  //     //     return
  //     //   r.id = newProfileId,
  //     //   r.publishedIdentity.pubkeys = utils.clone(pairingRes.identity.pubkeys)
  //     // })

  //     // let batch = []
  //     // batch.push({type: 'del', key: oldId})
  //     // batch.push({type: 'del', key: oldProfileId})
  //     // batch.push({type: 'put', key: MY_IDENTITIES, value: list[MY_IDENTITIES].value})
  //     // batch.push({type: 'put', key: newId, value: list[newId].value})
  //     // batch.push({type: 'put', key: newProfileId, value: list[newProfileId].value})
  //     // batch.push({type: 'put', key: PAIRING_RESPONSE + '_1', value: pairingRes})
  //     // db.batch(batch)
  //   })
  // },
  getModels() {
    let mm = {}
    for (let m in models)
      mm[m] = models[m].value

    return mm
  },
  getModel(modelOrId) {
    const id = typeof modelOrId === 'string' ? modelOrId : modelOrId.id
    const cached = modelsWithAddOns[id]
    if (cached) return cached
    if (!models) return

    const model = typeof modelOrId === 'string'
      ? models[id] && models[id].value
      : modelOrId

    if (model) {
      modelsWithAddOns[id] = this.getAugmentedModel(model)
      return modelsWithAddOns[id]
    }
  },

  getAugmentedModel(model) {
    model = _.cloneDeep(model)
    storeUtils.addOns(model, models, enums)
    // let props = rModel.properties
    // for (let p in props)
    //   props[p].name = p
    return model
  },

  getOriginalModel(modelName) {
    return models  &&  models[modelName] && models[modelName].value
  },
  getLenses() {
    return lenses
  },
  getLens(id) {
    return lenses[id]
  },

  validateResource(resource) {
    validateResource({
      models: this.getModels(),
      resource
    })
  },

  loadDB() {
    const self = this
    if (utils.isEmpty(models))
      storeUtils.addModels({models, enums})

    // // return this.loadStaticDbData(true)
    // // .then(() => {
    //   return this.loadMyResources()
    // // })
    // // .then(self.loadAddressBook)
    // .catch((err) => {
    //   err = err;
    // });
  },
  loadStaticData() {
    sampleData.getResources().forEach((r) => {
      storeUtils.loadStaticItem(r, enums)
    });
  },
  // loadStaticItem(r, saveInDB, batch) {
  //   if (!r[ROOT_HASH])
  //     r[ROOT_HASH] = sha(r)

  //   r[CUR_HASH] = r[ROOT_HASH]
  //   let type = r[TYPE]
  //   let enumList = enums[type]
  //   if (!enumList) {
  //     enumList = []
  //     enums[type] = enumList
  //   }

  //   if (enumList.filter((e) => e[ROOT_HASH] === r[ROOT_HASH]).length)
  //     return
  //   enumList.push(r)
  //   // let id = utils.getId(r)
  //   let key = [r[TYPE], r[ROOT_HASH], r[CUR_HASH]].join('_')
  //   if (saveInDB)
  //     batch.push({type: 'put', key, value: r})
  // },

  loadModels() {
    // var batch = [];

    // for (var m in models)
    //   batch.push({type: 'put', key: m, value: models[m].value});

    // this.setBusyWith('loadingModels')

    // // return Promise.resolve()
    // return db.batch(batch)
    //       .then(() => {
    //         this.setBusyWith('loadingResources')
    //         return this.loadMyResources();
    //       })
    //       .catch((err) => {
    //         err = err;
    //       });
    this.setBusyWith('loadingResources')
    return this.loadMyResources();
  },

  async onIdle() {
    const start = Date.now()
    await Q.race([
      promiseIdle(),
      // after 2 seconds, give up waiting
      utils.promiseDelay(2000)
    ])

    const delay = Date.now() - start
    debug(`running deferred job (delayed ${delay})`)
  },
  buildSendRef(resource, noValidation) {
    let type = utils.getType(resource)
    if (utils.isEnum(type))
      return utils.buildRef(resource)

    // let st = buildResourceStub({models: this.getModels(), resource})
    let stub = {
      [TYPE]: type,
      _permalink: this.getRootHash(resource),
      _link: this.getCurHash(resource)
    }
    let title = resource[ROOT_HASH]  &&  utils.getDisplayName(resource) || resource.title
    if (title)
      stub._displayName = title
    return stub
  },
  buildRef(resource, noValidation) {
    return utils.buildRef(resource)
    // if (!resource[TYPE] && resource.id)
    //   return resource
    // let ref = this.buildSendRef(resource, noValidation)
    // if (resource._time)
    //   ref._time = resource._time
    // return ref
  },
  getRootHash(r) {
    return r[ROOT_HASH] ? r[ROOT_HASH] : r.id.split('_')[1]
  },
  getCurHash(r) {
    return r[CUR_HASH] ? r[CUR_HASH] : r.id.split('_')[2]
  },
  _setItem(key, value) {
    if (!value[TYPE]  ||  value[TYPE] === SELF_INTRODUCTION)
      return
    let isMessage = utils.isMessage(value)

    // list[key] = { key, value}
    list[key] = { key, value: isMessage ? utils.optimizeResource(value, true)  : value}
  },
  _deleteItem(id) {
    delete list[id]
  },
  _getItem(r) {
    if (typeof r === 'string') {
      if (list[r])
        return list[r].value
      let rtype = utils.getType(r)
      let m = this.getModel(rtype)
      if (!m)
        return
      if (utils.isEnum(m)) {
        let eValues = enums[rtype]
        let eVal = eValues.filter((ev) => utils.getId(ev) === r)
        if (eVal.length)
          return eVal[0]
      }
    }
    else if (r.value)
      return r.value
    else {
      let rr = list[utils.getId(r)]
      if (rr)
        return rr.value
    }
  },
  async _getItemFromServer(id, backlink) {
    if (typeof id !== 'string')
      id = utils.getId(id)
    if (!this.client) {
      debugger
      return
    }
    try {
      let result = await graphQL._getItem(id, this.client, backlink)
      if (result) {
        return this.convertToResource(result)
      }
    }
    catch(err) {
      console.log('_getItemFromServer', err)
      debugger
    }
  },
  _mergeItem(key, value) {
    const current = list[key] || {}
    list[key] = { key, value: { ...current.value, ...value } }
  },
  async gatherForms(to, context) {
    if (!context)
      return
    if (context.id) {
      let contextId = this.findContextId(context.id)
      if (contextId)
        context = contextIdToResourceId[contextId]
    }
    let product = context.requestFor
    let productM = this.getModel(product)
    let multiEntryForms = productM.multiEntryForms
    if (!multiEntryForms)
      return
    if (me.isEmployee) {
      let formRequests = await this.searchServer({modelName: MESSAGE, to, filterResource: {_payloadType: FORM_REQUEST}, context: context, noTrigger: true })
      // let formRequests = await this.searchServer({modelName: FORM_REQUEST, limit: 100, context: context, noTrigger: true})
      if (!formRequests  ||  !formRequests.list  ||  !formRequests.list.length)
        return
      let lastFormRequest = formRequests.list.filter((r) => r.form !== PRODUCT_REQUEST)
      if (!lastFormRequest.length)
        return
      let form = lastFormRequest[lastFormRequest.length - 1].form
      if (multiEntryForms.indexOf(form) === -1)
        return
      let m = this.getModel(form)
      let res = await this.searchServer({modelName: MESSAGE, filterResource: {_payloadType: form}, to: to.organization || to, search: me.isEmployee, context: context, noTrigger: true })
      if (!res  ||  !res.list  || !res.list.length)
        return
      let productToForms = {[product]: {[form]: res.list.map((r) => utils.getId(r))}}
      return productToForms
    }
    let allFormRequests = await this.searchMessages({modelName: FORM_REQUEST, to: to, context: context})
    if (!allFormRequests)
      return
    let productToForms = {}
    let hasMultiEntry
    allFormRequests.forEach((r) => {
      if (!multiEntryForms.includes(r.form) || !r._documentCreated  ||  !r._document  ||  !r.product)
        return
      hasMultiEntry = true
      var l = productToForms[r.product]
      if (!l) {
        l = {}
        productToForms[r.product] = l
      }
      let forms = l[r.form]
      if (!forms) {
        forms = []
        l[r.form] = forms
      }
      forms.push(r._document)
    })
    if (hasMultiEntry)
      return productToForms
  },

  onViewChat({ permalink }) {
    this.onGetProvider({ permalink })
    // let to = this._getItem(PROFILE + '_' + msg.to[ROOT_HASH])
    // let chat = to.organization ? this._getItem(to.organization) : to
    // this.trigger({action: 'showChat', to: to})
  },
  onShowModal(modal) {
    this.trigger({ action: 'showModal', modal })
  },
  onHideModal() {
    this.trigger({ action: 'hideModal' })
  },

  // ENVIRONMENT VARS

  async loadEnv() {
    let previous
    try {
      previous = await db.get(MY_ENVIRONMENT)
      // some props like api keys may have been updated
      this.updateEnvironmentInMemory(previous)
    } catch (err) {
      // this is fine, environment is not stored initially
      previous = {}
    }

    const current = ENV
    await db.put(MY_ENVIRONMENT, current)
    return { previous, current }
  },

  async onUpdateEnvironment(env) {
    env.dateModified = Date.now()
    this.updateEnvironmentInMemory(env)
    await db.put(MY_ENVIRONMENT, ENV)
  },

  updateEnvironmentInMemory(env) {
    if (env.dateModified < ENV.dateModified) {
      debug('not updating ENV from storage, stored ENV is out of date')
      return
    }

    const keyPath = `microblink.licenseKey.${Platform.OS}`
    const key = dotProp.get(env, keyPath)
    if (key && key !== dotProp.get(ENV, keyPath)) {
      dotProp.set(ENV, keyPath, key)
      let blinkId = require('../Components/BlinkID')
      if (blinkId)
        blinkId.setLicenseKey(key)
      ENV.dateModified = env.dateModified
    }
  },

})
// );

module.exports = Store;

function getProviderUrl (provider) {
  return provider.url
  // return provider.id ? utils.joinURL(provider.url, provider.id) : provider.url
}

function forEachSource (sources, fn) {
  sources.forEach(source => {
    fn(source)
    if (source.sources) {
      forEachSource(source.sources, fn)
    }
  })
}

async function lookupSourceAuthors (meDriver, sources) {
  const promises = []
  const sourceToAuthor = new Map()
  forEachSource(sources, source => {
    const promise = Q.ninvoke(tradleUtils, 'lookupAuthor', meDriver, {
      object: source,
      verify: true
    })
    .then(author => sourceToAuthor.set(source, author))
    // .catch(err => {
    //   debugger
    // })
    promises.push(promise)
  })

  await Q.allSettled(promises)
  return sourceToAuthor
}

function fixOldSettings (settings) {
  if (!(settings && settings.hashToUrl)) return

  // previously there was 1 websocket connection per provider
  // now it's 1 per url, so endpoint urls no longer contain provider ids

  const { hashToUrl } = settings
  for (var hash in hashToUrl) {
    let url = hashToUrl[hash]
    let lastSlashIdx = url.lastIndexOf('/')
    if (lastSlashIdx > 8) {
      hashToUrl[hash] = url.slice(0, lastSlashIdx)
    }
  }
}

function willShowProgressBar ({ length }) {
  return typeof length === 'undefined' || length >= MIN_SIZE_FOR_PROGRESS_BAR
}

async function getAnalyticsUserId ({ promiseEngine }) {
  if (ENV.analyticsIdIsPermalink) {
    const engine = await promiseEngine
    return engine.permalink
  }

  let userId
  try {
    userId = await AsyncStorage.getItem(ANALYTICS_KEY)
  } catch (err) {
    userId = crypto.randomBytes(32).toString('hex')
    await AsyncStorage.setItem(ANALYTICS_KEY, userId)
  }

  return userId
}

// function midpoint (a, b) {
//   return (a + b) / 2
// }

  // searchFormsToShare(params) { //   var modelName = params.modelName;
  //   var meta = this.getModel(modelName).value;
  //   var chatFrom = params.from
  //   chatFrom = list[utils.getId(chatFrom)].value

  //   var foundResources = {};
  //   var isAllMessages = meta.isInterface;
  //   var props = meta.properties;

  //   var implementors = isAllMessages ? utils.getAllSubclasses(modelName) : null;

  //   var required = meta.required;
  //   var meRootHash = me  &&  me[ROOT_HASH];
  //   var meId = PROFILE + '_' + meRootHash;
  //   var meOrgId = me.organization ? utils.getId(me.organization) : null;

  //   var chatId = chatFrom ? utils.getId(chatFrom) : null;
  //   var isChatWithOrg = chatFrom  &&  chatFrom[TYPE] === ORGANIZATION;
  //   var fromId
  //   var fromOrg
  //   if (isChatWithOrg) {
  //     var rep = this.getRepresentative(chatId)
  //     if (!rep)
  //       return
  //     chatFrom = rep
  //     chatId = utils.getId(chatFrom)
  //     // isChatWithOrg = false
  //     fromId = utils.getId(params.from)
  //     fromOrg = list[fromId].value
  //   }
  //   else {
  //     if (chatFrom  &&  chatFrom.organization) {
  //       fromId = utils.getId(chatFrom.organization)
  //     }
  //   }
  //   var lastPL
  //   var sharedWithTimePairs = []
  //   for (var key in list) {
  //     var iMeta = null;
  //     if (isAllMessages) {
  //       if (implementors) {
  //         implementors.some((impl) => {
  //           if (impl.id === key.split('_')[0]) {
  //             iMeta = impl;
  //             return true
  //           }
  //         })
  //         if (!iMeta)
  //           continue;
  //       }
  //     }
  //     else if (key.indexOf(modelName + '_') === -1) {
  //       var rModel = this.getModel(key.split('_')[0])
  //       if (!rModel)
  //         continue
  //       rModel = rModel.value;
  //       if (rModel.subClassOf !== modelName)
  //         continue;
  //     }
  //     if (!iMeta)
  //       iMeta = meta;
  //     var r = list[key].value;
  //     if (r.canceled)
  //       continue;
  //     // Make sure that the messages that are showing in chat belong to the conversation between these participants
  //     // HACK to not show service message in customer stream
  //     if (r.message  &&  r.message.length)  {
  //       if (r.message === ALREADY_PUBLISHED_MESSAGE
  //         continue
  //       var m = utils.splitMessage(r.message)

  //       if (m.length === 2) {
  //         if (m[1] === PROFILE)
  //           continue;
  //       }
  //     }
  //     var isSharedWith = false, timeResourcePair = null
  //     if (r._sharedWith  &&  fromId) {
  //       var sharedWith = r._sharedWith.filter(function(r) {
  //         let org = list[r.bankRepresentative].value.organization
  //         return (org) ? utils.getId(org) === fromId : false
  //       })
  //       isSharedWith = sharedWith.length !== 0
  //       if (isSharedWith) {
  //         timeResourcePair = {
  //           time: sharedWith[0].timeShared,
  //           resource: r
  //         }
  //       }
  //     }

  //     if (chatFrom) {
  //       var isForm = this.getModel(r[TYPE]).value.subClassOf === FORM
  //       var fromID = utils.getId(r.from);
  //       var toID = utils.getId(r.to);

  //       if (fromID !== meId  &&  toID !== meId  &&  toID != meOrgId)
  //         continue;
  //       if (isChatWithOrg) {
  //         var msgOrg = list[toID].value.organization
  //         if (!msgOrg)
  //           msgOrg = list[fromID].value.organization
  //         let msgOrgId = utils.getId(msgOrg)
  //         if (fromId !== msgOrgId  &&  !isSharedWith) // do not show shared verifications
  //           continue
  //       }
  //       else {
  //         if (!isSharedWith  &&  fromID !== chatId  &&  toID != chatId  &&  toID != meOrgId)
  //           continue;
  //       }
  //     }
  //     if (r._sharedWith  &&  fromId  &&  !isSharedWith)
  //       continue

  //     var msg = this.fillMessage(r);
  //     if (!msg)
  //       msg = r
  //     foundResources[key] = msg;
  //     if (!timeResourcePair)
  //       sharedWithTimePairs.push({
  //         time: r._time,
  //         resource: msg
  //       })
  //     else {
  //       timeResourcePair.resource = msg
  //       sharedWithTimePairs.push(timeResourcePair)
  //     }
  //     if (params.limit  &&  Object.keys(foundResources).length === params.limit)
  //       break;
  //   }

  //   sharedWithTimePairs.sort(function(a, b) {
  //     return a._time - b._time;
  //   });

  //   var result = []
  //   sharedWithTimePairs.forEach((r) => {
  //     result.push(r.resource)
  //   })

  //   if (!params.isForgetting) {
  //     result = result.filter((r, i) => {
  //       if (r[TYPE] === PRODUCT_LIST) {
  //         var next = result[i + 1]
  //         if (next && next[TYPE] === PRODUCT_LIST) {
  //           return false
  //         }
  //       }

  //       return true
  //     })
  //   }

  //   // not for subreddit
  //   result.forEach((r) =>  {
  //     r.from.photos = list[utils.getId(r.from)].value.photos;
  //     var to = list[utils.getId(r.to)]
  //     if (!to) console.log(r.to)
  //     r.to.photos = to && to.value.photos;
  //   })
  //   return result;
  // },

  /*
     params:
       modelName - type of the resources to search
       to: who am I talking to - usually company representatice.
           In non-strict mode the result will be array that contains resources where
           either 'to' or 'from' properties could be the representative of 'to' organization'
       strict: 'to' exclusively should have the params.to value
  */
  // parseForm(val, model) {
  //   let properties = model.properties
  //   for (let p in val) {
  //     let prop = properties[p]
  //     if (!prop)
  //       continue
  //     if (prop.type !== 'array')
  //       continue
  //     let v = JSON.parse(val[p])
  //     val[p] = Array.isArray(v) ? v : [v]
  //     let iprops = prop.properties
  //     if (!iprop)
  //       continue
  //     for (let item of val[p]) {
  //       for (let itemProp in item) {
  //         let ip = iprops[itemProp]
  //         if (!ip.ref)
  //           continue
  //         let im = this.getModel(ip.ref)
  //         if (im.subClassOf !== 'ENUM')
  //           continue
  //         let result = this.searchNotMessages({modelName: im._id})
  //         let enumProp
  //         for (let ep in im.properties)
  //           if (ep.charAt(0) !== '_') {
  //             enumProp = ep
  //             break
  //           }
  //         let rValue = result.filter((r) => r[enumProp] === item[enumProp])
  //         item[enumProp] = { id: utils.getId(rValue[0]), title: item[enumProp] }
  //       }
  //     }
  //   }

  // },

  // searchMessagesNew(params) {
  //   let bankID = utils.getId(params.to)
  //   let messages = chatMessages[bankID]
  //   let promise = messages ? Q() : this.getConversation(params)
  //   let result = []
  //   let self = this
  //   return promise
  //   .then((data) => {
  //     if (data)
  //       return data
  //     data = Object.keys(messages)
  //     var defer = Q.defer()
  //     var togo = Object.keys(data).length
  //     for (let r of data) {
  //       meDriver.lookupObjectsByRootHash(r.split('_')[1])
  //       .then(function (objs) {
  //         var obj = objs[objs.length - 1]
  //         var res = obj.parsed.data
  //         var val = extend(true, res)
  //         self.fillFromAndTo(obj, val)

  //         val[ROOT_HASH] = obj[ROOT_HASH]
  //         result.push(val)
  //         if (--togo === 0)
  //           defer.resolve(result)
  //       })
  //       .catch((err) => {
  //         debugger
  //       })
  //     }
  //     return result
  //   })
  // },

  // getConversation(params) {
  //   var self = this
  //   var list = {}
  //   var hasVerifications
  //   var excludeTypes = [
  //     CUSTOMER_WAITING,
  //     FORGOT_YOU,
  //     FORGET_ME,
  //     IDENTITY_PUBLISHING_REQUEST
  //   ]
  //   var bankID = utils.getId(params.to)
  //   var reps = params.to[TYPE] === constants.TYPES.ORGANIZATION
  //            ? this.getRepresentatives(bankID)
  //            : [params.to]
  //   var messages = {}
  //   chatMessages[bankID] = messages
  //   return meDriver.getConversation(reps[0][ROOT_HASH])
  //   .then(function(data) {
  //     var result = []
  //     var defer = Q.defer()
  //     var togo = data.length
  //     var hasPL
  //     for (var i=data.length - 1; i>=0; i--) {
  //       var r = data[i]
  //       if (excludeTypes.indexOf(r[TYPE]) !== -1 ||
  //           !self.getModel(r[TYPE])) {
  //         --togo
  //         continue
  //       }
  //       if (r[TYPE] === PRODUCT_LIST) {
  //         if (hasPL) {
  //           --togo
  //           continue
  //         }
  //         hasPL = true
  //       }

  //       meDriver.lookupObject(r)
  //       .then(function (obj) {
  //         var res = obj.parsed.data
  //         var val = extend(true, res)
  //         self.fillFromAndTo(obj, val)

  //         val[ROOT_HASH] = obj[ROOT_HASH]
  //         result.push(val)
  //         let rid = utils.getId(val)
  //         list[rid] = {
  //           key: rid,
  //           value: {
  //             id: rid,
  //             title: utils.getDisplayName(val, this.getModel(obj[TYPE]).value.properties),
  //             time: val._time
  //           }
  //         }
  //         if (val.photos)
  //           list[rid].value.photos = [val.photos[0]]
  //         if (val[TYPE] === VERIFICATION)
  //           hasVerifications = true

  //         if (--togo === 0)
  //           defer.resolve(result)
  //       })
  //       .catch(function(err) {
  //         debugger
  //       })
  //     }
  //     return defer.promise
  //   })
  //   .then(function(result) {
  //     if (hasVerifications) {
  //       result.forEach(function(r) {
  //         if (r[TYPE] === VERIFICATION)
  //           r.document = list[utils.getId(r.document)]
  //       })
  //     }
  //     result.sort(function(a, b) {
  //       return a._time - b._time;
  //     });
  //     result.forEach(function(r) {
  //       messages[utils.getId(r)] = r._time
  //     })
  //     // var shareableResources;
  //     // if (!params.isAggregation  &&  params.to)
  //     //   shareableResources = self.getShareableResources(result, params.to);

  //     // var retParams = {
  //     //   action: !params.prop ? 'messageList' : 'list',
  //     //   list: result,
  //     //   spinner: params.spinner,
  //     //   isAggregation: params.isAggregation
  //     // }
  //     // if (shareableResources)
  //     //   retParams.shareableResources = shareableResources;
  //     // if (params.prop)
  //     //   retParams.prop = params.prop;

  //     // self.trigger(retParams);
  //     return result
  //   })
  //   .catch(function(err) {
  //     debugger
  //   })
  // },

  // // extractReferences(val) {
  // //   let props = this.getModel(val[TYPE]).value.properties
  // //   let r = {_t: val[TYPE]}
  // //   for (let p in val) {
  // //     if (props[p].ref) {
  // //       if (props[p].ref !== constants.TYPE.MONEY)
  // //         r[p] = val[p]
  // //     }
  // //     else if (props[p].type === 'array') {
  // //       if
  // //     }
  // //   }
  // // },
  // getMessagesBefore(params) {
  //   var bankID = utils.getId(params.to)
  //   var messages
  //   var self = this
  //   var promise = chatMessages[bankID] ? Q() : this.searchMessagesNew(params)
  //   return promise
  //   .then(function(result) {
  //     var limit = params.limit
  //     var allMessages = chatMessages[bankID]

  //     var ids = Object.keys(allMessages)
  //     var start = ids.indexOf(utils.getId(params.lastId))
  //     var end = Math.max(0, start - limit)
  //     var result = []
  //     for (var i=start - 1; i > end &&  i >= 0; i--) {
  //       var val = list[ids[i]]
  //       if (val)
  //         result.push(val.value)
  //     }
  //     self.trigger({action: 'messageList', loadingEarlierMessages: true, list: result})
  //   })
  // },
/*
  // getSharedVerificationsAboutThisForm(form, toOrgId) {
  //   let result = this.searchMessages({modelName: VERIFICATION, to: utils.getMe(), strict: true})
  //   // let result = this.searchMessages({modelName: VERIFICATION, to: to, strict: true, filterProps: {from: utils.getMe(), document: utils.getId(form)}})
  //   let formId = utils.getId(form)
  //   return result.filter((r) => {
  //     if (utils.getId(r.document) !== formId)
  //       return false
  //     let fromOrgId = utils.getId(list[utils.getId(r.from)].value.organization)
  //     if (fromOrgId === toOrgId)
  //       return false
  //     return true
  //   })
  // },
  // Checks if the  version of the resource is the latest
//   isNewerVersion(r, shareableResources) {
//     let arr = shareableResources[r[TYPE]]
//     for (let i=0; i<arr.length; i++) {
//       let rr = arr[i].document
//       if (r[ROOT_HASH] === rr[ROOT_HASH]) {
// // Alert.alert('rtime = ' + r._time + '; rrtime = ' + rr._time)
//         if (r._time < rr._time)
//           return false
//         else
//           arr.splice(i, 1)
//       }
//     }
//     return true
//   },

/*
  onAddVerification(r, notOneClickVerification, dontSend) {
    var self = this;
    var batch = [];
    var key;
    var fromId = utils.getId(r.from);
    var from = this._getItem(fromId)
    var toId = utils.getId(r.to);
    var to = this._getItem(toId)

    r[NONCE] = r[NONCE]  ||  this.getNonce()
    r._time = r._time || new Date().getTime();
    let document = this._getItem(utils.getId(r.document))
    if (document._context)
      r._context = document._context

    var toChain = {}
    var sendParams
    var toRootHash = toId.split('_')[1]
    if (!dontSend) {
      extend(toChain, r);
      if (r[ROOT_HASH]) {
        toChain[CUR_HASH] = r[ROOT_HASH]
        r[CUR_HASH] = r[ROOT_HASH]
      }
      delete toChain.from
      delete toChain.to
      toChain._time = r._time
      sendParams = this.packMessage(r, toChain)
    }
    var key = IDENTITY + '_' + toRootHash

    var promise = dontSend
                 ? Q()
                 :  meDriver.signAndSend(sendParams)
                    // meDriver.signAndSend({
                    //   object: toChain,
                    //   to: { fingerprint: this.getFingerprint(list[key].value) }
                    // })
    let isReadOnly
    if (r._context) {
      let c = this._getItem(utils.getId(r._context));
      isReadOnly = c  &&  c._readOnly
    }
    var newVerification
    return promise
    .then((data) => {
      if (data) {
        r[CUR_HASH] = data.object.link
        r[ROOT_HASH] = data.object.permalink
        // var roothash = data[0]._props[ROOT_HASH]
        // r[ROOT_HASH] = roothash
        // r[CUR_HASH] = data[0]._props[CUR_HASH]
      }
      key = utils.getId(r)
      if (from.organization)
        r.organization = from.organization;
      if (!r._sharedWith) {
        r._sharedWith = []
        r._sharedWith.push(self.createSharedWith(utils.getId(r.from), r._time))
      }
      batch.push({type: 'put', key: key, value: r});
      newVerification = self.buildRef(r)
      let len = batch.length
      if (!isReadOnly)
        self.addLastMessage(r, batch)
      return db.batch(batch)
    })
    .then(() => {
      var rr = {};
      // extend(rr, from);
      // rr.verifiedByMe = r;
      self._setItem(key, r)
      if (isReadOnly)
        self.addMessagesToChat(utils.getId(r._context), r)
      if (utils.getId(from) === utils.getId(me))
        self.addMessagesToChat(utils.getId(r.to), r)
      else
        self.addMessagesToChat(from.organization ? utils.getId(from.organization) : fromId, r)

      if (notOneClickVerification)
        self.trigger({action: 'addItem', resource: r});
      else
        self.trigger({action: 'addVerification', resource: r});

      var verificationRequestId = utils.getId(r.document);
      var verificationRequest = self._getItem(verificationRequestId)
      if (!verificationRequest.verifications)
        verificationRequest.verifications = [];
      if (!r.txId) {
        verificationRequest.verifications.push(self.buildRef(newVerification));
      }
      else {
        for (var i=0; i<verificationRequest.verifications.length; i++) {
          if (utils.getId(verificationRequest.verifications).split('_')[1] === r[ROOT_HASH])
            verificationRequest.verifications = self.buildRef(newVerification)
        }
      }
      // if (!verificationRequest._sharedWith)
      //   verificationRequest._sharedWith = []
      // verificationRequest._sharedWith.push(fromId)
      return db.put(verificationRequestId, verificationRequest);
    })
    .then((data) => {
      var d = data
    })
    .catch((err) => {
      debugger
      err = err
    })
  },
  // packMessage(r, toChain) {
    // var sendParams = {
    //   object: toChain
    // }
    // let to = this._getItem(utils.getId(r.to))
    // let provider, hash
    // if (to[ROOT_HASH] === me[ROOT_HASH]) {
    //   provider = this._getItem(r.from)
    //   hash = provider[ROOT_HASH]
    // }
    // else
    //   provider = to
    // hash = provider[ROOT_HASH]

    // // if (!hash)
    // //   hash = provider[ROOT_HASH]

    // var isEmployee
    // if (me.organization) {
    //   isEmployee = utils.isEmployee(to)
    //   // See if the sender is in a process of verifying some form in shared context chat
    //   if (!isEmployee  &&  r._context)
    //     isEmployee = utils.isReadOnlyChat(this._getItem(r._context))
    // }
    // // if (me.isEmployee)
    // //   isEmployee = (!to.organization ||  utils.getId(to.organization) === utils.getId(me.organization))

    // // let isEmployee = me.isEmployee && (!r.to.organization || utils.getId(r.to.organization) === utils.getId(me.organization))
    // if (isEmployee) {
    //   let arr
    //   if (SERVICE_PROVIDERS)
    //     arr = SERVICE_PROVIDERS.filter((sp) => {
    //       let reps = this.getRepresentatives(sp.org)
    //       let talkingToBot = reps.forEach((r) => {
    //         return r[ROOT_HASH] === hash ? true : false
    //       })
    //       return talkingToBot  &&  talkingToBot.length ? true : false
    //     })
    //   else  {
    //     if (!to.bot)
    //       arr = [to]
    //   }
    //   if (!arr  ||  !arr.length) {
    //     var toRootHash = hash

    //     sendParams.other = {
    //       forward: toRootHash
    //     }
    //     let rep = this.getRepresentative(utils.getId(me.organization))

    //     sendParams.to = { permalink: rep[ROOT_HASH] }
    //   }
    // }
    // if (r._context) {
    //   if (!sendParams.other)
    //     sendParams.other = {}
    //   let cId = utils.getId(r._context)
    //   sendParams.other.context = cId.split('_')[1]
    //   if (r[TYPE] !== PRODUCT_APPLICATION) {
    //     let c = this._getItem(cId)
    //     // will be null for PRODUCT_APPLICATION itself
    //     if (c) {
    //       c.lastMessageTime = new Date().getTime()
    //       c._formsCount = c._formsCount ? ++c._formsCount : 1
    //       db.put(cId, c)
    //     }
    //   }
    // }
    // if (!sendParams.to) {
    //   var toId = IDENTITY + '_' + hash
    //   sendParams.to = { permalink: hash }
    // }
    // return sendParams
  // },

  onGetAllPartials1() {
    let list = this.searchNotMessages({modelName: PARTIAL})
    if (!list  ||  !list.length)
      return

    let providers = {}
    let ch = {}
    // let allResources = {}
    list.forEach((r) => {
      let pId = utils.getId(r.provider)
      let stats = providers[pId]
      if (!stats) {
        stats = {
          openApps: {},
          completedApps: {},
          applications: [],
          formRequests: [],
          forms: [],
          verifications: [],
          formErrors: [],
          myProducts: [],
          provider: r.provider
        }
        providers[pId] = stats
      }

      let l = r.leaves
      let t = r.leaves.filter((prop) => prop.key === TYPE)[0].value

      // allResources[r.resource.id] = r
      // if (ch[r.from.id])
      //   ch[r.from.id] = {}

      owners[r.from.id][r.resource.id] = r

      switch (t) {
      case FORM_REQUEST:
        stats.formRequests.push(r)
        break
      case FORM_ERROR:
        stats.formErrors.push(r)
        break
      case VERIFICATION:
        stats.verifications.push(r)
        break
      case PRODUCT_APPLICATION:
        let product = l.filter((prop) => prop.key === 'product')[0].value
        if (product === 'tradle.CoverholderApproval')
        stats.applications.push(r)
        break
      default:
        if (this.getModel(t).value.subClassOf === MY_PRODUCT)
          stats.myProducts.push(r)
        else
          stats.forms.push(r)
      }
    })
    for (let p in providers) {
      let stats = providers[p]
      let apps = stats.applications
      apps.forEach((a) => {
        let product = a.leaves.filter((prop) => prop.key === 'product')[0].value
        let forms = this.getModel(product).value.forms
        let ch = a.from.id
        let uniqueVerifications = {}
        stats.verifications.forEach((v) => {
          let doc = v.leaves.filter((prop) => prop.key === 'document')[0].value.id
          // if (allResources[doc].from.id !== ch)
          //   return
          if (forms.indexOf(doc)) {
            if (!uniqueVerifications[doc])
              uniqueVerifications[doc] = v
          }
        })
        if (Object.keys(uniqueVerifications).length === forms.length) {
          if (!stats.completedApps[product])
            stats.completedApps[product] = 0
          stats.completedApps[product]++
        }
        else {
          if (!stats.openApps[product])
            stats.openApps[product] = 1
          else
            stats.openApps[product]++
        }
      })
    }

    // let stats = []
    // for (let p in providers) {
    //   let r = providers[p].provider
    //   stats.push[{provider: r, open: r.open, completed: r.completed}]
    // }
    this.trigger({action: 'allPartials', stats: Object.values(providers)})
  },
  onGetAllPartials1(listOnly) {
    let list = this.searchNotMessages({modelName: PARTIAL})
    if (!list  ||  !list.length)
      return

    let providers = {}
    let owners = {}
    let allResources = {}
    list.forEach((r) => {
      let pId = utils.getId(r.provider)
      let stats = providers[pId]
      if (!stats) {
        stats = {
          openApps: {},
          completedApps: {},
          applications: [],
          formRequests: [],
          forms: [],
          formCorrections: [],
          verifications: [],
          formErrors: [],
          myProducts: [],
          provider: r.provider
        }
        providers[pId] = stats
      }
      let ownerId = r.from.id
      if (!owners[pId])
        owners[pId] = {}
      let applicantStats = owners[pId][ownerId]
      if (!applicantStats) {
        applicantStats = {
          owner: r.from,
          openApps: {},
          completedApps: {},
          applications: [],
          formRequests: [],
          forms: [],
          formCorrections: [],
          verifications: [],
          formErrors: [],
          myProducts: [],
          provider: r.provider
        }
        owners[pId][ownerId] = applicantStats
      }

      let l = r.leaves
      let t = r.leaves.filter((prop) => prop.key === TYPE)[0].value

      allResources[r.resource.id] = r

      // if (!owners[pId])
      //   owners[pId] = {}
      // if (!owners[pId][ownerId])
      //   owners[pId][ownerId] = {}
      // owners[pId][ownerId][r.resource.id] = r

      // if (ch[r.from.id])
      //   ch[r.from.id] = {}

      // ch[r.from.id][r.resource.id] = r

      switch (t) {
      case FORM_REQUEST:
        stats.formRequests.push(r)
        applicantStats.formRequests.push(r)
        break
      case FORM_ERROR:
        stats.formErrors.push(r)
        applicantStats.formErrors.push(r)
        break
      case VERIFICATION:
        stats.verifications.push(r)
        // applicantStats.verifications.push(r)
        break
      case PRODUCT_APPLICATION:
        let product = l.filter((prop) => prop.key === 'product')[0].value
        if (product === 'tradle.CoverholderApproval') {
          stats.applications.push({productType: product, product: r})
          applicantStats.applications.push({productType: product, product: r})
          // stats.applications.push(r)
          // applicantStats.applications.push(r)
        }
        break
      default:
        if (this.getModel(t).value.subClassOf === MY_PRODUCT) {
          stats.myProducts.push(r)
          applicantStats.myProducts.push(r)
        }
        else {
          let id = r.resource.id.split('_')
          if (id.length === 2  ||  id[1] === id[2]) {
            stats.forms.push(r)
            applicantStats.forms.push(r)
          }
          else {
            stats.formCorrections.push(r)
            applicantStats.formCorrections.push(r)
          }
        }
      }
    })

    for (let p in providers) {
      providers[p].verifications.forEach((v) => {
        let docId = v.leaves.filter((prop) => prop.key === 'document')[0].value.id
        // HACK till modified forms paritals fixed
        if (allResources[docId]) {
          let docOwner = allResources[docId].from.id
          owners[p][docOwner].verifications.push(v)
        }
      })
    }

    for (let p in owners) {
      let o = owners[p]
      let pruned = {}
      for (let r in o) {
        if (o[r].applications.length)
          pruned[r] = o[r]
      }
      owners[p] = pruned
    }

    for (let p in providers) {
      let stats = providers[p]
      let pId = stats.provider.id
      let apps = stats.applications
      apps.forEach((a) => {
        // let product = a.product.leaves.filter((prop) => prop.key === 'product')[0].value
        let product = a.productType
        let forms = this.getModel(product).value.forms
        let ownerId = a.product.from.id
        let uniqueVerifications = {}
        let verifications = owners[pId][ownerId].verifications
        verifications.forEach((v) => {
          let doc = v.leaves.filter((prop) => prop.key === 'document')[0].value.id
          let docType = doc.split('_')[0]
          // if (!owners[pId][ownerId].forms)
          //   return
          // if (!allResources[doc]  ||  allResources[doc].from.id !== ownerId)
          //   return
          if (forms.indexOf(docType) !== -1) {
            if (!uniqueVerifications[docType])
              uniqueVerifications[docType] = v
          }
        })
        if (Object.keys(uniqueVerifications).length === forms.length) {
          verifications.sort((a, b) => a._time - b._time)

          owners[pId][ownerId].completedApps[product] = verifications[verifications.length - 1]._time
          if (!stats.completedApps[product])
            stats.completedApps[product] = 1
          else
            stats.completedApps[product]++
        }
        else {
          if (!stats.openApps[product])
            stats.openApps[product] = 1
          else
            stats.openApps[product]++
        }
      })
    }

    // let stats = []
    // for (let p in providers) {
    //   let r = providers[p].provider
    //   stats.push[{provider: r, open: r.open, completed: r.completed}]
    // }
    this.trigger({action: 'allPartials', list: list, stats: Object.values(providers), owners: owners})
  },

    // })
//       function handleMessage2 (noTrigger, returnVal) {
//         // TODO: fix hack
//         // hack: we don't know root hash yet, use a fake
//         if (returnVal._documentCreated)  {
//           // when all the multientry forms are filled out and next form is requested
//           // do not show the last form request for the multientry form it is confusing for the user
//           if (doneWithMultiEntry) {
//             let ptype = returnVal[TYPE] === FORM_REQUEST && returnVal.product
//             if (ptype) {
//               let multiEntryForms = this.getModel(ptype).value.multiEntryForms
//               if (multiEntryForms  &&  multiEntryForms.indexOf(returnVal.form) !== -1) {
//                 let rid = returnVal.from.organization.id
//                 self.deleteMessageFromChat(rid, returnVal)
//                 let id = utils.getId(returnVal)
//                 delete list[id]
//                 db.del(id)
//                 var params = {action: 'addItem', resource: returnVal}
//                 self.trigger(params);
//                 return
//               }
//             }
//           }
//           var params = {action: 'addItem', resource: returnVal}
//           // return self.disableOtherFormRequestsLikeThis(returnVal)
//           // .then(() => {
//             // don't save until the real resource is created
//           list[utils.getId(returnVal)].value = returnVal
//           self.trigger(params);
//           return self.onIdle()
//           .then(() => {
//             save(returnVal)
//           })
//           .catch(function(err) {
//             debugger
//           })
//           // })
//         }
//         // Trigger painting before send. for that set ROOT_HASH to some temporary value like NONCE
//         // and reset it after the real root hash will be known
//         let isNew = returnVal[ROOT_HASH] == null
//         let isForm = self.getModel(returnVal[TYPE]).value.subClassOf === FORM
//         if (isNew)
//           returnVal[ROOT_HASH] = returnVal[NONCE]
//         else {
//           if (isForm) {
//             let formId = utils.getId(returnVal)
//             let prevRes = self._getItem(formId)
//             if (utils.compare(returnVal, prevRes)) {
//               self.trigger({action: 'noChanges'})
//               return
//             }
//             returnVal[PREV_HASH] = returnVal[CUR_HASH]
//             returnVal[CUR_HASH] = returnVal[NONCE]
//           }
//           if (returnVal.txId)
//             delete returnVal.txId
//         }

//         var returnValKey = utils.getId(returnVal)

//         self._setItem(returnValKey, returnVal)

//         let org = self._getItem(utils.getId(returnVal.to)).organization
//         let orgId = utils.getId(org)
//         self.addMessagesToChat(orgId, returnVal)

//         var params;

//         var sendStatus = (self.isConnected) ? SENDING : QUEUED
//         if (isGuestSessionProof) {
//           org = self._getItem(utils.getId(org))
//           params = {action: 'getForms', to: org}
//         }
//         else {
//           returnVal._sendStatus = sendStatus
//           // if (isNew)
//           self.addVisualProps(returnVal)
//           params = {
//             action: 'addItem',
//             resource: returnVal
//           }
//         }

//         var m = self.getModel(returnVal[TYPE]).value
// //         var to = returnVal.to
// //         Object.defineProperty(returnVal, 'to', {
// //           get: function () {
// //             return to
// //           },
// //           set: function () {
// //             debugger
// //             console.log('yay!')
// //           }
// //         })

// //         var organization = to.organization
// //         Object.defineProperty(to, 'organization', {
// //           get: function () {
// //             return organization
// //           },
// //           set: function () {
// //             debugger
// //             console.log('yay!')
// //           }
// //         })


//         try {
//           if (!noTrigger)
//             self.trigger(params);
//         } catch (err) {
//           debugger
//         }

//         return self.onIdle()
//         .then(function () {
//           let rId = utils.getId(returnVal.to)
//           let to = self._getItem(rId)

//           var toChain = {}
//           if (!isNew) {
//             // returnVal[PREV_HASH] = returnVal[CUR_HASH] || returnVal[ROOT_HASH]
//             toChain[PREV_HASH] = returnVal[PREV_HASH]
//           }

//           let exclude = ['to', 'from', 'verifications', CUR_HASH, '_sharedWith', '_sendStatus', '_context', '_online', 'idOld']
//           if (isNew)
//             exclude.push(ROOT_HASH)
//           extend(toChain, returnVal)
//           for (let p of exclude)
//             delete toChain[p]

//           toChain._time = returnVal._time

//           var key = IDENTITY + '_' + to[ROOT_HASH]

//           let sendParams = self.packMessage(toChain, returnVal.from, returnVal.to, returnVal._context)
//           return meDriver.signAndSend(sendParams)
//         })
//         .then(function (result) {
//           // TODO: fix hack
//           // we now have a real root hash,
//           // scrap the placeholder
//           // if (isNew ||  !shareWith)
//           if (isNew  ||  isForm) {
//             delete list[returnValKey]
//             self.deleteMessageFromChat(orgId, returnVal)

//           }
//           if (readOnlyBacklinks.length) {
//             readOnlyBacklinks.forEach((prop) => {
//               let topR = returnVal[prop.name]
//               if (topR) {
//                 if (!topR[prop.backlink])
//                   topR[prop.backlink] = []
//                 topR[prop.backlink].push(self.buildRef(returnVal))
//               }
//             })
//           }

//           returnVal[CUR_HASH] = result.object.link
//           returnVal[ROOT_HASH] = result.object.permalink
//           // var sendStatus = (self.isConnected) ? SENDING : QUEUED
//           // returnVal._sendStatus = sendStatus

// //           let org = list[utils.getId(returnVal.to)].value.organization
// //           self.addMessagesToChat(utils.getId(org), returnVal)
//           delete returnVal._sharedWith
//           delete returnVal.verifications
//           // if (shareWith) {
//           //   let oldValue = list[returnValKey]
//           //   for (let p in shareWith) {
//           //     if (shareWith[p])
//           //       this.onShare(returnVal, list[p].value)
//           //   }
//           // }
//           return save(returnVal, true)
//         })
//         .then(() => {
//           let rId = utils.getId(returnVal.to)
//           let to = self._getItem(rId)

//           if (!isNew  ||  self.getModel(returnVal[TYPE]).value.subClassOf !== FORM)
//             return
//           let allFormRequests = self.searchMessages({modelName: FORM_REQUEST, to: to})
//           let formRequests = allFormRequests  &&  allFormRequests.filter((r) => {
//             if (r.document === returnVal[NONCE])
//               return true
//           })
//           if (formRequests  &&  formRequests.length) {
//             let req = formRequests[0]
//             req.document = utils.getId(returnVal)
//             // returnVal = req
//             save(req, true)
//           }
//         })
//       }
//       function save (returnVal, noTrigger) {
//         return self._putResourceInDB({
//           type: returnVal[TYPE],
//           resource: returnVal,
//           roothash: returnVal[ROOT_HASH],
//           isRegistration: isRegistration,
//           noTrigger: noTrigger
//         })
//       }
*/

// const failOneOutOf = (function () {
//   let i = 0
//   return function failOneOutOf (n=2) {
//     i = (i + 1) % n
//     return i === 0
//   }
// }())
  // searchResources(params) {
  //   var meta = this.getModel(params.modelName)
  //   var isMessage = utils.isMessage(meta)
  //   if (isMessage) //  ||  meta.id === FORM)
  //     return this.searchMessages(params);
  //   else {
  //     params.fromView = true
  //     return this.searchNotMessages(params);
  //   }
  // },
  // async onTalkToRepresentative(resource, org) {
  //   var orgRep = resource[TYPE] === ORGANIZATION
  //              ? this.getRepresentative(utils.getId(resource))
  //              : resource
  //   if (!orgRep) {
  //     var msg = {
  //       [TYPE]: SIMPLE_MESSAGE,
  //       [NONCE]: this.getNonce(),
  //       message: 'All representatives are currently assisting other customers. Please try again later'
  //     }
  //     msg.from = this.buildRef(resource)
  //     msg.to = this.buildRef(me)
  //     msg.id = sha(msg)
  //     result.push(msg)
  //     this.trigger({action: 'messageList', list: result, resource: resource})
  //     return
  //   }
  //   var result = await this.searchMessages({to: resource, modelName: MESSAGE});
  //   var msg = {
  //     [TYPE]: SIMPLE_MESSAGE,
  //     [NONCE]: this.getNonce(),
  //     message: 'Representative will be with you shortly. Please tell us how can we help you today?'
  //   }
  //   msg.from = this.buildRef(resource)
  //   msg.to = this.buildRef(me)
  //   msg.id = sha(msg)
  //   result.push(msg)
  //   this.trigger({action: 'messageList', list: result, resource: resource})
  //   var key = IDENTITY + '_' + orgRep[ROOT_HASH]

  //   return this.meDriverSignAndSend({
  //     object: msg,
  //     to: { fingerprint: this.getFingerprint(this._getItem(key)) }
  //   })
  // },
  // onGetDocumentsFor(requestedDocumentType) {
  //   if (requestedDocumentType !== 'tradle.PersonalInfo')
  //     return
  //   let m = this.getModel(requestedDocumentType)
  //   let evidentiaryDocTypes = m.evidentiaryDocuments
  //   let docTypeToDocs = {}
  //   evidentiaryDocTypes.forEach((d) => {
  //     docTypeToDocs[d] = this.searchMessages(d)
  //   })
  //   this.trigger({action: 'documentsFor', documentType: requestedDocumentType, documents: docTypeToDocs})
  // }





    // return Promise.all(allLinks.map(r => meDriver.objects.get(r)))
    // .then((result) => {
    //   list = this.transformResult(result)
    //   let refsObj = {}
    //   list.forEach((r) => {
    //     if (refs.indexOf(r[CUR_HASH]) !== -1)
    //       refsObj[utils.getId(r)] = r
    //   })

    //   let l = list.filter((r) => {
    //     let idx = links.indexOf(r[CUR_HASH])
    //     if (idx !== -1) {
    //       let isVerificationR = r[TYPE] === VERIFICATION
    //       if (isVerificationR)
    //         r.document = refsObj[r.document.id]
    //     }

    //     return idx !== -1
    //   })
    //   list = l
    //   if (isBacklinkProp) {
    //     let container = resource  ||  to
    //     if (container[TYPE] === ORGANIZATION  && ['to', 'from'].indexOf(backlink) !== -1)
    //       container = this.getRepresentative(utils.getId(container))

    //     let rId = utils.getId(container)
    //     list = list.filter((r) => {
    //       return r[backlink]  &&  utils.getId(r[backlink]) === rId
    //     })
    //   }
    //   // if (isVerification) {
    //   //   list.forEach((r) => {
    //   //     r.document = refsObj[r.document.id]
    //   //   })
    //   //   // return Promise.all(list.map((r) => {
    //   //   //   let link = this.getCurHash(r.document)
    //   //   //   return meDriver.objects.get(link)
    //   //   // }))
    //   // }
    //   // else
    //   //   return Q()
    // // })
    // // .then((result) => {
    // //   if (!result  ||  !result.length)
    // //     return
    // //   result = this.transformResult(result)
    // //   list.forEach((r) => {
    // //     let docId = r.document.id
    // //     for (let i=0; i<result.length; i++) {
    // //       let d = result[i]
    // //       if (utils.getId(d) === docId) {
    // //         r.document = d
    // //         r._context = d.context
    // //         break
    // //       }
    // //     }
    // //   })
    // //   return list
    // // })
    // // .then(() => {
    //   if (isBacklinkProp) {
    //     if (query) {
    //       let promises = []
    //       list.forEach((r) => {
    //         promises.push(checkAndFilter(r))
    //       })
    //       return Q.all(promises)
    //     }
    //     else
    //       return list
    //   }
    //   let promises = []
    //   list.forEach((r) => {
    //     promises.push(checkResource(r))
    //   })
    //   return Q.all(promises)
    // })
    // .then((checked) => {
    //   if (isBacklinkProp) {
    //     if (query) {
    //       let l = []
    //       for (let i=list.length - 1; i>=0; i--)
    //         if (checked[i])
    //           l.push(list[i])
    //       list = l
    //     }
    //     return list
    //   }
    //   if (!foundResources.length)
    //     return
    //   // Minor hack before we intro sort property here
    //   let result = params._readOnly  &&  modelName === PRODUCT_APPLICATION
    //              ? foundResources.filter((r) => utils.isReadOnlyChat(r)) //r._readOnly)
    //              : foundResources.reverse()
    //   if (result  &&  result.length  &&  isBacklinkProp  &&  modelName === FORM) {
    //     // Filter out the older versions of the resources
    //     return getFreshResources(result)
    //   }
    //   else
    //     return result
    // })
    // .catch((err) => {
    //   debugger
    //   err = err
    // })

  // transformResult(msgInfo) {
  //   let r = msgInfo.object
  //   r[ROOT_HASH] = msgInfo.permalnk || msgInfo.link
  //   r[CUR_HASH] = msgInfo.link
  //   r._time = r._time || msgInfo.timestamp
  //   let c = msgInfo.object.context
  //   if (c)
  //     r._context = [PRODUCT_APPLICATION, c].join('_')
  //   let cachedRes = this._getItem(utils.getId(r))
  //   extend(r, cachedRes)
  //   return r
  // },
  // transformResult1(result) {
  //   return result.map((msgInfo) => {
  //     let r = msgInfo.object
  //     r[ROOT_HASH] = msgInfo.permalnk || msgInfo.link
  //     r[CUR_HASH] = msgInfo.link
  //     r._time = r._time || msgInfo.timestamp
  //     let c = msgInfo.object.context
  //     if (c)
  //       r._context = [PRODUCT_APPLICATION, c].join('_')
  //     let cachedRes = this._getItem(utils.getId(r))
  //     extend(r, cachedRes)
  //     return r
  //   })
  // },
  // async searchInDB(params) {
  //   await this.ready
  //   await this._loadedResourcesDefer.promise
  //   let {modelName, limit, startRec, sortProperty, asc, to, prop} = params
  //   let criteria = startRec || modelName + '_'
  //   let time = startRec ? startRec._time : new Date(0).getTime()

  //   // return await collect(db.createReadStream({ [prop]: criteria, end: modelName + '_\xff', limit: 10, keys: false }))

  //   // let result = await collect(myCustomIndexes.timeAndFromAndSubClassOf({
  //   //   start: time + '!' + me[ROOT_HASH] + '!tradle.Form',
  //   //   end: new Date().getTime() + '!' + me[ROOT_HASH] + '!tradle.Form\xff',
  //   //   limit: limit || 10,
  //   //   keys: false,
  //   //   // get the actual object, not just metadata
  //   //   body: true
  //   // }))
  //   let result
  //   if (to) {
  //     let toId = utils.getId(to)
  //     result = await collect(myCustomIndexes.typeAndToAndTime({
  //       gt: modelName + '!' + toId + '!' + time,
  //       lte: modelName + '!' + toId + '!' + new Date().getTime(),
  //       limit: limit || 10,
  //       keys: false,
  //       // get the actual object, not just metadata
  //       body: true
  //     }))
  //   }
  //   else
  //     result = await collect(myCustomIndexes.typeAndTime({
  //       gt: modelName + '!' + time,
  //       lte: modelName + '!' + new Date().getTime(),
  //       limit: limit || 10,
  //       keys: false,
  //       // get the actual object, not just metadata
  //       body: true
  //     }))

  //   let returnList = result.map((msgInfo) => {
  //     let r = msgInfo.object.object
  //     let author = [PROFILE, msgInfo.author].join('_')
  //     let recipient = [PROFILE, msgInfo.recipient].join('_')
  //     r[ROOT_HASH] = msgInfo.permalnk || msgInfo.link
  //     r[CUR_HASH] = msgInfo.link
  //     r._time = r._time || msgInfo.timestamp
  //     r._context = [PRODUCT_APPLICATION, msgInfo.object.context].join('_')
  //     r.from = { id:  author,  title: utils.getDisplayName(this._getItem(author))}
  //     r.to = { id: recipient, title: utils.getDisplayName(this._getItem(recipient)) }
  //     return r
  //   })
  //   return returnList
  // },



// // search index
// await collect(myCustomIndexes.subClassOf({
//   eq: 'tradle.Form',
//   keys: false,
//   // get the actual object, not just metadata
//   body: true
// }))

// // search index
// await collect(myCustomIndexes.fromAndSubClassOf({
//   eq: swissre.permalnk + '!' + 'tradle.Form',
//   keys: false,
//   // get the actual object, not just metadata
//   body: true
// }))



  // async getAllSharedContexts() {
  //   let list = await this.searchMessages({modelName: PRODUCT_APPLICATION})
  //   if (!list  ||  !list.length)
  //     return
  //   let l = list.filter((r) => {
  //     let isReadOnly = utils.isReadOnlyChat(r)
  //     if (isReadOnly)
  //       this.addVisualProps(r)
  //     return isReadOnly
  //   })
  //   for (let i=0; i<l.length; i++) {
  //     let r = l[i]
  //     let forms = await this.searchMessages({modelName: MESSAGE, to: r})
  //     if (!forms  ||  r._approved)
  //       continue
  //     let result = forms.map((rr) => {
  //       if (rr[TYPE] === APPLICATION_SUBMITTED) {
  //         r._appSubmitted = true
  //         this.dbPut(utils.getId(r), r)
  //       }
  //       else if (this.getModel(rr[TYPE]).subClassOf === MY_PRODUCT) {
  //         r._approved = true
  //         this.dbPut(utils.getId(r), r)
  //       }
  //     })
  //   }
  //   l.sort((a, b) => b._sentTime - a._sentTime)
  //   return l
  // },
  // fillFromAndTo(obj, val) {
  //   var whoAmI = obj.parsed.data._i.split(':')[0]
  //   let fromId = utils.makeId(PROFILE, obj.objectinfo.author)
  //   let toId = utils.makeId(PROFILE, obj.to[ROOT_HASH])
  //   var from = this._getItem(fromId)
  //   var to = this._getItem(toId)

  //   if (whoAmI !== from[ROOT_HASH]) {
  //     // swap from and to
  //     [from, to] = [to, from]
  //   }

  //   val.to = {
  //     id: utils.getId(to),
  //     title: to.formatted || to.firstName
  //   }

  //   val.from = {
  //     id: utils.getId(from),
  //     title: from.formatted || from.firstName
  //   }
  // },
/*
  monitorTim() {
    this._keeper = {}
    ;['get', 'put', 'batch', 'del'].forEach(method => {
      this._keeper[method] = promisify(meDriver.keeper[method].bind(meDriver.keeper))
    })

    this.monitorLog()
    var self = this
    // meDriver.ready()
    // .then(function() {
    //   console.log(meDriver.name(), 'is ready')
      // d.publishMyIdentity()

      // meDriver.identities().createReadStream()
      // .on('data', function (data) {
      //   console.log(data)
      // })
      //   var key = PROFILE + '_' + data.key
      //   var v;
      //   if (me  &&  data.key == me[ROOT_HASH])
      //     v = me
      //   else {
      //     if (list[key])
      //       v = list[key].value
      //     else
      //       v = {}
      //   }
      //   var val = data.value.identity
      //   val[ROOT_HASH] = data.value[ROOT_HASH]
      //   val[CUR_HASH] = data.value[CUR_HASH]

      //   var name = val.name;
      //   delete val.name
      //   for (var p in name)
      //     val[p] = name[p]

      //   extend(v, val)

      //   db.put(key, v)
      //   .then(function() {
      //     list[key] = {
      //       key: key,
      //       value: v
      //     }
      //     if (v.securityCode)
      //       employees[data.value.securityCode] = data.value
      //   })
      // })

      // var ellens = 0
      // meDriver.messages().createValueStream()
      // .on('data', function (data) {
      //   meDriver.lookupObject(data)
      //   .then(function (obj) {
      //     // return
      //     console.log('from msgs.db', obj)
      //     // self.putInDb(obj)
      //     // console.log('msg', obj)
      //   })
      // })

      // Object was successfully read off chain
      // meDriver.on('readseal', function (seal) {
      //   const link = seal.link
      //   meDriver.objects.get(link)
      //     .then(function(obj) {
      //       if (obj.object[TYPE] === IDENTITY && obj.link === meDriver.link) {
      //         return
      //       }

      //       const wrapper = { ...seal, ...obj }
      //       save(wrapper)
      //     })

      //   function save (wrapper) {
      //       // return
      //     const getFromTo = wrapper.type === 'tradle.Message'
      //       ? Q(wrapper)
      //       : getAuthorForObject(wrapper)

      //     return getFromTo
      //       .then(msgInfo => {
      //         wrapper.from = { [ROOT_HASH]: msgInfo.author }
      //         wrapper.to = { [ROOT_HASH]: msgInfo.recipient }
      //         wrapper = utils.toOldStyleWrapper(wrapper)
      //         if (!wrapper.objectinfo) {
      //           wrapper.objectinfo = tradleUtils.pick(wrapper, 'author', 'type', 'link', 'permalink', 'prevlink')
      //         }

      //         return self.putInDb(wrapper)
      //       })
      //       .catch(function (err) {
      //         console.error('unable to get message for object', wrapper)
      //         debugger
      //       })
      //   }

      //   function getAuthorForObject (wrapper) {
      //     // objects don't really have a from/to
      //     // so this will need to be redesigned
      //     const msgStream = meDriver.objects.messagesWithObject({
      //       permalink: wrapper.permalink,
      //       link: link
      //     })

      //     return Q.all([
      //       meDriver.addressBook.lookupIdentity({ permalink: wrapper.author }),
      //       collect(msgStream)
      //     ])
      //     .spread(function (authorInfo, messages) {
      //       const match = messages.filter(m => m.author === authorInfo.permalink)[0]
      //       // if (!match) throw new Error('unable to get message for object')
      //       if (!match) {
      //         console.error('unable to get message for object', wrapper)
      //         throw new Error('unable to get message for object')
      //       }
      //       return match
      //     })
      //   }
      // })

      // meDriver.on('unchained-self', function (info) {
      //   console.log('unchained self!')
      //   // meDriver.lookupObject(info)
      //   // .then(function(obj) {
      //   //   // return
      //     return self.updateMe()
      //   // })
      //   // .catch(function (err) {
      //   //   debugger
      //   // })
      // })

      // meDriver.on('error', function (err) {
      //   debugger
      //   console.log(err)
      // })

      // meDriver.on('sent', function (msg) {
      //   const obj = utils.toOldStyleWrapper(msg)
      //   var model = self.getModel(obj[TYPE])
      //   var addCurHash = model.subClassOf === FORM || model.subClassOf === MY_PRODUCT
      //   // if (isForm  ||  model.id === PRODUCT_APPLICATION) {
      //   let key = obj[TYPE] + '_' + obj[ROOT_HASH] + (addCurHash ? '_' +  obj[CUR_HASH] : '')
      //   var r = list[key]
      //   if (r) {
      //     r = r.value
      //     if (r._sendStatus !== SENT) {
      //       self.trigger({action: 'updateItem', sendStatus: SENT, resource: r})
      //       r._sendStatus = SENT
      //       self.dbPut(key, r)
      //     }
      //   }
      //     // var o = {}
      //     // extend(o, obj)
      //     // var from = o.from
      //     // o.from = o.to
      //     // o.to = from
      //     // o.txId = Math.random() + '';
      //     // setTimeout(() => {
      //     //   self.putInDb(o)
      //     // }, 5000);
      //   // }

      //   self.maybeWatchSeal(msg)
      // })

//       meDriver.on('message', async function (msg) {
//         self.maybeWatchSeal(msg)
//         const payload = msg.object.object
//         if (payload[TYPE] === MESSAGE) {
//           let obj = msg.object
//           obj.from = {[ROOT_HASH]: msg.objectinfo.author}
//           obj.objectinfo = msg.objectinfo
//           try {
//             const originalRecipient = await meDriver.addressBook.byPubKey(msg.object.object.recipientPubKey)
//             obj.to = {[ROOT_HASH]: originalRecipient.permalink}
//             obj.parsed = {data: payload.object}

//             let rtype
//             let t = obj.parsed.data[TYPE]
//             if (t === PRODUCT_APPLICATION)
//               rtype = obj.parsed.data.product
//             else if (t === FORM_REQUEST)
//               rtype = obj.parsed.data.form
//             else
//               rtype = t

//             let bot = self._getItem(PROFILE + '_' + obj.from[ROOT_HASH])
//             // let debugStr = 'SharedContext: org = ' + (bot.organization && bot.organization.title) + '; isEmployee = ' + utils.isEmployee(bot) + '; type = ' + rtype + '; hasModel = ' + self.getModel(rtype)
//             // debug(debugStr)
//             if (utils.isEmployee(bot)  &&  !self.getModel(rtype)) {
//               // debug('SharedContext: request for models')
//               await self.onAddMessage({msg: utils.requestForModels(), isWelcome: true})
//             }

//             obj[ROOT_HASH] = protocol.linkString(obj.parsed.data)
//             if (!obj.parsed.data[CUR_HASH])
//               obj[CUR_HASH] = obj[ROOT_HASH]

//             obj[MSG_LINK] = msg.link
//             await self.putInDb(obj, true)
//             self.trigger({ action: 'receivedMessage', msg: msg })
//           } catch (err) {
//             console.error('1. failed to process received message', err)
//           }

//           return
//         }
//         else if (payload[TYPE] === VERIFICATION && payload.sources) {
// // const pubKeys = []
// // forEachSource(payload.sources, function (source) {
// //   pubKeys.push(tradleUtils.claimedSigPubKey(source).pub.toString('hex'))
// // })

// // console.log(pubKeys)
//           const sourceToAuthor = await lookupSourceAuthors(meDriver, payload.sources)
//           for (var [verification, author] of sourceToAuthor) {
//             let a = self._getItem(PROFILE + '_' + author.permalink)
//             verification.from = self.buildRef(a)
//             verification.from.organization = utils.clone(a.organization)
//           }
//           // debugger
//         }
//         else if (payload[TYPE] === PARTIAL) {
//           msg.object[ROOT_HASH] = msg.objectinfo.permalink

//           payload.context = msg.object.forContext || msg.object.context
//           payload.leaves = tradle.partial.interpretLeaves(payload.leaves)

//           let partialPermalink = payload.leaves.find(l => l.key === ROOT_HASH && l.value)
//           if (partialPermalink)
//             msg.partialinfo.permalink = partialPermalink.value
//           else
//             msg.partialinfo.permalink = msg.partialinfo.link

//           let from = PROFILE + '_' + msg.partialinfo.author
//           let fromR = self._getItem(from)
//           payload.from = fromR ? self.buildRef(fromR) : {id: from}

//           let type = payload.leaves.find(l => l.key === TYPE && l.value).value
//           payload.type = type
//           var r = {
//             [TYPE]: type,
//             [ROOT_HASH]: msg.partialinfo.permalink,
//             [CUR_HASH]: msg.partialinfo.link,
//             [MSG_LINK]: msg.link

//           }
//           payload.resource = {id: utils.getId(r)}
//           payload.providerInfo = utils.clone(self._getItem(PROFILE + '_' + msg.objectinfo.author).organization)
//           // debugger
//         }
//         // else if (payload[TYPE] === CONFIRM_PACKAGE_REQUEST)
//         //   debugger

//         const old = utils.toOldStyleWrapper(msg)

//         old.to = { [ROOT_HASH]: meDriver.permalink }
//         let rtype = old.parsed.data[TYPE]
//         if (rtype === PRODUCT_APPLICATION  &&  me.isEmployee) {
//           let bot = self._getItem(PROFILE + '_' + old.from[ROOT_HASH])
//           // debug('monitorTim: org = ' + (bot.organization && bot.organization.title) + '; isEmployee = ' + utils.isEmployee(bot) + '; type = ' + old.parsed.data.product + '; hasModel = ' + (self.getModel(old.parsed.data.product)!== null))
//           if (utils.isEmployee(bot)  &&  !self.getModel(old.parsed.data.product)) {
//             debug('request for models')
//             await self.onAddMessage({msg: utils.requestForModels(), isWelcome: true})
//           }
//         }
//         try {
//           await self.putInDb(old, true)
//           if (payload[TYPE] === PARTIAL)
//             self.onGetAllPartials(payload)
//           self.trigger({ action: 'receivedMessage', msg: msg })
//         } catch (err) {
//           debugger
//           console.error('2. failed to process received message', err)
//         }
//       })

    // })
    // return meDriver.ready()
  },

  getDriver(me) {
    if (this._loadingEngine) return this._enginePromise

    this._loadingEngine = true

    // var loadIdentityAndKeys
    // var allMyIdentities = list[MY_IDENTITIES]
    // var currentIdentity

    // var mePub = me[ROOT_HASH] ? list[IDENTITY + '_' + me[ROOT_HASH]].value.pubkeys : me.pubkeys
    // var mePriv
    // var publishedIdentity
    // if (allMyIdentities) {
    //   var all = allMyIdentities.value.allIdentities
    //   var curId = allMyIdentities.value.currentIdentity
    //   all.forEach(function(id) {
    //     if (id.id === curId) {
    //       currentIdentity = id
    //       mePriv = id.privkeys
    //       publishedIdentity = id.publishedIdentity
    //       mePub = mePub || publishedIdentity.pubkeys
    //     }
    //   })
    // }
    // // debugger
    // if (!mePub  &&  !mePriv) {
    //   // if (__DEV__  &&  !me.securityCode) {
    //   //   var profiles = {}
    //   //   var identities = {}
    //   //   myIdentity.forEach(function(r) {
    //   //     if (r[TYPE] == IDENTITY)
    //   //       identities[r[ROOT_HASH]] = r
    //   //     else
    //   //       profiles[r[ROOT_HASH]] = r
    //   //   })
    //   //   for (var hash in profiles) {
    //   //     if (!profiles[hash].securityCode  &&  me.firstName === profiles[hash].firstName) {
    //   //       var identity = identities[hash]
    //   //       mePub = identity.pubkeys  // hardcoded on device
    //   //       mePriv = identity.privkeys
    //   //       me[NONCE] = identity[NONCE]
    //   //       break
    //   //     }
    //   //   }
    //   // }
    //   let encryptionKey
    //   loadIdentityAndKeys = this.createNewIdentity()
    //   .spread((eKey, identityInfo) => {
    //     encryptionKey = eKey
    //     publishedIdentity = identityInfo.identity
    //     mePub = publishedIdentity.pubkeys
    //     mePriv = identityInfo.keys
    //     return encryptionKey
    //   })
    //   // const encryptionKey = crypto.randomBytes(32).toString('hex')
    //   // const globalSalt = crypto.randomBytes(32).toString('hex')
    //   // const genIdentity = Q.ninvoke(tradleUtils, 'newIdentity', {
    //   //     networkName,
    //   //     keys: KEY_SET
    //   //   })
    //   //   .then(identityInfo => {
    //   //     publishedIdentity = identityInfo.identity
    //   //     mePub = publishedIdentity.pubkeys
    //   //     mePriv = identityInfo.keys
    //   //   })

    //   // loadIdentityAndKeys = Q.all([
    //   //   utils.setPassword(ENCRYPTION_KEY, encryptionKey).then(() => encryptionKey),
    //   //   genIdentity
    //   // ])
    //   // .spread(encryptionKey => encryptionKey)

    //     // bringing it back!
    //     // if (__DEV__  &&  !keys.some((k) => k.type() === 'dsa')) {
    //     // if (!keys.some((k) => k.type() === 'dsa')) {
    //     //   keys.push(Keys.DSA.gen({
    //     //     purpose: 'sign'
    //     //   }))
    //     // }
    // }
    // else
    //   loadIdentityAndKeys = utils.getPassword(ENCRYPTION_KEY)

    if (me.language)
      language = list[utils.getId(me.language)] && this._getItem(utils.getId(me.language))

    return this.loadIdentityAndKeys(me)
    .then(result => {
      if (!Keychain) {
        let privkeys = result.keys.map(k => {
          return k.toJSON ? k.toJSON(true) : k
        })
        let myIdentities = this._getItem(MY_IDENTITIES)
        if (myIdentities) {
          let currentIdentity = myIdentities.currentIdentity
          myIdentities.allIdentities.forEach((r) => {
             if (r.id === currentIdentity)
               r.privkeys = privkeys
          })
          this.dbPut(MY_IDENTITIES, myIdentities)
        }
        else
          me.privkeys = privkeys
        // me['privkeys'] = result.keys.map(k => {
        //   return k.toJSON ? k.toJSON(true) : k
        // })
      }

      // if (!Keychain) me['privkeys'] = result.keys.map(k => k.toJSON(true))
      // me[NONCE] = me[NONCE] || this.getNonce()
      // driverInfo.deviceID = result.deviceID
      return this.buildDriver({
        identity: result.identity,
        keys: result.keys,
        encryption: {
          key: new Buffer(result.encryptionKey, 'hex')
        }
      })
    }, err => {
      debugger
      throw err
    })
    // .then(node => {
    //   if (!me.registeredForPushNotifications) {
    //     return utils.setupPushNotifications({ node })
    //       .then(() => Actions.updateMe({ registeredForPushNotifications: true }))
    //   } else {
    //     return utils.setupPushNotifications({ requestPermissions: false })
    //   }

    //   return node
    // })
  },
*/
  // loadStaticDbData(saveInDB) {
  //   let batch = []
  //   let sData = [currencies, nationalities, countries]
  //   sData.forEach((arr) => {
  //     arr.forEach((r) => {
  //       this.loadStaticItem(r, saveInDB, batch)
  //     })
  //   })
  //   return batch.length ? db.batch(batch) : Q()
  // },
  // disableOtherFormRequestsLikeThis(rr) {
  //   let fromRep = utils.getId(rr.from)
  //   let orgId = utils.getId(this._getItem(fromRep).organization)
  //   let messages = chatMessages[orgId]
  //   let batch = []
  //   messages.forEach((r) => {
  //     let m = this._getItem(r.id)
  //     if (m[TYPE] === FORM_REQUEST  &&
  //         m[ROOT_HASH] !== rr[ROOT_HASH] &&
  //         m.product === rr.product  &&
  //         m.form === rr.form        &&
  //         !m.document               &&
  //         !m._documentCreated) {
  //       m._documentCreated = true
  //       batch.push({type: 'put', key: utils.getId(m), value: m})
  //     }
  //   })
  //   if (batch.length)
  //     return db.batch(batch)
  // },
    // function addReferenceLink(stub) {
    //   let r = self._getItem(stub)
    //   if (!r)
    //     return
    //   if (me.isEmployee  &&  isBacklinkProp) {
    //     // don't show resources that were resigned by bot
    //     if (r.from.id !== meId  &&  r.to.id !== meId)
    //       return
    //     if (r.from.id !== myBotId  &&  r.to.id !== myBotId)
    //       return
    //     // if (r.fromId !== myBotId  &&  r.to.id !== myBotId)
    //     //   return
    //   }
    //   if (r[TYPE] === VERIFICATION) {
    //     let doc = self._getItem(r.document.id)
    //     if (doc  &&  doc.from.id !== r.to.id) {
    //       refs.push(doc[CUR_HASH])
    //       all[doc[CUR_HASH]] = utils.getId(r.document)
    //     }
    //   }
    //   else if (r[TYPE] === FORM_ERROR) {
    //     let prefill = self._getItem(r.prefill.id)
    //     let phash = prefill ? prefill[CUR_HASH] : r.prefill.id.split('_')[2]
    //     refs.push(phash)
    //     all[phash] = utils.getId(r.prefill)
    //   }
    //   let link = addLink(modelName, links, stub)
    //   if (link)
    //     all[link] = stub.id
    // }
    // async function handleOne(link) {
    //   let rId = all[link]
    //   let r = self._getItem(rId)
    //   if (!r)
    //     return
    //   let object
    //   try {
    //     // object = await self.getObject(link)
    //     object = await self._keeper.get(link)
    //   } catch(err) {
    //     // debugger
    //     console.log(err)
    //     if (me.isEmployee)
    //       object = await self._getItemFromServer(rId)
    //     // if (me.isEmployee)
    //     //   return self._getItemFromServer(rId)
    //   }
    //   if (!object)
    //     return

    //   let obj = utils.clone(object)
    //   extend(r, obj)
    //   self._setItem(rId, r)
    //   if (r._context  &&  !utils.isContext(r[TYPE])) {
    //     let rcontext = self._getItem(r._context)
    //     if (!rcontext) {
    //       let rcontextId = utils.getId(r._context)
    //       rcontext = refsObj[rcontextId]
    //       if (!rcontextId) {
    //         rcontext = self._getItemFromServer(rcontextId)
    //         refsObj[rcontextId] = rcontext
    //       }
    //     }
    //     r._context = rcontext
    //   }
    //   // list = self.transformResult(result)

    //   if (refs.indexOf(r[CUR_HASH]) !== -1)
    //     refsObj[utils.getId(r)] = r

    //   let checked
    //   try {
    //     if (isBacklinkProp) {
    //       let container = resource  ||  to
    //       if (container[TYPE] === ORGANIZATION  && ['to', 'from'].indexOf(backlink) !== -1)
    //         container = self.getRepresentative(utils.getId(container))

    //       let rId = utils.getId(container)
    //       if (r[backlink]  &&  utils.getId(r[backlink]) === rId)
    //         list.push(r)
    //       if (query)
    //         checked = await checkAndFilter(r)
    //     }
    //     else
    //       checked = await checkResource(r)
    //     if (checked   &&  isBacklinkProp) {
    //       if (query)
    //         list.push(r)
    //       return r
    //     }
    //   } catch (err) {
    //   }
    // }
    // function addLink(modelName, links, r) {
    //   let item = self._getItem(r.id)
    //   // let link = item[MSG_LINK]
    //   let model = self.getModel(modelName)
    //   if (!model.isInterface) {
    //     if (item[TYPE] !== modelName) {
    //       let rModel = self.getModel(item[TYPE])
    //       // Checks for the first level of subClasses
    //       if (rModel.subClassOf !== modelName)
    //         return
    //     }
    //   }
    //   let link = item[CUR_HASH]
    //   links.push(link)
    //   return link
    // }
    // async function checkResource(r) {
    //   // let key = thisChatMessages[i].id
    //   // let r = self._getItem(key)
    //   if (r.canceled)
    //     return
    //   if (r[TYPE] === BOOKMARK) {
    //     if (query)
    //       checkAndFilter(r)
    //     else
    //       foundResources.push(self.fillMessage(r))
    //     return
    //   }

    //   if (!model.isInterface) {
    //     let rModel = self.getModel(r[TYPE])
    //     if (r[TYPE] !== modelName) {
    //       if (rModel.subClassOf !== modelName)
    //         return
    //     }
    //   }
    //   if (context) {
    //     if (!self.inContext(r, context))
    //       return
    //   }
    //   // if (r._context  &&  self._getItem(r._context)._readOnly)
    //   //   continue
    //   let isFormError = isAllMessages && r[TYPE] === FORM_ERROR
    //   // Make sure that the messages that are showing in chat belong to the conversation between these participants
    //   // if (isVerification) {
    //   //   if (r.document) {
    //   //     let d = self._getItem(utils.getId(r.document))
    //   //     if (!d)
    //   //       return
    //   //     if (resource  &&  resourceId !== meId  && utils.getId(resource) !== utils.getId(d))
    //   //       return
    //   //     r.document = d;
    //   //   }
    //   // }
    //   // else if (isFormError) {
    //   //   let prefill = self._getItem(utils.getId(r.prefill))
    //   //   r.prefill =  prefill ? prefill : r.prefill
    //   // }

    //   // HACK to not show service message in customer stream
    //   // else
    //   if (r.message  &&  r.message.length)  {
    //     if (r[TYPE] === SELF_INTRODUCTION  &&  !isForgetting && (utils.getId(r.to) !== meId))
    //       return
    //     if (r.message === ALREADY_PUBLISHED_MESSAGE)
    //       return
    //     // let m = utils.splitMessage(r.message)

    //     // if (m.length === 2) {
    //     //   if (m[1] === PROFILE)
    //     //     return
    //     // }
    //     if (chatTo.organization  &&  r[TYPE] === constants.TYPES.CUSTOMER_WAITING) {
    //       let rid = utils.getId(chatTo.organization);

    //       // let org = self._getItem(utils.getId(r.to)).organization
    //       // let orgId = utils.getId(org)
    //       if (!utils.isEmployee(self._getItem(rid)))
    //         return
    //     }
    //   }

    //   let isSharedWith //, timeResourcePair = null
    //   let m = self.getModel(r[TYPE])
    //   let isVerificationR = r[TYPE] === VERIFICATION  ||  m.subClassOf === VERIFICATION
    //   if (r._sharedWith  &&  toOrgId) {
    //     isSharedWith = r._sharedWith.some((r) => {
    //       let org = self._getItem(r.bankRepresentative).organization
    //       return (org) ? utils.getId(org) === toOrgId : false
    //     })
    //     // isSharedWith = sharedWith.length !== 0
    //   }

    //   if (chatTo) {
    //     // backlinks like myVerifications, myDocuments etc. on Profile
    //     if (backlink  &&  r[backlink]) {
    //       let s = resource ? utils.getId(resource) : chatId
    //       let doFurtherCheck = s === utils.getId(r[backlink]) || isSharedWith
    //       if (doFurtherCheck)
    //         await checkAndFilter(r)

    //       return;
    //     }

    //     let isForm = m.subClassOf === FORM
    //     let isMyProduct = m.subClassOf === MY_PRODUCT
    //     let isContext = utils.isContext(m)
    //     if ((!r.message  ||  r.message.trim().length === 0) && !r.photos &&  !isVerificationR  &&  !isForm  &&  !isMyProduct && !isContext)
    //       // check if this is verification resource
    //       return;
    //     // let fromID = utils.getId(r.from);
    //     let toID = utils.getId(r.to);

    //     if (params.strict) {
    //       if (chatId !== toID)
    //         return
    //     }
    //   }
    //   if (params.strict  &&  chatId !== utils.getId(r.to))
    //     return

    //   if (r._sharedWith  &&  toOrgId  &&  !isSharedWith)
    //     return
    //   if (isVerificationR) {
    //     let doc = {};
    //     // let rDoc = self._getItem(utils.getId(r.document))
    //     // // let rDoc = list[utils.getId(r.document)]
    //     // if (!rDoc) {
    //     //   // if (params.isForgetting)
    //     //   await checkAndFilter(r.document)
    //     //   return
    //     // }

    //     // TODO: check if we can copy by reference
    //     let document = r.document
    //     for (let p in document) {
    //       if (p === 'verifications') continue

    //       let val = document[p]
    //       switch (typeof val) {
    //       case 'object':
    //         if (val) {
    //           if (Array.isArray(val))
    //             doc[p] = val.slice(0)
    //           else
    //             doc[p] = extend(true, {}, val)
    //         }
    //         break
    //       default:
    //         doc[p] = val
    //         break
    //       }
    //     }

    //     r.document = doc;
    //   }
    //   // primitive filtering for this commit
    //   await checkAndFilter(r)
    // }
    // function hasNoTrigger(orgId) {
    //   let messages = chatMessages[orgId]
    //   if (!messages)
    //     return false
    //   let type
    //   // Skip all SELF_INTRODUCTION messages since they are not showing anyways on customer screen
    //   for (let i=0; i<messages.length; i++) {
    //     type = messages[i].id.split('_')[0]
    //     if (type  === PRODUCT_LIST)
    //       return true
    //   }
    //   // Don't trigger re-rendering the list if the current and previous messages were of PRODUCT_LIST type
    //   return false
    // }
  // initClient(meDriver) {
  //   let me = utils.getMe()
  //   if (!me.isEmployee)
  //     return

  //   let graphqlEndpoint
  //   let myOrgId = me.organization.id
  //   let myEmployer = SERVICE_PROVIDERS.filter((sp) => sp.org === myOrgId)[0]
  //   if (myEmployer)
  //     graphqlEndpoint = `${myEmployer.url.replace(/[/]+$/, '')}/graphql`
  //   // else
  //   //   graphqlEndpoint = `${ENV.LOCAL_TRADLE_SERVER.replace(/[/]+$/, '')}/graphql`
  //   if (!graphqlEndpoint)
  //     return

  //   // graphqlEndpoint = `http://localhost:21012/graphql`
  //   const networkInterface = createNetworkInterface({
  //     uri: graphqlEndpoint
  //   })

  //   networkInterface.use([{
  //     applyMiddleware: async (req, next) => {
  //       import printer from 'graphql/language/printer'
  //       const body = tradleUtils.stringify({
  //         ...req.request,
  //         query: printer.print(req.request.query)
  //       })

  //       const { sig } = await meDriver.sign({
  //         object: {
  //           [TYPE]: 'tradle.GraphQLQuery',
  //           body,
  //           // time: Date.now()
  //         }
  //       })

  //       if (!req.options.headers) {
  //         req.options.headers = {}
  //       }

  //       req.options.headers['x-tradle-sig'] = sig
  //       next()
  //     }
  //   }])

  //   this.client = new ApolloClient({ networkInterface })
  // },

  // async handleOne(params) {
  //   let { link, all, refsObj, refs } = params
  //   let rId = all[link]
  //   let r = this._getItem(rId)
  //   if (!r)
  //     return
  //   let object
  //   try {
  //     // object = await this.getObject(link)
  //     object = await this._keeper.get(link)
  //   } catch(err) {
  //     // debugger
  //     console.log(err)
  //     if (me.isEmployee)
  //       object = await this._getItemFromServer(rId)
  //     // if (me.isEmployee)
  //     //   return this._getItemFromServer(rId)
  //   }
  //   if (!object)
  //     return

  //   let obj = utils.clone(object)
  //   extend(r, obj)
  //   this._setItem(rId, r)
  //   if (r._context  &&  !utils.isContext(r[TYPE])) {
  //     let rcontext = this._getItem(r._context)
  //     if (!rcontext) {
  //       let rcontextId = utils.getId(r._context)
  //       rcontext = refsObj[rcontextId]
  //       if (!rcontextId) {
  //         rcontext = this._getItemFromServer(rcontextId)
  //         refsObj[rcontextId] = rcontext
  //       }
  //     }
  //     r._context = rcontext
  //   }
  //   // list = this.transformResult(result)

  //   if (refs.indexOf(r[CUR_HASH]) !== -1)
  //     refsObj[utils.getId(r)] = r

  //   try {
  //     extend(params, { r })

  //     await this.checkResource(params)
  //   } catch (err) {
  //   }
  // },
    // async function checkAndFilter(r, i) {
    //   if (!query) {
    //     if (!filterOutForms  ||  !(await doFilterOut(r, chatId, i))) {
    //       foundResources.push(self.fillMessage(r))
    //       return true
    //     }
    //   }
    //   let isVerificationR = r[TYPE] === VERIFICATION
    //   let isBookmark = r[TYPE] === BOOKMARK
    //   let checkVal = isVerificationR ? self._getItem(r.document) : r
    //   let fr = self.checkCriteria(isBookmark ? r.bookmark : r, query)

    //   if (fr) {
    //     // foundResources[key] = self.fillMessage(r);
    //     if (!filterOutForms  ||  !(await doFilterOut(r, chatId, i))) {
    //       foundResources.push(self.fillMessage(r))
    //       return true
    //     }
    //   }
    //   return false
    // }
    // async function doFilterOut(r, toId, idx) {
    //   let m = self.getModel(r[TYPE])
    //   if (utils.isContext(m)  &&  (r.requestFor === REMEDIATION || !self.getModel(r.requestFor)))
    //     return true
    //   // if (r._notSent)
    //   //   return true
    //   if (r._context       &&
    //       !params.prop     &&
    //       (m.subClassOf === FORM || m.id === VERIFICATION) &&
    //       self._getItem(utils.getId(r._context)).requestFor === REMEDIATION) {
    //     let org = m.subClassOf === FORM ? self._getItem(utils.getId(r.to)) : self._getItem(utils.getId(r.from))
    //     let remMsg = await self.searchMessages({modelName: REMEDIATION_SIMPLE_MESSAGE, to: org})
    //     if (remMsg  &&  remMsg.length)
    //       return r._time < remMsg[0]._time + 30000

    //     return true
    //   }
    //   if (r._inactive)
    //     return true
    //   if (m.subClassOf === MY_PRODUCT  &&
    //       r._context                   &&
    //       self._getItem(utils.getId(r._context)).requestFor === REMEDIATION)
    //     return true


    //   return false
    // }
  // })

    // async function becomingEmployee(resource) {
    //   if (resource[TYPE] !== PROFILE)
    //     return

    //   if (!resource.organization  &&  !me.organization)
    //     return

    //   let meOrgId = me.organization ? utils.getId(me.organization) : null
    //   let newOrgId = utils.getId(resource.organization)

    //   if (!meOrgId) {
    //     if (!SERVICE_PROVIDERS)
    //       return {error: 'Can\'t verify if provider is active at this time. Try again later'}
    //     let o = SERVICE_PROVIDERS.filter((r) => {
    //       return r.org == newOrgId ? true : false
    //     })
    //     if (o  &&  o.length)
    //       return {isBecomingEmployee: true}
    //   }
    //   else {
    //     let isEmployee = await checkIfEmployeeAlready()
    //     if (isEmployee.isBecomingEmployee  &&  meOrgId !== newOrgId)
    //       return {error: 'Can\'t change employment'}
    //     return isEmployee
    //   }
    // }
    // async function checkIfEmployeeAlready() {
    //   let result = await self.searchMessages({to: me, modelName: MY_EMPLOYEE_PASS})
    //   if (!result || result.every(r => r.revoked))
    //     return {isBecomingEmployee: true}
    //   let meId = utils.getId(me)
    //   return {isBecomingEmployee: !(result.some((r) => meId === utils.getId(r.to)))}
    // }
  /*
  onGetEmployeeInfo(code) {
    let parts = code.split(';')

    let orgId = utils.makeId(ORGANIZATION, parts[1])
    let serviceProvider =  SERVICE_PROVIDERS  ? SERVICE_PROVIDERS.filter((json) => json.org === orgId) : null

    serviceProvider = (serviceProvider  &&  serviceProvider.length) ? serviceProvider[0] : null
      // let serviceProvider =  SERVICE_PROVIDERS.filter((json) => json.url === serverUrl)

    var org = this._getItem(orgId)
    let promise = serviceProvider ? Q() : this.getInfo({serverUrls: [parts[0]]})

    return promise
    .then(() => {
      if (!serviceProvider)
        serviceProvider = SERVICE_PROVIDERS.filter((json) => json.org === orgId)[0]

      return Q.race([
        fetch(utils.joinURL(serviceProvider.url, serviceProvider.id + '/employee/' + parts[2]), { headers: { cache: 'no-cache' }}),
        Q.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error('timed out'))
          }, 5000)
        })]
      )
    })
    // return Q(employee)
    .then((response) => {
      return response.clone().json()
    })
    .then((data) => {
      let r = this._getItem(orgId)
      let info = {
        bot: data,
        org: r,
        style: r.style,
        isEmployee: true
      }
      return this.addInfo(info)
    })
    .then((provider) => {
      this.addProvider(provider)
      this.addToSettings(provider)

      this.addContactIdentity({ identity: provider.identity })

      let employee = this._getItem(utils.makeId(PROFILE, provider.hash))
      currentEmployees[utils.getId(org)] = employee
      let myIdentities = this._getItem(MY_IDENTITIES)
      let currentIdentity = myIdentities.currentIdentity
      let identity = myIdentities.allIdentities.filter((i) => {
        if (i.id === currentIdentity)
          return true
      })[0].publishedIdentity

      this.trigger({action: 'talkToEmployee', to: org, myIdentity: identity})
    })
    .catch((err) => {
      debugger
    })
  },
  */
  // getResourceToSend(document) {
  //   let d = utils.clone(document)
  //   let props = this.getModel(d[TYPE]).properties

  //   let exclude = ['__typename']
  //   for (let p in d) {
  //     if (p === TYPE  ||  p === SIG  ||  p === '_time')
  //       continue
  //     if (d[PREV_HASH]  &&  (p === ROOT_HASH || p === PREV_HASH))
  //       continue
  //     if (!props[p])
  //       delete d[p]
  //     else if (p === 'from'  ||  p === 'to')
  //       delete d[p]
  //     else if (!d[p])
  //       delete d[p] // continue
  //     else if (props[p].type === 'object') {
  //       let stub = d[p]
  //       let newStub = {}
  //       for (let op in stub) {
  //         if (exclude.indexOf(op) === -1)
  //           newStub[op] = stub[op]
  //       }
  //       d[p] = newStub
  //     }
  //   }
  //   return d
  // },
  // loadAddressBook() {
  //   return // method not used currently

  //   var self = this;
  //   return Q.ninvoke(AddressBook, 'checkPermission')
  //   .then(function(permission) {
  //     // AddressBook.PERMISSION_AUTHORIZED || AddressBook.PERMISSION_UNDEFINED || AddressBook.PERMISSION_DENIED
  //     if(permission === AddressBook.PERMISSION_UNDEFINED)
  //       return Q.ninvoke(AddressBook, 'requestPermission')
  //              .then(function(permission) {
  //                if (permission === AddressBook.PERMISSION_AUTHORIZED)
  //                  return self.storeContacts.bind(self);
  //              });
  //     else if (permission === AddressBook.PERMISSION_AUTHORIZED)
  //       return self.storeContacts()
  //     else if (permission === AddressBook.PERMISSION_DENIED) {
  //       //handle permission denied
  //       return
  //     }
  //   })
  // },
  // storeContacts() {
  //   var self = this;
  //   var dfd = Q.defer();
  //   var batch = [];
  //   let pModel = this.getModel(PROFILE)
  //   var props = pModel.properties;
  //   AddressBook.getContacts(function(err, contacts) {
  //     contacts.forEach(function(contact) {
  //       var contactInfo = [];
  //       var newIdentity = {
  //         firstName: contact.firstName,
  //         lastName: contact.lastName,
  //         // formatted: contact.firstName + ' ' + contact.lastName,
  //         contactInfo: contactInfo
  //       };
  //       newIdentity[TYPE] = PROFILE;
  //       var myIdentities = self._getItem(MY_IDENTITIES)
  //       if (myIdentities)  {
  //         var currentIdentity = myIdentities.currentIdentity;
  //         newIdentity[constants.OWNER] = {
  //           id: currentIdentity,
  //           title: utils.getDisplayName(currentIdentity, pModel)
  //         };
  //         // if (me.organization) {
  //         //   var photos = list[utils.getId(me.organization.id)].value.photos;
  //         //   if (photos)
  //         //     me.organization.photo = photos[0].url;
  //         // }
  //       }

  //       if (contact.thumbnailPath  &&  contact.thumbnailPath.length)
  //         newIdentity.photos = [{type: 'address book', url: contact.thumbnailPath}];
  //       var phoneNumbers = contact.phoneNumbers;
  //       if (phoneNumbers) {
  //         phoneNumbers.forEach(function(phone) {
  //           contactInfo.push({identifier: phone.number, type: phone.label + ' phone'})
  //         })
  //       }
  //       var emailAddresses = contact.emailAddresses;
  //       if (emailAddresses)
  //         emailAddresses.forEach(function(email) {
  //           contactInfo.push({identifier: email.email, type: email.label + ' email'})
  //         });
  //       newIdentity[ROOT_HASH] = sha(newIdentity);
  //       newIdentity[CUR_HASH] = newIdentity[ROOT_HASH];
  //       var key = utils.getId(newIdentity)
  //       if (!list[key])
  //         batch.push({type: 'put', key: key, value: newIdentity});
  //     });
  //     if (batch.length)
  //       // identityDb.batch(batch, function(err, value) {
  //       db.batch(batch, function(err, value) {
  //         if (err)
  //           dfd.reject(err);
  //         else {
  //           self.loadMyResources()
  //           .then(function() {
  //             dfd.resolve();
  //           })
  //         }
  //       });
  //     else
  //       dfd.resolve();
  //   })
  //   return dfd.promise;
  // },
  // async getContext(contextId, val) {
  //   let context, contexts
  //   if (me.isEmployee) {
  //     let myOrgRep = this.getRepresentative(me.organization)
  //     // let msg = await this.searchServer({modelName: MESSAGE, noTrigger: true, filterResource: {contextId: contextId}})
  //     contexts = await this.searchServer({modelName: PRODUCT_REQUEST, noTrigger: true, filterResource: {contextId: contextId}})
  //   }
  //   else {
  //     contexts = await this.searchMessages({modelName: PRODUCT_REQUEST})
  //     if (contexts)
  //       contexts = contexts.filter((c) => c.contextId === contextId)
  //   }
  //   if (contexts  &&  contexts.length) {
  //     // let context = contexts.filter((r) => r.from.id === r.to.id)[0]
  //     // let cr = await this.searchServer({
  //     //   modelName: MESSAGE,
  //     //   noTrigger: true,
  //     //   to: this._getItem(val.from),
  //     //   filterResource: {object___link: context[CUR_HASH], context: context.contextId}
  //     // })
  //     context = contexts[0]
  //     context.from = utils.clone(val.from)
  //     contextIdToResourceId[contextId] = context
  //   }
  //   return context
  // },
  // async shareAll(document, to, formResource) {
  //   var documentCreated = formResource._documentCreated
  //   var key = utils.getId(formResource)
  //   var r = this._getItem(key)
  //   // disable FormRequest from being used again
  //   r._documentCreated = true

  //   let kr = await this._keeper.get(r[CUR_HASH])
  //   let resource = utils.clone(r)
  //   extend(resource, kr)

  //   this.addVisualProps(resource)
  //   this.trigger({action: 'addItem', context: formResource.context, resource: resource})
  //   if (documentCreated)
  //     return

  //   // Get representative
  //   to = this._getItem(to)
  //   var toOrgId
  //   if (to[TYPE] === ORGANIZATION) {
  //     toOrgId = utils.getId(to)
  //     let oid = utils.makeId(ORGANIZATION, to[ROOT_HASH])
  //     to = this.getRepresentative(oid)
  //   }
  //   else
  //     toOrgId = utils.getId(to.organization)
  //   if (!to)
  //     return

  //   var ikey = utils.makeId(IDENTITY, to[ROOT_HASH])
  //   var opts = {
  //     to: {fingerprint: this.getFingerprint(this._getItem(ikey))},
  //     // share seal if it exists
  //     seal: true
  //   }
  //   if (formResource  &&  formResource._context) {
  //     let context = utils.getId(formResource._context)
  //     opts.other = { context: this._getItem(context).contextId }
  //   }
  //     // opts.other = {context: utils.getId(formResource._context).split('_')[1]}

  //   let batch = []
  //   // Get the whole resource
  //   if (!document[ROOT_HASH])
  //     document = this._getItem(utils.getId(document))

  //   // let verifications
  //   // if (document.verifications)
  //   //   verifications = document.verifications

  //   if (!document._context)
  //     document._context = formResource._context
  //   let shareBatchId = new Date().getTime()
  //   let doShareDocument = (typeof formResource.requireRawData === 'undefined')  ||  formResource.requireRawData
  //   if (doShareDocument) {
  //     let errorMsg = await this.shareForm(document, to, formResource, shareBatchId)
  //     if (errorMsg) {
  //       this.trigger({action: 'addItem', errorMsg: 'Sharing failed: ' + errorMsg, resource: document, to: this._getItem(toOrgId)})
  //       return
  //     }
  //   }
  //   var documentId = utils.getId(document)
  //   if (r[TYPE] === FORM_REQUEST)
  //     r._document = documentId

  //   this.dbBatchPut(key, r, batch)
  //   // utils.optimizeResource(document)
  //   if (doShareDocument) {
  //     this.addLastMessage(document, batch, to)
  //     this.dbBatchPut(documentId, document, batch)
  //     document._sendStatus = SENT
  //     this._setItem(documentId, document)
  //     this.trigger({action: 'addItem', sendStatus: SENT, resource: document, to: this._getItem(toOrgId)})
  //     // this.trigger({action: 'updateItem', sendStatus: SENT, resource: document, to: this._getItem(toOrgId)})
  //   }
  //   // let m = this.getModel(VERIFICATION)
  //   let docModel = this.getModel(document[TYPE])
  //   var params = {
  //     modelName: VERIFICATION,
  //     to: document,
  //     noTrigger: true,
  //     // meta: m,
  //     prop: docModel.properties['verifications'],
  //     // props: m.properties
  //   }

  //   let verifications
  //   if (me.isEmployee) {
  //     params.search = me.isEmployee,
  //     params.filterResource = {document: {id: documentId}}
  //     verifications  = await this.searchServer(params)
  //     verifications = verifications  &&  verifications.list
  //   }
  //   else
  //     verifications  = await this.searchMessages(params)
  //   if (!verifications) {
  //     if (batch.length)
  //       db.batch(batch)
  //     return
  //   }

  //   let all = verifications.length
  //   for (let i=0; i<all; i++) {
  //     // let ver = this._getItem(verifications[i])
  //     let ver = verifications[i]
  //     let vId = utils.getId(ver)
  //     if (!ver._context)
  //       ver._context = formResource._context
  //     await this.shareVerification(ver, to, formResource, shareBatchId)
  //     // Check if Verification was created by different employee
  //     // let v = this._getItem(vId)
  //     // if (!v)
  //     this._setItem(vId, ver)
  //     this.dbBatchPut(vId, ver, batch)
  //   }
  //   if (!doShareDocument)
  //     this.addLastMessage(verifications[all - 1], batch, to)

  //   db.batch(batch)
  // },
  // if the last message showing was PRODUCT_LIST. No need to re-render
  // addNameAndTitleProps(m, aprops) {
  //   var mprops = aprops  ||  m.properties
  //   for (let p in mprops) {
  //     if (p.charAt(0) === '_')
  //       continue
  //     if (!mprops[p].name)
  //       mprops[p].name = p
  //     if (!mprops[p].title)
  //       mprops[p].title = utils.makeLabel(p)
  //     if (mprops[p].type === 'array') {
  //       var aprops = mprops[p].items.properties
  //       if (aprops)
  //         this.addNameAndTitleProps(m, aprops)
  //     }
  //   }
  // },
  // addFromAndTo(m) {
  //   if (!m.interfaces  ||  m.interfaces.indexOf(MESSAGE) === -1)
  //     return
  //   let properties = m.properties
  //   if (properties.from  &&  properties.to)
  //     return
  //   properties.from = {
  //     type: 'object',
  //     ref: IDENTITY,
  //     readOnly: true
  //   }
  //   properties.to = {
  //     type: 'object',
  //     ref: IDENTITY,
  //     readOnly: true
  //   }
  // },
  // addVerificationsToFormModel(m) {
  //   if (m.subClassOf !== FORM  ||  m.verifications)
  //     return
  //   m.properties.verifications = {
  //     type: 'array',
  //     readOnly: true,
  //     title: 'Verifications',
  //     name: 'verifications',
  //     items: {
  //       backlink: 'document',
  //       ref: VERIFICATION
  //     }
  //   }
  // },
  // addModels() {
  //   for (let id in voc) {
  //     let m = voc[id]
  //     // if (!m[ROOT_HASH])
  //     //   m[ROOT_HASH] = sha(m);
  //     storeUtils.parseOneModel(m)
  //   }
  // },

  // parseOneModel(m) {
  //   Aviva.preparseModel(m)
  //   storeUtils.addNameAndTitleProps(m)
  //   models[m.id] = {
  //     key: m.id,
  //     value: m
  //   }
  //   if (!m.properties[TYPE]) {
  //     m.properties[TYPE] = {
  //       type: 'string',
  //       readOnly: true
  //     }
  //   }
  //   if (!m.properties._time) {
  //     m.properties._time = {
  //       type: 'date',
  //       readOnly: true,
  //       title: 'Date'
  //     }
  //   }

  //   // if (isProductList  &&  m.subClassOf === FINANCIAL_PRODUCT)
  //   //   org.products.push(m.id)
  //   if (utils.isEnum(m))
  //     this.createEnumResources(m)

  //   // if (utils.isMessage(m)) {
  //   if (m.subClassOf === FORM) {
  //     storeUtils.addVerificationsToFormModel(m)
  //     storeUtils.addFromAndTo(m)
  //   }
  // },

/*
  async getShareableResources(params) {
    let {foundResources, to, context, filter} = params
    if (!foundResources)
      return
    if (me.isEmployee)
      return await this.getShareableResourcesForEmployee(params)
    var verTypes = [];
    var meId = utils.getId(me)
    var simpleLinkMessages = {}
    var meId = utils.getId(utils.getMe())

    var hasVerifiers = []
    let formToProduct = {}
    for (var i=0; i<foundResources.length; i++) {
      var r = foundResources[i]
      if (me  &&  utils.getId(r.to) !== meId  &&  utils.getId(r.from) !== meId)
        continue;
      // documentCreated identifier is set when the document of this type was created
      // and we don't want to create it again from this same notification
      if (r[TYPE] !== FORM_REQUEST  ||  r._documentCreated)
        continue;
      if (utils.getId(r.to)  !==  meId)
        continue
      // var msgParts = utils.splitMessage(r.message);
      // // Case when the needed form was sent along with the message
      // if (msgParts.length !== 2)
      //   continue;
      // Case when customer already has resource to SHARE on the screen but accidentally
      // or otherwise clicked on PRODUCT list link. To avoid the multiple shares
      // of the same resource with the same financial institution
      // let rr = simpleLinkMessages[msgParts[1]]
      let rr = simpleLinkMessages[r.form]
      if (rr) {
        rr._documentCreated = true
        this._getItem(utils.getId(rr))._documentCreated = true
        continue
      }
      simpleLinkMessages[r.form] = r
      var msgModel = this.getModel(r.form);

      if (msgModel  &&
          msgModel.subClassOf !== MY_PRODUCT  &&
          !msgModel.notShareable              &&
          !utils.isContext(msgModel)) {
        verTypes.push(msgModel.id);
        formToProduct[msgModel.id] = r.product
        if (r.verifiers)
          hasVerifiers[msgModel.id] = r.verifiers
      }
    }
    var shareableResources = {};
    var shareableResourcesRootToR = {}
    var shareableResourcesRootToOrgs = {}

    var isOrg = to  &&  to[TYPE] === ORGANIZATION
    var org = isOrg ? to : (to.organization ? this._getItem(utils.getId(to.organization)) : null)
    var reps = isOrg ? this.getRepresentatives(org) : [utils.getId(to)]
    var self = this

    var productsToShare = await this.searchSharables({modelName: MY_PRODUCT, to: utils.getMe(), strict: true })
    if (productsToShare  &&   productsToShare.length) {
      productsToShare.forEach((r) => {
        let fromId = utils.getId(r.from)
        if (r._sharedWith) {
          let sw = r._sharedWith.filter((r) => {
            if (reps.filter((rep) => {
                    if (utils.getId(rep) === r.bankRepresentative)
                      return true
                  }).length)
              return true
          })
          if (sw.length)
            return
        }
        if (shareableResourcesRootToR[r[ROOT_HASH]]) {
          let arr = shareableResources[r[TYPE]]
          let skip
          for (let i=0; i<arr.length  &&  !skip; i++) {
            if (r[ROOT_HASH] === rr[ROOT_HASH]) {
              if (r._time < rr._time)
                skip = true
              else
                arr.splice(i, 1)
            }
          }
          if (skip)
            return
        }
        let rr = {
          [TYPE]: VERIFICATION,
          document: r,
          organization: this._getItem(utils.getId(r.from)).organization
        }

        this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
      })
    }
    if (!verTypes.length)
      return {verifications: shareableResources}
    let toId = utils.getId(to)
    let l = await this.searchSharables({modelName: VERIFICATION, filterResource: {[TYPE]: verTypes}})
    // if (!l)
    //   return
    let verifiedShares = {}
    if (l) {
      l.forEach((val) => {
        checkOneVerification(val)
        verifiedShares[utils.getId(val.document)] = val
      })
    }
    // Allow sharing non-verified forms
    let curContext = context || await this.getCurrentContext(to)
    let promises = []
    verTypes.forEach((verType) => {
      if (hasVerifiers  &&  hasVerifiers[verType])
        return
      promises.push(this.searchSharables({modelName: verType}))
    })
    let result = await Promise.all(promises)
    result.forEach((ll) => {
      if (!ll)
        return

      ll.forEach((r) => {
        if (r.verificationsCount)
          return
        if (verifiedShares[utils.getId(r)])
          return
        if (this.checkIfWasShared(r, to))
          return
        if (filter  &&  utils.getDisplayName(r).indexOf(filter) === -1)
          return
        if (!curContext  ||  (r._context  &&  utils.getId(curContext) !== utils.getId(r._context))) {
          let rr = {
            [TYPE]: VERIFICATION,
            document: r,
            organization: this._getItem(utils.getId(r.to)).organization
          }
          this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
        }
      })
    })
    let multientryResources = shareableResources  &&  this.getMultiEntriesToShare(shareableResources, formToProduct)
    return {verifications: shareableResources, multientryResources: multientryResources, providers: shareableResourcesRootToOrgs}
    function checkOneVerification(val) {
      let id = utils.getId(val.to.id);

      var doc = val.document
      var docType = utils.getType(doc) //(doc.id && doc.id.split('_')[0]) || doc[TYPE];
      if (verTypes.indexOf(docType) === -1)
        return;
      // Filter out the verification from the same company
      // var fromId = utils.getId(val.from)
      // var fromOrgId = utils.getId(self._getItem(fromId).organization)
      // if (fromOrgId === toId)
      //   return
      var document = doc.id ? self._getItem(utils.getId(doc.id)) : doc;
      if (!document  ||  document._inactive)
        return;

      if (self.checkIfWasShared(document, to))
        return
      // Check if there is at least one verification by the listed in FormRequest verifiers
      if (hasVerifiers  &&  hasVerifiers[docType]) {
        let verifiers = hasVerifiers[docType]
        let foundVerifiedForm
        verifiers.forEach((v) => {
          let provider = SERVICE_PROVIDERS.filter((sp) => sp.id === v.id  &&  utils.urlsEqual(sp.url, v.url))
          if (!provider.length)
            return
          let spReps = self.getRepresentatives(provider[0].org)
          let sw = val._sharedWith.filter((r) => {
            return spReps.some((rep) => utils.getId(rep) === r.bankRepresentative)
          })
          if (sw.length)
            foundVerifiedForm = true
        })
        if (!foundVerifiedForm)
          return
      }

      var value = {};
      extend(value, val);
      value.document = document;

      self.addVisualProps(value)
      self.addAndCheckShareable(value, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
    }
  },
  async getShareableResourcesForEmployee(params) {
    let {foundResources, to, context} = params
    if (!foundResources)
      return
    if (context) {
      if (context._appSubmitted)
        return
      let appSubmitted = await this.searchServer({modelName: APPLICATION_SUBMITTED, filterResource: {context: context.contextId}, search: me.isEmployee, noTrigger: true })
      if (appSubmitted  &&  appSubmitted.list  &&  appSubmitted.list.length)
        return
    }
    var verTypes = [];
    var meId = utils.getId(me)
    var simpleLinkMessages = {}
    var meId = utils.getId(me)
    let repId, myRep
    if (me.isEmployee) {
      myRep = this.getRepresentative(me.organization)
      repId = myRep[ROOT_HASH]
    }

    var hasVerifiers = []
    let formToProduct = {}
    var contexts = {}
    let toR = (to.organization  &&  this._getItem(to.organization)) || to
    for (var i=0; i<foundResources.length; i++) {
      var r = foundResources[i]
      if (me  &&  utils.getId(r.to) !== meId  &&  utils.getId(r.from) !== meId)
        continue;
      if (r[TYPE] !== FORM_REQUEST  ||  r._documentCreated)
        continue;
      if (utils.getId(r.to)  !==  meId)
        continue
      let rr = simpleLinkMessages[r.form]
      if (rr) {
        rr._documentCreated = true
        this._getItem(utils.getId(rr))._documentCreated = true
        continue
      }
      simpleLinkMessages[r.form] = r
      var msgModel = this.getModel(r.form);
      if (msgModel  &&
          msgModel.subClassOf !== MY_PRODUCT  &&
          !msgModel.notShareable              &&
          !utils.isContext(msgModel)) {
        let productModel = this.getModel(r.product)
        if (!productModel)
          continue
        // let isMultiEntry = productModel.multiEntryForms && productModel.multiEntryForms.indexOf(r.form) !== -1

        let res = await this.searchServer({modelName: MESSAGE, filterResource: {_payloadType: r.form}, to: toR, search: me.isEmployee, context: r._context, noTrigger: true })
        if (res  &&  res.list  && res.list.length) {
          // let showShare
          // if (isMultiEntry) {
          //   res.forEach((mr) => {
          //     if (r.context !== mr._context.contextId)
          //       showShare = true
          //   })
          // }
          // if (!showShare) {
            // this._getItem(utils.getId(r))._documentCreated = true
            // r._documentCreated = true
            continue
          // }
        }
        contexts[utils.getId(r._context)] = r._context
        verTypes.push(msgModel.id);
        formToProduct[msgModel.id] = r.product
        if (r.verifiers)
          hasVerifiers[msgModel.id] = r.verifiers
      }
    }
    var shareableResources = {};
    var shareableResourcesRootToR = {}
    var shareableResourcesRootToOrgs = {}

    var isOrg = to  &&  to[TYPE] === ORGANIZATION
    var org = isOrg ? to : (to.organization ? this._getItem(utils.getId(to.organization)) : null)
    var reps = isOrg ? this.getRepresentatives(org) : [utils.getId(to)]
    var self = this
    if (!verTypes.length)
      return {verifications: shareableResources}

    // Allow sharing non-verified forms
    // let context = await this.getCurrentContext(to)
    let typeToDocs = {}
    let docs = []
    for (let i=0; i<verTypes.length; i++) {
      let verType = verTypes[i]
      if (hasVerifiers  &&  hasVerifiers[verType])
        continue
      var ll = await this.searchSharables({
        modelName: verType,
        filterResource: {_org: myRep[CUR_HASH]},
        noTrigger: true,
        // modelName: MESSAGE,
        // to: myRep,
        // filterResource: {_payloadType: verType},
      })
      if (!ll  ||  !ll.list  ||  !ll.list.length)
        continue

      typeToDocs[verType] = ll.list
      ll.list.forEach((r) => {
        let dId = utils.getId(r)
        if (!contexts[dId])
        // if (!this.checkIfWasShared(r, to))
          docs.push(dId)
      })
    }
    if (!docs.length)
      return

    let toId = utils.getId(to)
    // let l = await this.searchMessages({modelName: VERIFICATION, search: me.isEmployee})
    let result = await this.searchSharables({modelName: VERIFICATION, filterResource: {document: docs}, properties: ['document'], noTrigger: true,})
    let verifiedShares ={}
    // let promises = []
    if (result  &&  result.list) {
      let rep
      if (me.isEmployee) {
        let representative = this.getRepresentative(me.organization)
        rep = utils.getId(representative)
      }
      let contextId = context && utils.getId(context)

      let l = result.list
      l.forEach((val) => {
        checkOneVerification(val, contextId)
        // if (checkOneVerification(val, contextId)) {
        //   if (!val._context) {
        //     let vTo = val.to.id.split('_')
        //     promises.push(this.searchServer({modelName: MESSAGE, to: val.to, filterResource: {_payloadType: VERIFICATION, object___link: val[CUR_HASH]}}))
        //   }
        // }
        verifiedShares[utils.getId(val.document)] = val
      })
    }
    for (let t in typeToDocs) {
      let list = typeToDocs[t]

      list.forEach((d) => {
        if (verifiedShares[utils.getId(d)])
          return
        let rr = {
          [TYPE]: VERIFICATION,
          document: d,
          organization: this._getItem(utils.getId(d.from)).organization
        }
        this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})
        // if (this.addAndCheckShareable(rr, to, {shareableResources, shareableResourcesRootToR, shareableResourcesRootToOrgs})) {
        //   if (!d._context) {
        //     let dTo = this._getItem(d.to)
        //     promises.push(this.searchServer({modelName: MESSAGE, to: dTo, filterResource: {_payloadType: d[TYPE], object___link: d[CUR_HASH]}}))
        //   }
        // }
      })
    }
    // if (promises.length) {
    //   contexts = await Promise.all(promises)
    //   contexts.forEach((c) => {
    //     c = c
    //   })
    // }
*/
