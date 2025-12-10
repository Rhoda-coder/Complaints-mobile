// import React from "react";
// import { Text, View, Image, TouchableOpacity } from "react-native";
// import { MaterialIcons, Feather } from "@expo/vector-icons";

// const UserProfile = () => {
//   const profile = {
//     total_complaints: 12,
//     resolved_complaints: 8,
//     email: "hhhg@example.com",
//     name: "John Doe",
//   };

//   return (
//     <View className="flex-1 bg-white">
//       <View className="flex-row items-center p-4 bg-white">
//         <Image
//           source={require("../../assets/logo.png")}
//           className="w-40 h-12"
//           resizeMode="contain"
//         />
//       </View>

//       <View className="flex-1 px-4 py-2 items-center">
//         <View className="w-full max-w-md">
//           <Text className="text-2xl font-semibold text-gray-800 mb-2">
//             Profile
//           </Text>

//           <View className="bg-gray-100 rounded-2xl border p-6 shadow">
//             <View className="flex-row items-center flex-wrap">
//               <View className="w-12 h-12 rounded-full bg-[#004E2B] flex items-center justify-center">
//                 <Text className="text-white text-lg font-bold">
//                   {profile.name.charAt(0).toUpperCase()}
//                 </Text>
//               </View>

//               <View className="flex-1 ml-4">
//                 <Text className="text-base font-semibold text-gray-800">
//                   {profile.name}
//                 </Text>
//                 <Text className="text-sm text-gray-500">{profile.email}</Text>
//               </View>
//             </View>

//             <View className="flex-row flex-wrap mt-6">
//               <View className="border rounded-lg px-5 py-3 bg-white shadow w-32 items-center mr-4 mb-4">
//                 <Text className="text-3xl font-semibold text-gray-800">
//                   {profile.total_complaints}
//                 </Text>
//                 <Text className="text-xs text-gray-500">Total complaints</Text>
//               </View>

//               <View className="border rounded-lg px-5 py-3 bg-white shadow w-32 items-center mb-4">
//                 <Text className="text-3xl font-semibold text-gray-800">
//                   {profile.resolved_complaints}
//                 </Text>
//                 <Text className="text-xs text-gray-500">Resolved complaints</Text>
//               </View>
//             </View>
//           </View>

//           <View className="mt-6">
//             <Text className="text-sm font-medium text-gray-700 mb-3">
//               Account details
//             </Text>

//             <View className="border border-gray-300 rounded-xl p-4 flex-row items-center bg-white shadow">
//               <MaterialIcons name="email" size={22} color="gray" />
//               <View className="ml-3">
//                 <Text className="text-xs font-semibold text-black">Email</Text>
//                 <Text className="text-sm text-gray-700">{profile.email}</Text>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() => console.log("Logout pressed")}
//             className="w-full bg-[#014E2C] py-3 mt-6 rounded-lg flex-row items-center justify-center"
//           >
//             <Feather name="log-out" size={25} color="white" />
//             <Text className="text-white font-medium text-base ml-2">Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default UserProfile;

//
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { authSession } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";

const ProfilePage = () => {
  // const navigation = useNavigation();
  // const { user } = useAuth();
  // const complaintSummary = authSession.getComplaintSummary();

  // const handleLogout = () => {
  //   authSession.clearAll();
  //   navigation.navigate("Login" as never);
  // };

  // const totalComplaints = complaintSummary
  //   ? JSON.parse(complaintSummary).total
  //   : 0;
  // const resolvedComplaints = complaintSummary
  //   ? JSON.parse(complaintSummary).completed
  //   : 0;

  return (

    // <View style={{ flex: 1 }}>
    //   <Header/>
    
    <View style={styles.mainContent}>
      {/* Heading */}
      <Text style={styles.heading}>Profile</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          {/* <Text style={styles.summaryNumber}>{totalComplaints}</Text> */}
          <Text style={styles.summaryLabel}>Total complaints</Text>
        </View>

        <View style={styles.summaryCard}>
          {/* <Text style={styles.summaryNumber}>{resolvedComplaints}</Text> */}
          <Text style={styles.summaryLabel}>Resolved complaints</Text>
        </View>
      </View>

      {/* User Info Section */}
      <View style={styles.accountSection}>
        <Text style={styles.accountHeading}>Account details</Text>

        <View style={styles.infoCard}>
          <MaterialIcons name="email" size={22} color="gray" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Email</Text>
            {/* <Text style={styles.infoValue}>{user?.email}</Text> */}
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        {/* onPress={handleLogout} */}
        <Feather name="log-out" size={25} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
    padding: 4,
  },
  logo: {
    width: 160,
    height: 48,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "600",
    color: "#111827",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  accountSection: {
    marginBottom: 20,
  },
  accountHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 10,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoText: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  infoValue: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#014E2C",
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
});
