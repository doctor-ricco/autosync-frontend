import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterState {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelType?: string;
  transmission?: string;
  city?: string;
  search?: string;
}

interface VehicleFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  brands: string[];
  cities: string[];
}

const fuelTypes = [
  { value: 'gasoline', label: 'Gasolina' },
  { value: 'diesel', label: 'Gasóleo' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'electric', label: 'Elétrico' },
  { value: 'lpg', label: 'GPL' },
];

const transmissions = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automático' },
];

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  brands,
  cities,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters };
    if (value === '' || value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            {hasActiveFilters && (
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                {Object.keys(filters).length}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Limpar</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pesquisar
            </label>
            <input
              type="text"
              placeholder="Marca, modelo, características..."
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marca
            </label>
            <select
              value={localFilters.brand || ''}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas as marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço (€)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Mínimo"
                value={localFilters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Máximo"
                value={localFilters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ano
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Mínimo"
                min="1900"
                max={new Date().getFullYear()}
                value={localFilters.minYear || ''}
                onChange={(e) => handleFilterChange('minYear', e.target.value ? Number(e.target.value) : undefined)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Máximo"
                min="1900"
                max={new Date().getFullYear()}
                value={localFilters.maxYear || ''}
                onChange={(e) => handleFilterChange('maxYear', e.target.value ? Number(e.target.value) : undefined)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Mileage Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quilometragem (km)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Mínimo"
                min="0"
                value={localFilters.minMileage || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 0)) {
                    handleFilterChange('minMileage', value ? Number(value) : undefined);
                  }
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Máximo"
                min="0"
                value={localFilters.maxMileage || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 0)) {
                    handleFilterChange('maxMileage', value ? Number(value) : undefined);
                  }
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Combustível
            </label>
            <select
              value={localFilters.fuelType || ''}
              onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos os combustíveis</option>
              {fuelTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmissão
            </label>
            <select
              value={localFilters.transmission || ''}
              onChange={(e) => handleFilterChange('transmission', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas as transmissões</option>
              {transmissions.map((transmission) => (
                <option key={transmission.value} value={transmission.value}>
                  {transmission.label}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localização
            </label>
            <select
              value={localFilters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas as localizações</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Apply Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={applyFilters}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 