import '../../utils/shim'
import React from 'react'
import {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { scan, recognizers } from '../../Components/BlinkID'

const bigText = (text, style) => <Text style={[styles.bigText, style]}>{text}</Text>
const wrapWithView = children => <View>{children}</View>
const createButton = ({ text, onPress }) => (
  <TouchableHighlight onPress={onPress} style={styles.button}>
    {bigText(text, styles.buttonText)}
  </TouchableHighlight>
)

const prettify = obj => obj ? JSON.stringify(obj, null, 2) : ''
const baseOpts = {
  quality: 0.2,
  base64: true,
  timeout: 60000,
  tooltip: 'Center that shit',
}

const variants = [
  'mrtd',
  'eudl',
  'nzdl',
  ['usdl', 'face'],
  'barcode',
].map(recognizers => ({
  ...baseOpts,
  recognizers: [].concat(recognizers),
}))

class Blink extends React.Component {
  constructor() {
    super()
    this.scan = this.scan.bind(this)
    this.state = {}
  }
  scan = async (opts) => {
    try {
      this.setState({
        result: await scan(opts),
        error: null,
      })
    } catch (err) {
      this.setState({
        result: null,
        error: err.message,
      })
    }
  }
  render = () => {
    return (
      <View style={styles.container}>
        {bigText('Variants:')}
        {variants.map(this.renderVariant)}
        {bigText('Result:')}
        {this.renderResult()}
        {bigText('Error:')}
        {this.renderError()}
      </View>
    )
  }
  renderVariant = (opts) => {
    return createButton({
      text: opts.recognizers.join(' + '),
      onPress: () => this.scan(opts)
    })
  }
  renderResult = () => {
    return wrapWithView(bigText(prettify(this.state.result)))
  }
  renderError = () => {
    return wrapWithView(bigText(prettify(this.state.error)))
  }
}

AppRegistry.registerComponent('Tradle', () => Blink);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'blue',
  },
  bigText: {
    fontSize: 30,
  }
})
