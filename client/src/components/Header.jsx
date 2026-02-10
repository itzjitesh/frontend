import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("vl_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("vl_token");
    localStorage.removeItem("vl_user");
    setUser(null);
    navigate("/login");
  }

  return (
    <header className="head-wrap bg-[#28313B]">
      <div className="page-center">
        <div className="cont1 flex items-center gap-10">
          <div className="logo-section w-auto">
            <Link
              to="/dashboard"
              className="text-[#00c7ff] text-2xl font-[500]"
            >
              ValueLens
            </Link>
          </div>

          <div className="nav-items flex items-center justify-between w-full">
            <div className="nav-left flex gap-6">
              <Link to="dashboard" className="text-white">
                Dashboard
              </Link>

              <Link to="/calculators" className="text-white">
                Calculators
              </Link>

              <Link to="/scenarios" className="text-white">
                Saved
              </Link>
            </div>

            <div className="nav-right flex gap-4 items-center">
              {user ? (
                <span className="text-[#00c7ff] font-medium">
                  {user.username || user.email}
                </span>
              ) : (
                <Link to="#" className="text-white">
                  Free
                </Link>
              )}

              {user ? (
                <Link
                  to="/"
                  onClick={logout}
                  className="btn flex items-center gap-2 hover:text-white"
                >
                  <span>Logout</span>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </Link>
              ) : (
                <Link to="/login" className="btn text-white">
                  <span>Login</span>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
