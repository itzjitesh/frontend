import React from "react";

export default function OutputBlock({ text }) {
  function copy() {
    navigator.clipboard.writeText(text);
    alert("Copied executive summary to clipboard");
  }
  return (
    <div className="p-3 border rounded">
      <div className="whitespace-pre-wrap mb-3">{text}</div>
      <button
        onClick={copy}
        className="px-3 py-2 bg-green-600 text-white rounded"
      >
        Copy summary
      </button>
    </div>
  );
}
