import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface DesktopStep3Props {
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}

export function DesktopStep3({
  onNext,
  onPrevious,
  onBack,
}: DesktopStep3Props) {
  const [formData, setFormData] = useState({
    storageMode: "",
    maintenanceService: "",
    backupHours: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const allFieldsFilled =
    formData.storageMode.trim() && formData.maintenanceService.trim() && formData.backupHours.trim();

  const handleNext = () => {
    if (allFieldsFilled) {
      onNext();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#06141B" }}
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-24 2xl:gap-32">
        {/* Left Side Content */}
        <div className="text-white w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-8 md:mb-12 leading-tight">
            You're Almost There...
          </h1>

          {/* Form Section */}
          <div className="mb-8">
            <p className="text-base sm:text-lg md:text-xl mb-6">Energy storage options</p>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {/* Storage Mode and Maintenance Service Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Storage mode"
                  value={formData.storageMode}
                  onChange={(e) => handleInputChange('storageMode', e.target.value)}
                  className="flex-1 bg-transparent border-2 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-left text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 border-gray-600 focus:border-white"
                  data-testid="input-storage-mode"
                />
                <input
                  type="text"
                  placeholder="Maintenance service"
                  value={formData.maintenanceService}
                  onChange={(e) => handleInputChange('maintenanceService', e.target.value)}
                  className="flex-1 bg-transparent border-2 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-left text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 border-gray-600 focus:border-white"
                  data-testid="input-maintenance-service"
                />
              </div>

              {/* Backup Hours Question Full Width */}
              <input
                type="text"
                placeholder="How many hours of back up you want?"
                value={formData.backupHours}
                onChange={(e) => handleInputChange('backupHours', e.target.value)}
                className="w-full bg-transparent border-2 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-left text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 border-gray-600 focus:border-white"
                data-testid="input-backup-hours"
              />
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
                onClick={handleNext}
                className={`bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 transition-all duration-300 group
                  ${
                    allFieldsFilled
                      ? "hover:bg-white hover:text-[#06141B] cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
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
              Estimated System Size Based On Your Reported
              <br />
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
