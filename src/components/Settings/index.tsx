import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingIndex = () => {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    type: "toggle" | "link" = "link",
    value?: boolean,
    onToggle?: (val: boolean) => void,
    iconColor: string = "#94A3B8"
  ) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      disabled={type === "toggle"}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>
      
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>

      {type === "toggle" ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#334155", true: "#FF6600" }}
          thumbColor={"#FFFFFF"}
          ios_backgroundColor="#334155"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#475569" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your preferences and account</Text>
        </View>

        {renderSectionHeader("Account")}
        <View style={styles.sectionContainer}>
          {renderSettingItem("person-outline", "Edit Profile", "Change your personal details", "link", undefined, undefined, "#38BDF8")}
          <View style={styles.divider} />
          {renderSettingItem("location-outline", "Saved Addresses", "Manage delivery locations", "link", undefined, undefined, "#A855F7")}
          <View style={styles.divider} />
          {renderSettingItem("card-outline", "Payment Methods", "Add or remove cards", "link", undefined, undefined, "#22C55E")}
        </View>

        {renderSectionHeader("Preferences")}
        <View style={styles.sectionContainer}>
          {renderSettingItem("notifications-outline", "Push Notifications", "Receive updates on your orders", "toggle", notifications, setNotifications, "#F59E0B")}
          <View style={styles.divider} />
          {renderSettingItem("navigate-circle-outline", "Location Services", "Allow app to access your location", "toggle", location, setLocation, "#EF4444")}
          <View style={styles.divider} />
          {renderSettingItem("moon-outline", "Dark Mode", "Experience a sleek dark interface", "toggle", darkMode, setDarkMode, "#8B5CF6")}
        </View>

        {renderSectionHeader("Security")}
        <View style={styles.sectionContainer}>
          {renderSettingItem("lock-closed-outline", "Change Password", "Update your account password", "link", undefined, undefined, "#64748B")}
          <View style={styles.divider} />
          {renderSettingItem("shield-checkmark-outline", "Two-Factor Authentication", "Add an extra layer of security", "link", undefined, undefined, "#64748B")}
        </View>

        <TouchableOpacity style={styles.deleteAccountButton}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#94A3B8",
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
    marginLeft: 4,
    marginTop: 16,
  },
  sectionContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E2E8F0",
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: 72,
  },
  deleteAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  deleteAccountText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});