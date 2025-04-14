import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from "react-native";
import { auth, db } from "../../config/firebase.js";
import {doc, getDoc, setDoc, updateDoc, onSnapshot} from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

const ChatScreen = ({ route }) => {
    const { chatId, userId, technicianId } = route.params;
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const chatRef = doc(db, "chats", chatId);

    useEffect(() => {
        const unsubscribe = onSnapshot(chatRef, (docSnap) => {
            if (docSnap.exists()) {
                const newMessages = docSnap.data().messages || [];
                const lastMessages = newMessages[newMessages.length - 1];
                if (lastMessages?.sender !== auth.currentUser.uid) {
                    Alert.alert("Pesan baru", lastMessages.text);
                }
                setMessages(newMessages);
            }
        });
        return () => unsubscribe();
    }, []);

    const sendmessage = async () => {
        if (!text.trim()) return;

        const newMessage = {
            sender: auth.currentUser.uid,
            text,
            timestamp: new Date().toISOString(),
        };

        const docSnap = await getDoc(chatRef);
        if (docSnap.exists()) {
            await updateDoc(chatRef, {
                messages: [...(docSnap.data().messages || []), newMessage],
            });
        } else {
            await setDoc(chatRef, {
                userId,
                technicianId,
                messages: [newMessage],
            });
        }
        setText("");
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <Text style={{
                        alignSelf: item.sender === auth.currentUser.uid ? "flex-end" : "flex-start",
                        backgroundColor: item.sender === auth.currentUser.uid ? "#d1f5d3" : "#eee",
                        padding: 10,
                        borderRadius: 10,
                        marginVertical: 4,
                        maxWidth: "80%",
                    }}>
                        {item.text}
                    </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ padding: 10 }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Ketik pesan..."
                />
                <TouchableOpacity onPress={sendmessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Kirim</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
    },
    sendButton: {
        backgroundColor: "#3498db",
        borderRadius: 8,
        padding: 12,
        marginLeft: 10,
    },
    sendButtonText: {
        color: "white",
    },
});

export default ChatScreen;