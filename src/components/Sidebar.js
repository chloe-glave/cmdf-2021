import react, { Component } from 'react';
import PropTypes from 'prop-types';
import placeholderImg from '../assets/hasComfy.png';

class Sidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="sidebar">
                <div>
                    <h1 className="logo-header">App X</h1>
                </div>
                
                <div className="sidebar-img">
                    <img src={placeholderImg}/>
                </div>

                <div className="pocket-section">
                    <h2 className="sidebar-money">Pocket Money: ${this.props.checkingAccountBalance}</h2>
                </div>

                <div>
                    <h2 className="sidebar-money">Net Worth: ${this.props.currentNetWorth}</h2>
                </div>

                <div className="next-month">
                    <button type="button" onClick={this.props.click} className="btn btn-secondary">Next Month</button>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    click: PropTypes.func.isRequired,
};

export default Sidebar;