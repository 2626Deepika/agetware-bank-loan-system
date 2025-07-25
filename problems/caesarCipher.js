function caesarEncode(message, shift) {
  return message
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;
    })
    .join('');
}

function caesarDecode(message, shift) {
  return caesarEncode(message, 26 - shift);
}

// Example usage:
console.log("Encoded:", caesarEncode("Hello World", 3));
console.log("Decoded:", caesarDecode("Khoor Zruog", 3));
