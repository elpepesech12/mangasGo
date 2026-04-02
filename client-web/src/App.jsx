import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from './components/LoginLogout'; 

import Listar from './pages/Listar';
import Formulario from './pages/Formulario';
import Menu from './pages/Menu';
import Navbar from './pages/Navbar';
import './App.css';

function App() {
  
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</div>; 
  }

  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}
        </div>

        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/listar" element={<Listar />} />
            <Route path="/formulario" element={<Formulario />} />
          </Routes>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2>Bienvenido a MangasGo</h2>
            <p>Por favor, inicia sesión para acceder al inventario.</p>
          </div>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;