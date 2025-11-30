import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Home, TrendingUp, DollarSign, Brain, Award, Shield, CalendarDays, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: Home, label: getTranslation(language, 'dashboard') },
    { path: '/income-expense', icon: DollarSign, label: getTranslation(language, 'incomeExpense') },
    { path: '/investment', icon: TrendingUp, label: getTranslation(language, 'investment') },
    { path: '/ai-consultation', icon: Brain, label: getTranslation(language, 'aiConsultation') },
    { path: '/quiz', icon: Award, label: getTranslation(language, 'quiz') },
    { path: '/parental-control', icon: Shield, label: getTranslation(language, 'parentalControl') },
    { path: '/calendar', icon: CalendarDays, label: getTranslation(language, 'calendar') },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex justify-between items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-purple-600">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <LanguageSwitcher />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors mb-2"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-500 to-pink-500 text-white shadow-2xl flex-col p-6">
        <div className="mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto">
            <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
