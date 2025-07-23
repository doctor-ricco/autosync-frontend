import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Star, MapPin, Calendar } from 'lucide-react';

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

  // Encontrar imagem principal
  const primaryImage = vehicle.images?.find(img => img.is_primary) || vehicle.images?.[0];

  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="card hover:shadow-lg transition-shadow duration-200 group"
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
        {vehicle.is_featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Destaque
          </div>
        )}
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
          
          {vehicle.stand && (
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {vehicle.stand.city}
            </div>
          )}
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}; 