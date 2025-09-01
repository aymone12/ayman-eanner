import { Button } from "@/components/ui/button";

interface Step6CompletionProps {
  onConfirm: () => void;
  onBack: () => void;
}

export function Step6Completion({ onConfirm, onBack }: Step6CompletionProps) {
  return (
    <div className="min-h-screen bg-[#06141b] text-white">
      <div className="px-4 py-16">
        {/* Main Content */}
        <div className="max-w-md mx-auto text-center mb-16">
          <h1 className="text-white text-4xl font-bold mb-8">
            All Done
          </h1>

          {/* Checkmark Circle */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="text-white text-xl font-bold mb-6">
            We'll be in touch shortly!
          </h2>

          <p className="text-white text-base leading-relaxed mb-6">
            Thank you for your patience our eaneer energetics team will contact you soon. You'll receive a WhatsApp message with your personalized solar offer.
          </p>

          <p className="text-white text-lg font-bold">
            Together, we're building a brighter,<br />
            greener Morocco.
          </p>
        </div>

        {/* Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <Button
            onClick={onConfirm}
            className="w-full bg-transparent border-2 border-white text-white py-3 rounded-full hover:bg-white/10 font-medium"
            data-testid="button-confirm-final"
          >
            Confirm
          </Button>
          
          <Button
            onClick={onBack}
            variant="link"
            className="w-full text-white hover:text-gray-300 font-medium"
            data-testid="button-back-to-main-final"
          >
            Back to the main
          </Button>
        </div>
      </div>
    </div>
  );
}