import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Shield, Mail, Phone, Bell, CheckCircle } from 'lucide-react';

export const ParentalControl: React.FC = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({
    parentEmail: '',
    parentPhone: '',
    dailyReport: true,
    weeklyReport: true,
    alertOnLargeExpense: true,
    expenseThreshold: 50,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-purple-600 mb-8">{getTranslation(language, 'parentalControl')}</h1>

          {/* Info Card */}
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg mb-8">
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 flex-shrink-0" />
              <div>
                <h2 className="mb-2">
                  {language === 'az' && 'Valideyn Nəzarəti'}
                  {language === 'en' && 'Parental Control'}
                  {language === 'ru' && 'Родительский Контроль'}
                </h2>
                <p>
                  {language === 'az' && 'Valideyinləriniz maliyyə fəaliyyətiniz haqqında bildiriş ala bilərlər. Bu, təhlükəsizliyinizi artırır və maliyyə bacarıqlarınızı inkişaf etdirməyə kömək edir.'}
                  {language === 'en' && 'Your parents can receive notifications about your financial activities. This increases your security and helps develop your financial skills.'}
                  {language === 'ru' && 'Ваши родители могут получать уведомления о вашей финансовой деятельности. Это повышает вашу безопасность и помогает развивать финансовые навыки.'}
                </p>
              </div>
            </div>
          </Card>

          {/* Settings Form */}
          <Card className="p-6 bg-white shadow-lg mb-8">
            <h2 className="text-gray-700 mb-6">{getTranslation(language, 'parentalSettings')}</h2>

            <div className="space-y-6">
              {/* Parent Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  {getTranslation(language, 'parentEmail')}
                </label>
                <Input
                  type="email"
                  value={settings.parentEmail}
                  onChange={(e) => setSettings({ ...settings, parentEmail: e.target.value })}
                  placeholder="parent@example.com"
                />
              </div>

              {/* Parent Phone */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  {getTranslation(language, 'parentPhone')}
                </label>
                <Input
                  type="tel"
                  value={settings.parentPhone}
                  onChange={(e) => setSettings({ ...settings, parentPhone: e.target.value })}
                  placeholder="+994 XX XXX XX XX"
                />
              </div>

              {/* Divider */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <h3 className="text-gray-700">{getTranslation(language, 'notificationSettings')}</h3>
                </div>

                {/* Daily Report */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
                  <div>
                    <p className="text-gray-800">{getTranslation(language, 'sendDailyReport')}</p>
                    <p className="text-sm text-gray-600">
                      {language === 'az' && 'Hər gün gəlir və xərc hesabatı'}
                      {language === 'en' && 'Daily income and expense report'}
                      {language === 'ru' && 'Ежедневный отчет о доходах и расходах'}
                    </p>
                  </div>
                  <Switch
                    checked={settings.dailyReport}
                    onCheckedChange={(checked) => setSettings({ ...settings, dailyReport: checked })}
                  />
                </div>

                {/* Weekly Report */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
                  <div>
                    <p className="text-gray-800">{getTranslation(language, 'sendWeeklyReport')}</p>
                    <p className="text-sm text-gray-600">
                      {language === 'az' && 'Həftəlik ümumi hesabat və statistika'}
                      {language === 'en' && 'Weekly summary report and statistics'}
                      {language === 'ru' && 'Еженедельный сводный отчет и статистика'}
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyReport}
                    onCheckedChange={(checked) => setSettings({ ...settings, weeklyReport: checked })}
                  />
                </div>

                {/* Large Expense Alert */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
                  <div>
                    <p className="text-gray-800">{getTranslation(language, 'alertOnLargeExpense')}</p>
                    <p className="text-sm text-gray-600">
                      {language === 'az' && 'Böyük xərc edildikdə dərhal bildiriş'}
                      {language === 'en' && 'Immediate notification on large expenses'}
                      {language === 'ru' && 'Немедленное уведомление о крупных расходах'}
                    </p>
                  </div>
                  <Switch
                    checked={settings.alertOnLargeExpense}
                    onCheckedChange={(checked) => setSettings({ ...settings, alertOnLargeExpense: checked })}
                  />
                </div>

                {/* Expense Threshold */}
                {settings.alertOnLargeExpense && (
                  <div className="ml-4 mt-2">
                    <label className="block text-gray-700 mb-2">
                      {language === 'az' && 'Xərc limiti (₼)'}
                      {language === 'en' && 'Expense limit (₼)'}
                      {language === 'ru' && 'Лимит расходов (₼)'}
                    </label>
                    <Input
                      type="number"
                      value={settings.expenseThreshold}
                      onChange={(e) => setSettings({ ...settings, expenseThreshold: Number(e.target.value) })}
                      placeholder="50"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {getTranslation(language, 'saveSettings')}
            </Button>

            {/* Success Message */}
            {saved && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span>{getTranslation(language, 'settingsSaved')}</span>
              </div>
            )}
          </Card>

          {/* Information Card */}
          <Card className="p-6 bg-blue-50 border-2 border-blue-200">
            <h3 className="text-blue-800 mb-2">
              {language === 'az' && 'Təhlükəsizlik Məlumatı'}
              {language === 'en' && 'Security Information'}
              {language === 'ru' && 'Информация о Безопасности'}
            </h3>
            <p className="text-blue-700 text-sm">
              {language === 'az' && 'Valideyinlərinizin email və telefon nömrəsi təhlükəsiz şəkildə saxlanılır və yalnız bildirişlər göndərmək üçün istifadə olunur. Heç bir məlumat üçüncü tərəflərlə paylaşılmır.'}
              {language === 'en' && 'Your parents\' email and phone number are stored securely and used only to send notifications. No information is shared with third parties.'}
              {language === 'ru' && 'Email и номер телефона ваших родителей хранятся безопасно и используются только для отправки уведомлений. Никакая информация не передается третьим лицам.'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
