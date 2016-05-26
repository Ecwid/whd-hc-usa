/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';
import Products from './products';
import EditProduct from './edit-product';
import NewProduct from './new-product';

class WHDhackathon extends Component {
 
   render() {
    return <Products />;
     // TEMPORARY CODE: for rendering individual product page before nav is ready
    // return <EditProduct id='66540990' />;
    //return <NewProduct />;
   }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('WHDhackathon', () => WHDhackathon);
