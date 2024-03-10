import {View, StyleSheet, BackHandler, AppState} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import TapPayment from '../components/payment/TapPayment';
import QrPayment from '../components/payment/QrPayment';
import Transaction from '../components/payment/Transaction';
import assetImage from '../utils/images';
import {getCheckoutSession, getCheckoutSessionStatus} from '../utils/api';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from 'react-native-hce';

type Props = NativeStackScreenProps<RootStackParamList, 'payment_screen'>;

export default function PaymentScreen({route, navigation}: Props) {
  const {params} = route;
  const {url, token, checkoutSessionId} = params;

  const tokenImage = (assetImage as unknown as any)[`token_${token.currency}`];
  const tokenAmount =
    Math.ceil((token.fiatAmount / token.price) * 1000000) / 1000000;

  const [intervalId, setIntervalId] = useState<string | null>(null);
  const [nfcSession, setNfcSession] = useState<any>(null);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let stateSubscription: any;
    (async () => {
      const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.URL,
        content: url,
        writable: false,
      });
      const session = await HCESession.getInstance();
      await session.setApplication(tag);
      await session.setEnabled(true);

      setNfcSession(session);

      stateSubscription = AppState.addEventListener('change', async state => {
        if (
          appState.current === 'active' &&
          state.match(/inactive|background/)
        ) {
          if (session) {
            await session.setEnabled(false);
          }
        }

        if (
          appState.current.match(/inactive|background/) &&
          state === 'active'
        ) {
          if (session) {
            await session.setEnabled(true);
          }
        }

        appState.current = state;
      });

      const id = setInterval(async (): Promise<undefined> => {
        try {
          const paymentStatus = await getCheckoutSessionStatus(
            checkoutSessionId,
          );
          if (paymentStatus) {
            if (id) {
              clearInterval(parseInt(id.toString()));
            }
            if (session) {
              await session.setEnabled(false);
            }
            const transactionHash = await getCheckoutSession(checkoutSessionId);

            if (transactionHash) {
              navigation.navigate('success_screen', {token, transactionHash});
            }
          }
        } catch (e) {
          navigation.navigate('error_screen', {
            title: 'Error: Payment Status',
            description: 'An error occurred while retrieving payment status.',
          });
          console.log(e);
        }
      }, 3000);

      setIntervalId(id.toString());
    })();
    return () => {
      stateSubscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (intervalId) {
          clearInterval(parseInt(intervalId));
        }
        if (nfcSession) {
          nfcSession.setEnabled(false).then(() => {
            console.log('session disconnected');
          });
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        backHandler.remove();
      };
    }, [intervalId]),
  );

  const resetNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'home_screen'}],
      }),
    );
  };

  const onCancelPayment = async () => {
    if (intervalId) {
      clearInterval(parseInt(intervalId));
    }
    if (nfcSession) {
      await nfcSession.setEnabled(false);
    }
    resetNavigation();
  };

  const onRefreshPayment = async () => {
    try {
      const paymentStatus = await getCheckoutSessionStatus(checkoutSessionId);
      if (paymentStatus) {
        if (intervalId) {
          clearInterval(parseInt(intervalId.toString()));
        }
        const transactionHash = await getCheckoutSession(checkoutSessionId);

        if (transactionHash) {
          navigation.navigate('success_screen', {token, transactionHash});
        }
      }
    } catch (e) {
      navigation.navigate('error_screen', {
        title: 'Error: Payment Status',
        description: 'An error occurred while retrieving payment status.',
      });
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.qr_container}>
        <TapPayment url={url} />
        <QrPayment
          url={url}
          amount={tokenAmount}
          symbol={token.symbol}
          image={tokenImage}
          network={token.chainName}
        />
      </View>
      <Transaction
        fiatAmount={token.fiatAmount}
        fiatCurrency={token.fiatCurrency}
        onClick={onCancelPayment}
        onRefresh={onRefreshPayment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f3f8',
    justifyContent: 'space-between',
  },
  qr_container: {
    alignSelf: 'stretch',
    padding: 20,
  },
});
