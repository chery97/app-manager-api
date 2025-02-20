export function randomDigitNumber(): string {
  const min = 1000000; // Minimum 7-digit number
  const max = 9999999; // Maximum 7-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
}