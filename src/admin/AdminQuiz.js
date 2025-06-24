import { use, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllSubject } from "../middleware/GetAllSubject";

function AdminQuiz() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         getAllSubject()
                .then(data => {
                  console.log("Fetched subjects:", data);
                  if (!Array.isArray(data)) {
                    throw new Error("Expected an array of subjects");
                  }
                  setSubjects(data);
                  setLoading(false);
                })
                .catch(error => {
                  console.error("Error fetching subjects:", error);
                  setLoading(false);
                });
     
    }, []);

    const navigate = useNavigate();
    

    const editSubject = (subjectId, subjectName) => {
        // console.log(`Editing subject:  ${subjectName} : ${subjectId}`);
        navigate(`/admin/update/${subjectName}/${subjectId}`);
    };

    const deleteSubject = (subjectId, subjectName, index) => {
        if (window.confirm(`Are you sure you want to delete the subject: ${subjectName}?`)) {
            fetch(`http://localhost:8080/admin/delete/${subjectId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(() => {
                    setSubjects(prevSubjects => prevSubjects.filter((_, i) => i !== index));
                    console.log(`Deleted subject: ${subjectName}`);
                })
                .catch(error => {
                console.error("Error deleting subject:", error);
            });
        }
            
            
    };

    return (
        <div>
            <h2>Admin Quiz Page</h2>
            <p>This page is for admin functionalities related to quizzes.</p>

            <div>
                <ul>
                    <li>
                        <a href="/admin/add/subject">Add Subject</a>
                    </li>

                </ul>
            </div>
            <div>
                <h3>Available Subjects</h3>
                <div>
                    {loading ? (
                        <p>Loading subjects...</p>
                    ) : (
                        <ul>
                            {Array.isArray(subjects) && subjects.length === 0 && (
                                <p>No subjects available. Please add a subject.</p>
                            )}
                            {Array.isArray(subjects) && subjects.map((subject, index) => (
                                <li key={index}>
                                    <a href={`/questions/${subject.id}`}>{subject.subjectName}</a>
                                    <button onClick={() => deleteSubject(subject.id, subject.subjectName, index)}>Delete</button>
                                    <button onClick={() => {
                                        editSubject(subject.id, subject.subjectName);
                                    }}>Edit</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
export default AdminQuiz;















/****
 * 
 * 
 *   const subjectInfo = (subjectName) => {
        fetch(`http://localhost:8080/admin/get/${subjectName}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Subject info:", data);
                setCurrentSubject(data);
            })
            .catch(error => {
                console.error("Error fetching subject info:", error);
            }
            );

    }

 */