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

 



  return (
    <><div>
      <h3> Welcome to MyQuiz, </h3>

      <SubjectDropDownList subjectId={subjectId} onChange={setSubjectId} />


      <button style={{ margin: "5px"}}  id="start" onClick={start}> Start</button>
    </div><div>
        <h3>Admin Panel</h3>
        <button onClick={() => navigate("/admin")}>Go to Admin</button>
      </div></>
  );
}

export default Home;