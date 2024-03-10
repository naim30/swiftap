import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import LoaderKit from 'react-native-loader-kit';

type Props = {
  fiatAmount: number;
  fiatCurrency: string;
  onClick: () => void;
};

export default function RefreshPayment({
  fiatAmount,
  fiatCurrency,
  onClick,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#e6e6ed"
        onPress={onClick}
        style={styles.button}>
        <View style={styles.button_container}>
          <LoaderKit
            style={{width: 30, height: 30}}
            name={'BallScale'}
            color={'#5756e8'}
          />
          <View style={styles.text_container}>
            <Text style={styles.text_title}>
              {`${fiatAmount} ${fiatCurrency}`}
            </Text>
            <Text style={styles.text_content}>Waiting for transaction</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignSelf: 'stretch'},
  button: {
    height: 60,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d7d7e0',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    paddingHorizontal: 10,
  },
  button_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text_title: {
    fontSize: 16,
    color: '#3F1D38',
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 2,
  },
  text_content: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#a6859f',
  },
});
