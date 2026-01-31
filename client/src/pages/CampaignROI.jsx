import React, { useState } from "react";
import {
  runCampaignROI,
  saveScenario,
  createCheckoutSession,
} from "../api/api";

export default function CampaignROI() {
  const [spend, setSpend] = useState("");
  const [conversions, setConversions] = useState("");
  const [rpp, setRpp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);

  async function handleCalculate(e) {
    e.preventDefault();
    setLoading(true);
    setResp(null);

    try {
      const { data } = await runCampaignROI({
        spend: Number(spend || 0),
        conversions: Number(conversions || 0),
        revenuePerConversion: Number(rpp || 0),
      });
      setResp(data);
    } catch (err) {
      alert(err.response?.data?.message || "Calculation failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const token = localStorage.getItem("vl_token");
    const user = JSON.parse(localStorage.getItem("vl_user") || "null");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      await saveScenario({
        calculator: "campaign-roi",
        inputs: resp.inputs,
        output: resp.result,
        narrative: resp.narrative,
      });

      alert("Scenario saved successfully!");
    } catch (err) {
      if (err.response?.status === 402) {
        const proceed = window.confirm(
          "Free plan allows only 1 saved scenario.\nUpgrade to Pro?",
        );
        if (!proceed) return;

        try {
          const { data } = await createCheckoutSession({
            userId: user?.id,
            email: user?.email,
          });
          window.location.href = data.url;
        } catch (checkoutErr) {
          alert("Could not start checkout");
          console.error(checkoutErr);
        }
      } else {
        alert(err.response?.data?.message || "Could not save scenario");
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Campaign ROI Calculator
        </h1>
        <p className="text-gray-600 mt-1">
          Estimate revenue impact, ROI, and efficiency of your marketing
          campaign.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Campaign Inputs
          </h2>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spend (USD)
              </label>
              <input
                type="number"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conversions
              </label>
              <input
                type="number"
                value={conversions}
                onChange={(e) => setConversions(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Revenue per Conversion (USD)
              </label>
              <input
                type="number"
                value={rpp}
                onChange={(e) => setRpp(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 80"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Calculating…" : "Calculate ROI"}
            </button>
          </form>
        </div>

        {/* Output */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>

          {!resp && (
            <div className="text-sm text-gray-500">
              Run the calculation to see results and executive summary.
            </div>
          )}

          {resp && (
            <>
              {/* KPI Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">Revenue</div>
                  <div className="text-xl font-semibold text-gray-900">
                    ${resp.result.totalRevenue}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">ROI</div>
                  <div className="text-xl font-semibold text-green-600">
                    {resp.result.roi}%
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">CPA</div>
                  <div className="text-xl font-semibold text-gray-900">
                    ${resp.result.cpa}
                  </div>
                </div>
              </div>

              {/* Narrative */}
              <div className="border rounded-lg p-4 mb-4 bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap">
                {resp.narrative}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Save Scenario
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(resp.narrative);
                    alert("Summary copied to clipboard");
                  }}
                  className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Copy Summary
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
