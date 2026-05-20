import React, { useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Define the precise data interface for your SaaS structure
interface RestaurantData {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  totalReviews: number;
  deliveryTime: string;
  deliveryFee: number;
  distance: string;
  isOpen: boolean;
  categories: string[];
  bannerImage: string;
  offer: string;
  address: string;
}

interface RestaurantCardProps {
  restaurant: RestaurantData;
  onPress?: (id: string) => void;
}

export default function RestaurantCard({
  restaurant,
  onPress,
}: RestaurantCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Premium Micro-interaction: Scale down slightly when pressed
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.cardContainer, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress?.(restaurant.id)}
        style={styles.pressableArea}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: restaurant.bannerImage }}
            style={styles.banner}
            resizeMode="cover"
          />

          <View style={styles.badgeOverlayRow}>
            {/* Offer / Discount Tag */}
            {restaurant.offer && (
              <View style={styles.offerBadge}>
                <Text style={styles.offerText}>🔥 {restaurant.offer}</Text>
              </View>
            )}

            <View style={styles.glassPill}>
              <Text style={styles.glassPillText}>{restaurant.distance}</Text>
            </View>
          </View>

          <View style={styles.bottomImageOverlay}>
            <View style={styles.timePill}>
              <Text style={styles.timeText}>🕒 {restaurant.deliveryTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                ⭐ {restaurant.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.tagline} numberOfLines={1}>
            {restaurant.tagline}
          </Text>

          <View style={styles.categoryRow}>
            {restaurant.categories.map((cat, index) => (
              <Text key={cat} style={styles.categoryText}>
                {cat}
                {index < restaurant.categories.length - 1 ? "  •  " : ""}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.footerRow}>
            <Text style={styles.feeText}>
              Delivery:{" "}
              <Text style={styles.boldFee}>₹{restaurant.deliveryFee}</Text>
            </Text>
            <Text style={styles.addressText} numberOfLines={1}>
              📍 {restaurant.address.split(",")[0]}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#1E293B", // Deep gray card surfaces matching your screen's theme
    borderRadius: 24,
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  pressableArea: {
    width: "100%",
  },
  imageWrapper: {
    width: "100%",
    height: 180,
    backgroundColor: "#334155",
    position: "relative",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  badgeOverlayRow: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerBadge: {
    backgroundColor: "#EF4444", // Solid high-visibility discount red
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  offerText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  glassPill: {
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  glassPillText: {
    color: "#F8FAFC",
    fontWeight: "600",
    fontSize: 12,
  },
  bottomImageOverlay: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  timePill: {
    backgroundColor: "#0F172A", // Dark solid anchor pill
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  timeText: {
    color: "#38BDF8", // Sky blue highlight matching your branding
    fontWeight: "700",
    fontSize: 12,
  },
  infoContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 12,
  },
  ratingBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.15)", // Translucent premium green container
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  ratingText: {
    color: "#4ADE80", // Neon lime green text for clarity
    fontWeight: "700",
    fontSize: 13,
  },
  tagline: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "500",
    marginBottom: 6,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    width: "100%",
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feeText: {
    fontSize: 13,
    color: "#94A3B8",
  },
  boldFee: {
    color: "#F1F5F9",
    fontWeight: "700",
  },
  addressText: {
    fontSize: 13,
    color: "#64748B",
    maxWidth: "55%",
  },
});
