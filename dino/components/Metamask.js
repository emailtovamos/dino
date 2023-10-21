// components/MetaMask.js
import { useState } from 'react';
import { ethers } from 'ethers';

const MetaMask = ({ onConnect }) => {
  const handleConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log(window.ethereum)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        onConnect(accounts[0]);  // Pass the account to the parent component
      } catch (error) {
        alert('Failed to connect to MetaMask');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect to MetaMask</button>
    </div>
  );
};

export default MetaMask;
