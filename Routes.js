import React, {useContext, useEffect, useState} from 'react';
import Splash from './src/screens/auth/Splash';
import Home from './src/screens/app/Home';
import Favorites from './src/screens/app/Favorites';
import Profile from './src/screens/app/Profile';
import Settings from './src/screens/app/Settings';
import ProductDetails from './src/screens/app/ProductDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from './src/utils/colors';
import {Image} from 'react-native';
import CreateListing from './src/screens/app/CreateListing';
import UpdateListing from './src/screens/app/UpdateListing';
import MyListings from './src/screens/app/MyListings';
import {useAuth0} from 'react-native-auth0';
import {addTokenToAxios} from './src/utils/request';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateListing"
        component={CreateListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateListing"
        component={UpdateListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyListings"
        component={MyListings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let icon;

        if (route.name === 'Home') {
          icon = focused
            ? require('./src/assets/tabs/home_active.png')
            : require('./src/assets/tabs/home.png');
        } else if (route.name === 'ProfileStack') {
          icon = focused
            ? require('./src/assets/tabs/profile_active.png')
            : require('./src/assets/tabs/profile.png');
        } else if (route.name === 'Favorites') {
          icon = focused
            ? require('./src/assets/tabs/bookmark_active.png')
            : require('./src/assets/tabs/bookmark.png');
        }

        return <Image style={{width: 24, height: 24}} source={icon} />;
      },
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopColor: colors.lightGrey,
        backgroundColor: '#fff',
        height: 60,
      },
    })}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="ProfileStack" component={ProfileStack} />
  </Tab.Navigator>
);

const Routes = () => {
  const {user, getCredentials} = useAuth0();

  const theme = {
    colors: {
      background: colors.white,
    },
  };

  useEffect(() => {
    const init = async () => {
      const credentials = await getCredentials();

      if (credentials) {
        addTokenToAxios(`Bearer ${credentials.accessToken}`);
      }
    };
    init();
  }, [user]);

  useEffect(() => {
    if (user) {
      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công!',
        text2: `Chào mừng ${user.name}.`,
        visibilityTime: 4000,
        autoHide: true,
        position: 'top',
        topOffset: 40,
        text1Style: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'center',
          paddingTop: 10,
        },
        text2Style: {
          fontSize: 16,
          color: '#000',
          paddingBottom: 10,
          textAlign: 'center',
        },
        style: {
          borderRadius: 10,
          padding: 15,
        },
      });
    }
  }, [user]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(Routes);
