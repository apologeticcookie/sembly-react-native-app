// EventCard.js
import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

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
  }

  transformDate(dateStr) {
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    //  'August', 'September', 'October', 'November', 'December'];
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

  render() {
    let time;
    const stats = `${this.props.event.invitedUsers.length} Users invited  ${this.props.event.savedUsers.length} Users Saved  ${this.props.event.checkedInUsers.length} Users Checked In`;
    if (this.props.event.startTime - Date.now() < 0) {
      time = this.props.event.endTime;
    } else {
      time = this.props.event.startTime;
    }
    time = this.transformDate(time);
    const background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff';
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.openModal(this.props.event._id)}
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
  openModal: PropTypes.func.isRequired,
};
