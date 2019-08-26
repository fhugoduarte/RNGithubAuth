import React, {useEffect, useState, Fragment} from 'react';
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';

export default function Home({navigation}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const token = navigation.getParam('token');
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setUser(response.data);
    }

    getUser();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {user ? (
        <Fragment>
          <Image style={styles.avatar} source={{uri: user.avatar_url}} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userBio}>{user.bio}</Text>
        </Fragment>
      ) : (
        <ActivityIndicator color="#333" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#333',
    margin: 20,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  userBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
