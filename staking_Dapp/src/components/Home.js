import React, {Component} from 'react';

// Importamos nuestros contratos
import TechToken from '../abis/TechToken.json';
import CatellaToken from '../abis/CatellaToken.json';
import TokenFarm from '../abis/TokenFarm.json';

// web3js para acceder a la blockchain
import Web3 from 'web3';

import Navigation from './Navbar';
import MyCarousel from './Carousel';

class App extends Component {
    async componentDidMount() {
        // 1. Carga de Web3
        await this.loadWeb3();
        // 2. Carga de datos de la Blockchain
        await this.loadBlockchainData();
    }

    // 1. Carga de Web3
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            console.log('Accounts: ', accounts);
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('¡Deberías considerar usar Metamask!');
        }
    }

    // 2. Carga de datos de la Blockchain
    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]});
        console.log('Account 0: ', accounts[0]);
        // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
        const networkId = await web3.eth.net.getId();
        console.log('networkid:', networkId);

        // Carga del TechToken
        const techTokenData = TechToken.networks[networkId];
        console.log(techTokenData);
        if (techTokenData) {
            const techToken = new web3.eth.Contract(
                TechToken.abi,
                techTokenData.address
            );
            this.setState({techToken: techToken});
            let techTokenBalance = await techToken.methods
                .balanceOf(this.state.account)
                .call();
            this.setState({techTokenBalance: techTokenBalance.toString()});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            loading: true,
            techToken: {},
            techTokenBalance: '0',
        };
    }

    render() {
        return (
            <div>
                <Navigation account={this.state.account} />
                <MyCarousel />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main
                            role="main"
                            className="col-lg-12 d-flex text-center"
                        >
                            <div className="content mr-auto ml-auto">
                                <h2>
                                    Staking DApp (Autor:{' '}
                                    <a href="https://github.com/gab0071">
                                        CatellaTech✨⛓
                                    </a>
                                    )
                                </h2>
                                <p>
                                    Edita <code>src/components/App.js</code> y
                                    guarda para recargar.
                                </p>
                                <a
                                    className="App-link"
                                    href="https://github.com/gab0071"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ¡APRENDE BLOCKCHAIN{' '}
                                    <u>
                                        <b>AHORA! </b>
                                    </u>
                                </a>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
