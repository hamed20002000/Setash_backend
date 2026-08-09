export function generateSecurePassword(): string {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const all = lower + upper + numbers;
  let password = '';
  password += lower[Math.floor(Math.random() * lower.length)];
  password += upper[Math.floor(Math.random() * upper.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  for (let i = 3; i < 10; i++) { // 10 is min length, you can randomize length if you want
    password += all[Math.floor(Math.random() * all.length)];
  }
  // Shuffle password
  password = password.split('').sort(() => 0.5 - Math.random()).join('');
  return password;
}