import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../components/Order/ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    // get ingredients from queryparams and convert it to our format
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      console.log(param);
      if (param[0] === 'price') {
        price = param[1];
      } else {
        // + to convert it to a number
        ingredients[param[0]] = +param[1];
      }

    }
    this.setState({ingredients: ingredients, price: price})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.state.ingredients} />
          <Route
            path={this.props.match.path + '/contact-data'}
            render={(props) => (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.price}
                {...props}
              />
              )} />
      </div>
    );
  }
}

export default Checkout;
