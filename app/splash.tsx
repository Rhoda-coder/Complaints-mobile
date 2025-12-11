import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import AuthTopBar from "@/components/AuthTopBar";

export default function SplashScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVisible(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1500);

    const navTimer = setTimeout(() => router.push("/login"), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <AuthTopBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});
