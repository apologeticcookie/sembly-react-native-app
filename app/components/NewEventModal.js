import React, { Component, PropTypes } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DatePickerIOS
} from 'react-native';

import Modal from 'react-native-modalbox';
import { MKCheckbox, MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import configURL from './../config/config.js';
import FriendsDialog from './FriendsDialog';

export default class NewEventModal extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    // Marking these as non-required for now; <Feed> doesn't seem to pass these
    // props down to it, and no errors seem to be present without these props
    // In other words, in the place where <NewEventModal> is used without
    // receiving the below props, <NewEventModal> seems to not need them anyway
    eventCoords: PropTypes.object,
    resetPin: PropTypes.func,
    fetchEvents: PropTypes.func,
    modalVisibility: PropTypes.bool
  }

  constructor (props) {
    super(props);
    this.state = {
      friends: [],
      invitedFriends: [],
      newEventName: '',
      newEventStartTime: new Date(),
      newEventTags: '',
      errorText: ''
    };

    this.handleFriendsInvite = this.handleFriendsInvite.bind(this);
  }

  componentWillMount () {
    fetch(configURL.getFriends, {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.userId, search: ''})
    })
    .then(response => {
      return response.json();
    })
    .then(friends => {
      this.setState({
        friends: friends
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleFriendsInvite(invitedFriends) {
    console.log('calling handleFriendsInvite with', invitedFriends);
    this.setState({
      invitedFriends
    });
  }

  handleSubmit () {
    let context = this;

    if(this.state.newEventName === '') {
      this.setState({
        errorText: 'Please enter an event name!'
      });
      return;
    }

    let eventToBePosted = {
      name: this.state.newEventName,
      location: [],
      startTime: this.state.newEventStartTime,
      image: 'http://blogs-images.forbes.com/steveolenski/files/2015/07/Messe_Luzern_Corporate_Event.jpg',
      tags: [],
      invitedUsers: this.state.invitedFriends,
      visibility: ''
    };

    eventToBePosted.location[0] = this.props.eventCoords.longitude;
    eventToBePosted.location[1] = this.props.eventCoords.latitude;

    if(this.refs.visibilityCheckbox.state.checked) {
      eventToBePosted.visibility = 'invite';
    } else {
      eventToBePosted.visibility = 'public';
    }

    eventToBePosted.tags = this.state.newEventTags.split(' ');

    fetch(configURL.getEvents, {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(eventToBePosted)
    })
    .then(response => {
      this.setState({
        errorText: 'Event created succesfully!',
        newEventName: '',
        newEventStartTime: new Date(),
        newEventTags: '',
      });
      setTimeout(() => {
        context.refs.newEventModal.close();
        context.setState({
          errorText: ''
        });
      }, 1000);
      this.props.resetPin();
      this.props.fetchNewEvents();
    })
    .catch( error => {
      console.log(error);
    });
  }

  render () {
    let context = this;
    return (
      <Modal ref={'newEventModal'} style={styles.modal} isOpen={this.props.modalVisibility}>
        <View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.errorText}>{this.state.errorText}</Text>
            <TouchableOpacity onPress={() => context.refs.newEventModal.close()}>
              <Icon style={styles.closeButton} name='close'/>
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Create a New Event!</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter a title for your Event'
              onChangeText={(text) => this.setState({newEventName: text})}
              />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter tags, separated by a space'
              onChangeText={(text) => this.setState({newEventTags: text})}
              />
          </View>

          <View style={styles.dateInputContainer}>
            <DatePickerIOS
              date={this.state.newEventStartTime}
              onDateChange={(d) => {this.setState({newEventStartTime:d})}}
            />
          </View>

          <View style={styles.createEventButtonContainer}>
            <MKButton
              style={styles.createEventButton}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={() => this.popupDialog.openDialog()}
              >
              <Text pointerEvents="none"
                    style={{color: 'white', fontWeight: 'bold',}}>
                Choose Friends
              </Text>
            </MKButton>
          </View>

          <View style={styles.visibilityCheck}>
            <Text>Make your event invite only?</Text>
            <MKCheckbox ref={'visibilityCheckbox'} checked={false}/>
          </View>

          <View style={styles.createEventButtonContainer}>
            <MKButton
              style={styles.createEventButton}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={this.handleSubmit.bind(this)}
              >
              <Text pointerEvents="none"
                    style={{color: 'white', fontWeight: 'bold',}}>
                CREATE EVENT
              </Text>
            </MKButton>
          </View>

        </View>

        <FriendsDialog
          friends={this.state.friends}
          initialInvitedFriends={this.state.invitedFriends}
          handleFriendsInvite={this.handleFriendsInvite}
          itemRef={popupDialog => this.popupDialog = popupDialog}
        />
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modal: {
    marginTop: 40
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 10
  },
  closeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeButton:{
    color: 'grey',
    fontSize: 30
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  textInputContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F44336'
  },
  textInput: {
    flex:1,
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    textAlign: 'left'
  },
  visibilityCheck:{
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-start'
  },
  createEventButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  createEventButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    width: 150,
    height: 40,
  }
})
