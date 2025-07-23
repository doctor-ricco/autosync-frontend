import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  HeartOff, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  Users, 
  Car,
  Star,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiService from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useCheckFavorite, useAddFavorite, useRemoveFavorite } from '../../hooks/useFavorites';

interface VehicleImage {
  id: number;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  order_index: number;
}

interface Stand {
  id: number;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  latitude: string;
  longitude: string;
  business_hours: any;
  is_active: boolean;
}

interface Vehicle {
  id: number;
  stand_id: number;
  reference: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  engine_size: string;
  power_hp: number;
  doors: number;
  seats: number;
  color: string;
  price: number;
  original_price: number;
  discount_percentage: number;
  description: string;
  features: string[];
  status: string;
  is_featured: boolean;
  is_new: boolean;
  views_count: number;
  stand: Stand;
  images: VehicleImage[];
  primary_image: VehicleImage | null;
  hasDiscount: boolean;
}

export const VehicleShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Carregar dados do veículo
  const { data: vehicleData, isLoading, isError, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const response = await apiService.getVehicle(Number(id));
      if (!response.success) {
        throw new Error(response.message || 'Erro ao carregar veículo');
      }
      return response.data;
    },
    enabled: !!id,
  });

  const vehicle = vehicleData;
  
  // Hooks de favoritos - só verificar se usuário estiver logado
  const { data: favoriteData } = useCheckFavorite(Number(id), {
    enabled: !!user && !!id, // Só executar se usuário estiver logado
  });
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = user ? (favoriteData?.is_favorite || false) : false;
  const isLoadingFavorite = addFavorite.isPending || removeFavorite.isPending;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  // Funções auxiliares
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
      diesel: 'Gasóleo',
      hybrid: 'Híbrido',
      electric: 'Elétrico',
      lpg: 'GPL'
    };
    return labels[fuelType] || fuelType;
  };

  const getTransmissionLabel = (transmission: string) => {
    const labels: { [key: string]: string } = {
      manual: 'Manual',
      automatic: 'Automático',
      semi_automatic: 'Semi-automático'
    };
    return labels[transmission] || transmission;
  };

  const nextImage = () => {
    if (vehicle && vehicle.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === vehicle.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (vehicle && vehicle.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? vehicle.images.length - 1 : prev - 1
      );
    }
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (vehicle && !isLoadingFavorite) {
      try {
        if (isFavorite) {
          await removeFavorite.mutateAsync(vehicle.id);
        } else {
          await addFavorite.mutateAsync(vehicle.id);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-primary-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando veículo...</p>
        </div>
      </div>
    );
  }

  if (isError || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Veículo não encontrado
          </h3>
          <p className="text-gray-600 mb-4">{error?.message || 'O veículo solicitado não existe.'}</p>
          <button
            onClick={() => navigate('/vehicles')}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Voltar aos veículos
          </button>
        </div>
      </div>
    );
  }

  const currentImage = vehicle.images[currentImageIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavoriteClick}
                disabled={isLoadingFavorite}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  vehicle && isFavorite
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${isLoadingFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {vehicle && isFavorite ? <Heart className="h-5 w-5" /> : <HeartOff className="h-5 w-5" />}
                <span className="hidden sm:inline">
                  {vehicle && isFavorite ? 'Favorito' : 'Favoritar'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
              {vehicle.images.length > 0 ? (
                <>
                  <img
                    src={currentImage.url}
                    alt={currentImage.alt_text || `${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-96 object-cover cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                  />
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {vehicle.images.length}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <Car className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {vehicle.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {vehicle.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt_text || `${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {vehicle.year} • {formatMileage(vehicle.mileage)}
                  </p>
                </div>
                {vehicle.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Destaque
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(vehicle.price)}
                </span>
                {vehicle.hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(vehicle.original_price)}
                  </span>
                )}
              </div>
              {vehicle.hasDiscount && (
                <p className="text-green-600 text-sm mt-1">
                  {vehicle.discount_percentage}% de desconto
                </p>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificações</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Ano</p>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Quilometragem</p>
                    <p className="font-medium">{formatMileage(vehicle.mileage)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Combustível</p>
                    <p className="font-medium">{getFuelTypeLabel(vehicle.fuel_type)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Transmissão</p>
                    <p className="font-medium">{getTransmissionLabel(vehicle.transmission)}</p>
                  </div>
                </div>
                {vehicle.engine_size && (
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Motor</p>
                      <p className="font-medium">{vehicle.engine_size}L</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Lugares</p>
                    <p className="font-medium">{vehicle.seats}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipamentos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stand Information */}
        <div className="mt-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Stand</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{vehicle.stand.name}</h4>
                <p className="text-gray-600 mb-4">{vehicle.stand.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">
                      {vehicle.stand.address}, {vehicle.stand.city}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a href={`tel:${vehicle.stand.phone}`} className="text-primary-600 hover:text-primary-700">
                      {vehicle.stand.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <a href={`mailto:${vehicle.stand.email}`} className="text-primary-600 hover:text-primary-700">
                      {vehicle.stand.email}
                    </a>
                  </div>
                  {vehicle.stand.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <a 
                        href={vehicle.stand.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Visitar website
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Contactar Stand</span>
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Ver Localização</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={currentImage.url}
              alt={currentImage.alt_text || `${vehicle.brand} ${vehicle.model}`}
              className="max-w-full max-h-full object-contain"
            />
            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 