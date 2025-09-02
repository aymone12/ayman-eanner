import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DesktopStep3Props {
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}

export function DesktopStep3({ onNext, onPrevious, onBack }: DesktopStep3Props) {
  // Pre-filled data for client display (read-only)
  const displayData = {
    storageMode: 'Battery Storage',
    maintenanceService: 'Premium Service Plan',
    backupHours: '8 hours backup power'
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
            <p className="text-lg mb-6">Energy storage options</p>
            
            {/* Display Fields - Read Only for Client */}
            <div className="space-y-6 mb-6">
              {/* Storage Mode and Maintenance Service Row */}
              <div className="flex gap-6">
                <div className="flex-1 bg-transparent border-2 rounded-full px-6 py-4 text-left text-white border-white cursor-default" data-testid="display-storage-mode">
                  {displayData.storageMode}
                </div>
                <div className="flex-1 bg-transparent border-2 rounded-full px-6 py-4 text-left text-white border-white cursor-default" data-testid="display-maintenance-service">
                  {displayData.maintenanceService}
                </div>
              </div>
              
              {/* Backup Hours Question Full Width */}
              <div className="w-full bg-transparent border-2 rounded-full px-6 py-4 text-left text-white border-white cursor-default" data-testid="display-backup-hours">
                {displayData.backupHours}
              </div>
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
                data-testid="button-next"
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