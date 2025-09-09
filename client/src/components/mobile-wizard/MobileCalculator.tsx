import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MobileCalculatorProps {
  onCalculate: () => void;
}

export function MobileCalculator({ onCalculate }: MobileCalculatorProps) {
  const [selectedGridType, setSelectedGridType] = useState("three-phase");
  const [selectedInstallationType, setSelectedInstallationType] = useState("offgrid");
  const [powerUsage, setPowerUsage] = useState("");

  const gridTypeOptions = [
    {
      id: "three-phase",
      label: "Tree Phase",
      description: "Perfect For High Power Usage"
    },
    {
      id: "single-phase", 
      label: "Single Phase",
      description: "Perfect For Low Power Usage"
    }
  ];

  const installationTypeOptions = [
    {
      id: "ongrid",
      label: "Ongrid",
      description: "Check Me If You Have Grid"
    },
    {
      id: "offgrid",
      label: "Offgrid", 
      description: "Check Me If You Have No Energy Source"
    },
    {
      id: "hybrid",
      label: "Hybrid",
      description: "I'm Adapted To All Other Energies"
    }
  ];

  const handleCalculate = () => {
    if (!powerUsage || powerUsage.trim() === "" || parseFloat(powerUsage) <= 0) {
      alert("Please enter a valid power usage amount before calculating.");
      return;
    }
    onCalculate();
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-[#0a1f26] via-[#132e35] to-[#0a1f26] rounded-3xl p-6 shadow-2xl border border-gray-600">
      {/* Grid Type */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold mb-6">Grid Type</h3>
        <RadioGroup
          value={selectedGridType}
          onValueChange={setSelectedGridType}
          className="space-y-4"
        >
          {gridTypeOptions.map((option) => (
            <div key={option.id} className="relative">
              <Label
                htmlFor={option.id}
                className={`block w-full p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedGridType === option.id
                    ? "border-white bg-[#0a1f26]"
                    : "border-gray-600 bg-[#0a1f26] hover:border-gray-400"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-1 mr-3 border-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <div>
                    <div className="text-white font-bold text-lg mb-1">{option.label}</div>
                    <div className="text-gray-300 text-sm">{option.description}</div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Installation Type */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold mb-6">Installation Type</h3>
        <RadioGroup
          value={selectedInstallationType}
          onValueChange={setSelectedInstallationType}
          className="space-y-4"
        >
          {installationTypeOptions.map((option) => (
            <div key={option.id} className="relative">
              <Label
                htmlFor={option.id}
                className={`block w-full p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedInstallationType === option.id
                    ? "border-white bg-[#0a1f26]"
                    : "border-gray-600 bg-[#0a1f26] hover:border-gray-400"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-1 mr-3 border-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <div>
                    <div className="text-white font-bold text-lg mb-1">{option.label}</div>
                    <div className="text-gray-300 text-sm">{option.description}</div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Power Usage */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold mb-6">Power usage</h3>
        <div className="relative">
          <Input
            type="number"
            placeholder="0.00"
            value={powerUsage}
            onChange={(e) => setPowerUsage(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-[#0a1f26] text-white placeholder:text-gray-400 focus:border-white focus:ring-0 text-lg"
            data-testid="input-power-usage"
          />
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-medium pointer-events-none">
            Watts
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        onClick={handleCalculate}
        className="w-full bg-white text-black py-4 rounded-2xl hover:bg-gray-100 font-bold text-lg"
        data-testid="button-calculate-mobile"
      >
        Calculate
      </Button>
    </div>
  );
}