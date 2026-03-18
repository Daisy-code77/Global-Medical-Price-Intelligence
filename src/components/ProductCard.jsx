import React from 'react';

const ProductCard = ({ product, currency, formatPrice, onCompare, isSelected }) => {
  const basePrice = product.prices["India (Medika)"].value;
  
  return (
    <div className="card">
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} 
        />
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span className="badge">{product.category}</span>
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', height: '3rem', overflow: 'hidden' }}>
        {product.name}
      </h3>
      
      <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1rem', height: '2.5rem', overflow: 'hidden' }}>
        {product.description}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '600' }}>Starting from</p>
          <p className="price-tag">{formatPrice(basePrice, currency)}</p>
        </div>
        
        <button 
          className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onCompare(product)}
          style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
        >
          {isSelected ? 'Selected' : 'Compare'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
