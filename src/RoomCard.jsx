<div style={{
  backgroundColor: 'white',
  borderRadius: '16px', // Bordes más redondeados y elegantes
  overflow: 'hidden',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
  border: '1px solid #e2e8f0',
  transition: 'transform 0.2s ease',
}}>
  {/* Imagen de la habitación */}
  <img 
    src={room.image} 
    alt={room.name} 
    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
  />
  
  {/* Contenido de la tarjeta */}
  <div style={{ padding: '1.25rem' }}>
    <h3 style={{ margin: '0 0 0.4rem 0', color: '#1a202c', fontSize: '1.2rem' }}>{room.name}</h3>
    <p style={{ margin: '0 0 0.8rem 0', color: '#718096', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{room.type}</p>
    <p style={{ margin: '0 0 1rem 0', color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.4' }}>{room.description}</p>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #edf2f7' }}>
      <span style={{ color: '#2b6cb0', fontWeight: 'bold', fontSize: '1.1rem' }}>${room.price} <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 'normal' }}>/ noche</span></span>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onOpenDetails(room)}
          style={{ backgroundColor: '#edf2f7', color: '#2d3748', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
        >
          Detalles
        </button>
        <button 
          onClick={() => onSelectRoom(room)}
          style={{ backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
        >
          Reservar
        </button>
      </div>
    </div>
  </div>
</div>