import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function Home() {
    const [amount, setAmount] = useState<string>('');
    const [receiver, setReceiver] = useState<string>('');
    const [apiData, setApiData] = useState([])
    const [loader, setLoader] = useState(false);
    const objToPassInApi = {
        amount,
        receiver
    }
    useEffect(() => {
        if (apiData) {
            setLoader(false)
        }
    }, [apiData])

    const handleSend = async () => {
        if (amount == '' || receiver == '') {
            Alert.alert("Please fill input field")
        } else {
            setLoader(true);
            await axios.post<{ data: any }>('http://192.168.1.72:3000/balances', objToPassInApi)
                .then(({ data }) => setApiData(data))
                .catch((err) => console.log(err));


        }


    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CryptoX Wallet</Text>
            <TextInput style={styles.input} placeholder='Enter Amount less than 0.0025' onChangeText={(text) => setAmount(text)} />
            <TextInput style={styles.input} placeholder='Enter receiver id' onChangeText={(text) => setReceiver(text)} />


            {loader ? <View>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Wait 30-40seconds while the transaction complete</Text>
            </View> :
                <View>
                    <Text>sender Balance Before: {apiData.senderBalanceBefore}</Text>
                    <Text>receiver Balance Before: {apiData.receiverBalanceeBefor}</Text>
                    <Text>sender Balance After: {apiData.senderBalanceAfter}</Text>
                    <Text>receiver Balance After: {apiData.receiverBalanceAfter}</Text>
                    <Text>gasPrice: {apiData.gasPrice}</Text>

                </View>}



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
