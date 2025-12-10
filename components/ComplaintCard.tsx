import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

interface ComplaintCardProps {
  complaint: any;
  onViewDetails: (complaint: any) => void;
}

export default function ComplaintCard({ complaint, onViewDetails }: ComplaintCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "In progress":
        return {
          bg: styles.statusBgInProgress,
          text: styles.statusTextInProgress,
          icon: <MaterialIcons name="hourglass-empty" size={14} color="#a66b00" />,
          label: "In progress",
        };
      case "Read":
        return {
          bg: styles.statusBgRead,
          text: styles.statusTextRead,
          icon: <Ionicons name="mail-open-outline" size={14} color="#FFFFFF" />,
          label: "Read",
        };
      case "Unread":
        return {
          bg: styles.statusBgUnread,
          text: styles.statusTextUnread,
          icon: <Ionicons name="mail-outline" size={14} color="#FFFFFF" />,
          label: "Unread",
        };
      case "Completed":
        return {
          bg: styles.statusBgCompleted,
          text: styles.statusTextCompleted,
          icon: <Ionicons name="checkmark" size={14} color="#027a3e" />,
          label: "Completed",
        };
      default:
        return {
          bg: styles.statusBgUnread,
          text: styles.statusTextUnread,
          icon: <Ionicons name="mail-outline" size={14} color="#FFFFFF" />,
          label: status,
        };
    }
  };

  const statusConfig = getStatusConfig(complaint.status);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onViewDetails(complaint)}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {complaint.title}
        </Text>
        <View style={[styles.statusBadge, statusConfig.bg]}>
          {statusConfig.icon}
          <Text style={statusConfig.text}>{statusConfig.label}</Text>
        </View>
      </View>

      <Text style={styles.dateText}>
        Submitted on{" "}
        {new Date(complaint.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}{" "}
        • #{complaint.id}
      </Text>

      <View style={styles.categoryRow}>
        <View style={styles.categoryLabelRow}>
          <Entypo name="tag" size={14} color="#94a3a8" />
          <Text style={styles.categoryText}>{complaint.category}</Text>
        </View>

        <TouchableOpacity onPress={() => onViewDetails(complaint)}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6eff0",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    color: "#0f1720",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  statusBgInProgress: { backgroundColor: "#fff7e6" },
  statusTextInProgress: { color: "#a66b00", fontSize: 12, fontWeight: "600", marginLeft: 4 },
  statusBgRead: { backgroundColor: "#00A3FF" },
  statusTextRead: { color: "#FFFFFF", fontSize: 12, fontWeight: "600", marginLeft: 4 },
  statusBgUnread: { backgroundColor: "#979797" },
  statusTextUnread: { color: "#FFFFFF", fontSize: 12, fontWeight: "600", marginLeft: 4 },
  statusBgCompleted: { backgroundColor: "#dff7e9" },
  statusTextCompleted: { color: "#027a3e", fontSize: 12, fontWeight: "600", marginLeft: 4 },

  dateText: { fontSize: 12, color: "#94a3a8", fontWeight: "600", marginBottom: 8 },
  categoryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  categoryLabelRow: { flexDirection: "row", alignItems: "center" },
  categoryText: { fontSize: 12, color: "#94a3a8", marginLeft: 4 },
  viewDetailsText: { fontSize: 14, color: "#2bb673", fontWeight: "500" },
});
