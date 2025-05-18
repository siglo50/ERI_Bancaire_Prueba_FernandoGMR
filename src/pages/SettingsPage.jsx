import React from 'react';
import { Container, Card, Alert } from 'react-bootstrap';

const SettingsPage = () => {
  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header as="h2">
          Settings
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            <Alert.Heading>Under Construction</Alert.Heading>
            <p>
              This Settings page is currently pending implementation.
            </p>
            <hr />
            <p className="mb-0">
              Please check back later for updates.
            </p>
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SettingsPage;
