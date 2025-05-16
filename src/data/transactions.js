// src/data/transactions.js
export const transactions = {
    // Transactions for account 015454156909782034 (Cliente 11111111 NC - Current)
    '015454156909782034': [
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
    ],
    // Transactions for account 015454156909782035 (Cliente 11111111 NC - Savings)
    '015454156909782035': [
      { id: 'txn011', date: '2024-04-30', description: 'Transfer from Current Acc ...2034', amount: 500.00, type: 'Credit', balance: 27850.00, valueDate: '2024-04-30', category: 'Transfer' },
      { id: 'txn012', date: '2024-03-31', description: 'Quarterly Interest Payment', amount: 52.15, type: 'Credit', balance: 27350.00, valueDate: '2024-03-31', category: 'Interest' },
      { id: 'txn013', date: '2024-02-28', description: 'Transfer from Current Acc ...2034', amount: 300.00, type: 'Credit', balance: 27297.85, valueDate: '2024-02-28', category: 'Transfer' },
    ],
    // Transactions for account 015454156707123456 (Cliente 11111111 NC - Investment)
     '015454156707123456': [
      { id: 'txn014', date: '2024-05-02', description: 'Dividend - MSFT', amount: 150.75, type: 'Credit', balance: 85320.50, valueDate: '2024-05-02', category: 'Dividend' },
      { id: 'txn015', date: '2024-04-10', description: 'Purchase - GOOGL Shares', amount: -5000.00, type: 'Debit', balance: 85169.75, valueDate: '2024-04-10', category: 'Investment' },
    ],
    // Transactions for account 025789333101012345 (Empresa XYZ - Business Current)
    '025789333101012345': [
      { id: 'txn016', date: '2024-05-16', description: 'Payment Received - Client A', amount: 15000.00, type: 'Credit', balance: 175230.90, valueDate: '2024-05-16', category: 'Client Payment' },
      { id: 'txn017', date: '2024-05-15', description: 'Supplier Payment - Supplier X', amount: -7500.00, type: 'Debit', balance: 160230.90, valueDate: '2024-05-15', category: 'Supplier Payment' },
      { id: 'txn018', date: '2024-05-14', description: 'Office Rent Q2', amount: -4500.00, type: 'Debit', balance: 167730.90, valueDate: '2024-05-14', category: 'Operating Expenses' },
    ],
     // Transactions for account 025789333202045678 (Empresa XYZ - GBP Account)
    '025789333202045678': [
      { id: 'txn019', date: '2024-05-05', description: 'FX Transfer from EUR Account', amount: 10000.00, type: 'Credit', balance: 45800.20, valueDate: '2024-05-05', category: 'FX Transfer' },
      { id: 'txn020', date: '2024-04-20', description: 'Payment to UK Supplier', amount: -2500.00, type: 'Debit', balance: 35800.20, valueDate: '2024-04-20', category: 'Supplier Payment' },
    ],
    // No transactions for John B. Prospect's inactive account
    '036987452100000001': []
  };
  
  export const getTransactionsByAccountId = (accountId) => transactions[accountId] || [];