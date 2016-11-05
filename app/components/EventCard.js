// EventCard.js
import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import transformDate from './../util/transformDate';

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
    borderRadius: 3,
    height: 55,
    width: 55,
    marginRight: 10,
  },
});

export default class EventCard extends Component {

  constructor(props) {
    super(props);

    this.handleEventNavigate = this.handleEventNavigate.bind(this);
  }

  handleEventNavigate(eventId) {
    this.props.navigator.push({
      name: 'EventDetails',
      passedProps: {
        eventId,
      },
    });
  }

  render() {
    let time;
    const stats = `${this.props.event.invitedUsers.length} Users invited  ${this.props.event.savedUsers.length} Users Saved  ${this.props.event.checkedInUsers.length} Users Checked In`;
    if (this.props.event.startTime - Date.now() < 0) {
      time = this.props.event.endTime;
    } else {
      time = this.props.event.startTime;
    }
    time = transformDate(time);
    const background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff';
    return (
      <View>
        <TouchableOpacity
          onPress={this.handleEventNavigate.bind(this, this.props.event._id)}
          key={this.props.event._id}
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            backgroundColor: background,
            padding: 10,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        >
          <Image style={styles.image} source={{ uri: this.props.event.image }} />
          <View style={styles.text}>
            <Text style={styles.title}>{this.props.event.name}</Text>
            <Text style={styles.instructions}>{time.toString()}</Text>
            <Text style={styles.stats}>{stats}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  navigator: PropTypes.object.isRequired,
};
