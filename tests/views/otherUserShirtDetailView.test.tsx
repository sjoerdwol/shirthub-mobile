import OtherUserShirtDetailView from "@/views/otherUserShirtDetailView";
import { render, screen } from "@testing-library/react-native";

const mockShirt = {
  id: 'shirt-1',
  ownerId: 'owner-1',
  team: 'FC Bayern München',
  teamKey: 'fcbayern',
  leagueKey: 'bundesliga',
  season: '2023/24',
  type: 'Home',
  condition: 9,
  printName: 'Müller',
  printNumber: 25,
  size: 'L',
  value: 90,
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  likeCount: 128,
  likedByMe: true,
} as unknown as FriendShirtDetail;

const mockShirtWithoutOptionals = {
  ...mockShirt,
  id: 'shirt-2',
  printName: null,
  printNumber: null,
  size: null,
  value: null,
  likeCount: 1,
} as unknown as FriendShirtDetail;

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

it('renders shirt team and season/type header', () => {
  render(<OtherUserShirtDetailView shirt={mockShirt} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('2023/24 • Home Jersey')).toBeVisible();
});

it('renders the like count in plural', () => {
  render(<OtherUserShirtDetailView shirt={mockShirt} />);

  expect(screen.getByText('128 Likes')).toBeVisible();
});

it('renders the like count in singular when there is one like', () => {
  render(<OtherUserShirtDetailView shirt={mockShirtWithoutOptionals} />);

  expect(screen.getByText('1 Like')).toBeVisible();
});

it('renders optional detail boxes when all fields are present', () => {
  render(<OtherUserShirtDetailView shirt={mockShirt} />);

  expect(screen.getByText('Wert')).toBeVisible();
  expect(screen.getByText('90€')).toBeVisible();
  expect(screen.getByText('Größe')).toBeVisible();
  expect(screen.getByText('Müller')).toBeVisible();
  expect(screen.getByText('25')).toBeVisible();
  expect(screen.getByText('9/10')).toBeVisible();
});

it('does not render optional detail boxes when fields are null', () => {
  render(<OtherUserShirtDetailView shirt={mockShirtWithoutOptionals} />);

  expect(screen.queryByText('Wert')).toBeNull();
  expect(screen.queryByText('Größe')).toBeNull();
  expect(screen.queryByText('Name')).toBeNull();
  expect(screen.queryByText('Nummer')).toBeNull();
});

it('does not render edit or delete actions', () => {
  render(<OtherUserShirtDetailView shirt={mockShirt} />);

  expect(screen.queryByTestId('icon_button_pencil')).toBeNull();
  expect(screen.queryByTestId('icon_button_trash-can')).toBeNull();
});
