// src/components/Input.js
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({
    placeholder = '',
    value = '',
    onChangeText = () => {},
    secureTextEntry = false,
    style = {},
 }) => {
    return (
        <TextInput
            style={[styles.input, style ]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginVertical: 8,
    },
});

export default Input;