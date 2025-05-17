import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getTransactionsByAccountId } from '../data/transactions';
import { getAccountById } from '../data/accounts'; // To verify account existence and get details

const TransactionsReportPage = () => {
  const [accountIdSearch, setAccountIdSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [searchedAccount, setSearchedAccount] = useState(null);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setError('');
    setTransactions([]);
    setSearchedAccount(null);
    setHasSearched(true);

    if (!accountIdSearch.trim()) {
      setError('Please enter an Account ID.');
      return;
    }

    const account = getAccountById(accountIdSearch.trim()); // Check if account exists
    if (!account) {
      setError('Account ID not found. Please enter a valid Account ID.');
      return;
    }
    
    setSearchedAccount(account);
    const foundTransactions = getTransactionsByAccountId(accountIdSearch.trim());
    
    if (foundTransactions.length > 0) {
      setTransactions(foundTransactions);
    } else {
      setError('No transactions found for this account.');
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Transactions Report</h2>
      <Form className="mb-4">
        <Row className="align-items-end">
          <Col md={9}>
            <Form.Group controlId="accountIdSearch">
              <Form.Label>Account ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Account ID to see transactions"
                value={accountIdSearch} 
                onChange={(e) => setAccountIdSearch(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
              />
              <Form.Text className="text-muted">
                Example: 015454156909782034
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleSearch} className="w-100 eri-button">
              <FontAwesomeIcon icon={faSearch} className="me-2" /> Search Transactions
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      
      {searchedAccount && (
        <div className="mt-4">
          <h4>Transactions for Account: {searchedAccount.id}</h4>
          <p><strong>Type:</strong> {searchedAccount.category} - <strong>Description:</strong> {searchedAccount.itemDescription}</p>
          {transactions.length > 0 ? (
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
                {transactions.map(txn => (
                  <tr key={txn.id}>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                    <td>{new Date(txn.valueDate).toLocaleDateString()}</td>
                    <td>{txn.description}</td>
                    <td>{txn.category}</td>
                    <td className={`text-end ${txn.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                      {txn.amount.toLocaleString(undefined, { style: 'currency', currency: searchedAccount.currency || 'EUR' })}
                    </td>
                    <td>{txn.type}</td>
                    <td className="text-end">{txn.balance.toLocaleString(undefined, { style: 'currency', currency: searchedAccount.currency || 'EUR' })}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !error && <Alert variant="info">This account has no transactions to display.</Alert>
          )}
        </div>
      )}
      {hasSearched && !searchedAccount && !error && (
         <Alert variant="info" className="mt-4">Enter an Account ID and click search to view transactions.</Alert>
      )}

    </Container>
  );
};

export default TransactionsReportPage;
