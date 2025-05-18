import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SettingsPage = () => {
  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h2">Settings</Card.Title>
              <hr />
              <p>This page is currently under construction and pending implementation.</p>
              <p>Future settings options will appear here.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
