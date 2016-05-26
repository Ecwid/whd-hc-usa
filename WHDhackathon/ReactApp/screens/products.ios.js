/**
 * Listing SCREEN
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
    ListView,
    RefreshControl,
  } from 'react-native';

  // App Globals
  import AppStyles from '../styles.ios';
  import AppConfig from '../config.ios';
  import AppUtil from '../util.ios';

  // App Components
  import ProductRow from '../components/product.row.ios';

  // Pages / Screens
  import ProductDetail from './product.detail.ios';

/* ==============================
  Listing
  =============================== */
  var defaultData = [
    {
      title: 'Lorem ipsum adipiscing',
      price: '$5.00',
      summary: 'A vivamus neque consectetur parturient mi nisl proin molestie vestibulum in fames condimentum cum a.',
      image: 'http://lorempixel.com/g/1000/250/nature',
    },
    {
      title: 'Guim petis',
      price: '$6.00',
      summary: 'A vivamus neque consectetur parturient mi nisl proin molestie vestibulum in fames condimentum cum a.',
      image: 'http://lorempixel.com/g/1000/250/animals',
    },
  ];

  var ProductsView = React.createClass({

  	/**
      * Sets initial state (before JSON retrieved)
      */
  	getInitialState: function() {
  		return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        isRefreshing: false,
        store_id: 9415600,
      };
  	},

  	/**
      * Executes after all modules have been loaded
      */
  	componentDidMount: function() {
  	  // Fetch Data
      this._fetchData();
  	},

    /**
      * Executes after all modules have been loaded
      */
    _fetchData: function() {
      var self = this;

      self.setState({ isRefreshing: true });

    fetch("https://app.ecwid.com/api/v3/" + this.state.store_id + "/products?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          isRefreshing: false,
        });
      })
      .done();
      
    },

    /**
      * Each Row Item
      */
    _renderRow: function(data) {
      return (
        <ProductRow name={data.name} price={data.price}
          thumbnailUrl={data.thumbnailUrl} id={data.id}
          onPress={()=>{
            this.props.navigator.push({
              title: 'Product Detail',
              passProps: data,
              component: ProductDetail,
              index: 2,
              navigator: this.props.navigator,
            });
          }} />
      );
    },

    /**
      * Do Render
      */
    render: function() {
      return (
        <View style={[AppStyles.container]}>
          <ListView
            initialListSize={8}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            contentContainerStyle={styles.container} 
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._fetchData}
                tintColor={AppConfig.primaryColor} />
            } />
        </View>
      );
    }
  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      paddingBottom: AppConfig.tabBarHeight,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ProductsView;
  module.exports.details = {
    title: 'ProductsView'
  };