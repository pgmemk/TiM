'use strict';
 
var React = require('react-native');
var ResourceList = require('./ResourceList');
var AddNewIdentity = require('./AddNewIdentity');
var NewResource = require('./NewResource');
var ResourceView = require('./ResourceView');
var utils = require('../utils/utils');
var Reflux = require('reflux');
var Actions = require('../Actions/Actions');
var Store = require('../Store/Store');
var reactMixin = require('react-mixin');
var sampleData = require('../data/data');

var {
  StyleSheet,
  Text,
  Navigator,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  ScrollView
} = React;

class SearchPage extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    isLoading: true,
	  };
	}
  componentWillMount() {
    Actions.start();
  }
  componentDidMount() {
    this.listenTo(Store, 'onReloadDB');
    this.listenTo(Store, 'onStart');
  }
  onReloadDB(params) {
    if (params.action === 'reloadDB') {
      this.setState({isLoading: false});
      utils.setModels(params.models);
    }
  }
  onStart(params) {
    if (params.action === 'start') {
      utils.setMe(params.me);
      utils.setModels(params.models);
      this.setState({isLoading: false});
    }

  }
  showContactsOrRegister() {
    if (utils.getMe())
      this.showContacts();
    else
      this.onEditProfilePressed();
  }
	showContacts() {
    var passProps = {
        filter: '', 
        modelName: this.props.modelName,
      };
    var me = utils.getMe();
    this.props.navigator.push({
      // sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      id: 10,
      title: 'Contacts',
      titleTextColor: '#7AAAC3',
      component: ResourceList,
      rightButtonTitle: 'Profile',
      passProps: passProps,
      onRightButtonPress: {
        title: utils.getDisplayName(me, utils.getModel(me['_type']).value.properties),
        id: 3,
        component: ResourceView,
        titleTextColor: '#7AAAC3',
        rightButtonTitle: 'Edit',
        onRightButtonPress: {
          title: me.firstName,
          id: 4,
          component: NewResource,
          titleTextColor: '#7AAAC3',
          backButtonTitle: me.firstName,
          passProps: {
            model: utils.getModel(me['_type']).value,
            resource: me
          }
        },        
        passProps: {resource: me}
      }
    });
	}
  
  onEditProfilePressed() {
    var modelName = this.props.modelName;
    if (!utils.getModel(modelName)) {
      this.setState({err: 'Can find model: ' + modelName});
      return;
    }
    var model = utils.getModel(modelName).value;
    var route = {
      component: NewResource,
      backButtonTitle: 'Back',
      id: 4,
      titleTextColor: '#7AAAC3',
      passProps: {
        model: model
      },
    };
    var me = utils.getMe();
    if (me) {
      page.resource = me;
      route.title = 'Edit Identity';
    }
    else {
      route.title = 'Register';
      route.passProps.callback = this.popToTop.bind(this);
    }
    this.props.navigator.push(route);
  }
  popToTop(resource) {
    utils.setMe(resource);
    this.props.navigator.popToTop();
  }
  onReloadDBPressed() {
    utils.setMe(null);
    utils.setModels(null);
    Actions.reloadDB();
  } 
  render() {
  	var spinner = this.state.isLoading 
                ? <ActivityIndicatorIOS hidden='true' size='large'/>  
                :  <View/>;
    if (this.state.isLoading)
      return <View/>;                
    var err = this.state.err || '';
    var errStyle = err ? styles.err : {'padding': 0, 'height': 0};
    var myId = sampleData.getMyId() || utils.getMe();
    var editProfile;

    if (utils.getMe())
      editProfile = <TouchableHighlight 
                        underlayColor='#2E3B4E' onPress={this.onEditProfilePressed.bind(this)}>
                      <Text style={styles.text}>
                        {'Edit Profile'}
                      </Text>
                    </TouchableHighlight>         
    else
      editProfile = <View />;
    // else  {
    //   var r = {'_type': this.props.modelName};
    //   editProfile = <AddNewIdentity resource={r} isRegistration={true} navigator={this.props.navigator} />;
    // }
    return (
      <View style={styles.scroll}>
        <View style={styles.container} ref='search'>
          <TouchableHighlight style={[styles.thumbButton]}
              underlayColor='#2E3B4E' onPress={this.showContactsOrRegister.bind(this)}>
            <Image style={styles.thumb} source={require('image!Logo')}>
            </Image>
          </TouchableHighlight>
          <Text style={errStyle}>{err}</Text>
          <View style={{marginTop: 170, flexDirection: 'row'}}>
            {editProfile}
            <TouchableHighlight 
                underlayColor='#2E3B4E' onPress={this.onReloadDBPressed.bind(this)}>
              <Text style={styles.text}>
                Reload DB
              </Text>
            </TouchableHighlight>
          </View>
        </View>
          {spinner}   
          <View style={{height: 400}}></View>
      </View>  
    );
  }
}

reactMixin(SearchPage.prototype, Reflux.ListenerMixin);

var styles = StyleSheet.create({
  scroll: {
    marginTop: 60,
    backgroundColor: '#2E3B4E',
  },
  container: {
    padding: 30,
    // paddingTop: 10,
    marginTop: 70,
    alignItems: 'center',
    backgroundColor: '#2E3B4E',

  },
  text: {
    color: '#D7E6ED',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },
  thumbButton: {
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding:40, 
  },
  thumb: {
    width: 200,
    height: 200,
  },
});


module.exports = SearchPage;
  // easeInQuad(t) {
  //   return t * t;
  // }
  // f() {
  //   var infiniteDuration = 1000;
  //   var easeDuration = 300;
  //     AnimationExperimental.startAnimation({
  //       node: this.refs['search'],
  //       duration: infiniteDuration,
  //       // easing: 'easeInQuad',
  //       easing: (t) => this.easeInQuad(Math.min(1, t*infiniteDuration/easeDuration)),
  //       property: 'scaleXY',
  //       toValue: [1,1]
  //       // property: 'position',
  //       // toValue: {x:200, y:-30},
  //       // delay: 30000
  //     })    
  // }
