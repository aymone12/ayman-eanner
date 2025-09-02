import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopSolarInterfaceProps {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopSolarInterface({ onNext, onBack }: DesktopSolarInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    humidityIndex: '',
    sunlightExposure: ''
  });

  // Step 1: Initial "You're Almost There" page
  const Step1 = () => (
    <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
      {/* Left Side Content */}
      <div className="text-white text-center lg:text-left max-w-md">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
          You're Almost There...
        </h1>
        
        <p className="text-lg lg:text-xl mb-8 leading-relaxed opacity-90">
          You've Seen What Solar Can Do For You<br />
          Now Let Us Take Care Of The Rest
        </p>
        
        <button 
          onClick={() => setCurrentStep(2)}
          className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto lg:mx-0"
          data-testid="button-whats-next"
        >
          <span className="font-medium">What Next</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Right Side - Recommendation Card */}
      <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-6 max-w-sm w-full">
        <div className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md inline-block mb-4">
          Recommended
        </div>
        <h2 className="text-white text-xl font-bold mb-6">
          20.00kW Solar Power + 5kWh Storage
        </h2>
        <div className="space-y-2 mb-4">
          <p className="text-white font-medium">
            6% Offset + 1 Hours Avg Backup
          </p>
          <p className="text-gray-400 text-sm">
            Estimated System Size Based On Your Reported<br />
            Electricity Use
          </p>
        </div>
      </div>
    </div>
  );

  // Step 2: Property Information Form
  const Step2 = () => {
    const handleFieldClick = (field: string) => {
      // This would open a modal or dropdown to select the value
      // For now, just mark as selected
      setFormData(prev => ({ ...prev, [field]: 'selected' }));
    };

    const handleNext = () => {
      if (formData.propertyType && formData.humidityIndex && formData.sunlightExposure) {
        setCurrentStep(3);
      } else {
        alert('Please fill in all required fields before proceeding.');
      }
    };

    return (
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Left Side Content */}
        <div className="text-white max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            You're Almost There...
          </h1>
          
          {/* Form Section */}
          <div className="mb-8">
            <p className="text-lg mb-6">Enter your property information</p>
            
            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {/* Property Type and Humidity Index Row */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleFieldClick('propertyType')}
                  className={`flex-1 bg-transparent border-2 rounded-full px-4 py-3 text-left transition-colors duration-300 cursor-pointer ${
                    formData.propertyType 
                      ? 'border-white text-white hover:bg-white hover:text-[#06141B]' 
                      : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  Property type
                </button>
                <button
                  onClick={() => handleFieldClick('humidityIndex')}
                  className={`flex-1 bg-transparent border-2 rounded-full px-4 py-3 text-left transition-colors duration-300 cursor-pointer ${
                    formData.humidityIndex 
                      ? 'border-white text-white hover:bg-white hover:text-[#06141B]' 
                      : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  Humidity index
                </button>
              </div>
              
              {/* Sunlight Question Full Width */}
              <button
                onClick={() => handleFieldClick('sunlightExposure')}
                className={`w-full bg-transparent border-2 rounded-full px-4 py-3 text-left transition-colors duration-300 cursor-pointer ${
                  formData.sunlightExposure 
                    ? 'border-white text-white hover:bg-white hover:text-[#06141B]' 
                    : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                }`}
              >
                How much sunlight does your roof get?
              </button>
            </div>
            
            {/* Buttons Row */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentStep(1)}
                className="text-white underline hover:no-underline transition-all duration-300"
              >
                Previous
              </button>
              
              <button 
                onClick={handleNext}
                className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group"
              >
                <span className="font-medium">Next</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Recommendation Card */}
        <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-6 max-w-sm w-full">
          <div className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md inline-block mb-4">
            Recommended
          </div>
          <h2 className="text-white text-xl font-bold mb-6">
            20.00kW Solar Power + 5kWh Storage
          </h2>
          <div className="space-y-2 mb-4">
            <p className="text-white font-medium">
              6% Offset + 1 Hours Avg Backup
            </p>
            <p className="text-gray-400 text-sm">
              Estimated System Size Based On Your Reported<br />
              Electricity Use
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Step 3: Final page (for now, similar structure)
  const Step3 = () => (
    <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
      <div className="text-white max-w-md">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
          Almost Complete...
        </h1>
        
        <div className="mb-8">
          <p className="text-lg mb-6">Final step - Review your information</p>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentStep(2)}
              className="text-white underline hover:no-underline transition-all duration-300"
            >
              Previous
            </button>
            
            <button 
              onClick={onNext}
              className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group"
            >
              <span className="font-medium">Complete</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-6 max-w-sm w-full">
        <div className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md inline-block mb-4">
          Recommended
        </div>
        <h2 className="text-white text-xl font-bold mb-6">
          20.00kW Solar Power + 5kWh Storage
        </h2>
        <div className="space-y-2 mb-4">
          <p className="text-white font-medium">
            6% Offset + 1 Hours Avg Backup
          </p>
          <p className="text-gray-400 text-sm">
            Estimated System Size Based On Your Reported<br />
            Electricity Use
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4" style={{ backgroundColor: '#06141B' }}>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      
      {/* Bottom Link */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={onBack}
          className="text-white underline hover:no-underline transition-all duration-300"
          data-testid="button-back-to-main"
        >
          Back to the main
        </button>
      </div>
    </div>
  );
}