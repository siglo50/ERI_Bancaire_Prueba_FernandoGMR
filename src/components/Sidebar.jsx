import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, 
  faBuildingColumns,
  faFileInvoiceDollar,
  faChartBar,
  faCog,
  faSignOutAlt,
  faBars, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isCollapsed, toggleSidebar }) => { 
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h3>ERI Bancaire</h3>}
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/search" title="Client Search">
              <FontAwesomeIcon icon={faSearch} className="nav-icon" /> 
              {!isCollapsed && <span>Client Search</span>}
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/clients" title="Clients">
              <FontAwesomeIcon icon={faUsers} className="nav-icon" /> 
              {!isCollapsed && <span>Clients</span>}
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/accounts-overview" title="Accounts Overview"> 
              <FontAwesomeIcon icon={faBuildingColumns} className="nav-icon" /> 
              {!isCollapsed && <span>Accounts Overview</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions-report" title="Transactions Report"> 
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="nav-icon" /> 
              {!isCollapsed && <span>Transactions Report</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" title="Analytics"> 
              <FontAwesomeIcon icon={faChartBar} className="nav-icon" /> 
              {!isCollapsed && <span>Analytics</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" title="Settings"> 
              <FontAwesomeIcon icon={faCog} className="nav-icon" /> 
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button type="button" title="Logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> 
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;