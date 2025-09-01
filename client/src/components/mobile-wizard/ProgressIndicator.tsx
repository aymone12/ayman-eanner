interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isActive
                    ? "bg-white text-black"
                    : isCompleted
                    ? "bg-gray-400 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div className="w-8 h-0.5 bg-gray-600 mx-2"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}