import SentRequestsSection from "@/components/friends/sentRequestsSection";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleCancelRequest } from "@/utils/handleFriendOperations";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockRequest: FriendRequest = mockData.friendRequest;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/friendsStore', () => ({ useFriendsStore: jest.fn() }));
jest.mock('@/utils/handleFriendOperations', () => ({ handleCancelRequest: jest.fn() }));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

jest.mock('expo-router', () => ({ router: { navigate: jest.fn() } }));

const storeState = { outgoing: [] as FriendRequest[], removeOutgoing: jest.fn() };

const mockStore = (outgoing: FriendRequest[]) => {
  storeState.outgoing = outgoing;
  (useFriendsStore as unknown as jest.Mock).mockImplementation((selector: (state: typeof storeState) => unknown) =>
    selector(storeState)
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
});

it('renders the heading and an empty state when there are no outgoing requests', () => {
  mockStore([]);

  render(<SentRequestsSection />);

  expect(screen.getByText('Gesendete Anfragen')).toBeVisible();
  expect(screen.getByText('Keine gesendeten Anfragen')).toBeVisible();
});

it('renders outgoing requests and wires cancel to the handler', () => {
  mockStore([mockRequest]);

  render(<SentRequestsSection />);

  expect(screen.getByText('Bob')).toBeVisible();
  expect(screen.queryByText('Keine gesendeten Anfragen')).toBeNull();

  fireEvent.press(screen.getByTestId('cancel_request_request-1'));

  expect(handleCancelRequest).toHaveBeenCalledWith(mockSession, 'request-1', storeState.removeOutgoing);
});

it('does not call the handler when there is no session', () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });
  mockStore([mockRequest]);

  render(<SentRequestsSection />);

  fireEvent.press(screen.getByTestId('cancel_request_request-1'));

  expect(handleCancelRequest).not.toHaveBeenCalled();
});
