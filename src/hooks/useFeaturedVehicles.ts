import { useQuery } from '@tanstack/react-query';
import apiService from '../services/api';

export const useFeaturedVehicles = () => {
  return useQuery({
    queryKey: ['featured-vehicles'],
    queryFn: async () => {
      const response = await apiService.getFeaturedVehicles();
      if (!response.success) {
        throw new Error(response.message || 'Erro ao carregar veículos em destaque');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}; 