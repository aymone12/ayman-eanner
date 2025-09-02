import React from 'react';

export function Header() {
  return (
    <header className="w-full h-[86px] bg-[#06141b] shadow-[0px_0px_25px_#07151c] relative z-10">
      <div className="w-full h-full flex items-center px-16">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 flex items-center justify-center bg-white rounded">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,0 10,0 10,10 0,10" fill="black"/>
                <polygon points="10,0 20,0 20,10 15,10 15,15 10,15" fill="black"/>
                <polygon points="0,10 15,10 15,20 0,20" fill="black"/>
              </svg>
            </div>
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
          </nav>

          {/* Contact Button */}
          <div className="flex items-center">
            <button className="bg-transparent border border-white rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white hover:text-[#06141b] transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}