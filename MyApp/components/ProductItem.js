import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductItem = ({ product, onViewDetails, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
        <Image source={require('../assets/add_circle.png')} style={styles.cartImage} />
      </TouchableOpacity>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={onViewDetails}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 10,
    backgroundColor:'#f5f5f5'
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 10,
    marginRight:50
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    alignItems:'baseline',
    color: '#fff',
    fontWeight: 'bold',
  },
  addToCartButton: {
    position: 'absolute',
    top:190,
    right: 1,
    
  },
  cartImage: {
    width: 32,
    height: 32,
    
  },
});

export default ProductItem;
