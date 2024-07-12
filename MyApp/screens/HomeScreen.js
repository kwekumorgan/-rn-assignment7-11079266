import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductItem from '../components/ProductItem';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products?limit=5");
        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cartItems = storedCart ? JSON.parse(storedCart) : [];
      cartItems.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Menu.png')} style={styles.icon} />
        <Image source={require('../assets/Logo.png')} />
        <View style={styles.iconGroup}>
          <Image source={require('../assets/Search(1).png')} />
          <Image style={styles.icon} source={require('../assets/shoppingBag.png')} />
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.title}>Our Story</Text>
        <View style={styles.iconGroup}>
          <Image source={require('../assets/Listview.png')} style={styles.icon} />
          <Image source={require('../assets/Filter.png')} style={styles.icon} />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onViewDetails={() => navigation.navigate('Product Details', { productId: item.id })}
            onAddToCart={() => addToCart(item)}
          />
        )}
        ListEmptyComponent={<Text>No products available</Text>}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconGroup: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
   
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
