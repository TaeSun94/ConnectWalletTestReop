import { useWeb3React } from '@web3-react/core';
import CoinbaseWallet from './components/connectors/Coinbase.ts';
import WalletConnect from './components/connectors/Walletconnect.ts';
import Injected from './components/connectors/Injected.ts';
import { useEffect, useState } from 'react';

function App() {
  const [network, setNetwork] = useState(undefined);
  const { account, chainId, library, activate, deactivate } = useWeb3React();
  useEffect(() => {
    if(library && account){
      console.log(library);
      console.log(account);
    }
  },[library, account]);
  
  const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  function deactivateHandler() {
    deactivate();
    let isCoinbase = localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses');
    if(isCoinbase) {
        localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
        localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
        localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
        localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
        localStorage.removeItem('-walletlink:https://www.walletlink.org:IsStandaloneSigning');
        window.location.reload();
    }
}

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [toHex(network)]
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => {
          activate(CoinbaseWallet);
        }}>Coinbase</button>
        <button onClick={() => {
          activate(WalletConnect);
        }}>WalletConnect</button>
        <button onClick={() => {
          activate(Injected);
        }}>Metamask</button>
      </div>
      <div>
        Account: {account}
        <br />
        ChainId: {chainId}
        <br />
        <button onClick={deactivateHandler}>disconnect</button>
        <select onChange={handleNetwork}>
          <option value="1">Mainnet</option>
          <option value="5">Goerli</option>
        </select>
        <button onClick={switchNetwork}>Change Network</button>
      </div>
    </div>
  );
}

export default App;
