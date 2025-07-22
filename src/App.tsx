import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Lista de Veículos</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
            <Route path="/vehicles/:id" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Detalhes do Veículo</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
            <Route path="/favorites" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Favoritos</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
            <Route path="/login" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Login</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
