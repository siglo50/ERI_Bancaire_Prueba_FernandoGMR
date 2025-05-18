import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, ListGroup, Row, Col, Badge } from 'react-bootstrap';

const ClientGeneralInfo = () => {
  const { client } = useOutletContext(); // Access client data from parent route

  if (!client) {
    return <p>Client data not available.</p>;
  }

  // Fallback for potentially missing fields
  const clientData = {
    id: client.id || 'N/A',
    name: client.name || 'N/A',
    type: client.type || 'N/A',
    segment: client.segment || 'N/A',
    status: client.status || 'N/A',
    email: client.email || 'N/A',
    root: client.root || 'N/A',
    office: client.office || 'Main Office',
    centre: client.centre || 'N/A',
    manager: client.manager || 'John Manager',
    creationDate: client.creationDate ? new Date(client.creationDate).toLocaleDateString() : 'N/A',
    lastActivityDate: client.lastActivityDate ? new Date(client.lastActivityDate).toLocaleDateString() : 'N/A',
  };

  return (
    <Card className="mt-0"> 
      <Card.Body>
        <Card.Title as="h5" className="mb-4">Client Attributes</Card.Title>
        <ListGroup variant="flush">
          <Row>
            <Col md={6}>
              <ListGroup.Item><strong>ID:</strong> {clientData.id}</ListGroup.Item>
              <ListGroup.Item><strong>Name:</strong> {clientData.name}</ListGroup.Item>
              <ListGroup.Item><strong>Type:</strong> {clientData.type}</ListGroup.Item>
              <ListGroup.Item><strong>Segment:</strong> {clientData.segment}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {clientData.email}</ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item><strong>Root:</strong> {clientData.root}</ListGroup.Item>
              <ListGroup.Item><strong>Office:</strong> {clientData.office}</ListGroup.Item>
              <ListGroup.Item><strong>Centre:</strong> {clientData.centre}</ListGroup.Item>
              <ListGroup.Item><strong>Manager:</strong> {clientData.manager}</ListGroup.Item>
              <ListGroup.Item><strong>Creation Date:</strong> {clientData.creationDate}</ListGroup.Item>
              <ListGroup.Item><strong>Last Activity:</strong> {clientData.lastActivityDate}</ListGroup.Item>
            </Col>
          </Row>
          <Row className="mt-3">
             <Col md={12}>
                <ListGroup.Item>
                    <strong>Status:</strong> <Badge bg={clientData.status === 'Active' ? 'success' : 'danger'}>{clientData.status}</Badge>
                </ListGroup.Item>
             </Col>
          </Row>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ClientGeneralInfo;
