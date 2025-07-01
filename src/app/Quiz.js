import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsBySub } from "../middleware/GetQuestionsBySubject";

function Quiz() {

    const { subjectId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [timer, setTimer] = useState(30);


    useEffect(() => {
        console.log("Fetching questions for subjectId:", subjectId);
        getQuestionsBySub(subjectId)
            .then(data => {
                console.log("Fetched questions:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of questions");
                }
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });

    }, [subjectId]);

    useEffect(() => {
        if (isLoading) return;
        if (timer === 0) {
            alert("Time is up! Submitting your answers.");
            submit();
            return;
        }
        const timerId = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timer, isLoading]);


    const handleOption = (qid, selected) => {
        setSelectedOption(prev => ({
            ...prev,
            [qid]: selected
        }))
    }


    const submit = () => {
        setIsSubmitting(true);
        console.log("Submitting answers:", selectedOption);
        console.log("Submitting answers subjectId ..........:", subjectId);

        setTimeout(() => {

            let ans = 0;
            questions.forEach(question => {
                // const userAnswer = ;
                if (selectedOption[question.qid] === question.answer) {
                    ans += 1;
                }
            });
            console.log("Calculated score:", ans);

            const data = {
                userId: "het", // Replace with actual user ID
                subjectId: subjectId,
                score: ans,
                answers: questions.reduce((key, value) => {
                    key[value.qid] = selectedOption[value.qid];
                    return key;
                }, {}),
                // questionIds: questions.map(q => q.qid)
            };
            console.log("Data to be sent:", data);

            fetch(`http://localhost:8080/score/save`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : null
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to save score");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Score saved successfully:", data);
                    navigate(`/answers/${subjectId}/${data.scoreId}`, { state: { selectedOption, questions, ans } })
                })
                .catch(error => {
                    console.error("Error saving score:", error);
                });
        }, 1000)


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

    if (isLoading) {
        return <div>Loading...</div>;
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
                    <div style={{ color: timer <= 10 ? "red" : "black" }}>
                        Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                    </div>
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

                                {isAdmin ? <div>
                                    <button style={{ margin: "2px" }} className="edit-button" onClick={() => handleEdit(q.qid)}>Edit</button>
                                    <button style={{ margin: "2px" }} className="delete-button" onClick={() => handleDelete(q.qid)}>Delete</button>
                                    <button style={{ margin: "25px 5px" }} id="submit" onClick={() => navigate(`/admin/add/question/${subjectId}`)}>Add Question</button>
                                </div> : <div> </div>}


                            </div>

                        ))}
                        <div>

                            {/* <button style={{ margin: "25px 5px" }} id="submit" onClick={submit}>Submit</button> */}
                            <button style={{ margin: "25px 5px" }} id="submit" onClick={submit} disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );

}

export default Quiz;
