// UserCard.js
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
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
    borderRadius: 25,
    height: 50,
    width: 50,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 90,
    alignSelf: 'stretch',
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
    marginTop: 15,
    color: 'gray',
  },
});

export default class UserCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view || 'Friends',
    };
  }

  render() {
    // const background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff';

    return (
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: this.props.user.photoUrl }} />
        <View style={styles.text}>
          <Text style={styles.title}>{this.props.user.firstName}</Text>
          <Text style={styles.instructions}>{this.props.user.email}</Text>
          <Text style={styles.states}>{`${this.props.user.friends.length} Friends`}</Text>
        </View>
      </View>
    );
  }
}

// props which are not used are commented out
UserCard.propTypes = {
  // navigator: PropTypes.shape.isRequired,
  user: PropTypes.object.isRequired,
  // mongoLocation: PropTypes.array.isRequired,
  friends: PropTypes.string.isRequired,
  // handleCoordsSet: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  view: PropTypes.string,
};
