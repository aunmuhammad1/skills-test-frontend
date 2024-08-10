import { useState } from 'react';
import axios from 'axios';

const usePush = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pushData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return { pushData, loading, error };
};

export default usePush;
