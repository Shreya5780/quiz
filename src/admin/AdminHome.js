function AdminHome() {
  return (
    <div className="container">
      <h1>Welcome to the Quiz Admin Panel</h1>
      <p>Use the navigation menu to manage quizzes, questions, and users.</p>

      <div>
        <ul>
          <li style={{listStyle: "none", padding: "10px", margin: "5px 0"}}>
            <a href="/admin/quizzes">Manage Quizzes</a>
          </li>

          <li style={{listStyle: "none", padding: "10px", margin: "5px 0"}}>
            <a href="/admin/users">Manage Users</a>
          </li>

          <li style={{listStyle: "none", padding: "10px", margin: "5px 0"}}>
            <a href="/admin/score">View Score</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminHome;