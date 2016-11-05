// Spinner.js
import {
  StyleSheet,
} from 'react-native';

import {
  MKSpinner,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
  spinner: {
    width: 40,
    height: 40,
  },
});

const Spinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();

export default Spinner;
