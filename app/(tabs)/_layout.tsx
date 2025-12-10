import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header"; // <-- IMPORT YOUR HEADER
import { View, StyleSheet } from "react-native";

export default function BottomTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* ------- Your Custom Header (Always Visible) ------- */}
      <Header />

      {/* ------- Bottom Tabs ------- */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // prevents white background gaps
  },
});
