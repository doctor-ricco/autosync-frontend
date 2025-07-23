import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Star, MapPin, Calendar, Heart, HeartOff } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useCheckFavorite, useAddFavorite, useRemoveFavorite } from '../../../hooks/useFavorites';

interface VehicleCardProps {
  vehicle: {
    id: number;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    fuel_type: string;
    transmission: string;
    is_featured: boolean;
    stand?: {
      city: string;
    };
    images?: Array<{
      id: number;
      cloudinary_id: string;
      url: string;
      is_primary: boolean;
    }>;
  };
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { user } = useAuth();
  const { data: favoriteData } = useCheckFavorite(vehicle.id);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = favoriteData?.is_favorite || false;
  const isLoading = addFavorite.isPending || removeFavorite.isPending;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-PT').format(mileage) + ' km';
  };

  const getFuelTypeLabel = (fuelType: string) => {
    const labels: { [key: string]: string } = {
      gasoline: 'Gasolina',
      diesel: 'Diesel',
      hybrid: 'Híbrido',
      electric: 'Elétrico',
      lpg: 'GPL'
    };
    return labels[fuelType] || fuelType;
  };

  const getTransmissionLabel = (transmission: string) => {
    return transmission === 'manual' ? 'Manual' : 'Automático';
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirecionar para login se não estiver autenticado
      window.location.href = '/login';
      return;
    }
    
    if (isLoading) return;

    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(vehicle.id);
      } else {
        await addFavorite.mutateAsync(vehicle.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Encontrar imagem principal
  const primaryImage = vehicle.images?.find(img => img.is_primary) || vehicle.images?.[0];

  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="card hover:shadow-lg transition-shadow duration-200 group relative"
    >
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Featured Badge */}
        {vehicle.is_featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Destaque
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            user && isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100 hover:text-red-500'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={user ? (isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos') : 'Faça login para favoritar'}
        >
          {user && isFavorite ? (
            <Heart className="h-4 w-4" />
          ) : (
            <HeartOff className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {vehicle.brand} {vehicle.model}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {vehicle.year}
            </span>
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>{getFuelTypeLabel(vehicle.fuel_type)}</span>
            <span>{getTransmissionLabel(vehicle.transmission)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(vehicle.price)}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {vehicle.stand?.city || 'Localização não disponível'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}; 