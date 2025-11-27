import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";
import { Card } from "../components/ui";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

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

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdated = (updated) => {
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const openEdit = (task) => {
    setEditingTask(task);
  };

  const closeEdit = () => {
    setEditingTask(null);
  };

  const saveEdit = async (data) => {
    setSavingEdit(true);
    try {
      const res = await api.patch(`/api/tasks/${editingTask._id}`, data);
      handleUpdated(res.data);
      closeEdit();
    } catch (err) {
      console.error("Failed to save edit", err);
    } finally {
      setSavingEdit(false);
    }
  };

  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          padding: "1.5rem 1.5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: "1rem",
              color: "#f9fafb",
              fontSize: "1.3rem",
              fontWeight: 600,
            }}
          >
            Admin Dashboard
          </h2>

          {/* Summary cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <StatCard label="Total Tasks" value={total} />
            <StatCard label="Todo" value={todo} />
            <StatCard label="In Progress" value={inProgress} />
            <StatCard label="Done" value={done} />
          </div>

          {/* Create Task card */}
          <TaskForm onTaskCreated={handleTaskCreated} />

          {/* Recent Tasks */}
          <h3
            style={{
              marginTop: "1.2rem",
              marginBottom: "0.6rem",
              color: "#f9fafb",
              fontSize: "1.05rem",
            }}
          >
            Recent Tasks
          </h3>

          {loading ? (
            <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              No tasks yet. Create your first task above.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "0.9rem",
                marginTop: "0.25rem",
              }}
            >
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  isAdmin
                  onUpdated={handleUpdated}
                  onDeleted={handleDeleted}
                  showAssigned
                  enableNotes
                  onEdit={() => openEdit(task)}
                />
              ))}
            </div>
          )}

          <EditTaskModal
            open={!!editingTask}
            onClose={closeEdit}
            task={editingTask}
            onSave={saveEdit}
            saving={savingEdit}
          />
        </div>
      </main>
    </>
  );
};

const StatCard = ({ label, value }) => (
  <Card
    css={{
      background: "#020617",
      borderColor: "#111827",
      color: "#e5e7eb",
    }}
  >
    <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{label}</div>
    <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{value}</div>
  </Card>
);

export default AdminDashboard;
