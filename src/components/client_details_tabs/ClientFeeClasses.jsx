import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';

const ClientFeeClasses = () => {
  const { client } = useOutletContext();

  return (
    <Card className="mt-0">
      <Card.Body>
        <Card.Title as="h5">Fee Classes for {client?.name || 'Client'}</Card.Title>
        <p>Details of applicable fee structures and classes.</p>
        <Table striped bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Fee Class ID</th>
              <th>Description</th>
              <th>Applicable Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FC-001</td>
              <td>Standard Retail Banking Fees</td>
              <td>Current Accounts, Savings</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>FC-INVEST-03</td>
              <td>Premium Investment Advisory</td>
              <td>Managed Portfolios, Brokerage</td>
              <td>Active</td>
            </tr>
            {/* Add more fee classes as needed */}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ClientFeeClasses;
