import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const orderHistory = [
  {
    id: "ORD-9821A",
    restaurant: "Burger Factory",
    date: "Today, 1:30 PM",
    items: "1x Classic Beef Burger, 1x French Fries",
    total: 428,
    status: "Arriving in 15 mins",
    statusColor: "#F59E0B",
    icon: "bicycle",
  },
  {
    id: "ORD-7102B",
    restaurant: "Pizza Hub",
    date: "Yesterday, 8:45 PM",
    items: "1x Margherita Pizza, 1x Garlic Breadsticks",
    total: 508,
    status: "Delivered",
    statusColor: "#22C55E",
    icon: "checkmark-circle",
  },
  {
    id: "ORD-3024C",
    restaurant: "Sweet Cravings",
    date: "May 18, 4:15 PM",
    items: "2x Chocolate Lava Cake",
    total: 398,
    status: "Delivered",
    statusColor: "#22C55E",
    icon: "checkmark-circle",
  }
];

const MyOrder = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
        <Text style={styles.headerSubtitle}>Track and view your past orders</Text>
      </View>

      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.restaurantName}>{item.restaurant}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
              <Text style={styles.orderTotal}>₹{item.total}</Text>
            </View>
            
            <View style={styles.cardBody}>
              <Text style={styles.itemsText} numberOfLines={2}>{item.items}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
              <View style={styles.statusRow}>
                <Ionicons name={item.icon as any} size={18} color={item.statusColor} />
                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
              </View>
              
              <TouchableOpacity style={styles.reorderButton}>
                <Ionicons name="refresh" size={16} color="#FF6600" />
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MyOrder;

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
    fontSize: 15,
    color: "#94A3B8",
    marginTop: 4,
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  orderCard: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F1F5F9",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF6600",
  },
  cardBody: {
    marginBottom: 16,
  },
  itemsText: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },
  reorderButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 102, 0, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 102, 0, 0.2)",
  },
  reorderText: {
    color: "#FF6600",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },
});
