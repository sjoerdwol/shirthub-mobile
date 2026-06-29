import ReceivedRequestsSection from "@/components/friends/receivedRequestsSection";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleAcceptRequest, handleDeclineRequest } from "@/utils/handleFriendOperations";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockRequest: FriendRequest = mockData.friendRequest;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/friendsStore', () => ({ useFriendsStore: jest.fn() }));
jest.mock('@/utils/handleFriendOperations', () => ({
  handleAcceptRequest: jest.fn(),
  handleDeclineRequest: jest.fn(),
}));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

jest.mock('expo-router', () => ({ router: { navigate: jest.fn() } }));

const storeState = { incoming: [] as FriendRequest[], addFriend: jest.fn(), removeIncoming: jest.fn() };

const mockStore = (incoming: FriendRequest[]) => {
  storeState.incoming = incoming;
  (useFriendsStore as unknown as jest.Mock).mockImplementation((selector: (state: typeof storeState) => unknown) =>
    selector(storeState)
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
});

it('renders the heading and an empty state when there are no incoming requests', () => {
  mockStore([]);

  render(<ReceivedRequestsSection />);

  expect(screen.getByText('Erhaltene Anfragen')).toBeVisible();
  expect(screen.getByText('Keine erhaltenen Anfragen')).toBeVisible();
});

it('renders incoming requests and wires accept/decline to the handlers', () => {
  mockStore([mockRequest]);

  render(<ReceivedRequestsSection />);

  expect(screen.getByText('Bob')).toBeVisible();
  expect(screen.queryByText('Keine erhaltenen Anfragen')).toBeNull();

  fireEvent.press(screen.getByTestId('accept_request_request-1'));
  fireEvent.press(screen.getByTestId('decline_request_request-1'));

  expect(handleAcceptRequest).toHaveBeenCalledWith(
    mockSession,
    mockRequest,
    storeState.addFriend,
    storeState.removeIncoming
  );
  expect(handleDeclineRequest).toHaveBeenCalledWith(mockSession, 'request-1', storeState.removeIncoming);
});

it('does not call the handlers when there is no session', () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });
  mockStore([mockRequest]);

  render(<ReceivedRequestsSection />);

  fireEvent.press(screen.getByTestId('accept_request_request-1'));
  fireEvent.press(screen.getByTestId('decline_request_request-1'));

  expect(handleAcceptRequest).not.toHaveBeenCalled();
  expect(handleDeclineRequest).not.toHaveBeenCalled();
});
