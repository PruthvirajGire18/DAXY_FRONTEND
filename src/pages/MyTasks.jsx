// src/pages/MyTasks.jsx
import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import {
  Card,
  Input,
  TextArea,
  Select,
  Label,
  Button,
} from "../components/ui";
import { useAuth } from "../context/AuthContext";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const { user } = useAuth();

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

  const handleCreateChange = (e) => {
    setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");

    if (!newTask.title.trim() || newTask.title.trim().length < 3) {
      setCreateError("Title must be at least 3 characters.");
      return;
    }
    if (!newTask.description.trim() || newTask.description.trim().length < 5) {
      setCreateError("Description must be at least 5 characters.");
      return;
    }

    setCreating(true);
    try {
      const res = await api.post("/api/tasks", {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        priority: newTask.priority,
        dueDate: newTask.dueDate || undefined,
      });

      setTasks((prev) => [res.data, ...prev]);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    } catch (err) {
      console.error("Failed to create self task", err);
      setCreateError("Failed to create task. Try again.");
    } finally {
      setCreating(false);
    }
  };

  const filtered = tasks.filter((t) =>
    statusFilter === "all" ? true : t.status === statusFilter
  );

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
            My Tasks - {user?.name || "Saurabh"}
          </h2>

          <Card
            css={{
              marginBottom: "1rem",
              background: "#0f172a",
              color: "#f9fafb",
              borderRadius: "20px",
              padding: "1.2rem 1.3rem",
              borderColor: "#1e293b",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "0.75rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#f9fafb",
              }}
            >
              Create Self Task
            </h3>

            {createError && (
              <div
                style={{
                  marginBottom: "0.5rem",
                  padding: "0.5rem 0.7rem",
                  borderRadius: "10px",
                  background: "#451a1a",
                  color: "#fecaca",
                  fontSize: "0.8rem",
                }}
              >
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit}>
              <div style={{ display: "grid", gap: "0.7rem" }}>
                <div>
                  <Label style={{ color: "#e5e7eb" }}>Title</Label>
                  <Input
                    name="title"
                    value={newTask.title}
                    onChange={handleCreateChange}
                    placeholder="Eg. Finish DSA questions"
                    required
                  />
                </div>

                <div>
                  <Label style={{ color: "#e5e7eb" }}>Description</Label>
                  <TextArea
                    name="description"
                    value={newTask.description}
                    onChange={handleCreateChange}
                    rows={3}
                    placeholder="Describe what you will do..."
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <Label style={{ color: "#e5e7eb" }}>Priority</Label>
                    <Select
                      name="priority"
                      value={newTask.priority}
                      onChange={handleCreateChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Select>
                  </div>

                  <div>
                    <Label style={{ color: "#e5e7eb" }}>Due Date</Label>
                    <Input
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleCreateChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={creating}
                    css={{ marginTop: "0.5rem" }}
                  >
                    {creating ? "Adding..." : "Add Task"}
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* Filter */}
          <div style={{ marginBottom: "1rem" }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "0.4rem 0.7rem",
                borderRadius: "999px",
                border: "1px solid #1f2937",
                background: "#020617",
                color: "#f9fafb",
                fontSize: "0.85rem",
              }}
            >
              <option value="all">All Status</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Tasks list */}
          {loading ? (
            <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              No tasks yet. Create one above.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "0.9rem",
              }}
            >
              {filtered.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  isAdmin={false}
                  onUpdated={handleUpdated}
                  enableNotes
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyTasks;
