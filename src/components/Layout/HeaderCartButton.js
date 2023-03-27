import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useSelector } from "react-redux";

const HeaderCartButton = (props) => {
  const amountCart = useSelector((state) => state.cart.cart);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>You Cart</span>
      <span className={classes.badge}>
        {amountCart.reduce((total, meal) => total + meal.amount, 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
