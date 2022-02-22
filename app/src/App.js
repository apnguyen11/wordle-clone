import {Game} from './Game'
import {Login} from './Login';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
 
      <div className="Container">
        <Routes>
          <Route path="/" element={<Login />}/> 
          {/* How come this Route doesn't need the "exact" prop? */}
          <Route path="/game" element={<Game />}/>
        </Routes>  
      </div>

  );
}

export default App;
