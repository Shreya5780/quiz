import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllSubject } from "../middleware/GetAllSubject";

function Home(){
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

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getAllSubject()
        .then(data => {
          console.log("Fetched subjects:", data);
          if (!Array.isArray(data)) {
            throw new Error("Expected an array of subjects");
          }
          setSubjects(data);
          setSubjectId(data[0]?.id || "");
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching subjects:", error);
          setLoading(false);
        });
     
    }, []);

    const addQuestion = () => {
      if (!subjectId) {
        alert("Please select a subject to add a question.");
        return;
      }
      navigate(`/admin/add/question/${subjectId}`);
    };

   return (
    <><div>
       <h3> Welcome to MyQuiz, </h3>

       <p>Please select subject to start with</p>

       <p>Available Subjects:</p>
       {loading ? <p>Loading...</p> : (
         <ul>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            {subjects.map((sub, index) => (
              <option key={index} value={sub.id}>
                {sub.subjectName}
              </option>
            ))}
          </select>
          
         </ul>
       )}


       <button id="start" onClick={start}> Start</button>
       <button id="addquestion" onClick={addQuestion}> Add Question</button>
     </div><div>
         <h3>Admin Panel</h3>
         <button onClick={() => navigate("/admin")}>Go to Admin</button>
       </div></>
  );
}

export default Home;