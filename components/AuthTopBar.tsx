import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

export default function AuthTopBar() {
  const { width } = Dimensions.get("window");

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={require("../assets/logo1.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Complaints & Feedback</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20, 
    paddingBottom: 30,
    alignItems: "center",

  },

  logo: {
    width: 80,
    height: 80,
  },

  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#004E2B",
  },
});
