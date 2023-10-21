// pages/index.js
import MetaMask from '../components/Metamask.js';
import earnTokens from '../lib/earnTokens.js';
import { useState, useEffect } from 'react';

const Home = () => {
  const [account, setAccount] = useState('');

  const handleConnect = (account) => {
    setAccount(account);
  };

  const handleGameOver = (score) => {
    console.log('handleGameOver called...');
    if (account && score > 1) {
      earnTokens(account, score);
    }
  };

  useEffect(() => {
    // Expose handleGameOver globally when the component mounts
    window.handleGameOver = handleGameOver;
    // Clean up global function when component unmounts
    return () => {
      window.handleGameOver = null;
    };
  }, [account]);  // Ensure the useEffect hook runs again if the account changes


  const startGame = () => {
    window.startGame();
  };

  const stopGame = () => {
    window.stopGame();
  };

  return (
    <div>
      <MetaMask onConnect={handleConnect} />
      <div>
        {account ? `Connected: ${account}` : 'Not Connected'}
      </div>
      <button onClick={startGame}>Start Game</button>
      <button onClick={stopGame}>Stop Game</button>
      <div id="game-container">
        <div id="dino"></div>
        <div id="obstacles"></div>
      </div>
      <div id="score">Score: 0</div>
      <script src="/game.js"></script>
      <link rel="stylesheet" href="/game.css" />
    </div>
  );
};

export default Home;
