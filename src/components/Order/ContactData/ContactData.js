import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  componentDidMount() {
    console.log('contact data props', this.props);
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    // ".json" is for firebase only
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Samuel Desbos',
        address: {
          street: 'Teststreet 1',
          zipCode: '93000',
          country: 'France'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="your name" />
        <input className={classes.Input} type="email" name="email" placeholder="your email" />
        <input className={classes.Input} type="text" name="street" placeholder="your street" />
        <input className={classes.Input} type="text" name="postal" placeholder="your postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
