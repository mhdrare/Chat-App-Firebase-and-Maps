import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/routes/rootNavigator';

export default class App extends Component {
  render() {
    return (
    	<React.Fragment>
      		<AppNavigator/>
    	</React.Fragment>
    );
  }
}
