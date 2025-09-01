import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressIndicator } from "./ProgressIndicator";
import { ContactFooterSection } from "./ContactFooterSection";

interface Step4EnergyStorageProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step4EnergyStorage({ onNext, onBack }: Step4EnergyStorageProps) {
  return (
    <div className="min-h-screen bg-[#06141b] text-white">
      <ProgressIndicator currentStep={4} totalSteps={6} />
      
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

        {/* Main Content */}
        <div className="max-w-md mx-auto mb-8">
          <h1 className="text-white text-3xl font-bold mb-6">
            You're Almost There...
          </h1>
          <p className="text-white text-lg mb-8">
            Energy storage options
          </p>

          {/* Form Fields */}
          <div className="space-y-4 mb-8">
            <Input
              type="text"
              placeholder="Storage mode"
              className="w-full px-4 py-4 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
              data-testid="input-storage-mode"
            />
            
            <Input
              type="text"
              placeholder="Maintenance service"
              className="w-full px-4 py-4 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
              data-testid="input-maintenance-service"
            />
            
            <Input
              type="text"
              placeholder="How many hours of back up you want?"
              className="w-full px-4 py-4 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
              data-testid="input-backup-hours"
            />
          </div>

          <Button
            onClick={onBack}
            variant="link"
            className="text-white hover:text-gray-300 font-medium mb-8"
            data-testid="button-previous"
          >
            Previous
          </Button>
        </div>

        {/* Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <Button
            onClick={onNext}
            className="w-full bg-transparent border-2 border-white text-white py-3 rounded-full hover:bg-white/10 font-medium"
            data-testid="button-next"
          >
            Next
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