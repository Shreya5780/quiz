import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './app/Home';
import Quiz from './app/Quiz';
import AdminHome from './admin/AdminHome';
import ManageQuiz from './admin/ManageQuiz';
import AddSubject from './admin/PopupWindows/AddEditSubject';
import AddEditQuestion from './admin/PopupWindows/AddEditQuestion';
import Score from './app/Score';
import ScorePage from './app/score/ScorePage';
import ManageUsers from './admin/ManageUsers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/questions/:subjectId' element={<Quiz />} ></Route>
          <Route path='/answers/:subjectId/:scoreId' element={<Score />}></Route> 
{/* scorepage */}
          {/* admin */}
          <Route path='/admin' element={<AdminHome />} ></Route>
          <Route path='/admin/quizzes' element={<ManageQuiz />} ></Route>
          <Route path='/admin/add/question/:subjectId' element={<AddEditQuestion />} ></Route>
          <Route path='/admin/users' element={<ManageUsers />} ></Route>
          <Route path='/admin/score/:subjectId' element={<ScorePage />} ></Route>
          <Route path='/user/score/:userId' element={<ScorePage />} ></Route>
          {/* <Route path='/view/answers/:userId/:scoreId' element={<Score />} ></Route> */}

          <Route path='/admin/add/subject' element={<AddSubject />} ></Route>
          <Route path='/admin/update/question/:subjectId/:qid' element={<AddEditQuestion />} > </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
