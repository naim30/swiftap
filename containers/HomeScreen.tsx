import {View, StyleSheet} from 'react-native';
import NumberPad from '../components/home/NumberPad';
import ButtonPrimary from '../components/ui/ButtonPrimary';
import Amount from '../components/home/Amount';
import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {getCurrencyConversion} from '../utils/api';

type Props = NativeStackScreenProps<RootStackParamList, 'home_screen'>;

export default function HomeScreen({navigation}: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const onChange = (value: string) => {
    if (value !== 'X' && (amount * 1000 + +value) / 100 >= 1000000) return;

    var tempAmount = Math.round(amount * 100);
    if (value == 'X') {
      const newAmount = Math.floor(tempAmount / 10);
      setAmount(Math.floor(newAmount) / 100);
    } else {
      const newAmount = tempAmount * 10 + +value;
      setAmount(Math.floor(newAmount) / 100);
    }
  };

  const onClickNext = async () => {
    if (amount <= 0) return;

    try {
      setLoadingButton(true);

      const tokenPrices = await getCurrencyConversion(amount);
      navigation.navigate('select_token_screen', {
        tokenPrices,
      });

      setLoadingButton(false);
    } catch (e) {
      navigation.navigate('error_screen', {
        title: 'Error: Token Amount',
        description:
          'An error occurred when attempting to retrieve token amounts.',
      });

      console.log(e);
      setLoadingButton(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.key_container}>
        <Amount amount={amount} />
        <NumberPad onChange={onChange} />
      </View>
      <ButtonPrimary
        title="Next"
        loading={loadingButton}
        onClick={onClickNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f3f8',
    padding: 20,
  },
  key_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount_text: {
    color: '#3F1D38',
  },
});
