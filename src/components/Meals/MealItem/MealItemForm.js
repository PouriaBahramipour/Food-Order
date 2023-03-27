import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const dispatch = useDispatch();
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      cartActions.addToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        amount: +amountInputRef.current.value,
      })
    );
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
