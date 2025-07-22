import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Encontre o Carro dos Seus Sonhos
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Milhares de veículos usados e seminovos em Portugal. 
            Compre e venda com confiança.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 flex items-center px-4">
                <span className="text-gray-400 mr-3">🔍</span>
                <input
                  type="text"
                  placeholder="Procurar por marca, modelo ou características..."
                  className="flex-1 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium transition-colors">
                Procurar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-xl">🚗</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Veículos Verificados</h3>
          <p className="text-gray-600">
            Todos os veículos passam por uma inspeção rigorosa antes de serem listados.
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-xl">📍</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Standards Confiáveis</h3>
          <p className="text-gray-600">
            Trabalhamos apenas com stands certificados e de confiança.
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-xl">⚡</span>
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
          <a
            href="/vehicles"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Ver todos →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder vehicles */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">🚗</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Veículo de Exemplo {i}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span>2023</span>
                  <span>50.000 km</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    €25.000
                  </span>
                  <span className="text-sm text-gray-500">
                    Lisboa
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronto para encontrar o seu próximo carro?
        </h2>
        <p className="text-gray-300 mb-6">
          Explore milhares de veículos e encontre a melhor oferta para si.
        </p>
        <a
          href="/vehicles"
          className="btn-primary inline-flex items-center"
        >
          <span className="mr-2">🔍</span>
          Explorar Veículos
        </a>
      </section>
    </div>
  );
}; 