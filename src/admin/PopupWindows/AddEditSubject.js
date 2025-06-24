import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddSubject() {
    const {subjectName, subjectId} = useParams();

    const [subject, setSubject] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (subjectId) {
            setSubject(subjectName);
        }
    }, [subjectId]);

    const handleSubmit = (event) => {
        event.preventDefault();
       
        let url = `http://localhost:8080/admin/add/${subject}`;

        if (subjectId) {
            url = `http://localhost:8080/admin/update/${subjectId}?subjectName=${subject}`;
        }

         fetch(url, {
            method: subjectId ? "PUT" : "POST",
            headers: {
                    'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ subjectName: subject }) 
        })
        .then(() => {
            navigate(`/admin/quizzes`); 
            if (subjectId) {
                console.log(`Subject updated: ${subjectName} to ${subject}`);
            } else {
                console.log(`Subject added: ${subject}`);
            }
            setSubject("");
        })

        .catch(error => {
             <h3>Error while loading...</h3>
             console.log(error)
        }
       )
    };

    return (
        <div>
            <h2>{subjectName ? `Edit Subject: ${subjectName}` : "Add Subject"}</h2>
            <p>{subjectName ? "Edit the subject name below:" : "Enter a new subject name below:"}</p>
            <form>
                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input type="text" id="subjectName" name="subjectName" required value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>

                <button type="submit" onClick={handleSubmit}>{subjectName ? "Update Subject" : "Add Subject"}</button>
            </form>
        </div>
    );
}
export default AddSubject;