import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Score() {

    const navigate = useNavigate();

    const { subjectId } = useParams();
    console.log("Subject ID:", subjectId);

    const location = useLocation();
    const { selectedOption, questions, ans, afterAttemptedQuestions } = location.state || { selectedOption: [], questions: [], ans: 0, afterAttemptedQuestions: [] };


    const back = () => {
        console.log("back to home ")
        navigate("/")
    }

    return (
        <div>

            <div>
                <h3>Score: {ans} / {questions.length} </h3>

                <div>
                    
                    {Array.isArray(questions) && questions.map((question, index) => (
                        <div key={`atempted${index}`}>
                            <h4>Q{index + 1}: {question.question}</h4>
                            <p>A: {question.option1} , B: {question.option2} , C: {question.option3} , D: {question.option4}</p>

                            <p>Correct Answer : {question.answer}</p>
                            <p>Your Answer : <span> {selectedOption[question.qid] || '--'} </span> </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h5 style={{color: 'red'}}>This questions are added after you completed the quiz, Please refer for future. </h5>
                {Array.isArray(afterAttemptedQuestions) && afterAttemptedQuestions.map((question, index) => (
                    <div key={`unatempted${index}`}>
                        <h4>Q{questions.length + index + 1}: {question.question}</h4>
                        <p>A: {question.option1} , B: {question.option2} , C: {question.option3} , D: {question.option4}</p>

                        <p>Correct Answer : {question.answer}</p>
                        <p>Your Answer : <span> --- </span> </p>
                    </div>
                ))}
            </div>

            <button id="back" onClick={back}>Go to home page</button>
        </div>
    );
}

export default Score;