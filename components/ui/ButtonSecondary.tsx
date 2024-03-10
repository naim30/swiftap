import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

type Props = {
  title: string;
  onClick: () => void;
};

export default function ButtonSecondary({title, onClick}: Props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#e6e6ed"
        onPress={onClick}
        style={styles.button}>
        <View style={styles.button_container}>
          <Text style={styles.button_text}>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignSelf: 'stretch'},
  button: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: '#d7d7e0',
    borderRadius: 10,
    backgroundColor: 'white',
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
    color: '#3F1D38',
    fontFamily: 'Poppins-SemiBold',
    paddingRight: 10,
    paddingTop: 2,
  },
});
