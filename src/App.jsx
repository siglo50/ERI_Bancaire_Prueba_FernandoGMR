import React, { useState } from 'react';
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
  const [currentClientId] = React.useState('015454156');
  const [currentClientName] = React.useState('Cliente 11111111 NC');
  const [currentAccountId] = React.useState('015454156909782034');

  // State for sidebar collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarCollapsed ? 'main-content-collapsed' : ''}`}>
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
              <Route path="/client/:clientId" element={<ClientDetailsPage />}>
                {/* Nested route for accounts, will render in ClientDetailsPage's Outlet */}
                <Route path="accounts" element={<AccountListPage />} /> 
                {/* We can add other nested routes for other tabs here if needed */}
                {/* e.g., <Route path="general-info" element={<ClientGeneralInfoComponent />} /> */}
                {/* If no sub-path, ClientDetailsPage can show default content or redirect */}
                <Route index element={<Navigate to="accounts" replace />} /> {/* Default to accounts tab or general-info */} 
              </Route>
              
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
