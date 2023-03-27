import React, { useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaelActions } from "../../store";
import { getMealsData } from "../../API/API";

const AvailableMeals = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        dispatch(fetchMaelActions.setLoading(true));
        const data = await getMealsData(
          "https://food-order-app-ee33d-default-rtdb.firebaseio.com/meals.json"
        );
        dispatch(fetchMaelActions.setData(data));
      } catch (error) {
        dispatch(fetchMaelActions.setError(error.message));
      }
      dispatch(fetchMaelActions.setLoading(false));
    };
    fetchMeals();
  }, [dispatch]);

  const {
    data: mealData,
    isLoading,
    error,
  } = useSelector((state) => state.fetchMeals);

  const loadedItem = [];

  for (const key in mealData) {
    loadedItem.push({
      id: key,
      name: mealData[key].name,
      description: mealData[key].description,
      price: mealData[key].price,
    });
  }
  const MealsList = loadedItem.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {error && (
          <section className={classes.mealsError}>
            <h2>{error}</h2>
          </section>
        )}
        {isLoading && <div className={classes.loader}></div>}
        {!isLoading && <ul>{MealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
