import OtherUserCollectionView from "@/views/otherUserCollectionView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;
const mockShirtWithoutSize = mockData.shirtWithoutSize as unknown as Shirt;

jest.mock('@/components/shirtDisplay/shirtDisplayVertical', () => {
  const { Text, View } = require('react-native');
  return ({ shirt, readOnly }: { shirt: Shirt; readOnly?: boolean }) => (
    <View>
      <Text testID={`shirt_item_${shirt.id}`}>{shirt.team}</Text>
      <Text testID={`read_only_${shirt.id}`}>{String(!!readOnly)}</Text>
    </View>
  );
});

it('renders all shirts in the list', () => {
  render(<OtherUserCollectionView shirts={[mockShirt, mockShirtWithoutSize]} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('Borussia Dortmund')).toBeVisible();
});

it('renders the shirt cards in read-only mode', () => {
  render(<OtherUserCollectionView shirts={[mockShirt]} />);

  expect(screen.getByTestId(`read_only_${mockShirt.id}`)).toHaveTextContent('true');
});

it('renders an empty-state message when there are no shirts', () => {
  render(<OtherUserCollectionView shirts={[]} />);

  expect(screen.getByText(/noch keine Trikots/)).toBeVisible();
});
