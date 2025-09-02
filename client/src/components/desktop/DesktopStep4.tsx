import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep4Props {
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}

export function DesktopStep4({ onNext, onPrevious, onBack }: DesktopStep4Props) {
  // Client viewing mode - simulation results are pre-confirmed

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4" style={{ backgroundColor: '#06141B' }}>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* Left Side Content */}
        <div className="text-white max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            This Is Your Simulation
          </h1>
          
          {/* Simulation Results */}
          <div className="mb-8">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg">Estimated cost</span>
                <span className="text-lg font-semibold">40,500.00DH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Monthly savings</span>
                <span className="text-lg font-semibold">4,500DH/M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Payback period</span>
                <span className="text-lg font-semibold">5 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Installation time</span>
                <span className="text-lg font-semibold">30 Hour</span>
              </div>
            </div>

            {/* Confirmation Status - Read Only for Client */}
            <div className="flex items-center mb-6">
              <div className="w-4 h-4 bg-white rounded-sm mr-3 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#06141B] rounded-sm"></div>
              </div>
              <span className="text-sm text-white">
                Simulation results confirmed and approved
              </span>
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
                onClick={onNext}
                className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 transition-all duration-300 group hover:bg-white hover:text-[#06141B] cursor-pointer"
                data-testid="button-confirm"
              >
                <span className="font-medium">Confirm</span>
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