import Index from "@/app/(tabs)/index";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockSetShirts = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/shirtStore', () => ({ useShirtStore: jest.fn() }));
jest.mock('@/utils/handleShirtOperations', () => ({ handleShirtInitialFetch: jest.fn() }));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/homepageView', () => {
  const { View } = require('react-native');
  return () => <View testID="homepage_view" />;
});

jest.mock('@/components/friends/friendsDrawer', () => {
  const { View } = require('react-native');
  return ({ visible }: { visible: boolean }) =>
    visible ? <View testID="friends_drawer_open" /> : null;
});

beforeEach(() => {
  jest.clearAllMocks();
  (handleShirtInitialFetch as jest.Mock).mockResolvedValue(undefined);

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useShirtStore as unknown as jest.Mock).mockImplementation((selector: (state: ShirtState) => unknown) =>
    selector({ shirts: [], setShirts: mockSetShirts, addShirt: jest.fn(), updateShirt: jest.fn(), removeShirt: jest.fn() })
  );
});

it('renders header with ShirtHub title', async () => {
  render(<Index />);
  await act(async () => {});

  expect(screen.getByText('ShirtHub')).toBeVisible();
});

it('renders activity feed title and subtitle', async () => {
  render(<Index />);
  await act(async () => {});

  expect(screen.getByText('Activity Feed')).toBeVisible();
  expect(screen.getByText('Entdecke was deine Freunde so gemacht haben')).toBeVisible();
});

it('shows loading view before fetch completes', () => {
  (handleShirtInitialFetch as jest.Mock).mockReturnValue(new Promise(() => {}));

  render(<Index />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('shows homepage view after loading completes', async () => {
  render(<Index />);
  await act(async () => {});

  expect(screen.getByTestId('homepage_view')).toBeVisible();
  expect(screen.queryByTestId('loading_view')).toBeNull();
});

it('calls handleShirtInitialFetch with session and setShirts', async () => {
  render(<Index />);
  await act(async () => {});

  expect(handleShirtInitialFetch).toHaveBeenCalledWith(mockSession, mockSetShirts);
});

it('does not call handleShirtInitialFetch when session is null', async () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  render(<Index />);
  await act(async () => {});

  expect(handleShirtInitialFetch).not.toHaveBeenCalled();
});

it('keeps the friends drawer closed initially', async () => {
  render(<Index />);
  await act(async () => {});

  expect(screen.queryByTestId('friends_drawer_open')).toBeNull();
});

it('opens the friends drawer when the menu button is pressed', async () => {
  render(<Index />);
  await act(async () => {});

  fireEvent.press(screen.getByTestId('open_friends_drawer'));

  expect(screen.getByTestId('friends_drawer_open')).toBeVisible();
});
