import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Signup from './src/screens/auth/Signup';
import Signin from './src/screens/auth/Signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

const App = () => {
  useEffect(() => {
    console.log(Config.GOOGLE_WEB_CLIENT_ID);
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  return (
    <SafeAreaView>
      {/* <Signup /> */}
      <Signin />
    </SafeAreaView>
  );
};

export default App;
