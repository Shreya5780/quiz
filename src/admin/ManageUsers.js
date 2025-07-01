import { use, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllSubject } from "../middleware/GetAllSubject";
import { getscoreBySub, getscoreByUser } from "../app/score/GetScore";
import { getAllUsers } from "../middleware/GetUsers";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUsers()
            .then(data => {
                console.log("Fetched users:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of subjects");
                }
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching subjects:", error);
                setLoading(false);
            });

    }, []);

    const navigate = useNavigate();


    const editUser = (userId, userName) => {
        navigate(`/admin/update/${userName}/${userId}`);
    };

    const deleteUser = (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete the subject: ${userName}?`)) {
            fetch(`http://localhost:8080/user/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(() => {
                    setUsers(prev => prev.filter(s => s.id !== userId));
                    console.log(`Deleted subject: ${userName}`);
                })
                .catch(error => {
                    console.error("Error deleting subject:", error);
                });
        }


    };


    const handleSubScore = (userId) => {
        console.log("Fetching score by subject...", userId);
        getscoreByUser(userId)
            .then(data => {
                console.log("Score data:", data);
                navigate(`/user/score/${userId}`, { state: { data } });
            })
            .catch(error => {
                console.error("Error fetching score by subject:", error);
            });

    };


    return (
        <div>
            <h2>Admin Users Page</h2>
            <p>This page is for admin functionalities related to users.</p>

            <div>
                <ul>
                    <li style={{listStyle: "none", padding: "10px", margin: "5px 0"}}>
                        <a href="/admin/add/user">Add User</a>
                    </li>

                </ul>
            </div>
            <div>
                <h3>Available Users</h3>
                <div>
                    {loading ? (
                        <p>Loading users info...</p>
                    ) : (
                        <ul>
                            {Array.isArray(users) && users.length === 0 && (
                                <p>No users available. Please add a user.</p>
                            )}
                            {Array.isArray(users) && users.map((user, index) => (
                                <li key={index} style={{listStyle: "none", padding: "10px", margin: "5px 0"}}>
                                    <a style={{ margin: "5px"}} href={`/profile`}>{user.name}</a>
                                    <button style={{ margin: "5px"}}  onClick={() => deleteUser(user.id, user.name, index)}>Delete</button>
                                    <button style={{ margin: "5px"}}  onClick={() => {
                                        editUser(user.id, user.name);
                                    }}>Edit</button>

                                    <button style={{ margin: "5px"}}  onClick={() => {
                                        handleSubScore(user.id);
                                    }}>View Score</button>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ManageUsers;