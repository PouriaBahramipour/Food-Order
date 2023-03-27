import React from "react";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;
  const totalPriceMeal = props.price * props.amount;
  let tt = 0;
  const onAdd = () => {
    tt = props.price * props.amount;
    console.log(tt.toFixed(2));
    dispatch(
      cartActions.addToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        amount: 1,
      })
    );
  };
  const onRemove = () => {
    dispatch(
      cartActions.removeFromCart({
        id: props.id,
        amount: 1,
      })
    );
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x{props.amount}</span>
          <span className={classes.price}>=</span>
          <span></span>

          <span className={classes.amount}>${totalPriceMeal.toFixed(2)}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
