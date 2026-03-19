import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin } from "../services/authService"; // Aliased to avoid conflict with login from useAuth

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin({ email, password });
      login(data.user);
      onClose();
    } catch (error) {
      const message = error.response?.data?.message || "Connection Error";
      setError(message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="modal-animate" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleSubmit}
          className="bg-main-surface dark:bg-dark-surface border-main-border dark:border-dark-border relative w-full max-w-md rounded-sm border p-8 shadow-lg"
        >
          <button
            type="button"
            onClick={onClose}
            className="button-close absolute top-2 right-2 z-110"
          >
            ✕
          </button>

          <h2 className="text-main-text dark:text-dark-text-main d mb-6 text-center text-2xl">
            Login
          </h2>

          {error && (
            <p className="mb-4 text-center text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="input-standard w-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="input-standard w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="button-standard mt-4 w-full">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
