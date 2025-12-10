import { Stack } from "expo-router";
import "./global.css";
import { AuthProvider } from "../context/AuthContext"; // make sure path is correct

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
      </Stack>
     </AuthProvider>
  );
}
