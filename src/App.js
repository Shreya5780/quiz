import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './app/Home';
import Quiz from './app/Quiz';
import Result from './app/Result';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/admin/questions/:subject' element={<Quiz/>} ></Route>
        <Route path='/question/:subject' element={<Result/>}></Route>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
