import {View, Text, StyleSheet, Image} from 'react-native';
import {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'splash_screen'>;

export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('home_screen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logos/swiftap.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
});
