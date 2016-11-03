import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Spinner from './Spinner.js';

import Drawer from 'react-native-drawer';
import NewEventModal from './NewEventModal.js';
import EventModal from './EventModal.js';
import NewEventFab from './NewEventFab.js';

import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';
import EventCard from './EventCard';

import _navigate from './navigateConfig.js';


export default class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      eventModal: false,
      addEventModal: false
    };
  }
  componentWillMount() {
    if (this.props.page === 'bundle') {
      this.getBundle();
    } else if (this.props.page === 'invited') {
      this.getInvited();
    } else if (this.props.page === 'saved') {
      this.getSaved();
    }
  }
  openEvent(eventId) {
    this.setState({eventModal: true, eventId: eventId, addEventModal: false});
  }
  closeEvent () {
    this.setState({eventModal:false});
  }
  openModal () {
    this.setState({addEventModal: true, eventModal:false});
  }
  getInvited() {
    fetch('http://localhost:3000/api/events/invited',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id})
    })
    .then(response => {
      return response.json();
    })
    .then( events => {
      this.setState({events: events, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  getSaved() {
    fetch('http://localhost:3000/api/events/saved',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id})
    })
    .then(response => {
      return response.json();
    })
    .then( events => {
      this.setState({events: events, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  getBundle() {
    fetch('http://localhost:3000/api/events/bundle',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, location: this.props.mongoLocation})
    })
    .then(response => {
      return response.json();
    })
    .then( events => {
      this.setState({events: events, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  getModal() {
    if (this.state.eventModal) {
      return (<EventModal close={this.closeEvent.bind(this)} user={this.props.user} visibility={this.state.eventModal} event={this.state.eventId}/>);
    } else {
      return (<View></View>);
    }
  }

  render(){
    if (this.state.loading) {
      return (
        <OurDrawer user={this.props.user} topBarFilterVisible={false} topBarName={'Feed'} _navigate={_navigate.bind(this)}>
          <View style={styles.spinner}>
            <Spinner />
          </View>
        </OurDrawer>
        );
    }
    return (
      <OurDrawer user={this.props.user} topBarFilterVisible={false} topBarName={this.props.name} _navigate={_navigate.bind(this)}>
        <ScrollView>
          {this.state.events.map( (event, index) => <EventCard key={index} openModal={this.openEvent.bind(this)} event={event} index={index}/>)}
        </ScrollView>
        <NewEventFab onPress={
          () => {
            this.props.navigator.resetTo({
              name: 'Map'
            });
          }
        }/>
        {this.getModal()}
        <NewEventModal visibility={this.state.addEventModal}/>
      </OurDrawer>
    );
  }
};

const drawerStyles = {
    drawer: {
    backgroundColor: 'red',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
};

const styles = StyleSheet.create({
  listElem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    width: 225,
    padding: 10,
    paddingLeft: 80,
  },
  button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  }
});
