import { useState } from "react";
import supabase from "../client";
import "./SignUp.css";

const SignUpPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.firstname) tempErrors.firstname = "First name is required.";
    if (!form.lastname) tempErrors.lastname = "Last name is required.";
    if (!form.email) tempErrors.email = "Email is required.";
    if (form.password.length < 6)
      tempErrors.password = "Password should be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      tempErrors.confirmPassword = "Passwords must match.";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const { firstname, lastname, email, password } = form;

        const { data, error } = await supabase
          .from("Twitter-clone") // Table name should be correct
          .insert([
            {
              firstname,
              lastname,
              email,
              password, // You should ideally hash the password before storing it
            },
          ])
          .single(); // Expecting a single result (no need to use `.select()` here)

        if (error) {
          throw error; // Log the error if insertion fails
        }

        // Redirect user or show success message
        console.log("User registered successfully:", data);
        window.location = "/home"; // Redirect to the home page after successful signup
      } catch (error) {
        console.error("Error:", error.message);
        setErrorMessage("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.firstname && <p className="error">{errors.firstname}</p>}

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.lastname && <p className="error">{errors.lastname}</p>}

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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
