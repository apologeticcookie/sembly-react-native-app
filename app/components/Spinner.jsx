// Spinner.js
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  MKProgress,
  MKSpinner,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
spinner: {
    width: 40,
    height: 40
  }
});

const Spinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();

export default Spinner;