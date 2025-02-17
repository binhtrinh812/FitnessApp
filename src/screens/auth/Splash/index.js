import React from 'react';
import {Text, Image, View, Pressable} from 'react-native';
import Button from '../../../components/Button';
import {styles} from './styles';
import {useAuth0} from 'react-native-auth0';

const Splash = ({navigation}) => {
  const {authorize, clearSession, user, error, isLoading} = useAuth0();
  const onSignup = async () => {
    await authorize({additionalParameters: {screen_hint: 'signup'}});
  };

  const onSignin = async () => {
    try {
      await authorize(
        {
          audience: "https://hello-world.example.com",
          scope: 'openid profile email',
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('../../../assets/splash_image.png')}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>You'll Find</Text>
        <Text style={[styles.title, styles.innerTitle]}>All you need</Text>
        <Text style={styles.title}>Here!</Text>
      </View>

      <View style={styles.buttonCont}>
        <Button onPress={onSignup} title="Sign Up" />
      </View>

      <Pressable onPress={onSignin} hitSlop={10}>
        <Text style={styles.footerText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(Splash);
