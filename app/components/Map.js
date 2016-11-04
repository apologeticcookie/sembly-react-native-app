import React, { Component, PropTypes } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import {
  MKColor,
} from 'react-native-material-kit';

import Spinner from './Spinner.js';
import configURL from './../config/config.js';

import MapView from 'react-native-maps';
import NewEvent from './NewEvent.js';
import EventModal from './EventModal';
import OurDrawer from './OurDrawer.js';
import _navigate from '../config/navigateConfig.js';
import NewEventFab from './NewEventFab.js';

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60,
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  }
});

export default class Map extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    mongoLocation: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      markers: null,
      NewEventVisible: false,
      eventModalVisible: false,
      eventModalId: 0
    };

    this.setNewEventPinCoords = this.setNewEventPinCoords.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.openNewEvent = this.openNewEvent.bind(this);
    this.openEventModal = this.openEventModal.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
  }

  setNewEventPinCoords() {
    this.setState({
      x: {
        latitude: this.props.mongoLocation[1] + 0.0005,
        longitude: this.props.mongoLocation[0] + 0.0005
      }
    });
  }

  fetchEvents () {
    fetch(configURL.eventBundle, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        location: this.props.mongoLocation
      })
    })
    .then(data => {
      return data.json();
    })
    .then(data => {
      this.setState({
        markers: data,
        loading: false
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentWillMount() {
    this.setNewEventPinCoords();
    this.fetchEvents();
  }

  openNewEvent() {
    this.setState({
      NewEventVisible: true
    });
  }

  openEventModal(id) {
    this.setState({
      eventModalVisible: true,
      eventModalId: id
    });
  }

  closeEventModal() {
    this.setState({
      eventModalVisible: false
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

  render () {
    if (this.state.loading) {
      return (
        <OurDrawer user={this.props.user}
          topBarFilterVisible={true}
          topBarName={'Map'}
          _navigate={_navigate.bind(this)}
        >
          <View style={styles.spinner}>
            <Spinner />
          </View>
        </OurDrawer>
      );
    } else {
      return (
        <OurDrawer
          user={this.props.user}
          topBarFilterVisible={true}
          topBarName={'Map'}
          _navigate={_navigate.bind(this)}
        >
          <View>
            <MapView
              showsUserLocation={true}
              style={styles.map}
              initialRegion={{
                latitude: this.props.mongoLocation[1],
                longitude: this.props.mongoLocation[0],
                latitudeDelta: .04,
                longitudeDelta: .02
              }}
            >
            <MapView.Marker
              draggable
              coordinate={this.state.x}
              pinColor='yellow'
              title='The location of your next event!'
              onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            />

            {
              this.state.markers.map(marker => {
                var tempLoc = {
                  latitude: marker.location[1],
                  longitude: marker.location[0]
                };

                return (
                  <MapView.Marker
                    key={marker._id}
                    coordinate={tempLoc}
                    pinColor={MKColor.Indigo}
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
            <NewEvent
              navigator={this.props.navigator}
              resetPin={this.setNewEventPinCoords}
              fetchNewEvents={this.fetchEvents}
              userId={this.props.user._id}
              eventCoords={this.state.x}
              modalVisibility={this.state.NewEventVisible}
            />
            {
              this.getEventModal()
            }
          </View>
        </OurDrawer>
      );
    }
  }
}
