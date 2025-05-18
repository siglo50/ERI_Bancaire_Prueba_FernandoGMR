import React, { useState, useEffect, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Table, Badge, Button, Pagination, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlusCircle, faFileInvoiceDollar, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { getAccountsByClientId } from '../data/accounts';

const AccountListPage = () => {
  const { client } = useOutletContext() || {}; 
  const clientId = client?.id;

  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    if (clientId) {
      const clientAccounts = getAccountsByClientId(clientId);
      setAccounts(clientAccounts); 
      setCurrentPage(1); 
    }
  }, [clientId]);

  const sortedAccounts = useMemo(() => {
    let sortableAccounts = [...accounts];
    if (sortConfig.key !== null) {
      sortableAccounts.sort((a, b) => {
        if (sortConfig.key === 'balance') {
          const valA = parseFloat(a[sortConfig.key]);
          const valB = parseFloat(b[sortConfig.key]);
          if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
        }
        if (sortConfig.key === 'dateOfLastMovement') {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAccounts;
  }, [accounts, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); 
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSort;
  };

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = sortedAccounts.slice(indexOfFirstAccount, indexOfLastAccount); 
  const totalPages = Math.ceil(sortedAccounts.length / accountsPerPage); 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!clientId) {
    return <p>Client ID not provided or client data not available.</p>;
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>No accounts found for this client.</Card.Text>
          <Button variant="primary-eri btn-sm" as={Link} to={`/client/${clientId}/account/new`}>
            <FontAwesomeIcon icon={faPlusCircle} className="icon-action" /> Add New Account
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success btn-sm" as={Link} to={`/client/${clientId}/account/new`}>
          <FontAwesomeIcon icon={faPlusCircle} className="icon-action" /> New Account
        </Button>
      </div>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>Account ID <FontAwesomeIcon icon={getSortIcon('id')} /></th>
            <th onClick={() => requestSort('category')} style={{ cursor: 'pointer' }}>Type <FontAwesomeIcon icon={getSortIcon('category')} /></th>
            <th onClick={() => requestSort('itemDescription')} style={{ cursor: 'pointer' }}>Description <FontAwesomeIcon icon={getSortIcon('itemDescription')} /></th>
            <th onClick={() => requestSort('currencyAbbreviation')} style={{ cursor: 'pointer' }}>Currency <FontAwesomeIcon icon={getSortIcon('currencyAbbreviation')} /></th>
            <th onClick={() => requestSort('balance')} style={{ cursor: 'pointer' }}>Balance <FontAwesomeIcon icon={getSortIcon('balance')} /></th>
            <th onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}>Status <FontAwesomeIcon icon={getSortIcon('status')} /></th>
            <th onClick={() => requestSort('dateOfLastMovement')} style={{ cursor: 'pointer' }}>Last Movement <FontAwesomeIcon icon={getSortIcon('dateOfLastMovement')} /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map(account => (
            <tr key={account.id}>
              <td><Link to={`/client/${clientId}/account/${account.id}`}>{account.id}</Link></td>
              <td>{account.category}</td>
              <td>{account.itemDescription}</td>
              <td>{account.currencyAbbreviation}</td>
              <td className="text-end">{account.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency })}</td>
              <td><Badge bg={account.status === 'Active' ? 'success' : 'danger'}>{account.status}</Badge></td>
              <td>{new Date(account.dateOfLastMovement).toLocaleDateString()}</td>
              <td>
                <Button variant="link" as={Link} to={`/client/${clientId}/account/${account.id}`} title="View Account Details" className="p-1 me-1">
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button variant="link" as={Link} to={`/client/${clientId}/account/${account.id}/transactions`} title="View Transactions" className="p-1">
                  <FontAwesomeIcon icon={faFileInvoiceDollar} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <span>Showing {indexOfFirstAccount + 1} to {Math.min(indexOfLastAccount, sortedAccounts.length)} of {sortedAccounts.length} accounts</span>
          <Pagination size="sm">
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AccountListPage;