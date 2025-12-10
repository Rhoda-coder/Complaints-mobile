import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { authAPI, authSession } from "../services/api";

export default function ResetPasswordScreen() {
  const [otp, setOtp] = useState<number | undefined>();
  const [staffId, setStaffId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [isOtpFormOpen, setIsOtpFormOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 1. Handle Staff ID

  const handleStaffId = async () => {
    setError(null);
    setIsLoading(true);

    if (!staffId.trim()) {
      setError("Staff ID is required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await authAPI.forgotPassowrd({ staff_id: staffId });

      if (res.status !== 200) throw new Error("Verification failed");

      setResponseMessage(res.message);
      setExpiresIn(res.data.expires_in);
      setIsOtpFormOpen(true);

      await authSession.setStaffId(staffId);
    } catch (err: any) {
      setError(err?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Reset Password

  const handleNewPassword = async () => {
    setError(null);
    setIsLoading(true);

    const storedStaffId = await authSession.getStaffId(); // MUST AWAIT

    if (!storedStaffId) {
      setError("Missing staff ID. Please verify again.");
      router.push("/signin");
      return;
    }

    try {
      const res = await authAPI.resetPassowrd({
        staff_id: storedStaffId,
        otp,
        new_password: newPassword,
      });

      if (res.status !== 200) throw new Error("Reset failed");

      Alert.alert("Success", res.message);
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Reset password failed");
      setError(err?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your staff ID to reset your password
      </Text>

      {/* STEP 1: ENTER STAFF ID */}
      {!isOtpFormOpen && (
        <View style={styles.form}>
          <Text style={styles.label}>Staff ID</Text>
          <TextInput
            value={staffId}
            onChangeText={setStaffId}
            placeholder="DHG1234"
            style={styles.input}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleStaffId}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Staff ID</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2: ENTER OTP + NEW PASSWORD */}
      {isOtpFormOpen && (
        <View style={styles.form}>
          <Text style={styles.response}>{responseMessage}</Text>

          {/* OTP */}
          <Text style={styles.label}>OTP</Text>
          <TextInput
            value={otp?.toString() || ""}
            onChangeText={(t) => setOtp(Number(t))}
            placeholder="123456"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.expiresText}>Code expires in {expiresIn}</Text>

          {/* New Password */}
          <Text style={styles.label}>New Password</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="******"
            secureTextEntry
            style={styles.input}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleNewPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Password</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  logo: {
    width: 160,
    height: 60,
    alignSelf: "flex-start",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 30,
  },

  form: {
    marginTop: 10,
    width: "100%",
  },

  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#d4d4d4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },

  response: {
    backgroundColor: "#e8f7ee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    color: "#0d5c3d",
  },

  expiresText: {
    color: "#666",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#0d5c3d",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
