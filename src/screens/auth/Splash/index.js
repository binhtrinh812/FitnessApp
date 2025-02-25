import React from 'react';
import {Text, Image, View, Pressable} from 'react-native';
import Button from '../../../components/Button';
import {styles} from './styles';
import {useAuth0} from 'react-native-auth0';
import {createNewUser} from '../../../utils/backendCalls';
import {addTokenToAxios} from '../../../utils/request';
import Config from 'react-native-config';

const Splash = ({navigation}) => {
  const {authorize} = useAuth0();
  const onSignup = async () => {
    const result = await authorize({
      additionalParameters: {screen_hint: 'signup'},
      audience: Config.AUDIENCE,
      scope: 'openid profile email',
    });

    addTokenToAxios(`Bearer ${result.accessToken}`);
    await createNewUser(result.idToken);
  };

  const onSignin = async () => {
    try {
      const result = await authorize({
        audience: Config.AUDIENCE,
        scope: 'openid profile email',
      });

      addTokenToAxios(`Bearer ${result.accessToken}`);

      await createNewUser(result.idToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('../../../assets/screen.png')}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tập luyện cùng</Text>
        <Text style={[styles.title, styles.innerTitle]}>Fitness App!</Text>
      </View>

      <View style={styles.buttonCont}>
        <Button onPress={onSignup} title="Đăng ký" />
      </View>

      <Pressable onPress={onSignin} hitSlop={10}>
        <Text style={styles.footerText}>Đăng nhập</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(Splash);
