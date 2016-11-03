import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.outer}>
        <TouchableOpacity onPress={()=> {this.props._navigate('Profile')}} >
          <View style={styles.imageView}>
              { this.props.user ? <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/> : <Text></Text>}
          </View>
          <Text style={styles.description}>
             {this.props.user ? this.props.user.firstName + ' ' + this.props.user.lastName : <Text></Text>}
          </Text> 
        </TouchableOpacity>
        <View style={styles.menuView}>
          <TouchableOpacity style={styles.flowRight} onPress={()=> {this.props._navigate('Profile')}} >
              <Icon name='account-circle' style={styles.icon}></Icon>
              <View style={styles.listTouchable}>
              	<Text style={styles.listElem}>Profile</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={()=> {this.props._navigate('Map')}} >
            <Icon name='location-on' style={styles.icon}></Icon>
        		<View style={styles.listTouchable}>
            	<Text style={styles.listElem}>Map</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={()=> {this.props._navigate('Feed')}} >
            <Icon name='format-list-bulleted' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
            	<Text style={styles.listElem}>Feed</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={()=> {this.props._navigate('Invites')}} >
            <Icon name='mail' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
            	<Text style={styles.listElem}>Invites</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={()=> {this.props._navigate('Saved')}} >
            <Icon name='archive' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
            	<Text style={styles.listElem}>Saved</Text>
            </View>
          </TouchableOpacity>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
  },
  menuView: {
    borderStyle: 'solid',
    // borderTopWidth: 1,
    borderColor: '#aeb3ba',
    marginLeft: 14
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aeb3ba',
    paddingTop: 10,
    paddingBottom: 10
  },
  imageView: {
    marginTop: 40,
    alignItems: 'center'
  },
  description: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
  icon: {
    fontSize: 26,
    marginRight: 10,
    // marginTop: 15,
    color: 'gray',

  },
  image: {
    borderRadius: 50,
    height: 100, 
    width: 100, 
    marginRight:10,
    marginBottom: 20
  },
	firstListTouchable: {
  // borderStyle: 'solid',
  // borderTopWidth: 2,
  // borderBottomWidth: 2,
  // borderColor: 'black',
  // marginTop: 20,
	},
	listTouchable: {
  // borderStyle: 'solid',
  // borderBottomWidth: 1,
  // borderColor: 'black',
  // marginTop: 10,
	},
  listElem: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    // padding: 10,
    // paddingLeft: 80
  }
});

// <ListView
//   dataSource={this.state.dataSource}
//   renderRow={(item) => this._renderMenuItem(item)}
// />
