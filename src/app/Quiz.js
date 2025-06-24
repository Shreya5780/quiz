import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsBySub } from "../middleware/GetQuestionsBySubject";

function Quiz() {

    const { subjectId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching questions for subjectId:", subjectId);
        getQuestionsBySub(subjectId)
            .then(data => {
                console.log("Fetched questions:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of questions");      
                }
                setQuestions(data);
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });
  
    }, [subjectId]);

    const handleOption = (qid, selected) => {
        setSelectedOption(prev => ({
            ...prev,
            [qid]: selected
        }))
    }

    
    const submit = () => {
        navigate(`/answers/${subjectId}`, {state: {selectedOption}})


    }

    return (
        <div>
            <h3>Start your Quiz With Subject: {subjectId} </h3>
            <div>
                <h2> Total :
                    <span> {questions.length} </span>
                    questions
                  
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

                </div>
            </div>

        </div>
    );

}

export default Quiz;
