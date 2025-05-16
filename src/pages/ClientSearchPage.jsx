import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Table, Pagination, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { clients as mockClients } from '../data/clients'; // Assuming clients.js is in ../data/

const ClientSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(''); // Example filter
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  useEffect(() => {
    let results = mockClients;
    if (searchTerm) {
      results = results.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType) {
      results = results.filter(client => client.clientType === filterType);
    }
    setFilteredClients(results);
    setCurrentPage(1); // Reset to first page on new search/filter
  }, [searchTerm, filterType]);

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="page-content">
      <h2 className="mb-4">Client Search</h2>

      <Form className="mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-6 col-lg-4">
            <Form.Group controlId="clientSearch">
              <Form.Label>Search by Name or ID</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter name or client ID"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-4 col-lg-3">
            <Form.Group controlId="clientTypeFilter">
              <Form.Label>Client Type</Form.Label>
              <Form.Select value={filterType} onChange={handleFilterChange}>
                <option value="">All Types</option>
                <option value="Retail Premium">Retail Premium</option>
                <option value="Retail Standard">Retail Standard</option>
                <option value="Corporate">Corporate</option>
                {/* Add more types as needed */}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-2 col-lg-2 d-flex align-items-end">
            {/* <Button variant="primary-eri" type="submit" className="w-100">Search</Button> */}
          </div>
          <div className="col-md-12 col-lg-3 d-flex align-items-end justify-content-lg-end">
            <Button variant="success" as={Link} to="/clients/new" className="w-100 w-lg-auto">
              <FontAwesomeIcon icon={faUserPlus} className="icon-action" /> New Client
            </Button>
          </div>
        </div>
      </Form>

      {currentClients.length > 0 ? (
        <>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Name</th>
                <th>Client Type</th>
                <th>Manager</th>
                <th>Centre</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map(client => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>
                    <Link to={`/client/${client.id}`}>{client.name}</Link>
                  </td>
                  <td>{client.clientType}</td>
                  <td>{client.manager}</td>
                  <td>{client.centre}</td>
                  <td>
                    <Badge bg={client.status === 'Active' ? 'success' : 'danger'}>
                      {client.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="link" as={Link} to={`/client/${client.id}`} title="View Details" className="p-1 me-1">
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button variant="link" as={Link} to={`/client/${client.id}/edit`} title="Edit Client" className="p-1 me-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="link" title="Delete Client" className="p-1 text-danger">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <div className="pagination-controls">
                <span>Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, filteredClients.length)} of {filteredClients.length} clients</span>
                <Pagination>
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
        </>
      ) : (
        <p>No clients found matching your criteria.</p>
      )}
    </div>
  );
};

export default ClientSearchPage;