import React, { useState } from "react";
import { runCPA, saveScenario, createCheckoutSession } from "../api/api";

export default function CPA() {
  const [spend, setSpend] = useState("");
  const [conversions, setConversions] = useState("");
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCalculate(e) {
    e.preventDefault();
    setLoading(true);
    setResp(null);

    try {
      const { data } = await runCPA({
        spend: Number(spend),
        conversions: Number(conversions),
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
        calculator: "cpa",
        inputs: resp.inputs,
        output: resp.result,
        narrative: resp.narrative,
      });
      alert("Saved successfully!");
    } catch (err) {
      if (err.response?.status === 402) {
        const proceed = window.confirm(
          "Free tier limit reached. Upgrade to Pro?",
        );
        if (!proceed) return;

        const { data } = await createCheckoutSession({
          userId: user?.id,
          email: user?.email,
        });

        window.location.href = data.url;
      } else {
        alert("Could not save scenario");
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
      {/* INPUT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">CPA Inputs</h2>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Total Spend ($)</label>
            <input
              type="number"
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Conversions</label>
            <input
              type="number"
              value={conversions}
              onChange={(e) => setConversions(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Calculating..." : "Calculate CPA"}
          </button>
        </form>
      </div>

      {/* OUTPUT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Result</h2>

        {!resp ? (
          <p className="text-sm text-gray-500">
            Run the calculation to see results.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm">
                <strong>CPA:</strong> ${resp.result.cpa}
              </p>
            </div>

            <div className="p-3 border rounded mb-4">
              <pre className="whitespace-pre-wrap text-sm">
                {resp.narrative}
              </pre>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(resp.narrative);
                  alert("Copied");
                }}
                className="px-4 py-2 border rounded"
              >
                Copy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
