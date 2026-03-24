export default function convertSize(sizeShort: string): string {
  let sizeLong = '';

  switch (sizeShort) {
    case 'XS':
      sizeLong = 'Extra Small';
      break;
    case 'S':
      sizeLong = 'Small';
      break;
    case 'M':
      sizeLong = 'Medium';
      break;
    case 'L':
      sizeLong = 'Large';
      break;
    case 'XL':
      sizeLong = 'Extra Large';
      break;
    default:
      sizeLong = sizeShort;
      break;
  }

  return sizeLong;
}