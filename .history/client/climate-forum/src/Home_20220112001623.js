import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';

import Login from './components/Login';
import Registration from './components/Registration';



function Home () {
    return (
        <div className="App">
            <h1>Welcome to Climate-forum</h1>

        </div>
    )
}

export default Home;