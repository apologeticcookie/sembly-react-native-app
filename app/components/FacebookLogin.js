// Ref: https://github.com/magus/react-native-facebook-login

import React, { PropTypes, Component } from 'react';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

const loginHandler = {
  
  permissions: ['email', 'user_location', 'user_photos', 'user_friends'],
  // Define Login Behavior here
  // Can choose from Browser, Native, SystemAccount, Web
  loginBehavior: FBLoginManager.LoginBehaviors.Native,

  onLogin: (data) => { console.log('login', JSON.stringify(data)); },

  onLogout: (data) => { console.log('logout', JSON.stringify(data)); },

  onLoginFound: (data) => { console.log('loginFound', JSON.stringify(data)); },

  onLoginNotFound: (data) => { console.log('loginNotFound', JSON.stringify(data)); },

  onError: (data) => { console.log('error', JSON.stringify(data)); },

  onCancel: (data) => { console.log('cancel', JSON.stringify(data)); },

  onPermissionsMissing: (data) => { console.log('permissionsMissing', JSON.stringify(data)); },

};

class FacebookLogin extends Component {
  render() {
    return (
      <FBLogin 

        permissions={loginHandler.permissions}

        loginBehavior={loginHandler.loginBehavior}

        onLogin={loginHandler.onLogin}

        onLogout={loginHandler.onLogout}

        onLoginFound={loginHandler.onLoginFound}

        onLoginNotFound={loginHandler.onLoginNotFound}

        onError={loginHandler.onError}

        onCancel={loginHandler.onCancel}

        onPermissionsMissing={loginHandler.onPermissionsMissing}

      />
    );
  }
}

export default FacebookLogin;

// ref={(fbLogin) => { this.fbLogin = fbLogin }}

//user: `https://graph.facebook.com/v2.8/${userId}?access_token=${accessToken}`
//friends: `https://graph.facebook.com/v2.8/${userId}/friends?access_token=${accessToken}`
//email: `https://graph.facebook.com/v2.8/${userId}/email?access_token=${accessToken}`
