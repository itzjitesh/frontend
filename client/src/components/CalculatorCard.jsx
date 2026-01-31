import React from "react";
import { useNavigate } from "react-router-dom";

export default function CalculatorCard({ title, description, path }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => path && nav(path)}
      className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => nav(path)}
          className="inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded"
        >
          Open
        </button>
        <button className="inline-block px-3 py-1 text-sm border rounded">
          Preview
        </button>
      </div>
    </div>
  );
}
