import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Target, TrendingUp, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const [goalAmount, setGoalAmount] = useState(1000);
  const [currentAmount, setCurrentAmount] = useState(350);
  const [goalDate, setGoalDate] = useState('2025-12-31');

  const progress = (currentAmount / goalAmount) * 100;
  
  const pieData = [
    { name: 'Progress', value: currentAmount },
    { name: 'Remaining', value: goalAmount - currentAmount },
  ];

  const COLORS = ['#a855f7', '#e9d5ff'];

  const progressData = [
    { month: 'Yan', amount: 100 },
    { month: 'Fev', amount: 150 },
    { month: 'Mar', amount: 200 },
    { month: 'Apr', amount: 280 },
    { month: 'May', amount: 350 },
  ];

  const calculateDaysRemaining = () => {
    const today = new Date();
    const target = new Date(goalDate);
    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-purple-600 mb-8">{getTranslation(language, 'dashboard')}</h1>

          {/* Goal Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{getTranslation(language, 'goalAmount')}</p>
                  <p className="text-purple-600">₼{goalAmount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{getTranslation(language, 'currentAmount')}</p>
                  <p className="text-green-600">₼{currentAmount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{getTranslation(language, 'timeRemaining')}</p>
                  <p className="text-blue-600">{calculateDaysRemaining()} {getTranslation(language, 'days')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600">{Math.round(progress)}%</span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{getTranslation(language, 'progress')}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-gray-700 mb-4">{getTranslation(language, 'yourProgress')}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-600">{getTranslation(language, 'currentAmount')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-200 rounded"></div>
                  <span className="text-sm text-gray-600">{getTranslation(language, 'timeRemaining')}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-gray-700 mb-4">{getTranslation(language, 'financialGoal')}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#a855f7" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Set Goal Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Target className="w-4 h-4 mr-2" />
                {getTranslation(language, 'setGoal')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>{getTranslation(language, 'setGoal')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'goalAmount')}</label>
                  <Input 
                    type="number" 
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(Number(e.target.value))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'currentAmount')}</label>
                  <Input 
                    type="number" 
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'completionDate')}</label>
                  <Input 
                    type="date" 
                    value={goalDate}
                    onChange={(e) => setGoalDate(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  {getTranslation(language, 'save')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
