import React, { useEffect, useState } from 'react'; 
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2'; 
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  Title, 
  CategoryScale, 
  LinearScale,   
  BarElement,    
  PointElement, 
  LineElement   
} from 'chart.js'; 
import { getAllClients } from '../data/clients'; 
import { getAllAccounts } from '../data/accounts'; 
import { getAllTransactions } from '../data/transactions'; 

ChartJS.register( 
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale, 
  LinearScale,   
  BarElement,    
  PointElement, 
  LineElement   
);

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

// Helper function to get all months in a range (YYYY-MM format)
const getAllMonthsInRange = (startDate, endDateStr) => {
  const start = new Date(startDate);
  const end = new Date(endDateStr);
  let current = new Date(start.getFullYear(), start.getMonth(), 1);
  const endTarget = new Date(end.getFullYear(), end.getMonth(), 1);
  const months = [];

  while (current <= endTarget) {
    const year = current.getFullYear();
    const month = (current.getMonth() + 1).toString().padStart(2, '0');
    months.push(`${year}-${month}`);
    current.setMonth(current.getMonth() + 1);
  }
  return months;
};

const AnalyticsDashboardPage = () => {
  const [clientStatusData, setClientStatusData] = useState(null); 
  const [accountsOverviewData, setAccountsOverviewData] = useState(null); 
  const [transactionTrendsData, setTransactionTrendsData] = useState(null); 
  const [kpiDetails, setKpiDetails] = useState(null); 
  const [transactionCategoryData, setTransactionCategoryData] = useState(null); 

  useEffect(() => { 
    const clients = getAllClients();
    const accounts = getAllAccounts();
    const transactions = getAllTransactions();

    // Client Status Data Processing
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
              eriColors.primaryBlue, 
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

    // Transaction Trends Data Processing
    if (transactions.length > 0) {
      const earliestTransactionDate = transactions.reduce((earliest, t) => {
        const currentDate = new Date(t.date);
        return currentDate < earliest ? currentDate : earliest;
      }, new Date(transactions[0].date));

      const trendEndDate = '2025-05-18'; // User request: show data up to May 2025
      const allTrendMonths = getAllMonthsInRange(earliestTransactionDate, trendEndDate);

      const monthlyTransactionCounts = allTrendMonths.reduce((acc, monthYear) => {
        acc[monthYear] = 0; // Initialize all months in range with 0 count
        return acc;
      }, {});

      transactions.forEach(transaction => {
        if (new Date(transaction.date) <= new Date(trendEndDate)) { // Only count transactions within the trend end date
          const monthYear = transaction.date.substring(0, 7); // YYYY-MM
          if (Object.prototype.hasOwnProperty.call(monthlyTransactionCounts, monthYear)) { 
            monthlyTransactionCounts[monthYear]++;
          }
        }
      });

      const trendLabels = Object.keys(monthlyTransactionCounts);
      const trendData = Object.values(monthlyTransactionCounts);

      setTransactionTrendsData({
        labels: trendLabels,
        datasets: [
          {
            label: 'Number of Transactions per Month',
            data: trendData,
            fill: false,
            borderColor: eriColors.primaryRed,
            tension: 0.1,
          },
        ],
      });
    }

    // Transaction Categories Data Processing
    const categoryCounts = transactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    if (Object.keys(categoryCounts).length > 0) {
      const categoryLabels = Object.keys(categoryCounts);
      const categoryValues = Object.values(categoryCounts);
      // Use a diverse set of colors for categories
      const FALLBACK_COLOR = '#CCCCCC'; // Define a fallback color

      const categoryBackgroundColors = [
        eriColors?.redShades?.[4] || FALLBACK_COLOR,
        eriColors?.blueShades?.[4] || FALLBACK_COLOR,
        eriColors?.greenShades?.[4] || FALLBACK_COLOR,
        eriColors?.yellowOrangeShades?.[3] || FALLBACK_COLOR,
        eriColors?.primaryRed || FALLBACK_COLOR,
        eriColors?.primaryBlue || FALLBACK_COLOR,
        eriColors?.complementaryGreen || FALLBACK_COLOR,
        eriColors?.complementaryYellowOrange || FALLBACK_COLOR,
        eriColors?.redShades?.[2] || FALLBACK_COLOR,
        eriColors?.blueShades?.[2] || FALLBACK_COLOR,
        eriColors?.greenShades?.[2] || FALLBACK_COLOR,
        eriColors?.yellowOrangeShades?.[1] || FALLBACK_COLOR,
        // Add more colors if you anticipate more categories, ensuring they also have fallbacks
      ];

      setTransactionCategoryData({
        labels: categoryLabels,
        datasets: [
          {
            label: 'Transaction Categories',
            data: categoryValues,
            backgroundColor: categoryBackgroundColors.slice(0, categoryLabels.length),
            borderColor: categoryBackgroundColors.slice(0, categoryLabels.length), // USE background colors for border
            borderWidth: 1,
          },
        ],
      });
    }

    // Calculate KPIs
    if (clients.length > 0 && accounts.length > 0 && transactions.length > 0) {
      const totalClients = clients.length;
      const activeClients = clients.filter(c => c.status === 'Active').length;
      const inactiveClients = clients.filter(c => c.status === 'Inactive').length;
      const pendingClients = clients.filter(c => c.status === 'Pending').length;

      const newClientsSince2024 = clients.filter(c => {
        const dateStr = c.joinDate || c.creationDate;
        if (!dateStr) return false;
        const year = parseInt(dateStr.substring(0, 4), 10);
        return year >= 2024;
      }).length;

      const clientsWithStats = clients.filter(c => c.statistics && typeof c.statistics.productsHeld === 'number');
      const avgProductsHeld = clientsWithStats.length > 0 
        ? (clientsWithStats.reduce((sum, c) => sum + c.statistics.productsHeld, 0) / clientsWithStats.length).toFixed(1)
        : 'N/A';

      const retailClients = clients.filter(c => c.clientType && c.clientType.toLowerCase().includes('retail')).length;
      const corporateClients = clients.filter(c => c.clientType && c.clientType.toLowerCase().includes('corporate')).length;
      const percentRetailClients = totalClients > 0 ? ((retailClients / totalClients) * 100).toFixed(1) + '%' : 'N/A';
      const percentCorporateClients = totalClients > 0 ? ((corporateClients / totalClients) * 100).toFixed(1) + '%' : 'N/A';
      
      const highRiskClients = clients.filter(c => c.riskProfile === 'High').length;

      const totalAccounts = accounts.length;
      const avgAccountsPerClient = totalClients > 0 ? (totalAccounts / totalClients).toFixed(1) : 'N/A';
      const eurAccounts = accounts.filter(a => a.currency === 'EUR').length;
      const usdAccounts = accounts.filter(a => a.currency === 'USD').length;

      const totalTransactions = transactions.length;
      const avgTransactionsPerAccount = totalAccounts > 0 ? (totalTransactions / totalAccounts).toFixed(1) : 'N/A';
      
      // For 'Transactions this Month', using current system date. Mocked date is May 2025.
      const currentDate = new Date(); // In a real scenario, this might be a fixed reporting date.
      // NOTE: For testing with existing data, you might want to use a fixed date that has transactions.
      // const targetYear = 2024; 
      // const targetMonth = 5; // May
      const targetYear = currentDate.getFullYear();
      const targetMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
      const currentMonthStr = `${targetYear}-${targetMonth.toString().padStart(2, '0')}`;
      const transactionsThisMonth = transactions.filter(t => t.date && t.date.startsWith(currentMonthStr)).length;

      const incomeTransactions = transactions.filter(t => t.category === 'Income').length;
      const investmentTransactions = transactions.filter(t => t.category === 'Investment').length;
      
      const debitTransactions = transactions.filter(t => t.type === 'Debit' || t.type === 'payment' || t.type === 'withdrawal' || t.type === 'transfer_out').length;
      const creditTransactions = transactions.filter(t => t.type === 'Credit' || t.type === 'deposit' || t.type === 'transfer_in').length;

      setKpiDetails({
        totalClients,
        activeClients,
        inactiveClients,
        pendingClients,
        newClientsSince2024,
        avgProductsHeld,
        percentRetailClients,
        percentCorporateClients,
        highRiskClients,
        totalAccounts,
        avgAccountsPerClient,
        eurAccounts,
        usdAccounts,
        totalTransactions,
        avgTransactionsPerAccount,
        transactionsThisMonth,
        incomeTransactions,
        investmentTransactions,
        debitTransactions,
        creditTransactions,
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

  const accountsOverviewChartOptions = { 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start', // Add this for better alignment with many items
        display: true, 
      },
      title: {
        display: true,
        text: 'Account Distribution by Type',
      },
    },
  };

  const transactionTrendsChartOptions = { 
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Transaction Volume',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const transactionCategoryChartOptions = { 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start', // Add this for better alignment with many items
      },
      title: {
        display: true,
        text: 'Transaction Distribution by Category',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) + '%' : '0%';
              label += `${context.formattedValue} (${percentage})`;
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Analytics Dashboard</h2>
      
      {/* First Row: Clients Overview, Transaction Categories, Accounts Overview */}
      <Row>
        <Col md={6} lg={4} className="mb-3">
          <Card style={{ minHeight: '400px' }}>
            <Card.Header>Clients Overview</Card.Header>
            <Card.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {clientStatusData ? (
                <Pie data={clientStatusData} options={clientStatusChartOptions} />
              ) : (
                <Card.Text>Loading client status data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card style={{ minHeight: '400px' }}>
            <Card.Header>Transaction Categories</Card.Header>
            <Card.Body>
              {transactionCategoryData ? (
                <Pie data={transactionCategoryData} options={transactionCategoryChartOptions} />
              ) : (
                <Card.Text>Loading transaction category data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={4} className="mb-3">
          <Card style={{ minHeight: '400px' }}>
            <Card.Header>Accounts Overview</Card.Header>
            <Card.Body>
              {accountsOverviewData ? (
                <Doughnut data={accountsOverviewData} options={accountsOverviewChartOptions} />
              ) : (
                <Card.Text>Loading accounts overview data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second Row: Transaction Trends & Key Performance Indicators */}
      <Row>
        <Col md={12} lg={6} className="mb-3">
          <Card style={{ minHeight: '400px' }}>
            <Card.Header>Transaction Trends</Card.Header>
            <Card.Body>
              {transactionTrendsData ? (
                <Line data={transactionTrendsData} options={transactionTrendsChartOptions} />
              ) : (
                <Card.Text>Loading transaction trends data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={6} className="mb-3">
          <Card style={{ minHeight: '400px' }}> 
            <Card.Header>Key Performance Indicators (KPIs)</Card.Header>
            <Card.Body style={{ maxHeight: '320px', overflowY: 'auto' }}> 
              {kpiDetails ? (
                <ListGroup variant="flush" style={{ fontSize: '0.85rem' }}> 
                  {/* Client Overview KPIs */}
                  <h5>Client Overview</h5>
                  <Row className="mb-2">
                    <Col md={6}>
                      <ListGroup.Item>Total Clients: <strong>{kpiDetails.totalClients}</strong></ListGroup.Item>
                      <ListGroup.Item>Active Clients: <strong>{kpiDetails.activeClients}</strong></ListGroup.Item>
                      <ListGroup.Item>Inactive Clients: <strong>{kpiDetails.inactiveClients}</strong></ListGroup.Item>
                      <ListGroup.Item>Pending Clients: <strong>{kpiDetails.pendingClients}</strong></ListGroup.Item>
                      <ListGroup.Item>New Clients (since 2024): <strong>{kpiDetails.newClientsSince2024}</strong></ListGroup.Item>
                    </Col>
                    <Col md={6}>
                      <ListGroup.Item>Avg. Products Held: <strong>{kpiDetails.avgProductsHeld}</strong></ListGroup.Item>
                      <ListGroup.Item>% Retail Clients: <strong>{kpiDetails.percentRetailClients}</strong></ListGroup.Item>
                      <ListGroup.Item>% Corporate Clients: <strong>{kpiDetails.percentCorporateClients}</strong></ListGroup.Item>
                      <ListGroup.Item>High Risk Clients: <strong>{kpiDetails.highRiskClients}</strong></ListGroup.Item>
                    </Col>
                  </Row>

                  {/* Account Overview KPIs */}
                  <h5 className="mt-3">Account Overview</h5>
                  <Row className="mb-2">
                    <Col md={6}>
                      <ListGroup.Item>Total Accounts: <strong>{kpiDetails.totalAccounts}</strong></ListGroup.Item>
                      <ListGroup.Item>Avg. Accounts/Client: <strong>{kpiDetails.avgAccountsPerClient}</strong></ListGroup.Item>
                    </Col>
                    <Col md={6}>
                      <ListGroup.Item>EUR Accounts: <strong>{kpiDetails.eurAccounts}</strong></ListGroup.Item>
                      <ListGroup.Item>USD Accounts: <strong>{kpiDetails.usdAccounts}</strong></ListGroup.Item>
                    </Col>
                  </Row>

                  {/* Transaction Overview KPIs */}
                  <h5 className="mt-3">Transaction Overview</h5>
                  <Row>
                    <Col md={6}>
                      <ListGroup.Item>Total Transactions: <strong>{kpiDetails.totalTransactions}</strong></ListGroup.Item>
                      <ListGroup.Item>Avg. Txns/Account: <strong>{kpiDetails.avgTransactionsPerAccount}</strong></ListGroup.Item>
                      <ListGroup.Item>Txns This Month ({new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}): <strong>{kpiDetails.transactionsThisMonth}</strong></ListGroup.Item>
                      <ListGroup.Item>'Income' Txns: <strong>{kpiDetails.incomeTransactions}</strong></ListGroup.Item>
                    </Col>
                    <Col md={6}>
                      <ListGroup.Item>'Investment' Txns: <strong>{kpiDetails.investmentTransactions}</strong></ListGroup.Item>
                      <ListGroup.Item>Debit Txns: <strong>{kpiDetails.debitTransactions}</strong></ListGroup.Item>
                      <ListGroup.Item>Credit Txns: <strong>{kpiDetails.creditTransactions}</strong></ListGroup.Item>
                    </Col>
                  </Row>
                </ListGroup>
              ) : (
                <Card.Text>Loading KPI data...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsDashboardPage;
