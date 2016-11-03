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
    handleFriendInvite: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleCheckedChange = this.handleCheckedChange.bind(this);
  }

  handleCheckedChange(e, friendId) {
    if (e.checked) {
      this.props.handleFriendInvite(friendId)
    } else {
      this.props.handleFriendInvite(friendId, true);
    }
  }

  shouldComponentUpdate() {
    // Without this lifecycle function, the modal (but not the overlay, strangely)
    // disappears every time a friend invite status is changed/passed up
    return false;
  }

  render() {
    return (
      <PopupDialog
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        ref={this.props.itemRef}
      >
        <View style={styles.friendsCheckGroup}>
        <Text>Invite your friends!</Text>
        <ScrollView>
        {
          this.props.friends.map((friend, index) => (
            <View style={styles.friendCheck} key={friend._id}>
            <MKCheckbox
            checked={false}
            ref={'friend' + index}
            friendCheckId={friend._id}
            onCheckedChange={e => this.handleCheckedChange(e, friend._id)}
            />
            <Text>{friend.firstName + ' ' + friend.lastName}</Text>
            </View>
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
