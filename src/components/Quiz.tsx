import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../utils/languageContext';
import { getTranslation } from '../utils/translations';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Award, Trophy, Coins as CoinsIcon, Lightbulb, Zap } from 'lucide-react';
import { getQuestionsByAgeGroup, QuizQuestion } from '../utils/quizData';

interface LeaderboardEntry {
  name: string;
  score: number;
  coins: number;
}

export const Quiz: React.FC = () => {
  const { language } = useLanguage();
  const [ageGroup, setAgeGroup] = useState<'8-12' | '13-17' | '18+' | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [use2xBonus, setUse2xBonus] = useState(false);
  const [bonusUsed, setBonusUsed] = useState(false);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { name: 'Ali M.', score: 180, coins: 15 },
    { name: 'Aysel K.', score: 160, coins: 12 },
    { name: 'Elvin S.', score: 150, coins: 10 },
    { name: 'Nigar A.', score: 140, coins: 8 },
    { name: 'Rəşad B.', score: 130, coins: 5 },
  ]);

  const questions = ageGroup ? getQuestionsByAgeGroup(ageGroup) : [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAgeSelection = (age: '8-12' | '13-17' | '18+') => {
    setAgeGroup(age);
    setQuizStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    let earnedPoints = 0;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      earnedPoints = currentQuestion.points;
      if (use2xBonus && !bonusUsed) {
        earnedPoints *= 2;
        setBonusUsed(true);
        setCoins(coins - 5);
      }
      setScore(score + earnedPoints);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setUse2xBonus(false);
    } else {
      // Quiz finished
      const finalCoins = Math.floor(score / 20);
      setCoins(coins + finalCoins);
      setShowResult(true);
    }
  };

  const handleUseHint = () => {
    if (coins >= 3) {
      setCoins(coins - 3);
      alert(language === 'az' 
        ? 'İpucu: Doğru cavablardan birini düşünün və təhlükəsizlik qaydalarını yadda saxlayın!'
        : language === 'en'
        ? 'Hint: Think about one of the correct answers and remember security rules!'
        : 'Подсказка: Подумайте об одном из правильных ответов и помните правила безопасности!');
    }
  };

  const handle2xBonus = () => {
    if (coins >= 5 && !bonusUsed) {
      setUse2xBonus(true);
    }
  };

  const resetQuiz = () => {
    setAgeGroup(null);
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUse2xBonus(false);
    setBonusUsed(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navigation />
        
        <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-purple-600 mb-8">{getTranslation(language, 'cyberSecurityQuiz')}</h1>

            <Card className="p-8 bg-white shadow-lg mb-8 text-center">
              <Award className="w-20 h-20 text-purple-500 mx-auto mb-4" />
              <h2 className="text-gray-700 mb-4">{getTranslation(language, 'selectAge')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Button
                  onClick={() => handleAgeSelection('8-12')}
                  className="h-auto py-8 bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">🧒</span>
                  <span>{getTranslation(language, 'ageGroup1')}</span>
                </Button>
                <Button
                  onClick={() => handleAgeSelection('13-17')}
                  className="h-auto py-8 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">👦</span>
                  <span>{getTranslation(language, 'ageGroup2')}</span>
                </Button>
                <Button
                  onClick={() => handleAgeSelection('18+')}
                  className="h-auto py-8 bg-gradient-to-br from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">👨</span>
                  <span>{getTranslation(language, 'ageGroup3')}</span>
                </Button>
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-gray-700">{getTranslation(language, 'leaderboard')}</h2>
              </div>
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-400 text-white' :
                        index === 1 ? 'bg-gray-300' :
                        index === 2 ? 'bg-orange-300' :
                        'bg-gray-200'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{entry.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-600">{entry.score} {getTranslation(language, 'score')}</span>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <CoinsIcon className="w-4 h-4" />
                        <span>{entry.coins}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navigation />
        
        <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white shadow-lg text-center">
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-purple-600 mb-4">
                {language === 'az' && 'Təbriklər!'}
                {language === 'en' && 'Congratulations!'}
                {language === 'ru' && 'Поздравляем!'}
              </h1>
              <p className="text-gray-700 mb-8">
                {language === 'az' && `Quiz tamamlandı! Sizin xalınız: ${score}`}
                {language === 'en' && `Quiz completed! Your score: ${score}`}
                {language === 'ru' && `Викторина завершена! Ваш счет: ${score}`}
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <CoinsIcon className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl text-yellow-600">{coins} {getTranslation(language, 'coins')}</span>
              </div>
              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {language === 'az' && 'Yenidən Başla'}
                {language === 'en' && 'Start Again'}
                {language === 'ru' && 'Начать Заново'}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Score Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow">
                <span className="text-gray-600">{getTranslation(language, 'yourScore')}: </span>
                <span className="text-purple-600">{score}</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow flex items-center gap-2">
                <CoinsIcon className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-600">{coins}</span>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow">
              <span className="text-gray-600">{currentQuestionIndex + 1} / {questions.length}</span>
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 bg-white shadow-lg mb-6">
            <h2 className="text-gray-700 mb-6">
              {getTranslation(language, 'question')} {currentQuestionIndex + 1}
            </h2>
            <p className="text-gray-800 text-xl mb-8">{currentQuestion.question[language]}</p>

            <div className="space-y-3">
              {currentQuestion.options[language].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span className="text-gray-800">{option}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleUseHint}
              disabled={coins < 3}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {getTranslation(language, 'useHint')} (3 <CoinsIcon className="w-4 h-4 inline" />)
            </Button>

            <Button
              onClick={handle2xBonus}
              disabled={coins < 5 || bonusUsed || use2xBonus}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 mr-2" />
              {getTranslation(language, 'use2xBonus')} (5 <CoinsIcon className="w-4 h-4 inline" />)
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            >
              {currentQuestionIndex < questions.length - 1
                ? getTranslation(language, 'nextQuestion')
                : getTranslation(language, 'finishQuiz')}
            </Button>
          </div>

          {use2xBonus && (
            <div className="mt-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg text-center">
              <Zap className="w-6 h-6 text-orange-500 inline mr-2" />
              <span className="text-orange-700">
                {language === 'az' && '2x Bonus aktiv! Bu sual üçün 2 qat xal qazanacaqsınız!'}
                {language === 'en' && '2x Bonus active! You will earn double points for this question!'}
                {language === 'ru' && '2x Бонус активен! Вы заработаете двойные очки за этот вопрос!'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
