import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listar from './pages/Listar';
import Formulario from './pages/Formulario';
import Menu from './pages/Menu';
import Navbar from './pages/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* se muestra en todas las páginas */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/listar" element={<Listar />} />
          <Route path="/formulario" element={<Formulario />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;