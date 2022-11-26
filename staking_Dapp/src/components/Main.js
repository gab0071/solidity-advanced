import React, {Component} from 'react';
import tech from '../eth.png';
import '../style.css';

class Main extends Component {
    render() {
        return (
            <div id="content" className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="texto" scope="col">
                                Balance de Staking
                            </th>
                            <th className="texto" scope="col">
                                Balance de recompensas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="ltexto">
                            <td>
                                {window.web3.utils.fromWei(
                                    this.props.stakingBalance,
                                    'Ether'
                                )}{' '}
                                TECH
                            </td>
                            <td>
                                {window.web3.utils.fromWei(
                                    this.props.catellaTokenBalance,
                                    'Ether'
                                )}{' '}
                                ELLA{' '}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="card mb-4">
                    <div className="card-body">
                        <form
                            className="mb-3"
                            onSubmit={(event) => {
                                event.preventDefault();
                                let amount;
                                amount = this.input.value.toString();
                                amount = window.web3.utils.toWei(
                                    amount,
                                    'Ether'
                                );
                                this.props.stakeTokens(amount);
                            }}
                        >
                            <div>
                                <label className="stake">
                                    <b>Stake Tokens</b>
                                </label>
                                <span className="balance">
                                    <b>Balance: </b>
                                    {window.web3.utils.fromWei(
                                        this.props.techTokenBalance,
                                        'Ether'
                                    )}
                                </span>
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    ref={(input) => {
                                        this.input = input;
                                    }}
                                    className="from-control form-control-lg"
                                    placeholder="0"
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <img src={tech} height="32" alt="" />
                                        &nbsp;&nbsp;&nbsp; TECH
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="d-grid gap-2 d-md-block">
                            <button type="submit" className="btn btn-primary ">
                                HACER STAKE
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type="submit"
                                className="btn btn-danger "
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.unstakeTokens();
                                }}
                            >
                                {' '}
                                RETIRAR STAKE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
