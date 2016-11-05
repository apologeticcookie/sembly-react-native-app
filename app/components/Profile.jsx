import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

import Spinner from './Spinner';
import OurDrawer from './OurDrawer';
import UserCard from './UserCard';

import configURL from './../config/config';
import _navigate from './../config/navigateConfig';

const styles = StyleSheet.create({
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  container: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  innerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#7924B8',
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  selected: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#7924B8',
  },
  searchInput: {
    height: 36,
    flex: 4,
    fontSize: 18,
    color: 'black',
  },
  image: {
    borderRadius: 100,
    height: 200,
    width: 200,
    marginRight: 10,
    marginBottom: 20,
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center',
  },
});

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchString: '',
      view: 'Friends',
      friendS: styles.selected,
      userS: styles.button,
      requestS: styles.button,
    };
  }

  componentWillMount() {
    this.getFriends();
    this.getNewRequests();
  }

  onSearchGo() {
    if (this.state.view === 'Friends') {
      this.getFriends(this.state.searchString);
    }
    // if (this.state.view === 'Requests') {
    // }
    if (this.state.view === 'Users') {
      this.searchUsers(this.state.searchString);
    }
  }

  onSearchTextChange(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  // need a better way to get the rest of refreshed version of friend requests
  // every time we go back in we use the old version of the user when we logged in, not
  // the new version in the database
  // set new user each time a change is done?
  getNewRequests() { // omit context argument
    fetch(configURL.getRequests, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id }),
    })
    .then(response => response.json())
    .then((requests) => {
      this.setState({
        requests: requests,
      });
    })
    .catch(error => console.log(error));
  }

  getFriends(search) {
    const searchTerm = search || '';
    fetch(configURL.getFriends, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id, search: searchTerm }),
    })
    .then(response => response.json())
    .then((friends) => {
      if (search.length > 0) {
        this.setState({
          feed: friends,
          loading: false,
        });
      }
      if (search.length === 0) {
        this.setState({
          feed: friends,
          friends: friends,
          loading: false,
        });
      }

      // alert(this.props.user.friends.length)
    })
    .catch(error => console.log(error));
  }

  searchUsers(search) {
    const searchTerm = search || '';
    fetch(configURL.getUsers + searchTerm, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({userId: this.props.user._id, search: search}),
    })
    .then(response => response.json())
    .then((users) => {
      this.setState({
        feed: users,
        loading: false,
      });
    })
    .catch(error => console.log(error));
  }

  filterFriends() {
    this.setState({ view: 'Friends' });
    this.setState({
      feed: this.state.friends,
      friendS: styles.selected,
      requestS: styles.button,
      userS: styles.button,
    });
  }

  filterUsers() {
    this.setState({ view: 'Users' });
    this.setState({
      feed: [],
      friendS: styles.button,
      requestS: styles.button,
      userS: styles.selected,
    });
  }

  filterRequests() {
    this.setState({ view: 'Requests' });
    this.setState({
      feed: this.state.requests,
      friendS: styles.button,
      requestS: styles.selected,
      userS: styles.button,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <OurDrawer
          topBarFilterVisible={false}
          topBarName={'Feed'}
          _navigate={_navigate.bind(this)}
        >
          <View style={styles.spinner}>
            <Spinner />
          </View>
        </OurDrawer>
      );
    }

    return (
      <OurDrawer
        user={this.props.user}
        topBarName={'Profile'}
        _navigate={_navigate.bind(this)}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: this.props.user.photoUrl }} />
          <Text style={styles.description}>
            {this.props.user.firstName}
          </Text>
          <Text style={styles.description}>
            {this.props.user.email}
          </Text>
          <View style={styles.innerNav}>
            <TouchableOpacity onPress={this.filterFriends.bind(this)} style={this.state.friendS}>
              <Text style={styles.buttonText}>Search Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.filterUsers.bind(this)} style={this.state.userS}>
              <Text style={styles.buttonText}>Search Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.filterRequests.bind(this)} style={this.state.requestS}>
              <Text style={styles.buttonText}>Friend Requests</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search via name or email"
              onChange={this.onSearchTextChange.bind(this)}
            />
            <TouchableOpacity onPress={() => this.onSearchGo()} style={styles.button}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {this.state.feed.map(
            (friend, index) => (
              <UserCard
                key={index}
                refreshUserFriends={
                  () => {
                    this.setState({ view: 'Friends' });
                    this.getFriends();
                  }
                }
                getNewRequests={
                  (context) => { this.getNewRequests(context); }
                }
                currentUserId={this.props.user._id}
                view={this.state.view}
                user={friend}
                index={index}
              />
            )
          )}
        </ScrollView>
      </OurDrawer>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape.isRequired,
};

export default Profile;
