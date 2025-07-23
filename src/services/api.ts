import axios from 'axios';

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
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Interceptor para adicionar token de autenticação
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para lidar com erros de autenticação
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Vehicle methods
  async getVehicles(params?: any): Promise<ApiResponse<any>> {
    const response: any = await this.api.get('/vehicles', { params });
    return response.data;
  }

  async getVehicle(id: number): Promise<ApiResponse<any>> {
    const response: any = await this.api.get(`/vehicles/${id}`);
    return response.data;
  }

  async getFeaturedVehicles(): Promise<ApiResponse<any>> {
    const response: any = await this.api.get('/vehicles/featured/list');
    return response.data;
  }

  // Vehicle Images methods
  async getVehicleImages(vehicleId: number): Promise<ApiResponse<VehicleImage[]>> {
    const response: any = await this.api.get(`/vehicles/${vehicleId}/images`);
    return response.data;
  }

  async uploadVehicleImages(vehicleId: number, images: File[]): Promise<ApiResponse<VehicleImage[]>> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images[]', image);
    });

    const response: any = await this.api.post(
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
    const response: any = await this.api.delete(`/vehicles/${vehicleId}/images/${imageId}`);
    return response.data;
  }

  async setPrimaryImage(vehicleId: number, imageId: number): Promise<ApiResponse<any>> {
    const response: any = await this.api.put(`/vehicles/${vehicleId}/images/${imageId}/primary`);
    return response.data;
  }

  // Favorites methods
  async getFavorites(): Promise<ApiResponse<any>> {
    const response: any = await this.api.get('/favorites');
    return response.data;
  }

  async addToFavorites(vehicleId: number): Promise<ApiResponse<any>> {
    const response: any = await this.api.post('/favorites', {
      vehicle_id: vehicleId
    });
    return response.data;
  }

  async removeFromFavorites(vehicleId: number): Promise<ApiResponse<any>> {
    const response: any = await this.api.delete(`/favorites/${vehicleId}`);
    return response.data;
  }

  async checkFavorite(vehicleId: number): Promise<ApiResponse<any>> {
    const response: any = await this.api.get(`/favorites/check/${vehicleId}`);
    return response.data;
  }

  async toggleFavorite(vehicleId: number): Promise<ApiResponse<any>> {
    const response: any = await this.api.post('/favorites/toggle', {
      vehicle_id: vehicleId
    });
    return response.data;
  }

  // Auth methods
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    const response: any = await this.api.post('/auth/login', {
      email,
      password
    });
    return response.data;
  }

  async register(name: string, email: string, password: string, password_confirmation: string): Promise<ApiResponse<any>> {
    const response: any = await this.api.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation
    });
    return response.data;
  }

  async logout(): Promise<ApiResponse<any>> {
    const response: any = await this.api.post('/auth/logout');
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response: any = await this.api.get('/auth/user');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    const response: any = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 