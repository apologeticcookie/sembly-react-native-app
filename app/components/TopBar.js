import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 40,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: '#7924B8',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  content: {
    fontSize: 22,
    color: 'white',
  },
  logo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const TopBar = props => (
  <View style={styles.container}>
    <TouchableOpacity onPress={props.handleLeftPress}>
      <Icon name={props.iconName || 'menu'} style={styles.content} />
    </TouchableOpacity>
    <Text style={styles.logo}>{props.topBarName || 'Sembly'}</Text>
    <TouchableOpacity>
      { props.topBarFilterVisible ? <Icon name="filter-list" style={styles.content} /> : <Text /> }
    </TouchableOpacity>
  </View>
);

TopBar.propTypes = {
  handleLeftPress: PropTypes.func.isRequired,
  topBarFilterVisible: PropTypes.bool,
  topBarName: PropTypes.string,
  iconName: PropTypes.string,
};

export default TopBar;
