import { ConnectWallet } from '../components/ConnectWallet'

const Header = () => {
 
    return (
        <div className="App">
            <header className="App-Header">
                <h1>Web3Modal Connection</h1>
                <button onClick={ConnectWallet}>
                    Connect Wallet
                </button>
            </header>
        </div>
    );
}