import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ClientStatistics = () => {
  const { client } = useOutletContext();

  return (
    <Card className="mt-0">
      <Card.Body>
        <Card.Title as="h5">Statistics for {client?.name || 'Client'}</Card.Title>
        <p>This section will display relevant statistics and charts for the client.</p>
        <ul>
          <li>Total Assets Under Management: Placeholder</li>
          <li>Revenue Generated: Placeholder</li>
          <li>Product Engagement Score: Placeholder</li>
          <li>Risk Profile: Placeholder</li>
        </ul>
        <small>Graphs and detailed data will be implemented here.</small>
      </Card.Body>
    </Card>
  );
};

export default ClientStatistics;
