import FriendsDrawer from "@/components/friends/friendsDrawer";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

jest.mock('@/components/friends/userSearchSection', () => {
  const { View } = require('react-native');
  return () => <View testID="user_search_section" />;
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

it('renders the title and the search section when visible', () => {
  renderDrawer({ onClose: jest.fn(), visible: true });

  expect(screen.getByText('Freunde')).toBeVisible();
  expect(screen.getByTestId('user_search_section')).toBeVisible();
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
