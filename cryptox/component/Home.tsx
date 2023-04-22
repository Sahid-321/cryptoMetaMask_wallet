import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Home() {
    const [amount, setAmount] = useState<string>('');
    const [receiver, setReceiver] = useState<string>('');
    const [apiData, setApiData] = useState([])

    const objToPassInApi = {
        amount,
        receiver
    }

    const handleSend = () => {
        //const acc2 = "0x64040DD45739eb952B8003eF87D9C1d4F347De48";
        axios.post<{ data: any }>('http://192.168.1.72:3000/balances', objToPassInApi)
            .then(({ data }) => setApiData(data))
            .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CryptoX Wallet</Text>
            <TextInput style={styles.input} placeholder='Enter Amount less than 0.0025' onChangeText={(text) => setAmount(text)} />
            <TextInput style={styles.input} placeholder='Enter receiver id' onChangeText={(text) => setReceiver(text)} />

            <Text>sender Balance Before: {apiData.senderBalanceBefore}</Text>
            <Text>receiver Balance Before: {apiData.receiverBalanceeBefor}</Text>
            <Text>sender Balance After: {apiData.senderBalanceAfter}</Text>
            <Text>receiver Balance After: {apiData.receiverBalanceAfter}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
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
