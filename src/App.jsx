import React, { useState, useRef } from 'react';

// Habitaciones ordenadas de menor a mayor precio
const roomsData = [
  {
    id: 1,
    name: "Habitación Individual Standard",
    type: "Individual",
    description: "Acogedora, ideal para viajeros de negocios y estancias individuales.",
    capacity: 1,
    basePrice: 65,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Habitación Doble Deluxe",
    type: "Doble",
    description: "Vista al campo, cama king size y balcón privado.",
    capacity: 2,
    basePrice: 120,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Cabaña Familiar",
    type: "Familiar",
    description: "Dos habitaciones, cocina integrada y área verde privada.",
    capacity: 5,
    basePrice: 180,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Suite Ejecutiva",
    type: "Suite",
    description: "Espaciosa sala de estar, jacuzzi y desayuno incluido.",
    capacity: 4,
    basePrice: 250,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  }
];

const recreationalAreas = [
  {
    id: 1,
    name: "Salón Restaurant & Bar",
    description: "Disfrute de almuerzos gourmet y cenas exclusivas con vista panorámica y un ambiente elegante.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    name: "Cancha de Pádel",
    description: "Cancha profesional de césped sintético e iluminación nocturna para disfrutar de un buen partido.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    name: "Cancha de Básquet",
    description: "Cancha multideporte de alta calidad ideal para partidos dinámicos y entrenamiento.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    name: "Gran Piscina Exterior",
    description: "Amplia piscina al aire libre rodeada de reposeras, solárium y servicio de bar junto al agua.",
    images: [
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    name: "Zona de Gimnasio",
    description: "Equipamiento de última generación para mantener su rutina de entrenamiento durante la estadía.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default function App() {
  const [checkInDate, setCheckInDate] = useState('2026-10-01');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-05');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  
  const [confirmedBookings, setConfirmedBookings] = useState([
    { id: 101, roomName: "Habitación Doble Deluxe", guestName: "Carlos Gómez", checkIn: "2026-10-01", checkOut: "2026-10-05", nights: 4, total: 480 }
  ]);

  const [activeModal, setActiveModal] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const inicioRef = useRef(null);
  const habitacionesRef = useRef(null);
  const recreacionRef = useRef(null);
  const reservasRef = useRef(null);
  const contactoRef = useRef(null);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const diff = new Date(checkOutDate) - new Date(checkInDate);
    const nights = diff / (1000 * 60 * 60 * 24);
    return nights > 0 ? nights : 1;
  };

  const handleOpenBookingModal = (room) => {
    const nights = getNights();
    const total = room.basePrice * nights;
    setActiveModal({ room, nights, total });
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert("Por favor, ingresa tu nombre completo.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      roomName: activeModal.room.name,
      guestName,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: activeModal.nights,
      total: activeModal.total
    };

    setConfirmedBookings([...confirmedBookings, newBooking]);
    setSuccessMessage(newBooking);
    setActiveModal(null);
    setGuestName('');
  };

  const handleDeleteBooking = (id) => {
    setConfirmedBookings(confirmedBookings.filter(b => b.id !== id));
  };

  const nightsCount = getNights();

  return (
    <div ref={inicioRef} style={{ 
      minHeight: '100vh', 
      backgroundImage: 'linear-gradient(rgba(10, 15, 30, 0.92), rgba(10, 15, 30, 0.92)), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      color: '#1e293b' 
    }}>
      
      {/* Navegación */}
      <nav style={{ 
        backgroundColor: 'rgba(10, 15, 30, 0.95)', 
        backdropFilter: 'blur(8px)', 
        color: 'white', 
        padding: '1rem', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '0.75rem',
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.05em', cursor: 'pointer', textAlign: 'center' }} onClick={() => scrollToSection(inicioRef)}>
          THUNDER COUNTRY CLUB
        </h2>
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', fontWeight: '500', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection(inicioRef)}>Inicio</span>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection(habitacionesRef)}>Habitaciones</span>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection(recreacionRef)}>Recreación</span>
          <span style={{ cursor: 'pointer', color: '#60a5fa' }} onClick={() => scrollToSection(reservasRef)}>Mis Reservas ({confirmedBookings.length})</span>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection(contactoRef)}>Contacto</span>
        </div>
      </nav>

      {/* Banner Principal */}
      <header style={{ 
        backgroundImage: 'linear-gradient(rgba(10, 15, 30, 0.5), rgba(10, 15, 30, 0.7)), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: 'white', 
        textAlign: 'center', 
        padding: '6rem 1rem', 
        marginBottom: '2.5rem',
        boxShadow: 'inset 0 -20px 20px -20px rgba(10, 15, 30, 0.9)'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: '800', letterSpacing: '-0.025em', textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>Thunder Country Club</h1>
        <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: '300', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>Elegancia y Confort para tu Estadía</p>
      </header>

      {/* Barra de Búsqueda Global */}
      <div style={{ maxWidth: '1200px', margin: '-4.5rem auto 2.5rem auto', padding: '0 1rem', position: 'relative', zIndex: 900 }}>
        <div style={{ 
          backgroundColor: '#F0F4F8', 
          borderRadius: '12px', 
          padding: '1.5rem', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1rem', 
          boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
          border: '1px solid #d2d6dc'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Fecha de Entrada</label>
            <input 
              type="date" 
              value={checkInDate} 
              onChange={(e) => setCheckInDate(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: 'white' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Fecha de Salida</label>
            <input 
              type="date" 
              value={checkOutDate}
              min={checkInDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: 'white' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Huéspedes</label>
            <input 
              type="number" 
              min="1" 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: 'white' }} 
            />
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 3rem 1rem' }}>
        
        {/* Sección Habitaciones */}
        <div ref={habitacionesRef} style={{ marginBottom: '3.5rem', scrollMarginTop: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', margin: 0 }}>Nuestras Habitaciones</h2>
            <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '600' }}>Calculado para {nightsCount} {nightsCount === 1 ? 'noche' : 'noches'}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            {roomsData.map(room => {
              const totalPrice = room.basePrice * nightsCount;

              return (
                <div key={room.id} style={{
                  backgroundColor: '#F0F4F8',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px -3px rgba(0, 0, 0, 0.3)',
                  border: '1px solid #d2d6dc',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img src={room.image} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ 
                      position: 'absolute', top: '12px', right: '12px', 
                      backgroundColor: 'rgba(15, 23, 42, 0.85)', color: 'white', 
                      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
                    }}>
                      {room.type}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.25rem', fontWeight: '700' }}>{room.name}</h3>
                      <p style={{ margin: '0 0 0.75rem 0', color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>{room.description}</p>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Capacidad máxima: <strong style={{ color: '#0f172a' }}>{room.capacity} personas</strong></p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #d2d6dc' }}>
                      <div>
                        <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>${totalPrice}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}> total ({nightsCount} {nightsCount === 1 ? 'noche' : 'noches'})</span>
                      </div>
                      
                      <button 
                        onClick={() => handleOpenBookingModal(room)}
                        style={{ 
                          backgroundColor: '#2563eb', color: 'white', border: 'none', 
                          padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem',
                          boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
                        }}
                      >
                        Reservar Ahora
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sección Mis Reservas */}
        <div ref={reservasRef} style={{ marginBottom: '3.5rem', scrollMarginTop: '6rem' }}>
          <div style={{ marginBottom: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', margin: 0 }}>Mis Reservas Confirmadas</h2>
            <p style={{ color: '#cbd5e1', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>Consulta el estado de tus reservas actuales en el club</p>
          </div>

          {confirmedBookings.length === 0 ? (
            <div style={{ backgroundColor: '#F0F4F8', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: '#475569' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>No tienes ninguna reserva activa en este momento.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {confirmedBookings.map(res => (
                <div key={res.id} style={{ 
                  backgroundColor: '#F0F4F8', 
                  borderRadius: '12px', 
                  padding: '1.25rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  border: '1px solid #d2d6dc',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1.05rem', fontWeight: '700' }}>{res.roomName}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>Huésped principal: <strong style={{ color: '#0f172a' }}>{res.guestName}</strong></p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Del {res.checkIn} al {res.checkOut} ({res.nights} {res.nights === 1 ? 'noche' : 'noches'})</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#2563eb' }}>${res.total}</span>
                    <button 
                      onClick={() => handleDeleteBooking(res.id)}
                      style={{ 
                        backgroundColor: '#dc2626', color: 'white', border: 'none', 
                        padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem'
                      }}
                    >
                      Cancelar Reserva
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección Recreación */}
        <div ref={recreacionRef} style={{ scrollMarginTop: '6rem' }}>
          <div style={{ marginBottom: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', margin: 0 }}>Áreas Recreativas y Servicios</h2>
            <p style={{ color: '#cbd5e1', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>Espacios diseñados para su entretenimiento y bienestar</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {recreationalAreas.map((area) => (
              <div key={area.id} style={{ 
                backgroundColor: '#F0F4F8', 
                borderRadius: '12px', 
                padding: '1.25rem', 
                border: '1px solid #d2d6dc', 
                boxShadow: '0 8px 16px rgba(0,0,0,0.25)' 
              }}>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>{area.name}</h3>
                <p style={{ color: '#475569', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{area.description}</p>
                
                {area.image ? (
                  <div style={{ height: '240px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}>
                    <img src={area.image} alt={area.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {area.images.map((imgUrl, index) => (
                      <div key={index} style={{ height: '200px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}>
                        <img src={imgUrl} alt={`${area.name} ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Modal para completar nombre */}
      {activeModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#F0F4F8', border: '1px solid #d2d6dc', padding: '1.75rem', borderRadius: '12px', maxWidth: '400px', width: '100%', boxShadow: '0 25px 35px -5px rgba(0,0,0,0.5)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.25rem' }}>Completar tu Reserva</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Estás reservando: <strong style={{ color: '#0f172a' }}>{activeModal.room.name}</strong></p>
            
            <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Nombre del Huésped Principal</label>
                <input 
                  type="text" 
                  placeholder="Ej: Ana Pérez"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: 'white' }}
                  required
                />
              </div>

              <div style={{ fontSize: '0.85rem', color: '#475569', backgroundColor: '#e2e8f0', padding: '0.75rem', borderRadius: '6px' }}>
                <div>Fechas: {checkInDate} al {checkOutDate}</div>
                <div>Duración: {activeModal.nights} {activeModal.nights === 1 ? 'noche' : 'noches'}</div>
                <div style={{ marginTop: '0.25rem', fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>Total a pagar: ${activeModal.total}</div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{ flex: 1, backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Volver
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {successMessage && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#F0F4F8', border: '1px solid #d2d6dc', padding: '1.75rem', borderRadius: '12px', maxWidth: '400px', width: '100%', boxShadow: '0 25px 35px -5px rgba(0,0,0,0.5)', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#16a34a', fontSize: '1.25rem' }}>¡Reserva Exitosa!</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Te esperamos, <strong style={{ color: '#0f172a' }}>{successMessage.guestName}</strong>. Tu reserva para la {successMessage.roomName} ha sido guardada correctamente.</p>
            <button 
              onClick={() => {
                setSuccessMessage(null);
                scrollToSection(reservasRef);
              }}
              style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Ver en "Mis Reservas"
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer ref={contactoRef} style={{ backgroundColor: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(8px)', color: '#94a3b8', padding: '2.5rem 1rem 1.5rem 1rem', fontSize: '0.85rem', scrollMarginTop: '6rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '0.5rem' }}>Thunder Country Club</h3>
            <p style={{ margin: 0, lineHeight: '1.5' }}>Disfrute de una experiencia única de confort, elegancia y tranquilidad.</p>
          </div>
          <div>
            <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '0.5rem' }}>Contacto</h3>
            <p style={{ margin: '0 0 0.25rem 0' }}>Teléfono: +595 975 147 804</p>
            <p style={{ margin: '0 0 0.25rem 0' }}>Email: contacto@thundercountryclub.com</p>
            <p style={{ margin: 0 }}>Ubicación: Asunción, Paraguay</p>
          </div>
        </div>
        <p style={{ margin: 0, textAlign: 'center', fontSize: '0.8rem' }}>&copy; 2026 Thunder Country Club. Todos los derechos reservados.</p>
      </footer>

      {/* Estilos Responsivos */}
      <style>{`
        @media (min-width: 640px) {
          nav {
            flex-direction: row !important;
            justify-content: space-between !important;
            padding: 1rem 2rem !important;
          }
          nav h2 {
            font-size: 1.25rem !important;
          }
          main {
            padding: 0 1.5rem 4rem 1.5rem !important;
          }
        }
        @media (min-width: 768px) {
          main div[style*="grid-template-columns: 1fr"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

    </div>
  );
}