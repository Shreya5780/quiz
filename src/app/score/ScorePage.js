import { use, useEffect, useState } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import { getscoreBySub, getscoreByUser } from "./GetScore";
import { getSubjectById } from "../../middleware/GetAllSubject";
import { getQuestionByQID, getQuestionsBySub } from "../../middleware/GetQuestionsBySubject";

function ScorePage() {

    const { subjectId } = useParams();
    const { userId } = useParams();

    const [getScore, setGetScore] = useState([]);

    const [subjectName, setSubjectName] = useState("");
    const [subjectNames, setSubjectNames] = useState({});

    const location = useLocation();
    const scoreData = location.state?.data || [];
    let score = [];

    const isUser = location.state?.data?.isUser || false;

    useEffect(() => {

        if (!Array.isArray(scoreData)) {
            score = Object.values(scoreData).slice(0, -1);
            setGetScore(score || []);
        }
        // if (Array.isArray(score)) {

        // console.log("Fetching score by subject on mount...", score, " with id ", subjectId);
        // console.log("Initial score data:", getScore);
        // console.log("Initial score data:", isUser);

        if (!isUser && subjectId) {
            // console.log("Fetching subject name for subjectId:", subjectId);
            getSubjectById(subjectId)
                .then(data => {
                    console.log("Score data fetched by subject:", data);
                    setSubjectName(data.subjectName || (data.length > 0 ? data[0].subjectName : "Unknown Subject"));
                })
                .catch(error => {
                    console.error("Error fetching score by subject:", error);
                });
        } else {
            const fetchAllsubjects = async () => {
                const names = {};
                await Promise.all(
                    score.map(async (s) => {
                        // console.log("Fetching subject name for subjectId: inside mapppppppppp  ", s.subjectId);
                        try {
                            const data = await getSubjectById(s.subjectId);
                            names[s.subjectId] = data.subjectName || (data.length > 0 ? data[0].subjectName : "Unknown Subject");
                        } catch {
                            names[s.subjectId] = "Unknown Subject";
                        }
                    })



                );
                // console.log(" subjectys....", names);
                setSubjectNames(names);
            };
            fetchAllsubjects();
        }
        // }

    }, [scoreData]);

    // console.log(" subjectys", subjectNames);
    // console.log(" subjectys", subjectName);

    const navigate = useNavigate();


    const handleUserAnswers = async (qids, score) => {
    const selectedOption = score.answers || [];
    const ans = score.score || 0;

    try {
        const allQuestions = await getQuestionsBySub(score.subjectId);

        const questions = await Promise.all(qids.map(qid => getQuestionByQID(qid)));

        const attemptedQIDs = new Set(qids);
        const afterAttemptedQuestions = allQuestions.filter(q => !attemptedQIDs.has(q.qid));

        console.log("Attempted Questions:", questions);
        console.log("Unattempted Questions:", afterAttemptedQuestions);

        navigate(`/answers/${score.subjectId}/${score.scoreId}`, {
            state: {
                selectedOption,
                questions,
                ans,
                afterAttemptedQuestions 
            }
        });

    } catch (error) {
        console.error("Error fetching questions:", error);
    }
};

    return (
        <div>
            <h1>Score Page</h1>

            <div>
                {isUser
                    ? <>Score by User: <span style={{ margin: "15px" }}>{userId}</span></>
                    : <>Score by Subject: <span style={{ margin: "15px" }}>{subjectName}</span></>
                }
                {getScore.length > 0 ? (
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                {isUser ? <th>Subject</th> : <th>User</th>}
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getScore.map((score, index) => (
                                <tr key={index} style={{ listStyle: "none", padding: "10px", margin: "5px 0" }}>
                                    {isUser
                                        ? <td>{subjectNames[score.subjectId] || score.subjectId}</td>
                                        : <td>{score.userId}</td>
                                    }
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