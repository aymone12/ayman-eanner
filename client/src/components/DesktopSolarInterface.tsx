import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface DesktopSolarInterfaceProps {
  onNext: () => void;
  onBack: () => void;
}

export function DesktopSolarInterface({ onNext, onBack }: DesktopSolarInterfaceProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#06141B' }}>
      <Header />
      
      <div className="flex-1 flex flex-col justify-center items-center px-4">
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
              onClick={onNext}
              className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto lg:mx-0"
              data-testid="button-whats-next"
            >
              <span className="font-medium">What Next</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Side - Recommendation Card */}
          <div className="bg-transparent border-2 border-gray-600 rounded-2xl p-6 max-w-sm w-full">
            {/* Recommended Badge */}
            <div className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md inline-block mb-4">
              Recommended
            </div>
            
            {/* Main Title */}
            <h2 className="text-white text-xl font-bold mb-6">
              20.00kW Solar Power + 5kWh Storage
            </h2>
            
            {/* Stats */}
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
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={onBack}
            className="text-white underline hover:no-underline transition-all duration-300"
            data-testid="button-back-to-main"
          >
            Back to the main
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}