import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = host + "/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Successfully Signed In", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2>Login To Use MyNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
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
