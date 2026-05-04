import { View, Text } from 'react-native';
import React from 'react';
import HomeCardStyle from './HomeCardStyle';

export default function HomeCard() {
  return (
   <View style={HomeCardStyle.card}>
     <Text style={HomeCardStyle.cardText}></Text>
   </View>
  );
}