import React, { useState } from 'react'
import { RoomCard } from './RoomCard'
import './App.css'

function App() {
  const [rooms] = useState([
    { id: 1, name: 'Habitación Doble Deluxe', type: 'Doble', price: 120, capacity: 2, description: 'Vista al mar, cama king size y balcón privado.' },
    { id: 2, name: 'Suite Ejecutiva', type: 'Suite', price: 250, capacity: 4, description: 'Espaciosa sala de estar, jacuzzi y desayuno incluido.' },
    { id: 3, name: 'Habitación Individual Standard', type: 'Individual', price: 65, capacity: 1, description: 'Acogedora, ideal para viajeros de negocios.' },
    { id: 4, name: 'Cabaña Familiar', type: 'Familiar', price: 180, capacity: 5, description: 'Dos habitaciones, cocina integrada y área verde privada.' },
  ])

  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [clientName, setClientName] = useState('')
  const [reservations, setReservations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleReserve = (room) => {
    setSelectedRoom(room)
  }

  const filteredRooms = rooms.filter(room => {
    const matchesCategory = selectedCategory === 'Todas' || room.type === selectedCategory;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          room.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  })

  return (
    <div className="hotel-app" style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Hotel Paraíso - Reservas</h1>
        <p>Encuentra el espacio ideal para tu próxima estadía</p>
      </header>

      {/* Botones de Categoría */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['Todas', 'Doble', 'Suite', 'Individual', 'Familiar'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === category ? '#3182ce' : '#e2e8f0',
              color: selectedCategory === category ? 'white' : '#4a5568',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Barra de Búsqueda por Texto */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <input 
          type="text"
          placeholder="Buscar habitación por nombre o descripción..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '0.7rem 1.2rem', 
            width: '100%', 
            maxWidth: '450px', 
            borderRadius: '20px', 
            border: '1px solid #cbd5e0', 
            outline: 'none',
            fontSize: '0.95rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        />
      </div>

      <section>
        <h2>Habitaciones Disponibles ({filteredRooms.length})</h2>
        
        {filteredRooms.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onReserve={handleReserve} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '1rem' }}>
            <p style={{ color: '#718096', fontSize: '1.1rem', marginBottom: '1rem' }}>No se encontraron habitaciones que coincidan con tu búsqueda.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}
              style={{ padding: '0.6rem 1.2rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Mostrar todas las habitaciones
            </button>
          </div>
        )}
      </section>
      {/* Formulario de reserva */}
      {selectedRoom && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #cbd5e0' }}>
          <h3>Completar Reserva para: {selectedRoom.name}</h3>
          <p>Precio por noche: ${selectedRoom.price}</p>
          <form onSubmit={(e) => {
            e.preventDefault()
            const newReservation = {
              id: Date.now(),
              roomName: selectedRoom.name,
              client: clientName,
              price: selectedRoom.price
            }
            setReservations([...reservations, newReservation])
            alert(`¡Reserva exitosa para ${clientName} en la ${selectedRoom.name}!`)
            setSelectedRoom(null)
            setClientName('')
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tu Nombre:</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                required
                style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#48bb78', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Confirmar Reserva
            </button>
          </form>
        </div>
      )}

      {/* Historial de Reservas */}
      {reservations.length > 0 && (
        <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #cbd5e0' }}>
          <h3>Mis Reservas Confirmadas ({reservations.length})</h3>
          <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
            {reservations.map((res) => (
              <li key={res.id} style={{ padding: '0.8rem', marginBottom: '0.5rem', backgroundColor: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>{res.roomName}</strong> — Cliente: {res.client}</span>
                <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>${res.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App