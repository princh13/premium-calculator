import { useState } from "react";

export default function App() {
  // ---------------- Business ----------------
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
    const rate = business === "Other" ? parseFloat(customRate) : parseFloat(businessRate);
    if (!rate || !revenue) return;
    const premium = (parseFloat(revenue) / 1000) * rate;
    setBusinessPremium(premium.toFixed(2));
  };

  // ---------------- Building ----------------
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

  // ---------------- Contents ----------------
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

  // ---------------- Equipment ----------------
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
    const option = installationOptions.find((o) => o.amount === parseInt(selectedAmount));
    if (!option) return;
    setInstallationAmount(option.amount);
    setInstallationPremium(option.premium.toFixed(2));
  };

  // ---------------- Fleet ----------------
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
    fleetVehicles.forEach((v) => total += v.count * rates[v.type]);
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
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <CalculatorCard title="Business Premium">
        <BusinessSection {...{business, setBusiness, businessRate, setBusinessRate, customRate, setCustomRate, revenue, setRevenue, businessRates, businessPremium, calculateBusinessPremium}} />
      </CalculatorCard>

      <CalculatorCard title="Building Premium">
        <BuildingSection {...{buildingType, setBuildingType, buildingValue, setBuildingValue, buildingRate, setBuildingRate, buildingRates, buildingPremium, calculateBuildingPremium}} />
      </CalculatorCard>

      <CalculatorCard title="Contents / Stock / Equipment">
        <ContentsSection {...{contentsType, setContentsType, contentsValue, setContentsValue, contentsRate, setContentsRate, contentsRates, contentsPremium, calculateContentsPremium}} />
      </CalculatorCard>

      <CalculatorCard title="Contractors Equipment">
        <EquipmentSection {...{equipmentValue, setEquipmentValue, equipmentRate, setEquipmentRate, equipmentRates, equipmentPremium, calculateEquipmentPremium}} />
      </CalculatorCard>

      <CalculatorCard title="Installation Floater">
        <InstallationSection {...{installationAmount, installationPremium, calculateInstallationPremium, installationOptions}} />
      </CalculatorCard>

      <CalculatorCard title="Fleet Vehicles">
        <FleetSection {...{totalVehicles, setTotalVehicles, vehicleType, setVehicleType, vehicleCount, setVehicleCount, fleetVehicles, addVehicle, resetFleet, numLargeTrailers, setNumLargeTrailers, numSmallTrailers, setNumSmallTrailers, fleetPremium, calculateFleetPremium}} />
      </CalculatorCard>
    </div>
  );
}

// ---------------- Helper Components ----------------
const CalculatorCard = ({ children, title }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
    <h2 className="text-xl font-bold">{title}</h2>
    {children}
  </div>
);

const ResultBox = ({ children }) => (
  <div className="mt-3 p-3 bg-blue-50 text-blue-700 font-bold rounded-lg text-lg">{children}</div>
);

