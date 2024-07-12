import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cartItems = storedCart ? JSON.parse(storedCart) : [];
      cartItems.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
  
    <ScrollView>

    <View style={styles.container}>
    
      <View>
      <View style={styles.iconGroup}>

          <Image style={{marginLeft:10}}source={require('../assets/Menu.png')} />
       
        <Image style={{marginLeft:80}}source={require('../assets/Logo.png')} />
       
        
          <Image style={{marginLeft:90}}source={require('../assets/Search(1).png')} />
          <Image style={{marginLeft:10}} source={require('../assets/shoppingBag.png')}  />
        </View>
      </View>



      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View>
        <View style={styles.precautionSection}>
          <Image source={require('../assets/Do Not Bleach.png')}/>
          <Text style={styles.precautionText}> Do not use bleach</Text>
        </View>
        <View style={styles.precautionSection}>
          <Image source={require('../assets/Do Not Tumble Dry.png')}/>
          <Text style={styles.precautionText}> Do not tumble dry</Text>
        </View>
        <View style={styles.precautionSection}>
          <Image source={require('../assets/Do Not Wash.png')}/>
          <Text style={styles.precautionText}> Dry clean with tetrachloroethylene</Text>
        </View>
        <View style={styles.precautionSection}>
          <Image source={require('../assets/Iron Low Temperature.png')}/>
          <Text style={styles.precautionText}> Iron at a maximum of 110/230F</Text>
        </View>
        <View style={styles.precautionSection}>
          <Image source={require('../assets/Iron Low Temperature.png')}/>
          <Text style={styles.precautionText}> Do not use leach</Text>
          <Text style={styles.precautionText}> Do not use leach</Text>
        </View>
      </View>
      
      <Button title="Go To Cart"onPress={() => navigation.navigate('Cart')}/>
      


    </View>
    <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
        <Text style={styles.cartButtonText}>➕ ADD TO BASKET                      </Text>
        
      </TouchableOpacity>

    
    </ScrollView>
   

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color:"grey"
  },
  price: {
    fontSize: 24,
    color: 'orange',
    marginVertical: 10,
  },
  precautionSection:{
    flexDirection:'row',
    marginBottom:5
  },
  precautionText:{
    fontSize:20,
    marginLeft:20,
    color:'grey'
  },
  cartButton: {
    marginTop: 5,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'left',
    position:'relative',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
  },
  iconGroup: {
    flexDirection: 'row',

  },
});

export default ProductDetailScreen;
