import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

  return (props) => {

    // having moved the logic into a hook allows us to use it for this modal,
    // but eventually for any other ui
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );

  }
};

export default withErrorHandler;
