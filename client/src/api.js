const API_URL = 'http://localhost:5000/api';

export default {
  getAccounts: () => fetch(`${API_URL}/accounts`),
  createAccount: (account) =>
    fetch(`${API_URL}/accounts`, {
      method: 'POST',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  updateAccount: (account) =>
    fetch(`${API_URL}/accounts/${account.id}`, {
      method: 'PUT',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  deleteAccount: (accountId) =>
    fetch(`${API_URL}/accounts/${accountId}`, {
      method: 'DELETE',
    }),
};
