import { ConnectWallet } from '../components/ConnectWallet'

const Header = () => {
 
    return (
        <div className="App">
            <header className="App-Header">
                <button onClick={ConnectWallet}>
                    Connect Wallet
                </button>
            </header>
        </div>
    );
}

export default Header;