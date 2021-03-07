import React from 'react';
import MutualFunds from './MutualFunds';
import Stocks from './Stocks';

import Sidebar from './Sidebar';
import CashAccount from "./accounts/CashAccount";
import GIC from "./GIC";

class Driver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingAccountBalance: 100.00,
            currentNetWorth: 100.00,
            currentMonth: 0, // months go from 0-95 for gameplay between 10 and 18 years of age (8yr * 12mo = 96mo)
            savingsAccountBalance: 0,
            savingsInterestRate: 0.005,
            tfsaAccountBalance: 0,
            tfsaInterestRate: 0.008,
            tfsaContributionRoom: 8000,
            // add more values as needed
        };
    }

    // Add money from checking acc into savings
    addBalanceSavings = (amount) => {
        if (amount > this.state.checkingAccountBalance) {
            console.log("Not enough money for this transaction!"); // todo: visually display this
            return;
        }
        this.setState({
            checkingAccountBalance: this.state.checkingAccountBalance - amount,
            savingsAccountBalance: this.state.savingsAccountBalance + amount
        });
    };

    // Add money from savings acc into checking
    subtractBalanceSavings = (amount) => {
        if (amount > this.state.savingsAccountBalance) {
            console.log("Not enough money for this transaction!"); // todo: visually display this
            return;
        }
        this.setState({
            checkingAccountBalance: this.state.checkingAccountBalance + amount,
            savingsAccountBalance: this.state.savingsAccountBalance - amount
        });
    };

    // Add money from checking acc into TFSA
    addBalanceTFSA = (amount) => {
        if (amount > this.state.checkingAccountBalance) {
            console.log("Not enough money for this transaction!"); // todo: visually display this
            return;
        }
        if (amount + this.state.tfsaAccountBalance > this.state.tfsaContributionRoom) {
            console.log("Not enough contribution room for this transaction!");
            return;
        }

        this.setState({
            checkingAccountBalance: this.state.checkingAccountBalance - amount,
            tfsaAccountBalance: this.state.tfsaAccountBalance + amount
        });
    };

    // Add money from TFSA acc into checking
    subtractBalanceTFSA = (amount) => {
        if (amount > this.state.tfsaAccountBalance) {
            console.log("Not enough money for this transaction!"); // todo: visually display this
            return;
        }
        this.setState({
            checkingAccountBalance: this.state.checkingAccountBalance + amount,
            tfsaAccountBalance: this.state.tfsaAccountBalance - amount
        });
    };

    // Add interest to cash accounts at the end of the month
    monthlyCompoundInterestCashAccounts() {
        let savingsInterest = (this.state.savingsAccountBalance * this.state.savingsInterestRate) / 12;
        let tfsaInterest = (this.state.tfsaAccountBalance * this.state.tfsaInterestRate) / 12;
        this.setState({
            savingsAccountBalance: this.state.savingsAccountBalance + savingsInterest,
            tfsaAccountBalance: this.state.tfsaAccountBalance + tfsaInterest
        });
    }

    // receive a base amount each month. todo: get different amounts based on random events?
    monthlyGetAllowance() {
        this.setState({
            checkingAccountBalance: this.state.checkingAccountBalance + 50.0
        });
    }

    // do all monthly functions
    moveToNextMonth = () => {
        this.monthlyCompoundInterestCashAccounts();
        this.monthlyGetAllowance();
    };


    render() {
        return (
            <div className={'Driver'}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                        <Sidebar 
                        checkingAccountBalance={this.state.checkingAccountBalance.toFixed(2)}
                        currentNetWorth={this.state.currentNetWorth.toFixed(2)}
                        currentMonth={this.state.currentMonth}
                        changeMonthButtonOnClick={this.moveToNextMonth}
                        />
                        </div>

                        <div className="col-sm">
                        <CashAccount
                            accountTypeIsTFSA={false}
                            savingsAccountBalance={this.state.savingsAccountBalance.toFixed(2)}
                            addBalanceSavingsOnClick={this.addBalanceSavings}
                            subtractBalanceSavingsOnClick={this.subtractBalanceSavings}
                            addBalanceTFSAOnClick={this.addBalanceTFSA}
                            subtractBalanceTFSAOnClick={this.subtractBalanceTFSA}
                        />
                        <CashAccount
                            accountTypeIsTFSA={true}
                            tfsaAccountBalance={this.state.tfsaAccountBalance.toFixed(2)}
                            tfsaContributionRoom={this.state.tfsaContributionRoom.toFixed(2)}
                            addBalanceSavingsOnClick={this.addBalanceSavings}
                            subtractBalanceSavingsOnClick={this.subtractBalanceSavings}
                            addBalanceTFSAOnClick={this.addBalanceTFSA}
                            subtractBalanceTFSAOnClick={this.subtractBalanceTFSA}
                        />
                        <GIC />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">

                        </div>

                        <div className="col-md-4" style={{paddingTop: "10px"}}>
                            <MutualFunds />
                        </div>

                        <div className="col-md-4" style={{paddingTop: "10px"}}>
                            <Stocks />
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Driver;
