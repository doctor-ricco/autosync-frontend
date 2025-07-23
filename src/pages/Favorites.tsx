import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, RefreshCw, LogIn } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { VehicleCard } from './vehicles/components/VehicleCard';

export const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { data: favorites = [], isLoading, error, refetch } = useFavorites();

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Acesso restrito
          </h3>
          <p className="text-gray-600 mb-6">
            Precisa estar autenticado para ver os seus favoritos.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
          <p className="text-gray-600 mt-1">
            {favorites.length > 0 ? `${favorites.length} veículos favoritos` : 'Nenhum veículo favorito'}
          </p>
        </div>
        <Link
          to="/vehicles"
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ver todos os veículos
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 text-primary-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando favoritos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erro ao carregar favoritos
          </h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((vehicle: any) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum favorito ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Adicione veículos aos seus favoritos para vê-los aqui.
          </p>
          <Link
            to="/vehicles"
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Explorar Veículos
          </Link>
        </div>
      )}
    </div>
  );
}; 