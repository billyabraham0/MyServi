// src/screens/EditProfile.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from 'src/config/firebase.js';
import {doc, updateDoc} from 'firebase/firestore';
import Header from 'src/components/Header.js';

const EditProfile = ({ route, navigation }) => {
    const { profile } = route.params;
    const [name, setName] = useState(profile.name);

    const handleSave = async () => {
        try {
            const uid = auth.currentUser.uid;
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, { name });
            alert('Profil berhasil diperbarui!');
            navigation.goBack();
        } catch (error) {
            alert('Gagal memperbarui profil!');
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Edit Profile" />
            <View style={styles.form}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity onPress={handleSave} style={styles.button}>
                    <Text style={styles.buttonText}>Simpan Perubahan</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#27ae60',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EditProfile;