import React from "react";
import calsses from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={calsses.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={calsses.description}>{props.description}</div>
        <div className={calsses.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} name={props.name} price={props.price} />
      </div>
    </li>
  );
};

export default MealItem;
