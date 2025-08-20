import { useState } from "react";

export default function App() {
  const [business, setBusiness] = useState("");
  const [revenue, setRevenue] = useState("");
  const [premium, setPremium] = useState(null);

  const rates = {
    Electrical: 2.5,
    Drywall: 1.5,
    Excavation: 6,
    "Flooring Contractor": 1.5,
    Plumbing: 10,
    "Grading & Site Preparation": 4,
    "Bricklaying & Masonry": 1.5,
    Landscaping: 2.5,
    "HVAC Contractor": 8,
    "Custom Home Builder": 2,
    "Painting Contractor": 2.5,
    Manufacturing: 2,
  };

  const calculatePremium = () => {
    if (!business || !revenue) return;
    const rate = rates[business];
    const calc = (parseFloat(revenue) / 1000) * rate;
    setPremium(calc.toFixed(2));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Premium Calculator</h2>

      <label className="block">
        <span className="text-gray-700">Type of Business</span>
        <select
          className="mt-1 block w-full border rounded p-2"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        >
          <option value="">-- Select --</option>
          {Object.keys(rates).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Revenue ($)</span>
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
        />
      </label>

      <button
        className="w-full bg-blue-600 text-white rounded p-2"
        onClick={calculatePremium}
      >
        Calculate Premium
      </button>

      {premium && (
        <div className="p-3 bg-gray-100 rounded">
          <p>
            <strong>Calculated Premium:</strong> ${premium}
          </p>
        </div>
      )}
    </div>
  );
}

