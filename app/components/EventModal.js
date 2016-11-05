// EventModal.js
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
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Spinner from './Spinner.js';
import UserCard from './UserCard.js';
import configURL from './../config/config.js';

const styles = StyleSheet.create({
  modal: {
    marginTop: 40,
    flex: 1,
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

export default class EventModal extends Component {

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
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });
  }

  transformDate(dateStr) {
    // const months = ['January', 'February', 'March', 'April', 'May', 'June',
    //   'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dateUsed = new Date(dateStr);

    let amOrPm = '';
    const day = `${days[dateUsed.getDay() - 1]} `;
    const dateArr = dateUsed.toString().split(' ');
    const part1 = `${dateArr.slice(1, 2).join('. ')}. `;
    const part2 = `${dateArr.slice(2, 3).toString()} at `;
    const time = dateArr.slice(4, 5).toString();
    let hour = +(time.split(':')[0]);

    if (hour >= 12) {
      amOrPm = ' pm';
    } else {
      amOrPm = ' am';
    }

    hour = hour > 12 ? hour - 12 : hour;
    const part4 = (dateArr.slice(4, 5)).toString().split(':');
    part4.shift();
    part4.pop();

    return `${day}${part1}${part2}${hour}:${part4}${amOrPm}`;
  }

  getEvent() {
    fetch(configURL.getEvents + this.props.event)
    .then(response => response.json())
    .then((event) => {
      this.setState({ event: event, loading: false, users: event.invitedUsers });
    })
    .catch(error => console.log(error));
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
  getUsers() {
    if (this.state.users.length === 0) {
      return (<Text>No Users</Text>);
    } else {
      return this.state.users.map((user, index) => <UserCard key={index} user={user} index={index} friends={'users'} />);
    }
  }
  getRender() {
    if (this.state.loading === true) {
      this.getEvent();
      return (<Spinner/>);
    } else {
      return (
        <View>
          <Image style={styles.image} source={{ uri: this.state.event.image }} />
          <View>
            <Text style={styles.title} >{this.state.event.name}</Text>
          </View>
          <View>
            <Text style={styles.description}>{this.transformDate(this.state.event.startTime)}</Text>
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
  }

  render() {
    const context = this;
    return (
      <Modal
        // linter requested not to have literal references for ref
        // Ref: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        ref={(c) => { this.EventModal = c; }}
        onClosed={() => this.props.close()}
        style={styles.modal}
        isOpen={true}
      >
        <View style={styles.container}>
          {this.getRender()}
          <View style={styles.absoluteX}>
            <TouchableOpacity
              onPress={() => {
                this.props.close();
                context.refs.EventModal.close();
              }}
            >
              <Icon style={styles.closeButton} name="close" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
// linting keeps breaking
EventModal.propTypes = {
  event: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};
