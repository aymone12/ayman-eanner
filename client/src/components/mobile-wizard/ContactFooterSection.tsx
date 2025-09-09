import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export function ContactFooterSection() {
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    if (email && email.includes('@')) {
      setLocation(`/auth?mode=signup&email=${encodeURIComponent(email)}`);
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#06141b] focus:ring-1 focus:ring-[#06141b]"
                data-testid="input-contact-email"
              />
              <Button 
                onClick={handleGetStarted}
                className="w-full bg-[#06141b] text-white py-3 rounded-xl hover:bg-[#06141b]/90 font-medium"
                data-testid="button-contact-get-started"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}