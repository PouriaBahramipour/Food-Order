export const getMealsData = async (url) => {
  const response = await fetch(url);
  if (response.ok === false) {
    throw new Error("Something went wrong!");
  }
  const data = await response.json();
  return data;
};
