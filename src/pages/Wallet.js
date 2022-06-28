import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Form from '../components/Form';
import Table from '../components/Table';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps)(Wallet);
