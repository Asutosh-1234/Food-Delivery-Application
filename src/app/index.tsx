import HelpIndex from "@/components/help";
import LogoutIndex from "@/components/logout";
import MyOrder from "@/components/myOrder";
import OrderIndex from "@/components/Order";
import ProfileIndex from "@/components/Profile";
import SearchIndex from "@/components/Search";
import SettingIndex from "@/components/Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./../components/Home";
import RestaurantDetails from "./../components/Home/ResturantDetails";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 24,
          left: 20,
          right: 20,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          borderRadius: 24,
          height: 68,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.08)",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "bag" : "bag-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  backgroundColor: focused ? "rgba(255, 102, 0, 0.15)" : "transparent",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Ionicons name={iconName as any} size={24} color={focused ? "#FF6600" : "#94A3B8"} />
              </View>
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -6,
                    width: 4,
                    height: 4,
                    backgroundColor: "#FF6600",
                    borderRadius: 2,
                  }}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchIndex} />
      <Tab.Screen name="Order" component={OrderIndex} />
      <Tab.Screen name="Profile" component={ProfileIndex} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0B0F19" }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Profile Header */}
        <View style={styles.drawerHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
            }}
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

function DrawerRoot() {
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
        headerTitleStyle: {
          fontWeight: "700",
        },
        drawerStyle: {
          backgroundColor: "#0B0F19",
          width: 280,
        },
        drawerActiveBackgroundColor: "rgba(255, 102, 0, 0.1)",
        drawerActiveTintColor: "#FF6600",
        drawerInactiveTintColor: "#94A3B8",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: "Home",
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MyOrder"
        component={MyOrder}
        options={{
          title: "My Orders",
          drawerIcon: ({ color }) => <Ionicons name="receipt-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingIndex}
        options={{
          title: "Settings",
          drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpIndex}
        options={{
          title: "Help & Support",
          drawerIcon: ({ color }) => <Ionicons name="help-circle-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutIndex}
        options={{
          title: "Logout",
          drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0F19" }} edges={["right", "left"]}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DrawerRoot" component={DrawerRoot} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      </Stack.Navigator>
    </SafeAreaView>
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
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#FF6600",
    marginBottom: 16,
  },
  profileName: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    color: "#94A3B8",
    fontSize: 14,
  },
  drawerItemsContainer: {
    paddingHorizontal: 8,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  versionText: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
  },
});
