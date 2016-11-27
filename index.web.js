// if (window.history && !localStorage._tradleTimeTraveled) {
//   if (history.length > 2) {
//     localStorage.setItem('_tradleTimeTraveled', 'y')
//     history.go(-(history.length - 2))
//   }
// }

// localStorage.removeItem('_tradleTimeTraveled')

// if we wake up on a non-zero route, go back to route 0
//
// will not be necessary when we switch to redux and save all state including history
// and get our bearings from the url

import browser from './utils/browser'

if (global.history && global.history.length) {
  const historyIndex = parseInt(location.hash.replace('#/scene_', ''))
  if (historyIndex) {
    history.go(-historyIndex)
  }
}

require('react-native').Alert = require('./web/shims/Alert')
require('./css/customicons.css')
require('./css/ionicons.min.css')
require('./css/styles.css')

const err = isUnsupportedEnv()
if (err) {
  const rootEl = document.createElement('div')
  rootEl.className = 'react-root'
  document.body.appendChild(rootEl)
  const Alert = require('react-native').Alert
  Alert.alert('Oh no!', err, [])
} else {
  require('whatwg-fetch')
  // if (!global.EventSource) {
  //   require('event-source-polyfill/eventsource.min.js')
  // }

  if (!console.table) console.table = console.log

  require('./web/shims/deviceEventEmitter')
  require('./web/shims/orientation')
  require('./index.common')

  const AppRegistry = require('react-native').AppRegistry
  const app = document.createElement('div')
  document.body.appendChild(app)
  AppRegistry.runApplication('Tradle', {
    rootTag: app
  })

  setTimeout(function () {
    const splash = document.getElementById('splashscreen')
    splash.parentNode.removeChild(splash)
  }, 500)

  // import Alert from './web/shims/Alert'
  // Alert.alert('Title', 'this is a much longer message than the shorter message', [
  //   { text: 'Cancel', onPress: () => alert('canceled!') },
  //   { text: 'OK', onPress: () => alert('ok!') },
  // ])
}

function isUnsupportedEnv () {
  if (browser.isIE && !window.indexedDB) {
    return 'This application cannot be used in InPrivate Browsing mode, due to storage and security limitations'
  }

  if (!window.indexedDB) {
    return 'This application is not supported in this browser. Please use Chrome, Safari, Firefox or IE11+'
  }
}
