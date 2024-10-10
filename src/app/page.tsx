"use client";

import { useState, useEffect } from 'react';
import PasswordInput from './components/PasswordInput';
import RuleList from './components/RuleList';
import { validatePassword } from './lib/validatePassword';
import { formatTime } from './lib/formatTime';
import { estimateCrackingTime } from './lib/estimateCrackingTime';

const Page = () => {
  const [password, setPassword] = useState('');
  const [rules, setRules] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [allRulesSatisfied, setAllRulesSatisfied] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const [randomLength, setRandomLength] = useState(0);
  const [randomDigitSum, setRandomDigitSum] = useState(0);
  const [randomRomanSum, setRandomRomanSum] = useState(0);

  // Ensure random values are generated only on component mount
  useEffect(() => {
    setRandomLength(Math.floor(Math.random() * (10 - 6 + 1)) + 6);
    setRandomDigitSum(Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    setRandomRomanSum(Math.floor(Math.random() * (50 - 30 + 1)) + 30);
  }, []);

  // Validate password when it changes and when random values are set
  useEffect(() => {
    if (randomLength && randomDigitSum && randomRomanSum && password) {
      setRules(validatePassword(password, randomLength, randomDigitSum, randomRomanSum));
    }
  }, [password, randomLength, randomDigitSum, randomRomanSum]);

  // Update the typing state and the timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping && !allRulesSatisfied) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTyping, allRulesSatisfied]);

  // Check if all rules are satisfied when rules change
  useEffect(() => {
    if (password && rules.length > 0) {
      const allSatisfied = rules.every((rule) => rule.isSatisfied);
      setAllRulesSatisfied(allSatisfied);
      if (allSatisfied) {
        setIsTyping(false);
        setShowCongrats(true);
      }
    }
  }, [rules, password]);

  const handlePasswordChange = (newPassword: string) => {
    if (!isTyping) {
      setIsTyping(true);
    }
    setPassword(newPassword);
  };

  const handleRestart = () => {
    setPassword('');
    setRules([]);
    setTimer(0);
    setIsTyping(false);
    setAllRulesSatisfied(false);
    setShowCongrats(false);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">İYTE Şifre Oyunu</h1>
      <div className="flex items-center justify-center">
        <div className="container mx-auto p-4 max-w-md">
          {showCongrats ? (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Tebrikler!</h2>
              <p>Şifren: {password}</p>
              <p>Süre: {formatTime(timer)}</p>
              <p>Şifrenin kırılma süresi: {estimateCrackingTime(password)}</p>
              <button onClick={handleRestart} className="mt-4 p-2 bg-blue-500 text-white rounded">Tekrar Oyna</button>
            </div>
          ) : (
            <>
              <PasswordInput onPasswordChange={handlePasswordChange} />
              <h2 className="text-xl mt-4 text-center">Şifre kuralları</h2>
              <RuleList rules={rules} />
              <div className="text-center mt-4">
                <p>Süre: {formatTime(timer)}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
