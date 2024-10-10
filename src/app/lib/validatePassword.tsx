export const validatePassword = (password: string, randomLength: number, randomDigitSum: number, randomRomanSum: number) => {
  const lowerCasePassword = password.toLowerCase(); // Convert password to lowercase

  const romanToInt = (s: string) => {
    const romanMap: { [key: string]: number } = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000,
    };
    
    let total = 0;
    let prevValue = 0;

    for (let char of s) {
      const currentValue = romanMap[char.toLowerCase()] || 0;
      total += currentValue;
      if (prevValue < currentValue) {
        total -= 2 * prevValue; // Adjust for subtraction cases
      }
      prevValue = currentValue;
    }

    return total;
  };
  const rules = [
    { id: 1, description: `En az ${randomLength} karakterden oluşmalı`, isSatisfied: password.length >= randomLength },
    { id: 2, description: 'En az 1 rakam içermeli', isSatisfied: /\d/.test(lowerCasePassword) },
    { id: 3, description: 'En az 1 büyük ve 1 küçük harf içermeli', isSatisfied: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { id: 4, description: 'En az 1 özel karakter içermeli', isSatisfied: /[!@#$%^&*(),.?":{}|<>]/.test(lowerCasePassword) },
    { id: 5, description: `Rakamlar toplamı ${randomDigitSum} yapmalı`, isSatisfied: password.split('').reduce((sum, char) => sum + (parseInt(char) || 0), 0) === randomDigitSum },
    { id: 6, description: 'Bir Roma rakamı içermeli', isSatisfied: /[ivxlcdm]/.test(lowerCasePassword) },
    { id: 8, description: 'Yusuf Baranın doğum yerini içermeli', isSatisfied: lowerCasePassword.includes('batman'), /* Replace 'balıkesir' with the actual birth place */ },
    { id: 9, description: 'IYTE kuruluş tarihi içermeli', isSatisfied: lowerCasePassword.includes('1992'), /* Replace '2001' with the actual founding year */ },
    { id: 10, description: 'Bir müzik notası eklemeli', isSatisfied: /do|re|mi|fa|sol|la|si/i.test(lowerCasePassword) },
    { id: 11, description: 'Boşluğu tamamlayın "Dream Big Work ..."', isSatisfied: lowerCasePassword.includes('hard') },
    { id: 12, description: 'Şifre gökkuşağının ortasındaki rengin HEX kodunu içermeli', isSatisfied: lowerCasePassword.includes('#00ff00') }, // Gökkuşağındaki yeşil
    { id: 13, description: 'Dünyanın en çok indirilen oyununun baş harflerini içermeli', isSatisfied: lowerCasePassword.includes('mc'), /* Replace 'subway surfers' with the actual most downloaded game */ },
    { id: 15, description: 'Şifrenizde ünlü bir programlama dili olmalı', isSatisfied: /python|java|c\+\+|javascript|ruby|c\#|swift/i.test(lowerCasePassword) },
    { id: 16, description: 'Şifrenizde bir sistem yazılımı olmalı', isSatisfied: /linux|windows|macos/i.test(lowerCasePassword) },
    { id: 17, description: 'Şifreniz İYTE\'deki bölüm sayısını içermelidir', isSatisfied: lowerCasePassword.includes('18') },
    { id: 19, description: 'Şifrenizde Java\'nın çıktığı tarih olmalı', isSatisfied: lowerCasePassword.includes('1995') }, // Java'nın çıktığı yıl
    { id: 20, description: 'Şifreniz İYTE yemekhane ücretini içermelidir', isSatisfied: lowerCasePassword.includes('18.26') },
    { id: 21, description: `Roma rakamı toplamları ${randomRomanSum}\'den düşük olmalı`, isSatisfied: romanToInt(password) < randomRomanSum },
  ];

  return rules;
};
