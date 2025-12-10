export interface VerifyRequest {
  staff_id: string;
}
export interface VerifyResponse {
  status: number;
  message: string;
  data: {
    password_setup_required: boolean;
  };
}
export interface SetPasswordRequest {
  staff_id: string;
  password: string;
}

export interface SetPasswordResponse {
  status: number;
  message: string;
  data: {};
}

export interface LoginRequest {
  staff_id: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    staff: any;
    tokens: {
      refresh: string;
      access: string;
    };
    total: number;
    completed: number;
  };
}

export type AuthUser = {
  name: string;
  staff_id: string;
  role: string;
  email: string;
  job_title: string;
} | null;

export type AuthContextValue = {
  user: AuthUser;
  setIsAuthenticated: any;
  isAuthenticated: boolean;
  handleRefreshToken : () => void
};

// ---------------- Complaint Types ----------------
export type ComplaintStatus = "Unread" | "Read" | "In progress" | "Completed";

export type ComplaintCategory = "admin" | "facility management";

export type ComplaintPriority = "low" | "medium" | "high";

export interface ComplaintUpdate {
  date: string;
  message: string;
}
export interface Complaint {
  id: number;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  is_Anonymous?: boolean;
  anonymity_scope?: "private" | "public";
  employee_name?: string;
  created_at: string;
  updated_at?: string;
  location?: string;
  flagged?: boolean; 
}

export interface getComplaintsResponse {
  status: number;
  message: string;
  data: {
    summary: {
      total: number;
      completed: number;
      unread: number;
      read: number;
      in_progress: number;
    };
    complaint_history: Complaint[];
  };
}

export interface ComplaintRequest {
  priority?: ComplaintPriority;
  category?: ComplaintCategory;
  anonymity_scope?: "private" | "public";
  title: string;
  description: string;
  location?: string;
  is_anonymous?: boolean;
}

export interface ComplaintResponse {
  category: string;
  response_time_ms: number;
  timestamp: string;
}

export interface ComplaintLog {
  status: number;
  message: string;
  data: {
    summary: {
      total: number;
      completed: number;
      unread: number;
      read: number;
      inprogress: number;
    };
    complaint_history: Complaint[];
  };
}

export interface adminComplaintLog {
  status: number;
  message: string;
  data: {
    total: number;
    complaints: Complaint[];
  };
}

export interface UserProfile {
  name: string;
  email: string;
  total_complaints: number;
  resolved_complaints: number;
}

export interface StatsResponse {
  total_complaints: number;
  categories: Record<string, number>;
  average_response_time_ms: number;
}

export interface AnalyticsOverview {
  total_complaints: number;
  categories: Record<string, number>;
  response_time_stats: {
    average_ms: number;
    median_ms: number;
    min_ms: number;
    max_ms: number;
    std_dev_ms: number;
    fast_requests: number;
    slow_requests: number;
  };
  trends: {
    daily_counts: Record<string, number>;
    period: string;
  };
  recent_activity: Array<{
    id: number;
    category: string;
    response_time_ms: number;
    timestamp: string;
    text_preview: string;
  }>;
}

export interface CategoryAnalysis {
  categories: Record<
    string,
    {
      count: number;
      avg_response_time_ms: number;
      recent_complaints: Array<{
        id: number;
        text_preview: string;
        response_time_ms: number;
        timestamp: string;
      }>;
    }
  >;
}

export interface ResponseTimeAnalysis {
  overall_stats: {
    mean_ms: number;
    median_ms: number;
    std_dev_ms: number;
    min_ms: number;
    max_ms: number;
  };
  response_time_distribution: Record<string, number>;
  slow_requests: Array<{
    id: number;
    category: string;
    response_time_ms: number;
    text_preview: string;
    timestamp: string;
  }>;
}

export interface TrendsData {
  daily_data: Array<{
    date: string;
    total: number;
    categories: Record<string, number>;
  }>;
  category_trends: Record<
    string,
    Array<{
      date: string;
      count: number;
    }>
  >;
  period_days: number;
}

export interface AdminComplaintResponse {
  complaints: Complaint[];
  total: number;
  resolved: number;
  unresolved: number;
}

export interface ComplaintDetailsResponse {
  complaint: Complaint;
  reporter?: {
    name: string;
    department: string;
    email: string;
  } | null;
}


export interface ComplaintListResponse {
  complaints: Complaint[];
  total: number;
  page: number;
  page_size: number;
}

export interface UpdateComplaintStatusRequest {
  complaintId: string;
  status: ComplaintStatus;
}
export interface UpdateComplaintStatusResponse {
  message: string;
  updatedComplaint: Complaint;
}

export type NotificationType = {
  status: string;
  id: string;
  submittedDate: string;
};

