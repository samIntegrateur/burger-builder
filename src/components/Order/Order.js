import React from 'react';
import classes from './Order.css'

const order = (props) => {

  // alternative to Burger's way
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientOutput = ingredients.map(ig => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc'
      }}
      key={ig.name}>
        {ig.name}({ig.amount})
    </span>;
  });

  // my attempt
 // let transformedIngredients = Object.keys(props.ingredients)
 //   .map(key => {
 //     return (
 //       <span>{key} ({props.ingredients[key]})</span>
 //     );
 //   }).reduce((accumulator, currentValue) => {
 //     return (
 //       [...accumulator, currentValue]
 //     )
 //   }, []);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
