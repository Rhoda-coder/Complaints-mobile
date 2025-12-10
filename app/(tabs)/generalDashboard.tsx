import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { complaintAPI } from "../../services/api"; // adjust path
import type { Complaint } from "../../types/apiTypes";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";

const GeneralDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        const res = await complaintAPI.getPublicComplaints();
        setComplaints(complaints); //res.data.complaints
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filtered = complaints.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Anonymous Complaint History</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search complaints..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Loading */}
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color="#0a7d4f" />
          <Text style={{ marginLeft: 8, color: "#777" }}>
            Loading complaints...
          </Text>
        </View>
      )}

      {/* Error */}
      {!isLoading && error && (
        <View style={styles.center}>
          <Text style={{ color: "red" }}>
            Failed to load complaints. Please try again.
          </Text>
        </View>
      )}

      {/* No data */}
      {!isLoading && !error && filtered.length === 0 && (
        <View style={styles.center}>
          <Text style={{ color: "#777" }}>No complaints found.</Text>
        </View>
      )}

      {/* List */}
      {!isLoading && !error && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.rowText}>
                <Text style={styles.label}>Name:</Text> Anonymous
              </Text>
              <Text style={styles.rowText}>
                <Text style={styles.label}>Title:</Text> {item.title}
              </Text>
              <Text style={styles.rowText}>
                <Text style={styles.label}>Date:</Text>{" "}
                {item.created_at.split("T")[0]}
              </Text>
              <Text style={styles.rowText}>
                <Text style={styles.label}>Category:</Text> {item.category}
              </Text>
              <Text style={styles.rowText}>
                <Text style={styles.label}>Priority:</Text> {item.priority}
              </Text>
            </View>
          )}
        />
      )}
    </View>
    
  );
};

export default GeneralDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },

  searchContainer: {
    marginTop: 12,
    position: "relative",
    justifyContent: "center",
  },

  searchIcon: {
    position: "absolute",
    left: 12,
    zIndex: 2,
  },

  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 14,
  },

  center: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  rowText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },

  label: {
    fontWeight: "600",
    color: "#555",
  },
});
