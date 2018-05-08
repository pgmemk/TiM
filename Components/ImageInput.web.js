
import React, {
  Component
} from 'react'

import PropTypes from 'prop-types'
import {
  Platform,
  TouchableHighlight,
  View,
  Alert
} from 'react-native'

import ReactDOM from 'react-dom'
import {
  readImage,
  isImageDataURL,
  translate
} from '../utils/utils'

import FileInput from 'react-file-input'
const PHOTO = 'tradle.Photo'

const imageInputPropTypes = {
  ...TouchableHighlight.propTypes,
  prop: PropTypes.string.isRequired,
  onImage: PropTypes.func.isRequired
}

class ImageInput extends Component {
  props: imageInputPropTypes;
  constructor(props) {
    super(props)
    this._onPress = this._onPress.bind(this)
  }
  _onPress() {
    if (this._pressing) return

    this._pressing = true
    setTimeout(() => this._pressing = false, 100)
    this.showImagePicker()
  }
  showImagePicker() {
    const me = ReactDOM.findDOMNode(this)
    const inputs = me.getElementsByTagName('input')
    const fileInput = [].filter.call(inputs, i => i.type === 'file')[0]
    fileInput.click()
  }
  render() {
    const touchableProps = { ...this.props }
    delete touchableProps.prop
    delete touchableProps.onImage

    // allow override of onPress
    return (
      <View>
        <TouchableHighlight
          underlayColor='transparent'
          {...touchableProps}
          onPress={this.props.onPress || this._onPress}>
          {this.props.children}
        </TouchableHighlight>
        {this.renderImageFileInput()}
      </View>
    )
  }
  renderImageFileInput() {
    const { prop, onImage } = this.props
    let isPhoto = prop.items  &&  prop.items.ref === PHOTO || prop.ref === PHOTO
    return (
      <View style={{ width: 0, height: 0, opacity: 0 }}>
        <FileInput
          ref={ref => this._input = ref}
          name={prop.name}
          placeholder={prop.title || prop.name}
          onChange={e => {
            readImage(e.target.files[0], function (err, item, file) {
              if (err) return Alert.alert(translate('unableToProcessFile'), err.message)

              if (isPhoto  &&  !isImageDataURL(item.url)) {
                return Alert.alert(translate('unsupportedFormat'), translate('pleaseUploadImage'))
              }

              onImage({
                ...item,
                isVertical: true,
                file
              })
            })
          }} />
      </View>
    )
  }
}

module.exports = ImageInput
