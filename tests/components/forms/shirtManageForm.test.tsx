import ShirtManageForm from "@/components/forms/shirtManageForm";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import { handleShirtFormSubmit } from "@/utils/handleSubmits";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockShirt = mockData.shirt as unknown as Shirt;

const mockReferenceData: ReferenceData = {
  leagues: [],
  teams: [
    {
      key: 'fcbayern',
      name: 'FC Bayern München',
      nameShort: 'FCB',
      leagueKey: 'bundesliga',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

const mockAddShirt = jest.fn();
const mockUpdateShirt = jest.fn();
const mockSetHasChanged = jest.fn();
const mockBack = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/shirtStore', () => ({ useShirtStore: jest.fn() }));
jest.mock('@/stores/statisticsStore', () => ({ useUserStatisticsStore: jest.fn() }));
jest.mock('@/utils/handleSubmits', () => ({ handleShirtFormSubmit: jest.fn() }));
jest.mock('expo-router', () => ({ router: { back: jest.fn() } }));

jest.mock('@/components/dropdown', () => {
  const { Text, TouchableOpacity, View } = require('react-native');
  return ({ errorMessage, isValid, onSelection, placeholder, title, value }: {
    errorMessage: string;
    isValid: boolean;
    onSelection: (v: string) => void;
    placeholder: string;
    title: string;
    value: string;
  }) => (
    <View>
      <Text>{title}</Text>
      <TouchableOpacity testID={`dropdown_${title}`} onPress={() => onSelection('FC Bayern München')}>
        <Text>{value || placeholder}</Text>
      </TouchableOpacity>
      {!isValid && <Text>{errorMessage}</Text>}
    </View>
  );
});

beforeEach(() => {
  jest.clearAllMocks();
  (handleShirtFormSubmit as jest.Mock).mockResolvedValue(undefined);

  (useAuth as jest.Mock).mockReturnValue({
    session: mockSession,
    user: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    loading: false,
  });

  (useShirtStore as unknown as jest.Mock).mockImplementation((selector: (state: ShirtState) => unknown) =>
    selector({ shirts: [], addShirt: mockAddShirt, setShirts: jest.fn(), updateShirt: mockUpdateShirt, removeShirt: jest.fn() })
  );

  (useUserStatisticsStore as unknown as jest.Mock).mockImplementation((selector: (state: UserStatisticsStore) => unknown) =>
    selector({ hasChanged: false, userStatistics: null, setHasChanged: mockSetHasChanged, setUserStatistics: jest.fn() })
  );

  const { router } = require('expo-router');
  router.back = mockBack;
});

it('renders form in add mode', () => {
  render(<ShirtManageForm data={mockReferenceData} mode="add" shirt={null} />);

  expect(screen.getByText('Club / Team Name')).toBeVisible();
  expect(screen.getByText('Saison')).toBeVisible();
  expect(screen.getByText('Wert')).toBeVisible();
  expect(screen.getByText('Flock Name')).toBeVisible();
  expect(screen.getByText('Flock Nummer')).toBeVisible();
  expect(screen.getByText('Zustand')).toBeVisible();
  expect(screen.getByText('5/10')).toBeVisible();
  expect(screen.getByTestId('primary_button')).toHaveTextContent('Trikot hinzufügen');
});

it('renders form in edit mode with pre-filled values', () => {
  render(<ShirtManageForm data={mockReferenceData} mode="edit" shirt={mockShirt} />);

  expect(screen.getByDisplayValue('2023/24')).toBeVisible();
  expect(screen.getByDisplayValue('Müller')).toBeVisible();
  expect(screen.getByDisplayValue('25')).toBeVisible();
  expect(screen.getByDisplayValue('90')).toBeVisible();
  expect(screen.getByText('9/10')).toBeVisible();
  expect(screen.getByTestId('primary_button')).toHaveTextContent('Trikot bearbeiten');
});

it('calls handleShirtFormSubmit when form is submitted with valid data', async () => {
  render(<ShirtManageForm data={mockReferenceData} mode="edit" shirt={mockShirt} />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('primary_button'));
  });

  expect(handleShirtFormSubmit).toHaveBeenCalled();
  expect(mockBack).toHaveBeenCalled();
});

it('does not call handleShirtFormSubmit when session is null', async () => {
  (useAuth as jest.Mock).mockReturnValue({
    session: null,
    user: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    loading: false,
  });

  render(<ShirtManageForm data={mockReferenceData} mode="edit" shirt={mockShirt} />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('primary_button'));
  });

  expect(handleShirtFormSubmit).not.toHaveBeenCalled();
});

it('updates season input through formatInputWithSlash', () => {
  render(<ShirtManageForm data={mockReferenceData} mode="add" shirt={null} />);

  const seasonInput = screen.getByPlaceholderText('2024 oder 2024/2025');
  fireEvent.changeText(seasonInput, '2024');

  expect(screen.getByDisplayValue('2024')).toBeVisible();
});

it('updates slider condition value', () => {
  render(<ShirtManageForm data={mockReferenceData} mode="add" shirt={null} />);

  const slider = screen.UNSAFE_getByType(require('@react-native-community/slider').default);
  fireEvent(slider, 'valueChange', 7);

  expect(screen.getByText('7/10')).toBeVisible();
});
