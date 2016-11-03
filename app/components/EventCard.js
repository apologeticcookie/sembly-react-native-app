// EventCard.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  transformDate(dateStr){
    var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var dateUsed = new Date(dateStr);

    var amOrPm = '';
    var day = days[dateUsed.getDay() - 1] + ' ';
    var dateArr = dateUsed.toString().split(' ');
    var part1 = dateArr.slice(1,2).join('. ') + '. ';
    var part2 = dateArr.slice(2, 3).toString() + ' at ';
    var time = dateArr.slice(4, 5).toString();
    var hour = +(time.split(':')[0]);
    if(hour >= 12){
      amOrPm = ' pm';
    } else {
      amOrPm = ' am';
    }
    hour = hour > 12 ? hour - 12 : hour;
    var part4 = (dateArr.slice(4,5)).toString().split(':');
    part4.shift();
    part4.pop();


    return day + part1 + part2 + hour + ':' + part4 + amOrPm;
  }

  render () {
    var time;
    var stats = this.props.event.invitedUsers.length + ' Users invited  ' + this.props.event.savedUsers.length + ' Users Saved  ' + this.props.event.checkedInUsers.length + ' Users Checked In';
    if (this.props.event.startTime - Date.now() < 0) {
      time = this.props.event.endTime;
    } else {
      time = this.props.event.startTime;
    }
    var time = this.transformDate( time );
    var background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff';
    return (
      <View>
        <TouchableOpacity onPress={e => this.props.openModal(this.props.event._id)} key={this.props.event._id} style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          backgroundColor: background,
          padding: 10,
          borderBottomColor: 'grey',
          borderBottomWidth: 1
        }}>
          <Image style={styles.image} source={{uri: this.props.event.image}}/>
          <View style={styles.text}>
            <Text style={styles.title}>{this.props.event.name}</Text>
            <Text style={styles.instructions}>{time.toString()}</Text>
            <Text style={styles.stats}>{stats}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'flex-start'
  },
  title: {
    fontSize:20,
    color: 'black'
  },
  stats: {
    fontSize:12,
    color: 'black'
  },
  instructions: {
    color: 'black'
  },
  image: {
    borderRadius:3,
    height:55, 
    width:55, 
    marginRight:10
  }
});
