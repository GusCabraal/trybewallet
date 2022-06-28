import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletLogo from '../img/wallet-figure.png';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header-container">
        <section className="logo-header-container">
          <img src={ walletLogo } alt="wallet-logo" className="wallet-logo" />
          <h2 className="header-title">
            TR
            <span>Y</span>
            BEWALLET
          </h2>
        </section>
        <section className="user-header-container">
          <span className="material-symbols-outlined">
            account_circle
          </span>
          <span data-testid="email-field">
            {email}
          </span>
          <div className="total-currency">
            <span className="material-symbols-outlined">
              payments
            </span>
            <span data-testid="total-field">
              {expenses
                .reduce((result, {
                  value: soma,
                  currency: moeda,
                  exchangeRates,
                }) => result + Number(soma) * Number(exchangeRates[moeda].ask), 0)
                .toFixed(2)}
            </span>
            <span data-testid="header-currency-field">
              {' '}
              BRL
            </span>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
export default connect(mapStateToProps)(Header);
