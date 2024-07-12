import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductItem from '../components/ProductItem';

const Sidebar = ({ isOpen, toggleSideBar }) => {
  const sidebarWidth = 250;
  const position = React.useRef(new Animated.Value(-sidebarWidth)).current;

  React.useEffect(() => {
    Animated.timing(position, {
      toValue: isOpen ? 0 : -sidebarWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: position }] }]}>
      <TouchableOpacity onPress={() => toggleSideBar(false)} style={styles.closeButton}>
        <Image source={require('../assets/Close.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Morgan Godwin</Text>
      <View style={styles.underline}></View>
      <Text style={styles.menuItem}>Store</Text>
      <Text style={styles.menuItem}>Locations</Text>
      <Text style={styles.menuItem}>Blog</Text>
      <Text style={styles.menuItem}>Jewelry</Text>
      <Text style={styles.menuItem}>Electronic</Text>
      <Text style={styles.menuItem}>Clothing</Text>
    </Animated.View>
  );
};








const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
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









  const toggleSideBar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <View style={styles.container}>
      <Sidebar isOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => toggleSideBar(true)}
          style={{ zIndex: 100 }}
        >
          <Image source={require('../assets/Menu.png')} />
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} />
        <View style={styles.iconGroup}>
          <Image source={require('../assets/Search(1).png')} />
          <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.title}>Our Story</Text>
        <View style={styles.iconGroup}>
          <Image source={require('../assets/Listview.png')} style={styles.icon} />
          <Image source={require('../assets/Filter.png')} />
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
        numColumns={2}
        columnWrapperStyle={styles.row}
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
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5, // Adjusted to ensure space between columns
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    width: '100%',
    height: 50,
  },
  menuItem: {
    fontSize: 22,
    marginTop: 15,
    paddingLeft: 10
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  }
});

export default HomeScreen;
