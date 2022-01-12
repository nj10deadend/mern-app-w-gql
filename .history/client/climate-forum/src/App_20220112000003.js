import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';

import Home from './Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Registration from './components/Registration';


function App() {
  return (
    <div className="App">
        {/* <NavBar /> */}
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
          </Routes>

        </BrowserRouter>
    </div>

  );
}

export default App;
