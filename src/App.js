import { useState, useEffect } from "react";

export default function App() {
  // ---------------- Section States ----------------
  const [business, setBusiness] = useState("");
  const [revenue, setRevenue] = useState("");
  const [businessRate, setBusinessRate] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [businessPremium, setBusinessPremium] = useState(0);

  const [buildingType, setBuildingType] = useState("");
  const [buildingValue, setBuildingValue] = useState("");
  const [buildingRate, setBuildingRate] = useState("");
  const [buildingPremium, setBuildingPremium] = useState(0);

  const [contentsType, setContentsType] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const [contentsRate, setContentsRate] = useState("");
  const [contentsPremium, setContentsPremium] = useState(0);

  const [equipmentValue, setEquipmentValue] = useState("");
  const [equipmentRate, setEquipmentRate] = useState("");
  const [equipmentPremium, setEquipmentPremium] = useState(0);

  const [installationAmount, setInstallationAmount] = useState("");
  const [installationPremium, setInstallationPremium] = useState(0);

  const [totalVehicles, setTotalVehicles] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCount, setVehicleCount] = useState("");
  const [fleetVehicles, setFleetVehicles] = useState([]);
  const [numLargeTrailers, setNumLargeTrailers] = useState("");
  const [numSmallTrailers, setNumSmallTrailers] = useState("");
  const [fleetPremium, setFleetPremium] = useState(0);

  const [totalPremium, setTotalPremium] = useState(0);

  // ---------------- Rates ----------------
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

  const buildingRates = {
    "Sprinkler System & Non Combustible": [0.05, 0.1, 0.15],
    "No Sprinkler System & Wood Frame": [0.25, 0.35, 0.5],
  };

  const contentsRates = {
    "Sprinkler & Non-Combustible": [0.05, 0.15],
    "Non-sprinkler & Wood Frame": [0.25, 0.5],
  };

  const equipmentRates = [0.45, 1];

  const installationOptions = [
    { amount: 100000, premium: 500 },
    { amount: 500000, premium: 1000 },
    { amount: 1000000, premium: 2000 },
  ];

  const vehicleRatesSmall = { PPV: 2500, "36 Class": 2000, "44/45 Class": 3500, "47 Class": 6000 };
  const vehicleRatesLarge = { PPV: 2000, "36 Class": 1500, "44/45 Class": 3000, "47 Class": 4000 };
  const trailerRates = { Large: 1000, Small: 500 };

  // ---------------- Calculations ----------------
  const calculateBusinessPremium = () => {
    const rate = business === "Other" ? parseFloat(customRate) : parseFloat(businessRate);
    if (!rate || !revenue) return;
    const premium = (parseFloat(revenue) / 1000) * rate;
    setBusinessPremium(premium.toFixed(2));
  };

  const calculateBuildingPremium = () => {
    if (!buildingType || !buildingValue || !buildingRate) return;
    const premium = (parseFloat(buildingValue) / 100) * parseFloat(buildingRate);
    setBuildingPremium(premium.toFixed(2));
  };

  const calculateContentsPremium = () => {
    if (!contentsType || !contentsValue || !contentsRate) return;
    const premium = (parseFloat(contentsValue) / 100) * parseFloat(contentsRate);
    setContentsPremium(premium.toFixed(2));
  };

  const calculateEquipmentPremium = () => {
    if (!equipmentValue || !equipmentRate) return;
    const premium = (parseFloat(equipmentValue) / 100) * parseFloat(equipmentRate);
    setEquipmentPremium(premium.toFixed(2));
  };

  const calculateInstallationPremium = (selectedAmount) => {
    const option = installationOptions.find((o) => o.amount === parseInt(selectedAmount));
    if (!option) return;
    setInstallationAmount(option.amount);
    setInstallationPremium(option.premium.toFixed(2));
  };

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
    setFleetPremium(0);
    setVehicleType("");
    setVehicleCount("");
    setNumLargeTrailers("");
    setNumSmallTrailers("");
  };

  // ---------------- Live Total Premium ----------------
  useEffect(() => {
    const total = 
      parseFloat(businessPremium || 0) +
      parseFloat(buildingPremium || 0) +
      parseFloat(contentsPremium || 0) +
      parseFloat(equipmentPremium || 0) +
      parseFloat(installationPremium || 0) +
      parseFloat(fleetPremium || 0);
    setTotalPremium(total.toFixed(2));
  }, [businessPremium, buildingPremium, contentsPremium, equipmentPremium, installationPremium, fleetPremium]);

  // ---------------- Render ----------------
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold p-4 bg-yellow-100 rounded-lg text-center shadow">
        Total Premium: ${totalPremium}
      </div>

      {/* Business */}
      <CalculatorCard title="Business Premium">
        <BusinessSection {...{business, setBusiness, businessRate, setBusinessRate, customRate, setCustomRate, revenue, setRevenue, businessRates, businessPremium, calculateBusinessPremium}} />
      </CalculatorCard>

      {/* Building */}
      <CalculatorCard title="Building Premium">
        <BuildingSection {...{buildingType, setBuildingType, buildingValue, setBuildingValue, buildingRate, setBuildingRate, buildingRates, buildingPremium, calculateBuildingPremium}} />
      </CalculatorCard>

      {/* Contents */}
      <CalculatorCard title="Contents / Stock / Equipment / EDP / Customer Goods">
        <ContentsSection {...{contentsType, setContentsType, contentsValue, setContentsValue, contentsRate, setContentsRate, contentsRates, contentsPremium, calculateContentsPremium}} />
      </CalculatorCard>

      {/* Contractors Equipment */}
      <CalculatorCard title="Contractors Equipment">
        <EquipmentSection {...{equipmentValue, setEquipmentValue, equipmentRate, setEquipmentRate, equipmentRates, equipmentPremium, calculateEquipmentPremium}} />
      </CalculatorCard>

      {/* Installation Floater */}
      <CalculatorCard title="Installation Floater">
        <InstallationSection {...{installationAmount, installationPremium, calculateInstallationPremium, installationOptions}} />
      </CalculatorCard>

      {/* Fleet Vehicles */}
      <CalculatorCard title="Fleet Vehicles">
        <FleetSection {...{totalVehicles, setTotalVehicles, vehicleType, setVehicleType, vehicleCount, setVehicleCount, fleetVehicles, addVehicle, resetFleet, numLargeTrailers, setNumLargeTrailers, numSmallTrailers, setNumSmallTrailers, fleetPremium, calculateFleetPremium}} />
      </CalculatorCard>
    </div>
  );
}

