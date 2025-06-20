import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {

    const { subject } = useParams();

    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/admin/questions/${subject}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())

            .then(data => {
                setQuestions(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [subject]);
    //run this effect when subject change

    const handleOption = (qid, selected) => {
        setSelectedOption(prev => ({
            ...prev,
            [qid]: selected
        }))
    }

    const submit = () => {
        console.log("selectedOption", selectedOption)
        
        navigate(`/question/${subject}`)
           
       
    }

    return (
        <div>
            <h3>Start your Quiz With Subject: {subject} </h3>
            <div>
                <h2> Total :
                    <span> {questions.length} </span>
                    questions
                    {/* {questions.map((q, i) => {
                    <p> {q.question} </p>
                })} */}
                </h2>

                <div>

                    <div>
                        {questions.map((q, i) => (
                            <div key={q.questionId}>
                                <h4>
                                    <span> {q.questionId} </span>
                                    <span> {q.question} </span>
                                </h4>

                                <div>
                                   
                                    <input type="radio" value="A" name={`selectedOtion-${q.questionId}`} onChange={e => handleOption(q.questionId, e.target.value)} />  {q.option1}
                                    <input type="radio" value="B" name={`selectedOtion-${q.questionId}`} onChange={e => handleOption(q.questionId, e.target.value)} /> {q.option2}
                                    <input type="radio" value="C" name={`selectedOtion-${q.questionId}`} onChange={e => handleOption(q.questionId, e.target.value)} /> {q.option3}
                                    <input type="radio" value="D" name={`selectedOtion-${q.questionId}`} onChange={e => handleOption(q.questionId, e.target.value)} /> {q.option4}

                                </div>
                            </div>

                        ))}
                        <div>

                            <button id="submit" onClick={submit}>Submit</button>
                        </div>
                    </div>

                    {/* selected option : {selectedOption} */}
                </div>
            </div>

        </div>
    );

}

export default Quiz;


// {questions.map((q, i) => (
//                         <div key={i}>
//                             <h3>
//                                 <span>{q.questionId}</span>: {q.question}
//                             </h3>
//                             <ul>
//                                 <li>A: {q.optionA}</li>
//                                 <li>B: {q.optionB}</li>
//                                 <li>C: {q.optionC}</li>
//                                 <li>D: {q.optionD}</li>
//                             </ul>
//                         </div>
//                     ))}
