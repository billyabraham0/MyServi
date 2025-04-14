import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../../config/firebase"; // Corrected import path

const AuthLandingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const role = route?.params?.role || "user";

  const handleImageSelection = (result) => {
    if (!result.canceled) {
      setBeforeImage(result.uri);
    }
  };

  const showAlert = (lastStatus) => {
    Alert.alert("Status Booking Diperbarui", `Status: ${lastStatus}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyServi</Text>

      {/* Login Options */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "user" })}
      >
        <Text style={styles.buttonText}>Login as User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "teknisi" })}
      >
        <Text style={styles.buttonText}>Login as Teknisi</Text>
      </TouchableOpacity>

      {/* Register Options */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register", { role: "user" })}
      >
        <Text style={styles.buttonText}>Register as User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register", { role: "teknisi" })}
      >
        <Text style={styles.buttonText}>Register as Teknisi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AuthLandingScreen;
