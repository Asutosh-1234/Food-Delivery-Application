import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LogoutIndex = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Navigates to the initial auth screen (getStarted) upon logout
    navigation.navigate("getStarted" as never);
  };

  const handleCancel = () => {
    // Go back to the previous screen (closes the drawer or cancels logout)
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="log-out-outline" size={64} color="#FF6600" />
          </View>
        </View>
        
        <Text style={styles.title}>Oh no! You're leaving...</Text>
        <Text style={styles.subtitle}>
          Are you sure you want to log out? You'll need to login again to track your orders and discover great food.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton} 
            activeOpacity={0.8}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutButton} 
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Yes, Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogoutIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 102, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 102, 0, 0.2)",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  cancelButton: {
    backgroundColor: "#FF6600",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  logoutButton: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },
});
