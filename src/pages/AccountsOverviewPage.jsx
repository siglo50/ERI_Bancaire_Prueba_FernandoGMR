import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getClientById, searchClientsByName } from '../data/clients'; // Assuming these exist or will be created
import { getAccountsByClientId } from '../data/accounts'; // Assuming this exists

const AccountsOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('id'); // 'id' or 'name'
  const [foundClient, setFoundClient] = useState(null);
  const [clientAccounts, setClientAccounts] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setError('');
    setFoundClient(null);
    setClientAccounts([]);
    setSearched(true);

    let client = null;
    if (searchType === 'id') {
      client = getClientById(searchTerm.trim());
    } else {
      const results = searchClientsByName(searchTerm.trim());
      if (results.length === 1) {
        client = results[0];
      } else if (results.length > 1) {
        setError('Multiple clients found with that name. Please use a more specific name or search by ID.');
        return;
      } 
    }

    if (client) {
      setFoundClient(client);
      const accounts = getAccountsByClientId(client.id);
      setClientAccounts(accounts);
      if (accounts.length === 0) {
        setError('Client found, but has no accounts.');
      }
    } else {
      setError('Client not found.');
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Accounts Overview</h2>
      <Form className="mb-4">
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group controlId="searchType">
              <Form.Label>Search by:</Form.Label>
              <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="id">Client ID</option>
                <option value="name">Client Name</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="searchTerm">
              <Form.Label>{searchType === 'id' ? 'Client ID' : 'Client Name'}</Form.Label>
              <Form.Control 
                type="text" 
                placeholder={`Enter ${searchType === 'id' ? 'Client ID' : 'Client Name'}`}
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Form.Text className="text-muted">
                Examples: ID (015454156), Name (Cliente 11111111 NC)
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleSearch} className="w-100 eri-button">
              <FontAwesomeIcon icon={faSearch} className="me-2" /> Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      
      {foundClient && (
        <div className="mt-4">
          <h4>Client Details</h4>
          <p><strong>ID:</strong> {foundClient.id}</p>
          <p><strong>Name:</strong> {foundClient.name}</p>
          <p><strong>Email:</strong> {foundClient.email}</p>
          
          <h5 className="mt-4">Accounts</h5>
          {clientAccounts.length > 0 ? (
            <Table striped bordered hover responsive size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Account ID</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Currency</th>
                  <th className="text-end">Balance</th>
                  <th>Status</th>
                  <th>Last Movement</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientAccounts.map(account => (
                  <tr key={account.id}>
                    <td>
                      <Link to={`/client/${foundClient.id}/account/${account.id}`}>
                        {account.id}
                      </Link>
                    </td>
                    <td>{account.category}</td>
                    <td>{account.itemDescription}</td>
                    <td>{account.currencyAbbreviation}</td>
                    <td className="text-end">{account.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency })}</td>
                    <td>
                      <span className={`badge bg-${account.status === 'Active' ? 'success' : 'danger'}`}>
                        {account.status}
                      </span>
                    </td>
                    <td>{new Date(account.dateOfLastMovement).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        as={Link} 
                        to={`/client/${foundClient.id}/account/${account.id}`}
                        variant="outline-primary" 
                        size="sm"
                        title="View Account Details"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !error && <Alert variant="info">This client has no accounts.</Alert> // Show only if no other error
          )}
        </div>
      )}
      {searched && !foundClient && !error && (
        <Alert variant="info" className="mt-4">No client found for the given criteria.</Alert>
      )}
    </Container>
  );
};

export default AccountsOverviewPage;
