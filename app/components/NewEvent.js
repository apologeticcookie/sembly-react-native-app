import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  DatePickerIOS,
} from 'react-native';
import { MKCheckbox, MKButton } from 'react-native-material-kit';

import TopBar from './TopBar';

import configURL from './../config/config';

const styles = StyleSheet.create({
  newEvent: {
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 10,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    color: 'grey',
    fontSize: 30,
  },
  textInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#7924B8',
  },
  textInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    textAlign: 'left',
  },
  visibilityCheck: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  createEventButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createEventButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#7924B8',
    width: 150,
    height: 40,
  },
});

export default class NewEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      invitedFriends: [],
      newEventName: '',
      newEventStartTime: new Date(),
      newEventTags: '',
      errorText: '',
      eventCoords: [],
    };

    this.handleFriendsInvite = this.handleFriendsInvite.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleInviteFriendsNavigate = this.handleInviteFriendsNavigate.bind(this);
    this.handleChooseLocationNavigate = this.handleChooseLocationNavigate.bind(this);
    this.handleCoordsSet = this.handleCoordsSet.bind(this);
  }

  componentWillMount() {
    fetch(configURL.getFriends, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.userId, search: '' }),
    })
    .then(response => response.json())
    .then((friends) => {
      this.setState({
        friends,
      });
    })
    .catch(error => console.log(error));
  }

  handleInviteFriendsNavigate() {
    this.props.navigator.push({
      name: 'InviteFriends',
      passedProps: {
        friends: this.state.friends,
        initialInvitedFriends: this.state.invitedFriends,
        handleFriendsInvite: this.handleFriendsInvite,
      },
    });
  }

  handleCoordsSet(coords) {
    this.setState({
      eventCoords: coords,
    });
  }

  handleChooseLocationNavigate() {
    this.props.navigator.push({
      name: 'ChooseLocation',
      passedProps: {
        handleCoordsSet: this.handleCoordsSet,
        friends: this.state.friends,
      },
    });
  }

  handleFriendsInvite(invitedFriends) {
    this.setState({
      invitedFriends,
    });
  }

  handleSubmit() {
    const context = this;

    if (this.state.newEventName === '') {
      this.setState({
        errorText: 'Please enter an event name!',
      });
      return;
    }

    const eventToBePosted = {
      name: this.state.newEventName,
      location: [],
      startTime: this.state.newEventStartTime,
      image: 'http://blogs-images.forbes.com/steveolenski/files/2015/07/Messe_Luzern_Corporate_Event.jpg',
      tags: [],
      invitedUsers: this.state.invitedFriends,
      visibility: '',
    };

    eventToBePosted.location[0] = this.state.eventCoords.longitude;
    eventToBePosted.location[1] = this.state.eventCoords.latitude;

    if (this.refs.visibilityCheckbox.state.checked) {
      eventToBePosted.visibility = 'invite';
    } else {
      eventToBePosted.visibility = 'public';
    }

    eventToBePosted.tags = this.state.newEventTags.split(' ');

    fetch(configURL.getEvents, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventToBePosted),
    })
    .then(() => {
      this.setState({
        errorText: 'Event created succesfully!',
        newEventName: '',
        newEventStartTime: new Date(),
        newEventTags: '',
      });
      setTimeout(() => {
        this.handleBack();
        context.setState({
          errorText: '',
        });
      }, 1000);
    })
    .catch(error => console.log(error));
  }

  handleBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      // linter requested not to have literal references for ref
      // Ref: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
      <View ref="NewEvent" style={styles.newEvent}>
        <TopBar
          topBarName="Create a New Event"
          handleLeftPress={this.handleBack}
          iconName="arrow-back"
        />
        <View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.errorText}>{this.state.errorText}</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter a title for your Event"
              onChangeText={(text) => { this.setState({ newEventName: text }); }}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter tags, separated by a space"
              onChangeText={(text) => { this.setState({ newEventTags: text }); }}
            />
          </View>

          <View style={styles.dateInputContainer}>
            <DatePickerIOS
              date={this.state.newEventStartTime}
              onDateChange={(d) => { this.setState({ newEventStartTime: d }); }}
            />
          </View>

          <View style={styles.createEventButtonContainer}>
            <MKButton
              style={styles.createEventButton}
              shadowRadius={2}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.7}
              shadowColor="black"
              onPress={this.handleInviteFriendsNavigate}
            >
              <Text
                pointerEvents="none"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                CHOOSE FRIENDS
              </Text>
            </MKButton>
          </View>

          <View style={styles.createEventButtonContainer}>
            <MKButton
              style={styles.createEventButton}
              shadowRadius={2}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.7}
              shadowColor="black"
              onPress={this.handleChooseLocationNavigate}
            >
              <Text
                pointerEvents="none"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                CHOOSE LOCATION
              </Text>
            </MKButton>
          </View>

          <View style={styles.visibilityCheck}>
            <Text>Make your event invite only?</Text>

            <MKCheckbox ref="visibilityCheckbox" checked={false} />
          </View>

          <View style={styles.createEventButtonContainer}>
            <MKButton
              style={styles.createEventButton}
              shadowRadius={2}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.7}
              shadowColor="black"
              onPress={this.handleSubmit.bind(this)}
            >
              <Text
                pointerEvents="none"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                CREATE EVENT
              </Text>
            </MKButton>
          </View>

        </View>
      </View>
    );
  }
}

NewEvent.propTypes = {
  userId: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
};
