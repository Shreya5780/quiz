import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getscoreBySub, getscoreByUser } from "./GetScore";

function ScorePage() {

    const {subjectId} = useParams();
    const {userId} = useParams();

    const [getScore, setGetScore] = useState([]);

     const location = useLocation();
    const score  = location.state.data || { getScore: []};


    useEffect(() => {
        console.log("Fetching score by subject on mount...", score);
        setGetScore(score || []);
        console.log("Initial score data:", score);
    }, [subjectId]);

     const handleUserScore = () => {
        console.log("Fetching score by subject...");
        getscoreByUser(userId)
            .then(data => {
                console.log("Score data:", data);
                setGetScore(data);
                // Handle the score data as needed
            })
            .catch(error => {
                console.error("Error fetching score by subject:", error);
            });
    };

    return (
        <div>
            <h1>Score Page</h1>

            <button onClick={handleUserScore}>Score By User</button>

            <div>
                <h2>Score by Subject</h2>
                {getScore.length > 0 ? (
                    <ul>
                        {getScore.map((score, index) => (
                            <li key={index} style={{listStyle: "none", padding: "10px", margin: "5px 0"}}>
                               <span style={{margin: "15px"}}>
                                User ID: {score.userId},  
                                </span>  
                                <span style={{margin: "15px"}}>
                                    Subject ID: {score.subjectId},   
                                    </span>Score: {score.score}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No scores available for this subject.</p>
                )}
            </div>
        </div>
    );
}   

export default ScorePage;