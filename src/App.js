import Login from './components/Registration/Login';
import Signup from './components/Registration/Signup';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <div className="">

      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
