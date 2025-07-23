import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

// Tipos mínimos
interface VehicleImage {
  id: number;
  cloudinary_id: string;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  order_index: number;
  file_size?: number;
  width?: number;
  height?: number;
}

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  color: string;
  fuel_type: string;
  transmission: string;
  is_featured: boolean;
  stand?: {
    name: string;
    city: string;
  };
  images?: VehicleImage[];
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

  async getVehicle(id: number): Promise<ApiResponse<Vehicle>> {
    const response: AxiosResponse<ApiResponse<Vehicle>> = await this.api.get(`/vehicles/${id}`);
    return response.data;
  }

  async getFeaturedVehicles(): Promise<ApiResponse<Vehicle[]>> {
    const response: AxiosResponse<ApiResponse<Vehicle[]>> = await this.api.get('/vehicles/featured/list');
    return response.data;
  }

  // Vehicle Images methods
  async getVehicleImages(vehicleId: number): Promise<ApiResponse<VehicleImage[]>> {
    const response: AxiosResponse<ApiResponse<VehicleImage[]>> = await this.api.get(`/vehicles/${vehicleId}/images`);
    return response.data;
  }

  async uploadVehicleImages(vehicleId: number, images: File[]): Promise<ApiResponse<VehicleImage[]>> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images[]', image);
    });

    const response: AxiosResponse<ApiResponse<VehicleImage[]>> = await this.api.post(
      `/vehicles/${vehicleId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async deleteVehicleImage(vehicleId: number, imageId: number): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.api.delete(`/vehicles/${vehicleId}/images/${imageId}`);
    return response.data;
  }

  async setPrimaryImage(vehicleId: number, imageId: number): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.api.put(`/vehicles/${vehicleId}/images/${imageId}/primary`);
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