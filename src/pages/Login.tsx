import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message || "Failed to login. Please check your credentials.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8" 
        style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            background: 'var(--gradient-neon)', 
            width: '60px', 
            height: '60px', 
            borderRadius: '15px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: 'var(--shadow-neon)'
          }}>
            <LogIn color="white" size={32} />
          </div>
          <h1>Campus Platform</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Student</p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            className="glass-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="glass-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: '#ff4444', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
          <button 
            type="submit" 
            className="btn-neon" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>

          <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <span style={{ margin: '0 1rem' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          </div>

          <button 
            type="button" 
            className="glass" 
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              border: '1px solid rgba(0, 243, 255, 0.3)',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
            onClick={async () => {
              setEmail("evaluator@campus.com");
              setPassword("evaluator123");
              // We'll let the form submit naturally contextually or trigger it
              setLoading(true);
              try {
                await signInWithEmailAndPassword(auth, "evaluator@campus.com", "evaluator123");
                navigate("/dashboard");
              } catch (err) {
                setError("Demo account not found. Please create 'evaluator@campus.com' in Firebase Console.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            Login as Evaluator (One-Click)
          </button>
          
          <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
            Demo: evaluator@campus.com / evaluator123
          </p>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Only authorized students can access this platform.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
