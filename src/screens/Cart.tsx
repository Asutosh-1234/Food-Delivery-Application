import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy Cart Data
const cartItems = [
  {
    id: "1",
    name: "Chicken Dum Biryani",
    restaurant: "Spice Route Kitchen",
    price: 249,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    isVeg: false,
  },
  {
    id: "2",
    name: "Butter Naan",
    restaurant: "Spice Route Kitchen",
    price: 49,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    isVeg: true,
  }
];

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 39;
  const platformFee = 5;
  const grandTotal = itemTotal + deliveryFee + platformFee;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <Text style={styles.headerSubtitle}>{cartItems.length} items from Spice Route Kitchen</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cart Items */}
        <View style={styles.itemsContainer}>
          {cartItems.map((item, index) => (
            <View key={item.id}>
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <View style={styles.titleRow}>
                    <View style={[styles.vegSquare, item.isVeg ? styles.vegBorder : styles.nonVegBorder]}>
                      <View style={[styles.vegCircle, item.isVeg ? styles.vegBg : styles.nonVegBg]} />
                    </View>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                
                <View style={styles.quantityControl}>
                  <TouchableOpacity style={styles.qtyButton}>
                    <Ionicons name="remove" size={16} color="#FF6600" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyButton}>
                    <Ionicons name="add" size={16} color="#FF6600" />
                  </TouchableOpacity>
                </View>
              </View>
              {index < cartItems.length - 1 && <View style={styles.itemDivider} />}
            </View>
          ))}
        </View>

        {/* Bill Details */}
        <View style={styles.billContainer}>
          <Text style={styles.billTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Item Total</Text>
            <Text style={styles.billValue}>₹{itemTotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Delivery Fee</Text>
            <Text style={styles.billValue}>₹{deliveryFee}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Platform Fee</Text>
            <Text style={styles.billValue}>₹{platformFee}</Text>
          </View>
          <View style={styles.billDivider} />
          <View style={[styles.billRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalText}>To Pay</Text>
            <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bar */}
      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.checkoutTotal}>₹{grandTotal}</Text>
          <Text style={styles.checkoutSub}>View Detailed Bill</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Pay</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.checkoutIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // accommodate checkout bar since there's no bottom tab
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    gap: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#F8FAFC",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 2,
    fontWeight: "500",
  },
  itemsContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    marginBottom: 24,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  itemName: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    flex: 1,
  },
  itemPrice: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "600",
  },
  vegSquare: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  vegBorder: { borderColor: '#22C55E' },
  nonVegBorder: { borderColor: '#EF4444' },
  vegCircle: { width: 6, height: 6, borderRadius: 3 },
  vegBg: { backgroundColor: '#22C55E' },
  nonVegBg: { backgroundColor: '#EF4444' },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 102, 0, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 102, 0, 0.2)",
  },
  qtyButton: {
    padding: 4,
  },
  qtyText: {
    color: "#FF6600",
    fontWeight: "800",
    fontSize: 16,
    marginHorizontal: 12,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginVertical: 4,
  },
  billContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  billTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  billText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },
  billValue: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
  },
  billDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 12,
  },
  grandTotalRow: {
    marginBottom: 0,
    alignItems: "center",
  },
  grandTotalText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "800",
  },
  grandTotalValue: {
    color: "#FF6600",
    fontSize: 20,
    fontWeight: "800",
  },
  checkoutBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#1E293B",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  checkoutTotal: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "900",
  },
  checkoutSub: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  checkoutButton: {
    backgroundColor: "#FF6600",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
  },
  checkoutIcon: {
    marginLeft: 8,
  },
});
