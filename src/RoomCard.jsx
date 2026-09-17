import React from 'react'

export function RoomCard({ room, onReserve }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3>{room.name}</h3>
      <p style={{ color: '#666', fontStyle: 'italic' }}>{room.type}</p>
      <p>{room.description}</p>
      <p style={{ fontSize: '0.95rem' }}><strong>Capacidad:</strong> {room.capacity} personas</p>
      <p style={{ fontSize: '1.2rem', color: '#2b6cb0', fontWeight: 'bold' }}>
        ${room.price} / noche
      </p>
      <button 
        onClick={() => onReserve(room)}
        style={{ 
          backgroundColor: '#3182ce', 
          color: 'white', 
          border: 'none', 
          padding: '0.6rem 1.2rem', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%',
          marginTop: '0.5rem'
        }}
      >
        Reservar Ahora
      </button>
    </div>
  )
}