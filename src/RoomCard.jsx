export function RoomCard({ room, onReserve, onViewDetails }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>{room.name}</h3>
        <p style={{ margin: '0 0 0.5rem 0', fontStyle: 'italic', color: '#718096', fontSize: '0.9rem' }}>{room.type}</p>
        <p style={{ color: '#4a5568', fontSize: '0.95rem', marginBottom: '1rem' }}>{room.description}</p>
        <p style={{ margin: '0 0 0.5rem 0', color: '#4a5568', fontWeight: '500' }}>Capacidad: {room.capacity} personas</p>
        <p style={{ margin: '0 0 1.5rem 0', color: '#2b6cb0', fontWeight: 'bold', fontSize: '1.1rem' }}>${room.price} / noche</p>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onViewDetails(room)}
          style={{ flex: 1, backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e0', padding: '0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Detalles
        </button>
        <button 
          onClick={() => onReserve(room)}
          style={{ flex: 1, backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Reservar
        </button>
      </div>
    </div>
  )
}