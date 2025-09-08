import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep0Props {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopStep0({ onNext, onBack }: DesktopStep0Props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 overflow-hidden" style={{ backgroundColor: '#06141B' }}>
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Left Side Content */}
        <div className="text-white text-center lg:text-left max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            You're Almost There...
          </h1>
          
          <div className="mb-6">
            <p className="text-base lg:text-lg leading-relaxed">
              You've Seen What Solar Can Do For You<br />
              Now Let Us Take Care Of The Rest
            </p>
          </div>
          
          <button 
            onClick={onNext}
            className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto lg:mx-0"
            data-testid="button-what-next"
          >
            <span className="font-medium">What Next</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Right Side - Recommendation Card */}
        <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-5 max-w-sm w-full">
          <div className="bg-gray-700 text-white text-xs px-3 py-1 rounded-md inline-block mb-3">
            Recommended
          </div>
          <h2 className="text-white text-lg font-bold mb-4">
            20.00kW Solar Power + 5kWh Storage
          </h2>
          <div className="space-y-2 mb-3">
            <p className="text-white font-medium text-sm">
              6% Offset + 1 Hours Avg Backup
            </p>
            <p className="text-gray-400 text-xs">
              Estimated System Size Based On Your Reported<br />
              Electricity Use
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