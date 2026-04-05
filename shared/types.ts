export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface HealthStatus {
  status: string;
  message: string;
}
