import React, {useState} from 'react';

import {Button, Text, View} from 'react-native';
import ArtemisDataSource from '../infrastructure/artemisDataSource';

const ButtonApi = () => {
  const artemisDataSource = new ArtemisDataSource();
  const [body, setBody] = useState('');
  return (
    <View>
      <Button
        title="API Call"
        onPress={() => {
          artemisDataSource.getP3Players().then(data => {
            setBody(data.toString());
          });
        }}
      />
      <Text>{body}</Text>
    </View>
  );
};

export default ButtonApi;
