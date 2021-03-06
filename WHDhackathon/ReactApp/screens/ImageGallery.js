'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var CameraRollPicker = require('react-native-camera-roll-picker');

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      num : 0,
    }

  }
  getSelectedImages(images) {
    //get image
    //pass it back and pop navigation
    // this.props.pictureCallback(images[0]);
    this.props.navigator.pop();
  }


  render() {
  	return (
  		<CameraRollPicker callback={this.getSelectedImages.bind(this)} maximum={1}/>
  	)
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
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  info: {
    flex: 1,
  },
});

exports.title = 'Image Gallery';
exports.description = 'Example of simple Camera Roll Picker';
module.exports = ImageGallery;