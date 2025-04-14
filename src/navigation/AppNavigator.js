// filepath: c:\Users\Billy Abraham\MyServi\src\navigation\AppNavigator.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ActivityIndicator, View } from "react-native";

import { auth, db } from "../config/firebase.js";
import TechnicianAppNavigator from "./TechnicianAppNavigator.js";
import BottomTabNavigator from "./BottomTabNavigator.js";
import Login from "../screens/Auth/LoginScreen.js";
import Register from "../screens/Auth/RegisterScreen.js";
import AuthLandingScreen from "../screens/Auth/AuthLandingScreen.js";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AuthLanding" component={AuthLandingScreen} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userRole = userDoc.data()?.role;
        setRole(userRole);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!role && <AuthStack />}
      {role === "user" && <BottomTabNavigator />}
      {role === "teknisi" && <TechnicianAppNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
