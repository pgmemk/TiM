'use strict';

var utils = require('../utils/utils');
var ResourceView = require('./ResourceView');
var ResourceList = require('./ResourceList');
var constants = require('@tradle/constants');


var ResourceViewMixin = {
  showRefResource(resource, prop) {
    var id = utils.getId(resource)
    // if (resource[constants.TYPE] + '_' + resource[constants.ROOT_HASH] !== this.state.propValue)
    if (id !== this.state.propValue)
      return;
    var type = resource[constants.TYPE] || id.split('_')[0]
    var model = utils.getModel(type).value;
    var title = utils.getDisplayName(resource, model.properties);
    this.props.navigator.push({
      title: title,
      id: 3,
      component: ResourceView,
      titleTextColor: '#7AAAC3',
      // rightButtonTitle: 'Edit',
      backButtonTitle: 'Back',
      passProps: {
        resource: resource,
        prop: prop,
        currency: this.props.currency
      }
    });
  },
  showResources(resource, prop) {
    this.props.navigator.push({
      id: 10,
      title: utils.makeLabel(prop.title),
      titleTextColor: '#7AAAC3',
      backButtonTitle: 'Back',
      component: ResourceList,
      passProps: {
        modelName: prop.items.ref,
        filter: '',
        resource: resource,
        prop: prop,
        currency: this.props.currency
      }
    });
  }
}
module.exports = ResourceViewMixin;
