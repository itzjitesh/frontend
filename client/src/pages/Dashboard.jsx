import React from "react";
import CalculatorCard from "../components/CalculatorCard";
import UpgradeBanner from "../components/UpgradeBanner";
import { createCheckoutSession } from "../api/api";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("vl_user") || "null");

  const userId = user?._id || user?.id || user?.userId;

  async function handleUpgrade() {
    if (!user) return (window.location.hreft = "/login");
    try {
      const { data } = await createCheckoutSession({
        userId,
        email: user?.email,
      });
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout start failed", err);
      alert("Could not start checkout");
    }
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Optional banner for free users */}
      {user?.subscription?.tier !== "pro" && (
        <UpgradeBanner onUpgrade={handleUpgrade} />
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-600">Welcome back</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CalculatorCard
          title="Campaign ROI"
          description="Estimate ROI, CPA and revenue."
          path="/calculators/campaign-roi"
        />
        <CalculatorCard
          title="CPA Calculator"
          description="Quick CPA calculation."
          path="/calculators/cpa"
        />
        <CalculatorCard
          title="Saved Scenarios"
          description="View and manage saved scenarios."
          path="/scenarios"
        />
      </div>
    </div>
  );
}
