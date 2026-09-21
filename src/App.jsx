import React, { useState, useEffect } from 'react'
import { RoomCard } from './RoomCard'
import { RoomModal } from './RoomModal'
import { CalendarPicker } from './CalendarPicker'
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
  const [detailsRoom, setDetailsRoom] = useState(null)
  
  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem('hotel_reservations')
    return savedReservations ? JSON.parse(savedReservations) : []
  })

  useEffect(() => {
    localStorage.setItem('hotel_reservations', JSON.stringify(reservations))
  }, [reservations])

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
              <RoomCard 
                key={room.id} 
                room={room} 
                onReserve={handleReserve} 
                onViewDetails={setDetailsRoom} 
              />
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

    {/* Formulario de reserva con calendarios desplegables */}
      {selectedRoom && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #cbd5e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#2d3748' }}>Completar Reserva para: {selectedRoom.name}</h3>
          <p style={{ color: '#4a5568' }}>Precio por noche: <strong>${selectedRoom.price}</strong></p>

          <form onSubmit={(e) => {
            e.preventDefault()
            
            if (!window.checkInDate || !window.checkOutDate) {
              alert('Por favor selecciona las fechas de llegada y salida.');
              return;
            }

            const checkIn = new Date(window.checkInDate);
            const checkOut = new Date(window.checkOutDate);
            
            if (checkOut <= checkIn) {
              alert('La fecha de salida debe ser posterior a la fecha de llegada.');
              return;
            }

            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const totalPrice = diffDays * selectedRoom.price;

            const newReservation = {
              id: Date.now(),
              roomName: selectedRoom.name,
              client: clientName,
              checkIn: window.checkInDate,
              checkOut: window.checkOutDate,
              days: diffDays,
              price: totalPrice
            }

            setReservations([...reservations, newReservation])
            alert(`¡Reserva exitosa para ${clientName}!\nEstadía: ${diffDays} noches\nTotal: $${totalPrice}`)
            setSelectedRoom(null)
            setClientName('')
            window.checkInDate = null;
            window.checkOutDate = null;
          }}>
            
            {/* Calendarios Desplegables */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <CalendarPicker 
                  label="Fecha de Llegada" 
                  selectedDate={window.checkInDate}
                  onSelectDate={(date) => {
                    window.checkInDate = date;
                  }} 
                />
              </div>

              <div style={{ flex: 1, minWidth: '220px' }}>
                <CalendarPicker 
                  label="Fecha de Salida" 
                  selectedDate={window.checkOutDate}
                  onSelectDate={(date) => {
                    window.checkOutDate = date;
                  }} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4a5568' }}>Tu Nombre:</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                required
                placeholder="Ej. Juan Pérez"
                style={{ padding: '0.6rem', width: '100%', maxWidth: '350px', borderRadius: '6px', border: '1px solid #cbd5e0' }}
              />
            </div>

            <button type="submit" style={{ backgroundColor: '#48bb78', color: 'white', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>${res.price}</span>
                  <button 
                    onClick={() => {
                      const updatedReservations = reservations.filter(item => item.id !== res.id);
                      setReservations(updatedReservations);
                    }}
                    style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal de Detalles */}
      {detailsRoom && (
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
                  handleReserve(detailsRoom);
                  setDetailsRoom(null);
                }}
                style={{ flex: 1, backgroundColor: '#48bb78', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Reservar Ahora
              </button>
              <button 
                onClick={() => setDetailsRoom(null)}
                style={{ flex: 1, backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '0.7rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App