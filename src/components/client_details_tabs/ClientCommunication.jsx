import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const ClientCommunication = () => {
  const { client } = useOutletContext();

  return (
    <Card className="mt-0">
      <Card.Body>
        <Card.Title as="h5">Communication Details for {client?.name || 'Client'}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Primary Email:</strong> {client?.email || 'N/A'}</ListGroup.Item>
          <ListGroup.Item><strong>Phone Number:</strong> {client?.phoneNumber || 'Not specified'}</ListGroup.Item>
          <ListGroup.Item><strong>Preferred Contact Method:</strong> {client?.preferredContact || 'Email'}</ListGroup.Item>
          <ListGroup.Item><strong>Last Contact Date:</strong> {client?.lastContactDate ? new Date(client.lastContactDate).toLocaleDateString() : 'N/A'}</ListGroup.Item>
          <ListGroup.Item><strong>Contact Notes:</strong> <pre>{client?.contactNotes || 'No recent notes.'}</pre></ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ClientCommunication;
