import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

type Props = {
  url: string;
};

export default function TapPayment({url}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tap your phone to pay with NFC.</Text>
        <Text style={styles.sub_title}>Hold your phone behind device.</Text>
      </View>
      <Image
        style={styles.image}
        source={require('../../assets/images/nfc.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#3F1D38',
  },
  sub_title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#a6859f',
  },
  image: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
});
