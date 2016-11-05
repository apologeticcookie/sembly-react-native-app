import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import Spinner from './Spinner.js';
import NewEvent from './NewEvent.js';
import EventModal from './EventModal.js';
import NewEventFab from './NewEventFab.js';
import OurDrawer from './OurDrawer.js';
import EventCard from './EventCard.js';

import configURL from './../config/config.js';
import _navigate from './../config/navigateConfig.js';

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
      addEventModal: false,
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
    this.setState({ eventModal: true, eventId: eventId, addEventModal: false });
  }

  closeEvent() {
    this.setState({ eventModal: false });
  }

  openModal() {
    this.setState({ addEventModal: true, eventModal: false });
  }

  getInvited() {
    fetch(configURL.eventsInvited, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id }),
    })
    .then(response => response.json())
    .then((events) => {
      this.setState({ events: events, loading: false });
    })
    .catch(error => console.log(error));
  }

  getSaved() {
    fetch(configURL.savedEvents, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id }),
    })
    .then(response => response.json())
    .then((events) => {
      this.setState({events: events, loading: false});
    })
    .catch(error => console.log(error));
  }
  getBundle() {
    fetch(configURL.eventBundle, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.props.user._id, location: this.props.mongoLocation }),
    })
    .then(response => response.json())
    .then((events) => {
      this.setState({ events: events, loading: false });
    })
    .catch(error => console.log(error));
  }
  getModal() {
    if (this.state.eventModal) {
      return (<EventModal
        close={this.closeEvent.bind(this)}
        user={this.props.user}
        visibility={this.state.eventModal}
        event={this.state.eventId}
      />);
    } else {
      return (<View></View>);
    }
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
              openModal={this.openEvent.bind(this)}
              event={event} index={index}
            />)}
        </ScrollView>
        <NewEventFab
          onPress={
            () => {
              this.props.navigator.resetTo({
                name: 'Map',
              });
            }
          }
        />
        {this.getModal()}
        <NewEvent
          visibility={this.state.addEventModal}
          userId={this.props.user._id}
          navigator={this.props.navigator}
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
