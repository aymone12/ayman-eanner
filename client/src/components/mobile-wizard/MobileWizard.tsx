import { useState } from "react";
import { Step1Results } from "./Step1Results";
import { Step2PersonalInfo } from "./Step2PersonalInfo";
import { Step3PropertyInfo } from "./Step3PropertyInfo";
import { Step4EnergyStorage } from "./Step4EnergyStorage";

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

  switch (currentStep) {
    case 1:
      return <Step1Results onNext={handleNext} onBack={handleBackToMain} />;
    case 2:
      return <Step2PersonalInfo onNext={handleNext} onBack={handlePrevious} />;
    case 3:
      return <Step3PropertyInfo onNext={handleNext} onBack={handlePrevious} />;
    case 4:
      return <Step4EnergyStorage onNext={handleNext} onBack={handlePrevious} />;
    default:
      return <Step1Results onNext={handleNext} onBack={handleBackToMain} />;
  }
}