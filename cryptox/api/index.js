const express = require('express');
const cors = require('cors');
const {ethers} = require('ethers');

const app = express();

// Enable CORS
app.use(cors('*'));
app.use(express.json())


app.post('/balances', async (req, res) => {
    const { amount, receiver} = req.body;
    console.log(amount, receiver);
  
  try {
    const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/fc531493ede94c64bab557ac727c9361`);
const account1 = '0xA0af072D705ee6fE3aEdA9A35Aa058ffD50de9e7';
const account2 = receiver;
const privateKey = '40ad35b48889dec3f4691018817eda99be960831ecb23dc962fa7370d3b57909';
const wallet = new ethers.Wallet(privateKey, provider);

    const senderBalanceBefore = await provider.getBalance(account1);
    const receiverBalanceBefore = await provider.getBalance(account2);

    const gasPrice = ethers.utils.parseUnits("50", "gwei");
    const tx = await wallet.sendTransaction({
      to: account2,
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();

    const senderBalanceAfter = await provider.getBalance(account1);
    const receiverBalanceAfter = await provider.getBalance(account2);

    const data = {
      senderBalanceBefore: ethers.utils.formatEther(senderBalanceBefore),
      receiverBalanceeBefor: ethers.utils.formatEther(receiverBalanceBefore),
      senderBalanceAfter: ethers.utils.formatEther(senderBalanceAfter),
      receiverBalanceAfter: ethers.utils.formatEther(receiverBalanceAfter),
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 //res.send("hii")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});