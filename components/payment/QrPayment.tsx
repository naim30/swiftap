import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {QrCodeSvg} from 'react-native-qr-svg';

type Props = {
  amount: number;
  symbol: string;
  image: ImageSourcePropType;
  network: string;
  url: string;
};

export default function QrPayment({
  image,
  amount,
  symbol,
  network,
  url,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.token_container}>
        <View style={styles.token_image_container}>
          <Image style={styles.token_image} source={image} />
        </View>
        <View style={styles.token_amount_container}>
          <Text style={styles.token_text}>{`${amount} ${symbol}`}</Text>
          <Text style={styles.token_sub_text}>{network}</Text>
        </View>
      </View>

      <View style={styles.qr_container}>
        <View style={styles.qr_border}>
          <QrCodeSvg
            value={url}
            dotColor="#3F1D38"
            backgroundColor="white"
            contentCells={5}
            frameSize={180}
          />
        </View>
        <Text style={styles.qr_text}>Scan the code to pay</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
    paddingBottom: 40,
  },
  token_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  token_image_container: {
    borderWidth: 1,
    borderColor: '#e6ebf7',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderRadius: 50,
  },
  token_image: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  token_amount_container: {
    flex: 1,
  },
  token_text: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#3F1D38',
    lineHeight: 24,
  },
  token_sub_text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#a6859f',
  },
  qr_container: {
    alignItems: 'center',
  },
  qr_border: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e6ebf7',
    backgroundColor: '#white',
    borderRadius: 4,
    marginBottom: 30,
  },
  qr_text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#a6859f',
  },
});
