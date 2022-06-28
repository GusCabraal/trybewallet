import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchCurrencies, sendExpensesToState, sendEditToGlobal } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  tag: 'Alimentação',
  method: 'Dinheiro',
  currency: 'USD',
};
class Form extends React.Component {
  state = {
    ...INITIAL_STATE,
    id: 0,
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
  }

  shouldComponentUpdate(nextProps) {
    const { editor, idToEdit, expenseToEdit } = nextProps;
    const { id } = this.state;
    if (editor && id !== idToEdit) {
      this.setState(expenseToEdit);
      return true;
    }
    return true;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  addItemToTable = async (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const rates = await dispatch(fetchCurrencies());

    this.setState(({ exchangeRates: rates.payload, id: expenses.length }));

    dispatch(sendExpensesToState(this.state));
    this.setState(({
      ...INITIAL_STATE,
      id: expenses.length + 1,
    }));
  };

  editItemList = (event) => {
    event.preventDefault();
    const { dispatch, expenses, idToEdit } = this.props;
    const expenseToEdit = expenses.find((element) => element.id === idToEdit);
    const estadoFiltrado = { ...this.state };
    delete estadoFiltrado.exchangeRates;
    const novaDespesa = { ...expenseToEdit, ...estadoFiltrado };
    dispatch(sendEditToGlobal(novaDespesa));
  };

  render() {
    const { currencies, methods, tags, editor } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <form
        className="form-wallet"
        onSubmit={ editor ? this.editItemList : this.addItemToTable }
      >
        <label htmlFor="value">
          Valor
          <input
            type="number"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
            name="value"
            autoComplete="off"
            placeholder="Ex: 10,00"
            className="input-form"
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            id="description"
            data-testid="description-input"
            placeholder="Ex: Cachorro quente"
            value={ description }
            onChange={ this.handleChange }
            name="description"
            autoComplete="off"
            className="input-form"
          />
        </label>
        <label htmlFor="currencies">
          Moeda
          <select
            value={ currency }
            onChange={ this.handleChange }
            id="currencies"
            name="currency"
            className="input-select"
          >
            {currencies.map((currencyName) => (
              <option
                value={ currencyName }
                key={ currencyName }
              >
                {currencyName}
              </option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            name="method"
            className="input-select"
          >
            {methods.map((methodName) => (
              <option
                key={ methodName }
                value={ methodName }
              >
                {methodName}
              </option>))}
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            name="tag"
            data-testid="tag-input"
            className="input-select"
          >
            {tags.map((tagName) => (
              <option
                key={ tagName }
                value={ tagName }
              >
                {tagName}
              </option>))}
          </select>
        </label>
        <button
          type="submit"
          className="btn form-button"
          disabled={ !(value && description) }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  methods: state.data.methods,
  tags: state.data.tags,
  expenseToEdit: state.wallet.expenseToEdit,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  methods: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Form);
