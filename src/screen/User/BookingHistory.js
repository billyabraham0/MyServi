// src/screen/BookingHistory.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../../config/firebase.js';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { Header } from '../../components/Header.js'; // Adjust the import path as necessary

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const prevStatusRef = useRef(null);

    useEffect(() => {
        const q = query(
            collection(db, 'bookings'),
            where('uid', '==', auth.currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newBookings = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBookings(newBookings);

            const lastStatus = newBookings[newBookings.length - 1]?.status;
            if (lastStatus && lastStatus !== prevStatusRef.current) {
                Alert.alert('Status Booking Diperbarui', 'Status: ${lastStatus}');
                prevStatusRef.current = lastStatus;
            }
        });
        
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    }

    return (
        <View style={styles.container}>
            <Header title="Booking History" />
            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.service}>{item.service}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                        <Text style={styles.address}>{item.address}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ChatScreen', {
                                chatId: `${item.uid}_${item.technicianId}`,
                                userId: item.uid,
                                technicianId: item.technicianId,
                            })}
                            style={{ marginTop: 10 }}
                        >
                            <Text style={{ color: 'blue' }}>Buka Chat</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: 15,
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#f3f3f3',
    },
    service: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 18,
    },
    time: {
        fontSize: 18,
    },
    address: {
        fontSize: 18,
    },
});

export default BookingHistory;