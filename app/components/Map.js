import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import MapView from 'react-native-maps';

import Spinner from './Spinner';
import EventModal from './EventModal';
import OurDrawer from './OurDrawer';
import NewEventFab from './NewEventFab';

import configURL from './../config/config';
import _navigate from './../config/navigateConfig';

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60,
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center',
  },
});

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      markers: null,
      eventModalVisible: false,
      eventModalId: 0,
    };

    this.setNewEventPinCoords = this.setNewEventPinCoords.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.openNewEvent = this.openNewEvent.bind(this);
    this.openEventModal = this.openEventModal.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
  }

  componentWillMount() {
    this.setNewEventPinCoords();
    this.fetchEvents();
  }

  setNewEventPinCoords() {
    this.setState({
      x: {
        latitude: this.props.mongoLocation[1] + 0.0005,
        longitude: this.props.mongoLocation[0] + 0.0005,
      },
    });
  }

  getEventModal() {
    if (this.state.eventModalVisible) {
      return (
        <EventModal
          key={this.state.eventModalId}
          close={this.closeEventModal}
          user={this.props.user}
          visibility={this.state.eventModalVisible}
          event={this.state.eventModalId}
        />
      );
    }
    return null;
  }

  closeEventModal() {
    this.setState({
      eventModalVisible: false,
    });
  }

  openEventModal(id) {
    this.setState({
      eventModalVisible: true,
      eventModalId: id,
    });
  }

  openNewEvent() {
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

  fetchEvents() {
    fetch(configURL.eventBundle, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        location: this.props.mongoLocation,
      }),
    })
    .then(data => data.json())
    .then((data) => {
      this.setState({
        markers: data,
        loading: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <OurDrawer
          user={this.props.user}
          topBarFilterVisible
          topBarName={'Map'}
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
        topBarFilterVisible
        topBarName={'Map'}
        _navigate={_navigate.bind(this)}
      >
        <View>
          <MapView
            showsUserLocation
            style={styles.map}
            initialRegion={{
              latitude: this.props.mongoLocation[1],
              longitude: this.props.mongoLocation[0],
              latitudeDelta: 0.04,
              longitudeDelta: 0.02,
            }}
          >
            <MapView.Marker
              draggable
              coordinate={this.state.x}
              pinColor="yellow"
              title="The location of your next event!"
              onDragEnd={e => this.setState({ x: e.nativeEvent.coordinate })}
            />
            {
              this.state.markers.map((marker) => {
                const tempLoc = {
                  latitude: marker.location[1],
                  longitude: marker.location[0],
                };

                return (
                  <MapView.Marker
                    key={marker._id}
                    coordinate={tempLoc}
                    pinColor={'#5976e3'}
                  >
                    <MapView.Callout width={40} height={40} >
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={this.openEventModal.bind(this, marker._id)}
                      >
                        <Text>{marker.name}</Text>
                      </TouchableHighlight>
                    </MapView.Callout>
                  </MapView.Marker>
                );
              })
            }
          </MapView>
          <NewEventFab onPress={this.openNewEvent} />
          {
            this.getEventModal()
          }
        </View>
      </OurDrawer>
    );
  }
}

Map.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  mongoLocation: PropTypes.array.isRequired,
};
