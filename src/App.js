import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './app/Home';
import Quiz from './app/Quiz';
import Result from './app/Result';
import AdminHome from './admin/AdminHome';
import AdminQuiz from './admin/AdminQuiz';
import AddSubject from './admin/PopupWindows/AddEditSubject';
import AddEditQuestion from './admin/PopupWindows/AddEditQuestion';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/questions/:subjectId' element={<Quiz/>} ></Route>
        <Route path='/answers/:subject' element={<Result/>}></Route>

        {/* admin */}
        <Route path='/admin' element={<AdminHome/>} ></Route>
        <Route path='/admin/quizzes' element={<AdminQuiz/>} ></Route>
        {/* <Route path='/admin/questions' element={<AdminQuestion/>} ></Route> */}
        <Route path='/admin/add/question/:subjectId' element={<AddEditQuestion/>} ></Route>
        <Route path='/admin/users' element={<AdminHome/>} ></Route>

        <Route path='/admin/add/subject' element={<AddSubject/>} ></Route>
        <Route path='/admin/update/:subjectName/:subjectId' element={<AddSubject/>} ></Route>
        <Route path='/admin/delete/:subject' element={<AdminQuiz/>} ></Route>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
