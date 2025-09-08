import { useState, useEffect } from "react";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { UserDetailsPage1 } from "./UserDetailsPage1";
import { UserDetailsPage2 } from "./UserDetailsPage2";
import { useLocation } from "wouter";

type AuthStep = "login" | "signup" | "details1" | "details2";

export function AuthContainer() {
  const [location] = useLocation();
  
  // Start with signup if coming from "Get started", otherwise show login
  const getInitialStep = (): AuthStep => {
    // Check if we came from a "Get started" button or if there's a preference
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    return mode === 'login' ? 'login' : 'signup';
  };

  // Get email from URL if provided
  const getInitialEmail = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('email') || '';
  };

  const [currentStep, setCurrentStep] = useState<AuthStep>(getInitialStep());
  const [initialEmail] = useState<string>(getInitialEmail());

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
    window.location.href = "/";
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
          initialEmail={initialEmail}
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