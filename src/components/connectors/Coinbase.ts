import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import * as configs from '../../app.config';

const CoinbaseWallet = new WalletLinkConnector({
    url: configs.ALCHEMY_API_KEY,
    appName: "Wallet Test",
    supportedChainIds: [1,3,5]
});

export default CoinbaseWallet;
