/**
 * Form SCREEN
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
    TextInput,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';

  // App Globals
  import AppStyles from '../styles.ios';
  import AppConfig from '../config.ios';
  import AppUtil from '../util.ios';
  import AppDB from '../db.ios';

  // Module Globals
  // import ModuleConfig from '../config.ios';
  // import ModuleStyles from '../styles.ios';

  // 3rd Party Components
  import FormValidation from 'tcomb-form-native';

  // Components
  import Button from '../components/button.ios';

  import ImageGallery from './ImageGallery';

  //Touchable picture
  var PicturePress = React.createClass({
    /**
      * On Icon Press
      */
    _onPress: function() { 
      if(this.props.onPress) this.props.onPress(); 
      // this.props.navigator.push({
      //       title: 'ImageGallery',
      //       component: ImageGallery,
      //       index:100,
      //       navigator: this.refs.rootNavigator,
      //     })
    },

    render: function() {
      return (
        <TouchableOpacity onPress={this._onPress} activeOpacity={0.6}>
          <Image
            source={this.props.source}
            style={this.props.style}
          />
        </TouchableOpacity>
      );
    }
  });

/* ==============================
  Form
  =============================== */
  var Form = React.createClass({
    /**
      * Sets initial state
      */
    getInitialState: function() {
      // Email Validation
      var valid_email = FormValidation.refinement(
        FormValidation.String, function (email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        }
      );
      return {
        show_save_msg: false,
        form_fields: FormValidation.struct({
          Name: FormValidation.String,
          Price: FormValidation.Number,
        }),
        id: this.props.id,
        thumbnailUrl: this.props.thumbnailUrl,
        empty_form_values: {
          Name: '',
          Price: '',
        },
        form_values: {
          Name: this.props.name,
          Price: this.props.price,          
          
        },
        options: {
          fields: {
            Name: { error: 'Please enter product name' },
            Price: { error: 'Please enter product price' }
          }
        },
      };
    },

    /**
      * Executes after all modules have been loaded
      */
    componentDidMount: function() {

    },

    /**
      * Save Form Data to App
      */
    _saveData: function(callback) {
      var values = this.state.form_values;

      // Check if data exists so we know if to add or update
      AppDB.settings.get_all(function(result){
        if(result.totalrows == 0) {
          // Add data to the local DB
          AppDB.settings.add({values}, function(added_data){
            return callback(added_data);
          });
        } else {
          // Update row
          var firstIndex = AppUtil.firstIndexInObj(result.rows);
          AppDB.settings.update_id(firstIndex, {values}, function(updated_data){
            return callback(updated_data);
          });
        }
      });
    },

    /**
      * Delete Data
      */
    _deleteData: function() {
      var self = this;
      var store_id = 9415600;

       var URL = "https://app.ecwid.com/api/v3/" + store_id + "/products/" + self.state.id + "?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf"

      fetch(URL, 
            { method: "DELETE", 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.deleteCount > 0) {
            alert("Product deleted successfully");
          } else {
            alert("Error deleting product");
          }
        })
        .done();
    },

    /**
      * Save
      */
    _save: function() {
      var self = this;

      // Get new values and update
      var value = self.refs.form.getValue();

      if(!value) return;
      var store_id = 9415600;


      if(!self.state.id) {
        var URL = "https://app.ecwid.com/api/v3/" + store_id + "/products" + "?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf";
        var http_method = 'POST'     
      } else {
        var URL = "https://app.ecwid.com/api/v3/" + store_id + "/products/" +  self.state.id + "?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf";
        var http_method = 'PUT'
      }

      fetch(URL, 
            { method: http_method, 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({"name": value.Name, "price": value.Price}), 
            })
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.updateCount > 0 || responseData.id) {
            alert("Product updated successfully");
          } else {
            alert("Error updating product");
          }
        })
        .done();
    },

    /**
      * RENDER
      */
    _pictureUpdate: function(image){
      this.setState({thumbnailUrl: image})
    },

    render: function() {
      var Form = FormValidation.form.Form;
      var sourceImg=require('../images/no-product.png');
      if(this.state.thumbnailUrl) {
        sourceImg = {uri: this.state.thumbnailUrl}
      }


        return (
          <ScrollView automaticallyAdjustContentInsets={false} 
            style={[AppStyles.container]}
            contentContainerStyle={[AppStyles.containerCentered, styles.container]}>
            <View style={[AppStyles.paddingHorizontal]}>

              {this.state.show_save_msg && this.state.form_values.Name != '' ?
                <View>
                  <View style={[AppStyles.msg]}>
                    <Text style={[AppStyles.baseText, AppStyles.msg_text]}>Saved</Text>
                  </View>

                  <View style={AppStyles.spacer_10} />
                </View>
              : null}

        
              
              <View style={AppStyles.spacer_10} />




                
                
              <PicturePress onPress={()=>this.props.navigator.push({
                  title: 'ImageGallery',
                  component: ImageGallery,
                  index:100,
                  pictureCallback: this._pictureUpdate
                })} 
                source={sourceImg}
                style={[styles.productImage]}>
                navigator={this.props.navigator}

              </PicturePress>
              
              
              
              <Form
                ref="form"
                type={this.state.form_fields}
                value={this.state.form_values}
                options={this.state.options} />
            </View>

            <View style={[AppStyles.grid_row]}>

              <View style={[AppStyles.grid_third]}>
                <Button
                  text={"Save"}
                  onPress={this._save} />
              </View>
            </View>

            <View style={AppStyles.hr} />

            <View style={[AppStyles.paddingHorizontal]}>
              <Button
                text={'Delete'}
                style={'outlined'}
                onPress={this._deleteData} />
            </View>
          </ScrollView>
        ); 
        
    },

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      paddingTop: 15,
      paddingBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImage: {
      height: 200,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',

    }
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Form;
  module.exports.details = {
    title: 'Form'
  };