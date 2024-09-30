import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Vitpilen from './components/Vitpilen';
import Svartpilen from './components/Svartpilen';
import Booking from './components/Booking';
import Dealers from './components/Dealers';
import Models from './components/Models';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route element={<Home/>} path='/' />
            <Route element={<Vitpilen/>} path='/models/vitpilen' />
            <Route element={<Svartpilen/>} path='/models/svartpilen' />
            <Route element={<Booking/>} path='/models/:bikeType/booking' />
            <Route element={<Dealers/>} path='/dealers' />
            <Route element={<Models/>} path='/models' />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
