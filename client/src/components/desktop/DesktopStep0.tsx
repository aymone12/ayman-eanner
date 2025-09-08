import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep0Props {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopStep0({ onNext, onBack }: DesktopStep0Props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 overflow-hidden" style={{ backgroundColor: '#06141B' }}>
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        
        {/* Left Side Content */}
        <div className="text-white text-center lg:text-left max-w-xs lg:max-w-sm flex-shrink-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
            You're Almost There...
          </h1>
          
          <div className="mb-4">
            <p className="text-sm lg:text-base leading-relaxed">
              You've Seen What Solar Can Do For You<br />
              Now Let Us Take Care Of The Rest
            </p>
          </div>
          
          <button 
            onClick={onNext}
            className="bg-transparent border-2 border-white rounded-full px-6 py-2 flex items-center gap-2 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto lg:mx-0"
            data-testid="button-what-next"
          >
            <span className="font-medium text-sm">What Next</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Right Side - Recommendation Card */}
        <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-4 max-w-xs lg:max-w-sm w-full flex-shrink-0">
          <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md inline-block mb-2">
            Recommended
          </div>
          <h2 className="text-white text-base font-bold mb-3">
            20.00kW Solar Power + 5kWh Storage
          </h2>
          <div className="space-y-1 mb-2">
            <p className="text-white font-medium text-xs">
              6% Offset + 1 Hours Avg Backup
            </p>
            <p className="text-gray-400 text-xs">
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