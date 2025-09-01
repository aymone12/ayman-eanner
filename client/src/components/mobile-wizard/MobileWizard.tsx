import { useState } from "react";
import { Step1Results } from "./Step1Results";
import { Step2PersonalInfo } from "./Step2PersonalInfo";
import { Step3PropertyInfo } from "./Step3PropertyInfo";
import { Step4EnergyStorage } from "./Step4EnergyStorage";
import { Step5Simulation } from "./Step5Simulation";
import { Step6Completion } from "./Step6Completion";

interface MobileWizardProps {
  onBack: () => void;
}

export function MobileWizard({ onBack }: MobileWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleBackToMain = () => {
    onBack();
  };

  const handleConfirm = () => {
    // Final confirmation - could redirect or show success message
    onBack();
  };

  switch (currentStep) {
    case 1:
      return <Step1Results onNext={handleNext} onBack={handleBackToMain} />;
    case 2:
      return <Step2PersonalInfo onNext={handleNext} onBack={handlePrevious} />;
    case 3:
      return <Step3PropertyInfo onNext={handleNext} onBack={handlePrevious} />;
    case 4:
      return <Step4EnergyStorage onNext={handleNext} onBack={handlePrevious} />;
    case 5:
      return <Step5Simulation onNext={handleNext} onBack={handlePrevious} />;
    case 6:
      return <Step6Completion onConfirm={handleConfirm} onBack={handleBackToMain} />;
    default:
      return <Step1Results onNext={handleNext} onBack={handleBackToMain} />;
  }
}