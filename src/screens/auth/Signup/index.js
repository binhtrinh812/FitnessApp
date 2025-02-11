import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Seperator from '../../../components/Seperator';
import GoogleLogin from '../../../components/GoogleLogin';
import {styles} from './styles';

const Signup = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const onSignIn = () => {
    navigation.navigate('Signin');
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader onBackPress={onBack} title="Sign Up" />
      <Input label="Name" placeholder="John Doe" />
      <Input label="E-mail" placeholder="example@gmail.com" />
      <Input isPassword label="Password" placeholder="********" />

      <View style={styles.agreeRow}>
        <Checkbox checked={checked} onCheck={setChecked} />
        <Text style={styles.agreeText}>
          {' '}
          I agree with <Text style={styles.agreeTextBold}>Terms</Text> &{' '}
          <Text style={styles.agreeTextBold}>Privacy</Text>
        </Text>
      </View>

      <Button style={styles.button} title="Sign Up" />
      <Seperator text="Or sign up with" />
      <GoogleLogin />

      <Text style={styles.footerText}>
        {' '}
        Already have an account?
        <Text onPress={onSignIn} style={styles.footerLink}>
          Sign In
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Signup;
