import React, { useState } from 'react';
import { DesktopStep0 } from './DesktopStep0';
import { DesktopStep1 } from './DesktopStep1';
import { DesktopStep2 } from './DesktopStep2';
import { DesktopStep3 } from './DesktopStep3';
import { DesktopStep4 } from './DesktopStep4';
import { DesktopStep5 } from './DesktopStep5';

interface DesktopSolarFlowProps {
  onBack: () => void;
}

export function DesktopSolarFlow({ onBack }: DesktopSolarFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleRateExperience = () => {
    // Navigate back to landing page
    onBack();
  };

  return (
    <>
      {currentStep === 0 && (
        <DesktopStep0 
          onNext={handleNext}
          onBack={onBack}
        />
      )}
      {currentStep === 1 && (
        <DesktopStep1 
          onNext={handleNext}
          onBack={onBack}
        />
      )}
      {currentStep === 2 && (
        <DesktopStep2 
          onNext={handleNext}
          onPrevious={handlePrevious}
          onBack={onBack}
        />
      )}
      {currentStep === 3 && (
        <DesktopStep3 
          onNext={handleNext}
          onPrevious={handlePrevious}
          onBack={onBack}
        />
      )}
      {currentStep === 4 && (
        <DesktopStep4 
          onNext={handleNext}
          onPrevious={handlePrevious}
          onBack={onBack}
        />
      )}
      {currentStep === 5 && (
        <DesktopStep5 
          onRateExperience={handleRateExperience}
          onBack={onBack}
        />
      )}
    </>
  );
}