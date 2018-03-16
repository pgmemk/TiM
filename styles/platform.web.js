'use strict';

import {StyleSheet} from 'react-native';

module.exports = exports = StyleSheet.create({
  container: {
    // backgroundColor: '#f7f7f7',
    marginTop: 64,
    flex: 1,
  },
  navBarText: {
    marginTop: 5,
    fontSize: 17
  },
  menuButtonNarrow: {
    marginTop: -23,
    paddingVertical: 5,
    paddingHorizontal: 21,
    height: 45,
    justifyContent: 'center',
    borderRadius: 24,
    // shadowOffset:{width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#afafaf',
    backgroundColor: 'red'
  },
  menuButton: {
    marginTop: -23,
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 24,
    // shadowOffset:{width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#afafaf',
    backgroundColor: 'red'
  },
  menuButtonRegular: {
    marginTop: -20,
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 24,
    // shadowOffset:{width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#afafaf',
    backgroundColor: 'red'
  },
  conversationButton: {
    marginTop: -20,
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 24,
    // shadowOffset:{width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#afafaf',
    backgroundColor: 'red'
  },
  touchIdText: {
    color: '#2E3B4E',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 15,
    alignSelf: 'flex-start'
  }

})

var menuIcon = {
  name: 'md-more',
  color: '#ffffff'
}

exports.MenuIcon = menuIcon

// Object.defineProperty(exports, 'MB', {
//   icon: 'md-more',
//   color: '#ffffff'
// })

// module.exports = require('./platform.ios.js')