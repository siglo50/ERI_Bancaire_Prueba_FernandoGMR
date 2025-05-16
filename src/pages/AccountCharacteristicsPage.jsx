import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, ListGroup, Badge, Button, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { accounts } from '../data/accounts'; // Assuming accounts data is here
import { getTransactionsByAccountId } from '../data/transactions'; // Import transaction data function

// Placeholder function to get a single account by ID
// This should ideally be moved to data/accounts.js or a service file
const getAccountById = (accountId) => {
  return accounts.find(acc => acc.id === accountId);
};

function AccountCharacteristicsPage() {
  const { clientId, accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [accountTransactions, setAccountTransactions] = useState([]); // State for transactions

  useEffect(() => {
    const fetchedAccount = getAccountById(accountId);
    setAccount(fetchedAccount);
    if (fetchedAccount) {
      const transactions = getTransactionsByAccountId(accountId);
      setAccountTransactions(transactions);
    }
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
            <strong>Balance:</strong> {account.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency || 'EUR' })}
          </ListGroup.Item>
        </ListGroup>

        {/* Transactions Table Section */}
        {accountTransactions.length > 0 ? (
          <div className="mt-4">
            <h5>Account Transactions</h5>
            <Table striped bordered hover responsive size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Value Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th className="text-end">Amount</th>
                  <th>Type</th>
                  <th className="text-end">Balance</th>
                </tr>
              </thead>
              <tbody>
                {accountTransactions.map(txn => (
                  <tr key={txn.id}>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                    <td>{new Date(txn.valueDate).toLocaleDateString()}</td>
                    <td>{txn.description}</td>
                    <td>{txn.category}</td>
                    <td className={`text-end ${txn.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                      {txn.amount.toLocaleString(undefined, { style: 'currency', currency: account.currency || 'EUR' })}
                    </td>
                    <td>{txn.type}</td>
                    <td className="text-end">
                      {txn.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency || 'EUR' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="mt-4">No transactions found for this account.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default AccountCharacteristicsPage;
