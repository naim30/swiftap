import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import LoaderKit from 'react-native-loader-kit';

type Props = {
  title: string;
  loading?: boolean;
  onClick: () => void;
};

export default function ButtonPrimary({
  title,
  loading = false,
  onClick,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#340c91"
        onPress={onClick}
        disabled={loading}
        style={[
          styles.button,
          {backgroundColor: loading ? '#340c91' : '#5756e8'},
        ]}>
        <View style={styles.button_container}>
          {loading ? (
            <LoaderKit
              style={{width: 26, height: 26}}
              name={'BallPulse'}
              color={'white'}
            />
          ) : (
            <Text style={styles.button_text}>{title}</Text>
          )}
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
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    paddingRight: 10,
    paddingTop: 2,
  },
});
