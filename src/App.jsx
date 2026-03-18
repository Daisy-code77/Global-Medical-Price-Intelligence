import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ComparisonModal from './components/ComparisonModal';
import { useCurrency } from './hooks/useCurrency';
import productsData from './data/products.json';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currency, setCurrency, formatPrice, availableCurrencies } = useCurrency();

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleCompare = (product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      if (selectedProducts.length >= 4) {
        alert("You can compare up to 4 products at once.");
        return;
      }
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <div className="app">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        currency={currency} 
        setCurrency={setCurrency}
        availableCurrencies={availableCurrencies}
      />

      <header style={{ padding: '4rem 0 2rem', textAlign: 'center', background: 'white' }}>
        <div className="container">
          <span className="badge" style={{ marginBottom: '1rem', background: '#ecfdf5', color: '#047857' }}>
            Trusted by 500+ Medical Centers
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', marginBottom: '1rem', lineHeight: '1.1' }}>
            Global Medical <span style={{ color: 'var(--primary)' }}>Price Intelligence</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Compare specifications and live pricing from leading global manufacturers. 
            Real-time currency conversion for seamless procurement planning.
          </p>
        </div>
      </header>

      <main className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0 1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              {searchTerm ? `Search Results for "${searchTerm}"` : 'Recommended Products'}
            </h2>
            {searchTerm && filteredProducts.length > 0 && (
              <button 
                className="btn btn-outline" 
                onClick={() => {
                  setSelectedProducts(filteredProducts);
                  setIsModalOpen(true);
                }}
                style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Compare All Search Results ({filteredProducts.length})
              </button>
            )}
          </div>
          {selectedProducts.length > 0 && (
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              Compare ({selectedProducts.length})
            </button>
          )}
        </div>

        <div className="grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              currency={currency}
              formatPrice={formatPrice}
              onCompare={toggleCompare}
              isSelected={selectedProducts.some(p => p.id === product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--secondary)' }}>
            <p style={{ fontSize: '1.25rem' }}>No products found matching your search.</p>
          </div>
        )}
      </main>

      <footer style={{ background: 'white', padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: '700', marginBottom: '1rem' }}>MedCompare Global</p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            © 2026 Medical Price Comparison Platform. All rights reserved.
          </p>
        </div>
      </footer>

      {isModalOpen && (
        <ComparisonModal 
          selectedProducts={selectedProducts} 
          onClose={() => setIsModalOpen(false)}
          currency={currency}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
}

export default App;
