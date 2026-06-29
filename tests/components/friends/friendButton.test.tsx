import FriendButton from "@/components/friends/friendButton";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import {
  handleAcceptRequest,
  handleCancelRequest,
  handleDeclineRequest,
  handleRemoveFriend,
  handleSendRequest,
} from "@/utils/handleFriendOperations";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/friendsStore', () => ({ useFriendsStore: jest.fn() }));
jest.mock('@/utils/handleFriendOperations', () => ({
  handleAcceptRequest: jest.fn(),
  handleCancelRequest: jest.fn(),
  handleDeclineRequest: jest.fn(),
  handleRemoveFriend: jest.fn(),
  handleSendRequest: jest.fn(),
}));

const storeState = {
  addFriend: jest.fn(),
  addOutgoing: jest.fn(),
  removeFriend: jest.fn(),
  removeIncoming: jest.fn(),
  removeOutgoing: jest.fn(),
};

const baseProps = { ownerId: 'other-1', username: 'Charlie', avatarUrl: null };

const renderButton = (initialStatus: FriendStatus) =>
  render(<FriendButton {...baseProps} initialStatus={initialStatus} />);

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useFriendsStore as unknown as jest.Mock).mockImplementation((selector: (state: typeof storeState) => unknown) =>
    selector(storeState)
  );
});

it('renders nothing when there is no session', () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  renderButton('none');

  expect(screen.queryByTestId('friend_button')).toBeNull();
});

it('shows "Freund hinzufügen" and sends a request, switching to the withdraw state', async () => {
  (handleSendRequest as jest.Mock).mockResolvedValue('requestSent');

  renderButton('none');

  expect(screen.getByText('Freund hinzufügen')).toBeVisible();

  await act(async () => {
    fireEvent.press(screen.getByText('Freund hinzufügen'));
  });

  expect(handleSendRequest).toHaveBeenCalledWith(
    mockSession,
    baseProps,
    storeState.addOutgoing,
    storeState.addFriend,
    storeState.removeIncoming
  );
  expect(screen.getByText('Anfrage zurückziehen')).toBeVisible();
});

it('becomes friends directly when the send results in an accepted friendship', async () => {
  (handleSendRequest as jest.Mock).mockResolvedValue('friends');

  renderButton('none');

  await act(async () => {
    fireEvent.press(screen.getByText('Freund hinzufügen'));
  });

  expect(screen.getByText('Freund entfernen')).toBeVisible();
});

it('shows "Anfrage zurückziehen" and cancels the request, switching back to add', async () => {
  renderButton('requestSent');

  expect(screen.getByText('Anfrage zurückziehen')).toBeVisible();

  await act(async () => {
    fireEvent.press(screen.getByText('Anfrage zurückziehen'));
  });

  expect(handleCancelRequest).toHaveBeenCalledWith(mockSession, 'other-1', storeState.removeOutgoing);
  expect(screen.getByText('Freund hinzufügen')).toBeVisible();
});

it('shows accept/decline for an incoming request and accepts it', async () => {
  (handleAcceptRequest as jest.Mock).mockResolvedValue(true);

  renderButton('requestReceived');

  expect(screen.getByText('Annehmen')).toBeVisible();
  expect(screen.getByText('Ablehnen')).toBeVisible();

  await act(async () => {
    fireEvent.press(screen.getByText('Annehmen'));
  });

  expect(handleAcceptRequest).toHaveBeenCalledWith(
    mockSession,
    baseProps,
    storeState.addFriend,
    storeState.removeIncoming
  );
  expect(screen.getByText('Freund entfernen')).toBeVisible();
});

it('keeps the incoming state when accepting fails', async () => {
  (handleAcceptRequest as jest.Mock).mockResolvedValue(false);

  renderButton('requestReceived');

  await act(async () => {
    fireEvent.press(screen.getByText('Annehmen'));
  });

  expect(screen.getByText('Annehmen')).toBeVisible();
});

it('declines an incoming request, switching to the add state', async () => {
  renderButton('requestReceived');

  await act(async () => {
    fireEvent.press(screen.getByText('Ablehnen'));
  });

  expect(handleDeclineRequest).toHaveBeenCalledWith(mockSession, 'other-1', storeState.removeIncoming);
  expect(screen.getByText('Freund hinzufügen')).toBeVisible();
});

it('shows "Freund entfernen" for friends and removes the friendship', async () => {
  renderButton('friends');

  expect(screen.getByText('Freund entfernen')).toBeVisible();

  await act(async () => {
    fireEvent.press(screen.getByText('Freund entfernen'));
  });

  expect(handleRemoveFriend).toHaveBeenCalledWith(mockSession, 'other-1', storeState.removeFriend);
  expect(screen.getByText('Freund hinzufügen')).toBeVisible();
});
