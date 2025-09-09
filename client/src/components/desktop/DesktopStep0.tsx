import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep0Props {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopStep0({ onNext, onBack }: DesktopStep0Props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#06141B' }}>
      <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-16">
        
        {/* Left Side Content */}
        <div className="text-white text-center lg:text-left w-full max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg flex-shrink-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            You're Almost There...
          </h1>
          
          <div className="mb-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              You've Seen What Solar Can Do For You<br />
              Now Let Us Take Care Of The Rest
            </p>
          </div>
          
          <button 
            onClick={onNext}
            className="bg-transparent border-2 border-white rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto lg:mx-0"
            data-testid="button-what-next"
          >
            <span className="font-medium text-xs sm:text-sm md:text-base">What Next</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Right Side - Recommendation Card */}
        <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-3 sm:p-4 md:p-6 max-w-xs lg:max-w-sm xl:max-w-md w-full flex-shrink-0">
          <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md inline-block mb-2">
            Recommended
          </div>
          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3">
            20.00kW Solar Power + 5kWh Storage
          </h2>
          <div className="space-y-1 mb-2">
            <p className="text-white font-medium text-xs sm:text-sm">
              6% Offset + 1 Hours Avg Backup
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Estimated System Size Based On Your Reported Electricity Use
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Link */}
      <div className="mt-8">
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