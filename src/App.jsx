import { useState } from "react"
import './App.css'

function App () {
  // datos de habitaciones de hotel
  const [rooms] = useState([
    { id: 1, name: 'Habitación Doble Deluxe', type: 'Doble', price: 120, capacity: 2, description: 'Vista al mar, cama king size y balcón privado.' },
    { id: 2, name:  'Suite Ejecutiva', type: 'Suite', price: 250, capacity: 4, description: 'Espaciosa sala de estar, jacuzzi y desayuno incluido.' },
   { id: 3, name: 'Habitación Individual Standard', type: 'Individual', price: 65, capacity: 1, description: 'Acogedora, ideal para viajeros de negocios.' },
    { id: 4, name: 'Cabaña Familiar', type: 'Familiar', price: 180, capacity: 5, description: 'Dos habitaciones, cocina integrada y área verde privada.' }
  ]);

  return (
    <div className="hotel-app" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Hotel Paraíso - Reservas</h1>
        <p>Encuentra el espacio ideal para tu próxima estadía</p>
      </header>

      <main>
        <section>
          <h2>Habitaciones Disponibles ({rooms.length})</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {rooms.map((room) => (
              <div key={room.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>{room.name}</h3>
                <p style={{ color: '#666', fontStyle: 'italic' }}>{room.type}</p>
                <p>{room.description}</p>
                <p><strong>Capacidad:</strong> {room.capacity} personas</p>
                <p style={{ fontSize: '1.2rem', color: '#2b6cb0', fontWeight: 'bold' }}>${room.price} / noche</p>
                <button 
                  style={{ backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '1rem' }}
                  onClick={() => alert(`Reservando: ${room.name}`)}
                >
                  Reservar Ahora
                </button>
              </div>
            ))}
          </div>
        </section>
     </main>
    </div>
  )
}
export default App