import HelpIndex from "@/components/help";
import LogoutIndex from "@/components/logout";
import MyOrder from "@/components/myOrder";
import OrderIndex from "@/components/Order";
import ProfileIndex from "@/components/Profile";
import SearchIndex from "@/components/Search";
import SettingIndex from "@/components/Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./../components/Home";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Order" component={OrderIndex} />
      <Tab.Screen name="Search" component={SearchIndex} />
      <Tab.Screen name="Profile" component={ProfileIndex} />
    </Tab.Navigator>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
      <Drawer.Navigator screenOptions={{ headerShown: true }}>
        <Drawer.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ title: "Home", headerShown: true }}
        />
        <Drawer.Screen name="MyOrder" component={MyOrder} />
        <Drawer.Screen name="Setting" component={SettingIndex} />
        <Drawer.Screen name="Help" component={HelpIndex} />
        <Drawer.Screen name="Logout" component={LogoutIndex} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}
