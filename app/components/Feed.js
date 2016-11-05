import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import Spinner from './Spinner';
import NewEventFab from './NewEventFab';
import OurDrawer from './OurDrawer';
import EventCard from './EventCard';

import configURL from './../config/config';
import _navigate from './../config/navigateConfig';

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
    alignItems: 'center',
  },
});


export default class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventModal: false,
      addEventDetails: false,
    };

    this.getInvitedEvents = this.getInvitedEvents.bind(this);
    this.getSavedEvents = this.getSavedEvents.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
    this.handleNewEventNavigation = this.handleNewEventNavigation.bind(this);
  }

  componentWillMount() {
    if (this.props.page === 'bundle') {
      this.getAllEvents();
    } else if (this.props.page === 'invited') {
      this.getInvitedEvents();
    } else if (this.props.page === 'saved') {
      this.getSavedEvents();
    }
  }

  getInvitedEvents() {
    fetch(configURL.eventsInvited, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id }),
    })
    .then(response => response.json())
    .then((events) => {
      this.setState({ events, loading: false });
    })
    .catch(error => console.log(error));
  }

  getSavedEvents() {
    fetch(configURL.savedEvents, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id }),
    })
    .then(response => response.json())
    .then((events) => {
      this.setState({
        events,
        loading: false,
      });
    })
    .catch(error => console.log(error));
  }

  getAllEvents() {
    fetch(configURL.eventBundle, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id, location: this.props.mongoLocation }),
    })
    .then(response => response.json())
    .then((events) => {
      this.setState({
        events,
        loading: false,
      });
    })
    .catch(error => console.log(error));
  }

  handleNewEventNavigation() {
    this.props.navigator.push({
      name: 'NewEvent',
      passedProps: {
        navigator: this.props.navigator,
        resetPin: this.setNewEventPinCoords,
        fetchNewEvents: this.fetchEvents,
        userId: this.props.user._id,
        eventCoords: this.state.x,
      },
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <OurDrawer
          user={this.props.user}
          topBarFilterVisible={false}
          topBarName={'Feed'}
          _navigate={_navigate.bind(this)}
        >
          <View style={styles.spinner}>
            <Spinner />
          </View>
        </OurDrawer>
      );
    }

    return (
      <OurDrawer
        user={this.props.user}
        topBarFilterVisible={false}
        topBarName={this.props.name}
        _navigate={_navigate.bind(this)}
      >
        <ScrollView>
          {this.state.events.map((event, index) =>
            <EventCard
              key={index}
              event={event} index={index}
              navigator={this.props.navigator}
            />)}
        </ScrollView>
        <NewEventFab
          onPress={this.handleNewEventNavigation}
        />
      </OurDrawer>
    );
  }
}

Feed.propTypes = {
  page: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  mongoLocation: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
};
