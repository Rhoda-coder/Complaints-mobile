import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Complaint } from "../types/apiTypes";
// import { ComplaintStatus } from "../types/apiTypes";


const ComplaintDetails = ({
  selectedComplaint,
  visible,
  closeDetailDialog,
  handleDeleteComplaint,
}: {
  selectedComplaint: Complaint | null;
  visible: boolean;
  closeDetailDialog: (state: boolean) => void;
  handleDeleteComplaint: (id: number | undefined) => void;
}) => {
  if (!selectedComplaint) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.modalBox}>
          
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => closeDetailDialog(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>

          {/* ID + Status */}
          <View style={styles.tagRow}>
            <View style={[styles.tag, styles.greenTag]}>
              <Text style={styles.tagText}>#{selectedComplaint?.id}</Text>
            </View>

            <View style={[styles.tag, styles.blueTag]}>
              <Text style={[styles.tagText, { color: "white" }]}>
                {selectedComplaint?.status}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{selectedComplaint?.title}</Text>

          <Text style={styles.submittedText}>
            Submitted on: {selectedComplaint?.created_at}
          </Text>

          {/* Location + Category */}
          <View style={styles.detailsBlock}>
            <View style={styles.rowBetween}>
              <Text style={styles.greySmall}>Location</Text>
              <Text>{selectedComplaint?.location || "Unknown"}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.greySmall}>Assigned to</Text>
              <Text>{selectedComplaint?.category || "Unassigned"}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.greySmall}>Description</Text>
            <Text style={styles.descriptionText}>
              {selectedComplaint?.description}
            </Text>
          </View>

          {/* Delete Button */}
          {selectedComplaint?.status !== "In Progress" &&
            selectedComplaint?.status !== "Completed" && (
              <TouchableOpacity
                onPress={() => handleDeleteComplaint(selectedComplaint?.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete Complaint</Text>
              </TouchableOpacity>
            )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ComplaintDetails;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000de",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  modalBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 30,
    padding: 20,
  },

  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  greenTag: {
    backgroundColor: "#bbf7d0",
  },

  blueTag: {
    backgroundColor: "#60a5fa",
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  submittedText: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 15,
  },

  detailsBlock: {
    marginTop: 5,
    marginBottom: 10,
    gap: 8,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  greySmall: {
    color: "#6b7280",
    fontSize: 12,
  },

  descriptionBox: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 16,
    borderRadius: 25,
    marginVertical: 15,
  },

  descriptionText: {
    marginTop: 5,
    fontSize: 16,
    color: "#374151",
  },

  deleteButton: {
    backgroundColor: "#b91c1c",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
