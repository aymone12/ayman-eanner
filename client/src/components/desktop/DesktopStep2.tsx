import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep2Props {
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}

export function DesktopStep2({ onNext, onPrevious, onBack }: DesktopStep2Props) {
  const [formData, setFormData] = useState({
    propertyType: '',
    humidityIndex: '',
    sunlightExposure: ''
  });

  const handleFieldClick = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: 'selected' }));
  };

  const allFieldsFilled =
    formData.propertyType && formData.humidityIndex && formData.sunlightExposure;

  const handleNext = () => {
    if (allFieldsFilled) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4" style={{ backgroundColor: '#06141B' }}>
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
            <div className="space-y-6 mb-10">
              {/* Property Type and Humidity Index Row */}
              <div className="flex gap-6">
                <button
                  onClick={() => handleFieldClick('propertyType')}
                  className={`flex-1 bg-transparent border-2 rounded-full px-6 py-4 text-left transition-colors duration-300 cursor-pointer relative z-10 ${
                    formData.propertyType 
                      ? 'border-white text-white hover:bg-white hover:text-[#06141B]' 
                      : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                  }`}
                  data-testid="button-property-type"
                >
                  Property type
                </button>
                <button
                  onClick={() => handleFieldClick('humidityIndex')}
                  className={`flex-1 bg-transparent border-2 rounded-full px-6 py-4 text-left transition-colors duration-300 cursor-pointer relative z-10 ${
                    formData.humidityIndex 
                      ? 'border-white text-white hover:bg-white hover:text-[#06141B]' 
                      : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                  }`}
                  data-testid="button-humidity-index"
                >
                  Humidity index
                </button>
              </div>
              
              {/* Sunlight Question Full Width */}
              <button
                onClick={() => handleFieldClick('sunlightExposure')}
                className={`w-full bg-transparent border-2 rounded-full px-6 py-4 text-left transition-colors duration-300 cursor-pointer relative z-10 ${
                  formData.sunlightExposure 
                    ? 'border-white text-white hover:bg-white hover:text-[#06141B]' 
                    : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                }`}
                data-testid="button-sunlight-exposure"
              >
                How much sunlight does your roof get?
              </button>
            </div>
            
            {/* Buttons Row */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={onPrevious}
                className="text-white underline hover:no-underline transition-all duration-300 relative z-10"
                data-testid="button-previous"
              >
                Previous
              </button>
              
              <button 
                onClick={handleNext}
                className={`bg-transparent border-2 border-white rounded-full px-10 py-4 flex items-center gap-3 transition-all duration-300 group relative z-10
                  ${allFieldsFilled 
                    ? 'hover:bg-white hover:text-[#06141B] cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                  }`}
                data-testid="button-next"
                disabled={!allFieldsFilled}
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