import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, RefreshCw } from 'lucide-react';
import apiService from '../../services/api';
import { VehicleCard } from './components/VehicleCard';
import { VehicleFilters } from './components/VehicleFilters';
import { VehiclePagination } from './components/VehiclePagination';

export const Vehicles: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    model: '',
    min_price: '',
    max_price: '',
    min_year: '',
    max_year: '',
    fuel_type: '',
    transmission: '',
  });

  useEffect(() => {
    loadVehicles();
  }, [currentPage, filters]);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Preparar filtros para a API
      const apiFilters: any = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
          apiFilters[key] = value;
        }
      });

      const response = await apiService.getVehicles(apiFilters, currentPage);
      
      if (response.success) {
        setVehicles(response.data);
        setTotalPages(response.pagination.last_page);
        setTotalVehicles(response.pagination.total);
      } else {
        setError('Erro ao carregar veículos');
      }
    } catch (error) {
      console.error('Error loading vehicles:', error);
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset para primeira página quando filtrar
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadVehicles();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        onFilterChange={handleFilterChange}
        onSubmit={handleSearch}
      />

      {/* Vehicles List */}
      {loading ? (
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
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadVehicles}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
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

      {!loading && !error && vehicles.length === 0 && (
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