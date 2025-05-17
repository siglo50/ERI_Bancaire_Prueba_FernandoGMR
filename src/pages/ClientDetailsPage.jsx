import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import { Card, Button, Row, Col, ListGroup, Badge, Nav, Alert } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faUser, faBuildingColumns, faInfoCircle, faCommentDots, faChartLine, faTasks, faDollarSign, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { getClientById } from '../data/clients';

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const location = useLocation(); 
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { path: 'general-info', title: 'General Info', icon: faInfoCircle },
    { path: 'communication', title: 'Communication', icon: faCommentDots },
    { path: 'statistics', title: 'Statistics', icon: faChartLine },
    { path: 'management', title: 'Management', icon: faTasks },
    { path: 'fee-classes', title: 'Fee Classes', icon: faDollarSign },
    { path: 'control', title: 'Control', icon: faExclamationTriangle },
    { path: 'accounts', title: 'Accounts', icon: faBuildingColumns },
  ];

  useEffect(() => {
    const foundClient = getClientById(clientId);
    if (foundClient) {
      setClient(foundClient);
    } else {
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
          Client not found. <Link to="/search">Return to Client Search</Link>. 
        </Alert>
      </div>
    );
  }

  let currentTabPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  if (currentTabPath === clientId) { 
    currentTabPath = tabs[0].path;
  }

  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/search" className="btn btn-outline-secondary btn-sm">
          <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Back to Search
        </Link>
        <Button variant="primary" size="sm" as={Link} to={`/client/${clientId}/edit`}> 
          <FontAwesomeIcon icon={faEdit} className="me-1" /> Edit Client
        </Button>
      </div>

      <Card className="mb-4 section-highlight">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Title as="h4"><FontAwesomeIcon icon={faUser} className="me-2" />{client.name} <small className="text-muted">({client.id})</small></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{client.type} - Root: {client.root || 'N/A'}</Card.Subtitle>
            </Col>
            <Col md={4} className="text-md-end">
              <h5>Status: <Badge bg={client.status === 'Active' ? 'success' : 'danger'}>{client.status}</Badge></h5>
              <p className="mb-0"><small>Last Activity: {client.lastActivityDate || 'N/A'}</small></p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Nav variant="tabs" className="custom-tabs mb-0" activeKey={currentTabPath}>
        {tabs.map(tab => (
          <Nav.Item key={tab.path}>
            <Nav.Link 
              as={NavLink} 
              to={`${tab.path}`}
              eventKey={tab.path} 
            >
              <FontAwesomeIcon icon={tab.icon} className="me-2" /> {tab.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      
      <div className="custom-tabs-content">
        <Outlet context={{ client }} /> 
      </div>

    </div>
  );
};

export default ClientDetailsPage;