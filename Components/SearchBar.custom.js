console.log('requiring SearchBar.js')
'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  TextInput
} from 'react-native'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  render() {
    let {bankStyle, filter} = this.props
    return (
      <View style={{padding: 7, borderBottomWidth: 2, borderBottomColor: bankStyle ? bankStyle.linkColor : '#7AAAC3'}}>
        <TextInput
          style={styles.searchBarInput}
          autoCapitalize='none'
          onChange={this.props.onChangeText.bind(this)}
          placeholder='Search'
          placeholderTextColor='#bbbbbb'
          underlineColorAndroid='transparent'
          value={filter}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  searchBarInput: {
    height: Platform.OS === 'android' ? 40 : 32,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 7,
    // marginHorizontal: -5,
    fontSize: 20,
    // paddingLeft: 5,
    // fontWeight: '600',
    backgroundColor: '#ffffff',
    // borderRadius: 5,
    // borderBottomWidth: 2,
    color: '#757575',
    // borderBottomColor: '#7AAAC3',
  }
});

module.exports = SearchBar;
