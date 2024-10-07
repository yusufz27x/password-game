import { useState } from 'react';

interface PasswordInputProps {
  onPasswordChange: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange }) => {
  const [password, setPassword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    onPasswordChange(newPassword);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={password}
        onChange={handleInputChange}
        placeholder="Şifrenizi giriniz"
        className="p-2 border rounded-md w-full bg-[var(--background)] text-[var(--foreground)]"
      />
      <span className="ml-2 text-gray-600">{password.length}</span>
    </div>
  );
};

export default PasswordInput;
