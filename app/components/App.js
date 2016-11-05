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

import eventBus from '../util/eventBus';

const styles = StyleSheet.create({
  container: {}
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null};

    this.getLocation = this.getLocation.bind(this);
    this.setUser = this.setUser.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.onDidFocus = this.onDidFocus.bind(this);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(data => {
      this.setState({
        currentLoc: [data.coords.latitude, data.coords.longitude],
        mongoLocation: [data.coords.longitude, data.coords.latitude]
      });
    });
  }

  onDidFocus() {
    eventBus.trigger('navigatorFocus');
  }

  setUser(user) {
    this.setState({
      user: user
    });
  }

  componentWillMount () {
    this.getLocation();
  }

  renderScene(route, navigator) {
    if (this.state.user === null) {
      return (
        <LoginPage
          getLocation={this.getLocation}
          setUser={this.setUser}
          navigator={navigator}
          user={this.state.user}
        />
      );
    } else if (route.name === 'LoginPage') {
      return (
        <LoginPage
          getLocation={this.getLocation}
          setUser={this.setUser}
          navigator={navigator}
          user={this.state.user}
        />
      );
    } else if (route.name === 'Profile') {
      return (
        <Profile
          user={this.state.user}
          navigator={navigator}
        />
      );
    } else if (route.name === 'Map') {
      return (
        <Map
          user={this.state.user}
          mongoLocation={this.state.mongoLocation}
          navigator={navigator}
        />
      );
    } else if (route.name === 'Feed') {
      return (
        <Feed
          name={route.name}
          user={this.state.user}
          mongoLocation={this.state.mongoLocation}
          page={'bundle'}
          navigator={navigator}
        />
      );
    } else if (route.name === 'Invites') {
      return (
        <Feed
          name={'Invited To'}
          user={this.state.user}
          page={'invited'}
          navigator={navigator}
        />
      );
    } else if (route.name === 'Saved') {
      return (
        <Feed
          name={route.name}
          user={this.state.user}
          page={'saved'}
          navigator={navigator}
        />
      );
    } else if (route.name === 'InviteFriends') {
      return (
        <InviteFriends
          name={route.name}
          user={this.state.user}
          navigator={navigator}
          {...route.passedProps}
        />
      );
    } else if (route.name === 'NewEvent') {
      return (
        <NewEvent
          name={route.name}
          user={this.state.user}
          navigator={navigator}
          {...route.passedProps}
        />
      );
    } else if (route.name === 'ChooseLocation') {
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

  render() {
    return (
      <Navigator
        onDidFocus={this.onDidFocus}
        configureScene={this.configureScene}
        style={styles.container}
        initialRoute={{ name: 'LoginPage'} }
        renderScene={this.renderScene}
      />
    );
  }
}
