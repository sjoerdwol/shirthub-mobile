import ShirtCard from '@/components/ui/shirtCard';
import { fireEvent, render, screen } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

const testShirt: Shirt = {
  id: 'TESTID',
  team: 'SC Freiburg',
  season: '2024',
  type: 'Home',
  condition: null,
  print_name: null,
  print_number: null,
  size: null,
  value: null,
  imageSrc: '',
  created_at: new Date(),
  updated_at: new Date()
}

it('renders ShirtCard correctly', () => {
  render(<ShirtCard imageSize='small' shirt={testShirt} />);

  screen.getByText(`${testShirt.team}`);
  screen.getByText(`${testShirt.season}, ${testShirt.type}`);
});

it('navigates to shirt detail when pressed', () => {
  const { router } = require('expo-router');

  render(<ShirtCard imageSize='small' shirt={testShirt} />);

  fireEvent.press(screen.getByTestId('pressable_navigate_to_detail'));
  expect(router.navigate).toHaveBeenCalledWith(`/shirts/${testShirt.id}`);
});