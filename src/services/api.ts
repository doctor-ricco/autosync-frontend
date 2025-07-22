import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  PaginatedResponse, 
  Vehicle, 
  Stand, 
  User, 
  LoginRequest, 
  LoginResponse,
  VehicleFilters,
  ContactForm,
  Inquiry
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: any): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const response: AxiosResponse<ApiResponse<null>> = await this.api.post('/auth/logout');
    return response.data;
  }

  async me(): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.get('/auth/me');
    return response.data;
  }

  // Vehicle methods
  async getVehicles(filters?: VehicleFilters, page: number = 1): Promise<PaginatedResponse<Vehicle>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    params.append('page', page.toString());

    const response: AxiosResponse<PaginatedResponse<Vehicle>> = await this.api.get(`/vehicles?${params}`);
    return response.data;
  }

  async getVehicle(id: number): Promise<ApiResponse<Vehicle>> {
    const response: AxiosResponse<ApiResponse<Vehicle>> = await this.api.get(`/vehicles/${id}`);
    return response.data;
  }

  async getFeaturedVehicles(): Promise<ApiResponse<Vehicle[]>> {
    const response: AxiosResponse<ApiResponse<Vehicle[]>> = await this.api.get('/vehicles/featured');
    return response.data;
  }

  // Stand methods
  async getStands(): Promise<ApiResponse<Stand[]>> {
    const response: AxiosResponse<ApiResponse<Stand[]>> = await this.api.get('/stands');
    return response.data;
  }

  async getStand(id: number): Promise<ApiResponse<Stand>> {
    const response: AxiosResponse<ApiResponse<Stand>> = await this.api.get(`/stands/${id}`);
    return response.data;
  }

  // User methods
  async getUsers(): Promise<PaginatedResponse<User>> {
    const response: AxiosResponse<PaginatedResponse<User>> = await this.api.get('/users');
    return response.data;
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.get(`/users/${id}`);
    return response.data;
  }

  // Favorites methods
  async getFavorites(): Promise<ApiResponse<any[]>> {
    const response: AxiosResponse<ApiResponse<any[]>> = await this.api.get('/favorites');
    return response.data;
  }

  async addToFavorites(vehicleId: number): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.api.post('/favorites', { vehicle_id: vehicleId });
    return response.data;
  }

  async removeFromFavorites(vehicleId: number): Promise<ApiResponse<null>> {
    const response: AxiosResponse<ApiResponse<null>> = await this.api.delete(`/favorites/${vehicleId}`);
    return response.data;
  }

  // Inquiry methods
  async createInquiry(inquiry: ContactForm): Promise<ApiResponse<Inquiry>> {
    const response: AxiosResponse<ApiResponse<Inquiry>> = await this.api.post('/inquiries', inquiry);
    return response.data;
  }

  // Search methods
  async searchVehicles(query: string): Promise<ApiResponse<Vehicle[]>> {
    const response: AxiosResponse<ApiResponse<Vehicle[]>> = await this.api.get(`/vehicles/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 