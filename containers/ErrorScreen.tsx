import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ui/ButtonPrimary';

type Props = NativeStackScreenProps<RootStackParamList, 'error_screen'>;

export default function ErrorScreen({route, navigation}: Props) {
  const {params} = route;
  const {title, description} = params;

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
        <Icon name="remove-circle" size={100} color="#ff0000" />
        <View>
          <Text style={styles.success_title}>{title}</Text>
          <Text style={styles.success_sub_title}>{description}</Text>
        </View>
      </View>
      <ButtonPrimary title="Back to Home" onClick={resetNavigation} />
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
