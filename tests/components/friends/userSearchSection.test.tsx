import UserSearchSection from "@/components/friends/userSearchSection";
import { useAuth } from "@/contexts/authContext";
import { searchUsers } from "@/services/shirthub_user_profile";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/services/shirthub_user_profile', () => ({ searchUsers: jest.fn() }));
// Debounce is exercised in its own test; here we make it pass values through.
jest.mock('@/utils/useDebouncedValue', () => ({ __esModule: true, default: (value: string) => value }));

jest.mock('@/components/users/userSearchResultItem', () => {
  const { Text } = require('react-native');
  return ({ user }: { user: UserSearchResult }) => <Text>{user.username}</Text>;
});

const mockResults: UserSearchResult[] = [
  { ownerId: '1', username: 'Alice', avatarUrl: null },
  { ownerId: '2', username: 'Alfred', avatarUrl: null },
];

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
});

it('does not search and shows no results for an empty query', async () => {
  render(<UserSearchSection />);
  await act(async () => {});

  expect(searchUsers).not.toHaveBeenCalled();
  expect(screen.queryByText('Keine Nutzer gefunden')).toBeNull();
});

it('searches and renders matching users as the query changes', async () => {
  (searchUsers as jest.Mock).mockResolvedValue(mockResults);

  render(<UserSearchSection />);

  await act(async () => {
    fireEvent.changeText(screen.getByPlaceholderText('Nutzer suchen ...'), 'Al');
  });

  expect(searchUsers).toHaveBeenCalledWith(mockSession, 'Al');
  expect(screen.getByText('Alice')).toBeVisible();
  expect(screen.getByText('Alfred')).toBeVisible();
});

it('shows an empty state when the search returns no users', async () => {
  (searchUsers as jest.Mock).mockResolvedValue([]);

  render(<UserSearchSection />);

  await act(async () => {
    fireEvent.changeText(screen.getByPlaceholderText('Nutzer suchen ...'), 'zzz');
  });

  expect(screen.getByText('Keine Nutzer gefunden')).toBeVisible();
});

it('shows an empty state when the search fails', async () => {
  (searchUsers as jest.Mock).mockRejectedValue(new Error('network'));

  render(<UserSearchSection />);

  await act(async () => {
    fireEvent.changeText(screen.getByPlaceholderText('Nutzer suchen ...'), 'Al');
  });

  expect(screen.getByText('Keine Nutzer gefunden')).toBeVisible();
});

it('does not search when there is no session', async () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  render(<UserSearchSection />);

  await act(async () => {
    fireEvent.changeText(screen.getByPlaceholderText('Nutzer suchen ...'), 'Al');
  });

  expect(searchUsers).not.toHaveBeenCalled();
});
