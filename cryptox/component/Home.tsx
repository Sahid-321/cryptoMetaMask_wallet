import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

const { ethers } = require("ethers");
export default function Home() {
const [amount, setAmount] = useState('');
const [receiver, setReceiver] = useState('');
// ether logic

const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/fc531493ede94c64bab557ac727c9361`);

const account1 = '0xA0af072D705ee6fE3aEdA9A35Aa058ffD50de9e7'; // Your account address 1
const account2 = '0x64040DD45739eb952B8003eF87D9C1d4F347De48'; // Your account address 2

const privateKey1 = '40ad35b48889dec3f4691018817eda99be960831ecb23dc962fa7370d3b57909'; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account1);
  const receiverBalanceBefore = await provider.getBalance(account2);

  console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`);
  console.log(`Receiver balance before: ${ethers.utils.formatEther(receiverBalanceBefore)}\n`);

  const gasPrice = ethers.utils.parseUnits("50", "gwei");
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.0025"),
    gasPrice: gasPrice,
  });

  await tx.wait();
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Gas used: ${tx.gasLimit.toString()}`);
  console.log(`Gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")}`);

  const senderBalanceAfter = await provider.getBalance(account1);
  const receiverBalanceAfter = await provider.getBalance(account2);

  console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`);
  console.log(`Receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}\n`);
};

useEffect(()=>{
    main()
},[])

//end ether logic


const handleSend = ()=>{
    Alert.alert(amount)
}
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CryptoX Wallet</Text>
            <TextInput style={styles.input} placeholder='Enter Amount' onChangeText={(text)=> setAmount(text)} />
            <TextInput style={styles.input} placeholder='Enter receiver id' onChangeText={(text)=> setReceiver(text)} />
{/* 
<Text>{`Sender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`}</Text> */}

            <TouchableOpacity style={styles.button} onPress={handleSend}>
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
