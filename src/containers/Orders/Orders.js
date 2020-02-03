import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {

  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        // convert orders json response to an array, adding the unique key
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchOrders});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    let orders = <p>No orders</p>;

    if (this.state.orders.length) {
      orders = (
        this.state.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })
      );
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
