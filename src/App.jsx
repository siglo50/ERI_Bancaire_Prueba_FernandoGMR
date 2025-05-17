import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ClientSearchPage from './pages/ClientSearchPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import AccountListPage from './pages/AccountListPage';
import AccountCharacteristicsPage from './pages/AccountCharacteristicsPage';
import AccountsOverviewPage from './pages/AccountsOverviewPage';
import TransactionsReportPage from './pages/TransactionsReportPage';

// Import new tab content components
import ClientGeneralInfo from './components/client_details_tabs/ClientGeneralInfo';
import ClientCommunication from './components/client_details_tabs/ClientCommunication';
import ClientStatistics from './components/client_details_tabs/ClientStatistics';
import ClientManagement from './components/client_details_tabs/ClientManagement';
import ClientFeeClasses from './components/client_details_tabs/ClientFeeClasses';
import ClientControl from './components/client_details_tabs/ClientControl';

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
                {/* Nested routes for tabs, will render in ClientDetailsPage's Outlet */}
                <Route path="general-info" element={<ClientGeneralInfo />} />
                <Route path="communication" element={<ClientCommunication />} />
                <Route path="statistics" element={<ClientStatistics />} />
                <Route path="management" element={<ClientManagement />} />
                <Route path="fee-classes" element={<ClientFeeClasses />} />
                <Route path="control" element={<ClientControl />} />
                <Route path="accounts" element={<AccountListPage />} />
                {/* Default tab for a client */}
                <Route index element={<Navigate to="general-info" replace />} /> 
              </Route>
              
              {/* Rutas para Cuenta */}
              <Route path="/client/:clientId/account/:accountId" element={<AccountCharacteristicsPage />} />
              {/* Puedes agregar más rutas como movimientos de cuenta aquí */}
              {/* <Route path="/client/:clientId/account/:accountId/movements" element={<AccountMovementsPage />} /> */}

              {/* Route for Accounts Overview */}
              <Route path="/accounts-overview" element={<AccountsOverviewPage />} />

              {/* Route for Transactions Report */}
              <Route path="/transactions-report" element={<TransactionsReportPage />} />

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
