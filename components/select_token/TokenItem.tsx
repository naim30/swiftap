import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
} from 'react-native';
import assetImage from '../../utils/images';

type Props = {
  index: number;
  symbol: string;
  image: ImageSourcePropType;
  tokenAmount: number;
  network: string;
  selected: boolean;
  onClick: () => void;
};

export default function TokenItem({
  symbol,
  image,
  tokenAmount,
  network,
  selected,
  onClick,
}: Props) {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={[
          styles.container,
          selected ? {backgroundColor: '#416f85'} : null,
        ]}>
        <View
          style={[
            styles.token_image_container,
            selected
              ? {borderColor: '#52849c', backgroundColor: '#5e8fa6'}
              : null,
          ]}>
          <Image style={styles.token_image} source={image} />
        </View>
        <View style={styles.text_container}>
          <Text
            style={[
              styles.text_title,
              selected ? {color: 'white'} : null,
            ]}>{`${tokenAmount} ${symbol}`}</Text>
          <Text
            style={[
              styles.text_sub_title,
              selected ? {color: '#e1ebf0'} : null,
            ]}>
            {network}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
    flexDirection: 'row',
  },
  token_image_container: {
    borderWidth: 1,
    borderColor: '#e6ebf7',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 50,
    backgroundColor: '#f2f7fa',
  },
  token_image: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  text_container: {},
  text_title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#3F1D38',
    lineHeight: 24,
  },
  text_sub_title: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#a6859f',
  },
});
