export default function objectToString(obj : any): string {
  const keyValuePairs = Object.entries(obj).map(([key, value]) => `${key}:${value}`);
  return keyValuePairs.join('/');
}