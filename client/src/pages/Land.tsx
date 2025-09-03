import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MobileWizard } from "@/components/mobile-wizard/MobileWizard";
import { DesktopSolarInterface } from "@/components/DesktopSolarInterface";
import { ContactFooterSection } from "@/components/mobile-wizard/ContactFooterSection";
import { useIsMobile } from "@/hooks/use-mobile";

import images_removebg_preview from "@assets/images-removebg-preview.png";

export const Land = (): JSX.Element => {
  const [selectedGridType, setSelectedGridType] = useState("three-phase");
  const [selectedInstallationType, setSelectedInstallationType] =
    useState("ongrid");
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState("initial"); // initial, hero, steps, calculator, results, personal, property, energy
  const [electricBill, setElectricBill] = useState("");
  const isMobile = useIsMobile();
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProcessStep, setSelectedProcessStep] = useState(0); // For tracking clicked process step
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    homeAddress: "",
    propertyType: "",
    humidityIndex: "",
    sunlightExposure: "",
    storageMode: "",
    maintenanceService: "",
    backupHours: ""
  });

  // Handle calculate button click
  const handleCalculate = () => {
    if (!electricBill || electricBill.trim() === "" || parseFloat(electricBill) <= 0) {
      alert("Please enter a valid electric bill amount before calculating.");
      return;
    }
    // Navigate to appropriate calculator based on device type
    if (isMobile) {
      setCurrentStep("wizard"); // Mobile wizard
    } else {
      setCurrentStep("desktopWizard"); // Desktop wizard
    }
  };

  // Mobile Hero Section Component
  const MobileHeroPage = () => (
    <div className="md:hidden w-full h-screen bg-gradient-to-b from-[#0a1f26] via-[#1a2b33] to-[#06141b] relative overflow-hidden">
      {/* Background image/illustration */}
      <div className="absolute inset-0 bg-[url('/figmaAssets/house-night.jpg')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1f26]/60 to-[#06141b]"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-center items-center px-6 text-center">
        <h1 className="text-white text-3xl font-bold mb-4 leading-tight">
          Power Your Home,<br />Save Money
        </h1>
        <p className="text-gray-300 text-base mb-8 max-w-sm leading-relaxed">
          Whether you goal is to invest in your home or to completely transform your energy consumption,<br />
          eaneer can help make that happen.
        </p>
        
        <Button
          onClick={() => setCurrentStep("steps")}
          className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 font-semibold text-base flex items-center gap-2"
          data-testid="button-ready-to-save"
        >
          Ready To Save Energy?
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
          </svg>
        </Button>
      </div>
      
      <ContactFooterSection />
    </div>
  );

  // Mobile Steps Section Component  
  const MobileStepsPage = () => (
    <div className="md:hidden w-full min-h-screen bg-gradient-to-b from-[#06141b] via-[#0a1f26] to-[#06141b] relative">
      <div className="px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm mb-4">How Do I Get Started?</p>
          <h1 className="text-white text-2xl font-bold mb-2">
            Explore <span className="text-cyan-400">eaneer Energetics</span> Solar Energy Installations
          </h1>
        </div>

        {/* Steps Cards */}
        <div className="space-y-6 mb-12">
          <div className="bg-[#1a2b33]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <h3 className="text-white text-lg font-semibold mb-3">Answer Our Questions</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Answer A Few Questions Online To Get A Price Guide. Our Installer In Your Area Will Then Contact You To Book In A Personalised Survey.
            </p>
          </div>

          <div className="bg-[#1a2b33]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <h3 className="text-white text-lg font-semibold mb-3">Get Your Quote</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Why The Energy Won't Work On Our System? We Build You And Your Business a custom solution.
            </p>
          </div>

          <div className="bg-[#1a2b33]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <h3 className="text-white text-lg font-semibold mb-3">Book Your Installation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Book time with Us, So You Can Install Your Personalised Solar System. You can Receive and install immediately.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => setCurrentStep("calculator")}
            className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 font-semibold text-base flex items-center gap-2 mx-auto"
            data-testid="button-ready-to-save-energy"
          >
            Ready To Save Energy?
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep === "results") setCurrentStep("personal");
    else if (currentStep === "personal") setCurrentStep("property");
    else if (currentStep === "property") setCurrentStep("energy");
  };

  const goToPreviousStep = () => {
    if (currentStep === "energy") setCurrentStep("property");
    else if (currentStep === "property") setCurrentStep("personal");
    else if (currentStep === "personal") setCurrentStep("results");
    else if (currentStep === "results") setCurrentStep("initial");
  };

  const goBackToMain = () => {
    setCurrentStep("initial");
    setElectricBill("");
  };

  const gridTypeOptions = [
    {
      id: "three-phase",
      label: "Three Phase",
      description: "Perfect For High Power Usage",
      selected: true,
    },
    {
      id: "single-phase",
      label: "Single Phase",
      description: "Perfect For Low Power Usage",
      selected: false,
    },
  ];

  const installationTypeOptions = [
    {
      id: "ongrid",
      label: "Ongrid",
      description: "Check Me If You Have Grid",
      selected: true,
    },
    {
      id: "offgrid",
      label: "Offgrid",
      description: "Check Me If You Have No Energy Source",
      selected: false,
    },
    {
      id: "hybrid",
      label: "Hybrid",
      description: "I'm Adapted To All Other Energies",
      selected: false,
    },
  ];

  const processSteps = [
    {
      title: "Answer Our Questions",
      description:
        "Answer A Few Questions Online To Get A Price Guide. Our Installer In Your Area Will Then Contact You To Book In A Personalised Survey.",
      highlighted: true,
    },
    {
      title: "Get Your Quote",
      description:
        "After The Survey We'll Send You Your Bespoke Quote, Based On Your Home's Needs.",
      highlighted: false,
    },
    {
      title: "Book Your Installation",
      description:
        "If You Go Ahead With Us, You Can Expect A Fast, Professional Installation By A Trusted, Local Expert. All Backed By A Workmanship Guarantee.",
      highlighted: false,
    },
  ];

  // Results page component
  const ResultsPage = () => (
    <div className="bg-[#06141b] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-white text-3xl font-bold mb-8">You're Almost There...</h1>
        <p className="text-white text-lg mb-8">You've Seen What Solar Can Do For You<br/>Now Let Us Take Care Of The Rest</p>
        
        <div className="flex justify-center items-center gap-8 mb-8">
          <Button 
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10"
            onClick={goToNextStep}
          >
            What Next →
          </Button>
          
          <div className="bg-[#132e35] border-2 border-white rounded-xl p-6 min-w-[300px]">
            <div className="text-gray-400 text-sm mb-2">Recommended</div>
            <div className="text-white text-xl font-bold mb-2">20.00kW Solar Power + 5kWh Storage</div>
            <div className="text-gray-400 text-sm mb-1">6% Offset + 1 Hours Avg Backup</div>
            <div className="text-gray-400 text-sm">Estimated System Size Based On Your Reported Electricity Use</div>
          </div>
        </div>
        
        <Button 
          className="bg-transparent text-white text-sm underline hover:text-gray-300"
          onClick={goBackToMain}
        >
          Back to the main
        </Button>
      </div>
    </div>
  );

  // Personal info page component
  const PersonalInfoPage = () => (
    <div className="bg-[#06141b] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-white text-3xl font-bold text-center mb-4">You're Almost There...</h1>
        <p className="text-white text-base text-center mb-12">Enter your personal information</p>
        
        <div className="flex justify-center items-start gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Input 
                className="w-40 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <Input 
                className="w-40 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
            <Input 
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
              placeholder="Home address"
              value={formData.homeAddress}
              onChange={(e) => setFormData({...formData, homeAddress: e.target.value})}
            />
            
            <div className="flex gap-4 mt-4">
              <Button 
                className="bg-transparent text-white text-sm hover:text-gray-300"
                onClick={goToPreviousStep}
              >
                Previous
              </Button>
              <Button 
                className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-100 text-sm font-medium"
                onClick={goToNextStep}
              >
                Next →
              </Button>
            </div>
          </div>
          
          <div className="bg-[#132e35] border-2 border-white rounded-xl p-6 min-w-[320px]">
            <div className="text-gray-400 text-sm mb-2">Recommended</div>
            <div className="text-white text-xl font-bold mb-2">20.00kW Solar Power + 5kWh Storage</div>
            <div className="text-gray-400 text-sm mb-1">6% Offset + 1 Hours Avg Backup</div>
            <div className="text-gray-400 text-sm">Estimated System Size Based On Your Reported Electricity Use</div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-transparent text-white text-sm hover:text-gray-300"
            onClick={goBackToMain}
          >
            Back to the main
          </Button>
        </div>
      </div>
    </div>
  );

  // Property info page component
  const PropertyInfoPage = () => (
    <div className="bg-[#06141b] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-white text-3xl font-bold text-center mb-4">You're Almost There...</h1>
        <p className="text-white text-base text-center mb-12">Enter your property information</p>
        
        <div className="flex justify-center items-start gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Input 
                className="w-40 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
                placeholder="Property type"
                value={formData.propertyType}
                onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
              />
              <Input 
                className="w-40 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
                placeholder="Humidity index"
                value={formData.humidityIndex}
                onChange={(e) => setFormData({...formData, humidityIndex: e.target.value})}
              />
            </div>
            <Input 
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
              placeholder="How much sunlight does your roof get?"
              value={formData.sunlightExposure}
              onChange={(e) => setFormData({...formData, sunlightExposure: e.target.value})}
            />
            
            <div className="flex gap-4 mt-4">
              <Button 
                className="bg-transparent text-white text-sm hover:text-gray-300"
                onClick={goToPreviousStep}
              >
                Previous
              </Button>
              <Button 
                className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-100 text-sm font-medium"
                onClick={goToNextStep}
              >
                Next →
              </Button>
            </div>
          </div>
          
          <div className="bg-[#132e35] border-2 border-white rounded-xl p-6 min-w-[320px]">
            <div className="text-gray-400 text-sm mb-2">Recommended</div>
            <div className="text-white text-xl font-bold mb-2">20.00kW Solar Power + 5kWh Storage</div>
            <div className="text-gray-400 text-sm mb-1">6% Offset + 1 Hours Avg Backup</div>
            <div className="text-gray-400 text-sm">Estimated System Size Based On Your Reported Electricity Use</div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-transparent text-white text-sm hover:text-gray-300"
            onClick={goBackToMain}
          >
            Back to the main
          </Button>
        </div>
      </div>
    </div>
  );

  // Energy options page component
  const EnergyOptionsPage = () => (
    <div className="bg-[#06141b] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-white text-3xl font-bold text-center mb-4">You're Almost There...</h1>
        <p className="text-white text-base text-center mb-12">Energy storage options</p>
        
        <div className="flex justify-center items-start gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Input 
                className="w-40 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
                placeholder="Storage mode"
                value={formData.storageMode}
                onChange={(e) => setFormData({...formData, storageMode: e.target.value})}
              />
              <Input 
                className="w-40 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
                placeholder="Maintenance service"
                value={formData.maintenanceService}
                onChange={(e) => setFormData({...formData, maintenanceService: e.target.value})}
              />
            </div>
            <Input 
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-gray-400 text-sm"
              placeholder="How many hours of back up you want?"
              value={formData.backupHours}
              onChange={(e) => setFormData({...formData, backupHours: e.target.value})}
            />
            
            <div className="flex gap-4 mt-4">
              <Button 
                className="bg-transparent text-white text-sm hover:text-gray-300"
                onClick={goToPreviousStep}
              >
                Previous
              </Button>
              <Button 
                className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-100 text-sm font-medium"
                onClick={() => setCurrentStep("simulation")}
              >
                Next →
              </Button>
            </div>
          </div>
          
          <div className="bg-[#132e35] border-2 border-white rounded-xl p-6 min-w-[320px]">
            <div className="text-gray-400 text-sm mb-2">Recommended</div>
            <div className="text-white text-xl font-bold mb-2">20.00kW Solar Power + 5kWh Storage</div>
            <div className="text-gray-400 text-sm mb-1">6% Offset + 1 Hours Avg Backup</div>
            <div className="text-gray-400 text-sm">Estimated System Size Based On Your Reported Electricity Use</div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-transparent text-white text-sm hover:text-gray-300"
            onClick={goBackToMain}
          >
            Back to the main
          </Button>
        </div>
      </div>
    </div>
  );

  // Simulation results page component
  const SimulationPage = () => (
    <div className="bg-[#06141b] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-white text-3xl font-bold text-center mb-12">This Is Your Simulation</h1>
        
        <div className="flex justify-center items-start gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-white text-sm">Estimated cost</span>
              <span className="text-white text-sm font-medium">40,500.00DH</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white text-sm">Annual savings</span>
              <span className="text-white text-sm font-medium">6,500.00/y</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white text-sm">Payback period</span>
              <span className="text-white text-sm font-medium">9 Years</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white text-sm">Installation time</span>
              <span className="text-white text-sm font-medium">3 Days</span>
            </div>
            
            <div className="flex gap-4 mt-4">
              <Button 
                className="bg-transparent text-white text-sm hover:text-gray-300"
                onClick={() => setCurrentStep("energy")}
              >
                Previous
              </Button>
              <Button 
                className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-100 text-sm font-medium"
                onClick={() => setCurrentStep("completed")}
              >
                Confirm →
              </Button>
            </div>
          </div>
          
          <div className="bg-[#132e35] border-2 border-white rounded-xl p-6 min-w-[320px]">
            <div className="text-gray-400 text-sm mb-2">Recommended</div>
            <div className="text-white text-xl font-bold mb-2">20.00kW Solar Power + 5kWh Storage</div>
            <div className="text-gray-400 text-sm mb-1">6% Offset + 1 Hours Avg Backup</div>
            <div className="text-gray-400 text-sm">Estimated System Size Based On Your Reported Electricity Use</div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-transparent text-white text-sm hover:text-gray-300"
            onClick={goBackToMain}
          >
            Back to the main
          </Button>
        </div>
      </div>
    </div>
  );

  // Completion page component
  const CompletionPage = () => (
    <div className="bg-[#06141b] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-white text-4xl font-bold mb-8">All Done</h1>
        
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h2 className="text-white text-xl font-medium mb-4">We'll be in touch shortly!</h2>
        
        <p className="text-white text-sm mb-2 max-w-md mx-auto">
          Thank you for choosing eaneer for your solar energetics
        </p>
        <p className="text-white text-sm mb-2 max-w-md mx-auto">
          team will contact you soon. You'll receive a WhatsApp
        </p>
        <p className="text-white text-sm mb-8 max-w-md mx-auto">
          message with your personalized solar offer.
        </p>
        
        <p className="text-white text-sm mb-8 max-w-md mx-auto">
          <strong>Together, we're building a brighter,</strong><br/>
          <strong>greener Morocco.</strong>
        </p>
        
        <Button 
          className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 text-sm font-medium mb-16"
          onClick={() => alert("Thank you for rating your experience!")}
        >
          Rate Your Experience →
        </Button>
        
        <Button 
          className="bg-transparent text-white text-sm hover:text-gray-300"
          onClick={goBackToMain}
        >
          Back to the main
        </Button>
      </div>
    </div>
  );

  // Render different components based on current step
  if (currentStep === "hero") return <MobileHeroPage />;
  if (currentStep === "steps") return <MobileStepsPage />;
  if (currentStep === "wizard") return <MobileWizard onBack={() => setCurrentStep("initial")} />;
  if (currentStep === "desktopWizard") return <DesktopSolarInterface onNext={() => setCurrentStep("initial")} onBack={() => setCurrentStep("initial")} />;
  if (currentStep === "results") return <ResultsPage />;
  if (currentStep === "personal") return <PersonalInfoPage />;
  if (currentStep === "property") return <PropertyInfoPage />;
  if (currentStep === "energy") return <EnergyOptionsPage />;
  if (currentStep === "simulation") return <SimulationPage />;
  if (currentStep === "completed") return <CompletionPage />;

  return (
    <div className="bg-[#06141b] grid justify-items-center [align-items:start] w-screen">
      {/* Mobile Layout - Hidden on desktop */}
      <div className="md:hidden w-full min-h-screen bg-[#06141b]">
        {/* Mobile Header */}
        <header className="w-full bg-[#06141b] shadow-[0px_0px_25px_#07151c] px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="eaneer logo" 
              className="w-6 h-6 ml-[-1px] mr-[-1px]"
            />
            <span className="text-lg font-medium text-white">eaneer</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#06141b] border-t border-[#2c4a52] px-4 py-4 shadow-lg">
            <nav className="space-y-4">
              <div className="space-y-3">
                <button className="flex items-center justify-between w-full text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Company
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <button className="flex items-center justify-between w-full text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Industry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <button className="flex items-center justify-between w-full text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <button className="block w-full text-left text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Career
                </button>
                
                <button className="block w-full text-left text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Finance
                </button>
                
                <button className="block w-full text-left text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Support
                </button>
              </div>
              
              {/* Login and Get Started buttons */}
              <div className="border-t border-[#2c4a52] pt-4 space-y-3">
                <button className="block w-full text-left text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                  Login
                </button>
                <button className="w-full bg-white text-black py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 hover:opacity-90">
                  Get started
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Hero Section */}
        <section className="px-4 py-8 text-center">
          <div className="mb-4">
            <span className="text-white text-lg font-semibold">eaneer</span>
            <span className="text-white text-lg font-semibold"> energetics summer 20%</span>
          </div>
          <h1 className="text-white text-2xl font-semibold mb-4 leading-tight">
            Start Saving Up to 80% /mo On average
          </h1>
          <p className="text-white text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Enter Your Solar Installation Details And Average Electricity Bill To Get A Quote And View Your savings
          </p>
          
        </section>

        {/* 3D House Model Section */}
        <section className="px-4 pb-4">
          <div className="max-w-md mx-auto">
            <div className="relative flex items-center justify-center h-64 mb-4">
              <img 
                src="/figmaAssets/1-1--1.png" 
                alt="3D Solar House Model" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="px-4 pb-8">
          <Card className="bg-[#06141b] rounded-2xl border-0 max-w-md mx-auto shadow-[0px_0px_20px_5px_#2c4a52]">
            <CardContent className="p-6">
              {/* Grid Type */}
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-4 font-['Rubik']">Grid Type</h3>
                <div className="flex gap-3 h-[85px]">
                  {gridTypeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex-1 px-2 py-2 rounded-[15px] border-2 cursor-pointer transition-all duration-200 h-full flex flex-col ${
                        selectedGridType === option.id
                          ? "border-white bg-[#0a1b23]"
                          : "border-gray-600 bg-[#0a1b23]"
                      }`}
                      onClick={() => setSelectedGridType(option.id)}
                      data-testid={`grid-${option.id}`}
                    >
                      <div className="flex items-start mb-1">
                        <div className={`w-[14px] h-[14px] rounded-full border-2 mr-1.5 mt-0.5 flex-shrink-0 ${
                          selectedGridType === option.id ? "border-white bg-[#d9d9d9]" : "border-white"
                        }`}>
                          {selectedGridType === option.id && (
                            <div className="w-full h-full rounded-full bg-[#d9d9d9] flex items-center justify-center">
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="text-white font-bold text-[11px] font-['Inter'] leading-tight">{option.label}</div>
                      </div>
                      <div className="text-white text-[9px] leading-tight font-['Inter'] ml-4 flex-1">
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation Type */}
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-4 font-['Rubik']">Installation Type</h3>
                <div className="grid grid-cols-3 gap-3 h-[85px]">
                  {installationTypeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`px-2 py-2 rounded-[15px] border-2 cursor-pointer transition-all duration-200 h-full flex flex-col ${
                        selectedInstallationType === option.id
                          ? "border-white bg-[#0a1b23]"
                          : "border-gray-600 bg-[#0a1b23]"
                      }`}
                      onClick={() => setSelectedInstallationType(option.id)}
                      data-testid={`installation-${option.id}`}
                    >
                      <div className="flex items-start mb-1">
                        <div className={`w-[14px] h-[14px] rounded-full border-2 mr-1.5 mt-0.5 flex-shrink-0 ${
                          selectedInstallationType === option.id ? "border-white bg-[#d9d9d9]" : "border-white"
                        }`}>
                          {selectedInstallationType === option.id && (
                            <div className="w-full h-full rounded-full bg-[#d9d9d9] flex items-center justify-center">
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="text-white font-bold text-[11px] font-['Inter'] leading-tight">{option.label}</div>
                      </div>
                      <div className="text-white text-[9px] leading-tight font-['Inter'] ml-4 flex-1">
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Electric Bill Input */}
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-4 font-['Rubik']">Electric Bill</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      id="electricBill"
                      type="number"
                      placeholder="0.00"
                      value={electricBill}
                      onChange={(e) => setElectricBill(e.target.value)}
                      className="w-full px-4 py-3 rounded-[10px] border border-white bg-transparent text-white placeholder:text-[#ffffff40] text-sm"
                      data-testid="input-electric-bill"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm font-light font-['Rubik'] pointer-events-none">
                      Dh
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-white text-black py-3 rounded-[10px] hover:bg-white/90 font-semibold text-sm font-['Rubik']"
                    data-testid="button-calculate"
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Power Your Home Save Money Section */}
        <section className="relative w-full h-[32rem] bg-[url(/figmaAssets/image-8-bit-style.png)] bg-cover bg-center flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-white text-2xl font-bold mb-4 leading-tight">
              Power Your Home, Save Money
            </h2>
            <p className="text-white text-base font-medium mb-8 leading-relaxed">
              Whether your goal is to reduce your electric bill or eliminate it completely, eaneer can help make that happen.
            </p>
            
            <Button className="w-full max-w-[280px] mx-auto bg-transparent border-2 border-white text-white px-3 py-2.5 rounded-full hover:bg-white/10 flex items-center justify-between text-xs sm:text-base sm:px-6 sm:py-3">
              <span className="font-bold">Ready To Save Energy?</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="black"/>
                </svg>
              </div>
            </Button>
          </div>
        </section>

        {/* How Do I Get Started Section */}
        <section className="px-4 py-12 bg-[#06141b]">
          <div className="max-w-md mx-auto text-center">
            {/* Header */}
            <p className="text-gray-400 text-sm mb-4">How Do I Get Started?</p>
            <h2 className="text-white text-xl font-bold mb-2">
              Explore <span className="text-[#69818d]">eaneer Energetics</span> : Solar Energy Installations
            </h2>
          </div>

          {/* Process Steps Cards */}
          <div className="max-w-md mx-auto mt-8 space-y-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                onClick={() => setSelectedProcessStep(index)}
                className={`bg-[#132e35] rounded-2xl p-6 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                  step.highlighted || selectedProcessStep === index
                    ? "border-2 border-white shadow-md shadow-white/20" 
                    : "border border-gray-600 hover:border-white hover:border-2"
                }`}
                data-testid={`process-step-${index}`}
              >
                <h3 className="text-white text-lg font-semibold mb-3 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed transition-colors duration-300 hover:text-gray-200">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Button className="w-full max-w-[280px] mx-auto bg-transparent border-2 border-white text-white px-3 py-2.5 rounded-full hover:bg-white/10 flex items-center justify-between text-xs sm:text-base sm:px-6 sm:py-3">
              <span className="font-bold">Ready To Save Energy?</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="black"/>
                </svg>
              </div>
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-12 bg-[#06141b]">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <p className="text-gray-500 text-sm font-medium mb-3">
                  Contact us today!
                </p>
                <h2 className="text-gray-900 text-2xl font-semibold leading-tight">
                  Have questions about our services or ready to start your project?
                </h2>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Type your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#06141b] focus:ring-1 focus:ring-[#06141b]"
                  data-testid="input-contact-email"
                />
                <Button className="w-full bg-[#06141b] text-white py-3 rounded-xl hover:bg-[#06141b]/90 font-medium">
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Calculator Section - Mobile Only */}
        <section className="px-4 py-12 bg-[#06141b]">
          <div className="max-w-md mx-auto">
            <Card className="bg-[#06141b] rounded-2xl border-0 shadow-[0px_0px_20px_5px_#2c4a52]">
              <CardContent className="p-6">
                {/* Grid Type */}
                <div className="mb-6">
                  <h3 className="text-white text-lg font-semibold mb-4 font-['Rubik']">Grid Type</h3>
                  <div className="flex gap-3 h-[85px]">
                    {gridTypeOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex-1 px-2 py-2 rounded-[15px] border-2 cursor-pointer transition-all duration-200 h-full flex flex-col ${
                          selectedGridType === option.id
                            ? "border-white bg-[#0a1b23]"
                            : "border-gray-600 bg-[#0a1b23]"
                        }`}
                        onClick={() => setSelectedGridType(option.id)}
                        data-testid={`grid-${option.id}-bottom`}
                      >
                        <div className="flex items-start mb-1">
                          <div className={`w-[14px] h-[14px] rounded-full border-2 mr-1.5 mt-0.5 flex-shrink-0 ${
                            selectedGridType === option.id ? "border-white bg-[#d9d9d9]" : "border-white"
                          }`}>
                            {selectedGridType === option.id && (
                              <div className="w-full h-full rounded-full bg-[#d9d9d9] flex items-center justify-center">
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="text-white font-bold text-[11px] font-['Inter'] leading-tight">{option.label}</div>
                        </div>
                        <div className="text-white text-[9px] leading-tight font-['Inter'] ml-4 flex-1">
                          {option.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Installation Type */}
                <div className="mb-6">
                  <h3 className="text-white text-lg font-semibold mb-4 font-['Rubik']">Installation Type</h3>
                  <div className="grid grid-cols-3 gap-3 h-[85px]">
                    {installationTypeOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`px-2 py-2 rounded-[15px] border-2 cursor-pointer transition-all duration-200 h-full flex flex-col ${
                          selectedInstallationType === option.id
                            ? "border-white bg-[#0a1b23]"
                            : "border-gray-600 bg-[#0a1b23]"
                        }`}
                        onClick={() => setSelectedInstallationType(option.id)}
                        data-testid={`installation-${option.id}-bottom`}
                      >
                        <div className="flex items-start mb-1">
                          <div className={`w-[14px] h-[14px] rounded-full border-2 mr-1.5 mt-0.5 flex-shrink-0 ${
                            selectedInstallationType === option.id ? "border-white bg-[#d9d9d9]" : "border-white"
                          }`}>
                            {selectedInstallationType === option.id && (
                              <div className="w-full h-full rounded-full bg-[#d9d9d9] flex items-center justify-center">
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="text-white font-bold text-[11px] font-['Inter'] leading-tight">{option.label}</div>
                        </div>
                        <div className="text-white text-[9px] leading-tight font-['Inter'] ml-4 flex-1">
                          {option.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Power Usage Input */}
                <div className="mb-6">
                  <h3 className="text-white text-lg font-semibold mb-4 font-['Rubik']">Power usage</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        id="powerUsageBottom"
                        type="number"
                        placeholder="0.00"
                        value={electricBill}
                        onChange={(e) => setElectricBill(e.target.value)}
                        className="w-full px-4 py-3 rounded-[10px] border border-white bg-transparent text-white placeholder:text-[#ffffff40] text-sm"
                        data-testid="input-power-usage-bottom"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm font-light font-['Rubik'] pointer-events-none">
                        Watts
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleCalculate}
                      className="w-full bg-white text-black py-3 rounded-[10px] hover:bg-white/90 font-semibold text-sm font-['Rubik']"
                      data-testid="button-calculate-bottom"
                    >
                      Calculate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mobile Footer */}
        <footer className="px-4 py-8 border-t border-[#2c4a52] mt-0">
          {/* Main Footer Content */}
          <div className="max-w-md mx-auto">
            {/* Logo and Description */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/attached_assets/logo.png"
                  alt="eaneer logo"
                  className="w-6 h-6 ml-[-1px] mr-[-1px] mt-[5px] mb-[5px]"
                />
                <span className="text-lg font-medium text-white">eaneer</span>
              </div>
              <p className="text-white text-sm font-medium mb-1">
                Contact Eaneer for Innovative Energy Solutions.
              </p>
              <p className="text-white text-sm mb-1">
                Transform Your Vision into Reality with Speed,
              </p>
              <p className="text-white text-sm">
                Efficiency and Savings.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Home</h4>
                <div className="space-y-2">
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">About us</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Technologies</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Industry</h4>
                <div className="space-y-2">
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Industrial</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Agriculture</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Building</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Investors</h4>
                <div className="space-y-2">
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Projects</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Finance</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Statements</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Company</h4>
                <div className="space-y-2">
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Purpose</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Innovation</div>
                  <div className="text-gray-400 text-xs hover:text-white cursor-pointer">Partners</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Links */}
          <div className="border-t border-[#2c4a52] pt-4">
            <div className="text-center space-y-3">
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <span className="text-gray-400 hover:text-white cursor-pointer">Privacy policy</span>
                <span className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</span>
                <span className="text-gray-400 hover:text-white cursor-pointer">Accessibility</span>
                <span className="text-gray-400 hover:text-white cursor-pointer">Contact</span>
                <span className="text-gray-400 hover:text-white cursor-pointer">Legal</span>
              </div>
              <div className="text-gray-400 text-xs">
                2024 eaneer. All rights reserved
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block bg-[#06141b] w-[1920px] h-[6326px] relative">
        <header className="w-[1920px] h-[86px] top-0 left-0 absolute z-10">
          <div className="w-full h-full bg-[#06141b] shadow-[0px_0px_25px_#07151c]">
            <div className="w-full h-full flex items-center px-16">
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <div className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="eaneer logo" 
                  className="w-8 h-8 ml-[-3px] mr-[-3px]"
                />
                <span className="text-xl font-medium text-white">
                  eaneer
                </span>
              </div>

              {/* Center Navigation */}
              <nav className="flex items-center space-x-8">
                <button className="flex items-center text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 focus:outline-none">
                  Company
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="flex items-center text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 focus:outline-none">
                  Industry
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="flex items-center text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200 focus:outline-none">
                  Services
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200">
                  Career
                </button>
                <button className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200">
                  Finance
                </button>
                <button className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200">
                  Support
                </button>
              </nav>

              {/* Right side - Login and Get started */}
              <div className="flex items-center space-x-4">
                <button className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200">
                  Login
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:opacity-90 bg-white text-black">
                  Get started
                </button>
              </div>
            </div>
            </div>
          </div>
        </header>

        <section className="absolute w-[882px] h-[129px] top-[168px] left-[522px]">
          <div className="absolute top-0 left-[287px] [font-family:'Source_Code_Pro',Helvetica] font-semibold text-white text-lg tracking-[0] leading-[normal]">
            <span className="[font-family:'Source_Code_Pro',Helvetica] font-semibold text-white text-lg tracking-[0]">
              eaneer
            </span>
            <span className="[font-family:'Source_Code_Pro',Helvetica] font-semibold text-white text-lg tracking-[0]">
              {" "}
              energetics summer 20%
            </span>
          </div>
          <div className="absolute top-12 left-[167px] [font-family:'Inter',Helvetica] font-semibold text-white text-[28px] tracking-[0] leading-[normal]">
            Start Saving Up to 80% /mo On average
          </div>
          <div className="absolute top-[107px] left-0 [font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
            Enter Your Solar Installation Details And Average Electricity Bill
            To Get A Quote And View Your savings
          </div>
        </section>

        <Button className="top-[351px] left-[797px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto flex items-center justify-between px-[18px]">
          <span className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Ready To Save Energy?
          </span>
          <img
            className="w-[43px] h-[43px]"
            alt="Component"
            src="/figmaAssets/component-1.svg"
          />
        </Button>

        <section className="absolute w-[1361px] h-[527px] top-[461px] left-[217px]">
          <div className="absolute w-[1251px] h-[527px] top-0 left-[110px]">
            <div className="relative w-[1918px] h-[546px] top-[5px] left-[-327px] bg-[#06141b] shadow-[0px_0px_25px_#2c4a52]">
              <Card className="relative w-[582px] h-[491px] top-[31px] left-[1014px] bg-[#06141b] rounded-[20px] shadow-[0px_0px_20px_5px_#2c4a52] border-0">
                <CardContent className="absolute w-[529px] h-[339px] top-[17px] left-9 p-0">
                  <div className="relative w-[535px] h-[339px]">
                    <div className="absolute w-[125px] top-0 left-0 [font-family:'Rubik',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                      Grid Type
                    </div>

                    <div className="absolute w-[529px] h-[304px] top-9 left-0">
                      <div className="absolute w-[207px] top-[147px] left-0 [font-family:'Rubik',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                        Installation Type
                      </div>

                      <div className="absolute w-[529px] h-[304px] top-0 left-0">
                        <RadioGroup
                          value={selectedInstallationType}
                          onValueChange={setSelectedInstallationType}
                          className="absolute w-[529px] h-[122px] top-[182px] left-0 flex flex-row gap-[13px]"
                        >
                          {installationTypeOptions.map((option, index) => (
                            <div
                              key={option.id}
                              className="w-[168px] h-[122px]"
                            >
                              <div
                                className={`w-[169px] h-[123px] rounded-[15px] border-2 ${
                                  selectedInstallationType === option.id
                                    ? "border-white bg-[#0a1b23]"
                                    : "border-gray-600 bg-[#0a1b23]"
                                }`}
                              >
                                <div className="relative w-[137px] h-[82px] top-[17px] left-[13px]">
                                  <div className="top-[3px] left-0 absolute w-[18px] h-[18px]">
                                    <RadioGroupItem
                                      value={option.id}
                                      id={option.id}
                                      className="relative h-[18px] w-[18px] rounded-[9.1px] border-white data-[state=checked]:bg-[#d9d9d9] data-[state=checked]:border-white"
                                    />
                                  </div>
                                  <Label
                                    htmlFor={option.id}
                                    className="absolute w-[66px] top-0 left-7 [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal] cursor-pointer"
                                  >
                                    {option.label}
                                  </Label>
                                  <div className="absolute w-[110px] top-[33px] left-[23px] [font-family:'Inter',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
                                    {option.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>

                        <RadioGroup
                          value={selectedGridType}
                          onValueChange={setSelectedGridType}
                          className="absolute w-[528px] h-[122px] top-0 left-0 flex flex-row gap-2"
                        >
                          {gridTypeOptions.map((option, index) => (
                            <div
                              key={option.id}
                              className="w-[262px] h-[122px]"
                            >
                              <div
                                className={`relative w-[259px] h-[123px] rounded-[15px] border-2 ${
                                  selectedGridType === option.id
                                    ? "border-white bg-[#0a1b23]"
                                    : "border-gray-600 bg-[#0a1b23]"
                                }`}
                              >
                                <div className="top-5 left-[19px] absolute w-[18px] h-[18px]">
                                  <RadioGroupItem
                                    value={option.id}
                                    id={option.id}
                                    className="relative h-[18px] w-[18px] rounded-[9.1px] border-white data-[state=checked]:bg-[#d9d9d9] data-[state=checked]:border-white"
                                  />
                                </div>
                                <Label
                                  htmlFor={option.id}
                                  className="absolute w-[150px] top-[17px] left-[47px] [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal] cursor-pointer whitespace-nowrap"
                                >
                                  {option.label}
                                </Label>
                                <div className="absolute w-[184px] top-[48px] left-[46px] [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal]">
                                  {option.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className="absolute w-[532px] h-[78px] top-[380px] left-9">
                  <div className="absolute w-[530px] h-[43px] top-[35px] left-0">
                    <div className="absolute w-[253px] h-[42px] top-0 left-0">
                      <Input
                        className="relative w-[249px] h-[42px] rounded-[10px] border border-solid border-white bg-transparent text-white placeholder:text-[#ffffff40]"
                        placeholder="0.00"
                        value={electricBill}
                        onChange={(e) => setElectricBill(e.target.value)}
                        type="number"
                      />
                      <div className="absolute w-[23px] top-2.5 left-[205px] [font-family:'Rubik',Helvetica] font-light text-white text-base tracking-[0] leading-[normal] pointer-events-none">
                        Dh
                      </div>
                    </div>

                    <Button 
                      className="absolute w-[251px] h-[42px] top-px left-[281px] bg-white rounded-[10px] border border-solid hover:bg-white/90 h-auto flex items-center justify-center"
                      onClick={handleCalculate}
                    >
                      <span className="[font-family:'Rubik',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                        Calculate
                      </span>
                    </Button>
                  </div>

                  <div className="absolute w-[147px] top-0 left-0 [font-family:'Rubik',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal]">
                    Electric Bill
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <img
            className="absolute w-[792px] h-[445px] top-12 left-0 object-cover"
            alt="Element"
            src="/figmaAssets/1-1--1.png"
          />
        </section>

        <img
          className="w-[23px] h-[26px] top-[1089px] left-[948px] absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-13.png"
        />

        <section className="absolute w-[1918px] h-[922px] top-[1185px] left-px bg-[url(/figmaAssets/image-8-bit-style.png)] bg-[100%_100%]">
          <div className="relative w-[738px] h-[249px] top-[336px] left-[592px]">
            <div className="absolute w-[734px] top-[85px] left-0 [font-family:'Inter',Helvetica] font-medium text-white text-xl text-center tracking-[0] leading-[normal]">
              Whether your goal is to reduce your electric bill or eliminate it
              completely, eaneer can help make that happen.
            </div>

            <div className="absolute top-0 left-[156px] [font-family:'Inter',Helvetica] font-bold text-white text-[28px] text-center tracking-[0] leading-[normal]">
              Power Your Home, Save Money
            </div>

            <Button className="absolute w-[327px] h-[61px] top-[188px] left-[200px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto flex items-center justify-between px-[18px]">
              <span className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                Ready To Save Energy?
              </span>
              <img
                className="w-[43px] h-[43px]"
                alt="Component"
                src="/figmaAssets/component-1.svg"
              />
            </Button>
          </div>
        </section>

        <section className="absolute w-[1919px] h-[986px] top-[2191px] left-0 bg-[#f8f8f8]">
          <div className="absolute top-[117px] left-[738px] [font-family:'Inter',Helvetica] font-bold text-black text-[28px] text-center tracking-[0] leading-[normal]">
            Take Control of Your Energy Bills
          </div>

          <div className="absolute w-[820px] top-[189px] left-[550px] [font-family:'Inter',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-[normal]">
            Take control of your energy bills by switching to solar power; reduce reliance on expensive electricity, lock in lower rates, and enjoy long term savings
          </div>

          <Button className="top-[265px] left-[797px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-[#06141b] bg-transparent hover:bg-[#06141b]/10 h-auto flex items-center justify-between px-[18px]">
            <span className="[font-family:'Inter',Helvetica] font-bold text-[#06141b] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Ready To Save Energy?
            </span>
            <img
              className="w-[43px] h-[43px]"
              alt="Component"
              src="/figmaAssets/component-1-2.svg"
            />
          </Button>

          <img
            className="w-[723px] h-[482px] top-[381px] left-[589px] absolute object-cover"
            alt="Image"
            src="/figmaAssets/image-10.png"
          />

          <div className="absolute top-[917px] left-[717px] [font-family:'Inter',Helvetica] font-semibold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            It takes just a few steps to make your family happy
          </div>
        </section>

        <div className="absolute top-[3439px] left-[853px] [font-family:'Inter',Helvetica] font-semibold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
          How Do I Get Started?
        </div>

        <div className="absolute top-[3484px] left-[599px] [font-family:'Inter',Helvetica] font-bold text-transparent text-[28px] text-center tracking-[0] leading-[normal]">
          <span className="text-white">Explore </span>
          <span className="text-[#69818d]">eaneer</span>
          <span className="text-[#69818d]"> energetics</span>
          <span className="text-white">: Solar Energy installations</span>
        </div>

        <section className="absolute w-[918px] h-[247px] top-[3608px] left-[502px]">
          <div className="flex gap-[17px]">
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className={`w-[296px] h-[247px] bg-[#132e35] rounded-[20px] ${step.highlighted ? "border-[3px] border-solid border-white" : "border-2 border-solid border-white"} relative`}
              >
                <CardContent className="h-full flex flex-col p-0">
                  <div className="absolute top-[45px] left-[21px] [font-family:'Inter',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal]">
                    {step.title}
                  </div>
                  <div className="absolute w-[245px] top-[89px] left-[21px] [font-family:'Inter',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[normal]">
                    {step.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Button className="top-[3944px] left-[815px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto flex items-center justify-between px-[18px]">
          <span className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Ready To Save Energy?
          </span>
          <img
            className="w-[43px] h-[43px]"
            alt="Component"
            src="/figmaAssets/component-1.svg"
          />
        </Button>

        <Button className="top-[5097px] left-[796px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto flex items-center justify-between px-[18px]">
          <span className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Ready To Save Energy?
          </span>
          <img
            className="w-[43px] h-[43px]"
            alt="Component"
            src="/figmaAssets/component-1.svg"
          />
        </Button>


        <img
          className="w-[23px] h-[26px] top-[4091px] left-[948px] absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-13.png"
        />

        <div className="absolute w-[1040px] top-[4358px] left-[440px] [font-family:'Inter',Helvetica] font-semibold text-transparent text-[51px] text-justify tracking-[0] leading-[normal]">
          <span className="text-white">With </span>
          <span className="text-[#69818d]">eaneer energetics</span>
          <span className="text-white">
            , your impact lives on. We&apos;re on a mission to make Morocco a
            beacon of green energy. Every solar installation is more than
            savings it&apos;s a legacy. Join our community, grow your impact,
            and inspire the future.
          </span>
        </div>

        <div className="absolute top-[4872px] left-[440px] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(44,74,82,1)_50%,rgba(255,255,255,1)_75%,rgba(105,129,141,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-semibold text-transparent text-5xl tracking-[0] leading-[normal]">
          Together, We Rise Under One Sun.
        </div>

        <div className="w-[1280px] h-[309px] top-[5362px] left-80 absolute">
          <div className="min-h-full flex justify-center items-center p-5 bg-[#06141b]" style={{ backgroundColor: '#06141b' }}>
            <div 
              className="bg-white rounded-3xl max-w-6xl w-full flex justify-between items-center shadow-sm"
              style={{ 
                border: '1.5px solid #e1e5e9',
                padding: '60px 80px'
              }}
            >
              <div className="flex-1 pr-16">
                <div 
                  className="text-base font-medium mb-4 tracking-wide"
                  style={{ color: '#6b7280' }}
                >
                  Contact us today!
                </div>
                <h2 
                  className="text-5xl font-semibold leading-tight"
                  style={{ 
                    color: '#1f2937',
                    fontSize: '42px',
                    lineHeight: '1.2'
                  }}
                >
                  Have questions about our services or ready to start your project?
                </h2>
              </div>
              
              <div className="flex flex-col gap-4" style={{ flex: '0 0 400px' }}>
                <input
                  type="email"
                  placeholder="Type your email"
                  className="w-full px-6 py-5 text-base font-normal bg-white rounded-xl outline-none transition-all duration-200"
                  style={{
                    border: '2px solid #e5e7eb',
                    color: '#374151'
                  }}
                />
                <button
                  className="w-full px-6 py-5 text-white text-base font-semibold rounded-xl cursor-pointer outline-none transition-all duration-200 hover:transform hover:-translate-y-px active:translate-y-0"
                  style={{
                    backgroundColor: '#374151',
                    border: 'none'
                  }}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>

        <img
          className="w-[23px] h-[26px] top-[5820px] left-[948px] absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-13.png"
        />

        <footer className="w-[1920px] h-[329px] top-[5997px] left-0 absolute bg-[#06141b] border-t border-[#2c4a52]">
          <div className="max-w-7xl mx-auto px-5 py-5">
            <div className="flex justify-between items-start">
              {/* Left section - Logo and Description */}
              <div className="flex flex-col flex-1 mr-10">
                {/* Logo */}
                <div className="flex items-center mb-5">
                  <img
                    src={images_removebg_preview}
                    alt="eaneer logo"
                    className="w-10 h-10 ml-[-7px] mr-[-7px] pl-[0px] pr-[0px]"
                  />
                  <div>
                    <div className="[font-family:'Inter',Helvetica] font-bold text-white text-2xl">
                      eaneer
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs mt-1">
                      Powering a Promising Future for Everyone
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="mb-5">
                  <h2 className="[font-family:'Inter',Helvetica] font-normal text-white text-base mb-2">
                    Contact Eaneer for the Energy Future
                  </h2>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm mb-1">
                    Contact Eaneer for Innovative Energy Solutions.
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm mb-1">
                    Transform Your Vision into Reality with Speed,
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                    Efficiency and Savings.
                  </p>
                </div>
              </div>

              {/* Navigation columns */}
              <div className="flex gap-16">
                {/* Home column */}
                <div className="flex flex-col">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-white text-base mb-4 cursor-pointer">
                    Home
                  </div>
                  <div className="flex flex-col">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      About us
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Technologies
                    </div>
                  </div>
                </div>
                
                {/* Industry column */}
                <div className="flex flex-col">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-white text-base mb-4 cursor-pointer">
                    Industry
                  </div>
                  <div className="flex flex-col">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Industrial
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Agriculture
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Building
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Security
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Energy
                    </div>
                  </div>
                </div>
                
                {/* Investors column */}
                <div className="flex flex-col">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-white text-base mb-4 cursor-pointer">
                    Investors
                  </div>
                  <div className="flex flex-col">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Projects
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Finance
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Statements
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Projections
                    </div>
                  </div>
                </div>
                
                {/* Company column */}
                <div className="flex flex-col">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-white text-base mb-4 cursor-pointer">
                    Company
                  </div>
                  <div className="flex flex-col">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Purpose
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Innovation
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Partners
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Carrier
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-sm mb-2 cursor-pointer hover:text-white">
                      Affiliate
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom section - Footer links */}
            <div className="border-t border-[#2c4a52] pt-4 mt-12">
              <div className="flex justify-between items-center">
                <div className="flex gap-5">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs underline cursor-pointer hover:text-white">
                    Privacy policy
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs underline cursor-pointer hover:text-white">
                    Term of Service
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs underline cursor-pointer hover:text-white">
                    Accessibility
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs underline cursor-pointer hover:text-white">
                    Contact
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs underline cursor-pointer hover:text-white">
                    Legal
                  </span>
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-[#69818d] text-xs">
                  2024 eaneer .all right reserved
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
