'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Define nav links once to keep code DRY
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav>
      {/* Desktop Navigation: Hidden on mobile, flex on md screens and up */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle Button: Visible only on small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none" aria-label="Toggle Menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-950 border-b shadow-lg z-50 md:hidden">
          <div className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={toggleMenu}
                className="text-lg font-medium border-b border-gray-100 dark:border-gray-800 pb-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}