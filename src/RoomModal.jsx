import React from 'react';

export function RoomModal({ detailsRoom, onClose, onReserve }) {
  if (!detailsRoom) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '500px', width: '90%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#2d3748' }}>{detailsRoom.name}</h2>
        <p style={{ color: '#718096', fontStyle: 'italic' }}>Categoría: {detailsRoom.type}</p>
        <p style={{ color: '#4a5568', margin: '1rem 0' }}>{detailsRoom.description}</p>
        <p style={{ color: '#2b6cb0', fontWeight: 'bold' }}>Capacidad: {detailsRoom.capacity} personas</p>
        <p style={{ color: '#2b6cb0', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Precio: ${detailsRoom.price} / noche</p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => {
              onReserve(detailsRoom);
              onClose();
            }}
            style={{ flex: 1, backgroundColor: '#48bb78', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reservar Ahora
          </button>
          <button 
            onClick={onClose}
            style={{ flex: 1, backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '0.7rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}