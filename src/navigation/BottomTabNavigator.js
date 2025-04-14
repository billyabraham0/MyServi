import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardUser from "../screens/User/DashboardUser.js";
import BookingHistory from "../screens/User/BookingHistory.js";
import ChatScreen from "../screens/Auth/ChatScreen.js";
import NotificationScreen from "../screens/User/NotificationScreen.js"; // Import NotificationScreen

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Activity") {
            iconName = "activity-outline";
          } else if (route.name === "Chat") {
            iconName = "chatbox-ellipses-outline";
          } else if (route.name === "Notification") {
            iconName = "notifications-outline"; // Updated icon for Notification
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardUser}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Activity"
        component={BookingHistory}
        options={{ headerTitle: "Booking History" }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerTitle: "Chat" }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerTitle: "Notifications" }}
      />
    </Tab.Navigator>
  );
}