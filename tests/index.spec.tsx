import Index from '@/app/(tabs)/index';
import { useAuth } from '@/contexts/authContext';
import { useShirtStore } from '@/stores/shirtStore';
import { handleShirtInitialFetch } from '@/utils/handleShirtOperations';
import { render, screen, waitFor } from '@testing-library/react-native';

// Mock the auth context
jest.mock('@/contexts/authContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the shirt store
jest.mock('@/stores/shirtStore', () => ({
  useShirtStore: jest.fn(),
}));

// Mock the shirt operations utility
jest.mock('@/utils/handleShirtOperations', () => ({
  handleShirtInitialFetch: jest.fn(),
}));

// Mock the ShirtCard component
jest.mock('@/components/ui/shirtCard', () => {
  const { View, Text } = require('react-native');
  return function MockShirtCard({ shirt }: { shirt: Shirt }) {
    return (
      <View testID={`shirt-card-${shirt.id}`}>
        <Text>{shirt.team}</Text>
        <Text>{shirt.season}, {shirt.type}</Text>
      </View>
    );
  };
});

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseShirtStore = useShirtStore as jest.MockedFunction<typeof useShirtStore>;
const mockHandleShirtInitialFetch = handleShirtInitialFetch as jest.MockedFunction<typeof handleShirtInitialFetch>;

const testShirts: Shirt[] = [
  {
    id: '1',
    team: 'SC Freiburg',
    team_key: 'sc-freiburg',
    league_key: 'bundesliga',
    season: '2024',
    type: 'Home',
    condition: 'Excellent',
    print_name: 'Grifo',
    print_number: 10,
    size: 'M',
    value: 120,
    imageSrc: 'test-image-1.jpg',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },
  {
    id: '2',
    team: 'Bayern Munich',
    team_key: 'bayern-munich',
    league_key: 'bundesliga',
    season: '2023',
    type: 'Away',
    condition: 'Good',
    print_name: 'Müller',
    print_number: 25,
    size: 'L',
    value: 150,
    imageSrc: 'test-image-2.jpg',
    created_at: new Date('2023-12-01'),
    updated_at: new Date('2023-12-01')
  },
  {
    id: '3',
    team: 'Borussia Dortmund',
    team_key: 'borussia-dortmund',
    league_key: 'bundesliga',
    season: '2024',
    type: 'Third',
    condition: 'Fair',
    print_name: null,
    print_number: null,
    size: 'S',
    value: 80,
    imageSrc: 'test-image-3.jpg',
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01')
  }
];

const mockSession = {
  access_token: 'test-token',
  refresh_token: 'test-refresh',
  expires_in: 3600,
  expires_at: Date.now() + 3600,
  token_type: 'bearer',
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    aud: 'authenticated',
    role: 'authenticated',
    app_metadata: {},
    user_metadata: {},
    identities: [],
    factors: [],
  }
};

describe('Index Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHandleShirtInitialFetch.mockResolvedValue();
  });

  it('renders loading state initially', () => {
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: [], setShirts: jest.fn() });

    render(<Index />);

    screen.getByText('Loading...');
    screen.getByTestId('loading-container');
  });

  it('calls handleShirtInitialFetch on mount with session', async () => {
    const mockSetShirts = jest.fn();
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: [], setShirts: mockSetShirts });

    render(<Index />);

    await waitFor(() => {
      expect(mockHandleShirtInitialFetch).toHaveBeenCalledWith(mockSession, mockSetShirts);
    });
  });

  it('renders main content after loading completes', async () => {
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: testShirts, setShirts: jest.fn() });

    render(<Index />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    screen.getByTestId('main-container');
    screen.getByTestId('header-section');
    screen.getByTestId('recently-added-section');
  });

  it('renders Recently Added section with correct title', async () => {
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: testShirts, setShirts: jest.fn() });

    render(<Index />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    screen.getByText('Your Most Recent');
  });

  it('renders all shirts in the recently added FlatList', async () => {
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: testShirts, setShirts: jest.fn() });

    render(<Index />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    // Check that all shirt cards are rendered
    testShirts.forEach(shirt => {
      const shirtCard = screen.getByTestId(`shirt-card-${shirt.id}`);
      expect(shirtCard).toBeTruthy();
      screen.getByText(shirt.team);
      screen.getByText(`${shirt.season}, ${shirt.type}`);
    });
  });

  it('handles empty shirts array correctly', async () => {
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: [], setShirts: jest.fn() });

    render(<Index />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const flatList = screen.getByTestId('recently-added-flatlist');
    expect(flatList).toBeTruthy();
    expect(screen.queryByTestId(/shirt-card-/)).toBeNull();
  });

  it('handles null session gracefully', async () => {
    mockUseAuth.mockReturnValue({ session: null, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: [], setShirts: jest.fn() });

    render(<Index />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    expect(screen.getByTestId('main-container')).toBeTruthy();
  });

  it('re-fetches data when session changes', async () => {
    const mockSetShirts = jest.fn();
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({ shirts: [], setShirts: mockSetShirts });

    const { rerender } = render(<Index />);

    await waitFor(() => {
      expect(mockHandleShirtInitialFetch).toHaveBeenCalledTimes(1);
    });

    const newSession = { ...mockSession, access_token: 'new-token' };
    mockUseAuth.mockReturnValue({ session: newSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });

    rerender(<Index />);

    await waitFor(() => {
      expect(mockHandleShirtInitialFetch).toHaveBeenCalledTimes(2);
      expect(mockHandleShirtInitialFetch).toHaveBeenLastCalledWith(newSession, mockSetShirts);
    });
  });
});
