import CalculatorCard from "../components/CalculatorCard";
import ProBadge from "../components/ProBadge";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ProBadge />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CalculatorCard
          title="Campaign ROI"
          description="Calculate ROI, CPA, and revenue impact."
          path="/calculators/campaign-roi"
        />

        {/* Future calculators */}
        <CalculatorCard
          title="Coming Soon"
          description="More calculators are on the way."
          path="#"
        />
      </div>
    </>
  );
}
