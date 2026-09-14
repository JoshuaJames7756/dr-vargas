import { Routes, Route, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { clerkPublishableKey } from './lib/clerk.js';
import Inicio from './pages/Inicio.jsx';
import SobreElDoctor from './pages/SobreElDoctor.jsx';
import Ginecologia from './pages/Ginecologia.jsx';
import Oncologia from './pages/Oncologia.jsx';
import AgendarCita from './pages/AgendarCita.jsx';
import Contenido from './pages/Contenido.jsx';
import Contacto from './pages/Contacto.jsx';
import Admin from './pages/Admin.jsx';
import BotonWhatsApp from './components/BotonWhatsApp.jsx';

export default function App() {
  const { pathname } = useLocation();
  // No mostrar el flotante en Admin (ya tiene su propia UI de gestión) ni en Agendar Cita (evita duplicar el CTA)
  const ocultarFlotante = pathname === '/admin' || pathname === '/agendar-cita';

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-el-doctor" element={<SobreElDoctor />} />
        <Route path="/ginecologia" element={<Ginecologia />} />
        <Route path="/oncologia-mastologia" element={<Oncologia />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!ocultarFlotante && <BotonWhatsApp />}
    </ClerkProvider>
  );
}
