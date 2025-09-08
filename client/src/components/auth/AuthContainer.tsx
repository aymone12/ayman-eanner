import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { UserDetailsPage1 } from "./UserDetailsPage1";
import { UserDetailsPage2 } from "./UserDetailsPage2";

type AuthStep = "login" | "signup" | "details1" | "details2";

export function AuthContainer() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");

  const handleToggleSignup = () => setCurrentStep("signup");
  const handleToggleLogin = () => setCurrentStep("login");
  const handleNextFromSignup = () => setCurrentStep("details1");
  const handleNextFromDetails1 = () => setCurrentStep("details2");
  
  const handleSkip = () => {
    // If user skips, complete signup with basic info only
    handleComplete();
  };

  const handleComplete = () => {
    // Redirect to dashboard or home page
    window.location.href = "/dashboard";
  };

  return (
    <div className="w-full h-full">
      {currentStep === "login" && (
        <LoginPage onToggleSignup={handleToggleSignup} />
      )}
      
      {currentStep === "signup" && (
        <SignupPage 
          onToggleLogin={handleToggleLogin}
          onNextStep={handleNextFromSignup}
        />
      )}
      
      {currentStep === "details1" && (
        <UserDetailsPage1 
          onNextStep={handleNextFromDetails1}
          onSkip={handleSkip}
        />
      )}
      
      {currentStep === "details2" && (
        <UserDetailsPage2 
          onSkip={handleSkip}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}