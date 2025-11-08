import Collection from '@/app/(tabs)/collection';
import { useShirtStore } from '@/stores/shirtStore';
import { render, screen } from '@testing-library/react-native';

// Mock the shirt store
jest.mock('@/stores/shirtStore', () => ({
  useShirtStore: jest.fn(),
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

const mockUseShirtStore = useShirtStore as jest.MockedFunction<typeof useShirtStore>;

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

describe('Collection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders collection container with correct styling', () => {
    mockUseShirtStore.mockReturnValue([]);

    render(<Collection />);

    const container = screen.getByTestId('collection-container');
    expect(container).toBeTruthy();
  });

  it('renders empty state when no shirts are available', () => {
    mockUseShirtStore.mockReturnValue([]);

    render(<Collection />);

    const flatList = screen.getByTestId('collection-flatlist');
    expect(flatList).toBeTruthy();
    expect(screen.queryByTestId(/shirt-card-/)).toBeNull();
  });

  it('renders all shirts from the store', () => {
    mockUseShirtStore.mockReturnValue(testShirts);

    render(<Collection />);

    testShirts.forEach(shirt => {
      const shirtCard = screen.getByTestId(`shirt-card-${shirt.id}`);
      expect(shirtCard).toBeTruthy();
      screen.getByText(shirt.team);
      screen.getByText(`${shirt.season}, ${shirt.type}`);
    });
  });

  it('handles single shirt correctly', () => {
    mockUseShirtStore.mockReturnValue([testShirts[0]]);

    render(<Collection />);

    const shirtCard = screen.getByTestId(`shirt-card-${testShirts[0].id}`);
    expect(shirtCard).toBeTruthy();
    expect(screen.getAllByTestId(/shirt-card-/)).toHaveLength(1);
  });

  it('handles many shirts correctly', () => {
    const manyShirts = Array.from({ length: 10 }, (_, index) => ({
      ...testShirts[0],
      id: `shirt-${index}`,
      team: `Team ${index}`,
    }));

    mockUseShirtStore.mockReturnValue(manyShirts);

    render(<Collection />);


    expect(screen.getAllByTestId(/shirt-card-/)).toHaveLength(10);
    manyShirts.forEach(shirt => {
      screen.getByText(shirt.team);
    });
  });

  it('updates when shirt store changes', () => {
    const { rerender } = render(<Collection />);

    mockUseShirtStore.mockReturnValue([]);
    rerender(<Collection />);
    expect(screen.queryByTestId(/shirt-card-/)).toBeNull();

    mockUseShirtStore.mockReturnValue([testShirts[0]]);
    rerender(<Collection />);
    screen.getByTestId(`shirt-card-${testShirts[0].id}`);

    mockUseShirtStore.mockReturnValue(testShirts);
    rerender(<Collection />);
    expect(screen.getAllByTestId(/shirt-card-/)).toHaveLength(3);
  });
});
