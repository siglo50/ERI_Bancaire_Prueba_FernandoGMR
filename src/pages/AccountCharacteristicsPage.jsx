import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, ListGroup, Badge, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { accounts } from '../data/accounts'; // Assuming accounts data is here

// Placeholder function to get a single account by ID
// This should ideally be moved to data/accounts.js or a service file
const getAccountById = (accountId) => {
  return accounts.find(acc => acc.id === accountId);
};

function AccountCharacteristicsPage() {
  const { clientId, accountId } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchedAccount = getAccountById(accountId);
    setAccount(fetchedAccount);
  }, [accountId]);

  if (!account) {
    return <div>Loading account details... or Account not found.</div>;
  }

  // Placeholder data for fields not in current accounts.js
  const currencyAbbreviation = account.currency || 'N/A'; // Assuming 'currency' field might exist or be added
  const itemDescription = account.description || 'N/A'; // Assuming 'description' field might exist or be added
  const dateOfLastMovement = account.lastMovementDate || 'N/A'; // Assuming 'lastMovementDate' field might exist or be added

  return (
    <Card className="mt-3">
      <Card.Header as="h5">
        <Row>
          <Col>Account Characteristics: {account.id}</Col>
          <Col xs="auto">
            <Link to={`/client/${clientId}/accounts`} className="btn btn-outline-secondary btn-sm me-2">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Account List
            </Link>
            <Button variant="outline-primary" size="sm">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Account Number:</strong> {account.id}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Currency Abbreviation:</strong> {currencyAbbreviation}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Category:</strong> {account.type} {/* Mapping 'type' to 'Category' */}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Item Description:</strong> {itemDescription}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date of Last Movement:</strong> {dateOfLastMovement}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Status:</strong> <Badge bg={account.status === 'Active' ? 'success' : 'danger'}>{account.status}</Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Balance:</strong> {account.balance} {currencyAbbreviation} {/* Added balance for completeness */}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default AccountCharacteristicsPage;
