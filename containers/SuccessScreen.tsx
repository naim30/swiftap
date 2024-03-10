import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ui/ButtonPrimary';

type Props = NativeStackScreenProps<RootStackParamList, 'success_screen'>;

export default function SuccessScreen({route, navigation}: Props) {
  const {params} = route;
  const {token, transactionHash} = params;

  const tokenAmount =
    Math.ceil((token.fiatAmount / token.price) * 1000000) / 1000000;
  const updatedTransaction =
    transactionHash.substring(0, 4) + '...' + transactionHash.slice(-4);

  const resetNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'home_screen'}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.success_container}>
        <Icon name="checkmark-circle" size={100} color="#38c172" />
        <View>
          <Text style={styles.success_title}>Payment Success!</Text>
          <Text style={styles.success_sub_title}>
            You have received payment amount of
          </Text>
          <Text style={styles.amount_text}>
            {`${token.fiatSymbol} ${token.fiatAmount}`}
          </Text>
        </View>

        <View style={styles.list_container}>
          <View style={styles.list_item}>
            <Text style={styles.label_text}>Token</Text>
            <Text
              style={
                styles.label_value_text
              }>{`${tokenAmount} ${token.symbol}`}</Text>
          </View>
          <View style={styles.list_item}>
            <Text style={styles.label_text}>Network</Text>
            <Text style={styles.label_value_text}>{token.chainName}</Text>
          </View>
          <View style={styles.list_item}>
            <Text style={styles.label_text}>Transaction Hash</Text>
            <Text style={styles.label_value_text}>{updatedTransaction}</Text>
          </View>
        </View>
      </View>
      <ButtonPrimary title="Create New Payment" onClick={resetNavigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f3f8',
    justifyContent: 'space-between',
    padding: 20,
  },
  success_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 20,
  },
  success_title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#3F1D38',
    textAlign: 'center',
    marginTop: 20,
  },
  success_sub_title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#a6859f',
  },
  amount_text: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: '#3F1D38',
    textAlign: 'center',
  },
  list_container: {marginVertical: 50, alignSelf: 'stretch'},
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label_text: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: '#a6859f',
  },
  label_value_text: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: '#3F1D38',
  },
});
