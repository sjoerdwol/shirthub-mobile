import Collection from "@/app/(tabs)/collection";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockShirt = mockData.shirt as unknown as Shirt;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/shirtStore', () => ({ useShirtStore: jest.fn() }));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/collectionView', () => {
  const { Text, View } = require('react-native');
  return ({ shirts }: { shirts: Shirt[] }) => (
    <View testID="collection_view">
      <Text>{shirts.length} shirts</Text>
    </View>
  );
});

jest.mock('@/components/inputs/singleIconInput', () => {
  const { TextInput } = require('react-native');
  return ({ onChangeText, placeholder, value }: { onChangeText: (v: string) => void; placeholder: string; value: string }) => (
    <TextInput
      testID="search_input"
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
    />
  );
});

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useShirtStore as unknown as jest.Mock).mockImplementation((selector: (state: ShirtState) => unknown) =>
    selector({ shirts: [mockShirt], setShirts: jest.fn(), addShirt: jest.fn(), updateShirt: jest.fn(), removeShirt: jest.fn() })
  );
});

it('renders header with collection title', async () => {
  render(<Collection />);
  await act(async () => {});

  expect(screen.getByText('Meine Sammlung')).toBeVisible();
});

it('renders filter chip for all shirts', async () => {
  render(<Collection />);
  await act(async () => {});

  expect(screen.getByText('Alle Trikots')).toBeVisible();
});

it('shows collection view after loading completes', async () => {
  render(<Collection />);
  await act(async () => {});

  expect(screen.getByTestId('collection_view')).toBeVisible();
  expect(screen.queryByTestId('loading_view')).toBeNull();
});

it('renders search input', async () => {
  render(<Collection />);
  await act(async () => {});

  expect(screen.getByTestId('search_input')).toBeVisible();
});

it('updates search term when typing in search input', async () => {
  render(<Collection />);
  await act(async () => {});

  fireEvent.changeText(screen.getByTestId('search_input'), 'Bayern');

  expect(screen.getByDisplayValue('Bayern')).toBeVisible();
});

it('passes shirts from store to collection view', async () => {
  render(<Collection />);
  await act(async () => {});

  expect(screen.getByText('1 shirts')).toBeVisible();
});
