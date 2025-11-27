import { useState } from "react";
import api from "../api";
import { Card, Input, TextArea, Select, Label, Button, ErrorText } from "./ui";
import { useAuth } from "../context/AuthContext";

const initialState = {
  title: "",
  description: "",
  assignedTo: "saurabh@example.com",
  priority: "medium",
  status: "todo",
  dueDate: "",
};

const TaskForm = ({ onTaskCreated }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAdmin } = useAuth();

  const validate = () => {
    if (!form.title.trim() || form.title.trim().length < 3) {
      return "Title must be at least 3 characters.";
    }
    if (!form.description.trim() || form.description.trim().length < 5) {
      return "Description must be at least 5 characters.";
    }
    return "";
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const body = {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        status: form.status,
        dueDate: form.dueDate || undefined,
      };

      if (isAdmin) {
        body.assignedTo = form.assignedTo;
      }

      const res = await api.post("/api/tasks", body);
      onTaskCreated?.(res.data);
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to create task. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card css={{ marginBottom: "1rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Create New Task</h3>

      {error && <ErrorText>{error}</ErrorText>}

      <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Eg. Setup GitHub repo"
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe what needs to be done..."
              required
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {isAdmin && (
              <div style={{ flex: 1, minWidth: "180px" }}>
                <Label>Assigned To (email)</Label>
                <Input
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={handleChange}
                  placeholder="saurabh@example.com"
                  required
                />
              </div>
            )}

            <div>
              <Label>Priority</Label>
              <Select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Select>
            </div>

            <div>
              <Label>Due Date</Label>
              <Input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          css={{ marginTop: "0.75rem" }}
        >
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;
