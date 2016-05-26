/**
 * Product Row
 *
    <productRow 
      title={title}
      image={entry.entry_image}
      onPress={()=>{alert('Go To Entry View')}} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';
 
/* ==============================
  Initialise App
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

/* ==============================
  View
  =============================== */
  var productRow = React.createClass({
    /**
      * When user clicks Row
      */
    _onPress: function() {
      if(this.props.onPress) this.props.onPress(this.props.index);
    },

    /**
      * RENDER
      */
    render: function(){
      var self = this;

      if(self.props.thumbnailUrl) {
        return (
          <TouchableOpacity 
            style={[styles.productRow, self.props.thumbnailUrl ? styles.imageBackground : null]} 
            onPress={self._onPress} activeOpacity={0.7}>
            
            <Image source={{uri: self.props.thumbnailUrl}} style={[styles.productImage]}></Image>
            <View style={styles.rightContainer}>
              <Text style={[AppStyles.baseText, styles.productTitle]}>{self.props.name.toUpperCase()}</Text>
              <Text numberOfLines={1} style={[AppStyles.baseText, styles.productPrice]}>{self.props.price}</Text>
            </View>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={[styles.productRow]} onPress={self.onPress} activeOpacity={0.7}>
            <View style={styles.rightContainer}>
              <Text style={[AppStyles.baseText, styles.productTitle]}>{self.props.name.toUpperCase()}</Text>
              <Text numberOfLines={1} style={[AppStyles.baseText, styles.productPrice]}>{self.props.price}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    },

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
  module.exports = productRow;
  module.exports.details = {
    title: 'productRow'
  };