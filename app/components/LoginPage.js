import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Spinner from './Spinner.js';

const styles = StyleSheet.create({
container: {
  padding: 30,
  marginTop: 200,
  alignItems: 'center'
},
buttonText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  backgroundColor: '#F44336',
  borderColor: '#F44336',
  borderWidth: 1,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
}
});


export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {loading: false};
  }

  _navigate() {
    this.props.navigator.push({
        name: 'Map'
    });
  }

  componentWillMount () {
    this.props.getLocation();
  }

  login() {
    this.setState({loading: true});
     fetch('http://localhost:3000/api/users/login',{
       method: 'POST',
       headers: { "Content-Type" : "application/json" },
       body: JSON.stringify({email: 'spencer@test.com', password: 'test'})
     })
     .then(response => {
       return response.json();
     })
     .then( user => {
       this.props.setUser(user);
       this._navigate();
     });
   }

  render(){
    if (this.state.loading) {
      return (<View style={styles.container}><Spinner/></View>);
    }
    else {
      return (
        <View>
          <View style={styles.container}>
            <TouchableOpacity onPress={(e)=>{this.login()}} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};
