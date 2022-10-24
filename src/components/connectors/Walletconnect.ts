import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import * as configs from '../../app.config';

const WalletConnect = new WalletConnectConnector({
    rpc: {
        1: configs.ALCHEMY_API_KEY
    },
    qrcode: true,
});

export default WalletConnect;
