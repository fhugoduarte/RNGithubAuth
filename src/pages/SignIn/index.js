import React, {useEffect, useState} from 'react';
import {
  Text,
  Platform,
  Linking,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {words} from 'lodash';
import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv';

export default function SignIn({navigation}) {
  const [loading, setLoading] = useState(false);
  const [callbackCode, setCallbackCode] = useState(null);

  useEffect(() => {
    function handleOpenURL(url) {
      if (url) {
        setLoading(true);
        const [, code] = url.split('code=');
        setCallbackCode(code);
      }
    }

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => handleOpenURL(url));
    } else {
      Linking.addEventListener('url', ({url}) => handleOpenURL(url));
    }

    return () => Linking.removeEventListener('url');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getToken(code) {
      try {
        const {data} = await axios.post(
          'https://github.com/login/oauth/access_token',
          {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
          },
        );
        if (!data.includes('error')) {
          const [, token] = words(data, /\=(.*?)\&/);
          navigation.navigate('Home', {token});
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }

    if (callbackCode) {
      getToken(callbackCode);
    }
  }, [callbackCode, navigation]);

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            `https://github.com/login/oauth/authorize?scope=user,email&client_id=${CLIENT_ID}`,
          )
        }>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.title}>Sign In With Github</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 30,
    borderRadius: 5,
  },
  title: {
    fontWeight: '400',
    color: '#fff',
  },
});
