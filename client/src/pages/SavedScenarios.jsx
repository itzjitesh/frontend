import React, { useEffect, useState } from "react";
import { getScenarios, deleteScenario } from "../api/api";

export default function SavedScenarios() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await getScenarios();
      setList(data || []);
    } catch (err) {
      console.error("Could not fetch scenarios:", err);
      alert(err.response?.data?.message || "Could not fetch scenarios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this scenario?")) return;
    try {
      await deleteScenario(id);
      setList((s) => s.filter((x) => x._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Saved Scenarios</h1>
      </div>

      {loading ? (
        <div className="text-sm text-gray-600">Loading…</div>
      ) : list.length === 0 ? (
        <div className="text-sm text-gray-600">No saved scenarios yet.</div>
      ) : (
        <div className="grid gap-4">
          {list.map((s) => (
            <div key={s._id} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div style={{ flex: 1 }}>
                  <div className="text-sm text-gray-500">
                    {s.calculator} • {new Date(s.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-2 text-sm font-medium whitespace-pre-wrap">
                    {s.narrative || JSON.stringify(s.output)}
                  </div>
                </div>

                <div className="ml-4 flex gap-2">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        s.narrative || JSON.stringify(s.output),
                      )
                    }
                    className="px-3 py-1 text-sm border rounded"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-3 py-1 text-sm text-red-600 rounded border"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
