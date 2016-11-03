import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class FriendsDialog extends Component {
  static propTypes = {
    friends: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        
      </ScrollView>
    );
  }
}
