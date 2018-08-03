console.log('requiring SignatureView.js')
'use strict';

import utils from '../utils/utils'
import PageView from './PageView'
import extend from 'extend'
import Icon from 'react-native-vector-icons/Ionicons';

import StyleSheet from '../StyleSheet'
import platformStyles from '../styles/platform'

import {
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

import React, { Component } from 'react'
// import { makeResponsive } from 'react-native-orient'
import SignaturePad from 'react-native-signature-pad'

class SignatureView extends Component {
  static displayName = 'SignatureView';
  props: {
    navigator: PropTypes.object.isRequired,
    onSignature: PropTypes.func,
    returnRoute: PropTypes.object,
  };
  static displayName = 'SignatureView';

  constructor(props) {
    super(props);
    const { value } = props
    this.state = { value }
    this.scrollviewProps = {
      automaticallyAdjustContentInsets:true,
      scrollEventThrottle: 50,
      onScroll: this.onScroll.bind(this)
    };
  }
  done() {
    this.props.onSignature(this.getSignature())
  }
  onScroll(e) {
    this._contentOffset = { ...e.nativeEvent.contentOffset }
  }
  render() {
    let { sigViewStyle } = this.props
    const { width, height } = utils.dimensions(SignatureView)
    let separator = utils.getContentSeparator(sigViewStyle)
    let styles = createStyles({sigViewStyle})
    return (
      <PageView style={platformStyles.container} separator={separator} bankStyle={sigViewStyle}>
        <Text style={styles.instructions}>Please sign inside the grey box</Text>
        <View style={{
          flex: 1,
          maxHeight: Math.min(width / 2, 200),
          borderColor: '#ddd',
          borderWidth: 10,
          margin: 5
        }}>
          <SignaturePad ref='sigpad'
                        onError={this._signaturePadError}
                        lockToLandscape={false}
                        onChange={this.onChangeText.bind(this)}
                        style={{flex: 1, backgroundColor: 'white', padding: 20}}/>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => this.done()} style={styles.submit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.refs.sigpad.clear()} style={styles.clear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </PageView>
    )
  }
  onChangeText(value) {
    // let val = format(value, this.props.resource)
    this.setState({ value })
  }
  getSignature() {
    return { ...this.state.value }
  }
}

var createStyles = utils.styleFactory(SignatureView, function ({ dimensions, sigViewStyle  }) {
  return StyleSheet.create({
    instructions: {
      fontSize: 24,
      padding: 10,
      alignSelf: 'center',
      color: '#aaaaaa'
    },
    submitButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: 340,
      marginTop: 20,
      // marginBottom: 50,
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      // marginHorizontal: 20
    },

    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    submit: {
      backgroundColor: sigViewStyle.linkColor,
      flexDirection: 'row',
      justifyContent: 'center',
      width: 250,
      marginTop: 20,
      alignSelf: 'center',
      height: 40,
      borderRadius: 15,
      marginRight: 20
    },
    submitText: {
      fontSize: 20,
      color: '#ffffff',
      alignSelf: 'center'
    },
    clear: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 250,
      marginTop: 20,
      alignSelf: 'center',
      height: 40,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: sigViewStyle.linkColor
    },
    clearText: {
      fontSize: 20,
      color: sigViewStyle.linkColor,
      alignSelf: 'center'
    },
    buttons: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
  })
})

module.exports = SignatureView;
