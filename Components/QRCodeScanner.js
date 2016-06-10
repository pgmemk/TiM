
var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React

import { Component, PropTypes } from 'react'

var ICON_BORDER_COLOR = '#D7E6ED'
var Camera = require('react-native-camera')
var Icon = require('react-native-vector-icons/Ionicons')
var Dir = Camera.constants.Type

class QRCodeScannerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameraType: Camera.constants.Type.back
    }
  }
  propTypes: {
    onread: PropTypes.func.isRequired
  };
  render() {
    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead.bind(this)}
        type={this.state.cameraType}>
        <TouchableHighlight onPress={this._switchCamera.bind(this)} style={styles.flip}>
          <Icon name='ios-reverse-camera' size={25} color='#eeeeee' style={styles.icon} />
        </TouchableHighlight>
      </Camera>
    )
  }
  _onBarCodeRead(e) {
    if (this._finished) return

    this._finished = true
    this.props.onread(e)
  }
  _switchCamera() {
    var cameraType = this.state.cameraType === Dir.back ? Dir.front : Dir.back
    this.setState({cameraType})
  }
}

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 30,
    height: 30
  },
  flip: {
    position: 'absolute',
    top: 30,
    right: 10
  }
}

module.exports = QRCodeScannerView
