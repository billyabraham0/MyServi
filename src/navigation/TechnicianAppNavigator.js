import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TechnicianDashboard from '../screens/Teknisi/TechnicianDashboard.js';
import Profile from '../screens/Teknisi/ProfileTeknisi.js';
import ChatScreen from '../screens/Auth/ChatScreen.js';

const Stack = createNativeStackNavigator();

const TechnicianAppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TechnicianDashboard" component={TechnicianDashboard} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>
);

export default TechnicianAppNavigator;
