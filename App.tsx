import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

// Auth Screens
import GetStartedScreen from "./src/screens/Auth/GetStarted";
import LoginScreen from "./src/screens/Auth/Login";
import SignupScreen from "./src/screens/Auth/Signup";

// Main Screens
import HomeScreen from "./src/components/Home";
import SearchIndex from "./src/components/Search";
import MyOrder from "./src/components/myOrder";
import ProfileIndex from "./src/components/Profile";
import RestaurantDetails from "./src/screens/RestaurantDetails";
import CartScreen from "./src/screens/Cart";

// Drawer Screens
import SettingIndex from "./src/components/Settings";
import HelpIndex from "./src/components/help";
import LogoutIndex from "./src/components/logout";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix, "foodapp://"],
  config: {
    screens: {
      Main: {
        screens: {
          RestaurantDetails: "restaurant/:id",
        },
      },
    },
  },
};

// Custom Drawer Content
function CustomDrawerContent(props: any) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F19" }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={styles.drawerHeader}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerFooter}>
        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </View>
    </View>
  );
}

// Drawer inside Profile Tab
function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0B0F19",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.05)",
        },
        headerTintColor: "#F8FAFC",
        drawerStyle: { backgroundColor: "#0B0F19", width: 280 },
        drawerActiveBackgroundColor: "rgba(255, 102, 0, 0.1)",
        drawerActiveTintColor: "#FF6600",
        drawerInactiveTintColor: "#94A3B8",
      }}
    >
      <Drawer.Screen name="ProfileDashboard" component={ProfileIndex} options={{ title: "My Profile", drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="Setting" component={SettingIndex} options={{ title: "Settings", drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="Help" component={HelpIndex} options={{ title: "Help & Support", drawerIcon: ({ color }) => <Ionicons name="help-circle-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="Logout" component={LogoutIndex} options={{ title: "Logout", drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={22} color={color} /> }} />
    </Drawer.Navigator>
  );
}

// Bottom Tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF6600",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.05)",
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Search") iconName = focused ? "search" : "search-outline";
          else if (route.name === "Orders") iconName = focused ? "receipt" : "receipt-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName as any} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchIndex} />
      <Tab.Screen name="Orders" component={MyOrder} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Profile" component={ProfileDrawer} />
    </Tab.Navigator>
  );
}

// Main App Stack (hides tabs when pushed)
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, headerTitle: "Checkout", headerStyle: { backgroundColor: "#0B0F19" }, headerTintColor: "#FFF" }} />
    </Stack.Navigator>
  );
}

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0B0F19", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={userToken == null ? "Auth" : "Main"}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#1E293B",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  profileImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: "#FF6600", marginBottom: 16 },
  profileName: { color: "#F8FAFC", fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  profileEmail: { color: "#94A3B8", fontSize: 14 },
  drawerItemsContainer: { paddingHorizontal: 8 },
  drawerFooter: { padding: 20, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },
  versionText: { color: "#64748B", fontSize: 12, textAlign: "center" },
});
