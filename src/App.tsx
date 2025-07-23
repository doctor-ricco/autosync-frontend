import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Vehicles } from './pages/vehicles';
import { VehicleShow } from './pages/vehicles/show';
import { Favorites } from './pages/Favorites';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import './index.css';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleShow />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
