import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../services/api';

// Hook para listar favoritos
export const useFavorites = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await apiService.getFavorites();
      if (!response.success) {
        throw new Error(response.message || 'Erro ao carregar favoritos');
      }
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minuto
    gcTime: 5 * 60 * 1000, // 5 minutos
    enabled: options?.enabled !== false, // Padrão é true, mas pode ser desabilitado
  });
};

// Hook para adicionar favorito
export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vehicleId: number) => {
      const response = await apiService.addToFavorites(vehicleId);
      if (!response.success) {
        throw new Error(response.message || 'Erro ao adicionar favorito');
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidar cache de favoritos
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      // Invalidar cache de veículos para atualizar status de favorito
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-vehicles'] });
    },
  });
};

// Hook para remover favorito
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vehicleId: number) => {
      const response = await apiService.removeFromFavorites(vehicleId);
      if (!response.success) {
        throw new Error(response.message || 'Erro ao remover favorito');
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidar cache de favoritos
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      // Invalidar cache de veículos para atualizar status de favorito
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-vehicles'] });
    },
  });
};

// Hook para verificar se um veículo é favorito
export const useCheckFavorite = (vehicleId: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['favorites', 'check', vehicleId],
    queryFn: async () => {
      const response = await apiService.checkFavorite(vehicleId);
      if (!response.success) {
        throw new Error(response.message || 'Erro ao verificar favorito');
      }
      return response.data;
    },
    staleTime: 30 * 1000, // 30 segundos
    gcTime: 2 * 60 * 1000, // 2 minutos
    enabled: options?.enabled !== false, // Padrão é true, mas pode ser desabilitado
  });
}; 