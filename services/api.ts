// api.ts (React Native Version)
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type {
  ComplaintLog,
  CategoryAnalysis,
  ComplaintRequest,
  ComplaintResponse,
  AnalyticsOverview,
  ResponseTimeAnalysis,
  TrendsData,
  VerifyRequest,
  VerifyResponse,
  SetPasswordRequest,
  SetPasswordResponse,
  LoginRequest,
  LoginResponse,
  AuthUser,
  UserProfile,
  adminComplaintLog,
} from "../types/apiTypes";


const API_BASE_URL = "https://gxjgwzbf-8000.uks1.devtunnels.ms";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// -----------------------------
// AUTH SESSION (AsyncStorage)
// -----------------------------
export const authSession = {
  // STAFF ID
  async getStaffId(): Promise<string | null> {
    return await AsyncStorage.getItem("staffId");
  },

  async setStaffId(staffId: string) {
    await AsyncStorage.setItem("staffId", staffId);
  },

  // USER
  async setUser(user: AuthUser) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  },

  async getUser(): Promise<AuthUser | null> {
    const raw = await AsyncStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  async clearUser() {
    await AsyncStorage.removeItem("user");
  },

  // TOKEN
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("token");
  },

  async setToken(token: string) {
    await AsyncStorage.setItem("token", token);
  },

  async clearToken() {
    await AsyncStorage.removeItem("token");
  },

  // COMPLAINT SUMMARY
  async setComplaintSummary(summary: any) {
    await AsyncStorage.setItem("complaintSummary", JSON.stringify(summary));
  },

  async getComplaintSummary() {
    return await AsyncStorage.getItem("complaintSummary");
  },

  async clearComplaintSummary() {
    await AsyncStorage.removeItem("complaintSummary");
  },

  async clearAll() {
    await Promise.all([
      this.clearUser(),
      this.clearToken(),
      this.clearStaffId(),
      this.clearComplaintSummary(),
    ]);
  },

  async clearStaffId() {
    await AsyncStorage.removeItem("staffId");
  },
};


// Add token to requests (async version)
api.interceptors.request.use(async (config) => {
  const token = await authSession.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH API ENDPOINTS

export const authAPI = {
  verify: async (payload: VerifyRequest): Promise<VerifyResponse> => {
    const res = await api.post("/api/auth/check-staff/", payload);
    return res.data;
  },

  setPassword: async (
    payload: SetPasswordRequest
  ): Promise<SetPasswordResponse> => {
    const res = await api.post("/api/auth/setup-password/", payload);
    return res.data;
  },

  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post("/api/auth/login/", payload);
    return res.data;
  },

  forgotPassowrd: async (payload: { staff_id: string }) => {
    const res = await api.post("/api/auth/forgot-password/", payload);
    return res.data;
  },

  resetPassowrd: async (payload: {
    staff_id: string | null;
    otp: number | undefined;
    new_password: string;
  }) => {
    const res = await api.post("/auth/reset-password/", payload);
    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post("/api/auth/token/refresh/");
    return res.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get("/api/user/profile/");
    return res.data;
  },
};
//COMPLAINT API SECTION

export const complaintAPI = {
  makeComplaint: async (
    complaint: ComplaintRequest
  ): Promise<ComplaintResponse> => {
    const res = await api.post("/api/user/complaints/create/", complaint);
    return res.data;
  },

  getComplaints: async (): Promise<ComplaintLog> => {
    const res = await api.get("/api/user/dashboard/");
    return res.data;
  },

  getPublicComplaints: async (): Promise<ComplaintLog> => {
    const res = await api.get("/api/user/dashboard/public-anonymous/");
    return res.data;
  },

  getComplaint: async (id: number): Promise<ComplaintLog> => {
    const res = await api.get(`/api/complaints/${id}`);
    return res.data;
  },

  deleteComplaint: async (id: number): Promise<void> => {
    await api.delete(`/api/user/complaints/${id}/delete/`);
  },

  getAdminPageComplaints: async (): Promise<adminComplaintLog> => {
    const res = await api.get("/api/admin/complaints/");
    return res.data;
  },
};

//   // Analytics
//   getAnalyticsOverview: async (): Promise<AnalyticsOverview> => {
//     const res = await api.get("/analytics/overview");
//     return res.data;
//   },

//   getCategoryAnalysis: async (): Promise<CategoryAnalysis> => {
//     const res = await api.get("/analytics/category-analysis");
//     return res.data;
//   },

//   getResponseTimeAnalysis: async (): Promise<ResponseTimeAnalysis> => {
//     const res = await api.get("/analytics/response-time-analysis");
//     return res.data;
//   },

//   getTrends: async (days: number = 30): Promise<TrendsData> => {
//     const res = await api.get(`/analytics/trends?days=${days}`);
//     return res.data;
//   },
// };
