import {StyleSheet, ScrollView, View, Text} from 'react-native';
import TokenItem from '../components/select_token/TokenItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import assetImage from '../utils/images';
import ButtonPrimary from '../components/ui/ButtonPrimary';
import {useState} from 'react';
import {getPaymentUrl} from '../utils/api';

type Props = NativeStackScreenProps<RootStackParamList, 'select_token_screen'>;

export default function SelectTokenScreen({route, navigation}: Props) {
  const {params} = route;
  const {tokenPrices} = params;

  const fiatAmount = tokenPrices[0].fiatAmount;
  const fiatSymbol = tokenPrices[0].fiatSymbol;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const onClickNext = async () => {
    try {
      setLoadingButton(true);

      const token = tokenPrices[selectedIndex];
      const tokenAmount =
        Math.ceil((fiatAmount / token.price) * 1000000) / 1000000;

      const {checkoutSessionId, paymentUrl} = await getPaymentUrl(
        token.chain,
        tokenAmount,
        token.currency,
      );

      if (checkoutSessionId) {
        navigation.navigate('payment_screen', {
          url: paymentUrl as unknown as string,
          token,
          checkoutSessionId,
        });
      }

      setLoadingButton(false);
    } catch (e) {
      navigation.navigate('error_screen', {
        title: 'Error: QR Code',
        description:
          'An error occurred while generating the payment QR code and NFC tag.',
      });

      setLoadingButton(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.amount_container}>
        <Text style={styles.amount_text}>{`${fiatSymbol} ${fiatAmount}`}</Text>
      </View>
      <View style={styles.list_container}>
        <ScrollView style={styles.scroll_container}>
          {tokenPrices.map((token, index) => {
            const tokenImage = (assetImage as unknown as any)[
              `token_${token.currency}`
            ];
            const tokenAmount =
              Math.ceil((fiatAmount / token.price) * 1000000) / 1000000;

            return (
              <TokenItem
                key={index}
                index={index}
                symbol={token.symbol}
                image={tokenImage}
                tokenAmount={tokenAmount}
                network={token.chainName}
                selected={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.button_container}>
        <ButtonPrimary
          title="Generate QR Code"
          loading={loadingButton}
          onClick={onClickNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f8',
  },
  amount_container: {
    marginHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#e6ebf7',
  },
  amount_text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#3F1D38',
    textAlign: 'center',
  },
  list_container: {
    flex: 1,
  },
  scroll_container: {
    flex: 1,
    padding: 20,
  },
  button_container: {
    padding: 20,
  },
});
