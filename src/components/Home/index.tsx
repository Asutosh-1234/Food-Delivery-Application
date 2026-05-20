import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { restaurants } from "../data";
import RestaurantCard from "./ResturantCard";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { menu, ...restaurantData } = item;
          return (
            <RestaurantCard
              restaurant={restaurantData}
              onPress={(id) => navigation.navigate("RestaurantDetails", { id })}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19", // Match the app's dark theme
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
