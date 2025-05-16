// src/data/accounts.js
export const accounts = [
    // Accounts for Cliente 11111111 NC
    {
      id: '015454156909782034',
      clientId: '015454156',
      type: 'Current Account', // Matches UI
      currency: 'EUR',
      currencyAbbreviation: 'EUR', // Matches UI
      category: '001- Current account', // Matches UI
      itemDescription: 'Compte courant principal', // Matches UI "Compte courant"
      dateOfLastMovement: '2024-05-15', // Matches UI
      status: 'Active', // Matches UI
      balance: 12500.75,
      openDate: '2018-05-22',
      characteristics: {
        iban: 'ES91 2100 0418 4502 0005 1332',
        swiftBic: 'CAIXESBBXXX',
        overdraftLimit: 500,
        interestRate: 0.00, // Current accounts often have 0%
        monthlyFee: 3.00,
        branch: 'Downtown Branch',
        linkedCards: ['Visa Debit **** 1234'],
        alerts: ['Low balance alert set at €100'],
      },
      bodyData: 'Body', // As per screenshot, might be placeholder
    },
    {
      id: '015454156909782035',
      clientId: '015454156',
      type: 'Savings Account',
      currency: 'EUR',
      currencyAbbreviation: 'EUR',
      category: '002- Savings account',
      itemDescription: 'Compte épargne projet',
      dateOfLastMovement: '2024-04-30',
      status: 'Active',
      balance: 27850.00,
      openDate: '2019-01-10',
      characteristics: {
        iban: 'ES88 0081 0216 5500 0187 6543',
        swiftBic: 'BSCHESMMXXX',
        overdraftLimit: 0,
        interestRate: 0.75, // Percentage
        monthlyFee: 0.00,
        branch: 'Digital Branch',
        goal: 'Vacation Fund',
      },
      bodyData: 'Body',
    },
    {
      id: '015454156707123456',
      clientId: '015454156',
      type: 'Investment Portfolio',
      currency: 'USD',
      currencyAbbreviation: 'USD',
      category: '010- Investment Funds',
      itemDescription: 'Global Equities Fund',
      dateOfLastMovement: '2024-05-02',
      status: 'Active',
      balance: 85320.50, // Market Value
      openDate: '2021-07-01',
      characteristics: {
        portfolioManager: 'AI Global Invest',
        riskLevel: 'Medium-High',
        investmentStrategy: 'Growth',
        lastValuationDate: '2024-05-16'
      },
      bodyData: 'Body',
    },
  
    // Accounts for Empresa XYZ Solutions
    {
      id: '025789333101012345',
      clientId: '025789333',
      type: 'Business Current Account',
      currency: 'EUR',
      currencyAbbreviation: 'EUR',
      category: '001- Current account',
      itemDescription: 'Compte courant opérationnel',
      dateOfLastMovement: '2024-05-16',
      status: 'Active',
      balance: 175230.90,
      openDate: '2020-01-15',
      characteristics: {
        iban: 'FR76 3000 4000 0500 0012 3456 789',
        swiftBic: 'BNPAFRPPXXX',
        overdraftLimit: 10000,
        interestRate: 0.00,
        monthlyFee: 25.00,
        branch: 'Business Center HQ',
        authorizedSignatories: ['Jane Doe', 'John Smith'],
      },
      bodyData: 'Body',
    },
    {
      id: '025789333202045678',
      clientId: '025789333',
      type: 'Foreign Currency Account',
      currency: 'GBP',
      currencyAbbreviation: 'GBP',
      category: '003- Foreign Currency',
      itemDescription: 'Compte en devises GBP',
      dateOfLastMovement: '2024-05-05',
      status: 'Active',
      balance: 45800.20,
      openDate: '2022-03-01',
      characteristics: {
        iban: 'GB29 NWBK 6016 1331 9268 19',
        swiftBic: 'NWBKGB2LXXX',
        overdraftLimit: 0,
        interestRate: 0.10,
        monthlyFee: 10.00,
        branch: 'Business Center HQ',
      },
      bodyData: 'Body',
    },
    // Account for John B. Prospect
    {
      id: '036987452100000001',
      clientId: '036987452',
      type: 'Basic Current Account',
      currency: 'EUR',
      currencyAbbreviation: 'EUR',
      category: '001- Current account',
      itemDescription: 'Compte courant basique',
      dateOfLastMovement: '2023-01-10',
      status: 'Inactive',
      balance: 150.25,
      openDate: '2021-11-01',
      characteristics: {
        iban: 'DE89 3704 0044 0532 0130 00',
        swiftBic: 'COBADEFFXXX',
        overdraftLimit: 0,
        interestRate: 0.00,
        monthlyFee: 1.00,
        branch: 'Suburbia Branch',
      },
      bodyData: 'Body',
    },
  ];
  
  export const getAccountsByClientId = (clientId) => accounts.filter(account => account.clientId === clientId);
  export const getAccountById = (accountId) => accounts.find(account => account.id === accountId);