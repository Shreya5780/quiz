import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Score() {

    const navigate = useNavigate();

    const { subjectId } = useParams();
    console.log("Subject ID:", subjectId);

    const location = useLocation();
    const { selectedOption, questions, ans } = location.state || { selectedOption: [], questions: [], ans: 0 };


    const back = () => {
        console.log("back to home ")
        navigate("/")
    }

    return (
        <div>

            <div>
                <h3>Score: {ans} / {questions.length} </h3>
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