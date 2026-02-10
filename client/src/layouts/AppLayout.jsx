// import { Outlet, useNavigate, Link } from "react-router-dom";

// export default function AppLayout() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("vl_user") || "null");

//   function logout() {
//     localStorage.removeItem("vl_token");
//     localStorage.removeItem("vl_user");
//     navigate("/login");
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <header className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-6">
//             <Link to="/dashboard" className="text-xl font-bold text-blue-600">
//               ValueLens
//             </Link>

//             <nav className="hidden md:flex gap-4 text-sm">
//               <Link to="/dashboard" className="hover:text-blue-600">
//                 Dashboard
//               </Link>
//               <Link to="/calculators" className="hover:text-blue-600">
//                 Calculators
//               </Link>
//               <Link to="/scenarios" className="hover:text-blue-600">
//                 Saved
//               </Link>
//             </nav>
//           </div>

//           <div className="flex items-center gap-4">
//             {user?.subscription?.tier === "pro" ? (
//               <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
//                 PRO
//               </span>
//             ) : (
//               <span className="px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded">
//                 Free
//               </span>
//             )}

//             <div className="text-sm text-gray-600 hidden sm:block">
//               {user?.email}
//             </div>
//             <button
//               onClick={logout}
//               className="text-sm text-gray-600 hover:text-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1">
//         <Outlet />
//       </main>

//       <footer className="bg-white border-t">
//         <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
//           <span>© {new Date().getFullYear()} ValueLens</span>
//           <span>Campaign ROI & Business Value Calculators</span>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { Outlet, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function AppLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("vl_user") || "null");

  function logout() {
    localStorage.removeItem("vl_token");
    localStorage.removeItem("vl_user");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <Banner />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
