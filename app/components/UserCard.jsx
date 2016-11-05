// UserCard.js
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import configURL from './../config/config';

const styles = StyleSheet.create({
  text: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  stats: {
    fontSize: 12,
    color: 'black',
  },
  instructions: {
    color: 'black',
  },
  image: {
    borderRadius: 25,
    height: 50,
    width: 50,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 90,
    alignSelf: 'stretch',
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
    marginTop: 15,
    color: 'gray',
  },
});

class UserCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
    };
  }

  addFriend() {
    fetch(configURL.getFriendRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.currentUserId, friendId: this.props.user._id }),
    })
    .then(response => response.json())
    .catch(error => console.log(error));
  }

  removeFriend() {
    fetch(configURL.removeFriend, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.currentUserId, friendId: this.props.user._id }),
    })
    .then((response) => {
      this.props.refreshUserFriends();
      return response.json();
    })
    .catch(error => console.log(error));
  }

  acceptRequest() {
    fetch(configURL.acceptRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.currentUserId, friendId: this.props.user._id }),
    })
    .then((response) => {
      this.props.refreshUserFriends();
      this.props.getNewRequests(this);
      return response.json();
    })
    .catch(error => console.log(error));
  }

  rejectRequest() {
    // alert('rejectRequest')
    fetch(configURL.rejectRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.currentUserId, friendId: this.props.user._id }),
    })
    .then((response) => {
      // alert(response.status)
      this.props.refreshUserFriends();
      this.props.getNewRequests(this);
      return response.json();
    })
    .catch(error => console.log(error));
  }

  render() {
    const background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff';
    let message;
    if (this.props.friends === 'friends') {
      message = `Remove ${this.props.user.firstName} from your friends list?`;
    } else if (this.props.friends === 'users') {
      message = `Request ${this.props.user.firstName} to your friends list?`;
    } else {
      message = `Accept ${this.props.user.firstName}'s friend request?`;
    }
    return (
      <View>
        <TouchableOpacity
          key={this.props.user._id}
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            backgroundColor: background,
            padding: 10,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        >
          <Image style={styles.image} source={{ uri: this.props.user.photoUrl }} />
          <View style={styles.text}>
            <Text style={styles.title}>{this.props.user.firstName}</Text>
            <Text style={styles.instructions}>{this.props.user.email}</Text>
            <Text style={styles.states}>{`${this.props.user.friends.length} Friends`}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.removeFriend.bind(this)}>
              {this.props.view === 'Friends' ? <Text /> : <Text />}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addFriend.bind(this)}>
              {this.props.view === 'Users' ? <Icon name="person-add" style={styles.icon} /> : <Text />}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.acceptRequest.bind(this)}>
              {this.props.view === 'Requests' ? <Icon name="person-add" style={styles.icon} /> : <Text />}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.rejectRequest.bind(this)}>
              {this.props.view === 'Requests' ? <Icon name="cancel" style={styles.icon} /> : <Text />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// props which are not used are commented out
UserCard.propTypes = {
  // navigator: PropTypes.shape.isRequired,
  user: PropTypes.shape.isRequired,
  currentUserId: PropTypes.shape.isRequired,
  view: PropTypes.shape.isRequired,
  // mongoLocation: PropTypes.arrayOf.isRequired,
  friends: PropTypes.arrayOf.isRequired,
  // handleCoordsSet: PropTypes.func.isRequired,
  refreshUserFriends: PropTypes.func.isRequired,
  getNewRequests: PropTypes.func.isRequired,
  index: PropTypes.shape.isRequired,
};

export default UserCard;

// { this.props.topBarFilterVisible ? <Icon name='filter-list' style={styles.content}></Icon> : <Text></Text> }
