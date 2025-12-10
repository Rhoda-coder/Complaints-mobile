import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintCard from "../../components/ComplaintCard";
import type { Complaint } from "../../types/apiTypes";
import { useAuth } from "../../context/AuthContext";
import { complaintAPI } from "../../services/api";
import Header from "@/components/Header";

const UserDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { handleRefreshToken } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complaintsSummary, setComplaintsSummary] = useState<any>({
    read: 0,
    unread: 0,
    in_progress: 0,
    completed: 0,
  });

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  

    // filter complaints
     const filteredComplaints = useMemo(() => {
      if (!complaints) return;
      let tempComplaints = [...complaints];
      if (searchQuery.trim() !== "") {
        tempComplaints = tempComplaints.filter((complaint) =>
          complaint.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return tempComplaints;
    }, [searchQuery, complaints]);


  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteComplaint = async (id: number | undefined) => {
    setIsDetailDialogOpen(false);
    await complaintAPI.deleteComplaint(id as number);
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await complaintAPI.getComplaints();
        if (res.status === 401) {
          handleRefreshToken();
          return;
        }
        setComplaints(res.data.complaint_history);
        setComplaintsSummary(res.data.summary);
      } catch (error) {
        setError("Error loading complaints, try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [isDetailDialogOpen]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <View style={styles.summaryHeader}>
            <Ionicons name="time-outline" size={20} color="#0B5137" />
            <Text style={styles.summaryText}>Unresolved</Text>
          </View>
          <Text style={styles.summaryNumber}>
            {complaintsSummary.read + complaintsSummary.unread + complaintsSummary.in_progress}
          </Text>
        </View>

        <View style={styles.summaryBox}>
          <View style={styles.summaryHeader}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#0B5137"
            />
            <Text style={styles.summaryText}>Resolved</Text>
          </View>
          <Text style={styles.summaryNumber}>{complaintsSummary.completed}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search complaints"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Complaints List */}
      <ScrollView style={styles.scrollContainer}>
        {complaints.length > 0 ? (
          complaints
            .filter((item) =>
              searchQuery === ""
                ? true
                : item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onViewDetails={handleViewDetails}
              />
            ))
        ) : ( 
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No complaints yet</Text>
            <Text style={styles.emptySubtitle}>Tap + to submit one</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating + Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floatingButton}
      >
        <Feather name="plus" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal with ComplaintForm */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>

            <ComplaintForm onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: "#F2F7EE",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#737373",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 8,
  },
  searchContainer: {
    marginTop: 32,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    top: 12,
    left: 10,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#f3f3f3",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  scrollContainer: {
    marginTop: 24,
    marginBottom: 112,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  emptySubtitle: {
    color: "#6b7280",
  },
  floatingButton: {
    position: "absolute",
    bottom: 99,
    right: 24,
    backgroundColor: "#014E2C",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "95%",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
});

export default UserDashboard;
