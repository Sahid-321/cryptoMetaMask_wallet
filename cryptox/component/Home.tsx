import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert , Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

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
                    <Text><Text style={styles.text}>Sender Balance Before: </Text>{apiData.senderBalanceBefore}</Text>
                    <Text><Text style={styles.text}>Receiver Balance Before: </Text>{apiData.receiverBalanceeBefor}</Text>
                    <Text style={{color: "green"}}>---------------------------------------</Text>
                    <Text><Text style={styles.text}>Sender Balance After: </Text>{apiData.senderBalanceAfter}</Text>
                    <Text><Text style={styles.text}>Receiver Balance After: </Text>{apiData.receiverBalanceAfter}</Text>
                    <Text><Text style={styles.text}>GasPrice: </Text>{apiData.gasPrice}</Text>

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
        fontSize: screenWidth * 0.06,
        fontWeight: 'bold',
        marginBottom: screenWidth * 0.04
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: screenWidth * 0.025,
        marginBottom: screenWidth * 0.025,
        width: screenWidth * 0.8,
        borderRadius: screenWidth * 0.025
    },
    button: {
        backgroundColor: '#007AFF',
        padding: screenWidth * 0.025,
        borderRadius: screenWidth * 0.025,
        marginTop: screenWidth * 0.05
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.04,
    },
    text:{
        fontSize: screenWidth * 0.04,
        fontWeight: 'bold',
        color:"black",
    }
});
