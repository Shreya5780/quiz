function AdminHome() {
  return (
    <div className="container">
      <h1>Welcome to the Quiz Admin Panel</h1>
      <p>Use the navigation menu to manage quizzes, questions, and users.</p>

      <div>
        <ul>
          <li>
            <a href="/admin/quizzes">Manage Quizzes</a>
          </li>
          <li>
            <a href="/admin/questions">Manage Questions</a>
          </li>
          <li>
            <a href="/admin/users">Manage Users</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminHome;