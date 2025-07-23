import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

// Tipos mínimos
interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  color: string;
  is_featured: boolean;
  stand?: {
    name: string;
    city: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message: string;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  // Vehicle methods
  async getVehicles(filters?: any, page: number = 1): Promise<PaginatedResponse<Vehicle>> {
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

  async getFeaturedVehicles(): Promise<ApiResponse<Vehicle[]>> {
    const response: AxiosResponse<ApiResponse<Vehicle[]>> = await this.api.get('/vehicles/featured/list');
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