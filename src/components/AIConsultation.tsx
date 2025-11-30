import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Brain, Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
}

export const AIConsultation: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: language === 'az' 
        ? 'Salam! Mən sizin AI maliyyə köməkçinizəm. Mənə pul idarəçiliyi, investisiya və büdcə planlaması haqqında sual verə bilərsiniz.' 
        : language === 'en'
        ? 'Hello! I am your AI financial assistant. You can ask me questions about money management, investment and budget planning.'
        : 'Здравствуйте! Я ваш AI финансовый помощник. Вы можете задать мне вопросы об управлении деньгами, инвестициях и планировании бюджета.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const aiResponses = {
    az: {
      save: 'Pul yığmaq üçün: 1) Hər gəlirdən kiçik hissə ayırın, 2) Xərclərə prioritet verin, 3) Gərəksiz xərcləri azaldın, 4) Məqsəd qoyun və ona çatmaq üçün plan hazırlayın.',
      investment: 'İnvestisiya gələcək üçün pul qazanmaq üçün pulunuzu müxtəlif yerlərdə yerləşdirməkdir. Yeni başlayanlar üçün əmanət hesabı və ya dövlət istiqrazları təhlükəsizdir.',
      budget: 'Büdcə planlaşdırmaq üçün: 1) Bütün gəlir və xərclərinizi yazın, 2) Kateqoriyalara ayırın, 3) Hər kateqoriya üçün limit qoyun, 4) Aylıq nəzarət edin və tənzimləyin.',
      default: 'Bu mövzuda sizə daha spesifik məlumat verməyə kömək edə bilərəm. Zəhmət olmasa sualınızı daha dəqiq şəkildə verin.',
    },
    en: {
      save: 'To save money: 1) Set aside a small portion from each income, 2) Prioritize expenses, 3) Reduce unnecessary expenses, 4) Set goals and make a plan to reach them.',
      investment: 'Investment is placing your money in different places to earn money for the future. For beginners, savings accounts or government bonds are safe.',
      budget: 'To plan a budget: 1) Write down all income and expenses, 2) Divide into categories, 3) Set limits for each category, 4) Monitor and adjust monthly.',
      default: 'I can help you with more specific information on this topic. Please provide your question more precisely.',
    },
    ru: {
      save: 'Чтобы сэкономить деньги: 1) Откладывайте небольшую часть от каждого дохода, 2) Приоритизируйте расходы, 3) Сократите ненужные расходы, 4) Ставьте цели и составляйте план для их достижения.',
      investment: 'Инвестиции - это размещение ваших денег в разных местах, чтобы заработать деньги на будущее. Для новичков безопасны сберегательные счета или государственные облигации.',
      budget: 'Чтобы спланировать бюджет: 1) Запишите все доходы и расходы, 2) Разделите на категории, 3) Установите лимиты для каждой категории, 4) Контролируйте и корректируйте ежемесячно.',
      default: 'Я могу помочь вам с более конкретной информацией по этой теме. Пожалуйста, уточните ваш вопрос.',
    },
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const responses = aiResponses[language];

    if (lowerQuestion.includes('save') || lowerQuestion.includes('yığ') || lowerQuestion.includes('экономить')) {
      return responses.save;
    } else if (lowerQuestion.includes('invest') || lowerQuestion.includes('investisiya') || lowerQuestion.includes('инвест')) {
      return responses.investment;
    } else if (lowerQuestion.includes('budget') || lowerQuestion.includes('büdcə') || lowerQuestion.includes('бюджет')) {
      return responses.budget;
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        text: getAIResponse(inputValue),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue('');
  };

  const exampleQuestions = [
    getTranslation(language, 'example1'),
    getTranslation(language, 'example2'),
    getTranslation(language, 'example3'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-purple-600 mb-8">{getTranslation(language, 'aiConsultation')}</h1>

          {/* Chat Container */}
          <Card className="p-6 bg-white shadow-lg mb-4 h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4" />
                        <span className="text-sm">AI {getTranslation(language, 'aiAssistant')}</span>
                      </div>
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={getTranslation(language, 'askQuestion')}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Example Questions */}
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-gray-700">{getTranslation(language, 'exampleQuestions')}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-sm transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
