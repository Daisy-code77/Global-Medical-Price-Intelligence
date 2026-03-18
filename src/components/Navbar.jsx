import React, { useState, useRef, useEffect, useMemo } from 'react';
import suggestionsData from '../data/suggestions.json';

const Navbar = ({ searchTerm, setSearchTerm, currency, setCurrency, availableCurrencies }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    return suggestionsData.filter(item => 
      item.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).slice(0, 5); // show top 5 suggestions
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsFocused(false);
  };

  return (
    <nav className="glass-nav">
      <div className="container" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
            M
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Med<span style={{ color: 'var(--primary)' }}>Compare</span>
          </h1>
        </div>

        <div ref={searchWrapperRef} style={{ flex: '1', maxWidth: '500px', position: 'relative' }}>
          <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'var(--secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search medical products (e.g. Paracetamol, Vitamin C)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsFocused(true);
            }}
            onFocus={() => setIsFocused(true)}
          />
          {isFocused && filteredSuggestions.length > 0 && (
            <ul className="search-suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600' }}
          >
            {availableCurrencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="btn btn-primary">
            Quick Quote
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
