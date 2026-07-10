import OtherUserCollectionView from "@/views/otherUserCollectionView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;
const mockShirtWithoutSize = mockData.shirtWithoutSize as unknown as Shirt;

jest.mock('@/components/shirtDisplay/shirtDisplayVertical', () => {
  const { Text, View } = require('react-native');
  return ({ shirt, friendOwnerId }: { shirt: Shirt; friendOwnerId?: string }) => (
    <View>
      <Text testID={`shirt_item_${shirt.id}`}>{shirt.team}</Text>
      <Text testID={`owner_${shirt.id}`}>{friendOwnerId}</Text>
    </View>
  );
});

it('renders all shirts in the list', () => {
  render(<OtherUserCollectionView shirts={[mockShirt, mockShirtWithoutSize]} ownerId="user-1" />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('Borussia Dortmund')).toBeVisible();
});

it('passes the owner id to each shirt card so it can open the friend detail view', () => {
  render(<OtherUserCollectionView shirts={[mockShirt]} ownerId="user-1" />);

  expect(screen.getByTestId(`owner_${mockShirt.id}`)).toHaveTextContent('user-1');
});

it('renders an empty-state message when there are no shirts', () => {
  render(<OtherUserCollectionView shirts={[]} ownerId="user-1" />);

  expect(screen.getByText(/noch keine Trikots/)).toBeVisible();
});
