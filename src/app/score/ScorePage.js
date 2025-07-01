import { useEffect, useState } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import { getscoreBySub, getscoreByUser } from "./GetScore";
import { getSubjectById } from "../../middleware/GetAllSubject";
import { getQuestionByQID, getQuestionsBySub } from "../../middleware/GetQuestionsBySubject";

function ScorePage() {

    const { subjectId } = useParams();
    const { userId } = useParams();

    const [getScore, setGetScore] = useState([]);

    const [subjectName, setSubjectName] = useState("");


    const location = useLocation();
    const score = location.state?.data || { getScore: [] };

    const [question, setQuestion] = useState([]);


    useEffect(() => {
        if (!subjectId) {
            return;
        }
        console.log("Fetching score by subject on mount...", score, " with id ", subjectId);
        setGetScore(score || []);
        console.log("Initial score data:", score);

        getSubjectById(subjectId)
            .then(data => {
                console.log("Score data fetched by subject:", data);
                setSubjectName(data.subjectName || "Unknown Subject");

                if (data.length > 0) {
                    setSubjectName(data[0].subjectName || "Unknown Subject");
                }
            })
            .catch(error => {
                console.error("Error fetching score by subject:", error);
            });

    }, [subjectId, score]);

    const handleUserScore = () => {
        console.log("Fetching score by subject...");
        getscoreByUser(userId)
            .then(data => {
                console.log("Score data:", data);
                setGetScore(data);
            })
            .catch(error => {
                console.error("Error fetching score by subject:", error);
            });
    };

    const navigate = useNavigate();

    const handleUserAnswers = (qids, score) => {
        // Fetch all questions by their QIDs and update state
        Promise.all(qids.map(qid => getQuestionByQID(qid)))
            .then(data => {
                console.log("Fetched question data:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of questions");
                }
                setQuestion(data);

                console.log("Navigating to answers with data:", score.scoreId);
                // console.log("Data to be sent:", dataToSend);
                const selectedOption = score.answers ? score.answers : [];
                const ans = score.score || 0;
                const questions = data;
                console.log("Navigating to answers with data:......................", questions, selectedOption, ans);

                // You can add navigation here if needed
                navigate(`/answers/${score.subjectId}/${score.scoreId}`,
                    {
                        state: {
                            selectedOption, questions, ans
                        }
                    })
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });

    };

    return (
        <div>
            <h1>Score Page</h1>

            <button onClick={handleUserScore}>Score By User</button>

            <div>
                <h2>Score by Subject :  <span style={{ margin: "15px" }}>
                    {subjectName}
                </span></h2>
                {getScore.length > 0 ? (
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getScore.map((score, index) => (
                                <tr key={index} style={{ listStyle: "none", padding: "10px", margin: "5px 0" }}>
                                    <td>  {score.userId} </td>
                                    <td>  {score.score} </td>
                                    <td>
                                        <button onClick={() =>
                                            handleUserAnswers(Object.keys(score.answers), score)} >
                                            View Result</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No scores available for this subject.</p>
                )}
            </div>



        </div>
    );
}

export default ScorePage;