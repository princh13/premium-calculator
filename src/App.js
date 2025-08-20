import { useState } from "react";

export default function App() {
  // ---------------- Business Premium ----------------
  const [business, setBusiness] = useState("");
  const [revenue, setRevenue] = useState("");
  const [businessRate, setBusinessRate] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [businessPremium, setBusinessPremium] = useState(null);

  const businessRates = {
    Electrical: [2.5],
    Drywall: [1.5],
    Excavation: [6],
    "Flooring Contractor": [1.5],
    Plumbing: [10],
    "Grading & Site Preparation": [4],
    "Bricklaying & Masonry": [1.5],
    Landscaping: [2.5],
    "HVAC Contractor": [8],
    "Custom Home Builder": [2],
    "Painting Contractor": [2.5],
    Manufacturing: [2],
  };

  const calculateBusinessPremium = () => {
    if (!business || (!businessRate && business !== "Other")) return;
    const rate = business === "Other" ? parseFloat(customRate) : parseFloat(businessRate);
    if (!rate) return;
    const premium = (parseFloat(revenue) / 1000) * rate;
    setBusinessPremium(premium.toFixed(2));
  };

  // ---------------- Building Premium ----------------
  const [buildingType, setBuildingType] = useState("");
  const [buildingValue, setBuildingValue] = useState("");
  const [buildingRate, setBuildingRate] = useState("");
  const [buildingPremium, setBuildingPremium] = useState(null);

  const buildingRates = {
    "Sprinkler System & Non Combustible": [0.05, 0.1, 0.15],
    "No Sprinkler System & Wood Frame": [0.25, 0.35, 0.5],
  };

  const calculateBuildingPremium = () => {
    if (!buildingType || !buildingValue || !buildingRate) return;
    const premium = (parseFloat(buildingValue) / 100) * parseFloat(buildingRate);
    setBuildingPremium(premium.toFixed(2));
  };

  // ---------------- Contents / Stock / Equipment ----------------
  const [contentsType, setContentsType] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const [contentsRate, setContentsRate] = useState("");
  const [contentsPremium, setContentsPremium] = useState(null);

  const contentsRates = {
    "Sprinkler & Non-Combustible": [0.05, 0.15],
    "Non-sprinkler & Wood Frame": [0.25, 0.5],
  };

  const calculateContentsPremium = () => {
    if (!contentsType || !contentsValue || !contentsRate) return;
    const premium = (parseFloat(contentsValue) / 100) * parseFloat(contentsRate);
    setContentsPremium(premium.toFixed(2));
  };

  // ---------------- Contractors Equipment ----------------
  const [equipmentValue, setEquipmentValue] = useState("");
  const [equipmentRate, setEquipmentRate] = useState("");
  const [equipmentPremium, setEquipmentPremium] = useState(null);

  const equipmentRates = [0.45, 1];

  const calculateEquipmentPremium = () => {
    if (!equipmentValue || !equipmentRate) return;
    const premium = (parseFloat(equipmentValue) / 100) * parseFloat(equipmentRate);
    setEquipmentPremium(premium.toFixed(2));
  };

  // ---------------- Installation Floater ----------------
  const [installationAmount, setInstallationAmount] = useState("");
  const [installationPremium, setInstallationPremium] = useState(null);

  const installationTable = [
    { amount: 100000, premium: 500 },
    { amount: 500000, premium: 1000 },
    { amount: 1000000, premium: 2000 },
  ];

  const calculateInstallationPremium = () => {
    if (!installationAmount) return;
    const closest = installationTable.reduce((prev, curr) =>
      Math.abs(curr.amount - installationAmount) < Math.abs(prev.amount - installationAmount)
        ? curr
        : prev
    );
    setInstallationPremium(closest.premium.toFixed(2));
  };

  // ---------------- Fleet Vehicles ----------------
  const [totalVehicles, setTotalVehicles] = useState("");
  const [fleetVehicles, setFleetVehicles] = useState([]);
  const [fleetPremium, setFleetPremium] = useState(null);

  const smallFleetRates = {
    PPV: 2500,
    "36 Class": 2000,
    "44/45 Class": 3500,
    "47 Class": 6000,
    "Large Trailers": 1000,
    "Small Trailers": 500,
  };

  const largeFleetRates = {
    PPV: 2000,
    "36 Class": 1500,
    "44/45 Class": 3000,
    "47 Class": 4000,
    "Large Trailers": 1000,
    "Small Trailers": 500,
  };

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCount, setVehicleCount] = useState("");

  const addVehicle = () => {
    if (!vehicleType || !vehicleCount) return;
    setFleetVehicles([...fleetVehicles, { type: vehicleType, count: parseInt(vehicleCount) }]);
    setVehicleType("");
    setVehicleCount("");
  };

  const calculateFleetPremium = () => {
    const isSmallFleet = parseInt(totalVehicles) <= 10;
    const rates = isSmallFleet ? smallFleetRates : largeFleetRates;
    let total = 0;
    fleetVehicles.forEach((v) => {
      total += v.count * rates[v.type];
    });
    setFleetPremium(total);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6">

      {/* --- Business Premium --- */}
      <div>
        <h2 className="text-xl font-bold">Business Premium Calculator</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Type of Business</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={business}
            onChange={(e) => {
              setBusiness(e.target.value);
              setBusinessRate("");
              setCustomRate("");
            }}
          >
            <option value="">-- Select --</option>
            {Object.entries(businessRates).map(([type, rates]) => (
              <option key={type} value={type}>
                {type} ({rates.join(", ")})
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>

        {business === "Other" ? (
          <label className="block mt-2">
            <span className="text-gray-700">Custom Rate</span>
            <input
              type="number"
              className="mt-1 block w-full border rounded p-2"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
            />
          </label>
        ) : (
          business && (
            <label className="block mt-2">
              <span className="text-gray-700">Select Rate</span>
              <select
                className="mt-1 block w-full border rounded p-2"
                value={businessRate}
                onChange={(e) => setBusinessRate(e.target.value)}
              >
                <option value="">-- Select Rate --</option>
                {businessRates[business].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          )
        )}

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

      {/* --- Building Premium --- */}
      <div>
        <h2 className="text-xl font-bold">Building Premium Calculator</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Building Type</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={buildingType}
            onChange={(e) => {
              setBuildingType(e.target.value);
              setBuildingRate("");
            }}
          >
            <option value="">-- Select --</option>
            {Object.keys(buildingRates).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        {buildingType && (
          <label className="block mt-2">
            <span className="text-gray-700">Rate</span>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={buildingRate}
              onChange={(e) => setBuildingRate(e.target.value)}
            >
              <option value="">-- Select Rate --</option>
              {buildingRates[buildingType].map((r) => (
                <option key={r} value={r}>{r}</option>
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

      {/* --- Contents Premium --- */}
      <div>
        <h2 className="text-xl font-bold">Contents / Stock / Equipment / EDP / Customer Goods Premium</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Type</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={contentsType}
            onChange={(e) => {
              setContentsType(e.target.value);
              setContentsRate("");
            }}
          >
            <option value="">-- Select --</option>
            {Object.keys(contentsRates).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        {contentsType && (
          <label className="block mt-2">
            <span className="text-gray-700">Rate</span>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={contentsRate}
              onChange={(e) => setContentsRate(e.target.value)}
            >
              <option value="">-- Select Rate --</option>
              {contentsRates[contentsType].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
        )}

        <label className="block mt-2">
          <span className="text-gray-700">Value ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={contentsValue}
            onChange={(e) => setContentsValue(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-purple-600 text-white rounded p-2 mt-3"
          onClick={calculateContentsPremium}
        >
          Calculate Contents Premium
        </button>

        {contentsPremium && (
          <div className="p-3 bg-gray-100 rounded mt-2">
            <strong>Calculated Contents Premium:</strong> ${contentsPremium}
          </div>
        )}
      </div>

      {/* --- Contractors Equipment --- */}
      <div>
        <h2 className="text-xl font-bold">Contractors Equipment Premium</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Value ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={equipmentValue}
            onChange={(e) => setEquipmentValue(e.target.value)}
          />
        </label>

        <label className="block mt-2">
          <span className="text-gray-700">Rate</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={equipmentRate}
            onChange={(e) => setEquipmentRate(e.target.value)}
          >
            <option value="">-- Select Rate --</option>
            {equipmentRates.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <button
          className="w-full bg-indigo-600 text-white rounded p-2 mt-3"
          onClick={calculateEquipmentPremium}
        >
          Calculate Equipment Premium
        </button>

        {equipmentPremium && (
          <div className="p-3 bg-gray-100 rounded mt-2">
            <strong>Calculated Equipment Premium:</strong> ${equipmentPremium}
          </div>
        )}
      </div>

      {/* --- Installation Floater --- */}
      <div>
        <h2 className="text-xl font-bold">Installation Floater Premium</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Installation Amount ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={installationAmount}
            onChange={(e) => setInstallationAmount(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-yellow-600 text-white rounded p-2 mt-3"
          onClick={calculateInstallationPremium}
        >
          Calculate Installation Premium
        </button>

        {installationPremium && (
          <div className="p-3 bg-gray-100 rounded mt-2">
            <strong>Calculated Installation Premium:</strong> ${installationPremium}
          </div>
        )}
      </div>

      {/* --- Fleet Vehicles --- */}
      <div>
        <h2 className="text-xl font-bold">Fleet Vehicles Premium</h2>

        <label className="block mt-2">
          <span className="text-gray-700">Total Number of Vehicles</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={totalVehicles}
            onChange={(e) => setTotalVehicles(e.target.value)}
          />
        </label>

        <label className="block mt-2">
          <span className="text-gray-700">Vehicle Type</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">-- Select Vehicle Type --</option>
            {[
              "PPV",
              "36 Class",
              "44/45 Class",
              "47 Class",
              "Large Trailers",
              "Small Trailers",
            ].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className="block mt-2">
          <span className="text-gray-700">Number of this Vehicle</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={vehicleCount}
            onChange={(e) => setVehicleCount(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-pink-600 text-white rounded p-2 mt-2"
          onClick={addVehicle}
        >
          Add Vehicle
        </button>

        {fleetVehicles.length > 0 && (
          <div className="mt-2">
            <ul className="list-disc list-inside">
              {fleetVehicles.map((v, idx) => (
                <li key={idx}>
                  {v.count} × {v.type}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="w-full bg-red-600 text-white rounded p-2 mt-3"
          onClick={calculateFleetPremium}
        >
          Calculate Fleet Premium
        </button>

        {fleetPremium !== null && (
          <div className="p-3 bg-gray-100 rounded mt-2">
            <strong>Total Fleet Premium:</strong> ${fleetPremium}
          </div>
        )}
      </div>

    </div>
  );
}
