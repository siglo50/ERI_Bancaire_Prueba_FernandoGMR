// src/data/transactions.js
export let transactions = [
  {
    accountId: '015454156909782034',
    transactions: [
      { id: 'txn103', date: '2024-05-18', description: 'Bookstore "Shakespeare & Co"', amount: -42.10, type: 'Debit', balance: 12423.16, valueDate: '2024-05-18', category: 'Shopping' },
      { id: 'txn102', date: '2024-05-17', description: 'Online Course - Coursera', amount: -29.99, type: 'Debit', balance: 12465.26, valueDate: '2024-05-17', category: 'Education' },
      { id: 'txn101', date: '2024-05-16', description: 'Coffee "Le Procope"', amount: -5.50, type: 'Debit', balance: 12495.25, valueDate: '2024-05-16', category: 'Dining' },
      { id: 'txn001', date: '2024-05-15', description: 'Salary Deposit - ACME Corp', amount: 3200.00, type: 'Credit', balance: 12500.75, valueDate: '2024-05-15', category: 'Income' },
      { id: 'txn002', date: '2024-05-14', description: 'Supermarket "Le Bon Marché"', amount: -85.60, type: 'Debit', balance: 9300.75, valueDate: '2024-05-14', category: 'Groceries' },
      { id: 'txn003', date: '2024-05-12', description: 'Online Purchase - FNAC Books', amount: -45.99, type: 'Debit', balance: 9386.35, valueDate: '2024-05-12', category: 'Shopping' },
      { id: 'txn004', date: '2024-05-10', description: 'ATM Withdrawal - Rue de Rivoli', amount: -200.00, type: 'Debit', balance: 9432.34, valueDate: '2024-05-10', category: 'Cash Withdrawal' },
      { id: 'txn005', date: '2024-05-08', description: 'Transfer to Savings Acc ...2035', amount: -500.00, type: 'Debit', balance: 9632.34, valueDate: '2024-05-08', category: 'Transfer' },
      { id: 'txn006', date: '2024-05-05', description: 'Restaurant "Chez Pierre"', amount: -62.70, type: 'Debit', balance: 10132.34, valueDate: '2024-05-05', category: 'Dining' },
      { id: 'txn007', date: '2024-05-02', description: 'Monthly Subscription - Streaming Service', amount: -14.99, type: 'Debit', balance: 10195.04, valueDate: '2024-05-02', category: 'Entertainment' },
      { id: 'txn008', date: '2024-04-28', description: 'Pharmacy "Grande Pharmacie"', amount: -22.30, type: 'Debit', balance: 10200.03, valueDate: '2024-04-28', category: 'Health' },
      { id: 'txn009', date: '2024-04-25', description: 'Mobile Phone Bill', amount: -55.00, type: 'Debit', balance: 10222.33, valueDate: '2024-04-25', category: 'Bills' },
      { id: 'txn010', date: '2024-04-15', description: 'Salary Deposit - ACME Corp', amount: 3200.00, type: 'Credit', balance: 10277.33, valueDate: '2024-04-15', category: 'Income' },
    ]
  },
  {
    accountId: '015454156909782035',
    transactions: [
      { id: 'txn011', date: '2024-04-30', description: 'Transfer from Current Acc ...2034', amount: 500.00, type: 'Credit', balance: 27850.00, valueDate: '2024-04-30', category: 'Transfer' },
      { id: 'txn012', date: '2024-03-31', description: 'Quarterly Interest Payment', amount: 52.15, type: 'Credit', balance: 27350.00, valueDate: '2024-03-31', category: 'Interest' },
      { id: 'txn013', date: '2024-02-28', description: 'Transfer from Current Acc ...2034', amount: 300.00, type: 'Credit', balance: 27297.85, valueDate: '2024-02-28', category: 'Transfer' },
    ]
  },
  {
    accountId: '015454156707123456',
    transactions: [
      { id: 'txn014', date: '2024-05-02', description: 'Dividend - MSFT', amount: 150.75, type: 'Credit', balance: 85320.50, valueDate: '2024-05-02', category: 'Dividend' },
      { id: 'txn015', date: '2024-04-10', description: 'Purchase - GOOGL Shares', amount: -5000.00, type: 'Debit', balance: 85169.75, valueDate: '2024-04-10', category: 'Investment' },
    ]
  },
  {
    accountId: '025789333101012345',
    transactions: [
      { id: 'txn105', date: '2024-05-18', description: 'Software License - Adobe CC', amount: -899.00, type: 'Debit', balance: 174181.70, valueDate: '2024-05-18', category: 'Software' },
      { id: 'txn104', date: '2024-05-17', description: 'Office Supplies - Bureau Vallée', amount: -150.20, type: 'Debit', balance: 175080.70, valueDate: '2024-05-17', category: 'Office Supplies' },
      { id: 'txn016', date: '2024-05-16', description: 'Payment Received - Client A', amount: 15000.00, type: 'Credit', balance: 175230.90, valueDate: '2024-05-16', category: 'Client Payment' },
      { id: 'txn017', date: '2024-05-15', description: 'Supplier Payment - Supplier X', amount: -7500.00, type: 'Debit', balance: 160230.90, valueDate: '2024-05-15', category: 'Supplier Payment' },
      { id: 'txn018', date: '2024-05-14', description: 'Office Rent Q2', amount: -4500.00, type: 'Debit', balance: 167730.90, valueDate: '2024-05-14', category: 'Operating Expenses' },
    ]
  },
  {
    accountId: '025789333202045678',
    transactions: [
      { id: 'txn019', date: '2024-05-05', description: 'FX Transfer from EUR Account', amount: 10000.00, type: 'Credit', balance: 45800.20, valueDate: '2024-05-05', category: 'FX Transfer' },
      { id: 'txn020', date: '2024-04-20', description: 'Payment to UK Supplier', amount: -2500.00, type: 'Debit', balance: 35800.20, valueDate: '2024-04-20', category: 'Supplier Payment' },
    ]
  },
  {
    accountId: '036987452100000001',
    transactions: []
  }
];

  // Add new transactions for new accounts
  const newTransactions = [
    // Transactions for Elena Petrova's Savings (acc006 EUR)
    {
      accountId: 'acc006',
      transactions: [
        { id: 'txn021', date: '2023-01-10', description: 'Salary Deposit', amount: 3000, currency: 'EUR', type: 'deposit', balanceAfterTransaction: 3000 },
        { id: 'txn022', date: '2023-01-15', description: 'Rent Payment', amount: -800, currency: 'EUR', type: 'payment', balanceAfterTransaction: 2200 },
        { id: 'txn023', date: '2023-02-10', description: 'Salary Deposit', amount: 3000, currency: 'EUR', type: 'deposit', balanceAfterTransaction: 5200 },
        { id: 'txn024', date: '2023-02-20', description: 'Online Shopping', amount: -150.75, currency: 'EUR', type: 'withdrawal', balanceAfterTransaction: 5049.25 },
        { id: 'txn025', date: '2023-03-10', description: 'Salary Deposit', amount: 3100, currency: 'EUR', type: 'deposit', balanceAfterTransaction: 8149.25 }, // Slight salary increase
        { id: 'txn026', date: '2023-03-25', description: 'Travel Expenses', amount: -500, currency: 'EUR', type: 'payment', balanceAfterTransaction: 7649.25 },
        { id: 'txn027', date: '2023-04-10', description: 'Salary Deposit', amount: 3100, currency: 'EUR', type: 'deposit', balanceAfterTransaction: 10749.25 },
        { id: 'txn028', date: '2023-05-10', description: 'Investment Transfer', amount: 1751.50, currency: 'EUR', type: 'transfer_out', balanceAfterTransaction: 12500.75 } // To match current balance
      ]
    },
    // Transactions for Elena Petrova's Checking (acc007 EUR)
    {
      accountId: 'acc007',
      transactions: [
        { id: 'txn029', date: '2023-01-05', description: 'Initial Deposit', amount: 500, currency: 'EUR', type: 'deposit', balanceAfterTransaction: 500 },
        { id: 'txn030', date: '2023-01-12', description: 'Groceries', amount: -75.50, currency: 'EUR', type: 'payment', balanceAfterTransaction: 424.50 },
        { id: 'txn031', date: '2023-02-01', description: 'Utility Bill', amount: -120, currency: 'EUR', type: 'payment', balanceAfterTransaction: 304.50 },
        { id: 'txn032', date: '2023-02-18', description: 'Cash Withdrawal ATM', amount: -100, currency: 'EUR', type: 'withdrawal', balanceAfterTransaction: 204.50 },
        { id: 'txn033', date: '2023-03-07', description: 'Dinner with Friends', amount: -65.30, currency: 'EUR', type: 'payment', balanceAfterTransaction: 139.20 },
        { id: 'txn034', date: '2023-03-20', description: 'Transfer from Savings', amount: 1000, currency: 'EUR', type: 'transfer_in', balanceAfterTransaction: 1139.20 },
        { id: 'txn035', date: '2023-04-15', description: 'Online Subscription', amount: -15.99, currency: 'EUR', type: 'payment', balanceAfterTransaction: 1123.21 },
        { id: 'txn036', date: '2023-05-15', description: 'Book Purchase', amount: 726.99, currency: 'EUR', type: 'payment', balanceAfterTransaction: 1850.20 } // To match current balance
      ]
    },
    // Transactions for Kenji Tanaka's Investment (acc010 JPY)
    {
      accountId: 'acc010',
      transactions: [
        { id: 'txn037', date: '2023-04-20', description: 'Initial Investment', amount: 2000000, currency: 'JPY', type: 'deposit', balanceAfterTransaction: 2000000 },
        { id: 'txn038', date: '2023-04-25', description: 'Stock Purchase ABC Corp', amount: -500000, currency: 'JPY', type: 'payment', balanceAfterTransaction: 1500000 },
        { id: 'txn039', date: '2023-05-01', description: 'Dividend Received', amount: 1000000, currency: 'JPY', type: 'deposit', balanceAfterTransaction: 2500000 } // To match current balance
      ]
    },
    // Transactions for Kenji Tanaka's Checking (acc011 JPY)
    {
      accountId: 'acc011',
      transactions: [
        { id: 'txn040', date: '2023-04-20', description: 'Account Opening Transfer', amount: 500000, currency: 'JPY', type: 'deposit', balanceAfterTransaction: 500000 },
        { id: 'txn041', date: '2023-04-22', description: 'Electronics Store', amount: -75000, currency: 'JPY', type: 'payment', balanceAfterTransaction: 425000 },
        { id: 'txn042', date: '2023-05-05', description: 'Restaurant Bill', amount: -15000, currency: 'JPY', type: 'payment', balanceAfterTransaction: 410000 },
        { id: 'txn043', date: '2023-05-16', description: 'Cash Withdrawal', amount: -60000, currency: 'JPY', type: 'withdrawal', balanceAfterTransaction: 350000 } // To match current balance
      ]
    },
    // Transactions for John Doe's Loan (acc012 USD)
    {
      accountId: 'acc012',
      transactions: [
        { id: 'txn044', date: '2023-03-01', description: 'Loan Disbursement', amount: -16000, currency: 'USD', type: 'withdrawal', balanceAfterTransaction: -16000 }, // Initial loan amount
        { id: 'txn045', date: '2023-04-01', description: 'Loan Payment', amount: 500, currency: 'USD', type: 'deposit', balanceAfterTransaction: -15500 },
        { id: 'txn046', date: '2023-05-01', description: 'Loan Payment', amount: 500, currency: 'USD', type: 'deposit', balanceAfterTransaction: -15000 } // To match current balance
      ]
    }
  ];

  transactions.push(...newTransactions);

  export const getTransactionsByAccountId = (accountId) => transactions.find(account => account.accountId === accountId)?.transactions || [];

  export const getAllTransactions = () => transactions.reduce((acc, clientTrans) => acc.concat(clientTrans.transactions), []);