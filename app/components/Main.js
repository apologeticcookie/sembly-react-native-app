import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import OurDrawer from './OurDrawer.js';

import _navigate from './../config/navigateConfig.js';

const styles = StyleSheet.create({
  listElem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    width: 225,
    padding: 10,
    paddingLeft: 80,
  },
  button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

const Main = (props) => (
  <OurDrawer 
    _navigate={_navigate.bind(this)}
    setUser={props.setUser}
    navigator={props.navigator}
  >
    <View>
      <TouchableOpacity>
        <Text style={styles.button}>Drawer</Text>
      </TouchableOpacity>
    </View>
  </OurDrawer>
);

export default Main;
