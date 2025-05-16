import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ClientSearchPage from './pages/ClientSearchPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import AccountListPage from './pages/AccountListPage';
import AccountCharacteristicsPage from './pages/AccountCharacteristicsPage';
import './App.css';

function App() {
  // Simulamos un estado para el cliente y cuenta seleccionados
  // Esto normalmente vendría de un contexto global o de la URL
  const [currentClientId, setCurrentClientId] = React.useState('015454156');
  const [currentClientName, setCurrentClientName] = React.useState('Cliente 11111111 NC');
  const [currentAccountId, setCurrentAccountId] = React.useState('015454156909782034');

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Topbar 
            clientName={currentClientName} 
            clientId={currentClientId}
            accountId={currentAccountId}
          />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to={`/client/${currentClientId}`} />} />
              <Route path="/search" element={<ClientSearchPage />} />
              {/* Ruta inicial redirige al primer cliente por defecto o a una página de búsqueda */}
              
              {/* Rutas para Cliente */}
              <Route path="/client/:clientId" element={<ClientDetailsPage />} />
              <Route path="/client/:clientId/accounts" element={<AccountListPage />} />
              
              {/* Rutas para Cuenta */}
              <Route path="/client/:clientId/account/:accountId" element={<AccountCharacteristicsPage />} />
              {/* Puedes agregar más rutas como movimientos de cuenta aquí */}
              {/* <Route path="/client/:clientId/account/:accountId/movements" element={<AccountMovementsPage />} /> */}

              {/* Ruta por defecto o página no encontrada */}
              <Route path="*" element={<div><h2>404 Not Found</h2><p>La página que buscas no existe.</p></div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
