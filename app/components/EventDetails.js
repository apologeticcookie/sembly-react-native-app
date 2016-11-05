// EventDetails.js
import React, { Component, PropTypes } from 'react';
import {
  // StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Spinner from './Spinner';
import UserCard from './UserCard';
import TopBar from './TopBar';
import configURL from './../config/config';
import transformDate from './../util/transformDate';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: 'black',
    alignSelf: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 40,
    left: 15,
  },
  absoluteX: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeButton: {
    fontSize: 30,
    zIndex: 3,
    backgroundColor: 'transparent',
  },
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
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
    flexDirection: 'row',
    backgroundColor: '#7924B8',
    borderColor: '#7924B8',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  actionButton: {
    margin: 10,
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#7924B8',
    borderColor: '#7924B8',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  selected: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    borderColor: '#7924B8',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderColor: 'grey',
    color: 'black',
  },
  image: {
    height: 200,
    width: Dimensions.get('window').width,
    marginBottom: 20,
    zIndex: 1,
  },
});

export default class EventDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      button: styles.button,
      selected: styles.selected,
      invitedStyle: styles.selected,
      savedStyle: styles.button,
      checkedStyle: styles.button,
    };

    this.getEvent = this.getEvent.bind(this);
    this.changeUsers = this.changeUsers.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.checkIn = this.checkIn.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getRender = this.getRender.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });
  }

  getRender() {
    if (this.state.loading === true) {
      this.getEvent();
      return (<Spinner />);
    }

    return (
      <View>
        <Image style={styles.image} source={{ uri: this.state.event.image }} />
        <View>
          <Text style={styles.title} >{this.state.event.name}</Text>
        </View>
        <View>
          <Text style={styles.description}>{transformDate(this.state.event.startTime)}</Text>
        </View>
        <View style={styles.flowRight}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => this.saveEvent()}
          >
            <Text style={styles.buttonText}>Save Event!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => this.checkIn()}
          >
            <Text style={styles.buttonText}>Check In!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flowRight}>
          <TouchableOpacity
            style={this.state.invitedStyle}
            onPress={() => this.changeUsers('invited')}
          >
            <Text style={styles.buttonText}>Invited</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.savedStyle}
            onPress={() => this.changeUsers('saved')}
          >
            <Text style={styles.buttonText}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.checkedStyle}
            onPress={() => this.changeUsers('checkedin')}
          >
            <Text style={styles.buttonText}>Checked In</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.getUsers()}
        </ScrollView>
      </View>
    );
  }

  getEvent() {
    fetch(configURL.getEvents + this.props.eventId)
    .then(response => response.json())
    .then((event) => {
      this.setState({ event, loading: false, users: event.invitedUsers });
    })
    .catch(error => console.log(error));
  }

  getUsers() {
    if (this.state.users.length === 0) {
      return (<Text>No Users</Text>);
    }
    return this.state.users.map((user, index) => <UserCard key={index} user={user} index={index} friends={'users'} />);
  }

  checkIn() {
    fetch(configURL.checkinEvent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        eventId: this.state.event._id,
      }),
    })
    .then(() => {
      this.getEvent();
    });
  }

  saveEvent() {
    fetch(configURL.saveEvent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        eventId: this.state.event._id,
      }),
    })
    .then(() => {
      this.getEvent();
    });
  }

  changeUsers(type) {
    if (type === 'invited') {
      this.setState({
        users: this.state.event.invitedUsers,
        savedStyle: this.state.button,
        invitedStyle: this.state.selected,
        checkedStyle: this.state.button,
      });
    } else if (type === 'saved') {
      this.setState({
        users: this.state.event.savedUsers,
        savedStyle: this.state.selected,
        invitedStyle: this.state.button,
        checkedStyle: this.state.button,
      });
    } else {
      this.setState({
        users: this.state.event.checkedInUsers,
        savedStyle: this.state.button,
        invitedStyle: this.state.button,
        checkedStyle: this.state.selected,
      });
    }
  }

  handleDone() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View
        style={styles.modal}
      >
        <TopBar
          topBarName="Event Details"
          handleLeftPress={this.handleDone}
          iconName="arrow-back"
        />
        <View style={styles.container}>
          {this.getRender()}
        </View>
      </View>
    );
  }
}

EventDetails.propTypes = {
  eventId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
