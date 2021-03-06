import React, { useCallback, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DefaultText from "../components/DefaultText";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { toggleFavorite } from "../store/mealAction";
import HeaderButton from "../components/HeaderButton";
const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};
const MealDetailScreen = props => {
  const mealId = props.route.params.mealId;
  const avaailableMeals = useSelector(state => state.meals.meals);
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );
  const selectedMeal = avaailableMeals.find(meal => meal.id === mealId);
  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  props.navigation.setOptions({
    title: selectedMeal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={currentMealIsFavorite ? "ios-star" : "ios-star-outline"}
          onPress={() => {
            toggleFavoriteHandler();
          }}
        />
      </HeaderButtons>
    )
  });
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text>List of Ingredients</Text>
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}

      <Text>List Of Steps</Text>
    </ScrollView>
  );
};
// MealDetailScreen.setOptions = navigationData => {
//   const mealId = props.route.params.mealId;
//   const selectedMeal = MEALS.find(meal => meal.id === mealId);

//   return {
//    title: selectedMeal.title,
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item title="Favourite" iconName="ios-star" onPress={()=>{

//         }} />
//       </HeaderButtons>
//     )
//   };
// };
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  detail: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "lato-bold",
    fontSize: 22,
    textAlign: "center"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  }
});
export default MealDetailScreen;
