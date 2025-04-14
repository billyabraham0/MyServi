// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title = 'Tombol', onPress = () => {}, style = {} }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.Text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1E3A5F',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    Text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Button;
