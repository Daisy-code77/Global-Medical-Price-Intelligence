import { useState, useCallback } from 'react';

const rates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095
};

const symbols = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState('INR');

  const formatPrice = useCallback((amountInINR, targetCurrency) => {
    const rate = rates[targetCurrency] || 1;
    const convertedAmount = amountInINR * rate;
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: targetCurrency === 'INR' ? 0 : 2
    }).format(convertedAmount);
  }, []);

  return {
    currency,
    setCurrency,
    formatPrice,
    symbols,
    availableCurrencies: Object.keys(rates)
  };
};
