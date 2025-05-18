import React, { useState, useMemo } from 'react';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { getTransactionsByAccountId } from '../data/transactions';
import { getAccountById } from '../data/accounts'; // To verify account existence and get details

const TransactionsReportPage = () => {
  const [accountIdSearch, setAccountIdSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [searchedAccount, setSearchedAccount] = useState(null);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

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

  const sortedTransactions = useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig.key !== null) {
      sortableTransactions.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (['date', 'valueDate'].includes(sortConfig.key)) {
          valA = new Date(valA);
          valB = new Date(valB);
        } else if (['amount', 'balance'].includes(sortConfig.key)) {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        }

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    // If sorting the same key, toggle direction. Otherwise, set new key and default to ascending.
    // Exception: for 'date' and 'valueDate', default to 'descending' if it's a new key or toggling from ascending.
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    } else if (['date', 'valueDate'].includes(key)) {
      direction = 'descending'; // Default to descending for date when newly selected
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSort;
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Transactions Report</h2>
      <Form className="mb-4">
        <Row className="align-items-end">
          <Col md={9} className="d-flex align-items-end">
            <Form.Group controlId="accountIdSearch" className="w-100">
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
                  <th onClick={() => requestSort('date')} style={{ cursor: 'pointer' }}>Date <FontAwesomeIcon icon={getSortIcon('date')} /></th>
                  <th onClick={() => requestSort('valueDate')} style={{ cursor: 'pointer' }}>Value Date <FontAwesomeIcon icon={getSortIcon('valueDate')} /></th>
                  <th onClick={() => requestSort('description')} style={{ cursor: 'pointer' }}>Description <FontAwesomeIcon icon={getSortIcon('description')} /></th>
                  <th onClick={() => requestSort('category')} style={{ cursor: 'pointer' }}>Category <FontAwesomeIcon icon={getSortIcon('category')} /></th>
                  <th onClick={() => requestSort('type')} style={{ cursor: 'pointer' }}>Type <FontAwesomeIcon icon={getSortIcon('type')} /></th>
                  <th onClick={() => requestSort('amount')} style={{ cursor: 'pointer' }} className="text-end">Amount <FontAwesomeIcon icon={getSortIcon('amount')} /></th>
                  <th onClick={() => requestSort('balance')} style={{ cursor: 'pointer' }} className="text-end">Balance <FontAwesomeIcon icon={getSortIcon('balance')} /></th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map(txn => (
                  <tr key={txn.id}>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                    <td>{new Date(txn.valueDate).toLocaleDateString()}</td>
                    <td>{txn.description}</td>
                    <td>{txn.category}</td>
                    <td>{txn.type}</td>
                    <td className={`text-end ${txn.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                      {txn.amount.toLocaleString(undefined, { style: 'currency', currency: searchedAccount.currency || 'EUR' })}
                    </td>
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
