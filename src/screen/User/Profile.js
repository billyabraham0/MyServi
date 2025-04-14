// src/screens/Profile.js
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../config/firebase.js";
import { getUserProfile } from "../../utils/firebaseUtils.js";
import Header from "../../components/Header.js";

const Profile = () => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const uid = auth.currentUser?.uid;

        if (uid) {
            getUserProfile(uid)
                .then((userProfile) => setProfile(userProfile))
                .catch((err) => {
                    console.error("Error fetching profile:", err);
                    Alert.alert("Error", "Failed to fetch profile. Please try again later.");
                });
        } else {
            Alert.alert("Error", "User is not authenticated.");
        }
    }, []);

    if (!profile) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <View style={styles.container}>
            <Header title="Profile" />
            <View style={styles.content}>
                <Text style={styles.label}>Nama</Text>
                <Text style={styles.text}>{profile.name || "Nama tidak tersedia"}</Text>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.text}>{profile.email || "Email tidak tersedia"}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfile", { profile })}
                    style={styles.editButton}
                >
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    label: {
        fontWeight: "bold",
        marginTop: 10,
    },
    text: {
        fontSize: 16,
    },
    editButton: {
        backgroundColor: "#3498DB",
        padding: 12,
        borderRadius: 8,
        marginTop: 30,
        alignItems: "center",
    },
    editButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Profile;