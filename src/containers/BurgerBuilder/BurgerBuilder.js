import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import axios from '../../axios-orders';


const burgerBuilder = props => {

  const [isPurchasing, setIsPurchasing] = useState(false);

  // alternative to connect : useDispatch / useSelector (react-redux v7+)
  // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700430#overview
  const dispatch = useDispatch();

  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));

  // as a dependency of our useEffect, it creates an infinite loop
  // we prevent this with useCallback that won't recreate this on every re-render
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);

  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirect = (path) => dispatch(actions.setAuthRedirectPath(path));

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return (sum > 0);
  };


  const purchaseHandler = () => {
    if (isAuthenticated) {
      setIsPurchasing(true);
    } else {
      onSetAuthRedirect('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setIsPurchasing(false);
  };

  const purchaseContinuedHandler = () => {
    // init this in order to redirect in checkout when it's completed
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients cant be loaded</p> : <Spinner/>;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ingredients)}
          price={totalPrice}
          isAuth={isAuthenticated}
          ordered={purchaseHandler} />
      </Aux>
    );

    orderSummary = <OrderSummary
      ingredients={ingredients}
      totalPrice={totalPrice}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinuedHandler}
    />;
  }


  return (
   <Aux>
     <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
       {orderSummary}
     </Modal>
     {burger}
   </Aux>
  );
};

export default withErrorHandler(burgerBuilder, axios);
