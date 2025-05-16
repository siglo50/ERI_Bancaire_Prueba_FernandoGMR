import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Table, Badge, Button, Pagination, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlusCircle, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { getAccountsByClientId } from '../data/accounts';

const AccountListPage = () => {
  // If used as a standalone page, clientId would come from useParams
  // const { clientId: paramClientId } = useParams(); 
  // If used within ClientDetailsPage via Outlet, client comes from context
  const { client } = useOutletContext() || {}; 
  const clientId = client?.id; // Use client from context if available

  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 5;

  useEffect(() => {
    if (clientId) {
      const clientAccounts = getAccountsByClientId(clientId);
      setAccounts(clientAccounts);
    }
  }, [clientId]);

  // Pagination logic
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(accounts.length / accountsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!clientId) {
    return <p>Client ID not provided or client data not available.</p>;
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>No accounts found for this client.</Card.Text>
          <Button variant="primary-eri btn-sm" as={Link} to={`/clients/${clientId}/accounts/new`}>
            <FontAwesomeIcon icon={faPlusCircle} className="icon-action" /> Add New Account
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {/* This title could be part of the parent ClientDetailsPage structure or here */}
      {/* <h4 className="mb-3">Client Accounts</h4> */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success btn-sm" as={Link} to={`/clients/${clientId}/accounts/new`}>
            <FontAwesomeIcon icon={faPlusCircle} className="icon-action" /> New Account
        </Button>
      </div>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Currency</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Last Movement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map(account => (
            <tr key={account.id}>
              <td>
                <Link to={`/clients/${clientId}/accounts/${account.id}`}>{account.id}</Link>
              </td>
              <td>{account.category}</td> {/* Using category as 'Type' from screenshot */} 
              <td>{account.itemDescription}</td>
              <td>{account.currencyAbbreviation}</td>
              <td className="text-end">{account.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency })}</td>
              <td>
                <Badge bg={account.status === 'Active' ? 'success' : 'danger'}>
                  {account.status}
                </Badge>
              </td>
              <td>{new Date(account.dateOfLastMovement).toLocaleDateString()}</td>
              <td>
                <Button variant="link" as={Link} to={`/clients/${clientId}/accounts/${account.id}`} title="View Account Details" className="p-1 me-1">
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button variant="link" as={Link} to={`/clients/${clientId}/accounts/${account.id}/transactions`} title="View Transactions" className="p-1">
                  <FontAwesomeIcon icon={faFileInvoiceDollar} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="pagination-controls">
            <span>Showing {indexOfFirstAccount + 1} to {Math.min(indexOfLastAccount, accounts.length)} of {accounts.length} accounts</span>
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