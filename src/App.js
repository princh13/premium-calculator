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

  const installationOptions = [
    { amount: 100000, premium: 500 },
    { amount: 500000, premium: 1000 },
    { amount: 1000000, premium: 2000 },
  ];

  const calculateInstallationPremium = (selectedAmount) => {
    if (!selectedAmount) return;
    const option = installationOptions.find(
      (o) => o.amount === parseInt(selectedAmount)
    );
    setInstallationAmount(option.amount);
    setInstallationPremium(option.premium.toFixed(2));
  };

  // ---------------- Fleet Vehicles ----------------
  const vehicleRatesSmall = { PPV: 2500, "36 Class": 2000, "44/45 Class": 3500, "47 Class": 6000 };
  const vehicleRatesLarge = { PPV: 2000, "36 Class": 1500, "44/45 Class": 3000, "47 Class": 4000 };
  const trailerRates = { Large: 1000, Small: 500 };

  const [totalVehicles, setTotalVehicles] = useState("");
  const [fleetVehicles, setFleetVehicles] = useState([]);
  const [fleetPremium, setFleetPremium] = useState(null);

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCount, setVehicleCount] = useState("");
  const [numLargeTrailers, setNumLargeTrailers] = useState("");
  const [numSmallTrailers, setNumSmallTrailers] = useState("");

  const addVehicle = () => {
    if (!vehicleType || !vehicleCount) return;
    setFleetVehicles([...fleetVehicles, { type: vehicleType, count: parseInt(vehicleCount) }]);
    setVehicleType("");
    setVehicleCount("");
  };

  const calculateFleetPremium = () => {
    const isSmallFleet = parseInt(totalVehicles) <= 10;
    const rates = isSmallFleet ? vehicleRatesSmall : vehicleRatesLarge;
    let total = 0;

    fleetVehicles.forEach((v) => {
      total += v.count * rates[v.type];
    });

    // Add trailer premium separately
    total += (parseInt(numLargeTrailers) || 0) * trailerRates.Large;
    total += (parseInt(numSmallTrailers) || 0) * trailerRates.Small;

    setFleetPremium(total);
  };

  const resetFleet = () => {
    setTotalVehicles("");
    setFleetVehicles([]);
    setFleetPremium(null);
    setVehicleType("");
    setVehicleCount("");
    setNumLargeTrailers("");
    setNumSmallTrailers("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* --- Business Premium --- */}
      <CalculatorCard title="Business Premium Calculator">
        <label className="block mt-2">
          <span className="text-gray-700">Type of Business</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
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
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
            />
          </label>
        ) : (
          business && (
            <label className="block mt-2">
              <span className="text-gray-700">Select Rate</span>
              <select
                className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
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
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-2 mt-3 transition"
          onClick={calculateBusinessPremium}
        >
          Calculate Business Premium
        </button>

        {businessPremium && (
          <ResultBox>Calculated Business Premium: ${businessPremium}</ResultBox>
        )}
      </CalculatorCard>

      {/* --- Building Premium --- */}
      <CalculatorCard title="Building Premium Calculator">
        <label className="block mt-2">
          <span className="text-gray-700">Building Type</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={buildingType}
            onChange={(e) => {
              setBuildingType(e.target.value);
              setBuildingRate("");
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
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
              value={buildingRate}
              onChange={(e) => setBuildingRate(e.target.value)}
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
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={buildingValue}
            onChange={(e) => setBuildingValue(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg p-2 mt-3 transition"
          onClick={calculateBuildingPremium}
        >
          Calculate Building Premium
        </button>

        {buildingPremium && (
          <ResultBox>Calculated Building Premium: ${buildingPremium}</ResultBox>
        )}
      </CalculatorCard>

      {/* --- Contents Premium --- */}
      <CalculatorCard title="Contents / Stock / Equipment Premium">
        <label className="block mt-2">
          <span className="text-gray-700">Type</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={contentsType}
            onChange={(e) => {
              setContentsType(e.target.value);
              setContentsRate("");
            }}
          >
            <option value="">-- Select --</option>
            {Object.keys(contentsRates).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {contentsType && (
          <label className="block mt-2">
            <span className="text-gray-700">Rate</span>
            <select
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
              value={contentsRate}
              onChange={(e) => setContentsRate(e.target.value)}
            >
              <option value="">-- Select Rate --</option>
              {contentsRates[contentsType].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block mt-2">
          <span className="text-gray-700">Value ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={contentsValue}
            onChange={(e) => setContentsValue(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg p-2 mt-3 transition"
          onClick={calculateContentsPremium}
        >
          Calculate Contents Premium
        </button>

        {contentsPremium && (
          <ResultBox>Calculated Contents Premium: ${contentsPremium}</ResultBox>
        )}
      </CalculatorCard>

      {/* --- Contractors Equipment Premium --- */}
      <CalculatorCard title="Contractors Equipment Premium">
        <label className="block mt-2">
          <span className="text-gray-700">Value ($)</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={equipmentValue}
            onChange={(e) => setEquipmentValue(e.target.value)}
          />
        </label>

        <label className="block mt-2">
          <span className="text-gray-700">Rate</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={equipmentRate}
            onChange={(e) => setEquipmentRate(e.target.value)}
          >
            <option value="">-- Select Rate --</option>
            {equipmentRates.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <button
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg p-2 mt-3 transition"
          onClick={calculateEquipmentPremium}
        >
          Calculate Equipment Premium
        </button>

        {equipmentPremium && (
          <ResultBox>Calculated Equipment Premium: ${equipmentPremium}</ResultBox>
        )}
      </CalculatorCard>

      {/* --- Installation Floater --- */}
      <CalculatorCard title="Installation Floater">
        <label className="block mt-2">
          <span className="text-gray-700">Installation Amount</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={installationAmount}
            onChange={(e) => calculateInstallationPremium(e.target.value)}
          >
            <option value="">-- Select Amount --</option>
            {installationOptions.map((o) => (
              <option key={o.amount} value={o.amount}>
                ${o.amount.toLocaleString()} → Premium ${o.premium.toLocaleString()}
              </option>
            ))}
          </select>
        </label>

        {installationPremium && (
          <ResultBox>Installation Floater Premium: ${installationPremium}</ResultBox>
        )}
      </CalculatorCard>

      {/* --- Fleet Vehicles Premium --- */}
      <CalculatorCard title="Fleet Vehicles Premium">
        <label className="block mt-2">
          <span className="text-gray-700">Total Vehicles</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
            value={totalVehicles}
            onChange={(e) => setTotalVehicles(e.target.value)}
          />
        </label>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <span className="text-gray-700">Vehicle Type</span>
            <select
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">-- Select Type --</option>
              {["PPV", "36 Class", "44/45 Class", "47 Class"].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-gray-700"># of Vehicles</span>
            <input
              type="number"
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm"
              value={vehicleCount}
              onChange={(e) => setVehicleCount(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg p-2 transition"
              onClick={addVehicle}
            >
              Add Vehicle
            </button>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-gray-700">Trailers</span>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Large Trailers"
              className="block w-full border rounded-lg p-2 shadow-sm"
              value={numLargeTrailers}
              onChange={(e) => setNumLargeTrailers(e.target.value)}
            />
            <input
              type="number"
              placeholder="Small Trailers"
              className="block w-full border rounded-lg p-2 shadow-sm"
              value={numSmallTrailers}
              onChange={(e) => setNumSmallTrailers(e.target.value)}
            />
          </div>
        </div>

        {fleetVehicles.length > 0 && (
          <ul className="mt-3 list-disc list-inside">
            {fleetVehicles.map((v, idx) => (
              <li key={idx}>
                {v.count} × {v.type}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex gap-3">
          <button
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg p-2 transition"
            onClick={resetFleet}
          >
            Reset Fleet
          </button>
          <button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg p-2 transition"
            onClick={calculateFleetPremium}
          >
            Calculate Fleet Premium
          </button>
        </div>

        {fleetPremium !== null && <ResultBox>Total Fleet Premium: ${fleetPremium}</ResultBox>}
      </CalculatorCard>
    </div>
  );
}

// ---------------- Helper Components ----------------
const CalculatorCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">{children}</div>
);

const ResultBox = ({ children }) => (
  <div className="mt-2 p-3 bg-gray-100 rounded-lg font-semibold">{children}</div>
);

