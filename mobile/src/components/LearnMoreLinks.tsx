import React, {Fragment} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ArtemisDataSource from '../infrastructure/artemisDataSource';

const links = [
  {
    id: 1,
    title: 'The Basics',
    link: 'https://reactnative.dev/docs/tutorial',
    description: 'Explains a Hello World for React Native.',
  },
];

const LearnMoreLinks = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      {links.map(
        ({id, title, link, description}) => (
          console.log('link', link),
          (
            <Fragment key={id}>
              <View
                style={[
                  styles.separator,
                  {
                    backgroundColor: isDarkMode ? Colors.dark : Colors.light,
                  },
                ]}
              />
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => {
                  const artemisDataSource = new ArtemisDataSource();
                  artemisDataSource.getP3Players().then(data => {
                    console.log('data', data);
                  });
                }}
                style={styles.linkContainer}>
                <Text style={styles.link}>{title}</Text>
                <Text
                  style={[
                    styles.description,
                    {
                      color: isDarkMode ? Colors.lighter : Colors.dark,
                    },
                  ]}>
                  {description}
                </Text>
              </TouchableOpacity>
            </Fragment>
          )
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primary,
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
});

export default LearnMoreLinks;
