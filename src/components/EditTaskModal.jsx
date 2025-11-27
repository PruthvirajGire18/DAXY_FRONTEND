import { useState, useEffect } from "react";
import { ModalOverlay, ModalContent, Input, TextArea, Select, Label, Button, ErrorText } from "./ui";

const EditTaskModal = ({ open, onClose, task, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        assignedTo: task.assignedTo || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      });
      setError("");
    }
  }, [task]);

  if (!open || !task) return null;

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
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: "0.5rem" }}>Edit Task</h3>
        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
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
                required
              />
            </div>

            <div>
              <Label>Assigned To (email)</Label>
              <Input
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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

          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
            }}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              size="sm"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditTaskModal;
