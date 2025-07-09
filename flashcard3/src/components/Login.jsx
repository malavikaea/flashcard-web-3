import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = result.user;
      setUser(userData);

      const token = await userData.getIdToken();
      console.log("Sending token:", token);

      const response = await fetch(`http://localhost:5000/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userData.displayName,
          email: userData.email,
          photo: userData.photoURL,
          uid: userData.uid,
          token
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to backend");
      }
       const meRes = await fetch("http://localhost:5000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const meData = await meRes.json();
      const responseData = await response.json();

      localStorage.setItem("userProfile", JSON.stringify({
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        uid: userData.uid,
         isAdmin: meData.isAdmin || false,
        duration: '30 min', // ✅ now available
  token
      }));

      // ✅ Navigate based on admin or onboarding
    if (meData.isAdmin) {
      navigate("/admin");
    } else {
      navigate(meData.onboarding ? "/dash" : "/onboarding");
    }

      // navigate(responseData.isNew ? "/onboarding" : "/dash");
      // const isFirstTime = !localStorage.getItem("userProfile");
      // navigate(isFirstTime ? "/onboarding" : "/dash");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Sign in to My Flashcard App</h2>
        <p>Welcome, please sign in to continue</p>

        <button className="oauth-btn" onClick={handleSignIn}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google Icon"
          />
          Sign In With Google
        </button>

        <div className="divider">or</div>

        <form>
          <label>Email</label>
          <input type="email" placeholder="your@email.com" required />

          <label>Password</label>
          <input type="password" placeholder="******" required />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="sign-in-btn">Sign In</button>
        </form>

        <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
