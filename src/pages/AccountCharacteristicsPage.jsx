import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, ListGroup, Badge, Button, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { accounts } from '../data/accounts'; 
import { getTransactionsByAccountId } from '../data/transactions'; 

const getAccountById = (accountId) => {
  return accounts.find(acc => acc.id === accountId);
};

function AccountCharacteristicsPage() {
  const { clientId, accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [accountTransactions, setAccountTransactions] = useState([]); 
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' }); 

  useEffect(() => {
    const fetchedAccount = getAccountById(accountId);
    setAccount(fetchedAccount);
    if (fetchedAccount) {
      const transactions = getTransactionsByAccountId(accountId);
      setAccountTransactions(transactions);
      setSortConfig({ key: 'date', direction: 'descending' }); 
    }
  }, [accountId]);

  const sortedAccountTransactions = useMemo(() => {
    let sortableTransactions = [...accountTransactions];
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
  }, [accountTransactions, sortConfig]);

  const requestSortForTransactions = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    } else if (['date', 'valueDate'].includes(key)) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIconForTransactions = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSort;
  };

  if (!account) {
    return <div>Loading account details... or Account not found.</div>;
  }

  const currencyAbbreviation = account.currency || 'N/A'; 
  const itemDescription = account.description || 'N/A'; 
  const dateOfLastMovement = account.lastMovementDate || 'N/A'; 

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
            <strong>Category:</strong> {account.type} 
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

        {accountTransactions.length > 0 ? (
          <div className="mt-4">
            <h5>Account Transactions</h5>
            <Table striped bordered hover responsive size="sm" className="mt-3">
              <thead>
                <tr>
                  <th onClick={() => requestSortForTransactions('date')} style={{ cursor: 'pointer' }}>Date <FontAwesomeIcon icon={getSortIconForTransactions('date')} /></th>
                  <th onClick={() => requestSortForTransactions('valueDate')} style={{ cursor: 'pointer' }}>Value Date <FontAwesomeIcon icon={getSortIconForTransactions('valueDate')} /></th>
                  <th onClick={() => requestSortForTransactions('description')} style={{ cursor: 'pointer' }}>Description <FontAwesomeIcon icon={getSortIconForTransactions('description')} /></th>
                  <th onClick={() => requestSortForTransactions('category')} style={{ cursor: 'pointer' }}>Category <FontAwesomeIcon icon={getSortIconForTransactions('category')} /></th>
                  <th onClick={() => requestSortForTransactions('amount')} style={{ cursor: 'pointer' }} className="text-end">Amount <FontAwesomeIcon icon={getSortIconForTransactions('amount')} /></th>
                  <th onClick={() => requestSortForTransactions('type')} style={{ cursor: 'pointer' }}>Type <FontAwesomeIcon icon={getSortIconForTransactions('type')} /></th>
                  <th onClick={() => requestSortForTransactions('balance')} style={{ cursor: 'pointer' }} className="text-end">Balance <FontAwesomeIcon icon={getSortIconForTransactions('balance')} /></th>
                </tr>
              </thead>
              <tbody>
                {sortedAccountTransactions.map(txn => (
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
                      {typeof txn.balance === 'number' && !isNaN(txn.balance)
                        ? txn.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency || 'EUR' })
                        : 'N/A'}
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
