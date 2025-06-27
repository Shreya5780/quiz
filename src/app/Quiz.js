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
        console.log("Submitting answers:", selectedOption);
        console.log("Submitting answers subjectId ..........:", subjectId);
        navigate(`/answers/${subjectId}`, { state: { selectedOption, questions } })
        
      
    }

    const handleEdit = (qid) => {
        console.log("Editing question with qid:", qid);
        const question = questions.find(q => q.qid === qid);
        if (question) {
            window.open()
            navigate(`/admin/update/question/${subjectId}/${qid}`, { state: { question } });
        } else {
            console.error("Question not found for qid:", qid);
        }
    }

    const handleDelete = (questionId) => {
        if (window.confirm(`Are you sure you want to delete this question?`)) {
            fetch(`http://localhost:8080/questions/delete/${questionId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(() => {
                    setQuestions(prevQuestions => prevQuestions.filter(q => q.qid !== questionId));
                    console.log(`Deleted question: ${questionId}`);
                })
                .catch(error => {
                    console.error("Error deleting question:", error);
                });
        }


    };

    const isCorrect = (qid, selected) => {
        const question = questions.find(q => q.qid === qid);
        return question && selected === question.answer;
    }

    const isAdmin = false;

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
                            <div key={q.qid}>
                                <h4>
                                    <span> {i + 1}. </span>
                                    <span> {q.question} </span>
                                </h4>

                                <div>

                                    <input type="radio" value="A" name={`selectedOtion-${q.qid}`} onChange={e => handleOption(q.qid, e.target.value)} checked={isAdmin ? isCorrect(q.qid, "A") : selectedOption[q.qid] === "A"} />  {q.option1}
                                    <input type="radio" value="B" name={`selectedOtion-${q.qid}`} onChange={e => handleOption(q.qid, e.target.value)} checked={isAdmin ? isCorrect(q.qid, "B") : selectedOption[q.qid] === "B"} /> {q.option2}
                                    <input type="radio" value="C" name={`selectedOtion-${q.qid}`} onChange={e => handleOption(q.qid, e.target.value)} checked={isAdmin ? isCorrect(q.qid, "C") : selectedOption[q.qid] === "C"} /> {q.option3}
                                    <input type="radio" value="D" name={`selectedOtion-${q.qid}`} onChange={e => handleOption(q.qid, e.target.value)} checked={isAdmin ? isCorrect(q.qid, "D") : selectedOption[q.qid] === "D"} /> {q.option4}

                                </div>

                                <button style={{ margin: "2px"} }  className="edit-button" onClick={() => handleEdit(q.qid)}>Edit</button>
                                <button style={{ margin: "2px"} }  className="delete-button" onClick={() => handleDelete(q.qid)}>Delete</button>
                            </div>

                        ))}
                        <div>

                            <button style={{ margin: "25px 5px"}}  id="submit" onClick={submit}>Submit</button>
                            <button style={{ margin: "25px 5px"}}  id="submit" onClick={() => navigate(`/admin/add/question/${subjectId}`)}>Add Question</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );

}

export default Quiz;
