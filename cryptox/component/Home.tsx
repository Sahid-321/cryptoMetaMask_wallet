import "@ethersproject/shims";
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

export default function Home() {
    const [amount, setAmount] = useState<string>('');
    const [receiver, setReceiver] = useState<string>('');
    const [senderBefore, setSenderBefore] = useState<any>('')
    const [senderAfter, setSenderAfter] = useState<any>('')
    const [receiverBefore, setReceiverBefore] = useState<any>('')
    const [receiverAfter, setReceiverAfter] = useState<any>('')
    const [gasPriceDetail, setGasPriceDetail] = useState<any>('')

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (senderAfter) {
            setLoader(false)
        }
    }, [senderAfter])

    const handleSend = async () => {
          console.log("clicked");
        try {
            const provider = await new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/fc531493ede94c64bab557ac727c9361`);

            const account1 = '0x64040DD45739eb952B8003eF87D9C1d4F347De48'; // Your account address 1
            const account2 = receiver; // Your account address 2 from input suggestion to put this account id "0xAe9Aa11cA2283Be956a8E299A2B578F59A55104E"

            const privateKey1 = '967bcdb3e507ec56e41a0e289a0582fb88e0466fcf89f388bb94147487e802e9'; // Private key of account 1
            const wallet = new ethers.Wallet(privateKey1, provider);

            const main = async () => {
                const senderBalanceBefore = await provider.getBalance(account1);
                const receiverBalanceBefore = await provider.getBalance(account2);

                setSenderBefore(ethers.utils.formatEther(senderBalanceBefore));
                setReceiverBefore(ethers.utils.formatEther(receiverBalanceBefore));

                console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`);
                console.log(`Receiver balance before: ${ethers.utils.formatEther(receiverBalanceBefore)}\n`);

                const gasPrice = ethers.utils.parseUnits("50", "gwei");
                const tx = await wallet.sendTransaction({
                    to: account2,
                    value: ethers.utils.parseEther(amount),
                    gasPrice: gasPrice,
                });

                await tx.wait();
                console.log(`Transaction hash: ${tx.hash}`);
                console.log(`Gas used: ${tx.gasLimit.toString()}`);
                console.log(`Gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")}`);

                const senderBalanceAfter = await provider.getBalance(account1);
                const receiverBalanceAfter = await provider.getBalance(account2);

                setSenderAfter(ethers.utils.formatEther(senderBalanceAfter));
                setReceiverAfter(ethers.utils.formatEther(receiverBalanceAfter));
                setGasPriceDetail(ethers.utils.formatUnits(gasPrice, "gwei"));

                console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`);
                console.log(`Receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}\n`);
            };

            main();
            setLoader(true);

        } catch (error) {
            console.log(error, "error")
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
                    <Text><Text style={[styles.text, { color: "orange" }]}>Sender Balance Before: </Text>{senderBefore}</Text>
                    <Text><Text style={[styles.text, { color: "orange" }]}>Receiver Balance Before: </Text>{receiverBefore}</Text>
                    <Text style={{ color: "green" }}>---------------------------------------</Text>
                    <Text><Text style={[styles.text, { color: "green" }]}>Sender Balance After: </Text>{senderAfter}</Text>
                    <Text><Text style={[styles.text, { color: "green" }]}>Receiver Balance After: </Text>{receiverAfter}</Text>
                    <Text><Text style={[styles.text, { color: "orange" }]}>GasPrice: </Text>{gasPriceDetail} gwei</Text>

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
    text: {
        fontSize: screenWidth * 0.04,
        fontWeight: 'bold',
        color: "black",
    }
});
