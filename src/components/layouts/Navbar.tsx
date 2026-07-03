/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, GraduationCap, Users, BookOpen, Search, Menu, X, ArrowUpRight, LogIn, LogOut, ShieldAlert, ChevronDown, Award, Briefcase, Heart } from 'lucide-react';
import { UserRole } from '../../types';
import { RiseLogo } from '../ui/RiseLogo';

interface NavbarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  currentUser: { fullName: string; role: UserRole } | null;
  onLogout: () => void;
  onNavigateSearch: () => void;
}

export function Navbar({ activeRoute, onNavigate, currentUser, onLogout, onNavigateSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const dropdownTimeoutRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const openDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProgramDropdownOpen(true);
  };

  const closeDropdownWithDelay = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setProgramDropdownOpen(false);
    }, 450); // 450ms delay to prevent accidental disappearance
  };

  const navItems = [
    { label: 'Beranda', route: '/' },
    { 
      label: 'Program', 
      route: '#',
      children: [
        { label: 'RISE Academy', route: '/program/academy' },
        { label: 'RISE Camp', route: '/program/camp', badge: '★ Unggulan' },
        { label: 'RISE Community', route: '/program/community' },
      ]
    },
    { label: 'Blog', route: '/blog' },
    { label: 'Sponsorship', route: '/sponsorship' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('/')} 
          className="cursor-pointer"
        >
          <RiseLogo className="w-9 h-9" showText={true} textColorClass="text-gray-800" />
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const hasChildren = !!item.children;
            const isActive = activeRoute === item.route || (item.children?.some(c => activeRoute === c.route) || activeRoute.startsWith(item.route + '/'));
            
            if (hasChildren) {
              return (
                <div 
                  key={item.label} 
                  className="relative group py-5"
                  onMouseLeave={() => setProgramDropdownOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setProgramDropdownOpen(!programDropdownOpen);
                    }}
                    className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'text-brand-orange font-semibold'
                        : 'text-gray-700 hover:text-brand-orange'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 opacity-70 transition-transform duration-200 ${programDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl bg-white border border-gray-100 shadow-xl transition-all duration-200 z-50 p-2 ${
                    programDropdownOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                  }`}>
                    {item.children.map((subItem) => {
                      const isSubActive = activeRoute === subItem.route;
                      return (
                        <button
                          key={subItem.label}
                          onClick={() => {
                            onNavigate(subItem.route);
                            setMobileMenuOpen(false);
                            setProgramDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg hover:bg-brand-orange/10 cursor-pointer text-gray-700 hover:text-brand-orange transition flex items-center justify-between text-sm font-medium ${
                            isSubActive ? 'text-brand-orange bg-brand-orange/5 font-semibold' : ''
                          }`}
                        >
                          <span>{subItem.label}</span>
                          {subItem.badge && (
                            <span className="bg-brand-green text-white text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-brand-orange font-semibold'
                    : 'text-gray-700 hover:text-brand-orange'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions Block */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onNavigateSearch}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${
              activeRoute === '/search' ? 'text-brand-orange' : 'text-gray-600 hover:text-brand-orange'
            }`}
            title="Cari Program"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/dashboard')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeRoute === '/dashboard'
                    ? 'bg-brand-navy text-white border-brand-navy'
                    : 'bg-white text-slate-800 border-gray-200 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                Dashboard ({currentUser.fullName.split(' ')[0]})
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg border border-gray-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition cursor-pointer"
                title="Keluar"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('/auth/login')}
              className="px-5 py-2 rounded-lg bg-brand-orange hover:bg-[#EA580C] text-white text-sm font-medium transition duration-150 cursor-pointer"
            >
              Masuk
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onNavigateSearch}
            className="p-2 rounded-full text-brand-navy hover:bg-gray-100"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-brand-navy hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="space-y-1">
            {navItems.map((item) => {
              const hasChildren = !!item.children;
              const isActive = activeRoute === item.route || (item.children?.some(c => activeRoute === c.route));
              
              if (hasChildren) {
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="px-4 pt-3 pb-1.5 text-[10px] font-bold tracking-widest text-brand-grey uppercase font-mono">
                      {item.label}
                    </div>
                    <div className="pl-2 space-y-1">
                      {item.children.map((subItem) => {
                        const isSubActive = activeRoute === subItem.route;
                        return (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              onNavigate(subItem.route);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition cursor-pointer ${
                              isSubActive
                                ? 'bg-brand-light text-brand-orange font-bold'
                                : 'text-brand-navy hover:bg-gray-50'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span>{subItem.label}</span>
                              {subItem.badge && (
                                <span className="bg-brand-green text-white text-[9px] font-bold px-2 py-0.5 rounded-full scale-90 whitespace-nowrap">
                                  {subItem.badge}
                                </span>
                              )}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition cursor-pointer ${
                    isActive
                      ? 'bg-brand-light text-brand-orange'
                      : 'text-brand-navy hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-xl bg-brand-navy text-white text-sm font-semibold"
                >
                  Lihat Dashboard ({currentUser.fullName})
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-xl border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50"
                >
                  Keluar dari Sesi
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('/auth/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 rounded-xl bg-brand-orange text-white text-sm font-semibold shadow-md"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
