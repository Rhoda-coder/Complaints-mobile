import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAPI, authSession } from "../services/api";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

// Validation schema using Yup
const passwordFormSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function PasswordScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (
    values: { password: string; confirmPassword: string },
    actions: any
  ) => {
    setError(null);

    const staffId = await authSession.getStaffId();
    if (!staffId) {
      setError("Missing staff ID. Please verify again.");
      router.push("/signin");
      return;
    }

    try {
      const res = await authAPI.setPassword({
        staff_id: staffId,
        password: values.password,
      });

      actions.resetForm();
      if (res.status === 201) {
        Alert.alert(
          "Success",
          "Password set successfully",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        router.push("/login");
      }
    } catch (err: any) {
      actions.resetForm();
      Alert.alert(
        "Error",
        "Failed to set password",
        [{ text: "Retry", onPress: () => console.log("Retry Pressed") }],
        { cancelable: true }
      );
      setError(err?.response?.data?.detail || "Failed to set password");
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: passwordFormSchema,
    onSubmit,
  }); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.heading}>Create your{"\n"}Account</Text>
      <Text style={styles.subheading}>Enter your password to continue</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
        {errors.password && touched.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={values.confirmPassword}
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit as any}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Setting Password..." : "Set Password"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 80,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  subheading: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#0D5C3D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
