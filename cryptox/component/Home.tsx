import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Home() {
const [amount, setAmount] = useState('');
const [receiver, setReceiver] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CryptoX Wallet</Text>
            <TextInput style={styles.input} placeholder='Enter Amount'  />
            <TextInput style={styles.input} placeholder='Enter receiver id' />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 5
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});
