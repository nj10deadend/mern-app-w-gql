import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';

import Home from './Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Registration from './components/Registration';
import UserPosts from './components/UserPosts';
import { AuthProvider } from './context/Auth';


function App() {
  return (
    <AuthProvider>
        <div className="App">
        <BrowserRouter>
        <NavBar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/my-posts" element={<UserPosts />} />
          </Routes>

        </BrowserRouter>
        </div>
    </AuthProvider>


  );
}

export default App;
