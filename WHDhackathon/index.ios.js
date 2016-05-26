/**
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
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';

  // 3rd Party Components
  import NavigationBar from 'react-native-navbar';
  import SideMenu from 'react-native-side-menu';

  // App Globals
  import AppStyles from './ReactApp/styles.ios';
  import AppConfig from './ReactApp/config.ios';

  // Components
  import Menu from './ReactApp/components/menu.ios';

  // Screens / Pages
  import Products from './ReactApp/screens/products.ios';

  import ProductDetail from './ReactApp/screens/product.detail.ios';
  import ImageGallery from './ReactApp/screens/ImageGallery';

/* ==============================
  Main Navigator with Sidemenu
  =============================== */

  /**
   * Custom Navbar Title component
   */
  var NavbarTitle = React.createClass({
    render: function() {
      return (
        <Text style={[AppStyles.baseText, AppStyles.strong, AppStyles.navbarTitle]}>{this.props.title}</Text>
      );
    }
  });


//Example how upload image to
// CameraRoll.getPhotos({first:25}).then(
//    (data) => {
//        AssetsLibrary.sendDataByUri('https://app.ecwid.com/api/v3/9415600/products/66555075/image?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf',
//            data.edges[0].node.image.uri, (res, err) => {
//                console.info(res, err)
//            })
//    }, (e) => {}
//);

  /**
    * Custom Navbar Button component
    */
  var NavbarButton = React.createClass({
    /**
      * On Icon Press
      */
    _onPress: function() { if(this.props.onPress) this.props.onPress(); },

    render: function() {
      return (
        <TouchableOpacity onPress={this._onPress} activeOpacity={0.6}>
          <Image
            source={this.props.image}
            style={AppStyles.navbarButton} />
        </TouchableOpacity>
      );
    }
  });

  var NavbarButtonRight = React.createClass({
    /**
      * On Icon Press
      */
    _onPress: function() { if(this.props.onPress) this.props.onPress(); },

    render: function() {
      return (
        <TouchableOpacity onPress={this._onPress} activeOpacity={0.6}>
          <Image
            source={this.props.image}
            style={AppStyles.navbarButtonRight} />
        </TouchableOpacity>
      );
    }
  });



  /**
   *  Main View w/ Sidebar
   */
  var Application = React.createClass({
    
    /**
      * Initial State
      */
    getInitialState: function() {
      return {
        menuIsOpen: false,
      };
    },

    /**
      * On Load
      */
    /*componentWillMount: function() {
    },*/

    /**
      * Navigates to page from menu
      */
    _navigate: function(title, link) {
      // Toggle Menu
      this.setState({
        menuIsOpen: !this.state.menuIsOpen,
      });

      // Navigate to Screen
      this.refs.rootNavigator.replace({
        title: title,
        component: link,
        navigator: this.refs.rootNavigator,
      });
    },

    /**
      * Generate Custom Navbar
      */
    _renderScene: function(route, navigator) {
      var self = this;

      var Component = route.component;
      
      // Default Navbar Title
      var title = 'Products';
      if(route.title) title = route.title;

      // Determine which Icon component - hamburger or back?
      var leftButton = (
        <NavbarButton 
          image={require('./ReactApp/images/icons/hamburger.png')} 
          onPress={()=>self.setState({menuIsOpen:true})} />
      );

      if (route.title === "Products" || route.index === 0){
        var rightButton = (
          <NavbarButtonRight
          image={require('./ReactApp/images/icons/plus_button.png')} 
          onPress={()=>this.refs.rootNavigator.push({
            title: 'New Product',
            component: ProductDetail,
            index:10,
            navigator: this.refs.rootNavigator,
          })} />
        );
      }

      if (route.title === "New Product" || route.index === 10){
        var rightButton = (
          <NavbarButtonRight
          image={require('./ReactApp/images/icons/plus_button.png')} 
          onPress={()=>this.refs.rootNavigator.push({
            title: 'ImageGallery',
            component: ImageGallery,
            index:100,
            navigator: this.refs.rootNavigator,
          })} />
        );
      }       
      

      if (route.index > 0) {
        leftButton = (
          <NavbarButton 
            image={require('./ReactApp/images/icons/back_button.png')} 
            onPress={self.refs.rootNavigator.pop} />
        );

      }



      // Done
      return (
        <View style={[AppStyles.appContainer, AppStyles.container]}>
          <NavigationBar
            title={<NavbarTitle title={title} />}
            statusBar={{style: 'light-content', hidden: false}}
            style={AppStyles.navbar}
            tintColor={AppConfig.primaryColor}
            leftButton={leftButton} 
            rightButton={rightButton} />

          <Component navigator={navigator} route={route} {...route.passProps} />
        </View>
      );
    },

    /**
      * RENDER
      */
    render: function() {
      return (
        <SideMenu
          menu={<Menu navigate={this._navigate} />}
          isOpen={this.state.menuIsOpen}>

          <Navigator
            ref="rootNavigator"
            style={[AppStyles.container, AppStyles.appContainer]}
            renderScene={this._renderScene}
            configureScene={function(route, routeStack) {
              if(route.transition == 'FloatFromBottom') 
                return Navigator.SceneConfigs.FloatFromBottom;
              else
                // return Navigator.SceneConfigs.PushFromRight;
                return Navigator.SceneConfigs.FloatFromRight;
            }}
            initialRoute={{
              component: Products,
              index: 0,
              navigator: this.refs.rootNavigator,
              passProps: {
                showSplashScreen: true,
              }
            }} />

        </SideMenu>
      );
    }
  });

/* ==============================
  Styles
  =============================== */
  /*var styles = StyleSheet.create({
  });*/

/* ==============================
  Done!
  =============================== */
  AppRegistry.registerComponent('WHDhackathon', () => Application);

