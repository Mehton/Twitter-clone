import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../client";
import "./SignIn.css";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.email) tempErrors.email = "Email is required.";
    if (!form.password) tempErrors.password = "Password is required.";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const { email, password } = form;

        // Query the custom table for the user's email and password
        const { data, error } = await supabase
          .from("Twitter-clone")
          .select("email, password")
          .eq("email", email)
          .eq("password", password) // Check for matching email/password (not secure!)
          .single(); // Get a single row

        if (error) {
          setErrorMessage("Invalid email or password");
        } else {
          console.log("User found:", data);
          // After authentication, you can store the user or session info
          // and redirect them to the home page
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
      window.location = "/home";
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default SignInPage;
