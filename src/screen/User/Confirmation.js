// src/screen/confirmation.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Button } from 'src/components';
import { db, auth } from 'src/config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Confirmation = ({ route, navigation }) => {
    const { bookingDetails } = route.params;
    const { service, date, time, address } = bookingDetails;

    const handleConfirm = async () => {
        try {
            const uid = auth.currentUser.uid;
            await addDoc (collection(db, 'bookings'), {
                uid,
                service: service.name,
                date,
                time,
                address,
                status: 'menunggu',
                technician: null,
                createdAt: new Date().toISOString(),
            });
        alert ( 'Booking berhasil disimpan!');
        navigation.navigate ( 'home' );
        } catch (error) {
            alert ('Gagal menyimpan booking');
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Konfirmasi Booking" />
            <View style={styles.content}>
                <Text style={styles.title}>Booking Details</Text>
                <Text style={styles.label}>Layanan: {service}</Text>
                <Text style={styles.label}>Tanggal: {date}</Text>
                <Text style={styles.label}>Waktu: {time}</Text>
                <Text style={styles.label}>Alamat: {address}</Text>
            </View>
            <Button title="Konfirmasi" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
});

export default Confirmation;