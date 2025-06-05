import axios from 'axios';
import { Country, CountrySpec } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await api.get('/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchCountrySpec = async (country: string): Promise<CountrySpec | null> => {
  try {
    const response = await api.get(`/specs/${country}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching specs for ${country}:`, error);
    return null;
  }
};

export default api;