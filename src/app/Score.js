import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Score() {

    const navigate = useNavigate();

    const { subjectId } = useParams();
    console.log("Subject ID:", subjectId);

    const location = useLocation();
    const { selectedOption, questions } = location.state || { selectedOption: [], questions: [] };

    // console.log("Selected answers:", selectedOption);
    // console.log("Selected answers:", selectedOption["685ba7ecc5112492edd079a7"]);
    // console.log("Questions:", questions);


    const back = () => {
        console.log("back to home ")
        navigate("/")
    }

    const [result, setResult] = useState(0);
    const hasRendered = useRef(false);

    useEffect(() => {
        if (hasRendered.current) {
            return; // Skip the first render
        }
        hasRendered.current = true;
        if (!Array.isArray(questions) || questions.length === 0) {
            console.error("No questions available for score calculation.");
            return 0;
        }
        let score = 0;
        questions.forEach(question => {
            const userAnswer = selectedOption[question.qid];
            if (userAnswer === question.answer) {
                score += 1;
            }
        });
        console.log("Calculated score:", score);
        setResult(score);

        const data = {
            userId: "1234", // Replace with actual user ID
            subjectId: subjectId,
            score: score
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
            })
            .catch(error => {
                console.error("Error saving score:", error);
            });
    }, [questions, selectedOption, subjectId]);


    return (
        <div>

            <div>
                <h3>Score: {result} / {questions.length} </h3>
                {Array.isArray(questions) && questions.map((question, index) => (
                    <div key={index}>
                        <h4>Q{index + 1}: {question.question}</h4>
                        <p>A: {question.option1} , B: {question.option2} , C: {question.option3} , D: {question.option4}</p>

                        <p>Correct Answer: {question.answer}</p>
                        <p>Your Answer: {selectedOption[question.qid]}</p>
                    </div>
                ))}
            </div>

            <button id="back" onClick={back}>Go to home page</button>
        </div>
    );
}

export default Score;