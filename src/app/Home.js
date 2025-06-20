import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Home(){
    const [subject, setSubject] = useState("general");
    const navigate = useNavigate();

    const start = () => {
        fetch(`http://localhost:8080/quiz/${subject}`, {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json'
            },
                // body: JSON.stringify(loginInfo)
        })
        .then(() => {
            navigate(`/admin/questions/${subject}`)
        }
            
        )

        .catch(error => {
             <h3>Error while loading...</h3>
             console.log(error)
        }
           
        )
        // navigate("/quiz/ml");
    }

   return (
    <div>
      <h3> Welcome to MyQuiz, </h3>

      <p>Please select subject to start with</p>
      
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value={"general"}>General</option>
        <option value={"ai"}>AI</option>
        <option value={"ml"}>ML</option>
        <option value={"dsa"}>DSA</option>
      </select>
     

      <button id="start" onClick={start}> Start</button>
    </div>
  );
}

export default Home;