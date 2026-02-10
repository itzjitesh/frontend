import { useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("vl_user") || null);

  function logout() {
    localStorage.removeItem("vl_token");
    localStorage.removteItem("vl_user");
    nav("/login");
  }
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="text-xl font-extrabold text-blue-600 cursor-pointer"
          onClick={() => nav("/dashboard")}
        >
          ValueLens
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
