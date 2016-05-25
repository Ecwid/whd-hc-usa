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

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var store_id = 9415600;

    fetch("https://app.ecwid.com/api/v3/" + store_id + "/products?token=m3w1TEgx8Tk42zumzs7GJaAAgag6pKgf", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          loaded: true,        
        });
      })
      .done();
  }

   render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderProduct}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading products...
        </Text>
      </View>
    );
  }

  renderProduct(product) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: product.thumbnailUrl}}
          style={styles.thumbnail}
          resizeMode='contain'
        />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 80,
    height: 80,
  },
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

