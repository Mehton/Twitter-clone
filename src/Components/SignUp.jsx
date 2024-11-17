import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  //   const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required.";
    if (!form.email) tempErrors.email = "Email is required.";
    if (form.password.length < 6)
      tempErrors.password = "Password should be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      tempErrors.confirmPassword = "Passwords must match.";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // if (Object.keys(validationErrors).length === 0) {
    //   // Call your API for sign-up here
    //   console.log("Form submitted:", form);
    //   navigate("/home"); // Redirect after successful sign-up
    // }
  };

  return (
    <div className="sign-up-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
