'use strict';

var utils = require('../utils/utils');
var translate = utils.translate
var StyleSheet = require('../StyleSheet')

var DEFAULT_PRODUCT_ROW_BG_COLOR = '#f7f7f7'
var DEFAULT_PRODUCT_ROW_TEXT_COLOR = '#757575'
var PRODUCT_ROW_BG_COLOR, PRODUCT_ROW_TEXT_COLOR
const PRODUCT_APPLICATION = 'tradle.ProductApplication'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import React, { Component } from 'react'

class StringRow extends Component {
  constructor(props) {
    super(props);
    PRODUCT_ROW_BG_COLOR = (this.props.bankStyle  &&  this.props.bankStyle.productRowBgColor) || DEFAULT_PRODUCT_ROW_BG_COLOR
    PRODUCT_ROW_TEXT_COLOR = (this.props.bankStyle  &&  this.props.bankStyle.productRowTextColor) || DEFAULT_PRODUCT_ROW_TEXT_COLOR
  }
  render() {
    let title = this.props.title
    let renderedRow = <Text style={[styles.modelTitle, {color: PRODUCT_ROW_TEXT_COLOR}]} numberOfLines={2}>{title}</Text>;

    var viewStyle = { marginVertical: StyleSheet.hairlineWidth, backgroundColor: PRODUCT_ROW_BG_COLOR }
    return (
      <TouchableHighlight style={viewStyle} onPress={this.props.callback} underlayColor='transparent'>
        {renderedRow}
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  modelTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 15,
    marginLeft: 15
  },
});

module.exports = StringRow;
