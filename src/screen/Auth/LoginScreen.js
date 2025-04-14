import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.js";

const Login = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { role = "user" } = route.params || {}; // Default to "user" if route.params is undefined
  const navigation = useNavigation();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Email tidak valid.";
      case "auth/user-not-found":
        return "Pengguna tidak ditemukan.";
      case "auth/wrong-password":
        return "Password salah.";
      default:
        return "Terjadi kesalahan. Silakan coba lagi.";
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password harus diisi.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        Alert.alert("Gagal", "Data user tidak ditemukan.");
        return;
      }

      const userData = userDoc.data();

      // Redirect to BottomTabNavigator if the role is "user"
      if (userData.role === "user") {
        navigation.reset({
          index: 0,
          routes: [{ name: "BottomTabNavigator" }],
        });
      } else {
        Alert.alert("Error", "Role tidak valid untuk user.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = getErrorMessage(error.code);
      Alert.alert("Login Gagal", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Login as {role === "user" ? "User" : "Teknisi"}
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ backgroundColor: "#eee", padding: 12, marginBottom: 12, borderRadius: 8 }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ backgroundColor: "#eee", padding: 12, marginBottom: 20, borderRadius: 8 }}
          />
          <TouchableOpacity
            onPress={handleLogin}
            style={{ backgroundColor: "#1e90ff", padding: 14, borderRadius: 8 }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 16 }}
          >
            <Text style={{ color: "#1e90ff", textAlign: "center" }}>Belum punya akun? Daftar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
