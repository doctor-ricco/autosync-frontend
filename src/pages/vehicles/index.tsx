import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Car, RefreshCw } from 'lucide-react';
import { useVehicles } from '../../hooks/useVehicles';
import { VehicleCard } from './components/VehicleCard';
import { VehicleFilters } from './components/VehicleFilters';
import { VehiclePagination } from './components/VehiclePagination';

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

export const Vehicles: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  // Inicializar filtros a partir da URL
  const [filters, setFilters] = useState<FilterState>(() => {
    const urlFilters: FilterState = {};
    searchParams.forEach((value, key) => {
      if (key === 'page') return;
      if (['minPrice', 'maxPrice', 'minYear', 'maxYear', 'minMileage', 'maxMileage'].includes(key)) {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          (urlFilters as any)[key] = numValue;
        }
      } else {
        (urlFilters as any)[key] = value;
      }
    });
    return urlFilters;
  });

  // Preparar filtros para a API
  const apiFilters: any = {
    page: currentPage,
    per_page: 12,
  };

  // Adicionar filtros apenas se tiverem valor
  if (filters.search) apiFilters.search = filters.search;
  if (filters.brand) apiFilters.brand = filters.brand;
  if (filters.city) apiFilters.city = filters.city;
  if (filters.fuelType) apiFilters.fuel_type = filters.fuelType;
  if (filters.transmission) apiFilters.transmission = filters.transmission;
  if (filters.minPrice) apiFilters.min_price = filters.minPrice;
  if (filters.maxPrice) apiFilters.max_price = filters.maxPrice;
  if (filters.minYear) apiFilters.min_year = filters.minYear;
  if (filters.maxYear) apiFilters.max_year = filters.maxYear;
  if (filters.minMileage) apiFilters.min_mileage = filters.minMileage;
  if (filters.maxMileage) apiFilters.max_mileage = filters.maxMileage;

  // Usar React Query para carregar veículos
  const { 
    data: vehiclesData, 
    isLoading, 
    error, 
    refetch 
  } = useVehicles(apiFilters);

  const vehicles = vehiclesData?.data || [];
  const totalPages = vehiclesData?.pagination?.last_page || 1;
  const totalVehicles = vehiclesData?.pagination?.total || 0;

  // Carregar opções de filtros uma vez
  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      // Carregar marcas e cidades únicas dos veículos
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/vehicles?per_page=1000`);
      const data = await response.json();
      if (data.success) {
        const allVehicles = data.data;
        const uniqueBrands = [...new Set(allVehicles.map((v: any) => v.brand).filter((brand: any): brand is string => Boolean(brand)))].sort() as string[];
        const uniqueCities = [...new Set(allVehicles.map((v: any) => v.stand?.city).filter((city: any): city is string => Boolean(city)))].sort() as string[];
        setBrands(uniqueBrands);
        setCities(uniqueCities);
      }
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Atualizar URL com os filtros
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Atualizar página na URL
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veículos</h1>
          <p className="text-gray-600 mt-1">
            {totalVehicles > 0 ? `${totalVehicles} veículos encontrados` : 'Nenhum veículo encontrado'}
          </p>
        </div>
        <Link
          to="/"
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          ← Voltar à página inicial
        </Link>
      </div>

      {/* Search and Filters */}
      <VehicleFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        brands={brands}
        cities={cities}
      />

      {/* Vehicles List */}
      {isLoading ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 text-primary-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando veículos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erro ao carregar dados
          </h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle: any) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {/* Pagination */}
          <VehiclePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!isLoading && !error && vehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum veículo encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros de pesquisa.
          </p>
        </div>
      )}
    </div>
  );
}; 