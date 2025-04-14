import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardUser from "../screens/User/DashboardUser.js";
import Profile from "../screens/User/Profile.js";

const Stack = createNativeStackNavigator();

const UserAppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DashboardUser">
      <Stack.Screen
        name="DashboardUser"
        component={DashboardUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      {/* Tambahkan layar lain untuk user jika diperlukan */}
    </Stack.Navigator>
  );
};

export default UserAppNavigator;
