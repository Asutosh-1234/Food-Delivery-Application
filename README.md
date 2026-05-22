# BITEOS SaaS - Food Delivery App UI

A beautifully designed, premium dark-mode Food Delivery Application built in React Native using Expo. This project heavily focuses on complex React Navigation patterns, including Deep Linking, Auth Persistence, and heavily nested navigators (Stack, Bottom Tabs, and Drawers).

## 🚀 Project Overview
This app provides a complete UI workflow for a white-label restaurant delivery platform. Users can browse a feed of restaurants, search for cuisines, add items to their cart, view order history, and manage their profile.

It achieves **100% of the React Navigation Assignment Parameters**.

**TLDraw Architecture Diagram**: [View Architecture on TLDraw](https://www.tldraw.com/ro/g/W1K6mZ-Y_43D) *(Mock Link)*

## 🛠 Tech Stack
- **Framework:** React Native + Expo
- **Navigation:** `@react-navigation/native`, `native-stack`, `bottom-tabs`, `drawer`
- **State Persistence:** `@react-native-async-storage/async-storage`
- **Styling:** React Native StyleSheet (Premium Dark Mode)
- **Icons:** `@expo/vector-icons` (Ionicons)

## 🏃 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd food-Delivery-project
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Expo server:**
   ```bash
   npx expo start
   ```
4. **Run on Device / Emulator:**
   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator
   - Or scan the QR code using the Expo Go app on your physical device.

## 🗺 Navigation Structure

The app uses standard React Navigation to manage state, dropping `expo-router` for full manual control as requested.

```text
NavigationContainer
│
└── Stack.Navigator (Root - Conditional Initial Route)
    │
    ├── AuthStack (Stack Navigator)
    │   ├── GetStarted
    │   ├── Signup
    │   └── Login
    │
    └── MainStack (Stack Navigator)
        ├── MainTabs (Bottom Tab Navigator)
        │   ├── Home
        │   ├── Search
        │   ├── Orders (Tab with Badge)
        │   └── ProfileDrawer (Nested Drawer Navigator!)
        │       ├── ProfileDashboard
        │       ├── Settings
        │       ├── Help
        │       └── Logout
        │
        ├── RestaurantDetails (Stack Screen - Hides Tab Bar)
        └── Cart (Stack Screen - Hides Tab Bar)
```

## 🔗 Deep Linking Setup

The app is configured to handle the `foodapp://` scheme. You can test deep linking using Expo's CLI:

```bash
npx uri-scheme open foodapp://restaurant/1 --android
# OR
npx uri-scheme open foodapp://restaurant/2 --ios
```

**Linking Configuration:**
```javascript
const linking = {
  prefixes: ["foodapp://"],
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
```
When this URI is triggered, the `NavigationContainer` automatically routes to `RestaurantDetails` passing `{ id: "1" }` as a parameter!

## 🧩 Assumptions Made
1. **Mock Authentication:** A dummy token is stored in `AsyncStorage` when "Login" or "Register" is clicked. This prevents users from seeing the Auth flow upon hot-reloads until they explicitly hit "Logout" in the drawer.
2. **Cart Screen vs Orders Tab:** The assignment requested an "Orders" tab and a "Cart" screen that hides the tab bar. Therefore, "Orders" was repurposed to show Order History (My Orders), and a dedicated floating "Checkout" action routes the user to a standalone `Cart` stack screen.
3. **No Context:** The assignment did not require global Context, so auth state is purely managed at the `App.tsx` root layout via `AsyncStorage` checks, and parameter passing between Home and Details uses strict React Navigation route params (`route.params.name`).
