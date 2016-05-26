/**
 * Coming Soon
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';
 
/* ==============================
  Initialise Component
  =============================== */
  // React
  import React, { Component } from 'react';
  import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';

  // App Globals
  import AppStyles from '../styles.ios';
  import AppConfig from '../config.ios';

  // Screens / Pages
  // import AnotherPage from './tabbar.ios';

  // Components
  import Button from '../components/button.ios';

/* ==============================
  View
  =============================== */
  var ProductDetail = React.createClass({

    /**
      * RENDER
      */
    render() {
      // Done
      return (
        <View style={[AppStyles.container]}>
        
          <View style={[styles.productRow]}>

          <Image source={{uri: this.props.image}} style={[styles.productImage]}></Image>
          
          
            <View style={styles.rightContainer}>
              <Text style={[AppStyles.baseText, styles.productTitle]}>{this.props.title.toUpperCase()}</Text>
              <Text numberOfLines={1} style={[AppStyles.baseText, styles.productPrice]}>{this.props.price}</Text>
            </View>
            
          </View>
          
        

          <Text style={[AppStyles.baseText, styles.productPrice]}>{this.props.summary}</Text>

            
          
        </View>
      );
    }

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    productRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
    padding: 4,
    borderBottomWidth: .5,
    borderColor: 'lightgray'
    },
    productImage: {
      height: AppConfig.windowHeight / 7,
      width: AppConfig.windowWidth/4,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 1,
    },
    rightContainer: {
      flex: 1,
      paddingLeft: 8,
      paddingRight: 8
    },
    productTitle: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
    },
    productPrice: {
      fontSize: 12,
      marginBottom: 6,
      textAlign: 'left',
    }
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProductDetail;
  module.exports.details = {
    title: 'ProductDetail'
  };