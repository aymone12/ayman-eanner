import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#06141b] border-t border-[#2c4a52] px-16 py-8">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto">
        {/* Logo and Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div className="mb-8 lg:mb-0 lg:max-w-md">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 mr-3 flex items-center justify-center bg-white rounded">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="0,0 10,0 10,10 0,10" fill="black"/>
                  <polygon points="10,0 20,0 20,10 15,10 15,15 10,15" fill="black"/>
                  <polygon points="0,10 15,10 15,20 0,20" fill="black"/>
                </svg>
              </div>
              <span className="text-xl font-medium text-white">eaneer</span>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
      </div>
      
      {/* Bottom Links */}
      <div className="border-t border-[#2c4a52] pt-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs mb-4 lg:mb-0">
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
  );
}