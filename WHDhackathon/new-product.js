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

export default class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: 9415600,
      loaded: false
    };
  }

  componentDidMount() {    
    // NOTE: Uncomment to test out submission
    this.submitData();
  }


  submitData() {
    URL = "https://app.ecwid.com/api/v3/" + this.state.store_id + "/products?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf"

    fetch(URL, 
          { method: "POST", 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            // TODO: pass in actual data once the form gathers it
            body: JSON.stringify({"name": "Flower necklace", "price": 58.99}), 
          })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.id) {
          alert("Product created successfully");
          this.setState({
            product_id: responseData.id          
          });     
          this.fetchData();   
        } else {
          alert("Error creating product");
        }
      })
      .done();
  }

  fetchData() {
     fetch("https://app.ecwid.com/api/v3/" + this.state.store_id + "/products/" + this.state.product_id + "?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          product: responseData,
          loaded: true
        });
      })
      .done();
  }

   renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading product...
        </Text>
      </View>
    );
  }

   render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

   return ( 

      <View style={styles.container}>
        <Image
            source={{uri: this.state.product.thumbnailUrl}}
            style={styles.thumbnail}
            resizeMode='contain'
          />
        <Text style={styles.product}>
          {"Name: " + this.state.product.name}
        </Text> 
        <Text style={styles.product}>
          {"Price: $" + this.state.product.price}
        </Text>
      </View>
      );
  }

}

const styles = StyleSheet.create({
  thumbnail: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  product: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

