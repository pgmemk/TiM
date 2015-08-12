'use strict';

var React = require('react-native');
var utils = require('../utils/utils');
var moment = require('moment');
var LinearGradient = require('react-native-linear-gradient');
var ArticleView = require('./ArticleView');
var constants = require('tradle-constants');
var Icon = require('react-native-vector-icons/Ionicons');
var MONEY_TYPE = 'tradle.Money';

var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Component,
  View
} = React;

class ResourceRow extends Component {
  render() {     
    var resource = this.props.resource;
    var photo;
    if (resource.photos &&  resource.photos.length) {
      var uri = utils.getImageUri(resource.photos[0].url);

        var params = {
          uri: utils.getImageUri(uri)
        }
        if (uri.indexOf('/var/mobile/') === 0)
          params.isStatic = true
        photo = <Image source={params} style={styles.cellImage} /> 
      
    }
    else {
      if (resource[constants.TYPE] === constants.TYPES.IDENTITY) {
        photo = <LinearGradient colors={['#A4CCE0', '#7AAAc3', '#5E92AD']} style={styles.cellRoundImage}>
           <Text style={styles.cellText}>{resource.firstName.charAt(0) + (resource.lastName ? resource.lastName.charAt(0) : '')}</Text>
        </LinearGradient>
      }
      else {
        var icon = utils.getModel(resource[constants.TYPE]).value.icon;
        if (icon) 
          photo = <View style={styles.cellImage}><Icon name={icon} size={35} style={styles.icon} /></View>
        else
          photo = <View style={styles.cellImage} />
      }
    }

    var onlineStatus = (resource.online) 
                     ? <View style={styles.online}></View>
                     : <View style={[styles.online, {backgroundColor: 'transparent'}]}></View>
    
    var cancelResource = (this.props.onCancel) 
                       ? <View>
                         <TouchableHighlight onPress={this.props.onCancel} underlayColor='transparent'>
                           <View>
                             <Icon name='close-circled'  size={30}  color='#B1010E'  style={styles.cancelIcon} /> 
                           </View>  
                         </TouchableHighlight>
                         </View>  
                       : <View />; 
    
    return (
      <View key={this.props.key}>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.row} key={this.props.key + '1'}>
            {photo}
            {onlineStatus}
            <View style={styles.textContainer} key={this.props.key + '2'}>
              {this.formatRow(resource)}
            </View>
            {cancelResource}
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder} />
      </View>
    );
  }
  formatRow(resource) {
    var self = this;
    var model = utils.getModel(resource[constants.TYPE] || resource.id).value;
    var viewCols = model.gridCols || model.viewCols;
    var renderedViewCols;
    if (!viewCols) {
      var vCols = utils.getDisplayName(resource, model.properties);
      return <Text style={styles.resourceTitle} numberOfLines={2}>{vCols}</Text>;
    }
    var vCols = [];
    var properties = model.properties;
    var first = true
    var dateProp;
    var datePropIdx;
    var datePropsCounter = 0;
    var backlink;    
    for (var i=0; i<viewCols.length; i++) {
      var v = viewCols[i];
      if (properties[v].type === 'array') { 
        if (properties[v].items.backlink)
          backlink = v;
        continue;
      }
      if (properties[v].type !== 'date'  ||  !resource[v])
        continue;
      if (resource[v]) {
        if (v === 'dateSubmitted' || v === 'lastMessageTime') {
          dateProp = v;
          if (!datePropsCounter)
            datePropIdx = i;
          datePropsCounter++;
        }
      }
    }
    if (datePropsCounter > 1)
      dateProp = null;

    viewCols.forEach(function(v) {
      if (v === dateProp)
        return;
      if (properties[v].type === 'array') 
        return;        
      
      if (!resource[v]  &&  !properties[v].displayAs)
        return;
      var style = (first) ? styles.resourceTitle : styles.description;
      if (properties[v].style)
        style = [style, properties[v].style];
      var ref = properties[v].ref;
      if (ref) {
        if (resource[v]) {
          var row;
          if (ref == MONEY_TYPE) {
            var currencies = utils.getModel(ref).value.properties.currency.oneOf;
            var valCurrency = resource[v].currency;
            for (var c of currencies) {
              var currencySymbol = c[valCurrency];
              if (currencySymbol) {
                var val = (valCurrency == 'USD') ? currencySymbol + resource[v].value : resource[v].value + currencySymbol;
                row = properties[v].skipLabel
                    ? <Text style={style} numberOfLines={first ? 2 : 1}>{val}</Text>
                    : <View style={{flexDirection: 'row'}}><Text style={style}>{properties[v].title}</Text><Text style={style} numberOfLines={first ? 2 : 1}>{val}</Text></View>
                break;
              }
            }        
          }
          else  
            row = <Text style={style} numberOfLines={first ? 2 : 1}>{resource[v].title}</Text>
          
          vCols.push(row);
        }
        first = false;
      }
      else if (properties[v].type === 'date') {
        if (!dateProp)
          vCols.push(self.addDateProp(resource, v));
        else
          return;
      }
      else  {
        var row;
        if (resource[v]  &&  (typeof resource[v] != 'string'))
          row = <Text style={style} numberOfLines={1}>{resource[v]}</Text>;
        else if (!backlink  &&  resource[v]  && (resource[v].indexOf('http://') == 0  ||  resource[v].indexOf('https://') == 0))
          row = <Text style={style} onPress={self.onPress.bind(self)} numberOfLines={1}>{resource[v]}</Text>;
        else {          
          var val = properties[v].displayAs ? utils.templateIt(properties[v], resource) : resource[v];
          let msgParts = utils.splitMessage(val);
          if (msgParts.length <= 2) 
            val = msgParts[0];
          else {
            val = '';
            for (let i=0; i<msgParts.length - 1; i++)
              val += msgParts[i];
          }
          row = <Text style={style}>{val}</Text>;
        }
        if (first  &&  dateProp) {
          var val = utils.formatDate(new Date(resource[dateProp]));
          // var dateBlock = self.addDateProp(resource, dateProp, true);
          row = <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View>{row}</View>
                  <View><Text style={styles.verySmallLetters}>{val}</Text></View>
                </View>
        }
        vCols.push(row);
        first = false;
      }
    }); 
    if (vCols)
      renderedViewCols = vCols;
    if (!backlink)
      return renderedViewCols;
    return [ 
      <TouchableHighlight onPress={this.props.showRefResources.bind(this, resource, backlink)}>
        <View>
          {renderedViewCols}
        </View>
      </TouchableHighlight>
    ];
  }
  addDateProp(resource, dateProp) {
    var properties = utils.getModel(resource[constants.TYPE] || resource.id).value.properties;
    var style = styles.description;
    if (properties[dateProp].style)
      style = [style, properties[dateProp].style];
    var val = utils.formatDate(new Date(resource[dateProp])); //utils.getFormattedDate(new Date(resource[dateProp]));
    
    return properties[dateProp].skipLabel
        ? <Text style={style}>{val}</Text>
        : <View style={{flexDirection: 'row'}}><Text style={style}>{properties[dateProp].title}</Text><Text style={style}>{val}</Text></View>

    return <Text style={[style]} numberOfLines={1}>{val}</Text>;
    // return <Text style={[style, {alignSelf: 'flex-end'}]} numberOfLines={1}>{val}</Text>;

  }
  onPress(event) {
    var model = utils.getModel(resource[constants.TYPE] || resource.id).value;
    var title = utils.makeTitle(utils.getDisplayName(this.props.resource, model.properties));
    this.props.navigator.push({
      id: 7,
      title: title,
      component: ArticleView,
      passProps: {url: this.props.resource.url}
    });
  }
}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  resourceTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 2,
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#999999',
    fontSize: 14,
  },
  row: {
    backgroundColor: 'white',
    // justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 5,
  },
  cell: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 18
  },
  myCell: { 
    padding: 5, 
    marginLeft: 30,
    justifyContent: 'flex-end', 
    borderRadius: 10, 
    backgroundColor: '#D7E6ED'
  },
  cellRoundImage: {
    // backgroundColor: '#7AAAc3',
    paddingVertical: 1,
    // borderColor: '#7AAAc3',
    borderRadius: 30,
    // borderWidth: 1,
    height: 60,
    marginRight: 10,
    width: 60,
    alignSelf: 'center'
  },
  cellText: {
    marginTop: 16,
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 60,
    marginRight: 10,
    width: 60,
    borderColor: '#7AAAc3',
    borderRadius: 30,
    borderWidth: 1,
  },
  cellBorder: {
    backgroundColor: '#eeeeee',
    height: 1,
    marginLeft: 4,
  },
  cancelIcon: {
    width: 40,
    height: 40,
    // marginTop: -10,
    // alignSelf: 'center',
    // position: 'absolute',
    // right: 10,
    // marginTop: 7,
    // color: '#7AAAc3'
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    // position: 'absolute',
    marginLeft: 10,
    marginTop: 7,
    color: '#7AAAc3'
  },
  online: {
    backgroundColor: 'green',
    borderRadius: 6,
    width: 12,
    height: 12,
    position: 'absolute',
    top: 83,
    left: 8,
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  verySmallLetters: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#b4c3cb'
  },
  backlinks: {
    position: 'absolute', 
    right: 5, 
    top: 5, 
    padding: 5, 
    borderRadius: 5, 
    borderColor: '#7AAAc3', 
    color: '#7AAAc3', 
    borderWidth: 1
  },
  backlinksIcon: {
    position: 'absolute', 
    width: 50,
    height: 50,
    right: 5, 
    top: -50, 
    padding: 5, 
    borderRadius: 25, 
    borderColor: '#7AAAc3', 
    color: '#7AAAc3', 
    borderWidth: 1
  },
  // linearGradient: {
  //   flex: 1,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderRadius: 5
  // },
  // buttonText: {
  //   fontSize: 18,
  //   textAlign: 'center',
  //   margin: 10,
  //   color: '#ffffff',
  // },
});

module.exports = ResourceRow;
