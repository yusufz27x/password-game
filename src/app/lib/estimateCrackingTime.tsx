import zxcvbn from 'zxcvbn';

export const estimateCrackingTime = (password: string): string => {
  const result = zxcvbn(password);
  const crackTimeSeconds = Number(result.crack_times_seconds.offline_fast_hashing_1e10_per_second);

  const minutes = Math.floor(crackTimeSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} yıl`;
  if (days > 0) return `${days} gün`;
  if (hours > 0) return `${hours} saat`;
  if (minutes > 0) return `${minutes} dakika`;
  return `${Math.floor(crackTimeSeconds)} saniye`;
};
