import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  StoreData,
  RetrieveData,
  RemoveStoredData,
  ClearAllStoredData,
} from "../utils/DbManager";
import CONSTANT from "../utils/constant";
import { useNavigate } from "react-router-dom"; 


export default function Navbar() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const logout = async () => {
    ClearAllStoredData();
    navigate("/login");
  };

  useEffect(() => {
    posh();
  }, []);

  // const logout = async () => {
  //   Alert.alert("Are you sure?", "Want to logout!", [
  //     {
  //       text: "Log me out",
  //       onPress: async () => {
  //         await ClearAllStoredData();
  //         navigation.closeDrawer();
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: "Login" }],
  //         });
  //       },
  //     },
  //     {
  //       text: "Stay logged in",
  //       style: "cancel",
  //     },
  //   ]);
  // };
  const posh = async () => {
    try {
      const data = RetrieveData(CONSTANT.USER);
      // Wait for both promises to resolve
      const [userdata] = await Promise.all([data]);
      // Check if data is null
      if (userdata === null) {
        return;
      }
      setUserData(userdata);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          style={{
            fontFamily: "Quicksand",
            fontWeight: "bold",
            color: "rgb(40, 167, 69)",
          }}
          href="/"
        >
          Admin Panel
        </a>
        {/* User Icon with Dropdown */}
        <div className="dropdown ms-auto">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="userMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontFamily: "Quicksand" }}
          >
            <FontAwesomeIcon icon={faUserCircle} size="lg" className="me-2" />
            {false ? "Hi! Guest" : `Hi! ${userData?.firstName}`}
          </button>
          <ul
            style={{ fontFamily: "Quicksand" }}
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="userMenu"
          >
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/setting">
                Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
