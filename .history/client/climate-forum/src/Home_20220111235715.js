import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';

import Login from './components/Login';
import NavBar from './components/NavBar';
import Registration from './components/Registration';

function Home () {
    return (
        <div className="App">
            <NavBar />
            <h1>Welcome to Climate-forum</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default Home;