// ---------------- Helper Components ----------------
const CalculatorCard = ({ children, title }) => (
  <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const ResultBox = ({ children }) => (
  <div className="mt-3 p-3 bg-blue-50 text-blue-700 font-bold rounded-lg text-lg">{children}</div>
);

// ---------------- Section Components ----------------
const BusinessSection = ({ business, setBusiness, businessRate, setBusinessRate, customRate, setCustomRate, revenue, setRevenue, businessRates, businessPremium, calculateBusinessPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={business} onChange={(e) => setBusiness(e.target.value)}>
      <option value="">-- Select Business Type --</option>
      {Object.keys(businessRates).map((b) => <option key={b} value={b}>{b}</option>)}
      <option value="Other">Other</option>
    </select>
    {business === "Other" ? (
      <input type="number" placeholder="Enter custom rate" className="w-full border rounded p-2 mb-2" value={customRate} onChange={(e) => setCustomRate(e.target.value)} />
    ) : (
      <select className="w-full border rounded p-2 mb-2" value={businessRate} onChange={(e) => setBusinessRate(e.target.value)}>
        <option value="">-- Select Rate --</option>
        {businessRates[business]?.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
    )}
    <input type="number" placeholder="Revenue" className="w-full border rounded p-2 mb-2" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateBusinessPremium}>Calculate</button>
    {businessPremium !== null && <ResultBox>Business Premium: ${businessPremium}</ResultBox>}
  </>
);

const BuildingSection = ({ buildingType, setBuildingType, buildingValue, setBuildingValue, buildingRate, setBuildingRate, buildingRates, buildingPremium, calculateBuildingPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={buildingType} onChange={(e) => setBuildingType(e.target.value)}>
      <option value="">-- Select Building Type --</option>
      {Object.keys(buildingRates).map((b) => <option key={b} value={b}>{b}</option>)}
    </select>
    <select className="w-full border rounded p-2 mb-2" value={buildingRate} onChange={(e) => setBuildingRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {buildingRates[buildingType]?.map((r) => <option key={r} value={r}>{r}</option>)}
    </select>
    <input type="number" placeholder="Building Value" className="w-full border rounded p-2 mb-2" value={buildingValue} onChange={(e) => setBuildingValue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateBuildingPremium}>Calculate</button>
    {buildingPremium !== null && <ResultBox>Building Premium: ${buildingPremium}</ResultBox>}
  </>
);

const ContentsSection = ({ contentsType, setContentsType, contentsValue, setContentsValue, contentsRate, setContentsRate, contentsRates, contentsPremium, calculateContentsPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={contentsType} onChange={(e) => setContentsType(e.target.value)}>
      <option value="">-- Select Contents Type --</option>
      {Object.keys(contentsRates).map((c) => <option key={c} value={c}>{c}</option>)}
    </select>
    <select className="w-full border rounded p-2 mb-2" value={contentsRate} onChange={(e) => setContentsRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {contentsRates[contentsType]?.map((r) => <option key={r} value={r}>{r}</option>)}
    </select>
    <input type="number" placeholder="Contents Value" className="w-full border rounded p-2 mb-2" value={contentsValue} onChange={(e) => setContentsValue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateContentsPremium}>Calculate</button>
    {contentsPremium !== null && <ResultBox>Contents Premium: ${contentsPremium}</ResultBox>}
  </>
);

const EquipmentSection = ({ equipmentValue, setEquipmentValue, equipmentRate, setEquipmentRate, equipmentRates, equipmentPremium, calculateEquipmentPremium }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={equipmentRate} onChange={(e) => setEquipmentRate(e.target.value)}>
      <option value="">-- Select Rate --</option>
      {equipmentRates.map((r) => <option key={r} value={r}>{r}</option>)}
    </select>
    <input type="number" placeholder="Equipment Value" className="w-full border rounded p-2 mb-2" value={equipmentValue} onChange={(e) => setEquipmentValue(e.target.value)} />
    <button className="bg-blue-600 text-white p-2 rounded mb-2" onClick={calculateEquipmentPremium}>Calculate</button>
    {equipmentPremium !== null && <ResultBox>Equipment Premium: ${equipmentPremium}</ResultBox>}
  </>
);

const InstallationSection = ({ installationAmount, installationPremium, calculateInstallationPremium, installationOptions }) => (
  <>
    <select className="w-full border rounded p-2 mb-2" value={installationAmount} onChange={(e) => calculateInstallationPremium(e.target.value)}>
      <option value="">-- Select Installation Amount --</option>
      {installationOptions.map((o) => <option key={o.amount} value={o.amount}>${o.amount} → Premium ${o.premium}</option>)}
    </select>
    {installationPremium !== null && <ResultBox>Installation Premium: ${installationPremium}</ResultBox>}
  </>
);

const FleetSection = ({ totalVehicles, setTotalVehicles, vehicleType, setVehicleType, vehicleCount, setVehicleCount, fleetVehicles, addVehicle, resetFleet, numLargeTrailers, setNumLargeTrailers, numSmallTrailers, setNumSmallTrailers, fleetPremium, calculateFleetPremium }) => (
  <>
    <input type="number" placeholder="Total Vehicles" className="w-full border rounded p-2 mb-2" value={totalVehicles} onChange={(e) => setTotalVehicles(e.target.value)} />
    <div className="flex space-x-2 mb-2">
      <select className="flex-1 border rounded p-2" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
        <option value="">-- Vehicle Type --</option>
        <option value="PPV">PPV</option>
        <option value="36 Class">36 Class</option>
        <option value="44/45 Class">44/45 Class</option>
        <option value="47 Class">47 Class</option>
      </select>
      <input type="number" placeholder="# of Vehicles" className="flex-1 border rounded p-2" value={vehicleCount} onChange={(e) => setVehicleCount(e.target.value)} />
      <button className="bg-green-600 text-white p-2 rounded" onClick={addVehicle}>Add</button>
    </div>
    {fleetVehicles.map((v, i) => <div key={i} className="mb-1">{v.count} x {v.type}</div>)}
    <input type="number" placeholder="# Large Trailers" className="w-full border rounded p-2 mb-2" value={numLargeTrailers} onChange={(e) => setNumLargeTrailers(e.target.value)} />
    <input type="number" placeholder="# Small Trailers" className="w-full border rounded p-2 mb-2" value={numSmallTrailers} onChange={(e) => setNumSmallTrailers(e.target.value)} />
    <div className="flex space-x-2">
      <button className="bg-blue-600 text-white p-2 rounded flex-1" onClick={calculateFleetPremium}>Calculate Fleet Premium</button>
      <button className="bg-red-600 text-white p-2 rounded flex-1" onClick={resetFleet}>Reset Fleet</button>
    </div>
    {fleetPremium !== null && <ResultBox>Fleet Premium: ${fleetPremium}</ResultBox>}
  </>
);

