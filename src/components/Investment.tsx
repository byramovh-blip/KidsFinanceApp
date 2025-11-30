import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { TrendingUp, Shield, Zap, PiggyBank, BarChart3, Sparkles } from 'lucide-react';

export const Investment: React.FC = () => {
  const { language } = useLanguage();
  const [selectedRisk, setSelectedRisk] = useState<'low' | 'medium' | 'high'>('low');

  const investmentOptions = {
    low: [
      {
        icon: PiggyBank,
        title: getTranslation(language, 'savingsAccount'),
        description: getTranslation(language, 'savingsDesc'),
        return: '2-4%',
        color: 'from-green-400 to-green-500',
      },
    ],
    medium: [
      {
        icon: BarChart3,
        title: getTranslation(language, 'bonds'),
        description: getTranslation(language, 'bondsDesc'),
        return: '5-8%',
        color: 'from-blue-400 to-blue-500',
      },
    ],
    high: [
      {
        icon: Sparkles,
        title: getTranslation(language, 'stocks'),
        description: getTranslation(language, 'stocksDesc'),
        return: '8-15%',
        color: 'from-purple-400 to-purple-500',
      },
    ],
  };

  const tips = {
    az: [
      'Həmişə diversifikasiya edin - bütün pulunuzu bir yerə qoymayın',
      'Uzun müddətli fikirləşin - investisiya səbr tələb edir',
      'Başlamazdan əvvəl araşdırma aparın',
      'Risk səviyyənizi anlayın',
      'Kiçik məbləğlərlə başlayın və öyrənin',
    ],
    en: [
      'Always diversify - don\'t put all your money in one place',
      'Think long-term - investing requires patience',
      'Do research before starting',
      'Understand your risk level',
      'Start with small amounts and learn',
    ],
    ru: [
      'Всегда диверсифицируйте - не кладите все деньги в одно место',
      'Думайте долгосрочно - инвестирование требует терпения',
      'Проводите исследования перед началом',
      'Понимайте свой уровень риска',
      'Начинайте с небольших сумм и учитесь',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-purple-600 mb-8">{getTranslation(language, 'investmentAdvice')}</h1>

          {/* Risk Level Selection */}
          <Card className="p-6 bg-white shadow-lg mb-8">
            <h2 className="text-gray-700 mb-4">{getTranslation(language, 'riskLevel')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedRisk('low')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRisk === 'low'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Shield className={`w-8 h-8 mb-2 ${selectedRisk === 'low' ? 'text-green-500' : 'text-gray-400'}`} />
                <h3 className={selectedRisk === 'low' ? 'text-green-700' : 'text-gray-700'}>
                  {getTranslation(language, 'low')}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'az' && 'Təhlükəsiz və sabit'}
                  {language === 'en' && 'Safe and stable'}
                  {language === 'ru' && 'Безопасный и стабильный'}
                </p>
              </button>

              <button
                onClick={() => setSelectedRisk('medium')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRisk === 'medium'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <TrendingUp className={`w-8 h-8 mb-2 ${selectedRisk === 'medium' ? 'text-blue-500' : 'text-gray-400'}`} />
                <h3 className={selectedRisk === 'medium' ? 'text-blue-700' : 'text-gray-700'}>
                  {getTranslation(language, 'medium')}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'az' && 'Balanslaşdırılmış'}
                  {language === 'en' && 'Balanced'}
                  {language === 'ru' && 'Сбалансированный'}
                </p>
              </button>

              <button
                onClick={() => setSelectedRisk('high')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRisk === 'high'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Zap className={`w-8 h-8 mb-2 ${selectedRisk === 'high' ? 'text-purple-500' : 'text-gray-400'}`} />
                <h3 className={selectedRisk === 'high' ? 'text-purple-700' : 'text-gray-700'}>
                  {getTranslation(language, 'high')}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'az' && 'Yüksək gəlir potensialı'}
                  {language === 'en' && 'High return potential'}
                  {language === 'ru' && 'Высокий потенциал дохода'}
                </p>
              </button>
            </div>
          </Card>

          {/* Recommended Investments */}
          <div className="mb-8">
            <h2 className="text-gray-700 mb-4">{getTranslation(language, 'recommendedInvestments')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentOptions[selectedRisk].map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`h-32 bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                      <Icon className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-gray-800 mb-2">{option.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {language === 'az' && 'İllik Gəlir'}
                          {language === 'en' && 'Annual Return'}
                          {language === 'ru' && 'Годовой доход'}
                        </span>
                        <span className="text-green-600">{option.return}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Investment Tips */}
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
            <h2 className="mb-4">
              {language === 'az' && 'İnvestisiya Məsləhətləri'}
              {language === 'en' && 'Investment Tips'}
              {language === 'ru' && 'Советы по Инвестициям'}
            </h2>
            <ul className="space-y-3">
              {tips[language].map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
