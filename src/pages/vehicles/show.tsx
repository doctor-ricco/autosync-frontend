import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car, MapPin, Calendar, RefreshCw } from 'lucide-react';
import apiService from '../../services/api';

export const VehicleShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadVehicle();
    }
  }, [id]);

  const loadVehicle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar método getVehicle no apiService
      // const response = await apiService.getVehicle(parseInt(id));
      
      // Mock data por enquanto
      setVehicle({
        id: parseInt(id),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        mileage: 45000,
        price: 65000,
        fuel_type: 'diesel',
        transmission: 'automatic',
        color: 'Preto',
        description: 'Veículo em excelente estado...',
        stand: {
          name: 'Stand Exemplo',
          city: 'Lisboa'
        }
      });
    } catch (error) {
      console.error('Error loading vehicle:', error);
      setError('Erro ao carregar dados do veículo');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-PT').format(mileage) + ' km';
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="h-8 w-8 text-primary-600 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600">Carregando detalhes do veículo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Erro ao carregar dados
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadVehicle}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Veículo não encontrado
        </h3>
        <p className="text-gray-600">
          O veículo solicitado não foi encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="text-gray-600 mt-1">
            {vehicle.year} • {formatMileage(vehicle.mileage)}
          </p>
        </div>
        <Link
          to="/vehicles"
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          ← Voltar à lista
        </Link>
      </div>

      {/* Vehicle Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <Car className="h-24 w-24 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Imagens do veículo serão exibidas aqui
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          {/* Price */}
          <div className="bg-primary-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-primary-600">
              {formatPrice(vehicle.price)}
            </h2>
            <p className="text-gray-600">Preço final</p>
          </div>

          {/* Specifications */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Especificações</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Marca:</span>
                <p className="font-medium">{vehicle.brand}</p>
              </div>
              <div>
                <span className="text-gray-600">Modelo:</span>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div>
                <span className="text-gray-600">Ano:</span>
                <p className="font-medium">{vehicle.year}</p>
              </div>
              <div>
                <span className="text-gray-600">Quilometragem:</span>
                <p className="font-medium">{formatMileage(vehicle.mileage)}</p>
              </div>
              <div>
                <span className="text-gray-600">Combustível:</span>
                <p className="font-medium">{vehicle.fuel_type}</p>
              </div>
              <div>
                <span className="text-gray-600">Transmissão:</span>
                <p className="font-medium">{vehicle.transmission}</p>
              </div>
              <div>
                <span className="text-gray-600">Cor:</span>
                <p className="font-medium">{vehicle.color}</p>
              </div>
            </div>
          </div>

          {/* Stand Info */}
          {vehicle.stand && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Informações do Stand</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{vehicle.stand.name} - {vehicle.stand.city}</span>
              </div>
            </div>
          )}

          {/* Description */}
          {vehicle.description && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Descrição</h3>
              <p className="text-gray-700">{vehicle.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Contactar Stand
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 