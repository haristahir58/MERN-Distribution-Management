import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import AddProducts from './Components/AddProducts';
import AddDistributors from './Components/AddDistributors';
import DistributorsAssign from './Components/DistributorsAssign';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<AddProducts />} />
          <Route exact path="/distributors" element={<AddDistributors />} />
          <Route exact path="/distributors/assign" element={<DistributorsAssign/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
