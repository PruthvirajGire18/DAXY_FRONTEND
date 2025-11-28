import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { Card, Input, Label, Button, ErrorText } from "../components/ui";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", form);
      const { token, user } = res.data;
      login(user, token);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/my-tasks");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Invalid email or password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Card
        css={{
          width: "100%",
          maxWidth: "430px",
          borderRadius: "24px",
          padding: "2.2rem 2rem 1.8rem",
          background: "#0f172a", 
          borderColor: "#1e293b",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "1.6rem",
            fontSize: "1.6rem",
            textAlign: "center",
            color: "#f9fafb",
            letterSpacing: "0.02em",
          }}
        >
          Task Tracker Login
        </h1>

        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "0.9rem" }}>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@123s.com"
            />
          </div>

          <div style={{ marginBottom: "1.1rem" }}>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              borderRadius: "999px",
              marginTop: "0.2rem",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div
          style={{
            marginTop: "1.2rem",
            fontSize: "0.78rem",
            color: "#9ca3af",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
        </div>
      </Card>
    </div>
  );
};

export default Login;
