import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';

import useAuth from '../utility/Auth';

import { auth } from '../utility/firebase';

const AppNavigator = () => {
  
  const [user, setUser] = useState();

  // const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return subscriber
  }, [])

  return (
    <NavigationContainer>
        {
            user ? <RootNavigator/> : <AuthNavigator/>
        }
    </NavigationContainer>
  );
}

export default AppNavigator;
