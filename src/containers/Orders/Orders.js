import React, {useEffect} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/'
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props) => {

  const {onFetchOrders} = props;

  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  },[onFetchOrders]);

  let orders = <Spinner />;

  if (!props.loading) {
    if (props.orders.length) {
      orders = (
        props.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })
      );
    } else {
      orders = <p>No orders</p>;
    }

  }

  return (
    <div>
      {orders}
    </div>
  );

};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
