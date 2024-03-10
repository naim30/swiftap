import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X'];
const numberButtonWidth = width * 0.25;
const numberButtonHeight = width * 0.18;
const numberButtonTextSize = width * 0.06;

type Props = {
  onChange: (item: string) => void;
};

export default function NumberPad({onChange}: Props) {
  return (
    <FlatList
      style={styles.container}
      data={numberButtons}
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="#e6e6e8"
          disabled={item === ''}
          onPress={event => onChange(item.toString())}
          style={{borderRadius: 12}}>
          <View
            style={[
              {
                width: numberButtonWidth,
                height: numberButtonHeight,
              },
              styles.number_pad_container,
            ]}>
            {item === 'X' ? (
              <Icon name="backspace-outline" size={24} color="#3F1D38" />
            ) : (
              <Text
                style={[
                  {
                    fontSize: numberButtonTextSize,
                  },
                  styles.number_pad_text,
                ]}>
                {item}
              </Text>
            )}
          </View>
        </TouchableHighlight>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  number_pad_container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  number_pad_text: {
    fontFamily: 'Poppins-Medium',
    color: '#3F1D38',
  },
});
