// src/data/clients.js
export const clients = [
    {
      id: '015454156',
      name: 'Cliente 11111111 NC',
      root: '000000000000',
      manager: 'Manager Alpha',
      clientType: 'Retail Premium',
      centre: 'Downtown Branch',
      status: 'Active',
      address: '123 Main St, Anytown, USA, 12345',
      phone: '+1-555-0100',
      email: 'cliente.11111111nc@example.com',
      segment: 'High Value',
      riskProfile: 'Medium',
      creationDate: '2018-05-20',
      lastActivityDate: '2024-05-15',
      communicationPreferences: {
        email: true,
        sms: false,
        post: true,
      },
      statistics: {
        totalAssets: 150000,
        totalLiabilities: 25000,
        productsHeld: 5,
      },
      managementNotes: 'Prefers contact via email. Annual review scheduled for Q4.',
      feeClass: 'Class A - Premium',
      controlFlags: ['AML Check Pending', 'Large Transaction Monitoring'],
      accounts: ['015454156909782034', '015454156909782035', '015454156707123456'],
    },
    {
      id: '025789333',
      name: 'Empresa XYZ Solutions',
      root: '111222333444',
      manager: 'Manager Beta',
      clientType: 'Corporate',
      centre: 'Business Center HQ',
      status: 'Active',
      address: '456 Corporate Ave, Business City, USA, 67890',
      phone: '+1-555-0200',
      email: 'contact@xyzsolutions.com',
      segment: 'SME',
      riskProfile: 'Low',
      creationDate: '2020-01-10',
      lastActivityDate: '2024-05-10',
      communicationPreferences: {
        email: true,
        sms: true,
        post: false,
      },
      statistics: {
        totalAssets: 1250000,
        totalLiabilities: 450000,
        productsHeld: 8,
      },
      managementNotes: 'Primary contact: Jane Doe (CFO). Requires monthly statements.',
      feeClass: 'Class C - Corporate Standard',
      controlFlags: [],
      accounts: ['025789333101012345', '025789333202045678'],
    },
    {
      id: '036987452',
      name: 'John B. Prospect',
      root: '555666777888',
      manager: 'Manager Gamma',
      clientType: 'Retail Standard',
      centre: 'Suburbia Branch',
      status: 'Inactive',
      address: '789 Residential Rd, Smalltown, USA, 13579',
      phone: '+1-555-0300',
      email: 'john.prospect@example.com',
      segment: 'Mass Market',
      riskProfile: 'High',
      creationDate: '2021-11-01',
      lastActivityDate: '2023-02-11',
      communicationPreferences: {
        email: false,
        sms: false,
        post: true,
      },
      statistics: {
        totalAssets: 5000,
        totalLiabilities: 1000,
        productsHeld: 1,
      },
      managementNotes: 'Account dormant. Follow-up required.',
      feeClass: 'Class R - Retail Basic',
      controlFlags: ['Dormancy Alert'],
      accounts: ['036987452100000001'],
    },
    {
      id: 'cli004',
      name: 'Elena Petrova',
      email: 'elena.petrova@example.com',
      phone: '+1-555-0106',
      address: '789 Pine St, Villagetown, USA',
      joinDate: '2022-08-10',
      status: 'Active',
      manager: 'Manager Delta',
      clientType: 'Retail Standard',
      centre: 'Online Branch',
      preferences: {
        newsletter: true,
        notifications: ['email', 'sms']
      }
    },
    {
      id: 'cli005',
      name: 'Mohammed Al-Farsi',
      email: 'mohammed.alfarsi@example.com',
      phone: '+968-99-123456',
      address: '456 Oasis Rd, Salalah, Oman',
      joinDate: '2023-01-20',
      status: 'Pending',
      manager: 'Manager Epsilon',
      clientType: 'Retail VIP',
      centre: 'City West Branch',
      preferences: {
        newsletter: false,
        notifications: ['email']
      }
    },
    {
      id: 'cli006',
      name: 'Sofia Müller',
      email: 'sofia.muller@example.de',
      phone: '+49-30-5550234',
      address: '101 Hauptstrasse, Berlin, Germany',
      joinDate: '2021-03-05',
      status: 'Inactive',
      manager: 'Manager Zeta',
      clientType: 'Corporate SME',
      centre: 'International Desk',
      preferences: {
        newsletter: true,
        notifications: ['email']
      }
    },
    {
      id: 'cli007',
      name: 'Kenji Tanaka',
      email: 'kenji.tanaka@example.jp',
      phone: '+81-3-1234-5678',
      address: '2-3-4 Sakura Ave, Tokyo, Japan',
      joinDate: '2023-04-15',
      status: 'Active',
      manager: 'Manager Eta',
      clientType: 'Retail Standard',
      centre: 'Metro East Branch',
      preferences: {
        newsletter: false,
        notifications: ['sms']
      }
    }
  ];
  
  export const getClientById = (id) => clients.find(client => client.id === id);

  export const searchClientsByName = (name) => {
    if (!name) return [];
    const searchTerm = name.toLowerCase();
    return clients.filter(client => client.name.toLowerCase().includes(searchTerm));
  };

  export const getAllClients = () => clients;