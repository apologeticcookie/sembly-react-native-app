import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import FacebookLogin from './FacebookLogin';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#F44336',
    borderColor: '#F44336',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

const Login = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <FacebookLogin setUser={props.setUser} navigator={props.navigator} />
      </View>
    </View>
  );
};

Login.propTypes = {
  navigator: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Login;
