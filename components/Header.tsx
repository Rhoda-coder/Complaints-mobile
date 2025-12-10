import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

export default function Header() {
  const { width: screenWidth } = Dimensions.get("window");

 
  const logoSize = 100;

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={styles.row}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />

        {/* Vertical green separator */}
        <View style={[styles.separator, { height: logoSize * 0.5 }]} />

        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          Complaint & Feedback
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F7EE",
    paddingTop: 10,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E5D4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // aligns items to the left
    alignSelf: "stretch", // ensures full width
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16, // space inside header
    width: "100%",
  },

  separator: {
    width: 2,
    backgroundColor: "#0B5137",
    marginHorizontal: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B5137",
    flexShrink: 1, // text shrinks if needed
  },
});
