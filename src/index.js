import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Routes from './routes';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
