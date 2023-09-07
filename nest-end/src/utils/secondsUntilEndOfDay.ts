export default function secondsUntilEndOfDay() {
  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const millisecondsRemaining = endOfDay.getTime() - now.getTime();
  const secondsRemaining = Math.floor(millisecondsRemaining / 1000);
  return secondsRemaining;
}