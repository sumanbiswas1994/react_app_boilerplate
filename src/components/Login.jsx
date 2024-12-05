import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-login.jpg";
import { callApi } from "../utils/ApiCaller";
import API from "../utils/URL";
import { InfinitySpin } from "react-loader-spinner";
import ToastService from "../utils/ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../features/auth/authSlice";
import { StoreData, RetrieveData, RemoveStoredData, ClearAllStoredData } from '../utils/DbManager';
import CONSTANT from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    var payload = {
      email: email,
      password: password,
    };
    setLoading(true);
    callApi({
      endpoint: API.LOGIN,
      method: "POST",
      body: payload,
    })
      .then(async (response, type) => {
        setLoading(false);
        if (response !== "Network Error") {
          const { code, success, data } = response.response;
          if (code == "200") {
            if (success) {
              await StoreData(CONSTANT.TOKEN, data?.token);
              await StoreData(CONSTANT.USER, data.user);
              dispatch(
                login({
                  user: data.user,
                  token: data.token,
                })
              );
              navigate("/dashboard");
              ToastService.success("Logged in Successfully!");
            }
          } else {
            alert("Error!,Please check response for error");
          }
        }
      })
      .catch((err) => {
        alert("Try Catch Error!,Please check response for error");
        console.warn(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          backgroundColor: "#f8f9fa", // Optional background color
        }}
      >
        <ToastContainer />

        <InfinitySpin
          visible={loading}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div style={styles.loginCard}>
            <div className="text-center mb-4">
              <img
                src={logo} // Logo
                alt="Logo"
                style={styles.logo}
              />
            </div>
            <h3
              style={{ fontFamily: "Quicksand", fontSize: 20 }}
              className="text-center mb-3"
            >
              Login To Ifield Application
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="d-block text-start mb-1" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="d-block text-start mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              <div className="text-center mt-3">
                <small>
                  <a href="/forgot-password" style={styles.link}>
                    Forgot Password?
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline CSS styles for login form
const styles = {
  loginCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "40px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  logo: {
    width: "120px", // Adjust logo size
    height: "auto",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Login;
