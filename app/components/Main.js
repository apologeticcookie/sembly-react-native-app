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

const Main = () => (
  <OurDrawer _navigate={_navigate.bind(this)}>
    <View>
      <TouchableOpacity>
        <Text style={styles.button}>MAIN TEST</Text>
      </TouchableOpacity>
    </View>
  </OurDrawer>
);

export default Main;
