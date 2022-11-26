import React, {Component} from 'react';

// Importamos nuestros contratos
import TechToken from '../abis/TechToken.json';
import CatellaToken from '../abis/CatellaToken.json';
import TokenFarm from '../abis/TokenFarm.json';

// web3js para acceder a la blockchain
import Web3 from 'web3';

// Accediendo a los componentes de la Dapp
import Navigation from './Navbar';
import MyCarousel from './Carousel';
import Main from './Main';
import  '../style.css';

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

        // Carga del TechToken -> Token para hacer staking
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
            console.log(techTokenBalance);
            this.setState({techTokenBalance: techTokenBalance.toString()});
        } else {
            window.alert('Tech token no se ha desplegado en la red');
        }

        // Carga de CatellaToken -> Token de recompesa
        const catellaTokenData = CatellaToken.networks[networkId];
        console.log(catellaTokenData);
        if (catellaTokenData) {
            const catellaToken = new web3.eth.Contract(
                TechToken.abi,
                catellaTokenData.address
            );
            this.setState({catellaToken: catellaToken});
            let catellaTokenBalance = await catellaToken.methods
                .balanceOf(this.state.account)
                .call();
            console.log(catellaTokenBalance);
            this.setState({
                catellaTokenBalance: catellaTokenBalance.toString(),
            });
        } else {
            window.alert('Catella token no se ha desplegado en la red');
        }

        // Carga de TokenFarm -> smart contract de la gestion de la DeFi
        const tokenFarmData = TokenFarm.networks[networkId];
        if (tokenFarmData) {
            const tokenFarm = new web3.eth.Contract(
                TokenFarm.abi,
                tokenFarmData.address
            );
            this.setState({tokenFarm: tokenFarm});
            let stakingBalance = await tokenFarm.methods
                .stakingBalance(this.state.account)
                .call();
            console.log(stakingBalance);
            this.setState({stakingBalance: stakingBalance.toString()});
        } else {
            window.alert('Token Farm no se ha desplegado en la red');
        }

        this.setState({loading: false});
    }

    // funcion para hacer staking del token TechToken
    stakeTokens = (amount) => {
        this.setState({loading: true});
        this.state.techToken.methods
            .approve(this.state.tokenFarm._address, amount)
            .send({from: this.state.account})
            .on('transactionHash', (hash) => {
                this.state.tokenFarm.methods
                    .stakeTokens(amount)
                    .send({from: this.state.account})
                    .on('transactionHash', (hash) => {
                        this.setState({loading: false});
                    });
            });
    };

    // Funcion para hacer unstaking de nuestros tokens
    unstakeTokens = (amount) => {
        this.setState({loading: true});
        this.state.tokenFarm.methods
            .unstakeTokens()
            .send({from: this.state.account})
            .on('transactionHash', (hash) => {
                this.setState({loading: false});
            });
    };

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            loading: true,
            techToken: {},
            techTokenBalance: '0',
            catellaToken: {},
            catellaTokenBalance: '0',
            tokenFarm: {},
            stakingBalance: '0',
        };
    }

    render() {
        let content;
        if (this.state.loading) {
            content = (
                <p id="loader" className="text-center">
                    Loading...
                </p>
            );
        } else {
            content = (
                <Main
                    techTokenBalance={this.state.techTokenBalance}
                    catellaTokenBalance={this.state.catellaTokenBalance}
                    stakingBalance={this.state.stakingBalance}
                    stakeTokens={this.stakeTokens}
                    unstakeTokens={this.unstakeTokens}
                />
            );
        }
        return (
            <div>
                <Navigation account={this.state.account} />
                <div className="container-fluid mt-5">
                    <div className="row">
                    <h1 className='tittle'>Staking Dapp</h1>
                        <main
                            role="main"
                            className="col-lg-12 d-flex text-center"
                        >
                            <div className="content mr-auto ml-auto">
                                {content}
                                
                                <h5 className='author'>
                                    Staking DApp (Autor:{' '}
                                    <a href="https://github.com/gab0071">
                                        CatellaTech✨⛓
                                    </a>
                                    )
                                </h5>
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
                        &nbsp; &nbsp; &nbsp; &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
