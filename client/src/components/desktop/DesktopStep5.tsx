import React from "react";
import { ArrowRight, Check } from "lucide-react";

interface DesktopStep5Props {
  onRateExperience: () => void;
  onBack: () => void;
}

export function DesktopStep5({ onRateExperience, onBack }: DesktopStep5Props) {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{ backgroundColor: "#06141B" }}
    >
      <div className="max-w-4xl w-full text-center">
        {/* Main Content */}
        <div className="text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8">All Done</h1>

          {/* Checkmark Circle */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-[#06141B]" strokeWidth={3} />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-semibold mb-6">
            We'll be in touch shortly!
          </h2>

          <div className="max-w-md mx-auto mb-8 space-y-4">
            <p className="text-lg leading-relaxed opacity-90">
              Thank you for your patience, our pioneer energetics team will
              contact you soon. You'll receive a WhatsApp message with your
              personalized solar offer.
            </p>

            <p className="text-lg leading-relaxed opacity-90">
              <strong>
                Together, we're building a brighter, greener Morocco.
              </strong>
            </p>
          </div>

          {/* Rate Experience Button */}
          <button
            onClick={onRateExperience}
            className="bg-transparent border-2 border-white rounded-full px-8 py-3 flex items-center gap-3 hover:bg-white hover:text-[#06141B] transition-all duration-300 group mx-auto"
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
