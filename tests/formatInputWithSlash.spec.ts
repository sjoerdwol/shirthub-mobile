import formatInputWithSlash from "@/utils/formatInputWithSlash";

it('adds slash after the 4th character', () => {
  const formattedInput = formatInputWithSlash('20242025', '');
  expect(formattedInput).toBe('2024/2025');
});

it('keeps slash when removing a character but the string is still longer than 5', () => {
  const formattedInput = formatInputWithSlash('2024/2', '2024/20');
  expect(formattedInput).toBe('2024/2');
});

it('does not add slash if the length is exactly 4', () => {
  const formattedInput = formatInputWithSlash('2024', '');
  expect(formattedInput).toBe('2024');
});

it('removes any others slashes', () => {
  const formattedInput = formatInputWithSlash('2/02420/25', '');
  expect(formattedInput).toBe('2024/2025');
});