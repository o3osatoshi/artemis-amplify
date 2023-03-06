import React, {useState} from 'react';

import {Button, Text, View} from 'react-native';
import MetaMaskDataSource from '../infrastructure/metamaskDataSource';

const ButtonMetaMask = () => {
  const metamaskDataSource = new MetaMaskDataSource();
  const [balance, setBalance] = useState('');
  return (
    <View>
      <Button
        title="MetaMask Connect"
        onPress={() => {
          metamaskDataSource.getBalance().then(data => {
            setBalance(data.toString());
          });
        }}
      />
      <Text>{balance}</Text>
    </View>
  );
};

export default ButtonMetaMask;
