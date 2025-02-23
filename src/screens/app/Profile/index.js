import React, {useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import Button from '../../../components/Button';
import {getProfile} from '../../../utils/backendCalls';
import {ProfileContext} from '../../../../App';
import {useAuth0} from 'react-native-auth0';

const Profile = ({navigation}) => {
  const {clearSession} = useAuth0();
  const num = 10;
  const {profile, setProfile} = useContext(ProfileContext);

  useEffect(() => {
    (async () => {
      const data = await getProfile();

      setProfile(data);
    })();
  }, [setProfile]);

  const onLogout = async () => {
    await clearSession();
  };

  const onSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const onMyListingsPress = () => {
    navigation.navigate('MyListings');
  };

  const onNewListingPress = () => {
    navigation.navigate('CreateListing');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Thông tin" showLogout onLogout={onLogout} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>{profile?.fullName}</Text>
          <Text style={styles.email}>{profile?.email}</Text>

          <ListItem
            onPress={onMyListingsPress}
            title="Bài tập của tôi"
            subtitle={`Bạn có ${num} bài tập`}
          />
          <ListItem
            onPress={onSettingsPress}
            title="Cài đặt"
            subtitle="Tài khoản, FAQ, Liên hệ"
          />
        </View>

        <Button
          onPress={onNewListingPress}
          style={{flex: 0}}
          title="Thêm bài tập mới"
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Profile);
