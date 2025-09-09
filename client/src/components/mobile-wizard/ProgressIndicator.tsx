interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className="relative">
                {isActive ? (
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {stepNumber}
                  </div>
                )}
              </div>
              {stepNumber < totalSteps && (
                <div className="w-4 h-px bg-gray-600 mx-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}