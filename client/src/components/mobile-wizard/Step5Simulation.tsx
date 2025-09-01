import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "./ProgressIndicator";
import { ContactFooterSection } from "./ContactFooterSection";

interface Step5SimulationProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step5Simulation({ onNext, onBack }: Step5SimulationProps) {
  return (
    <div className="min-h-screen bg-[#06141b] text-white">
      <ProgressIndicator currentStep={5} totalSteps={6} />
      
      <div className="px-4 py-8">
        {/* Recommendation Card */}
        <div className="bg-[#0a1b23] border-2 border-white rounded-3xl p-6 mb-8 max-w-md mx-auto">
          <div className="mb-4">
            <p className="text-gray-300 text-sm mb-2">Recommended</p>
            <h2 className="text-white text-xl font-bold">
              20.00kW Solar Power + 5kWh Storage
            </h2>
          </div>
          
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">6% Offset + 1 Hours Avg Backup</h3>
            <p className="text-gray-300 text-sm">
              Estimated System Size Based On Your Reported Electricity Use
            </p>
          </div>
        </div>

        {/* Simulation Content */}
        <div className="max-w-md mx-auto mb-8">
          <h1 className="text-white text-3xl font-bold mb-8 text-center">
            This Is Your Simulation
          </h1>

          {/* Cost Breakdown */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-white text-lg">Estimated cost</span>
              <span className="text-white text-lg font-bold">40.500.00DH</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white text-lg">Annual savings</span>
              <span className="text-white text-lg font-bold">4.500DH/y</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white text-lg">Payback period</span>
              <span className="text-white text-lg font-bold">9 years</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white text-lg">Installation time</span>
              <span className="text-white text-lg font-bold">30Hour</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <Button
            onClick={onNext}
            className="w-full bg-transparent border-2 border-white text-white py-3 rounded-full hover:bg-white/10 font-medium"
            data-testid="button-confirm"
          >
            Confirm
          </Button>
          
          <Button
            onClick={onBack}
            variant="link"
            className="w-full text-white hover:text-gray-300 font-medium"
            data-testid="button-back-to-main"
          >
            Back to the main
          </Button>
        </div>

        <ContactFooterSection />
      </div>
    </div>
  );
}