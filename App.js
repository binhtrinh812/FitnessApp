import React, {useState} from 'react';
import Config from 'react-native-config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import {Auth0Provider} from 'react-native-auth0';

export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ServicesContext = React.createContext([]);
export const SavedServicesContext = React.createContext([]);

const App = () => {
  const [profile, setProfile] = useState();
  const [services, setServices] = useState();
  const [savedServices, setSavedServices] = useState();
  return (
    <Auth0Provider domain={Config.CLIENT_DOMAIN} clientId={Config.CLIENT_ID}>
      <SafeAreaProvider>
        <ProfileContext.Provider value={{profile, setProfile}}>
          <ServicesContext.Provider value={{services, setServices}}>
            <SavedServicesContext.Provider value={{savedServices, setSavedServices}}>
              <Routes />
            </SavedServicesContext.Provider>
          </ServicesContext.Provider>
        </ProfileContext.Provider>
      </SafeAreaProvider>
    </Auth0Provider>
  );
};

export default App;
