import FriendsDrawer from "@/components/friends/friendsDrawer";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleFriendsInitialFetch } from "@/utils/handleFriendOperations";
import { render, screen } from "@testing-library/react-native";
import { fireEvent } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import mockData from "../../data.json";

const mockSession = mockData.session;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/friendsStore', () => ({ useFriendsStore: jest.fn() }));
jest.mock('@/utils/handleFriendOperations', () => ({ handleFriendsInitialFetch: jest.fn() }));

jest.mock('@/components/friends/userSearchSection', () => {
  const { View } = require('react-native');
  return () => <View testID="user_search_section" />;
});
jest.mock('@/components/friends/receivedRequestsSection', () => {
  const { View } = require('react-native');
  return () => <View testID="received_section" />;
});
jest.mock('@/components/friends/sentRequestsSection', () => {
  const { View } = require('react-native');
  return () => <View testID="sent_section" />;
});
jest.mock('@/components/friends/friendsListSection', () => {
  const { View } = require('react-native');
  return () => <View testID="friends_section" />;
});

// FriendsDrawer reads insets via useSafeAreaInsets(), which requires a provider.
const initialMetrics = {
  frame: { x: 0, y: 0, width: 320, height: 640 },
  insets: { top: 20, left: 0, right: 0, bottom: 0 },
};

const renderDrawer = (props: { visible: boolean; onClose: () => void }) =>
  render(
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <FriendsDrawer {...props} />
    </SafeAreaProvider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useFriendsStore as unknown as jest.Mock).mockImplementation((selector: (state: object) => unknown) =>
    selector({ setFriends: jest.fn(), setIncoming: jest.fn(), setOutgoing: jest.fn() })
  );
});

it('renders the title, the search section and the three friend sections when visible', () => {
  renderDrawer({ onClose: jest.fn(), visible: true });

  expect(screen.getByText('Freunde')).toBeVisible();
  expect(screen.getByTestId('user_search_section')).toBeVisible();
  expect(screen.getByTestId('received_section')).toBeVisible();
  expect(screen.getByTestId('sent_section')).toBeVisible();
  expect(screen.getByTestId('friends_section')).toBeVisible();
});

it('renders the sections in order: received → sent → friends', () => {
  renderDrawer({ onClose: jest.fn(), visible: true });

  const tree = JSON.stringify(screen.toJSON());
  expect(tree.indexOf('received_section')).toBeLessThan(tree.indexOf('sent_section'));
  expect(tree.indexOf('sent_section')).toBeLessThan(tree.indexOf('friends_section'));
});

it('loads friends and requests when it becomes visible', () => {
  renderDrawer({ onClose: jest.fn(), visible: true });

  expect(handleFriendsInitialFetch).toHaveBeenCalledTimes(1);
  expect(handleFriendsInitialFetch).toHaveBeenCalledWith(
    mockSession,
    expect.any(Function),
    expect.any(Function),
    expect.any(Function)
  );
});

it('does not load data when it is not visible', () => {
  renderDrawer({ onClose: jest.fn(), visible: false });

  expect(handleFriendsInitialFetch).not.toHaveBeenCalled();
});

it('does not load data when there is no session', () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  renderDrawer({ onClose: jest.fn(), visible: true });

  expect(handleFriendsInitialFetch).not.toHaveBeenCalled();
});

it('does not render its content when not visible', () => {
  renderDrawer({ onClose: jest.fn(), visible: false });

  expect(screen.queryByText('Freunde')).toBeNull();
});

it('calls onClose when the close button is pressed', () => {
  const onClose = jest.fn();

  renderDrawer({ onClose, visible: true });

  fireEvent.press(screen.getByTestId('close_friends_drawer'));

  expect(onClose).toHaveBeenCalled();
});

it('calls onClose when the backdrop is pressed', () => {
  const onClose = jest.fn();

  renderDrawer({ onClose, visible: true });

  fireEvent.press(screen.getByTestId('friends_drawer_backdrop'));

  expect(onClose).toHaveBeenCalled();
});
