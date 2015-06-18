'use strict';

var React = require('react-native');
var NewResource = require('./NewResource');
var utils = require('../utils/utils');
var reactMixin = require('react-mixin');
var Store = require('../Store/Store');
var Actions = require('../Actions/Actions');
var Reflux = require('reflux');

var {
  ListView,
  Text,
  Component,
  StyleSheet,
  View,
} = React;


class ResourceTypesScreen extends Component {
  constructor(props) {
    super(props);
    var implementors = utils.getImplementors(this.props.modelName);

    var dataSource =  new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      implementors: implementors,
      dataSource: dataSource.cloneWithRows(implementors),
      newModelAdded: false
    };
  }
  componentDidMount() {
    this.listenTo(Store, 'onNewModelAdded');
  }
  onNewModelAdded(params) {
    if (params.action !== 'newModelAdded')
      return;
    if (params.err)
      this.setState({err: params.err});
    else {
      var implementors = this.state.implementors;
      implementors.push(params.newModel);
      this.setState({
        implementors: implementors,
        dataSource: this.state.dataSource.cloneWithRows(this.state.implementors),
      });
    }
  }
  selectResource(resource) {
    // Case when resource is a model. In this case the form for creating a new resource of this type will be displayed
    var model = utils.getModel(this.props.modelName);

    if (resource['_type'])
      return;
    var page = {
      model: utils.getModel(resource.id).value,
      resource: {
        '_type': this.props.modelName, 
        'from': utils.getMe(),
        'to': this.props.resource
      }
    };
    if (this.props.returnRoute)
      page.returnRoute = this.props.returnRoute;
    if (this.props.callback)
      page.callback = this.props.callback;
    this.props.navigator.replace({
      id: 4,
      title: resource.title,
      component: NewResource,
      titleTextColor: '#7AAAC3',
      passProps: page
    });
  }

  renderRow(resource)  {
    var model = utils.getModel(resource['_type'] || resource.id).value;
    var isMessage = model.interfaces  &&  model.interfaces.indexOf('tradle.Message') != -1;
    var MessageRow = require('./MessageRow');

    return (
      <MessageRow
        onSelect={() => this.selectResource(resource)}
        resource={resource}
        owner={resource.owner}
        navigator={this.props.navigator}
        to={this.props.resource} />
      );
  }
  render() {
    var content = 
    <ListView ref='listview' style={styles.listview}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode='onDrag'
      keyboardShouldPersistTaps={true}
      showsVerticalScrollIndicator={false} />;

    var err = this.state.err 
            ? <View style={styles.errContainer}><Text style={styles.err}>{this.state.err}</Text></View>
            : <View />;
    return (
      <View style={styles.container}>
        {err}
        {content}
      </View>
    );
  }
}
reactMixin(ResourceTypesScreen.prototype, Reflux.ListenerMixin);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listview: {
    marginTop: 64,
  },
  centerText: {
    alignItems: 'center',
  },
  err: {
    color: '#D7E6ED'
  },
  errContainer: {
    height: 45, 
    paddingTop: 5, 
    paddingHorizontal: 10, 
    backgroundColor: '#eeeeee', 
  }
});

module.exports = ResourceTypesScreen;
