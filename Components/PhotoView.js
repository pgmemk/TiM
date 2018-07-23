console.log('requiring PhotoView.js')
'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text,
  Modal,
  Animated,
  Easing,
  TouchableHighlight
} from 'react-native'

import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import { makeResponsive } from 'react-native-orient'
import _ from 'lodash'
import reactMixin from 'react-mixin'
import Icon from 'react-native-vector-icons/Ionicons';

import utils from '../utils/utils'
import constants from '@tradle/constants'
import PhotoCarouselMixin from './PhotoCarouselMixin'


class PhotoView extends Component {
  constructor(props) {
    super(props);
    // this.state = {}
    this.state = {anim: new Animated.Value(1.5), isModalOpen: false};
  }
  componentDidMount() {
     Animated.timing(      // Uses easing functions
       this.state.anim,    // The value to drive
       {toValue: 1,
       duration: 500}        // Configuration
     ).start();
  }
  changePhoto(photo) {
    this.setState({currentPhoto: photo});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (utils.resized(this.props, nextProps))
      return true
    if (this.props.resource[constants.ROOT_HASH] !== nextProps.resource[constants.ROOT_HASH] ||
        this.state.isModalOpen !== nextState.isModalOpen)
      return true
    if (this.props.mainPhoto  &&  nextProps.mainPhoto)
      return this.props.mainPhoto.url.split('?')[0] !== nextProps.mainPhoto.url.split('?')[0]
    else if (this.props.resource.photos  && nextProps.resource.photos)
      return this.props.resource.photos[0].url !== nextProps.resource.photos[0].url

    return !_.isEqual(this.props.resource.photos, nextProps.resource.photos)
  }
  render() {
    var resource = this.props.resource;
    if (!resource)
      return <View />;
    var modelName = resource[constants.TYPE];
    var model = utils.getModel(modelName);
    if (!model.interfaces  &&  !model.isInterface  &&  !resource[constants.ROOT_HASH])
      return <View />

    var hasPhoto = resource.photos && resource.photos.length;
    var currentPhoto = this.state.currentPhoto || this.props.mainPhoto || (hasPhoto  &&  resource.photos[0]);
    if (!currentPhoto)
      return <View />

    var url = currentPhoto.url;
    // var nextPhoto = resource.photos && resource.photos.length == 1
    var uri = utils.getImageUri(url);
    var source = uri.charAt(0) == '/' || uri.indexOf('data') === 0
               ? {uri: uri, isStatic: true}
               : {uri: uri}
    var nextPhoto;
    var len = resource.photos  &&  resource.photos.length;
    for (var i=0; i<len  &&  !nextPhoto; i++) {
      var p = resource.photos[i].url;
      if (p === url)
        nextPhoto = i === len - 1 ? resource.photos[0] : resource.photos[i + 1];
    }
    let {width, height} = utils.dimensions(PhotoView)
    let screenHeight = height - 100
    let resizeMode
    if (currentPhoto.width  &&  currentPhoto.height) {
      if (currentPhoto.width  <=  currentPhoto.height) {
        if (width > currentPhoto.width) {
          width = currentPhoto.width
          height = currentPhoto.height
          resizeMode = 'contain'
        }
        else {
          height = Math.round(height * currentPhoto.height / currentPhoto.width)
          resizeMode = 'cover'
        }
      }
      else {
        height = Math.round(height * currentPhoto.height / currentPhoto.width)
        resizeMode = 'cover'
      }
      height = Math.min(height, screenHeight / 2.5)
    }
    else {
      width = width < height ? width : height
      height = Math.round(width < height ? height / 2.5 : width / 2)
      resizeMode = 'contain'
    }
    let image = {
      width,
      height,
    }

    let style={transform: [{scale: this.state.anim}]}
 // onPress={() => {
 //              Animated.spring(this.state.anim, {
 //                toValue: 0,   // Returns to the start
 //                velocity: 3,  // Velocity makes it move
 //                tension: 1, // Slow
 //                friction: 100,  // Oscillate a lot
 //              }).start();
 //              this.showCarousel(resource.photos[0])
 //          }}
    let photoView
    let coverPhoto = utils.getPropertiesWithAnnotation(model, 'coverPhoto')
    coverPhoto = coverPhoto  &&  resource[Object.keys(coverPhoto)[0]]
    if (coverPhoto) {
      let coverPhotoUri = coverPhoto.url
      var coverPhotoSource = { uri: coverPhotoUri, cache: 'force-cache' }
      if (coverPhotoUri.charAt(0) == '/' || coverPhotoUri.indexOf('data') === 0)
        coverPhotoSource.isStatic = true

      var title = utils.getDisplayName(this.props.resource)
      let fontSize = title.length < 15 ? 30 : 24
      photoView = (
        <ImageBackground resizeMode='cover' source={coverPhotoSource} style={image}>
          <View style={{height: 50, backgroundColor: '#000000', alignSelf: 'stretch', opacity: 0.2, position: 'absolute', left: 0, bottom: 0, width: width}} />
          <Image resizeMode='cover' source={source} style={{width: 80, height: 80, /*borderWidth: 2, borderColor: '#ffffff',*/ position: 'absolute', left: 10, bottom: 10}} />
          <Text style={{fontSize: fontSize, color: '#ffffff', position: 'absolute', left: 95, bottom: 10}}>{title}</Text>
        </ImageBackground>
      )
    }
    else
      photoView = <Image resizeMode={resizeMode} source={source} style={image} />

    return (
          <Animated.View style={style}>
            <TouchableHighlight underlayColor='transparent' onPress={this.showCarousel.bind(this, this.props.mainPhoto || resource.photos[0], true)}>
              {photoView}
            </TouchableHighlight>
          </Animated.View>
    )
  }
  openModal() {
    this.setState({isModalOpen: true});
  }
  closeModal() {
    this.setState({isModalOpen: false});
  }

}
reactMixin(PhotoView.prototype, PhotoCarouselMixin);
PhotoView = makeResponsive(PhotoView)

var styles = StyleSheet.create({
  photoBG: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch'
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    // padding: 20,
  },
});

module.exports = PhotoView;
