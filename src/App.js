import { useState } from "react";

export default function App() {
  // Business premium states
  const [business, setBusiness] = useState("");
  const [revenue, setRevenue] = useState("");
  const [businessPremium, setBusinessPremium] = useState(null);

  const businessRates = {
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

  const calculateBusinessPremium = () => {
    if (!business || !revenue) return;
    const rate = businessRates[business];
    const premium = (parseFloat(revenue) / 1000) * rate;
    setBusinessPremium(premium.toFixed(2));
  };

  // Building premium states
  const [buildingType, setBuildingType] = useState("");
  const [buildingValue, setBuildingValue] = useState("");
  const [rate, setRate] = useState("");
  const [buildingPremium, setBuildingPremium] = useState(null);

  const buildingRates = {
    "Sprinkler System & Non Combustible": [0.05, 0.1, 0.15],
    "No Sprinkler System & Wood Frame": [0.25, 0.35, 0.5],
  };

  const calculateBuildingPremium = () => {
    if (!buildingType || !buildingValue || !rate) return;
    const premium = (parseFloat(buildingValue) / 100) * parseFloat(rate);
    setBuildingPremium(premium.toFixed(2));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6">
      {/* Business Section */}
      <div>
        <h2 className="text-xl font-bold">Business Premium Calculator</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Type of Business</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          >
            <option value="">-- Select --</option>
            {Object.keys(businessRates).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block mt-2">
          <span className="text-gray-700">Revenue ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-blue-600 text-white rounded p-2 mt-3"
          onClick={calculateBusinessPremium}
        >
          Calculate Business Premium
        </button>

        {businessPremium && (
          <div className="p-3 bg-gray-100 rounded mt-2">
            <strong>Calculated Business Premium:</strong> ${businessPremium}
          </div>
        )}
      </div>

      {/* Building Section */}
      <div>
        <h2 className="text-xl font-bold">Building Premium Calculator</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Building Type</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={buildingType}
            onChange={(e) => {
              setBuildingType(e.target.value);
              setRate(""); // reset rate
            }}
          >
            <option value="">-- Select --</option>
            {Object.keys(buildingRates).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {buildingType && (
          <label className="block mt-2">
            <span className="text-gray-700">Rate</span>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            >
              <option value="">-- Select Rate --</option>
              {buildingRates[buildingType].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block mt-2">
          <span className="text-gray-700">Building Value ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={buildingValue}
            onChange={(e) => setBuildingValue(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-green-600 text-white rounded p-2 mt-3"
          onClick={calculateBuildingPremium}
        >
          Calculate Building Premium
        </button>

        {buildingPremium && (
          <div className="p-3 bg-gray-100 rounded mt-2">
            <strong>Calculated Building Premium:</strong> ${buildingPremium}
          </div>
        )}
      </div>
    </div>
  );
}

