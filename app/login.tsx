import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { authAPI, authSession } from "../services/api";
import { loginInFormSchema } from "../Utils/FormSchemas";

const LoginPage = () => {
  const { handleRefreshToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (
    values: { staffId: string; password: string },
    actions: any
  ) => {
    if (!values.staffId.trim() || !values.password) return;

    try {
      setError(null);

        const res = await authAPI.login({
        staff_id: values.staffId.trim(),
        password: values.password,
      });

      // Token expired refresh
      if (res.status === 401) handleRefreshToken();

      const { tokens, staff, total, completed } = res.data;

      // Save session
      await authSession.setComplaintSummary(
        JSON.stringify({ total, completed })
      );
      await authSession.setUser(staff);
      await authSession.setToken(tokens.access);

      actions.resetForm();

      Alert.alert("Success", "Login successful", [
        { text: "OK", onPress: () => router.replace("/(tabs)/userDashboard") },
      ]);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");

      Alert.alert("Error", "Invalid staff ID or password", [{ text: "Retry" }]);
    }
  };

  
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: { staffId: "", password: "" },
    validationSchema: loginInFormSchema,
    onSubmit: handleLogin,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Sign in to Your {"\n"}Account</Text>
        <Text style={styles.subheading}>
          Enter your staff ID and password to log in
        </Text>

        {/* Staff ID */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Staff ID</Text>
          <TextInput
            value={values.staffId}
            onChangeText={handleChange("staffId")}
            onBlur={handleBlur("staffId")}
            placeholder="DHG1234"
            style={styles.input}
          />
          {errors.staffId && touched.staffId && (
            <Text style={styles.errorText}>{errors.staffId}</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            placeholder="********"
            secureTextEntry
            style={styles.input}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <Text
            style={styles.link}
            onPress={() => router.push("/reset-password")}
          >
            Forgot your password?
          </Text>

          <Text style={styles.link} onPress={() => router.push("/signin")}>
            Create an account
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={isSubmitting}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Signing in..." : "Log In"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // allows ScrollView to expand
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 100, 
    paddingBottom: 40, 
    // justifyContent: "center", // vertical centering on small screens
    alignItems: "center",
  },
  logoContainer: {
    width: 160,
    marginBottom: 32,
    alignSelf: "flex-start",
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    maxWidth: 360, // ensures form doesn't stretch too much on taller screens
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    lineHeight: 32,
    textAlign: "left",
  },
  subheading: {
    fontSize: 15,
    marginBottom: 24,
    color: "#374151",
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#374151",
    fontWeight: "500",
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  link: {
    color: "#0d5c3d",
    textDecorationLine: "underline",
    fontSize: 13,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#0d5c3d",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});


//i dont know how the mobile really works but the last time when I did on web on my application section 
// it stores tokens so I got an error for the token and I rectified it by clearing the token so
 