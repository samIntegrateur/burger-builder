import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const checkout = (props) => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('checkout/contact-data');
  };

  // redirect if no ingredients (ex: if we reload page)
  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    // redirect if purchased is completed
    let purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler}
          ingredients={props.ingredients} />
        <Route
          path={props.match.path + '/contact-data'}
          // before redux: we had to use the "render" "trick" to pass props
          // now we can use "component" and get datas from the store in ContactData
          component={ContactData} />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};


export default connect(mapStateToProps)(checkout);
