import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TopBar from './TopBar';
import eventBus from './../util/eventBus';

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60,
  },
  locationView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  centerMarker: {
    position: 'absolute',
    // 60 is height of the <TopBar>
    top: 60,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  centerMarkerIcon: {
    fontSize: 26,
    color: '#7924B8',
  },
  friendMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default class ChooseLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadReady: false,
      coords: {
        latitude: this.props.mongoLocation[1] + 0.0005,
        longitude: this.props.mongoLocation[0] + 0.0005,
      },
    };

    this.setPinCoords = this.setPinCoords.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  componentWillMount() {
    // This event is triggered every time Navigator.onDidFocus
    // is called
    this.unsubscribeFocus = eventBus.on('navigatorFocus', this.loadMap);
  }

  componentWillUnmount() {
    // Unsubscribe so that this.loadMap is not called every
    // time in the future when the event we're interested in
    // fires. Without an unsubscribe, we get an error because
    // the function loadMap gets called after this component
    // is erased, and thus the this context will be messed up
    this.unsubscribeFocus();
  }


  setPinCoords(coords) {
    this.setState({
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });
    return;
  }

  loadMap() {
    this.setState({
      loadReady: true,
    });
  }

  handleDone() {
    this.props.handleCoordsSet(this.state.coords);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.locationView}>
        <TopBar
          topBarName="Set Event Location"
          handleLeftPress={this.handleDone}
          iconName="arrow-back"
        />
        {
          this.state.loadReady ?
          (<MapView
            onRegionChangeComplete={this.setPinCoords}
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
              this.props.friends.map((friend) => {
                const tempLoc = {
                  latitude: friend.location[1],
                  longitude: friend.location[0],
                };

                return (
                  <MapView.Marker
                    key={friend._id}
                    coordinate={tempLoc}
                  >
                    <Image
                      source={{
                        uri: friend.photoUrl,
                      }}
                      style={styles.friendMarker}
                    />
                  </MapView.Marker>
                );
              })
            }
          </MapView>
          ) :
          null
        }

        <View
          style={styles.centerMarker}
          pointerEvents="none"
        >
          <Icon
            name="flag"
            pointerEvents="none"
            style={styles.centerMarkerIcon}
          />
        </View>
      </View>
    );
  }
}

ChooseLocation.propTypes = {
  navigator: PropTypes.object.isRequired,
  mongoLocation: PropTypes.array.isRequired,
  friends: PropTypes.array.isRequired,
  handleCoordsSet: PropTypes.func.isRequired,
};
