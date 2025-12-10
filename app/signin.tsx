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
const signInFormSchema = Yup.object().shape({
  staffId: Yup.string().required("Staff ID is required"),
});

export default function SignInScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: { staffId: string }, actions: any) => {
    setError(null);
    if (!values.staffId.trim()) return;
    try {
      const res = await authAPI.verify({ staff_id: values.staffId });
      authSession.setStaffId(values.staffId.trim());

      if (res.status !== 200) {
        throw new Error(res.message);
      }

      actions.resetForm();

      if (res.data["password_setup_required"]) {
        router.push("/password");
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        "Login failed",
        [{ text: "Retry", onPress: () => console.log("Retry Pressed") }],
        { cancelable: true }
      );
      setError(err?.response?.data?.detail || "Verification failed");
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
    initialValues: { staffId: "" },
    validationSchema: signInFormSchema,
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
      <Text style={styles.subheading}>Enter your staff ID to sign up</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Staff ID</Text>
        <TextInput
          style={styles.input}
          placeholder="DHG1234"
          value={values.staffId}
          onChangeText={handleChange("staffId")}
          onBlur={handleBlur("staffId")}
        />
        {errors.staffId && touched.staffId && (
          <Text style={styles.error}>{errors.staffId}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit as any}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Verifying..." : "Sign up"}
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
    alignItems: "flex-start", 
    // justifyContent: "center",
    paddingHorizontal: 40, 
    paddingTop: 100,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "flex-start", 
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 40,
    lineHeight: 32,
    textAlign: "left",
  },
  subheading: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 28,
    textAlign: "left",
  },
  form: {
    width: "100%",
    maxWidth: 360,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    color: "#111827",
    marginBottom: 16, // more spacing between input and button
  },
  button: {
    backgroundColor: "#0D5C3D",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
