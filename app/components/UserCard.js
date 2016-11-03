// UserCard.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.view
    };
  }

  addFriend() {
    fetch('http://localhost:3000/api/friends/friendRequest',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.currentUserId, friendId: this.props.user._id})
    })
    .then(response => {
      // alert(response.status)
      return response.json();
    })
    .catch( error => {
      console.log(error);
    });
  }

  removeFriend() {
    // alert('removeFriend')
    // alert(this.props.user.firstName + this.props.user._id)
    // alert(this.props.currentUserId)
    fetch('http://localhost:3000/api/friends/removeFriend',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.currentUserId, friendId: this.props.user._id})
    })
    .then(response => {
      // alert(response.status)
      this.props.refreshUserFriends();
      return response.json();
    })
    .catch( error => {
      console.log(error);
    });
  }
 
  acceptRequest() {
  	// alert('acceptRequest')
    fetch('http://localhost:3000/api/friends/acceptRequest',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.currentUserId, friendId: this.props.user._id})
    })
    .then(response => {
      // alert(response.status)
      this.props.refreshUserFriends();
      this.props.getNewRequests(this);
      return response.json();
    })
    .catch( error => {
      console.log(error);
    });
  } 

  rejectRequest(){
    // alert('rejectRequest')
    fetch('http://localhost:3000/api/friends/rejectRequest',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.currentUserId, friendId: this.props.user._id})
    })
    .then(response => {
      // alert(response.status)
      this.props.refreshUserFriends();
      this.props.getNewRequests(this);
      return response.json();
    })
    .catch( error => {
      console.log(error);
    });
  }

  render () {
    var background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff';
    var message;
    if (this.props.friends === 'friends') {
    	message = 'Remove '+ this.props.user.firstName +' from your friends list?';
    } else if (this.props.friends === 'users') {
    	message = 'Request ' + this.props.user.firstName +' to your friends list?';
    } else {
    	message = 'Accept ' + this.props.user.firstName +'\'s friend request?';
    }
    return (
      	  // <Modal>
      	  // 	<View>
	      	 //  	<Text> {message} </Text>
	      	 //  	<TouchableOpacity></TouchableOpacity>
	      	 //  	<TouchableOpacity></TouchableOpacity>
      	  // 	</View>
      	  // </Modal>
      <View>
	      <TouchableOpacity key={this.props.user._id} style={{
	        justifyContent: 'flex-start',
	        flexDirection: 'row',
	        backgroundColor: background,
	        padding: 10,
	        borderBottomColor: 'grey',
	        borderBottomWidth: 1
	      }}>
	        <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/>
	        <View style={styles.text}>
	          <Text style={styles.title}>{this.props.user.firstName+' '+this.props.user.lastName}</Text>
	          <Text style={styles.instructions}>{this.props.user.email}</Text>
	          <Text style={styles.states}>{this.props.user.friends.length + ' Friends'}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.removeFriend.bind(this)}>
              {this.props.view === 'Friends' ? <Text></Text> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addFriend.bind(this)}>
              {this.props.view === 'Users' ? <Icon name='person-add' style={styles.icon}></Icon> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.acceptRequest.bind(this)}>
              {this.props.view === 'Requests' ? <Icon name='person-add' style={styles.icon}></Icon> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.rejectRequest.bind(this)}>
              {this.props.view === 'Requests' ? <Icon name='cancel' style={styles.icon}></Icon> : <Text></Text>}
            </TouchableOpacity>
          </View>
	      </TouchableOpacity>
      </View>
    );
  }
};

//{ this.props.topBarFilterVisible ? <Icon name='filter-list' style={styles.content}></Icon> : <Text></Text> }

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
  	borderRadius: 25,
  	height: 50, 
  	width: 50, 
  	marginRight:10
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 90,
    alignSelf: 'stretch'
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
    marginTop: 15,
    color: 'gray'
  }
});
