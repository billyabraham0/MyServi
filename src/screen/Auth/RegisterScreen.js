import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker"; // For ID upload functionality
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the new package
import { auth, db } from "../../config/firebase.js";

const Register = ({ route }) => {
  const role = route?.params?.role || "user"; // Default to "user" if role is undefined
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New phone number field
  const [service, setService] = useState(""); // For teknisi
  const [experience, setExperience] = useState(""); // For teknisi
  const [idProof, setIdProof] = useState(null); // For ID upload
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Semua field harus diisi.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Save user data to Firestore
      const userData = {
        email,
        name,
        role: "user",
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", uid), userData);

      // Redirect to BottomTabNavigator after successful registration
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabNavigator" }],
      });
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Gagal Daftar", error.message);
    }
  };

  const handleIdUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your media library to upload an ID.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIdProof(result.uri);
      Alert.alert("Sukses", "ID berhasil diunggah.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Register as {role === "user" ? "User" : "Teknisi"}
          </Text>
          <TextInput
            placeholder="Nama Lengkap"
            value={name}
            onChangeText={setName}
            style={{ backgroundColor: "#eee", padding: 12, marginBottom: 12, borderRadius: 8 }}
          />
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
            style={{ backgroundColor: "#eee", padding: 12, marginBottom: 12, borderRadius: 8 }}
          />

          {/* Additional fields for teknisi */}
          {role === "teknisi" && (
            <>
              <TextInput
                placeholder="Nomor Telepon"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={{ backgroundColor: "#eee", padding: 12, marginBottom: 12, borderRadius: 8 }}
              />
              <View style={{ backgroundColor: "#eee", borderRadius: 8, marginBottom: 12 }}>
                <Picker
                  selectedValue={service}
                  onValueChange={(itemValue) => setService(itemValue)}
                  style={{ padding: 12 }}
                >
                  <Picker.Item label="Pilih Layanan (Service)" value="" />
                  <Picker.Item label="Service AC" value="Service AC" />
                  <Picker.Item label="Service Pompa Air" value="Service Pompa Air" />
                  <Picker.Item label="Service Listrik" value="Service Listrik" />
                  <Picker.Item label="Service Mobil" value="Service Mobil" />
                  <Picker.Item label="Service Motor" value="Service Motor" />
                  <Picker.Item label="Cleaning Service" value="Cleaning Service" />
                  <Picker.Item label="Service Handphone" value="Service Handphone" />
                  <Picker.Item label="Service Laptop" value="Service Laptop" />
                  <Picker.Item label="Service Console" value="Service Console" />
                  <Picker.Item label="Service TV" value="Service TV" />
                  <Picker.Item label="Service Headset" value="Service Headset" />
                  <Picker.Item label="Service Jam Tangan" value="Service Jam Tangan" />
                  <Picker.Item label="Service Kamera" value="Service Kamera" />
                  <Picker.Item label="Service Printer" value="Service Printer" />
                  <Picker.Item label="Service Sound System" value="Service Sound System" />
                </Picker>
              </View>
              <TextInput
                placeholder="Pengalaman (Experience)"
                value={experience}
                onChangeText={setExperience}
                style={{ backgroundColor: "#eee", padding: 12, marginBottom: 12, borderRadius: 8 }}
              />
              <TouchableOpacity
                onPress={handleIdUpload}
                style={{ backgroundColor: "#007bff", padding: 14, borderRadius: 8, marginBottom: 20 }}
              >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                  {idProof ? "ID Berhasil Diunggah" : "Unggah ID"}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: "#28a745", padding: 14, borderRadius: 8 }}>
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>Daftar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login", { role })} style={{ marginTop: 16 }}>
            <Text style={{ color: "#1e90ff", textAlign: "center" }}>Sudah punya akun? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
