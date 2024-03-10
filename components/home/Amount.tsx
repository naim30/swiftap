import {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import assetImage from '../../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ListItem = {
  label: string;
  value: string;
  symbol: string;
  image: ImageSourcePropType;
};

const data: Array<ListItem> = [
  {
    label: 'USD - US Dollar',
    value: 'usd',
    symbol: '$',
    image: assetImage.flag_usa,
  },
  {
    label: 'CAD - Canadian Dollar',
    value: 'cad',
    symbol: 'CA$',
    image: assetImage.flag_cad,
  },
  {
    label: 'EUR - Euro',
    value: 'eur',
    symbol: '€',
    image: assetImage.flag_eur,
  },
  {
    label: 'GBP - Pound',
    value: 'gbp',
    symbol: '£',
    image: assetImage.flag_gbp,
  },
  {
    label: 'INR - Indian Rupee',
    value: 'inr',
    symbol: '₹',
    image: assetImage.flag_inr,
  },
];

const {width} = Dimensions.get('window');

type Props = {
  amount: number;
};

export default function Amount({amount}: Props) {
  const [currency, setCurrency] = useState<string | null>('usd');
  const [currencySymbol, setCurrencySymbol] = useState<string | null>('$');

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('fiat-currency');
      let fiatCurrency;
      if (data) {
        fiatCurrency = JSON.parse(data as unknown as string);
      } else {
        fiatCurrency = {currency: 'usd', symbol: '$'};
        await AsyncStorage.setItem(
          'fiat-currency',
          JSON.stringify(fiatCurrency),
        );
      }

      setCurrency(fiatCurrency.currency);
      setCurrencySymbol(fiatCurrency.symbol);
    })();
  }, []);

  const onFiatCurrencyChange = async (item: ListItem) => {
    try {
      await AsyncStorage.setItem(
        'fiat-currency',
        JSON.stringify({currency: item.value, symbol: item.symbol}),
      );

      setCurrency(item.value);
      setCurrencySymbol(item.symbol);
    } catch (e) {
      console.log(e);
    }
  };

  const selectedItemIcon = () => {
    const item = data.find(i => i.value === currency);
    return <Image style={styles.item_image} source={item?.image} />;
  };

  const listItem = (item: ListItem) => {
    return (
      <View style={styles.item_container}>
        <Image style={styles.item_image} source={item.image} />
        <Text style={styles.item_text}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.amount_container}>
        <Text style={styles.amount_symbol}>{currencySymbol}</Text>
        <Text style={styles.amount_text}>{amount.toFixed(2)}</Text>
      </View>
      <Dropdown
        style={[styles.dropdown, {width: width - 40}]}
        containerStyle={styles.list_container}
        itemTextStyle={styles.item_text}
        selectedTextStyle={styles.selected_item_text}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        value={currency}
        renderItem={listItem}
        renderLeftIcon={selectedItemIcon}
        onChange={(item: ListItem) => {
          onFiatCurrencyChange(item);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    color: 'black',
  },
  amount_container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 30,
  },
  amount_symbol: {
    fontFamily: 'Poppins-Medium',
    color: '#6b4a64',
    fontSize: 24,
    marginBottom: 18,
    marginRight: 10,
  },
  amount_text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 48,
    color: '#3F1D38',
    textAlign: 'center',
  },
  dropdown: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  list_container: {
    borderRadius: 10,
  },
  item_container: {
    flex: 0.8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item_image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
  item_text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#3F1D38',
  },
  selected_item_text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
  },
});
