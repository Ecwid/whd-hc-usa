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

class WHDhackathon extends Component {
  _onPressButtonGetProducts() {
      var store_id = 9415600;

      fetch("https://app.ecwid.com/api/v3/" + store_id + "/products?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
          var products = responseData.items

          var names = []

          for(i = 0; i < 10; i++) {
           names.push(products[i].name);
          }

        AlertIOS.alert('Names',
         names.join("\n"));
      })
      .done();

  }


  _onPressButtonGetProductDetails() {
      var store_id = 9415600;

      fetch("https://app.ecwid.com/api/v3/" + store_id + "/products/66458131?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
          AlertIOS.alert(
              "GET Response",
              "Query -> " + responseData.price
          )
      })
      .done();
  }

  render() {
      
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ecwid Store Manager
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

         <TouchableHighlight onPress={this._onPressButtonGetProducts} style={styles.button}>
            <Text>Get store items</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButtonGetProductDetails} style={styles.button}>
            <Text>Get product details</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButtonCreateProduct} style={styles.button}>
            <Text>Update store item</Text>
        </TouchableHighlight>
      </View>
    );
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
