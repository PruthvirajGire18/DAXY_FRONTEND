import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  if (!user) return null;

  return (
    <nav
      style={{
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        background: "#020617",
        borderBottom: "1px solid #111827",
        color: "#f9fafb",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1rem" }}>
        Saurabh Task Tracker
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {isAdmin && (
          <>
            <Link to="/admin" style={{ fontSize: "0.9rem" }}>
              Dashboard
            </Link>
            <Link to="/tasks" style={{ fontSize: "0.9rem" }}>
              All Tasks
            </Link>
            <Link to="/create-task" style={{ fontSize: "0.9rem" }}>
              Create Task
            </Link>
          </>
        )}

        {!isAdmin && (
          <Link to="/my-tasks" style={{ fontSize: "0.9rem" }}>
            My Tasks
          </Link>
        )}

        <span
          style={{
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          {user.name} ({user.role})
        </span>

        <button
          onClick={logout}
          style={{
            padding: "0.3rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            background: "transparent",
            color: "#f9fafb",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
