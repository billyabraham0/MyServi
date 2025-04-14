// src/screens/Booking.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header, Input, Button } from 'src/components';

const Booking = ({ route, navigation }) => {
    const { service } = route.params;

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');

    const handleBooking = () => {
        // Navigasi ke halaman konfirmasi booking
        navigation.navigate('Confirmation', {
            bookingDetails: { service, date, time, address },
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Header title='Booking' />
            <View style={styles.content}>
                <Text style={styles.serviceTitle}>Layanan: {service.name}</Text>
                <Text style={styles.label}>Tanggal</Text>
                <Input
                    placeholder="Masukan tanggal (YYYY-MM-DD)"
                    value={date}
                    onChangeText={setDate}
                />
                <Text style={styles.label}>Waktu</Text>
                <Input
                    placeholder="Masukan Waktu (HH:MM)"
                    value={time}
                    onChangeText={setTime}
                />
                <Text style={styles.label}>Alamat</Text>
                <Input
                    placeholder="Masukan alamat lengkap"
                    value={address}
                    onChangeText={setAddress}
                />
                <Button
                    title="Pesan Sekarang"
                    onPress={handleBooking}
                    style={styles.button}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // fixed typo here (was backroundColor)
    },
    content: {
        padding: 20,
    },
    serviceTitle: {
        fontSize: 20,
        fontWeight: 'bold', // fixed typo (was fontWight)
        marginBottom: 15,
    },
    label: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    button: {
        marginTop: 20,
    },
});

export default Booking;
