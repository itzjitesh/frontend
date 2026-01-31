import React, { useEffect, useState } from "react";
import { getCalculatorsList } from "../api/api";
import CalculatorCard from "../components/CalculatorCard";

export default function Calculators() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCalculatorsList().then((res) => {
      if (mounted) setList(res.data || []);
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calculators</h1>
        <p className="text-sm text-gray-600">Pick a calculator to start</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <CalculatorCard
            key={c.id}
            title={c.title}
            description={c.desc}
            path={`/calculators/${c.id}`}
          />
        ))}
      </div>
    </div>
  );
}
