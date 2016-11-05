// Ref: https://github.com/magus/react-native-facebook-login

import React, { PropTypes, Component } from 'react';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import facebookAPI from './../util/facebookAPI';

import configURL from './../config/config.js';

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: ['email', 'user_location', 'user_photos', 'user_friends'],
      // Define Login Behavior here
      // Can choose from Browser, Native, SystemAccount, Web
      loginBehavior: FBLoginManager.LoginBehaviors.Native
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onLoginFound = this.onLoginFound.bind(this);
    this.onLoginNotFound = this.onLoginNotFound.bind(this);
    this.onError = this.onError.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onPermissionsMissing = this.onPermissionsMissing.bind(this);

  }

  onLogin(data) {
    let userId = data.credentials.userId;
    let token = data.credentials.token;
    let context = this;

    /* facebookAPI helper functions run to get user data from Facebook Graph API */
    facebookAPI.getUserData(userId, token, function(userData) {

      /* get lat and long coordinates from navigator */
      navigator.geolocation.getCurrentPosition(latlong => {
        userData.location = [latlong.coords.longitude, latlong.coords.latitude];
        userData.password = 'default';

        /* Do what you want to do with userData HERE */
        console.log('User Data ', JSON.stringify(userData));
        fetch(configURL.loginURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        .then(response => {
          // console.log('response.json', response.json());
          return response.json();
        })
        .then(response => {
          console.log('user signup success', response);

          console.log('response', response);
          /* Set user as logged in user HERE */
          context.props.setUser(response);

          /* Switch to Map view */
          context.props.navigator.push({ name: 'Map'});

        })
        .catch(error => {
          console.log('Error in login:', error);
        });

      });
    });
  }

  onLogout(data) {
    console.log('logout', JSON.stringify(data));

    /* Set user as null HERE */
    let context = this;
    context.props.setUser(null);
  }

  onLoginFound(data) {

    console.log('loginFound', JSON.stringify(data));
    console.log('userId is', data.credentials.userId);

    /* Set user as logged in user HERE */
    this.onLogin(data);
  }

  onLoginNotFound(data) {

    console.log('loginNotFound', JSON.stringify(data));

    /* Set user as null HERE */
    let context = this;
    context.props.setUser(null);
  }

  onError(data) {

    console.log('error', JSON.stringify(data));

    /* Set user as null HERE */
    let context = this;
    context.props.setUser(null);
  }

  onCancel(data) {

    console.log('cancel', JSON.stringify(data));

    /* Set user as null HERE */
    let context = this;
    context.props.setUser(null);

  }

  onPermissionsMissing(data) {

    console.log('permissionsMissing', JSON.stringify(data));

    /* Set user as null HERE */
    let context = this;
    context.props.setUser(null);

  }

  render() {
    return (
      <FBLogin

        permissions={this.state.permissions}

        loginBehavior={this.state.loginBehavior}

        onLogin={this.onLogin}

        onLogout={this.onLogout}

        onLoginFound={this.onLoginFound}

        onLoginNotFound={this.onLoginNotFound}

        onError={this.onError}

        onCancel={this.onCancel}

        onPermissionsMissing={this.onPermissionsMissing}

      />
    );
  }
}

export default FacebookLogin;
