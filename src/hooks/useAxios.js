import axios from 'axios';
import { useState, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shouldFetch, setShouldFetch] = useState(true);
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  const fetchData = useCallback(
    async (url, method = 'GET', headers = {}, data = {}, params = {}) => {
      if (!shouldFetch) return;
      setLoading(true);
      setError('');

      try {
        const result = await axiosInstance({
          url,
          method,
          headers,
          data,
          params,
        });
        setResponse(result.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, shouldFetch]
  );

  const enableFetching = () => setShouldFetch(true);
  const disableFetching = () => setShouldFetch(false);
  return {
    response,
    error,
    loading,
    fetchData,
    enableFetching,
    disableFetching,
  };
};

export default useAxios;
