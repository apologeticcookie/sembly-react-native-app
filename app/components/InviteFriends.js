import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { MKCheckbox, MKButton } from 'react-native-material-kit';
import TopBar from './TopBar';

const styles = StyleSheet.create({
  friendsCheckGroup: {
    flex: 1,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  friendCheck: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  createEventButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    width: 150,
    height: 40,
  }
});

export default class InviteFriends extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    friends: PropTypes.array.isRequired,
    initialInvitedFriends: PropTypes.array.isRequired,
    handleFriendsInvite: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      friendsToInvite: props.initialInvitedFriends
    };

    this.handleCheckedChange = this.handleCheckedChange.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleCheckedChange(e, friendId) {
    if (e.checked) {
      this.setState({
        friendsToInvite: this.state.friendsToInvite.concat(friendId)
      });
    } else {
      this.setState({
        friendsToInvite: this.state.friendsToInvite.filter(id =>
          id !== friendId
        )
      });
    }
  }

  handleDone() {
    this.props.handleFriendsInvite(this.state.friendsToInvite);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.friendsCheckGroup}>
        <TopBar
          topBarName="Invite Friends"
          handleLeftPress={this.handleDone}
          iconName="arrow-back"
        />
        <ScrollView>
        {
          this.props.friends.map((friend, index) => (
            <View style={styles.friendCheck} key={friend._id}>
              <MKCheckbox
                checked={
                  this.state.friendsToInvite.indexOf(friend._id) === -1 ?
                  false :
                  true
                }
                onCheckedChange={e => this.handleCheckedChange(e, friend._id)}
              />
              <Text>{friend.firstName + ' ' + friend.lastName}</Text>
            </View>
          ))
        }
        </ScrollView>
        <MKButton
          style={styles.createEventButton}
          shadowRadius={2}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.7}
          shadowColor="black"
          onPress={this.handleDone}
        >
          <Text
            pointerEvents="none"
            style={{color: '#fff', fontWeight: 'bold'}}
          >
            DONE
          </Text>
        </MKButton>
      </View>
    );
  }
}
