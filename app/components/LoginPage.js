import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import FacebookLogin from './FacebookLogin.js';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#7924B8',
    borderColor: '#7924B8',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

const Login = props => (
  <View>
    <View style={styles.container}>
      <FacebookLogin setUser={props.setUser} navigator={props.navigator} />
    </View>
  </View>
);

Login.propTypes = {
  navigator: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
