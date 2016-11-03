import React from 'react';
const MK = require('react-native-material-kit');

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

const {
  MKButton,
  MKColor,
} = MK;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  fab: {
    width: 65,
    height: 65,
    bottom: 40,
    right: 40,
    position: 'absolute',
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    elevation: 4
  },
});

const ColoredFab = MKButton.coloredFab()
  .withStyle(styles.fab)
  .withText('+')
  .withTextStyle(styles.buttonText)
  .withBackgroundColor(MKColor.Indigo)
  .build();

module.exports = ColoredFab;
