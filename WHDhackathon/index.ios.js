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
      var title = 'Ecwid Store Admin';
      if(route.title) title = route.title;

      // Determine which Icon component - hamburger or back?
      var leftButton = (
        <NavbarButton 
          image={require('./ReactApp/images/icons/hamburger.png')} 
          onPress={()=>self.setState({menuIsOpen:true})} />
      );

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
            leftButton={leftButton} />

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





/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Image,
//   ListView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   AlertIOS,
//     CameraRoll,
//     NativeModules
// } from 'react-native';


// const {AssetsLibrary} = NativeModules;
// import Products from './products';
// import EditProduct from './edit-product';
// import NewProduct from './new-product';

// class WHDhackathon extends Component {
 
//    render() {
//        CameraRoll.getPhotos({first:25}).then(
//            (data) => {
//                AssetsLibrary.convertBase64(data.edges[0].node.image.uri, (data) => {
//                    console.info(data)
//                })
//            }, (e) => {}
//        );
//     return <Products />;
//      // TEMPORARY CODE: for rendering individual product page before nav is ready
//     // return <EditProduct id='66540990' />;
//     //return <NewProduct />;
//    }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

