import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // optimization: we don't need to update its children (OrderSummary) if the modal is not opened
    // second check is for loader
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal}
             style={{
               transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
               opacity: this.props.show ? '1' : '0'
             }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }

};

export default Modal;
