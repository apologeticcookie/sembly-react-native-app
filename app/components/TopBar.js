import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TopBar extends Component {
  static propTypes = {
    handleLeftPress: PropTypes.func.isRequired,
    topBarFilterVisible: PropTypes.bool,
    topBarName: PropTypes.string,
    iconName: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.handleLeftPress}>
          <Icon name={this.props.iconName || 'menu'} style={styles.content}></Icon>
        </TouchableOpacity>
        <Text style={styles.logo}>{this.props.topBarName || 'Sembly'}</Text>
        <TouchableOpacity>
          { this.props.topBarFilterVisible ? <Icon name='filter-list' style={styles.content}></Icon> : <Text></Text> }
        </TouchableOpacity>
      </View>
    );
  }
}

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
    alignSelf: 'stretch'
  },
  content: {
    fontSize: 22,
    color: 'white',
  },
  logo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
