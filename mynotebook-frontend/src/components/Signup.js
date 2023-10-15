import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

export default function Signup(props) {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.cpassword !== credentials.password) {
      alert("Passwords do no match");
      return;
    }
    const url = host + "/auth/createUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Successfully Account Created", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2>Sign Up To Use MyNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              aria-describedby="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              name="password"
              onChange={handleChange}
              className="form-control"
              id="password"
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              value={credentials.cpassword}
              name="cpassword"
              onChange={handleChange}
              className="form-control"
              id="cpassword"
              required
              minLength={5}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
