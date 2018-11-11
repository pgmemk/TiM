import { Platform } from 'react-native'
import { isEmulator } from 'react-native-device-info'
import withDefaults from 'lodash/defaults'
import ImagePicker from 'react-native-image-picker'
import { translate, pickNonNull } from './utils'
import { normalizeImageCaptureData } from './image-utils'
import CameraDefaults from './camera-defaults'

const isIosSimulator = Platform.OS === 'ios' && isEmulator()
const DEFAULTS = {
  // image picker
  returnIsVertical: true,
  cancelButtonTitle: translate('cancel'),
  mediaType: 'photo',
}

export const capture = props => new Promise((resolve, reject) => {
  const {
    // common
    title,
    cameraType,
    quality,
    width,
    height,
    saveToFS,
    returnBase64,
    backupToICloud,

    // specific to image picker
    returnIsVertical,
    cancelButtonTitle,
    mediaType,
  } = withDefaults(props, CameraDefaults, DEFAULTS)

  if (!quality) throw new Error('expected "number" quality')

  let method = 'launchCamera'
  if (isIosSimulator) {
    method = 'launchImageLibrary'
  }

  const opts = {
    title,
    quality,
    maxWidth: width,
    maxHeight: height,
    cameraType,
    returnIsVertical,
    cancelButtonTitle,
    mediaType,
    noData: returnBase64 === false,
    storageOptions: {
      skipBackup: backupToICloud === false,
      store: saveToFS !== false,
    },
    // due to out-of-memory issues
    // maxHeight: 1536,
  }

  ImagePicker[method](pickNonNull(opts), ({ error, didCancel, ...result }) => {
    if (didCancel) return resolve()
    if (error) return reject(new Error(error))

    resolve(normalizeImageCaptureData({
      ...result,
      extension: quality === 1 ? 'png' : 'jpeg',
      base64: result.data,
      quality,
    }))
  })
})
