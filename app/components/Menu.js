import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  outer: {
  },
  menuView: {
    borderStyle: 'solid',
    borderColor: '#aeb3ba',
    marginLeft: 14,
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
    paddingBottom: 10,
  },
  imageView: {
    marginTop: 40,
    alignItems: 'center',
  },
  description: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
  icon: {
    fontSize: 26,
    marginRight: 10,
    color: '#7924B8',
  },
  image: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginRight: 10,
    marginBottom: 20,
  },
  firstListTouchable: {},
  listTouchable: {},
  listElem: {
    fontSize: 18,
    color: 'black',
    alignItems: 'center',
  },
});

const Menu = props => (
  <View style={styles.outer}>
    <TouchableOpacity onPress={() => { props._navigate('Profile'); }} >
      <View style={styles.imageView}>
        { props.user ?
          <Image style={styles.image} source={{ uri: props.user.photoUrl }} /> :
            <Text />
        }
      </View>
      <Text style={styles.description}>
        {props.user ? props.user.firstName + ' ' : <Text />}
      </Text>
    </TouchableOpacity>
    <View style={styles.menuView}>
      <TouchableOpacity style={styles.flowRight} onPress={() => { props._navigate('Profile'); }} >
        <Icon name="account-circle" style={styles.icon} />
        <View style={styles.listTouchable}>
          <Text style={styles.listElem}>Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flowRight} onPress={() => { props._navigate('Map'); }} >
        <Icon name="location-on" style={styles.icon} />
        <View style={styles.listTouchable}>
          <Text style={styles.listElem}>Map</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flowRight} onPress={() => { props._navigate('Feed'); }} >
        <Icon name="format-list-bulleted" style={styles.icon} />
        <View style={styles.listTouchable}>
          <Text style={styles.listElem}>Feed</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flowRight} onPress={() => { props._navigate('Invites'); }} >
        <Icon name="mail" style={styles.icon} />
        <View style={styles.listTouchable}>
          <Text style={styles.listElem}>Invites</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flowRight} onPress={() => { props._navigate('Saved'); }} >
        <Icon name="archive" style={styles.icon} />
        <View style={styles.listTouchable}>
          <Text style={styles.listElem}>Saved</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

Menu.propTypes = {
  user: PropTypes.object,
  _navigate: PropTypes.func.isRequired,
};

export default Menu;
