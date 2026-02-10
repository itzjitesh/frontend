// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const nav = useNavigate();
//   const user = JSON.parse(localStorage.getItem("vl_user") || null);

//   function logout() {
//     localStorage.removeItem("vl_token");
//     localStorage.removteItem("vl_user");
//     nav("/login");
//   }
//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <div
//           className="text-xl font-extrabold text-blue-600 cursor-pointer"
//           onClick={() => nav("/dashboard")}
//         >
//           ValueLens
//         </div>

//         {user && (
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-gray-600">{user.email}</span>
//             <button
//               onClick={logout}
//               className="text-sm font-medium text-red-600 hover:underline"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
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
    <header className="head-wrap bg-[#28313B]">
      <div className="page-center">
        <div className="cont1 flex items-center gap-10">
          <div className="logo-section w-auto">
            <Link to="/" className="text-[#00c7ff] text-2xl font-[500]">
              ValueLens
            </Link>
          </div>
          <div className="nav-items flex items-center justify-between w-[100%]">
            <div className="nav-left ">
              <Link to="#" className="text-white">
                {" "}
                Dashboard
              </Link>
              <Link to="#" className="text-white">
                Saved
              </Link>
              <Link to="#" className="text-white">
                Calculators
              </Link>
            </div>
            <div className="nav-right flex gap-4 items-center">
              <Link to="#" className="text-white">
                Free
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
