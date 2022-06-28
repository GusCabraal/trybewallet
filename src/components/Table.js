import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions';

class Table extends React.Component {
  removeItem = (id) => {
    const { removeExpenseDispatch } = this.props;
    removeExpenseDispatch(id);
  };

  editItem = (id) => {
    const { editExpenseDispatch } = this.props;
    editExpenseDispatch(id);
  };

  render() {
    const { headTable, expenses } = this.props;
    return (
      <table className="table-container">
        <thead>
          <tr>
            {headTable.map((item) => (
              <th key={ item }>
                {item}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            description,
            tag,
            method,
            value,
            id,
            currency,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{(exchangeRates[currency].name.split('/')[0])}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{(Number(exchangeRates[currency].ask) * Number(value)).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editItem(id) }
                  className="material-symbols-outlined table-button"
                >
                  edit
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.removeItem(id) }
                  className="material-symbols-outlined table-button"
                >
                  delete
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  headTable: state.data.headTable,
});
const mapDispatchToProps = (dispatch) => ({
  removeExpenseDispatch: (id) => dispatch(removeExpense(id)),
  editExpenseDispatch: (id) => dispatch(editExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  headTable: PropTypes.arrayOf(PropTypes.string),
  removeExpenseDispatch: PropTypes.func,
  editExpenseDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