// ---------------- Section Components ----------------
const BusinessSection = ({ business, setBusiness, businessRate, setBusinessRate, customRate, setCustomRate, revenue, setRevenue, businessRates, businessPremium, calculateBusinessPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={business} onChange={(e) => { setBusiness(e.target.value); setBusinessRate(""); setCustomRate(""); }}>
      <option value="">-- Type of Business --</option>
      {Object.entries(businessRates).map(([type, rates]) => <option key={type} value={type}>{type} ({rates.join(", ")})</option>)}
      <option value="Other">Other</option>
    </select>
    {business === "Other" && <input type="number" placeholder="Custom Rate" className="w-full border rounded p-2 mb-2" value={customRate} onChange={(e) => setCustomRate(e.target.value)} />}
    {business !== "Other" && business && <select className="w-full border rounded p-2 mb-2" value={businessRate} onChange={(e) => setBusinessRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {businessRates[business].map((rate) => <option key={rate} value={rate}>{rate}</option>)}
    </select>}
    <input type="number" placeholder="Revenue" className="w-full border rounded p-2 mb-2" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateBusinessPremium}>Calculate</button>
    {businessPremium !== null && <ResultBox>Business Premium: ${businessPremium}</ResultBox>}
  </>
);

const BuildingSection = ({ buildingType, setBuildingType, buildingValue, setBuildingValue, buildingRate, setBuildingRate, buildingRates, buildingPremium, calculateBuildingPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={buildingType} onChange={(e) => { setBuildingType(e.target.value); setBuildingRate(""); }}>
      <option value="">-- Building Type --</option>
      {Object.entries(buildingRates).map(([type, rates]) => <option key={type} value={type}>{type} ({rates.join(", ")})</option>)}
    </select>
    {buildingType && <select className="w-full border rounded p-2 mb-2" value={buildingRate} onChange={(e) => setBuildingRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {buildingRates[buildingType].map((rate) => <option key={rate} value={rate}>{rate}</option>)}
    </select>}
    <input type="number" placeholder="Building Value" className="w-full border rounded p-2 mb-2" value={buildingValue} onChange={(e) => setBuildingValue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateBuildingPremium}>Calculate</button>
    {buildingPremium !== null && <ResultBox>Building Premium: ${buildingPremium}</ResultBox>}
  </>
);

const ContentsSection = ({ contentsType, setContentsType, contentsValue, setContentsValue, contentsRate, setContentsRate, contentsRates, contentsPremium, calculateContentsPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={contentsType} onChange={(e) => { setContentsType(e.target.value); setContentsRate(""); }}>
      <option value="">-- Contents Type --</option>
      {Object.entries(contentsRates).map(([type, rates]) => <option key={type} value={type}>{type} ({rates.join(", ")})</option>)}
    </select>
    {contentsType && <select className="w-full border rounded p-2 mb-2" value={contentsRate} onChange={(e) => setContentsRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {contentsRates[contentsType].map((rate) => <option key={rate} value={rate}>{rate}</option>)}
    </select>}
    <input type="number" placeholder="Contents Value" className="w-full border rounded p-2 mb-2" value={contentsValue} onChange={(e) => setContentsValue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateContentsPremium}>Calculate</button>
    {contentsPremium !== null && <ResultBox>Contents Premium: ${contentsPremium}</ResultBox>}
  </>
);

const EquipmentSection = ({ equipmentValue, setEquipmentValue, equipmentRate, setEquipmentRate, equipmentRates, equipmentPremium, calculateEquipmentPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={equipmentRate} onChange={(e) => setEquipmentRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {equipmentRates.map((rate) => <option key={rate} value={rate}>{rate}</option>)}
    </select>
    <input type="number" placeholder="Equipment Value" className="w-full border rounded p-2 mb-2" value={equipmentValue} onChange={(e) => setEquipmentValue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateEquipmentPremium}>Calculate</button>
    {equipmentPremium !== null && <ResultBox>Equipment Premium: ${equipmentPremium}</ResultBox>}
  </>
);

const InstallationSection = ({ installationAmount, installationPremium, calculateInstallationPremium, installationOptions }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={installationAmount} onChange={(e) => calculateInstallationPremium(e.target.value)}>
      <option value="">-- Installation Amount --</option>
      {installationOptions.map((opt) => <option key={opt.amount} value={opt.amount}>${opt.amount.toLocaleString()}</option>)}
    </select>
    {installationPremium !== null && <ResultBox>Installation Floater Premium: ${installationPremium}</ResultBox>}
  </>
);

const FleetSection = ({ totalVehicles, setTotalVehicles, vehicleType, setVehicleType, vehicleCount, setVehicleCount, fleetVehicles, addVehicle, resetFleet, numLargeTrailers, setNumLargeTrailers, numSmallTrailers, setNumSmallTrailers, fleetPremium, calculateFleetPremium }) => (
  <>
    <input type="number" placeholder="Total Vehicles" className="w-full border rounded p-2 mb-2" value={totalVehicles} onChange={(e) => setTotalVehicles(e.target.value)} />
    <div className="flex gap-2 mb-2">
      <select className="flex-1 border rounded p-2" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
        <option value="">-- Vehicle Type --</option>
        <option value="PPV">PPV</option>
        <option value="36 Class">36 Class</option>
        <option value="44/45 Class">44/45 Class</option>
        <option value="47 Class">47 Class</option>
      </select>
      <input type="number" placeholder="Count" className="flex-1 border rounded p-2" value={vehicleCount} onChange={(e) => setVehicleCount(e.target.value)} />
      <button className="bg-green-600 text-white p-2 rounded" onClick={addVehicle}>Add</button>
    </div>
    <div className="mb-2">
      <input type="number" placeholder="Number of Large Trailers" className="border rounded p-2 mb-2 w-full" value={numLargeTrailers} onChange={(e) => setNumLargeTrailers(e.target.value)} />
      <input type="number" placeholder="Number of Small Trailers" className="border rounded p-2 w-full" value={numSmallTrailers} onChange={(e) => setNumSmallTrailers(e.target.value)} />
    </div>
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateFleetPremium}>Calculate Fleet Premium</button>
    <button className="bg-gray-400 text-white p-2 rounded ml-2" onClick={resetFleet}>Reset Fleet</button>
    {fleetVehicles.length > 0 && <div className="mt-2">Vehicles Added:</div>}
    {fleetVehicles.map((v, i) => <div key={i}>{v.count} x {v.type}</div>)}
    {fleetPremium !== null && <ResultBox>Fleet Premium: ${fleetPremium}</ResultBox>}
  </>
);
