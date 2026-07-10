import ShirtDisplayVertical from "@/components/shirtDisplay/shirtDisplayVertical";
import { fireEvent, render, screen } from '@testing-library/react-native';
import mockData from "../../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;
const mockShirtWithoutSize = mockData.shirtWithoutSize as unknown as Shirt;

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

beforeEach(() => {
  jest.clearAllMocks();
  const { router } = require('expo-router');
  router.navigate = mockNavigate;
});

it('renders team, season and type', () => {
  render(<ShirtDisplayVertical shirt={mockShirt} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('2023/24 • Home')).toBeVisible();
});

it('renders the size badge when size is present', () => {
  render(<ShirtDisplayVertical shirt={mockShirt} />);

  expect(screen.getByText('Size L')).toBeVisible();
});

it('does not render the size badge when size is null', () => {
  render(<ShirtDisplayVertical shirt={mockShirtWithoutSize} />);

  expect(screen.queryByText(/Size/)).toBeNull();
});

it('renders the favorite star when the shirt is a favorite', () => {
  render(<ShirtDisplayVertical shirt={mockShirt} />);

  expect(screen.getByTestId('favorite_star')).toBeVisible();
});

it('does not render the favorite star when the shirt is not a favorite', () => {
  render(<ShirtDisplayVertical shirt={mockShirtWithoutSize} />);

  expect(screen.queryByTestId('favorite_star')).toBeNull();
});

it('navigates to the shirt detail screen on press', () => {
  render(<ShirtDisplayVertical shirt={mockShirt} />);

  fireEvent.press(screen.getByText('FC Bayern München'));

  expect(mockNavigate).toHaveBeenCalledWith(`/shirts/${mockShirt.id}`);
});

it('navigates to the friend shirt detail when a friendOwnerId is given', () => {
  render(<ShirtDisplayVertical friendOwnerId="user-1" shirt={mockShirt} />);

  fireEvent.press(screen.getByText('FC Bayern München'));

  expect(mockNavigate).toHaveBeenCalledWith(`/users/user-1/shirts/${mockShirt.id}`);
});
