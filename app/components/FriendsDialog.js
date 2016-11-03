import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import { MKCheckbox, MKButton } from 'react-native-material-kit';

// Needs to keep track of which friend ids have been checked
// Then call some function (which is passed down as props) on submit, passing
// the list of those ids up
// That function could either be called once when the dialog is closed, or it
// could be called each time, with the updated list of checked friends so far
// The advantage of the latter is that if the dialog box is closed in a non-clean
// way (ie if we somehow aren't able to tap into the close event), then there is
// nothing to worry about
export default class FriendsDialog extends Component {
  static propTypes = {
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
  }

  // shouldComponentUpdate() {
  //   // Without this lifecycle function, the modal (but not the overlay, strangely)
  //   // disappears every time a friend invite status is changed/passed up
  //   return false;
  // }

  render() {
    return (
      <PopupDialog
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        ref={this.props.itemRef}
        onClosed={this.handleDone}
      >
        <View style={styles.friendsCheckGroup}>
        <Text>Invite your friends!</Text>
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
                ref={'friend' + index}
                friendCheckId={friend._id}
                onCheckedChange={e => this.handleCheckedChange(e, friend._id)}
              />
              <Text>{friend.firstName + ' ' + friend.lastName}</Text>
              <Text>{this.state.friendsToInvite.indexOf(friend._id)}</Text>
            </View>
          ))
        }
        {
          this.props.initialInvitedFriends.map(friend => (
            <Text key={friend}>invited friend id: {friend}</Text>
          ))
        }
        </ScrollView>
        </View>
      </PopupDialog>
    );
  }
}

const styles = StyleSheet.create({
  friendsCheckGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  friendCheck: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});


/*

handlePress() {
  this.dialogbox.alert('sup dawg lmao');
}

<DialogBox ref={ dialogbox => this.dialogbox = dialogbox }/>
*/
