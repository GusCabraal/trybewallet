import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmailGlobal } from '../actions';
import walletLogo from '../img/wallet-figure.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmailGlobal(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const minLength = 6;
    return (
      <div className="main-container">
        <form onSubmit={ this.handleClick } className="login-form">
          <img src={ walletLogo } alt="wallet-logo" className="wallet-logo" />
          <input
            type="text"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            placeholder="Insira seu email"
            data-testid="email-input"
            autoComplete="off"
            className="input-login"
            required
          />
          <input
            type="password"
            value={ password }
            name="password"
            onChange={ this.handleChange }
            data-testid="password-input"
            placeholder="Insira sua senha"
            className="input-login"
          />
          <button
            type="submit"
            className=" btn login-button"
            // Solução com regex encontrada em https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
            disabled={ !(email.match(/\S+@\S+\.\S+/) && password.length >= minLength) }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
  dispatch: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

export default connect()(Login);
