// Ref: https://github.com/magus/react-native-facebook-login

import React, { PropTypes, Component } from 'react';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import facebookAPI from './../util/facebookAPI';

const loginHandler = {
  
  permissions: ['email', 'user_location', 'user_photos', 'user_friends'],
  // Define Login Behavior here
  // Can choose from Browser, Native, SystemAccount, Web
  loginBehavior: FBLoginManager.LoginBehaviors.Native,

  onLogin: (data) => { 
    let userId = data.credentials.userId;
    let token = data.credentials.token;

    facebookAPI.getUserData(userId, token, function(userData) {

      /* get lat and long coordinates from navigator */

      navigator.geolocation.getCurrentPosition(latlong => {
        userData.location = [latlong.coords.longitude, latlong.coords.latitude];
        userData.password = 'test';

        /* Do what you want to do with userData HERE */
        console.log('User Data ',JSON.stringify(userData));
        fetch('http://tranquil-garden-43561.herokuapp.com/api/users/signup', {
          method: 'POST',
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify(userData)
        })
        .then(response => {
          console.log('user signup success', response);
        })
        .catch(error => {
           console.log(error);
        });

      });
    });
  },

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