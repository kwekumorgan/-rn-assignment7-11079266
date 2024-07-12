// screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        const parsedCart = cart ? JSON.parse(cart) : [];
        const validCartItems = parsedCart.filter(item => item.id);
        setCartItems(validCartItems);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (item) => {
    try {
      const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
        <Image source={require('../assets/remove.png')} style={styles.removeButtonImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <View  style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <Image source={require('../assets/Search(1).png')} style={styles.headerIcon} />
        </View>
        </View>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.line}></Text>
        <Text style={styles.line}>◊</Text>
        </View>


        
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cartButtonText}> 🛍️CHECKOUT </Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  header: {
    flexDirection: 'row',
   
    paddingTop: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 100,
  },
  checkoutText: {
    fontSize: 24,
    fontWeight:'500',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginLeft:110 ,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto', // Push icons to the right
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
  itemPrice: {
    fontSize: 23,
    marginBottom: 5,
    color:'orange'
    
  },
  itemDescription: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666',
  },
  itemCategory: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666',
  },
  removeButton: {
    marginLeft: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonImage: {
    width: 24,
    height: 24,
  },
  cartButton: {
    marginTop: 5,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position:'relative',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
  },
  line: {
    width: '40%',  
    height: 1,         
    backgroundColor: '#ccc', 
    marginRight:10,
    marginLeft:20
},
});

export default CartScreen;
