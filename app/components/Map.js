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
  eventMarker: {
    height: 20,
    width: 100,
    alignItems: 'center',
  },
});

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      markers: null,
    };

    this.setNewEventPinCoords = this.setNewEventPinCoords.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleNewEventNavigate = this.handleNewEventNavigate.bind(this);
    this.handleEventNavigate = this.handleEventNavigate.bind(this);
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

  handleEventNavigate(eventId) {
    this.props.navigator.push({
      name: 'EventDetails',
      passedProps: {
        eventId,
      },
    });
  }

  handleNewEventNavigate() {
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
                    <MapView.Callout style={styles.eventMarker}>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={this.handleEventNavigate.bind(this, marker._id)}
                      >
                        <Text>{marker.name}</Text>
                      </TouchableHighlight>
                    </MapView.Callout>
                  </MapView.Marker>
                );
              })
            }
          </MapView>
          <NewEventFab onPress={this.handleNewEventNavigate} />
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
