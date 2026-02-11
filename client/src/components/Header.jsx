import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("vl_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("vl_token");
    localStorage.removeItem("vl_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-[#28313B] relative z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar Sec */}
        <div className="flex items-center justify-between h-16">
          {/* Logo Sec */}
          <Link
            to="/dashboard"
            className="text-[#00c7ff] text-2xl font-medium md:mr-[2%]"
          >
            ValueLens
          </Link>

          <div className="menu-wrap w-full flex items-center justify-between max-md:justify-end">
            <nav className="hidden md:flex gap-6">
              <Link to="/dashboard" className="text-white hover:text-[#00c7ff]">
                Dashboard
              </Link>
              <Link
                to="/calculators"
                className="text-white hover:text-[#00c7ff]"
              >
                Calculators
              </Link>
              <Link to="/scenarios" className="text-white hover:text-[#00c7ff]">
                Saved
              </Link>
            </nav>

            <div className="flex items-center gap-4 max-md:pr-[10px]">
              {user ? (
                <span className=" sm:block text-[#00c7ff] text-sm">
                  {user.username || user.email}
                </span>
              ) : (
                <span className=" sm:block text-white/70 text-sm">Free</span>
              )}

              {user ? (
                <button onClick={logout} className="btn text-white">
                  Logout{" "}
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    {" "}
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    />{" "}
                  </svg>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn text-white max-md:p-[5px 10px]"
                >
                  Login{" "}
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    {" "}
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    />{" "}
                  </svg>
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                className="md:hidden relative w-8 h-8 flex items-center justify-center"
              >
                <span
                  className={`absolute h-0.5 w-6 bg-white transition-all duration-300
                ${menuOpen ? "rotate-45" : "-translate-y-2"}`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white transition-all duration-300
                ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white transition-all duration-300
                ${menuOpen ? "-rotate-45" : "translate-y-2"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out
          ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="py-4 space-y-3 border-t border-white/10">
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/calculators"
              onClick={() => setMenuOpen(false)}
              className="block text-white"
            >
              Calculators
            </Link>
            <Link
              to="/scenarios"
              onClick={() => setMenuOpen(false)}
              className="block text-white"
            >
              Saved
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
