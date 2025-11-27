// src/pages/TaskList.jsx
import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdated = (updated) => {
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const filtered = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (
      search &&
      !t.title.toLowerCase().includes(search.toLowerCase()) &&
      !t.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <div style={{ padding: "1.5rem", maxWidth: "1024px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1rem" }}>All Tasks</h2>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.4rem 0.6rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="all">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <input
            placeholder="Search by title/description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "180px",
              padding: "0.4rem 0.6rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        {loading ? (
          <div>Loading tasks...</div>
        ) : filtered.length === 0 ? (
          <div>No tasks match your filter.</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {filtered.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                isAdmin
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
                showAssigned
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
