import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

// set options in the pages
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#1E1E1E'},
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
