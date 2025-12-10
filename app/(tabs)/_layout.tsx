import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomTabsLayout() {
  const insets = useSafeAreaInsets(); // Read Bottom System Bar Height

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          height: 60 + insets.bottom,   
          paddingBottom: insets.bottom, 
          paddingTop: 6,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          position: "absolute",         
        },
      }}
    >
      <Tabs.Screen
        name="userDashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="generalDashboard"
        options={{
          title: "Anonymous Complaints",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="eye" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
