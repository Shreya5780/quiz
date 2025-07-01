import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllSubject } from "../middleware/GetAllSubject";
import { getscoreBySub } from "./score/GetScore";
import SubjectDropDownList from "../middleware/SubjectDropDownList";

function Home() {
  const [subjectId, setSubjectId] = useState("");
  const navigate = useNavigate();

  const start = () => {
    console.log("Selected subject:", subjectId);
    if (!subjectId) {
      alert("Please select a subject to start the quiz.");
      return;
    }
    navigate(`/questions/${subjectId}`);

  }

  const addQuestion = () => {
    if (!subjectId) {
      alert("Please select a subject to add a question.");
      return;
    }
    navigate(`/admin/add/question/${subjectId}`);
  };



    const handleSubScore = () => {
        console.log("Fetching score by subject...");
        getscoreBySub(subjectId)
            .then(data => {
                console.log("Score data:", data);
                // setGetScore(data);
                navigate(`/admin/score/${subjectId}`, { state: { data } });
                // Handle the score data as needed
            })
            .catch(error => {
                console.error("Error fetching score by subject:", error);
            });

    };

  return (
    <><div>
      <h3> Welcome to MyQuiz, </h3>

      <SubjectDropDownList subjectId={subjectId} onChange={setSubjectId} />


      <button style={{ margin: "5px"}}  id="start" onClick={start}> Start</button>
      <button style={{ margin: "5px"}} id="addquestion" onClick={addQuestion}> Add Question</button>
      <button style={{ margin: "5px"}} id="viewscore" onClick={handleSubScore}> View Score</button>
    </div><div>
        <h3>Admin Panel</h3>
        <button onClick={() => navigate("/admin")}>Go to Admin</button>
      </div></>
  );
}

export default Home;