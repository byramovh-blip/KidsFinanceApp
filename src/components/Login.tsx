import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Smartphone, Mail, Lock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'sima' | 'phone'>('sima');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-purple-600 mb-2">{getTranslation(language, 'welcome')}</h1>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            type="button"
            onClick={() => setLoginMethod('sima')}
            className={`flex-1 ${loginMethod === 'sima' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <Mail className="w-4 h-4 mr-2" />
            SIMA
          </Button>
          <Button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 ${loginMethod === 'phone' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            {getTranslation(language, 'phoneNumber')}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {getTranslation(language, 'fullName')}
              </label>
              <Input type="text" placeholder={getTranslation(language, 'fullName')} required />
            </div>
          )}

          {loginMethod === 'sima' ? (
            <div>
              <label className="block text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {getTranslation(language, 'email')}
              </label>
              <Input type="email" placeholder={getTranslation(language, 'email')} required />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 mb-2">
                <Smartphone className="w-4 h-4 inline mr-2" />
                {getTranslation(language, 'phoneNumber')}
              </label>
              <Input type="tel" placeholder="+994 XX XXX XX XX" required />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              {getTranslation(language, 'password')}
            </label>
            <Input type="password" placeholder={getTranslation(language, 'password')} required />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            {isRegister ? getTranslation(language, 'register') : getTranslation(language, 'login')}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-purple-600 hover:text-purple-700 underline"
          >
            {isRegister 
              ? getTranslation(language, 'alreadyHaveAccount') 
              : getTranslation(language, 'dontHaveAccount')}
          </button>
        </div>
      </Card>
    </div>
  );
};
