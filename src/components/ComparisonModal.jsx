import React from 'react';

const ComparisonModal = ({ selectedProducts, onClose, currency, formatPrice }) => {
  if (selectedProducts.length === 0) return null;

  const vendors = ["India (Medika)", "USA (GlobalMed)", "Germany (EuroDoc)", "UK (NHS-Care)"];

  return (
    <div className="comparison-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Product Comparison</h2>
            <p style={{ color: 'var(--text-light)' }}>Compare specifications and global pricing side-by-side.</p>
          </div>
          <button className="btn btn-outline" onClick={onClose} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', justifyContent: 'center' }}>
            ✕
          </button>
        </div>

        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th style={{ width: '200px' }}>Features & Vendors</th>
                {selectedProducts.map(p => (
                  <th key={p.id} style={{ minWidth: '250px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                      <span style={{ fontSize: '0.9rem' }}>{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Specifications */}
              {Object.keys(selectedProducts[0].specs).map(specKey => (
                <tr key={specKey}>
                  <td style={{ fontWeight: '600', color: 'var(--secondary)' }}>{specKey}</td>
                  {selectedProducts.map(p => (
                    <td key={p.id}>{p.specs[specKey]}</td>
                  ))}
                </tr>
              ))}
              
              {/* Divider for Pricing */}
              <tr>
                <th colSpan={selectedProducts.length + 1} style={{ background: '#f1f5f9', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Global Pricing (Converted to {currency})
                </th>
              </tr>

              {/* Vendor Pricing */}
              {vendors.map(vendor => (
                <tr key={vendor}>
                  <td style={{ fontWeight: '600' }}>{vendor}</td>
                  {selectedProducts.map(p => {
                    const priceData = p.prices[vendor];
                    // If vendor price is in USD but current view is INR, we convert.
                    // However, for simplicity in this MVP, we assume the data.json values
                    // are all based on a common INR reference for conversion logic.
                    // In a real app, we'd convert from the vendor's local currency.
                    // Here we use the India price as a reference for the conversion hook.
                    const referenceINR = priceData.currency === 'INR' 
                      ? priceData.value 
                      : (priceData.currency === 'USD' ? priceData.value * 83 : 
                         priceData.currency === 'EUR' ? priceData.value * 90 : 
                         priceData.value * 105);

                    return (
                      <td key={p.id}>
                        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                          {formatPrice(referenceINR, currency)}
                        </span>
                        <br />
                        <span style={{ fontSize: '0.7rem', color: 'var(--secondary)' }}>
                          Original: {priceData.value} {priceData.currency}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose}>Close Comparison</button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
