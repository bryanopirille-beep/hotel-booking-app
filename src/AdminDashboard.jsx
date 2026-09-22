import React, { useState } from 'react';

export default function AdminDashboard({ bookings, setBookings, rooms }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar reservas por nombre de huésped o habitación
  const filteredBookings = bookings.filter(b => 
    b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.roomName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular métricas clave (KPIs)
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.total, 0);
  const totalReservations = bookings.length;
  const averageNights = totalReservations > 0 
    ? (bookings.reduce((acc, curr) => acc + curr.nights, 0) / totalReservations).toFixed(1) 
    : 0;

  // Función para eliminar/cancelar reserva desde el panel de control
  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', color: '#1e293b' }}>
      
      {/* Encabezado del Panel */}
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #cbd5e1', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
          Panel de Administración - Thunder Country Club
        </h2>
        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
          Control operativo, métricas de ocupación y gestión de reservas en tiempo real.
        </p>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.25rem', 
        marginBottom: '2.5rem' 
      }}>
        <div style={{ backgroundColor: '#F0F4F8', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #d2d6dc' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>Ingresos Totales Estimados</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2563eb', margin: '0.5rem 0 0 0' }}>${totalRevenue}</h3>
        </div>

        <div style={{ backgroundColor: '#F0F4F8', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #d2d6dc' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>Reservas Activas</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '0.5rem 0 0 0' }}>{totalReservations}</h3>
        </div>

        <div style={{ backgroundColor: '#F0F4F8', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #d2d6dc' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>Promedio de Estadías</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '0.5rem 0 0 0' }}>{averageNights} noches</h3>
        </div>
      </div>

      {/* Sección de Gestión y Búsqueda de Reservas */}
      <div style={{ backgroundColor: '#F0F4F8', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem', border: '1px solid #d2d6dc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Listado de Reservas Registradas</h3>
          <input 
            type="text"
            placeholder="Buscar por huésped o habitación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', width: '280px', fontSize: '0.9rem', backgroundColor: 'white' }}
          />
        </div>

        {filteredBookings.length === 0 ? (
          <p style={{ color: '#475569', textAlign: 'center', padding: '1.5rem', margin: 0 }}>No se encontraron reservas con ese criterio.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', color: '#475569' }}>
                  <th style={{ padding: '0.75rem' }}>Huésped</th>
                  <th style={{ padding: '0.75rem' }}>Habitación</th>
                  <th style={{ padding: '0.75rem' }}>Entrada</th>
                  <th style={{ padding: '0.75rem' }}>Salida</th>
                  <th style={{ padding: '0.75rem' }}>Total</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#0f172a' }}>{b.guestName}</td>
                    <td style={{ padding: '0.75rem', color: '#334155' }}>{b.roomName}</td>
                    <td style={{ padding: '0.75rem', color: '#475569' }}>{b.checkIn}</td>
                    <td style={{ padding: '0.75rem', color: '#475569' }}>{b.checkOut}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '700', color: '#2563eb' }}>${b.total}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDeleteBooking(b.id)}
                        style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}