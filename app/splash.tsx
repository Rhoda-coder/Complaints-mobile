import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";

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
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>COMPLAINT & FEEDBACK</Text>
      </Animated.View>
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
  content: {
    alignItems: "center",
    gap: 20, // note: works only on RN 0.70+; otherwise use margin
  },
  logo: {
    width: 240,
    height: 192,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d5c3d",
    textAlign: "center",
    letterSpacing: 1,
  },
});
