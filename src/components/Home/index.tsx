import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { restaurants } from "../data";
import RestaurantCard from "./ResturantCard";
import RestaurantDetails from "./ResturantDetails";

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/" component={HomeScreen} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
    </Stack.Navigator>
  );
}

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
