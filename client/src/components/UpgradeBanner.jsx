import React from "react";

export default function UpgradeBanner({ onUpgrade }) {
  return (
    <div className="rounded-lg bg-yellow-50 border-l-4 border-yellow-300 p-4 mb-6 flex items-center justify-between">
      <div>
        <div className="font-semibold text-sm text-yellow-800">
          Upgrade to Pro
        </div>
        <div className="text-sm text-yellow-700 mt-1">
          Save unlimited scenarios, priority support and advanced insights.
        </div>
      </div>

      <div>
        <button
          onClick={onUpgrade}
          className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded-md text-sm"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}
