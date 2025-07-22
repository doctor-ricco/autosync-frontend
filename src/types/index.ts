// User types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role: 'admin' | 'manager' | 'seller' | 'viewer';
  phone?: string;
  avatar_url?: string;
  stand_id?: number;
  commission_rate: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  stand?: Stand;
}

// Stand types
export interface Stand {
  id: number;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  users?: User[];
  vehicles?: Vehicle[];
}

// Vehicle types
export interface Vehicle {
  id: number;
  stand_id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'lpg';
  transmission: 'manual' | 'automatic';
  engine_size: string;
  power: number;
  color: string;
  price: number;
  description?: string;
  features: string[];
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  stand?: Stand;
  images?: VehicleImage[];
  favorites?: Favorite[];
}

// Vehicle Image types
export interface VehicleImage {
  id: number;
  vehicle_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// Favorite types
export interface Favorite {
  id: number;
  user_id: number;
  vehicle_id: number;
  created_at: string;
  updated_at: string;
  vehicle?: Vehicle;
  user?: User;
}

// Inquiry types
export interface Inquiry {
  id: number;
  vehicle_id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
  vehicle?: Vehicle;
}

// Sale types
export interface Sale {
  id: number;
  vehicle_id: number;
  seller_id: number;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  sale_price: number;
  commission_amount: number;
  sale_date: string;
  payment_method: 'cash' | 'financing' | 'lease';
  notes?: string;
  created_at: string;
  updated_at: string;
  vehicle?: Vehicle;
  seller?: User;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface PaginatedResponse<T> {
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

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    token_type: string;
  };
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: string;
  stand_id?: number;
}

// Filter types
export interface VehicleFilters {
  brand?: string;
  model?: string;
  min_price?: number;
  max_price?: number;
  min_year?: number;
  max_year?: number;
  fuel_type?: string;
  transmission?: string;
  min_mileage?: number;
  max_mileage?: number;
  stand_id?: number;
  is_available?: boolean;
  is_featured?: boolean;
  search?: string;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicle_id?: number;
} 