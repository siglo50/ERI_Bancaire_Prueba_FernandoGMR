import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const ClientControl = () => {
  const { client } = useOutletContext();

  return (
    <Card className="mt-0">
      <Card.Body>
        <Card.Title as="h5">Control & Compliance for {client?.name || 'Client'}</Card.Title>
        <p>Information related to compliance, risk, and control measures.</p>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>KYC Status:</strong> Verified</ListGroup.Item>
          <ListGroup.Item><strong>AML Risk Rating:</strong> Medium</ListGroup.Item>
          <ListGroup.Item><strong>Last Audit Date:</strong> 15/01/2024</ListGroup.Item>
          <ListGroup.Item><strong>Regulatory Flags:</strong> None</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ClientControl;
