import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileIndex = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeaderRow}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" }} 
              style={styles.avatar} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
              <View style={styles.badge}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.badgeText}>Gold Member</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#FF6600" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(34, 197, 94, 0.15)" }]}>
              <Ionicons name="wallet-outline" size={22} color="#22C55E" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>FoodWallet</Text>
              <Text style={styles.menuSubtitle}>Balance: ₹1,250</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(239, 68, 68, 0.15)" }]}>
              <Ionicons name="heart-outline" size={22} color="#EF4444" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Favorite Restaurants</Text>
              <Text style={styles.menuSubtitle}>Your saved places</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(168, 85, 247, 0.15)" }]}>
              <Ionicons name="ticket-outline" size={22} color="#A855F7" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Promos & Offers</Text>
              <Text style={styles.menuSubtitle}>3 active coupons</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // accommodate bottom tab
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#F8FAFC",
  },
  profileCard: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  profileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#FF6600",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  email: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  badgeText: {
    color: "#F59E0B",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: "rgba(255, 102, 0, 0.1)",
    padding: 10,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#F1F5F9",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  menuSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: 76,
  },
});