// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title = 'MyServi', style = {} }) => {
    return (
        <View style={[styles.headerContainer, style]}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#1E3A5F',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
});

export default Header;