// Ref: https://github.com/magus/react-native-facebook-login

import React, { PropTypes, Component } from 'react';

// var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
// var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

FBLoginManager.loginWithPermissions(['email','user_friends'], function(error, data){
  if (!error) {
    console.log('Login data:', data);
  } else {
    console.log('Error:', error);
  }
});

//user: `https://graph.facebook.com/v2.8/${userId}?access_token=${accessToken}`
//friends: `https://graph.facebook.com/v2.8/${userId}/friends?access_token=${accessToken}`

class Login extends Component {

  render() {
    var _this = this;
    return (
      <FBLogin style={{ marginBottom: 10, }}
        ref={(fbLogin) => { this.fbLogin = fbLogin; }}
        permissions={['email', 'user_location', 'user_birthday', 'user_photos', 'user_friends']}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log('Logged in!');
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLogout={function(){
          console.log('Logged out.');
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log('Existing login found.');
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          console.log('No user logged in.');
          _this.setState({ user : null });
        }}
        onError={function(data){
          console.log('ERROR');
          console.log(data);
        }}
        onCancel={function(){
          console.log('User cancelled.');
        }}
        onPermissionsMissing={function(data){
          console.log('Check permissions!');
          console.log(data);
        }}
      />
    );
  }
};

export default FBLogin;