import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';

import Menu from './Menu.js';
import TopBar from './TopBar.js';


export default class OurDrawer extends Component{
  constructor(props){
    super(props);
  }
	render(){
		return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<Menu user={this.props.user} _navigate={this.props._navigate}/>}
        tapToClose={true}
        open={false}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
        })}>
         <TopBar topBarName={this.props.topBarName} topBarFilterVisible={this.props.topBarFilterVisible} openDrawer={() => {this._drawer.open()} }/>
       	{this.props.children}
      </Drawer>
    );
	}

}

const drawerStyles = {
  drawer: {
  backgroundColor: 'white', 
  shadowColor: '#000000', 
  shadowOpacity: 0.8, 
  shadowRadius: 3,
  }
}