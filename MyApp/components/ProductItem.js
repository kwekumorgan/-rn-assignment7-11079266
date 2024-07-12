import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductItem = ({ product, onViewDetails, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <TouchableOpacity  onPress={onAddToCart}>
        <Image source={require('../assets/add_circle.png')} style={styles.cartImage} />
      </TouchableOpacity>
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={onViewDetails}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',

  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginLeft:45
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartImage: {
    width: 24,
    height: 24,
  },
});

export default ProductItem;
