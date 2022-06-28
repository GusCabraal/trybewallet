import {
  ADD_EXPENSES,
  EDIT_EXPENSE,
  FAILED_REQUEST,
  GET_CURRENCIES,
  REMOVE_EXPENSE,
  REQUEST_DATA_CURRENCIES,
  SEND_EDIT_TO_GLOBAL,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  expenseToEdit: {},
};
const wallet = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_DATA_CURRENCIES:
    return { ...state };
  case GET_CURRENCIES:
    return { ...state,
      currencies: Object.keys(payload)
        .filter((currencie) => currencie !== 'USDT'),
    };
  case FAILED_REQUEST:
    return { ...state, error: payload };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
      expenseToEdit: state.expenses.find(({ id }) => id === payload),
    };
  case SEND_EDIT_TO_GLOBAL:
    return {
      ...state,
      editor: false,
      expenses: state.expenses
        .map((expense) => (expense.id === payload.id ? payload : expense)),
    };
  default:
    return state;
  }
};

export default wallet;
