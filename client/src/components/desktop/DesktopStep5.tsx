import React from "react";
import { ArrowRight, Check } from "lucide-react";

interface DesktopStep5Props {
  onRateExperience: () => void;
  onBack: () => void;
}

export function DesktopStep5({ onRateExperience, onBack }: DesktopStep5Props) {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#06141B" }}
    >
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full text-center">
        {/* Main Content */}
        <div className="text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">All Done</h1>

          {/* Checkmark Circle */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#06141B]" strokeWidth={3} />
          </div>

          {/* Success Message */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">
            We'll be in touch shortly!
          </h2>

          <div className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90">
              Thank you for your patience, our pioneer energetics team will
              contact you soon. You'll receive a WhatsApp message with your
              personalized solar offer.
            </p>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90">
              <strong>
                Together, we're building a brighter, greener Morocco.
              </strong>
            </p>
          </div>

          {/* Rate Experience Button */}
          <button
            onClick={onRateExperience}
            className="bg-transparent border-2 border-white rounded-full px-6 sm:px-8 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto text-sm sm:text-base"
            data-testid="button-rate-experience"
          >
            <span className="font-medium">Rate Your Experience</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
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
