import { useEffect, useState } from "react";
import { getAllSubject } from "./GetAllSubject";

function SubjectDropDownList({ subjectId, onChange }) {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSubject()
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of subjects");
                }
                setSubjects(data);

                if (!subjectId && data.length > 0) {
                    onChange(data[0].id); 
                }

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching subjects:", error);
                setLoading(false);
            });

    }, []);

    return (
        <div>
            <p>Please select subject to start with</p>

            <p>Available Subjects:</p>
            {loading ? <p>Loading...</p> : (
                <ul>
                    <select value={subjectId} onChange={(e) => onChange(e.target.value)}>
                        {subjects.map((sub, index) => (
                            <option key={index} value={sub.id}>
                                {sub.subjectName}
                            </option>
                        ))}
                    </select>

                </ul>
            )}
        </div>

    );
}

export default SubjectDropDownList;