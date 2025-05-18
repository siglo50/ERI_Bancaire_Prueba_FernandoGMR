import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    console.log('User initiated logout.');
    // Here you would typically clear authentication tokens, user data from state/local storage, etc.
    
    // Simulate a delay for the logout process then redirect
    const timer = setTimeout(() => {
      console.log('User logged out. Redirecting to login or home page.');
      // For now, let's imagine we redirect to the client search page as a pseudo-login/home
      // In a real app, this would be '/login' or similar.
      navigate('/search'); 
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title as="h2">Logging Out</Card.Title>
              <hr />
              <Spinner animation="border" role="status" variant="primary" className="my-3">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>You are being logged out. Please wait...</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogoutPage;
