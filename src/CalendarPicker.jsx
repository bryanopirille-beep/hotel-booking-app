import React, { useState, useRef, useEffect } from 'react';

export function CalendarPicker({ onSelectDate, label, selectedDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const dropdownRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;
    
    onSelectDate(dateString);
    setIsOpen(false); // Cierra el calendario al seleccionar
  };

  // Cerrar el calendario si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
      <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4a5568' }}>
        {label}
      </label>

      {/* Botón que simula el input y despliega el calendario */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.6rem 1rem',
          textAlign: 'left',
          backgroundColor: 'white',
          border: '1px solid #cbd5e0',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.95rem',
          color: selectedDate ? '#2d3748' : '#a0aec0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}
      >
        <span>{selectedDate ? selectedDate : 'Seleccionar fecha...'}</span>
        <span style={{ fontSize: '0.8rem', color: '#718096' }}>📅</span>
      </button>

      {/* Panel del Calendario Desplegable con Animación Suave */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          zIndex: 100,
          width: '300px',
          backgroundColor: 'white',
          border: '1px solid #cbd5e0',
          borderRadius: '10px',
          padding: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          {/* Cabecera del Mes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button type="button" onClick={prevMonth} style={{ background: 'none', border: '1px solid #cbd5e0', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontWeight: 'bold' }}>&lt;</button>
            <span style={{ fontWeight: 'bold', color: '#2d3748' }}>{monthNames[month]} {year}</span>
            <button type="button" onClick={nextMonth} style={{ background: 'none', border: '1px solid #cbd5e0', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontWeight: 'bold' }}>&gt;</button>
          </div>

          {/* Días de la semana */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#718096', marginBottom: '0.5rem' }}>
            <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span>
          </div>

          {/* Cuadrícula de días */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
            {daysArray.map((day, index) => {
              if (day === null) return <div key={index} />;
              
              const formattedMonth = String(month + 1).padStart(2, '0');
              const formattedDay = String(day).padStart(2, '0');
              const dateString = `${year}-${formattedMonth}-${formattedDay}`;
              const isSelected = selectedDate === dateString;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  style={{
                    padding: '0.4rem 0',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? '#3182ce' : '#f7fafc',
                    color: isSelected ? 'white' : '#2d3748',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    transition: 'background-color 0.15s'
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}