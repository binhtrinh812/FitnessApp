import React, {useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import Button from '../../../components/Button';
import {getProfile} from '../../../utils/backendCalls';
import {ProfileContext} from '../../../../App';
import {UserContext} from '../../../../App';

const Profile = ({navigation}) => {
  const num = 10;
  const {profile, setProfile} = useContext(ProfileContext);
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const data = await getProfile();

      setProfile(data);
    })();
  }, [setProfile]);

  const onLogout = () => {
    setUser(null);
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
      <Header title="Profile" showLogout onLogout={onLogout} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>{profile?.fullName}</Text>
          <Text style={styles.email}>{profile?.email}</Text>

          <ListItem
            onPress={onMyListingsPress}
            title="My Listings"
            subtitle={`You have ${num} listings`}
          />
          <ListItem
            onPress={onSettingsPress}
            title="Settings"
            subtitle="Account, FAQ, Contact"
          />
        </View>

        <Button
          onPress={onNewListingPress}
          style={{flex: 0}}
          title="Add New Listing"
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Profile);
