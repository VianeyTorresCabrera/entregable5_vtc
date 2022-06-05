import { HashRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import UserInput from './components/UserInput';
import ProtectedRoutes from './components/ProtectedRoutes';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

function App() {

  return (
    <HashRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<UserInput />} />          
          <Route element={<ProtectedRoutes />}>          
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonDetails />}  />            
          </Route>         
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
