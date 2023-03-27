import React, { Fragment, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { cartActions } from "../../store";

const Cart = (props) => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmiting, setDidSubmiting] = useState(false);

  const { cart, hasItem } = useSelector((state) => state.cart);

  const hasItemState = cart.length > 0;

  if (hasItemState) {
    dispatch(cartActions.hasItemHandler(true));
  } else {
    dispatch(cartActions.hasItemHandler(false));
  }

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const totalPrice = cart.reduce(
    (total, meal) => total + meal.price * meal.amount,
    0
  );

  const submitOrderHandler = async (userInformation) => {
    setIsSubmiting(true);
    await fetch(
      "https://food-order-app-ee33d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userInformation,
          orderItem: cart,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmiting(true);
    dispatch(cartActions.clearCart([]));
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {CartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        {hasItem && <span>${totalPrice.toFixed(2)}</span>}
      </div>

      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onCloseCart} />
      )}
      {!isCheckout && modalAction}
    </Fragment>
  );

  const isSubmittingModalContent = <p>sending oreder data...</p>;
  const didSubmittingModalContent = (
    <Fragment>
      <p>successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {!isSubmiting && !didSubmiting && cartModalContent}
      {isSubmiting && isSubmittingModalContent}
      {!isSubmiting && didSubmiting && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
