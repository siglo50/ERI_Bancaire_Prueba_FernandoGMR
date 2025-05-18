import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Table, Pagination, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faTrashAlt, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { clients as mockClients } from '../data/clients';

const ClientSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    let results = [...mockClients];
    if (searchTerm) {
      results = results.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.id && client.id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (filterType) {
      results = results.filter(client => client.clientType === filterType);
    }
    setFilteredClients(results);
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  const sortedClients = useMemo(() => {
    let sortableClients = [...filteredClients];
    if (sortConfig.key !== null) {
      sortableClients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableClients;
  }, [filteredClients, sortConfig]);

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

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(sortedClients.length / clientsPerPage);

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
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-2 col-lg-2 d-flex align-items-end">
          </div>
          <div className="col-md-12 col-lg-3 d-flex align-items-end justify-content-lg-end">
          </div>
        </div>
      </Form>

      {currentClients.length > 0 ? (
        <>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                  Client ID <FontAwesomeIcon icon={getSortIcon('id')} />
                </th>
                <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                  Name <FontAwesomeIcon icon={getSortIcon('name')} />
                </th>
                <th onClick={() => requestSort('clientType')} style={{ cursor: 'pointer' }}>
                  Client Type <FontAwesomeIcon icon={getSortIcon('clientType')} />
                </th>
                <th onClick={() => requestSort('manager')} style={{ cursor: 'pointer' }}>
                  Manager <FontAwesomeIcon icon={getSortIcon('manager')} />
                </th>
                <th onClick={() => requestSort('centre')} style={{ cursor: 'pointer' }}>
                  Centre <FontAwesomeIcon icon={getSortIcon('centre')} />
                </th>
                <th onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}>
                  Status <FontAwesomeIcon icon={getSortIcon('status')} />
                </th>
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
                <span>Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, sortedClients.length)} of {sortedClients.length} clients</span>
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