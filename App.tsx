import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './containers/SplashScreen';
import HomeScreen from './containers/HomeScreen';
import SelectTokenScreen from './containers/SelectTokenScreen';
import PaymentScreen from './containers/PaymentScreen';
import {TokenPriceObjectType} from './utils/api';
import SuccessScreen from './containers/SuccessScreen';
import ErrorScreen from './containers/ErrorScreen';

export type RootStackParamList = {
  splash_screen: undefined;
  home_screen: undefined;
  select_token_screen: {
    tokenPrices: Array<TokenPriceObjectType>;
  };
  payment_screen: {
    url: string;
    token: TokenPriceObjectType;
    checkoutSessionId: string;
  };
  success_screen: {
    token: TokenPriceObjectType;
    transactionHash: string;
  };
  error_screen: {
    title: string;
    description: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash_screen">
        <Stack.Screen
          name="splash_screen"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="home_screen"
          component={HomeScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="select_token_screen"
          component={SelectTokenScreen}
          options={{
            title: 'Select Token',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#f2f3f8',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
            },
            animation: 'ios',
          }}
        />

        <Stack.Screen
          name="payment_screen"
          component={PaymentScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="success_screen"
          component={SuccessScreen}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <Stack.Screen
          name="error_screen"
          component={ErrorScreen}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
