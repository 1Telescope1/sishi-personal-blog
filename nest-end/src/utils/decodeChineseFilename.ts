export default function decodeBuffer(encodedString) {
  const bytes = [];
  for (let i = 0; i < encodedString.length; i += 2) {
    bytes.push(parseInt(encodedString.substr(i, 2), 16));
  }
  return Buffer.from(bytes).toString('utf8');
}