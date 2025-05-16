import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faBuildingColumns,
  faFileInvoiceDollar,
  faChartBar,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>ERI Bancaire</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end>
              <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/clients">
              <FontAwesomeIcon icon={faUsers} className="nav-icon" /> Clients
            </NavLink>
          </li>
          {/* Example: Add more links as needed based on your design */}
          <li>
            <NavLink to="/accounts-overview"> {/* Placeholder link */}
              <FontAwesomeIcon icon={faBuildingColumns} className="nav-icon" /> Accounts Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions-report"> {/* Placeholder link */}
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="nav-icon" /> Transactions Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics"> {/* Placeholder link */}
              <FontAwesomeIcon icon={faChartBar} className="nav-icon" /> Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings"> {/* Placeholder link */}
              <FontAwesomeIcon icon={faCog} className="nav-icon" /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button type="button">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;