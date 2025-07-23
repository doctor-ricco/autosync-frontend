import React from 'react';
import { Search } from 'lucide-react';

interface VehicleFiltersProps {
  filters: {
    search: string;
    brand: string;
    model: string;
    min_price: string;
    max_price: string;
    min_year: string;
    max_year: string;
    fuel_type: string;
    transmission: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  onFilterChange,
  onSubmit
}) => {
  return (
    <div className="card">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Procurar por marca, modelo ou características..."
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Procurar
          </button>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input
              type="text"
              value={filters.brand}
              onChange={(e) => onFilterChange('brand', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: BMW"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input
              type="text"
              value={filters.model}
              onChange={(e) => onFilterChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: X5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Combustível</label>
            <select
              value={filters.fuel_type}
              onChange={(e) => onFilterChange('fuel_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="gasoline">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Híbrido</option>
              <option value="electric">Elétrico</option>
              <option value="lpg">GPL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmissão</label>
            <select
              value={filters.transmission}
              onChange={(e) => onFilterChange('transmission', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automático</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço mínimo</label>
            <input
              type="number"
              value={filters.min_price}
              onChange={(e) => onFilterChange('min_price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="€"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço máximo</label>
            <input
              type="number"
              value={filters.max_price}
              onChange={(e) => onFilterChange('max_price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="€"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano mínimo</label>
            <input
              type="number"
              value={filters.min_year}
              onChange={(e) => onFilterChange('min_year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="2020"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano máximo</label>
            <input
              type="number"
              value={filters.max_year}
              onChange={(e) => onFilterChange('max_year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="2024"
            />
          </div>
        </div>
      </form>
    </div>
  );
}; 