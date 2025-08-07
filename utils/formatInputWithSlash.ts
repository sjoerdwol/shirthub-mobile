export default function formatInputWithSlash(text: string, previousText: string): string {
  // If we're deleting (new text is shorter), don't add formatting
  if (text.length < previousText.length) {
    return text;
  }

  // Remove any existing slashes first
  const cleanText = text.replace(/\//g, '');

  // If we have more than 4 digits, add slash after the 4th digit
  if (cleanText.length > 4) {
    return cleanText.slice(0, 4) + '/' + cleanText.slice(4);
  }

  return cleanText;
}