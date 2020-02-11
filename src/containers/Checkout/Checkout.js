import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {


  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data');
  };

  render() {
    // redirect if no ingredients (ex: if we reload page)
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      // redirect if purchased is completed
      let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}
            ingredients={this.props.ingredients} />
          <Route
            path={this.props.match.path + '/contact-data'}
            // before redux: we had to use the "render" "trick" to pass props
            // now we can use "component" and get datas from the store in ContactData
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};


export default connect(mapStateToProps)(Checkout);
