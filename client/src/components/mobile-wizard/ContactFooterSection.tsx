import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactFooterSection() {
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

      {/* Mobile Footer */}
      <footer className="px-4 py-8 border-t border-[#2c4a52] mt-0">
        {/* Main Footer Content */}
        <div className="max-w-md mx-auto">
          {/* Logo and Description */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-white rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="0,0 10,0 10,10 0,10" fill="black"/>
                  <polygon points="10,0 20,0 20,10 15,10 15,15 10,15" fill="black"/>
                  <polygon points="0,10 15,10 15,20 0,20" fill="black"/>
                </svg>
              </div>
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
    </>
  );
}