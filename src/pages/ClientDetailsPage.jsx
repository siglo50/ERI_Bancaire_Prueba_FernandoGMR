import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import { Tabs, Tab, Card, Button, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faUser, faBuildingColumns, faInfoCircle, faCommentDots, faChartLine, faTasks, faDollarSign, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { getClientById } from '../data/clients';
// import AccountListPage from './AccountListPage'; // We'll use Outlet for nested routes

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const location = useLocation(); 
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine the active tab based on the URL
  // Default to 'general' if no specific sub-route is matched
  let activeKey = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const validTabs = ['general-info', 'communication', 'statistics', 'management', 'fee-classes', 'control', 'accounts'];
  if (!validTabs.includes(activeKey) || activeKey === clientId) {
    activeKey = 'general-info'; // Default tab
  }

  useEffect(() => {
    const foundClient = getClientById(clientId);
    if (foundClient) {
      setClient(foundClient);
    } else {
      // Handle client not found, e.g., redirect or show error
      console.error(`Client with ID ${clientId} not found.`);
    }
    setLoading(false);
  }, [clientId]);

  if (loading) {
    return <p className="page-content">Loading client details...</p>;
  }

  if (!client) {
    return (
      <div className="page-content">
        <Alert variant="danger">
          Client not found. <Link to="/clients">Return to Client Search</Link>.
        </Alert>
      </div>
    );
  }

  const clientStatusColor = client.status === 'Active' ? 'success' : 'danger';

  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/clients" className="btn btn-outline-secondary btn-sm">
          <FontAwesomeIcon icon={faArrowLeft} className="icon-action" /> Back to Search
        </Link>
        <Button variant="primary-eri btn-sm" as={Link} to={`/clients/${clientId}/edit`}>
          <FontAwesomeIcon icon={faEdit} className="icon-action" /> Edit Client
        </Button>
      </div>

      <Card className="mb-4 section-highlight">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Title as="h4"><FontAwesomeIcon icon={faUser} /> {client.name} <small className="text-muted">({client.id})</small></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{client.clientType} - Root: {client.root}</Card.Subtitle>
            </Col>
            <Col md={4} className="text-md-end">
              <h5>Status: <Badge bg={clientStatusColor}>{client.status}</Badge></h5>
              <p className="mb-0"><small>Last Activity: {client.lastActivityDate}</small></p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs
        id="client-details-tabs"
        activeKey={activeKey}
        className="custom-tabs mb-0" // mb-0 to make border connect with Tab.Content
        variant="tabs" // Use 'tabs' or 'pills', 'tabs' is closer to screenshot
        // onSelect={(k) => navigate(`/clients/${clientId}/${k}`)} // Alternative navigation handling
      >
        <Tab eventKey="general-info" title={<><FontAwesomeIcon icon={faInfoCircle} className="icon-action" /> General Info</>}>
          {/* Content for General Info will be rendered by Outlet if path is /clients/:clientId/general-info */}
          {/* Or you can put direct content here if not using sub-routes for tabs */} 
        </Tab>
        <Tab eventKey="communication" title={<><FontAwesomeIcon icon={faCommentDots} className="icon-action" /> Communication</>}></Tab>
        <Tab eventKey="statistics" title={<><FontAwesomeIcon icon={faChartLine} className="icon-action" /> Statistics</>}></Tab>
        <Tab eventKey="management" title={<><FontAwesomeIcon icon={faTasks} className="icon-action" /> Management</>}></Tab>
        <Tab eventKey="fee-classes" title={<><FontAwesomeIcon icon={faDollarSign} className="icon-action" /> Fee Classes</>}></Tab>
        <Tab eventKey="control" title={<><FontAwesomeIcon icon={faExclamationTriangle} className="icon-action" /> Control</>}></Tab>
        <Tab eventKey="accounts" title={<><FontAwesomeIcon icon={faBuildingColumns} className="icon-action" /> Accounts</>}>
          {/* The AccountListPage will be rendered here via Outlet if the path matches */}
        </Tab>
      </Tabs>
      
      {/* This is where the content for each tab (routed component) will be displayed */}
      {/* Ensure this div has appropriate styling if needed, like border and padding if not provided by custom-tabs tab-content */}
      <div className="custom-tabs-content">
        <Outlet context={{ client }} /> 
      </div>

    </div>
  );
};

export default ClientDetailsPage;