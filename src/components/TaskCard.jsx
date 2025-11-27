import { useState } from "react";
import api from "../api";

const statusColors = {
  todo: "#f97316", 
  "in-progress": "#60a5fa", 
  done: "#4ade80", 
};

const priorityColors = {
  low: "#22c55e",
  medium: "#eab308",
  high: "#f97316",
};

const TaskCard = ({
  task,
  isAdmin,
  onUpdated,
  onDeleted,
  showAssigned = false,
  enableNotes = false,
  onEdit,
}) => {
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await api.patch(`/api/tasks/${task._id}`, {
        status: newStatus,
      });
      onUpdated?.(res.data);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/api/tasks/${task._id}`);
      onDeleted?.(task._id);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);
    try {
      const res = await api.patch(`/api/tasks/${task._id}`, {
        progressNote: noteText.trim(),
      });
      onUpdated?.(res.data);
      setNoteText("");
    } catch (err) {
      console.error("Failed to add note", err);
    } finally {
      setAddingNote(false);
    }
  };

  const statusColor = statusColors[task.status] || "#e5e7eb";
  const priorityColor = priorityColors[task.priority] || "#e5e7eb";

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";


  const assignedEmail =
    typeof task.assignedTo === "string"
      ? task.assignedTo.toLowerCase()
      : "";

  let creatorEmail = "";

  if (typeof task.createdBy === "string") {
    if (task.createdBy.includes("@")) {
      creatorEmail = task.createdBy.toLowerCase();
    }
  } else if (task.createdBy && typeof task.createdBy === "object") {
    if (task.createdBy.email) {
      creatorEmail = task.createdBy.email.toLowerCase();
    }
  }

  const isSelfTask =
    task.isSelfTask || 
    (assignedEmail && creatorEmail && assignedEmail === creatorEmail);

  return (
    <div
      style={{
        background: "#0f172a",
        color: "#f9fafb",
        borderRadius: "20px",
        padding: "16px 20px",
        border: "1px solid #1e293b",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Title + priority pill */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "1rem",
            fontWeight: 600,
            color: "#f9fafb",
          }}
        >
          {task.title}
        </h4>

        <span
          style={{
            padding: "4px 12px",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontWeight: 600,
            border: `1.5px solid ${priorityColor}`,
            color: priorityColor,
            background: "transparent",
          }}
        >
          {(task.priority || "medium").toUpperCase()}
        </span>
      </div>

      {/* Assigned to */}
      {showAssigned && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          Assigned to: <span>{task.assignedTo}</span>
        </div>
      )}

      {/* ⭐ Self Task badge (admin only) */}
      {isAdmin && isSelfTask && (
        <div
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            background: "#1e3a8a",
            color: "#bfdbfe",
            padding: "2px 10px",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontWeight: 600,
            marginTop: "-2px",
            marginBottom: "2px",
          }}
        >
          Self Task
        </div>
      )}

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: "0.9rem",
          color: "#e5e7eb",
        }}
      >
        {task.description}
      </p>

      {/* Status + due date row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.8rem",
          color: "#9ca3af",
          marginTop: "4px",
        }}
      >
        <div>
          Status:{" "}
          <span
            style={{
              color: statusColor,
              fontWeight: 600,
            }}
          >
            {task.status}
          </span>
        </div>
        {task.dueDate && (
          <div style={{ color: isOverdue ? "#fca5a5" : "#9ca3af" }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Status buttons + Edit/Delete */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "6px",
        }}
      >
        {/* left: status buttons */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["todo", "in-progress", "done"].map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              style={{
                padding: "4px 10px",
                borderRadius: "999px",
                border: "1px solid #1e293b",
                background: task.status === st ? "#111827" : "#020617",
                fontSize: "0.75rem",
                cursor: "pointer",
                color: "#e5e7eb",
              }}
            >
              {st === "todo"
                ? "Todo"
                : st === "in-progress"
                ? "In Progress"
                : "Done"}
            </button>
          ))}
        </div>


        {isAdmin && (
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={onEdit}
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                border: "1px solid #1e293b",
                background: "#020617",
                fontSize: "0.75rem",
                cursor: "pointer",
                color: "#e5e7eb",
              }}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                border: "none",
                background: "#fee2e2",
                fontSize: "0.75rem",
                cursor: "pointer",
                color: "#b91c1c",
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {enableNotes && (
        <div
          style={{
            marginTop: "10px",
            paddingTop: "8px",
            borderTop: "1px solid #1f2937",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#cbd5e1",
              marginBottom: "4px",
            }}
          >
            Progress Notes
          </div>

          {task.progressNotes && task.progressNotes.length > 0 ? (
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                margin: 0,
                maxHeight: "120px",
                overflowY: "auto",
                fontSize: "0.8rem",
              }}
            >
              {task.progressNotes
                .slice()
                .reverse()
                .map((note, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "8px",
                      background: "#020617",
                      marginBottom: "4px",
                    }}
                  >
                    <div style={{ color: "#e5e7eb" }}>{note.text}</div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#9ca3af",
                        marginTop: "2px",
                      }}
                    >
                      {note.createdAt
                        ? new Date(note.createdAt).toLocaleString()
                        : ""}
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div
              style={{
                fontSize: "0.8rem",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              No notes yet.
            </div>
          )}

          <form
            onSubmit={handleAddNote}
            style={{
              marginTop: "4px",
              display: "flex",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Add a progress note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{
                flex: 1,
                padding: "6px 10px",
                borderRadius: "999px",
                border: "1px solid #1e293b",
                fontSize: "0.8rem",
                background: "#020617",
                color: "#f9fafb",
              }}
            />
            <button
              type="submit"
              disabled={addingNote}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {addingNote ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
