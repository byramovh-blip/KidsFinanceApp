import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar as CalendarIcon, Plus, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface CalendarEvent {
  id: number;
  title: string;
  type: 'income' | 'expense' | 'goal';
  amount?: number;
  date: string;
}

export const Calendar: React.FC = () => {
  const { language } = useLanguage();
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Weekly Allowance', type: 'income', amount: 100, date: '2025-12-05' },
    { id: 2, title: 'Birthday Gift', type: 'income', amount: 200, date: '2025-12-15' },
    { id: 3, title: 'School Trip', type: 'expense', amount: 50, date: '2025-12-20' },
    { id: 4, title: 'Save for Bicycle', type: 'goal', amount: 500, date: '2025-12-31' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    type: 'income' as 'income' | 'expense' | 'goal',
    amount: '',
    date: '',
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleSubmit = () => {
    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      amount: formData.amount ? Number(formData.amount) : undefined,
      date: formData.date,
    };
    setEvents([...events, newEvent]);
    setFormData({ title: '', type: 'income', amount: '', date: '' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const monthNames = {
    az: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  };

  const dayNames = {
    az: ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  };

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(year, month + delta, 1));
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-purple-600">{getTranslation(language, 'financialCalendar')}</h1>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  {getTranslation(language, 'addEvent')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>{getTranslation(language, 'addEvent')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-gray-700 mb-2">{getTranslation(language, 'eventTitle')}</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder={getTranslation(language, 'eventTitle')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">{getTranslation(language, 'eventType')}</label>
                    <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">{getTranslation(language, 'plannedIncome')}</SelectItem>
                        <SelectItem value="expense">{getTranslation(language, 'plannedExpense')}</SelectItem>
                        <SelectItem value="goal">{getTranslation(language, 'goal')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{getTranslation(language, 'amount')}</label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{getTranslation(language, 'date')}</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    {getTranslation(language, 'add')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2 p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <Button onClick={() => changeMonth(-1)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                  ←
                </Button>
                <h2 className="text-gray-700">
                  {monthNames[language][month]} {year}
                </h2>
                <Button onClick={() => changeMonth(1)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                  →
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {/* Day Names */}
                {dayNames[language].map((day, i) => (
                  <div key={i} className="text-center text-sm text-gray-600 p-2">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}

                {/* Days of month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const today = new Date();
                  const isToday = 
                    today.getDate() === day &&
                    today.getMonth() === month &&
                    today.getFullYear() === year;

                  return (
                    <div
                      key={day}
                      className={`p-2 min-h-[80px] border rounded-lg ${
                        isToday ? 'bg-purple-50 border-purple-300' : 'border-gray-200'
                      }`}
                    >
                      <div className={`text-sm mb-1 ${isToday ? 'text-purple-600' : 'text-gray-700'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded ${
                              event.type === 'income' ? 'bg-green-100 text-green-700' :
                              event.type === 'expense' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {event.title.length > 10 ? event.title.substring(0, 10) + '...' : event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-gray-700 mb-4">{getTranslation(language, 'upcomingEvents')}</h2>
              <div className="space-y-3">
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    {language === 'az' && 'Hadisə yoxdur'}
                    {language === 'en' && 'No events'}
                    {language === 'ru' && 'Нет событий'}
                  </p>
                ) : (
                  upcomingEvents.map(event => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        event.type === 'income' ? 'bg-green-50 border-green-500' :
                        event.type === 'expense' ? 'bg-red-50 border-red-500' :
                        'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        {event.type === 'income' && <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />}
                        {event.type === 'expense' && <TrendingDown className="w-4 h-4 text-red-600 mt-0.5" />}
                        {event.type === 'goal' && <Target className="w-4 h-4 text-blue-600 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-gray-800">{event.title}</p>
                          {event.amount && (
                            <p className={`text-sm ${
                              event.type === 'income' ? 'text-green-600' :
                              event.type === 'expense' ? 'text-red-600' :
                              'text-blue-600'
                            }`}>
                              ₼{event.amount}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
