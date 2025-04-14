import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/LoginScreen";
import Register from "../screens/Auth/RegisterScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
