import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

// Disable React DevTools in production
if (!__DEV__) {
  global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}