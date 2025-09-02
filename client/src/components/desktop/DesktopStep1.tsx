import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep1Props {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopStep1({ onNext, onBack }: DesktopStep1Props) {
  const [formData, setFormData] = useState({
    propertyType: '',
    humidityIndex: '',
    sunlightAmount: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Add this helper to check if all fields are filled
  const allFieldsFilled = 
    formData.propertyType.trim() && 
    formData.humidityIndex.trim() && 
    formData.sunlightAmount.trim();

  const handleNext = () => {
    if (allFieldsFilled) {
      onNext();
    }
    // No need for alert, button will be disabled if not filled
  };

  const isFieldFilled = (field: string) => {
    return formData[field as keyof typeof formData].trim() !== '';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4" style={{ backgroundColor: '#06141B' }}>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* Left Side Content */}
        <div className="text-white max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-12 leading-tight">
            You're Almost There...
          </h1>
          
          {/* Form Section */}
          <div className="mb-12">
            <p className="text-lg mb-8">Enter your property information</p>
            
            {/* Form Fields */}
            <div className="space-y-6 mb-10">
              {/* Property Type and Humidity Index Row */}
              <div className="flex gap-6">
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="flex-1 bg-transparent border-2 rounded-full px-6 py-4 text-left text-white focus:outline-none focus:ring-0 transition-colors duration-300 relative z-10 border-gray-600"
                  data-testid="select-property-type"
                >
                  <option value="" disabled className="text-gray-400 bg-[#06141B]">Property type</option>
                  <option value="residential" className="bg-[#06141B]">Residential</option>
                  <option value="commercial" className="bg-[#06141B]">Commercial</option>
                  <option value="industrial" className="bg-[#06141B]">Industrial</option>
                </select>
                <select
                  value={formData.humidityIndex}
                  onChange={(e) => handleInputChange('humidityIndex', e.target.value)}
                  className="flex-1 bg-transparent border-2 rounded-full px-6 py-4 text-left text-white focus:outline-none focus:ring-0 transition-colors duration-300 relative z-10 border-gray-600"
                  data-testid="select-humidity-index"
                >
                  <option value="" disabled className="text-gray-400 bg-[#06141B]">Humidity index</option>
                  <option value="low" className="bg-[#06141B]">Low (0-30%)</option>
                  <option value="moderate" className="bg-[#06141B]">Moderate (30-60%)</option>
                  <option value="high" className="bg-[#06141B]">High (60%+)</option>
                </select>
              </div>
              
              {/* Sunlight Amount Full Width */}
              <input
                type="text"
                placeholder="How much sunlight does your roof get?"
                value={formData.sunlightAmount}
                onChange={(e) => handleInputChange('sunlightAmount', e.target.value)}
                className="w-full bg-transparent border-2 rounded-full px-6 py-4 text-left text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 relative z-10 border-gray-600"
                data-testid="input-sunlight-amount"
              />
            </div>
            
            {/* Buttons Row */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={onBack}
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