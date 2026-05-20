import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { restaurants } from "../data";
import RestaurantCard from "../Home/ResturantCard";

const categories = ["All", "Indian", "Burgers", "Pizza", "Desserts", "Chinese"];

const SearchIndex = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering logic
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.menu.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesCategory =
      selectedCategory === "All" ||
      restaurant.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Search</Text>
            <Text style={styles.headerSubtitle}>What are you craving today?</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search restaurants, dishes..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Categories */}
          <View style={styles.categoriesWrapper}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.categoriesList}
              renderItem={({ item }) => {
                const isActive = selectedCategory === item;
                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryChip,
                      isActive && styles.activeCategoryChip,
                    ]}
                    onPress={() => setSelectedCategory(item)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.activeCategoryText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Results */}
          <FlatList
            data={filteredRestaurants}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const { menu, ...restaurantData } = item;
              return (
                <RestaurantCard
                  restaurant={restaurantData}
                  onPress={(id) => navigation.navigate("RestaurantDetails", { id })}
                />
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="restaurant-outline" size={64} color="#334155" />
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptySubtitle}>
                  Try searching for something else!
                </Text>
              </View>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SearchIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#F8FAFC",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#94A3B8",
    marginTop: 4,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "500",
  },
  categoriesWrapper: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  activeCategoryChip: {
    backgroundColor: "rgba(255, 102, 0, 0.15)",
    borderColor: "rgba(255, 102, 0, 0.3)",
  },
  categoryText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "#FF6600",
  },
  resultsList: {
    paddingHorizontal: 20,
    paddingBottom: 100, // accommodate bottom tab bar
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyTitle: {
    color: "#F1F5F9",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
  },
  emptySubtitle: {
    color: "#64748B",
    fontSize: 15,
    marginTop: 8,
  },
});