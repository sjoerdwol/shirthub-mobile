import FriendRequestItem from "@/components/friends/friendRequestItem";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

const mockRequest: FriendRequest = mockData.friendRequest;

beforeEach(() => {
  jest.clearAllMocks();
  const { router } = require('expo-router');
  router.navigate = mockNavigate;
});

describe('incoming variant', () => {
  it('renders the username, avatar and accept/decline actions', () => {
    render(
      <FriendRequestItem onAccept={jest.fn()} onDecline={jest.fn()} request={mockRequest} variant="incoming" />
    );

    expect(screen.getByText('Bob')).toBeVisible();
    expect(screen.getByTestId('shirt_image')).toBeVisible();
    expect(screen.getByTestId('accept_request_request-1')).toBeVisible();
    expect(screen.getByTestId('decline_request_request-1')).toBeVisible();
    expect(screen.queryByTestId('cancel_request_request-1')).toBeNull();
  });

  it('calls onAccept and onDecline when the actions are pressed', () => {
    const onAccept = jest.fn();
    const onDecline = jest.fn();

    render(
      <FriendRequestItem onAccept={onAccept} onDecline={onDecline} request={mockRequest} variant="incoming" />
    );

    fireEvent.press(screen.getByTestId('accept_request_request-1'));
    fireEvent.press(screen.getByTestId('decline_request_request-1'));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});

describe('outgoing variant', () => {
  it('renders only the cancel action', () => {
    render(<FriendRequestItem onCancel={jest.fn()} request={mockRequest} variant="outgoing" />);

    expect(screen.getByText('Bob')).toBeVisible();
    expect(screen.getByTestId('cancel_request_request-1')).toBeVisible();
    expect(screen.queryByTestId('accept_request_request-1')).toBeNull();
    expect(screen.queryByTestId('decline_request_request-1')).toBeNull();
  });

  it('calls onCancel when the cancel action is pressed', () => {
    const onCancel = jest.fn();

    render(<FriendRequestItem onCancel={onCancel} request={mockRequest} variant="outgoing" />);

    fireEvent.press(screen.getByTestId('cancel_request_request-1'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

it('navigates to the requesting user profile and calls onNavigate when the row is pressed', () => {
  const onNavigate = jest.fn();

  render(
    <FriendRequestItem
      onAccept={jest.fn()}
      onDecline={jest.fn()}
      onNavigate={onNavigate}
      request={mockRequest}
      variant="incoming"
    />
  );

  fireEvent.press(screen.getByTestId('friend_request-1'));

  expect(onNavigate).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith('/users/request-1');
});

it('navigates even when no onNavigate handler is provided', () => {
  render(<FriendRequestItem onCancel={jest.fn()} request={mockRequest} variant="outgoing" />);

  fireEvent.press(screen.getByTestId('friend_request-1'));

  expect(mockNavigate).toHaveBeenCalledWith('/users/request-1');
});
