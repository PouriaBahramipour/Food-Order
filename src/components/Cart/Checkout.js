import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isFiveChar = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCode,
      });
    }
    //submit the cart data
    props.onConfirm({
      name: enteredName,
      steet: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlInput = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlInput = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const cityControlInput = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const postalCodeControlInput = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlInput}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div className={streetControlInput}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={postalCodeControlInput}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please Enter a Valid Postal Code(5 characters long)!</p>
        )}
      </div>
      <div className={cityControlInput}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
