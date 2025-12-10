import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { complaintAPI } from "../services/api";
import type { ComplaintRequest } from "../types/apiTypes";

const ComplaintForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fileName, setFileName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type DocumentPickerResult =
    | DocumentPickerCancelledResult
    | DocumentPickerSuccessResult;

  interface DocumentPickerCancelledResult {
    type: "cancel";
  }

  interface DocumentPickerSuccessResult {
    type: "success";
    uri: string;
    name: string;
    size?: number;
  }

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Validation Error", "Description is required");
      return false;
    }
    return true;
  };

  function isSuccess(
    result: any
  ): result is { type: "success"; uri: string; name: string } {
    return result.type === "success";
  }

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (isSuccess(result)) {
      setFileName(result.name);
      console.log(result.uri);
    } else {
      console.log("Cancelled");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const complaintData: ComplaintRequest = {
      title,
      description,
      location,
      is_anonymous: isAnonymous,
    };

    setIsSubmitting(true);
    try {
      const response = await complaintAPI.makeComplaint(complaintData);
      Alert.alert(
        "Success",
        `Your complaint has been submitted successfully${
          response?.category ? ` (${response.category})` : ""
        }`
      );

      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setFileName("");
      setIsAnonymous(false);

      onClose();
    } catch (error) {
      Alert.alert(
        "Submission Failed",
        (error as Error).message ||
          "There was an error submitting your complaint. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>New Complaint</Text>

      <Text style={styles.subHeading}>
        Provide a clear title and description of your complaint
      </Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Water leakage in kitchen"
        value={title}
        onChangeText={setTitle}
        style={styles.inputRounded}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Provide detailed description of the issue, timeframe, and location."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.inputMultiline}
      />

      {/* Location */}
      <Text style={styles.label}>Location (optional)</Text>
      <TextInput
        placeholder="Kitchen"
        value={location}
        onChangeText={setLocation}
        style={styles.inputRounded}
      />

      {/* Attachments */}
      <Text style={[styles.label, { marginBottom: 8 }]}>
        Attachments (optional)
      </Text>
      <TouchableOpacity onPress={handleFilePick} style={styles.fileUpload}>
        <Feather name="upload" size={24} color="#888" />
        <Text style={styles.fileText}>
          {fileName || "Add file (PNG, JPG, PDF)"}
        </Text>
      </TouchableOpacity>

      {/* Anonymous Toggle */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Keep me anonymous</Text>
        <Switch
          value={isAnonymous}
          onValueChange={setIsAnonymous}
          trackColor={{ false: "#ccc", true: "#4ade80" }}
          thumbColor={
            Platform.OS === "android" ? (isAnonymous ? "#fff" : "#fff") : undefined
          }
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
      >
        <Text style={styles.submitText}>
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0F1720",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  inputRounded: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 12,
    marginBottom: 12,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  fileUpload: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  fileText: {
    marginLeft: 12,
    color: "#6B7280",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 14,
    color: "#374151",
  },
  submitButton: {
    backgroundColor: "#004E2B",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ComplaintForm;
