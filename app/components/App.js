import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import TopBar from './TopBar';
import LoginPage from './LoginPage';
import Main from './Main';
import Map from './Map';
import Profile from './Profile';
import Feed from './Feed';
import InviteFriends from './InviteFriends';
import NewEvent from './NewEvent';
import ChooseLocation from './ChooseLocation';

const styles = StyleSheet.create({
  container: {}
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.setUser = this.setUser.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(data => {
      this.setState({
        currentLoc: [data.coords.latitude, data.coords.longitude],
        mongoLocation: [data.coords.longitude, data.coords.latitude]
      });
    });
  }

  setUser(user) {
    this.setState({user: user});
  }

  renderScene(route, navigator) {
    if (route.name === 'LoginPage') {
      return (
        <LoginPage
          getLocation={this.getLocation}
          setUser={this.setUser}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Profile') {
      return (
        <Profile
          user={this.state.user}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Map') {
      return (
        <Map
          user={this.state.user}
          mongoLocation={this.state.mongoLocation}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Feed') {
      return (
        <Feed
          name={route.name}
          user={this.state.user}
          mongoLocation={this.state.mongoLocation}
          page={'bundle'}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Invites') {
      return (
        <Feed
          name={'Invited To'}
          user={this.state.user}
          page={'invited'}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Saved') {
      return (
        <Feed
          name={route.name}
          user={this.state.user}
          page={'saved'}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'InviteFriends') {
      return (
        <InviteFriends
          name={route.name}
          user={this.state.user}
          navigator={navigator}
          {...route.passedProps}
        />
      );
    }
    if (route.name === 'NewEvent') {
      return (
        <NewEvent
          name={route.name}
          user={this.state.user}
          navigator={navigator}
          {...route.passedProps}
        />
      );
    }
    if (route.name === 'ChooseLocation') {
      return (
        <ChooseLocation
          name={route.name}
          user={this.state.user}
          navigator={navigator}
          mongoLocation={this.state.mongoLocation}
          {...route.passedProps}
        />
      );
    }
  }

  configureScene(route, routeStack) {
    if (route.name === 'InviteFriends') {
      return Navigator.SceneConfigs.PushFromRight;
    }
    if (route.name === 'NewEvent') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    if (route.name === 'ChooseLocation') {
      return Navigator.SceneConfigs.PushFromRight;
    }
    return Navigator.SceneConfigs.FadeAndroid;
  }

  render () {
    return (
      <Navigator
        configureScene={this.configureScene}
        style={styles.container}
        initialRoute={{ name: 'LoginPage'} }
        renderScene={this.renderScene}
      />
    );
  }
}
