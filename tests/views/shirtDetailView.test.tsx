import ShirtDetailView from "@/views/shirtDetailView";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;
const mockShirtWithoutOptionals = mockData.shirtWithoutSize as unknown as Shirt;

jest.mock('@/components/buttons/iconButton', () => {
  const { TouchableOpacity } = require('react-native');
  return ({ deleteButton, icon, onPress }: { deleteButton?: boolean; icon: string; onPress: () => void }) => (
    <TouchableOpacity testID={`icon_button_${icon}`} onPress={onPress} />
  );
});

jest.mock('@/components/details/detailBox', () => {
  const { Text, View } = require('react-native');
  return ({ tag, value }: { tag: string; value: string }) => (
    <View>
      <Text>{tag}</Text>
      <Text>{value}</Text>
    </View>
  );
});

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

jest.mock('@/utils/convertSize', () => jest.fn((size: string) => size));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders shirt team and season/type header', () => {
  render(<ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('2023/24 • Home Jersey')).toBeVisible();
});

it('renders shirt image', () => {
  render(<ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} />);

  expect(screen.getByTestId('shirt_image')).toBeVisible();
});

it('renders optional detail boxes when all fields are present', () => {
  render(<ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} />);

  expect(screen.getByText('Wert')).toBeVisible();
  expect(screen.getByText('90€')).toBeVisible();
  expect(screen.getByText('Größe')).toBeVisible();
  expect(screen.getByText('Name')).toBeVisible();
  expect(screen.getByText('Müller')).toBeVisible();
  expect(screen.getByText('Nummer')).toBeVisible();
  expect(screen.getByText('25')).toBeVisible();
  expect(screen.getByText('Zustand')).toBeVisible();
  expect(screen.getByText('9/10')).toBeVisible();
});

it('does not render optional detail boxes when fields are null', () => {
  render(<ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirtWithoutOptionals} />);

  expect(screen.queryByText('Wert')).toBeNull();
  expect(screen.queryByText('Größe')).toBeNull();
  expect(screen.queryByText('Name')).toBeNull();
  expect(screen.queryByText('Nummer')).toBeNull();
});

it('shows a no-likes message when the shirt has no likes', () => {
  render(<ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} />);

  expect(screen.getByText('Noch keine Likes')).toBeVisible();
});

it('shows the first liker and the remaining count when there are multiple likes', () => {
  const likers = [{ ownerId: 'u1', username: 'Jonas', avatarUrl: null }];
  render(
    <ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} likeCount={128} likers={likers} />
  );

  expect(screen.getByText(/Geliked von/)).toBeVisible();
  expect(screen.getByText('Jonas')).toBeVisible();
  expect(screen.getByText(/und 127 Anderen/)).toBeVisible();
});

it('shows only the liker name when there is exactly one like', () => {
  const likers = [{ ownerId: 'u1', username: 'Jonas', avatarUrl: null }];
  render(
    <ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} likeCount={1} likers={likers} />
  );

  expect(screen.getByText('Jonas')).toBeVisible();
  expect(screen.queryByText(/Anderen/)).toBeNull();
});

it('falls back to a like count when no liker profiles are available', () => {
  render(
    <ShirtDetailView handleDelete={jest.fn()} handleEdit={jest.fn()} shirt={mockShirt} likeCount={5} likers={[]} />
  );

  expect(screen.getByText('5 Likes')).toBeVisible();
});

it('calls handleEdit when pencil button is pressed', () => {
  const mockHandleEdit = jest.fn();
  render(<ShirtDetailView handleDelete={jest.fn()} handleEdit={mockHandleEdit} shirt={mockShirt} />);

  fireEvent.press(screen.getByTestId('icon_button_pencil'));

  expect(mockHandleEdit).toHaveBeenCalled();
});

it('calls handleDelete when trash-can button is pressed', () => {
  const mockHandleDelete = jest.fn();
  render(<ShirtDetailView handleDelete={mockHandleDelete} handleEdit={jest.fn()} shirt={mockShirt} />);

  fireEvent.press(screen.getByTestId('icon_button_trash-can'));

  expect(mockHandleDelete).toHaveBeenCalled();
});
