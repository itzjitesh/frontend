import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Calculators from "./pages/Calculators";
import SavedScenarios from "./pages/SavedScenarios";
import CampaignROI from "./pages/CampaignROI";
import CPA from "./pages/CPA";
import BillingSuccess from "./pages/BillingSuccess";
import "./styles/index.css";
// import Layout from "./components/Layout";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="calculators/campaign-roi" element={<CampaignROI />} />
          <Route path="calculators/cpa" element={<CPA />} />
          <Route path="scenarios" element={<SavedScenarios />} />
          <Route path="/billing/success" element={<BillingSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
