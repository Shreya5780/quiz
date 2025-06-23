import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Result() {

    const { subject } = useParams();

    const [result, setResult] = useState([]);

    const location = useLocation();
    const answers  = Object.values(location.state.selectedOption);
    // console.log(answers)
    //this ans is in obj state so need to convert into array


    const query = answers.length>0 ? answers.map(a => `answer=${encodeURIComponent(a)}`).join('&') : `answer=`;

    console.log("query", query)
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/question/${subject}?${query}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: 
        })

            .then((response) => response.json())
            .then(data => {
                setResult(data[0]);
                // console.log("result, ", data[0])
            })
            .catch((error) => {
                console.log(error)
            })
    }, [subject]);

    if (!result || !result.questions || !result.answers) {
        <h3>Loading....</h3>
    } 
    // else {
    //     console.log(result)
    // }

    const back = () => {
        console.log("back to home ")
        navigate("/")
    }
  


    return (
       <div>

       <div>

            <h3>Result:  {result.score} </h3>
            {Array.isArray(result.questions) && result.questions.map((question, index) => (
                <div key={index}>
                    <h4>Q{index + 1}: {question.question}</h4>
                    <p>A: {question.option1} , B: {question.option2} , C: {question.option3} , D: {question.option4}</p>
                  
                    <p>Correct Answer: {question.answer}</p>
                    <p>Your Answer: {result.answers[index]}</p>
                </div>
            ))}
        </div>

        <button id="back" onClick={back}>Go to home page</button> 

        </div>
    )
}

export default Result