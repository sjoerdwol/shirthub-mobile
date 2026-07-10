import convertSize from "@/utils/convertSize";

it('converts size XS correctly', () => {
  const convertedSize = convertSize('XS');
  expect(convertedSize).toBe('Extra Small');
});

it('converts size S correctly', () => {
  const convertedSize = convertSize('S');
  expect(convertedSize).toBe('Small');
});

it('converts size M correctly', () => {
  const convertedSize = convertSize('M');
  expect(convertedSize).toBe('Medium');
});

it('converts size L correctly', () => {
  const convertedSize = convertSize('L');
  expect(convertedSize).toBe('Large');
});

it('converts size XL correctly', () => {
  const convertedSize = convertSize('XL');
  expect(convertedSize).toBe('X-Large');
});

it('keeps other sizes the same', () => {
  const convertedSize = convertSize('XXL');
  expect(convertedSize).toBe('XXL');
});