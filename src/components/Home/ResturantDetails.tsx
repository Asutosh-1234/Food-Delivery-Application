import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { restaurants } from "../data";

const RestaurantDetails = () => {
	const route = useRoute<any>();
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const { id } = route.params || {};

	const restaurant = restaurants.find((r) => r.id === id);

	const [cart, setCart] = useState<{ [key: string]: number }>({});

	const handleAddToCart = (foodId: string) => {
		setCart((prev) => ({
			...prev,
			[foodId]: (prev[foodId] || 0) + 1,
		}));
	};

	const handleRemoveFromCart = (foodId: string) => {
		setCart((prev) => {
			const current = prev[foodId] || 0;
			if (current <= 1) {
				const newCart = { ...prev };
				delete newCart[foodId];
				return newCart;
			}
			return {
				...prev,
				[foodId]: current - 1,
			};
		});
	};

	if (!restaurant) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Restaurant not found</Text>
				<Pressable
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}
				>
					<Text style={styles.goBackText}>Go Back</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				{/* Hero Image Section */}
				<View style={styles.heroSection}>
					<Image
						source={{ uri: restaurant.bannerImage }}
						style={styles.heroImage}
						resizeMode="cover"
					/>
					<View
						style={[
							styles.headerOverlay,
							{ paddingTop: Math.max(insets.top, 20) },
						]}
					>
						<Pressable
							style={styles.backButton}
							onPress={() => navigation.goBack()}
						>
							<Ionicons name="arrow-back" size={24} color="#FFF" />
						</Pressable>
						<View style={styles.likeButton}>
							<Ionicons name="heart-outline" size={24} color="#FFF" />
						</View>
					</View>
				</View>

				{/* Restaurant Info Card */}
				<View style={styles.infoCard}>
					<View style={styles.titleRow}>
						<Text style={styles.restaurantName}>{restaurant.name}</Text>
						<View style={styles.ratingBadge}>
							<Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
							<Text style={styles.reviewText}>
								({restaurant.totalReviews}+)
							</Text>
						</View>
					</View>

					<Text style={styles.tagline}>{restaurant.tagline}</Text>
					<Text style={styles.addressText}>{restaurant.address}</Text>

					<View style={styles.metricsRow}>
						<View style={styles.metricItem}>
							<Ionicons name="time-outline" size={18} color="#94A3B8" />
							<Text style={styles.metricText}>{restaurant.deliveryTime}</Text>
						</View>
						<View style={styles.metricDivider} />
						<View style={styles.metricItem}>
							<Ionicons name="location-outline" size={18} color="#94A3B8" />
							<Text style={styles.metricText}>{restaurant.distance}</Text>
						</View>
						<View style={styles.metricDivider} />
						<View style={styles.metricItem}>
							<Ionicons name="bicycle-outline" size={18} color="#94A3B8" />
							<Text style={styles.metricText}>
								₹{restaurant.deliveryFee} Fee
							</Text>
						</View>
					</View>

					{restaurant.offer && (
						<View style={styles.offerBanner}>
							<Ionicons
								name="flame"
								size={20}
								color="#EF4444"
								style={{ marginRight: 8 }}
							/>
							<Text style={styles.offerText}>{restaurant.offer}</Text>
						</View>
					)}
				</View>

				<View style={styles.divider} />

				{/* Menu Section */}
				<View style={styles.menuSection}>
					<Text style={styles.sectionTitle}>Recommended</Text>

					{restaurant.menu.map((item) => (
						<View key={item.id} style={styles.menuItem}>
							<View style={styles.menuItemContent}>
								<View style={styles.vegIndicatorRow}>
									<View
										style={[
											styles.vegSquare,
											item.isVeg ? styles.vegBorder : styles.nonVegBorder,
										]}
									>
										<View
											style={[
												styles.vegCircle,
												item.isVeg ? styles.vegBg : styles.nonVegBg,
											]}
										/>
									</View>
									{item.bestseller && (
										<View style={styles.bestsellerBadge}>
											<Text style={styles.bestsellerText}>Bestseller</Text>
										</View>
									)}
								</View>

								<Text style={styles.menuItemName}>{item.name}</Text>
								<Text style={styles.menuItemPrice}>₹{item.price}</Text>
								<Text style={styles.menuItemRating}>⭐ {item.rating}</Text>
								<Text style={styles.menuItemDesc} numberOfLines={2}>
									{item.description}
								</Text>
							</View>

							<View style={styles.menuItemImageContainer}>
								<Image
									source={{ uri: item.image }}
									style={styles.menuItemImage}
								/>

								{cart[item.id] ? (
									<View style={styles.quantityControl}>
										<Pressable
											style={styles.qtyButton}
											onPress={() => handleRemoveFromCart(item.id)}
										>
											<Ionicons name="remove" size={16} color="#FF6600" />
										</Pressable>
										<Text style={styles.qtyText}>{cart[item.id]}</Text>
										<Pressable
											style={styles.qtyButton}
											onPress={() => handleAddToCart(item.id)}
										>
											<Ionicons name="add" size={16} color="#FF6600" />
										</Pressable>
									</View>
								) : (
									<Pressable
										style={styles.addButton}
										onPress={() => handleAddToCart(item.id)}
									>
										<Text style={styles.addButtonText}>ADD</Text>
										<View style={styles.addPlus}>
											<Ionicons name="add" size={14} color="#FF6600" />
										</View>
									</Pressable>
								)}
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default RestaurantDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0B0F19",
	},
	errorContainer: {
		flex: 1,
		backgroundColor: "#0B0F19",
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "#F8FAFC",
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 20,
	},
	goBackButton: {
		backgroundColor: "#FF6600",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	goBackText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	heroSection: {
		position: "relative",
		height: 280,
		width: "100%",
	},
	heroImage: {
		width: "100%",
		height: "100%",
	},
	headerOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		zIndex: 10,
	},
	backButton: {
		backgroundColor: "rgba(15, 23, 42, 0.6)",
		width: 44,
		height: 44,
		borderRadius: 22,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.2)",
	},
	likeButton: {
		backgroundColor: "rgba(15, 23, 42, 0.6)",
		width: 44,
		height: 44,
		borderRadius: 22,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.2)",
	},
	infoCard: {
		backgroundColor: "#1E293B",
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		marginTop: -32,
		padding: 24,
		paddingBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 10,
	},
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	restaurantName: {
		fontSize: 26,
		fontWeight: "900",
		color: "#F8FAFC",
		flex: 1,
		marginRight: 16,
	},
	ratingBadge: {
		backgroundColor: "rgba(34, 197, 94, 0.1)",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(34, 197, 94, 0.3)",
	},
	ratingText: {
		color: "#4ADE80",
		fontWeight: "800",
		fontSize: 16,
	},
	reviewText: {
		color: "#94A3B8",
		fontSize: 10,
		marginTop: 2,
		fontWeight: "500",
	},
	tagline: {
		fontSize: 15,
		color: "#CBD5E1",
		fontWeight: "500",
		marginBottom: 4,
	},
	addressText: {
		fontSize: 14,
		color: "#64748B",
		marginBottom: 16,
	},
	metricsRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(15, 23, 42, 0.5)",
		padding: 12,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.05)",
		marginBottom: 16,
	},
	metricItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},
	metricText: {
		color: "#E2E8F0",
		fontSize: 13,
		fontWeight: "600",
	},
	metricDivider: {
		width: 1,
		height: 24,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	},
	offerBanner: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(239, 68, 68, 0.1)",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(239, 68, 68, 0.2)",
	},
	offerText: {
		color: "#EF4444",
		fontWeight: "700",
		fontSize: 14,
	},
	divider: {
		height: 8,
		backgroundColor: "#0F172A",
		width: "100%",
	},
	menuSection: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "800",
		color: "#F8FAFC",
		marginBottom: 20,
		letterSpacing: 0.5,
	},
	menuItem: {
		flexDirection: "row",
		marginBottom: 32,
		justifyContent: "space-between",
	},
	menuItemContent: {
		flex: 1,
		paddingRight: 16,
	},
	vegIndicatorRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	vegSquare: {
		width: 16,
		height: 16,
		borderWidth: 1.5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		marginRight: 8,
	},
	vegBorder: {
		borderColor: "#22C55E",
	},
	nonVegBorder: {
		borderColor: "#EF4444",
	},
	vegCircle: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	vegBg: {
		backgroundColor: "#22C55E",
	},
	nonVegBg: {
		backgroundColor: "#EF4444",
	},
	bestsellerBadge: {
		backgroundColor: "rgba(245, 158, 11, 0.15)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "rgba(245, 158, 11, 0.3)",
	},
	bestsellerText: {
		color: "#F59E0B",
		fontSize: 10,
		fontWeight: "800",
		textTransform: "uppercase",
	},
	menuItemName: {
		fontSize: 18,
		fontWeight: "700",
		color: "#F1F5F9",
		marginBottom: 4,
	},
	menuItemPrice: {
		fontSize: 16,
		fontWeight: "600",
		color: "#E2E8F0",
		marginBottom: 4,
	},
	menuItemRating: {
		fontSize: 13,
		color: "#FBBF24",
		fontWeight: "700",
		marginBottom: 8,
	},
	menuItemDesc: {
		fontSize: 13,
		color: "#94A3B8",
		lineHeight: 20,
	},
	menuItemImageContainer: {
		width: 140,
		height: 140,
		position: "relative",
		alignItems: "center",
	},
	menuItemImage: {
		width: 140,
		height: 140,
		borderRadius: 20,
	},
	addButton: {
		position: "absolute",
		bottom: -15,
		backgroundColor: "#FFFFFF",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingVertical: 10,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
		borderWidth: 1,
		borderColor: "#E2E8F0",
	},
	addButtonText: {
		color: "#FF6600",
		fontWeight: "800",
		fontSize: 16,
	},
	addPlus: {
		position: "absolute",
		top: 4,
		right: 4,
	},
	quantityControl: {
		position: "absolute",
		bottom: -15,
		backgroundColor: "#FFFFFF",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 100,
		height: 42,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
		borderWidth: 1,
		borderColor: "#E2E8F0",
		paddingHorizontal: 4,
	},
	qtyButton: {
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 102, 0, 0.1)",
		borderRadius: 8,
	},
	qtyText: {
		color: "#FF6600",
		fontWeight: "800",
		fontSize: 16,
	},
});
