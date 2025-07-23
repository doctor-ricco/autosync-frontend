import { useQuery } from '@tanstack/react-query';
import apiService from '../services/api';

interface VehicleFilters {
  search?: string;
  brand?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  fuel_type?: string;
  transmission?: string;
  page?: number;
  per_page?: number;
}

export const useVehicles = (filters: VehicleFilters = {}) => {
  return useQuery({
    queryKey: ['vehicles', filters],
    queryFn: async () => {
      const response = await apiService.getVehicles(filters);
      if (!response.success) {
        throw new Error(response.message || 'Erro ao carregar veículos');
      }
      return response; // Retornar a resposta completa, não apenas response.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
}; 