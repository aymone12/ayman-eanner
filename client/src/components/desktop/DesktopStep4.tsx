import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep4Props {
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}

export function DesktopStep4({ onNext, onPrevious, onBack }: DesktopStep4Props) {
  const [agreed, setAgreed] = useState(false);

  const handleConfirm = () => {
    if (agreed) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#06141B' }}>
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-24 2xl:gap-32">
        
        {/* Left Side Content */}
        <div className="text-white w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-8 md:mb-12 leading-tight">
            This Is Your Simulation
          </h1>
          
          {/* Simulation Results */}
          <div className="mb-8">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg">Estimated cost</span>
                <span className="text-base sm:text-lg font-semibold">40,500.00DH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg">Annual Savings</span>
                <span className="text-base sm:text-lg font-semibold">4,500DH/y</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg">Payback period</span>
                <span className="text-base sm:text-lg font-semibold">9 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg">Installation time</span>
                <span className="text-base sm:text-lg font-semibold">30Hour</span>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mr-2"
                data-testid="checkbox-agree"
              />
              <label htmlFor="agree" className="text-sm text-gray-300 cursor-pointer">
                I confirm these simulation results and wish to proceed.
              </label>
            </div>
            
            {/* Buttons Row */}
            <div className="flex items-center justify-between">
              <button 
                onClick={onPrevious}
                className="text-white underline hover:no-underline transition-all duration-300"
                data-testid="button-previous"
              >
                Previous
              </button>
              
              <button 
                onClick={handleConfirm}
                className={`bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 transition-all duration-300 group
                  ${agreed 
                    ? 'hover:bg-white hover:text-[#06141B] cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                  }`}
                data-testid="button-confirm"
                disabled={!agreed}
              >
                <span className="font-medium">Confirm</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Recommendation Card */}
        <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-4 sm:p-6 max-w-sm lg:max-w-md xl:max-w-lg w-full">
          <div className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md inline-block mb-4">
            Recommended
          </div>
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
            20.00kW Solar Power + 5kWh Storage
          </h2>
          <div className="space-y-2 mb-4">
            <p className="text-white font-medium text-sm sm:text-base">
              6% Offset + 1 Hours Avg Backup
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
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