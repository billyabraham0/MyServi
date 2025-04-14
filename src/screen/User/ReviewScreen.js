import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "src/config/firebase.js";

const ReviewScreen = ({ route, navigation }) => {
    const { bookingId } = route.params;
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");

    const submitReview = async () => {
        await updateDoc(doc(db, "bookings", bookingId), {
            rating: parseFloat(rating),
            review,
        });
        alert('Ulasan terkirim!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Rating (1-5)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />
            <Text style={styles.label}>Ulasan</Text>
            <TextInput
                style={styles.input}
                value={review}
                onChangeText={setReview}
            />
            <Button title="Kirim Ulasan" onPress={submitReview} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginTop: 5,
        borderRadius: 8,
    },
});

export default ReviewScreen;