import CollectionView from "@/views/collectionView";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;
const mockShirtWithoutSize = mockData.shirtWithoutSize as unknown as Shirt;
const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));

jest.mock('@/components/shirtDisplay/shirtDisplayVertical', () => {
  const { Text, View } = require('react-native');
  return ({ shirt }: { shirt: Shirt }) => (
    <View>
      <Text testID={`shirt_item_${shirt.id}`}>{shirt.team}</Text>
    </View>
  );
});

beforeEach(() => {
  jest.clearAllMocks();
  const { router } = require('expo-router');
  router.navigate = mockNavigate;
});

it('renders all shirts in the list', () => {
  render(<CollectionView shirts={[mockShirt, mockShirtWithoutSize]} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('Borussia Dortmund')).toBeVisible();
});

it('renders an empty list without crashing', () => {
  render(<CollectionView shirts={[]} />);

  expect(screen.queryByTestId('shirt_item_shirt-1')).toBeNull();
});

it('navigates to shirt manage screen when add button is pressed', () => {
  render(<CollectionView shirts={[mockShirt]} />);

  fireEvent.press(screen.getByTestId('add_shirt_button'));

  expect(mockNavigate).toHaveBeenCalledWith({
    pathname: '/shirts/manage',
    params: { mode: 'add' },
  });
});
