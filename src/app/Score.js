import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuestionsBySub } from "../middleware/GetQuestionsBySubject";

function Score() {

    const navigate = useNavigate();

    const { subjectId } = useParams();
    console.log("Subject ID:", subjectId);

    const location = useLocation();
    const { selectedOption, questions } = location.state || { selectedOption: [], questions: [] };

    console.log("Selected answers:", selectedOption);
    console.log("Selected answers:", selectedOption["685ba7ecc5112492edd079a7"]);
    console.log("Questions:", questions);

    const calculateScore = () => {
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
        return score;
    };

    const back = () => {
        console.log("back to home ")
        navigate("/")
    }


    // const answers = Object.values(selectedOption);
    // console.log("answers:" , answers);

    // useEffect(() => {
    //     console.log("Selected answers:", answers);
    //     getQuestionsBySub(subjectId)
    //         .then(data => {
    //             console.log("Fetched questions for score calculation:", data);
    //             if (!Array.isArray(data)) {
    //                 throw new Error("Expected an array of questions");
    //             }
    //             // Here you can add logic to calculate the score based on the answers
    //         })
    //         .catch(error => {
    //             console.error("Error fetching questions for score calculation:", error);
    //         });
    //     // Here you can add logic to calculate the score based on the answers
    // }, [subjectId]);


    return (
        <div>

            <div>
                <h3>Score: {calculateScore()} / {questions.length} </h3>
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