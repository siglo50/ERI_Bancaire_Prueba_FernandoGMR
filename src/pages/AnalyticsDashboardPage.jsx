import React, { useEffect, useState } from 'react'; 
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2'; 
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  Title, 
  CategoryScale, 
  LinearScale, 
  BarElement 
} from 'chart.js'; 
import { getAllClients } from '../data/clients'; 
import { getAllAccounts } from '../data/accounts'; 

ChartJS.register( 
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale, 
  LinearScale, 
  BarElement 
);

// Define eriColors outside the component
const eriColors = { 
  primaryRed: '#E63137', 
  redShades: ['#f8c4c6', '#f4a7a9', '#f1898d', '#ed6c70', '#ea4e54', '#E63137', '#bb171c', '#8e0307'],
  complementaryGreen: '#31e686', 
  greenShades: ['#ddfbeb', '#baf7d7', '#98f3c3', '#76ecee', '#50dfb0', '#31e686', '#129550', '#0c6435'], 
  primaryBlue: '#00205C', 
  blueShades: ['#88b1ff', '#4c8eff', '#1063ff', '#004ad3', '#003598', '#00205C', '#001b4d', '#00153d'],
  complementaryYellowOrange: '#986300', 
  yellowOrangeShades: ['#ffd588', '#ffc14c', '#ffac10', '#F09A00', '#D47D00', '#986300', '#5c3c00', '#4f3300', '#422b00'] 
};

const AnalyticsDashboardPage = () => {
  const [clientStatusData, setClientStatusData] = useState(null); 
  const [accountsOverviewData, setAccountsOverviewData] = useState(null); 

  useEffect(() => { 
    // Client Status Data Processing
    const clients = getAllClients();
    const statusCounts = clients.reduce((acc, client) => { 
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    }, {});

    if (Object.keys(statusCounts).length > 0) { 
      setClientStatusData({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: 'Client Status',
            data: Object.values(statusCounts),
            backgroundColor: [
              eriColors.greenShades[5], 
              eriColors.yellowOrangeShades[3], 
              eriColors.redShades[5],   
              eriColors.blueShades[4],  
              // Add more colors if you have more statuses
            ],
            borderColor: [
              eriColors.greenShades[7],
              eriColors.yellowOrangeShades[5],
              eriColors.redShades[7],
              eriColors.blueShades[6]
            ],
            borderWidth: 1,
          },
        ],
      });
    }

    // Accounts Overview Data Processing
    const accounts = getAllAccounts();
    const accountTypeCounts = accounts.reduce((acc, account) => {
      acc[account.accountType] = (acc[account.accountType] || 0) + 1;
      return acc;
    }, {});

    if (Object.keys(accountTypeCounts).length > 0) {
      setAccountsOverviewData({
        labels: Object.keys(accountTypeCounts),
        datasets: [
          {
            label: 'Number of Accounts by Type',
            data: Object.values(accountTypeCounts),
            backgroundColor: [
              eriColors.blueShades[5], 
              eriColors.greenShades[4],
              eriColors.yellowOrangeShades[4],
              eriColors.redShades[4],
              eriColors.primaryBlue, // Add more distinct colors as needed
            ],
            borderColor: [
              eriColors.blueShades[7],
              eriColors.greenShades[6],
              eriColors.yellowOrangeShades[6],
              eriColors.redShades[6],
              eriColors.blueShades[2],
            ],
            borderWidth: 1,
          },
        ],
      });
    }

  }, []); 

  const clientStatusChartOptions = { 
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Client Distribution by Status',
      },
    },
  };

  const accountsChartOptions = { 
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false, 
      },
      title: {
        display: true,
        text: 'Account Distribution by Type',
      },
    },
    scales: { 
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 
        }
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Analytics Dashboard</h2>
      
      <Row>
        <Col md={6} lg={4} className="mb-3">
          <Card>
            <Card.Header>Clients Overview</Card.Header>
            <Card.Body style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {clientStatusData ? (  
                <Pie data={clientStatusData} options={clientStatusChartOptions} />
              ) : ( 
                <Card.Text>Loading client distribution data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3"> 
          <Card>
            <Card.Header>Accounts Overview</Card.Header>
            <Card.Body style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {accountsOverviewData ? (
                <Bar data={accountsOverviewData} options={accountsChartOptions} />
              ) : (
                <Card.Text>Loading accounts overview data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card>
            <Card.Header>Transaction Trends</Card.Header>
            <Card.Body style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card.Text>Transaction trends chart (e.g., by month, type) will go here.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
         <Col md={12} lg={8} className="mb-3">
          <Card>
            <Card.Header>Transaction Categories</Card.Header>
            <Card.Body>
              <Card.Text>Transaction distribution by category (e.g., pie chart) will go here.</Card.Text>
              {/* Example: <Doughnut data={transactionCategoryData} options={chartOptions} /> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Card>
            <Card.Header>Key Performance Indicators (KPIs)</Card.Header>
            <Card.Body>
              <Card.Text>Total Clients: {/* Placeholder */}</Card.Text>
              <Card.Text>Total Accounts: {/* Placeholder */}</Card.Text>
              <Card.Text>Total Transaction Value: {/* Placeholder */}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* More rows and charts can be added here */}

    </Container>
  );
};

export default AnalyticsDashboardPage;
