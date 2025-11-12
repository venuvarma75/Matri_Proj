// IconsTest.js
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const IconsTest = () => {
  return (
    <ScrollView style={{padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
        React Native Vector Icons Test
      </Text>
      
      <View style={{marginBottom: 15}}>
        <Text>FontAwesome: </Text>
        <Icon name="rocket" size={30} color="#900" />
        <Icon name="heart" size={30} color="red" />
        <Icon name="star" size={30} color="gold" />
      </View>

      <View style={{marginBottom: 15}}>
        <Text>Ionicons: </Text>
        <Ionicons name="ios-heart" size={30} color="red" />
        <Ionicons name="md-checkmark-circle" size={30} color="green" />
      </View>

      <View style={{marginBottom: 15}}>
        <Text>MaterialIcons: </Text>
        <MaterialIcons name="face" size={30} color="blue" />
        <MaterialIcons name="favorite" size={30} color="red" />
      </View>

      <View style={{marginBottom: 15}}>
        <Text>FontAwesome5: </Text>
        <FontAwesome5 name="react" size={30} color="#61dafb" />
        <FontAwesome5 name="smile-wink" size={30} color="orange" />
      </View>
    </ScrollView>
  );
};

export default IconsTest;