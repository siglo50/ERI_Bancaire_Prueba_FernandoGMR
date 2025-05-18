import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faBuildingColumns, 
  faFileInvoiceDollar, 
  faChartBar, 
  faCog, 
  faUserCircle, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

// Helper function to generate breadcrumbs (simplified version)
const generateBreadcrumbs = (pathname) => {
  const pathSegments = pathname.split('/').filter(segment => segment);
  let currentPath = '';
  const breadcrumbs = [
    { path: '/', label: 'Home', isHome: true }
  ];

  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    // Capitalize first letter and replace hyphens with spaces
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({ path: currentPath, label });
  });

  return breadcrumbs;
};

const Topbar = () => {
  const location = useLocation();
  const breadcrumbItems = generateBreadcrumbs(location.pathname);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Breadcrumb listProps={{ className: 'mb-0' }}>
          {breadcrumbItems.map((item, index) => (
            <Breadcrumb.Item
              key={index}
              linkAs={Link}
              linkProps={{ to: item.path }}
              active={index === breadcrumbItems.length - 1}
            >
              {index > 0 && <FontAwesomeIcon icon={faChevronRight} size="xs" style={{marginRight: '0.5rem', color: 'var(--eri-topbar-text)'}}/>}
              {item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="topbar-right">
        <div className="topbar-icons">
          <Link to="/search" title="Client Search" className="btn-icon">
            <FontAwesomeIcon icon={faSearch} />
          </Link>
          <Link to="/accounts-overview" title="Accounts Overview" className="btn-icon">
            <FontAwesomeIcon icon={faBuildingColumns} />
          </Link>
          <Link to="/transactions-report" title="Transactions Report" className="btn-icon">
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </Link>
          <Link to="/analytics" title="Analytics" className="btn-icon">
            <FontAwesomeIcon icon={faChartBar} />
          </Link>
          <Link to="/settings" title="Settings" className="btn-icon">
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </div>
        <div className="topbar-user">
          <span>Fernando GMR</span>
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;