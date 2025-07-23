import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Search, Star, MapPin, Calendar, Zap, RefreshCw } from 'lucide-react';
import { useFeaturedVehicles } from '../hooks/useFeaturedVehicles';
import { VehicleCard } from './vehicles/components/VehicleCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Usar React Query para veículos em destaque
  const { data: featuredVehicles = [], isLoading, error, refetch } = useFeaturedVehicles();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/vehicles?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Encontre o Carro dos Seus Sonhos
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Milhares de veículos usados e seminovos em Portugal. 
            Compre e venda com confiança.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 flex items-center px-4">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Procurar por marca, modelo ou características..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 px-6 py-3 text-white font-medium transition-colors"
              >
                Procurar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Car className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Veículos Verificados</h3>
          <p className="text-gray-600">
            Todos os veículos passam por uma inspeção rigorosa antes de serem listados.
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Standards Confiáveis</h3>
          <p className="text-gray-600">
            Trabalhamos apenas com stands certificados e de confiança.
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Processo Rápido</h3>
          <p className="text-gray-600">
            Desde a pesquisa até à compra, tudo de forma simples e rápida.
          </p>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Veículos em Destaque</h2>
          <Link
            to="/vehicles"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 text-primary-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Carregando veículos em destaque...</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle: any) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {!isLoading && !error && featuredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum veículo em destaque
            </h3>
            <p className="text-gray-600">
              Não há veículos em destaque no momento.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronto para encontrar o seu próximo carro?
        </h2>
        <p className="text-gray-300 mb-6">
          Explore milhares de veículos e encontre a melhor oferta para si.
        </p>
        <Link
          to="/vehicles"
          className="btn-primary inline-flex items-center"
        >
          <Search className="h-4 w-4 mr-2" />
          Explorar Veículos
        </Link>
      </section>
    </div>
  );
}; 