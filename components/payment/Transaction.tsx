import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import ButtonSecondary from '../ui/ButtonSecondary';
import ButtonIcon from '../ui/ButtonIcon';
import RefreshPayment from './RefreshPayment';

type Props = {
  fiatAmount: number;
  fiatCurrency: string;
  onClick: () => void;
  onRefresh: () => void;
};

export default function Transaction({
  fiatAmount,
  fiatCurrency,
  onClick,
  onRefresh,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <View style={styles.cancel_button}>
          <RefreshPayment
            fiatAmount={fiatAmount}
            fiatCurrency={fiatCurrency}
            onClick={onRefresh}
          />
        </View>
        <ButtonIcon name="close-outline" onClick={onClick}></ButtonIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#5756e8',
    padding: 20,
  },
  warning_text: {
    fontSize: 12,
    color: '#3F1D38',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  button_container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  cancel_button: {
    flex: 1,
    marginRight: 10,
  },
});
