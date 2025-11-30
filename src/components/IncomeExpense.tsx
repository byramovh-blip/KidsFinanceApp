import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export const IncomeExpense: React.FC = () => {
  const { language } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'income', amount: 100, category: 'allowance', description: 'Weekly allowance', date: '2025-11-25' },
    { id: 2, type: 'expense', amount: 25, category: 'food', description: 'Lunch', date: '2025-11-26' },
    { id: 3, type: 'income', amount: 50, category: 'gift', description: 'Birthday gift', date: '2025-11-27' },
  ]);

  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const incomeCategories = ['salary', 'allowance', 'gift', 'other'];
  const expenseCategories = ['food', 'transport', 'entertainment', 'education', 'shopping', 'other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now(),
      type: formData.type,
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: 'income',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-purple-600 mb-8">{getTranslation(language, 'incomeExpense')}</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">{getTranslation(language, 'totalIncome')}</p>
                  <p className="text-3xl mt-2">₼{totalIncome}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-200" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">{getTranslation(language, 'totalExpense')}</p>
                  <p className="text-3xl mt-2">₼{totalExpense}</p>
                </div>
                <TrendingDown className="w-12 h-12 text-red-200" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">{getTranslation(language, 'balance')}</p>
                  <p className="text-3xl mt-2">₼{balance}</p>
                </div>
                <Wallet className="w-12 h-12 text-purple-200" />
              </div>
            </Card>
          </div>

          {/* Add Transaction Form */}
          <Card className="p-6 bg-white shadow-lg mb-8">
            <h2 className="text-gray-700 mb-4">
              {formData.type === 'income' 
                ? getTranslation(language, 'addIncome') 
                : getTranslation(language, 'addExpense')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                  className={formData.type === 'income' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {getTranslation(language, 'income')}
                </Button>
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                  className={formData.type === 'expense' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  {getTranslation(language, 'expense')}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'amount')}</label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'category')}</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={getTranslation(language, 'category')} />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {getTranslation(language, cat as any)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'description')}</label>
                  <Input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={getTranslation(language, 'description')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{getTranslation(language, 'date')}</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                {getTranslation(language, 'add')}
              </Button>
            </form>
          </Card>

          {/* Recent Transactions */}
          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-gray-700 mb-4">{getTranslation(language, 'recentTransactions')}</h2>
            <div className="space-y-3">
              {transactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    transaction.type === 'income' 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-600">
                        {getTranslation(language, transaction.category as any)} • {transaction.date}
                      </p>
                    </div>
                    <p className={`text-xl ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₼{transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
