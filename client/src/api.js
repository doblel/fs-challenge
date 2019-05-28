import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

export default {
  getAccounts: () => api.get('/accounts'),
  createAccount: (account) => api.post('/accounts', account),
  updateAccount: (account) => api.put(`/accounts/${account.id}`, account),
  deleteAccount: (accountId) => api.delete(`/accounts/${accountId}`)
};
