import {TokenObjectType, tokens} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.APP_BASE_URL;

const headers = {
  Authorization: `Bearer ${Config.APP_API_KEY}`,
};

export type PriceObjectType = {
  coingeckoId: string;
  currency: string;
  price: number;
};

export type TokenPriceObjectType = TokenObjectType & {
  price: any;
  fiatAmount: number;
  fiatCurrency: string;
  fiatSymbol: string;
};

export async function getCurrencyConversion(
  fiatAmount: number,
): Promise<Array<TokenPriceObjectType>> {
  try {
    const data = await AsyncStorage.getItem('fiat-currency');
    const fiatCurrency = data
      ? JSON.parse(data as unknown as string)
      : {currency: 'usd', symbol: '$'};

    const url = `${baseUrl}/api/v1/constants/prices/?currency=${fiatCurrency.currency}`;

    const response = await axios.get(url, {
      headers,
    });

    const prices = tokens.map(
      (token: TokenObjectType): TokenPriceObjectType => {
        const tokenPrice = response.data.prices.find(
          (price: PriceObjectType) => price.currency === token.currency,
        );
        return {
          ...token,
          price: tokenPrice.price,
          fiatAmount,
          fiatCurrency: fiatCurrency.currency.toUpperCase(),
          fiatSymbol: fiatCurrency.symbol,
        };
      },
    );
    return prices;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function createCheckoutSession(
  chainId: number,
  amount: number,
  currency: string,
) {
  try {
    const url = `${baseUrl}/api/v1/checkout/sessions`;
    const body = {
      submitType: 'pay',
      lineItems: {
        data: [
          {
            priceData: {
              currency: currency,
              productData: {
                name: `Order #${Date.now()}`,
              },
              unitAmount: Math.floor(amount * 10 ** 8),
            },
            quantity: 1,
          },
        ],
      },
      paymentSetting: {
        allowSwap: false,
        preferredChainId: chainId,
      },
      successUrl: 'https://copperx.io/',
      afterCompletion: 'redirect',
    };

    const response = await axios.post(url, body, {
      headers,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getPaymentUrl(
  chainId: number,
  amount: number,
  currency: string,
): Promise<{checkoutSessionId: string | null; paymentUrl: string | null}> {
  try {
    const checkoutSession = await createCheckoutSession(
      chainId,
      amount,
      currency,
    );

    const checkoutSessionId = checkoutSession.id;

    if (chainId == 1399811150 || chainId == 1399811149) {
      const assetId = checkoutSession.addresses[0].asset.id;
      const encodedUrl = encodeURIComponent(
        `${baseUrl}/api/v1/payment-pages/for-checkout-session/${checkoutSessionId}/solana-pay/${assetId}`,
      );
      const paymentUrl = `solana:${encodedUrl}`;
      // const paymentAddress = checkoutSession.addresses[0].paymentAddress;

      return {checkoutSessionId, paymentUrl};
    } else {
      console.log('TODO: handle different network');
      return {checkoutSessionId: null, paymentUrl: null};
    }
  } catch (e) {
    console.log(e);
    return {checkoutSessionId: null, paymentUrl: null};
  }
}

export async function getCheckoutSessionStatus(
  checkoutSessionId: string,
): Promise<boolean> {
  try {
    const url = `${baseUrl}/api/v1/checkout/sessions/${checkoutSessionId}/completed_webhook_delivered`;

    const response = await axios.get(url, {
      headers,
    });

    return response.data.completed;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function getCheckoutSession(
  checkoutSessionId: string,
): Promise<string | undefined> {
  try {
    const url = `${baseUrl}/api/v1/checkout/sessions/${checkoutSessionId}`;

    const response = await axios.get(url, {
      headers,
    });

    var transaction = response.data.paymentIntent.transactions[0];

    return transaction.transactionHash;
  } catch (e) {
    console.log(e);
    return;
  }
}
