/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [service, setService] = useState('Corte hombres');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const WHATSAPP_NUMBER = '5491125187933';

  // Generate time slots from 12:00 to 00:00 in 30min intervals
  const timeSlots = [];
  for (let hour = 12; hour <= 23; hour++) {
    timeSlots.push(`${hour}:00`);
    timeSlots.push(`${hour}:30`);
  }
  timeSlots.push('00:00');

  const handleWhatsAppBooking = () => {
    if (!date || !time || time === 'Seleccionar Hora') {
      alert('Por favor selecciona una fecha y horario para tu turno.');
      return;
    }

    const message = `Hola JL Barber, quisiera pedir un turno para "${service}" para el día ${date} a las ${time}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="flex justify-center items-center w-full px-margin-mobile py-8">
          <h1 className="text-2xl font-serif tracking-[0.3em] text-primary uppercase">
            JL BARBER
          </h1>
        </div>
      </header>

      <main className="flex-grow max-w-[800px] mx-auto px-margin-mobile w-full space-y-stack-lg pb-stack-lg">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-stack-lg text-center space-y-stack-sm"
        >
          <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl mb-8">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
              alt="Professional Barber Service"
              className="w-full h-full object-cover grayscale brightness-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight tracking-tight">
            Precisión y Estilo
          </h2>
          <p className="font-sans text-lg text-on-surface-variant italic max-w-xl mx-auto">
            Una experiencia de cuidado personal donde cada detalle cuenta. Quiet Luxury para el hombre moderno.
          </p>
        </motion.section>

        {/* Booking Form Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface-container-lowest p-8 md:p-12 rounded-xl border border-outline-variant/20 shadow-sm"
        >
          <form className="space-y-gutter px-4 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Service Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-outline ml-6">
                  Servicio
                </label>
                <div className="relative">
                  <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-full border-none px-8 font-sans focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer outline-none"
                  >
                    <option value="Corte hombres">Corte hombres</option>
                    <option value="Corte mujeres">Corte mujeres</option>
                    <option value="Perfilado de barba">Perfilado de barba</option>
                    <option value="Corte de pelo + barba">Corte de pelo + barba</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-4 text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-outline ml-6">
                  Fecha
                </label>
                <div className="relative">
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-full border-none px-8 font-sans focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer outline-none" 
                  />
                  <span className="material-symbols-outlined absolute right-6 top-4 text-outline pointer-events-none">
                    calendar_today
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Time Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-outline ml-6">
                  Horario
                </label>
                <div className="relative">
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-full border-none px-8 font-sans focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer outline-none"
                  >
                    <option value="">Seleccionar Hora</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-4 text-outline pointer-events-none">
                    schedule
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-stack-sm flex justify-center">
              <button 
                onClick={handleWhatsAppBooking}
                className="group flex items-center justify-center space-x-4 w-full md:w-auto md:px-16 h-16 bg-secondary text-on-secondary rounded-full font-sans text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 shadow-xl shadow-secondary/20 cursor-pointer" 
                type="button"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span>PEDIR TURNO POR WHATSAPP</span>
              </button>
            </div>
          </form>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant/30 py-12">
        <div className="max-w-4xl mx-auto px-margin-mobile text-center space-y-6">
          <div className="font-serif uppercase tracking-[0.3em] text-primary">
            JL BARBER
          </div>
          <p className="font-serif text-sm tracking-wide text-on-surface-variant">
            © {new Date().getFullYear()} JL BARBER. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
