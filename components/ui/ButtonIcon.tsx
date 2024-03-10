import {View, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string;
  onClick: () => void;
};

export default function ButtonIcon({name, onClick}: Props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#e6e6ed"
        onPress={onClick}
        style={styles.button}>
        <View style={styles.button_container}>
          <Icon name={name} size={30} color={'#3F1D38'} />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignSelf: 'stretch'},
  button: {
    flexDirection: 'row',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#d7d7e0',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
