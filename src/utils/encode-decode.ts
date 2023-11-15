export function encodeID(inputString: string, secret: string) {
  let encodedString = "";
  for (let i = 0; i < inputString.length; i++) {
    const charCode =
      inputString.charCodeAt(i) + secret.charCodeAt(i % secret.length);
    encodedString += String.fromCharCode(charCode);
  }
  return encodedString;
}

export function decodeID(encodedString: string, secret: string) {
  let decodedString = "";
  for (let i = 0; i < encodedString.length; i++) {
    const charCode =
      encodedString.charCodeAt(i) - secret.charCodeAt(i % secret.length);
    decodedString += String.fromCharCode(charCode);
  }
  return decodedString;
}
