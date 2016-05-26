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

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.id,
      store_id: 9415600,
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
    
    // NOTE: Uncomment to test out submission or deletion
    //this.submitData();
    //this.deleteProduct();

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

  submitData() {
    URL = "https://app.ecwid.com/api/v3/" + this.state.store_id + "/products/" + this.state.product_id + "?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf"

    fetch(URL, 
          { method: "PUT", 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            // TODO: pass in actual data once the form gathers it
            body: JSON.stringify({"name": "new name", "price": 4}), 
          })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.updateCount > 0) {
          alert("Product updated successfully");
        } else {
          alert("Error updating product");
        }
      })
      .done();
  }

  deleteProduct() {
    URL = "https://app.ecwid.com/api/v3/" + this.state.store_id + "/products/" + this.state.product_id + "?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf"

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

