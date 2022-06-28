// Coloque aqui suas actions
import {
  ADD_EMAIL,
  REQUEST_DATA_CURRENCIES,
  FAILED_REQUEST,
  GET_CURRENCIES,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SEND_EDIT_TO_GLOBAL,
} from './actionsTypes';

export const addEmailGlobal = (email) => ({
  type: ADD_EMAIL,
  email,
});
export const requestCurrencies = () => ({
  type: REQUEST_DATA_CURRENCIES,
});

export const getCurrencies = (json) => ({
  type: GET_CURRENCIES,
  payload: json,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const sendExpensesToState = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});
export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const sendEditToGlobal = (payload) => ({
  type: SEND_EDIT_TO_GLOBAL,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await response.json();
      return dispatch(getCurrencies(json));
    } catch (error) {
      return dispatch(failedRequest(error.message));
    }
  };
}
