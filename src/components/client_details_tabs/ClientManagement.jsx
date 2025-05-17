import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ClientManagement = () => {
  const { client } = useOutletContext();

  return (
    <Card className="mt-0">
      <Card.Body>
        <Card.Title as="h5">Management Information for {client?.name || 'Client'}</Card.Title>
        <p>This section will contain tools and information for managing the client relationship.</p>
        <ul>
          <li>Assigned Relationship Manager: {client?.manager || 'N/A'}</li>
          <li>Next Review Date: Placeholder</li>
          <li>Open Tasks/Alerts: Placeholder</li>
          <li>Client Segmentation Details: {client?.segment || 'N/A'}</li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default ClientManagement;
