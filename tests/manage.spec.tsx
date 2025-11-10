import ManageShirt from '@/app/shirts/manage';
import { useAuth } from '@/contexts/authContext';
import { useReferenceDataStore } from '@/stores/referenceDataStore';
import { useShirtStore } from '@/stores/shirtStore';
import { useUserStatisticsStore } from '@/stores/statisticsStore';
import formatInputWithSlash from '@/utils/formatInputWithSlash';
import { handleShirtAddition, handleShirtUpdate } from '@/utils/handleShirtOperations';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';

// Mock the auth context
jest.mock('@/contexts/authContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the shirt store
jest.mock('@/stores/shirtStore', () => ({
  useShirtStore: jest.fn(),
}));

// Mock the reference team store
jest.mock('@/stores/referenceDataStore', () => ({
  useReferenceDataStore: jest.fn(),
}));

// Mock the statistics store
jest.mock('@/stores/statisticsStore', () => ({
  useUserStatisticsStore: jest.fn(),
}));

// Mock the shirt operations utility
jest.mock('@/utils/handleShirtOperations', () => ({
  handleShirtAddition: jest.fn(),
  handleShirtUpdate: jest.fn(),
}));

// Mock the format utility
jest.mock('@/utils/formatInputWithSlash', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

// Mock the components
jest.mock('@/components/ui/button', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return function MockButton({ children, onPress, loading }: any) {
    return (
      <TouchableOpacity testID="auth-button" onPress={onPress} disabled={loading}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  };
});

jest.mock('@/components/details/detailsDropdown', () => {
  const { TouchableOpacity, Text, View } = require('react-native');
  return function MockDetailsDropdown({ title, placeholder, value, onSelection, isValid, errorMessage, options }: any) {
    return (
      <View testID={`dropdown-${title.toLowerCase()}`}>
        <Text>{title}</Text>
        <Text>{placeholder}</Text>
        <Text>{value}</Text>
        {options?.map((option: string) => (
          <TouchableOpacity
            key={option}
            testID={`option-${option}`}
            onPress={() => onSelection(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
        {!isValid && errorMessage && <Text testID={`error-${title.toLowerCase()}`}>{errorMessage}</Text>}
      </View>
    );
  };
});

jest.mock('@/components/details/detailsDropdownSearch', () => {
  const { TouchableOpacity, Text, View } = require('react-native');
  return function MockDetailsDropdownSearch({ title, placeholder, value, onSelection, isValid, errorMessage, options }: any) {
    return (
      <View testID={`dropdown-search-${title.toLowerCase()}`}>
        <Text>{title}</Text>
        <Text>{placeholder}</Text>
        <Text testID={`${title}-value`}>{value}</Text>
        {options?.map((option: string) => (
          <TouchableOpacity
            key={option}
            testID={`option-${option}`}
            onPress={() => onSelection(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
        {!isValid && errorMessage && <Text testID={`error-${title.toLowerCase()}`}>{errorMessage}</Text>}
      </View>
    );
  };
});

jest.mock('@/components/details/detailsInput', () => {
  const { TextInput, Text, View } = require('react-native');
  return function MockDetailsInput({ title, placeholder, value, onChangeText, isValid, errorMessage }: any) {
    return (
      <View testID={`input-${title.toLowerCase()}`}>
        <Text>{title}</Text>
        <TextInput
          testID={`text-input-${title.toLowerCase()}`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {!isValid && errorMessage && <Text testID={`error-${title.toLowerCase()}`}>{errorMessage}</Text>}
      </View>
    );
  };
});

jest.mock('@/components/details/detailsRow', () => {
  const { View } = require('react-native');
  return function MockDetailsRow({ children }: any) {
    return <View testID="details-row">{children}</View>;
  };
});

jest.mock('@/components/ui/shirtImage', () => {
  const { View, Text } = require('react-native');
  return function MockShirtImage({ imageSrc, size }: any) {
    return (
      <View testID="shirt-image">
        <Text>Shirt Image ({size})</Text>
      </View>
    );
  };
});

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseShirtStore = useShirtStore as jest.MockedFunction<typeof useShirtStore>;
const mockUseReferenceStore = useReferenceDataStore as jest.MockedFunction<typeof useReferenceDataStore>;
const mockUseUserStatisticsStore = useUserStatisticsStore as jest.MockedFunction<typeof useUserStatisticsStore>;
const mockHandleShirtAddition = handleShirtAddition as jest.MockedFunction<typeof handleShirtAddition>;
const mockHandleShirtUpdate = handleShirtUpdate as jest.MockedFunction<typeof handleShirtUpdate>;
const mockFormatInputWithSlash = formatInputWithSlash as jest.MockedFunction<typeof formatInputWithSlash>;
const mockRouter = router as jest.Mocked<typeof router>;

// Mock useLocalSearchParams
const mockUseLocalSearchParams = require('expo-router').useLocalSearchParams as jest.MockedFunction<any>;

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

const mockShirt: Shirt = {
  id: '1',
  team: 'Real Madrid',
  team_key: 'real-madrid',
  league_key: 'la-liga',
  season: '2024',
  type: 'Home',
  condition: 'Brand New',
  print_name: 'Ronaldo',
  print_number: 7,
  size: 'M',
  value: 120,
  imageSrc: 'test-image.jpg',
  created_at: new Date('2024-01-01'),
  updated_at: new Date('2024-01-01')
};

describe('Manage Shirt Component', () => {
  const mockAddShirt = jest.fn();
  const mockUpdateShirt = jest.fn();
  const mockSetHasChanged = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ session: mockSession, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });
    mockUseShirtStore.mockReturnValue({
      shirts: [],
      addShirt: mockAddShirt,
      updateShirt: mockUpdateShirt,
      setShirts: jest.fn(),
      removeShirt: jest.fn()
    });
    mockUseReferenceStore.mockReturnValue({
      data: {
        teams: [
          { name: 'Real Madrid', key: 'real-madrid', leagueKey: 'la-liga', nameShort: 'RM', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Barcelona', key: 'barcelona', leagueKey: 'la-liga', nameShort: 'BAR', createdAt: new Date(), updatedAt: new Date() }
        ],
        leagues: []
      },
      setReferenceData: jest.fn()
    });
    mockUseUserStatisticsStore.mockReturnValue({
      hasChanged: false,
      userStatistics: null,
      setHasChanged: mockSetHasChanged,
      setUserStatistics: jest.fn()
    });
    mockFormatInputWithSlash.mockImplementation((text) => text);
  });

  describe('Add Mode', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('renders add shirt form with correct title', () => {
      render(<ManageShirt />);

      expect(screen.getByTestId('manage_shirt_header')).toHaveTextContent('Add Shirt');
      expect(screen.getByTestId('auth-button')).toHaveTextContent('Add Shirt');
    });

    it('renders all form fields with correct placeholders', () => {
      render(<ManageShirt />);

      screen.getByTestId('dropdown-search-team');

      screen.getByTestId('input-season');
      screen.getByTestId('input-print name');
      screen.getByTestId('input-print number');
      screen.getByTestId('input-value');

      screen.getByTestId('dropdown-type');
      screen.getByTestId('dropdown-condition');
      screen.getByTestId('dropdown-size');
    });

    it('renders shirt image component', () => {
      render(<ManageShirt />);

      screen.getByTestId('shirt-image');
    });

    it('calls handleShirtAddition and navigates back after successful submission', async () => {
      render(<ManageShirt />);

      const seasonInput = screen.getByTestId('text-input-season');

      fireEvent.press(screen.getByTestId('option-Real Madrid'));
      fireEvent.changeText(seasonInput, '2024');
      fireEvent.press(screen.getByTestId('option-Home'));
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(mockHandleShirtAddition).toHaveBeenCalledWith(
          mockSession,
          expect.objectContaining({
            team: 'Real Madrid',
            season: '2024',
            type: 'Home'
          }),
          mockAddShirt,
          mockSetHasChanged
        );
      });

      await waitFor(() => {
        expect(mockRouter.back).toHaveBeenCalled();
      });
    });
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({
        mode: 'edit',
        shirt: JSON.stringify(mockShirt)
      });
    });

    it('renders edit shirt form with correct title', () => {
      render(<ManageShirt />);

      screen.getByText('Edit Shirt');
    });

    it('pre-fills form fields with existing shirt data', () => {
      render(<ManageShirt />);

      const teamDropdownValue = screen.getByTestId('Team-value');
      const seasonInput = screen.getByTestId('text-input-season');

      expect(teamDropdownValue).toHaveTextContent('Real Madrid');
      expect(seasonInput.props.value).toBe('2024');
    });

    it('shows correct button text for edit mode', () => {
      render(<ManageShirt />);

      expect(screen.getByTestId('auth-button')).toHaveTextContent('Save Changes');
    });

    it('calls handleShirtUpdate when form is submitted', async () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('option-Barcelona'));
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(mockHandleShirtUpdate).toHaveBeenCalledWith(
          mockSession,
          mockShirt.id,
          expect.objectContaining({
            team: 'Barcelona'
          }),
          mockUpdateShirt,
          mockSetHasChanged
        );
      });
    });

    it('handles shirt parameter as array', () => {
      mockUseLocalSearchParams.mockReturnValue({
        mode: 'edit',
        shirt: [JSON.stringify(mockShirt)]
      });

      render(<ManageShirt />);

      const teamDropdownValue = screen.getByTestId('Team-value');
      expect(teamDropdownValue).toHaveTextContent('Real Madrid');
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('shows validation error for empty team field', async () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-team')).toBeTruthy();
      });
    });

    it('shows validation error for empty season field', async () => {
      render(<ManageShirt />);

      const seasonInput = screen.getByTestId('text-input-season');
      fireEvent.changeText(seasonInput, '');
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-season')).toBeTruthy();
      });
    });

    it('shows validation error for short season', async () => {
      render(<ManageShirt />);

      const seasonInput = screen.getByTestId('text-input-season');
      fireEvent.changeText(seasonInput, '24');
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-season')).toBeTruthy();
      });
    });

    it('shows validation error for empty type field', async () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-type')).toBeTruthy();
      });
    });

    it('shows validation error for invalid print number', async () => {
      render(<ManageShirt />);

      const printNumberInput = screen.getByTestId('text-input-print number');
      fireEvent.changeText(printNumberInput, '0');
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-print number')).toBeTruthy();
      });
    });

    it('shows validation error for invalid value', async () => {
      render(<ManageShirt />);

      const valueInput = screen.getByTestId('text-input-value');
      fireEvent.changeText(valueInput, '0');
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-value')).toBeTruthy();
      });
    });

    it('shows validation error for value above 500', async () => {
      render(<ManageShirt />);

      const valueInput = screen.getByTestId('text-input-value');
      fireEvent.changeText(valueInput, '600');
      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-value')).toBeTruthy();
      });
    });
  });

  describe('Form Field Interactions', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('calls formatInputWithSlash for season field', () => {
      render(<ManageShirt />);

      const seasonInput = screen.getByTestId('text-input-season');
      fireEvent.changeText(seasonInput, '2024');

      expect(mockFormatInputWithSlash).toHaveBeenCalledWith('2024', '');
    });

    it('updates dropdown selection', () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('option-Home'));

      expect(screen.getByTestId('dropdown-type')).toBeTruthy();
    });

    it('handles print name input', () => {
      render(<ManageShirt />);

      const printNameInput = screen.getByTestId('text-input-print name');
      fireEvent.changeText(printNameInput, 'Messi');

      expect(printNameInput.props.value).toBe('Messi');
    });

    it('handles print number input', () => {
      render(<ManageShirt />);

      const printNumberInput = screen.getByTestId('text-input-print number');
      fireEvent.changeText(printNumberInput, '10');

      expect(printNumberInput.props.value).toBe('10');
    });

    it('handles value input', () => {
      render(<ManageShirt />);

      const valueInput = screen.getByTestId('text-input-value');
      fireEvent.changeText(valueInput, '99.99');

      expect(valueInput.props.value).toBe('99.99');
    });
  });

  describe('Dropdown Options', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('renders correct type options', () => {
      render(<ManageShirt />);

      screen.getByTestId('option-Home');
      screen.getByTestId('option-Away');
      screen.getByTestId('option-Third');
      screen.getByTestId('option-Special');
    });

    it('renders correct condition options', () => {
      render(<ManageShirt />);

      screen.getByTestId('option-Brand New');
      screen.getByTestId('option-Like New');
      screen.getByTestId('option-Used');
      screen.getByTestId('option-Well Worn');
      screen.getByTestId('option-Worn Out');
    });

    it('renders correct size options', () => {
      render(<ManageShirt />);

      screen.getByTestId('option-XS');
      screen.getByTestId('option-S');
      screen.getByTestId('option-M');
      screen.getByTestId('option-L');
      screen.getByTestId('option-XL');
      screen.getByTestId('option-XXL');
      screen.getByTestId('option-3XL');
      screen.getByTestId('option-4XL');
      screen.getByTestId('option-5XL');
    });
  });

  describe('Form Submission Data Processing', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('processes form data correctly for submission', async () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('option-Real Madrid'));
      fireEvent.changeText(screen.getByTestId('text-input-season'), '2024');
      fireEvent.press(screen.getByTestId('option-Home'));
      fireEvent.press(screen.getByTestId('option-Brand New'));
      fireEvent.changeText(screen.getByTestId('text-input-print name'), 'Ronaldo');
      fireEvent.changeText(screen.getByTestId('text-input-print number'), '7');
      fireEvent.press(screen.getByTestId('option-M'));
      fireEvent.changeText(screen.getByTestId('text-input-value'), '120');

      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(mockHandleShirtAddition).toHaveBeenCalledWith(
          mockSession,
          expect.objectContaining({
            team: 'Real Madrid',
            season: '2024',
            type: 'Home',
            condition: 'Brand New',
            print_name: 'Ronaldo',
            print_number: 7,
            size: 'M',
            value: 120
          }),
          mockAddShirt,
          mockSetHasChanged
        );
      });
    });

    it('handles null values correctly', async () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('option-Real Madrid'));
      fireEvent.changeText(screen.getByTestId('text-input-season'), '2024');
      fireEvent.press(screen.getByTestId('option-Home'));

      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(mockHandleShirtAddition).toHaveBeenCalledWith(
          mockSession,
          expect.objectContaining({
            team: 'Real Madrid',
            season: '2024',
            type: 'Home',
            condition: null,
            print_name: null,
            print_number: null,
            size: null,
            value: null
          }),
          mockAddShirt,
          mockSetHasChanged
        );
      });
    });

    it('handles comma in value field', async () => {
      render(<ManageShirt />);

      fireEvent.press(screen.getByTestId('option-Real Madrid'));
      fireEvent.changeText(screen.getByTestId('text-input-season'), '2024');
      fireEvent.press(screen.getByTestId('option-Home'));
      fireEvent.changeText(screen.getByTestId('text-input-value'), '99,99');

      fireEvent.press(screen.getByTestId('auth-button'));

      await waitFor(() => {
        expect(mockHandleShirtAddition).toHaveBeenCalledWith(
          mockSession,
          expect.objectContaining({
            value: 99.99
          }),
          mockAddShirt,
          mockSetHasChanged
        );
      });
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('handles missing session gracefully', () => {
      mockUseAuth.mockReturnValue({ session: null, loading: false, user: null, signIn: jest.fn(), signOut: jest.fn(), signUp: jest.fn() });

      expect(() => render(<ManageShirt />)).not.toThrow();
    });

    it('displays error message when reference data is null', () => {
      mockUseReferenceStore.mockReturnValue({
        data: null,
        setReferenceData: jest.fn()
      });

      render(<ManageShirt />);

      expect(screen.getByText('Failed to load reference data. Please try again later.')).toBeTruthy();
    });

    it('handles invalid shirt JSON gracefully', () => {
      mockUseLocalSearchParams.mockReturnValue({
        mode: 'edit',
        shirt: JSON.stringify('invalid-json')
      });

      expect(() => render(<ManageShirt />)).not.toThrow();
    });

    it('handles empty shirt parameter', () => {
      mockUseLocalSearchParams.mockReturnValue({
        mode: 'edit',
        shirt: null
      });

      expect(() => render(<ManageShirt />)).not.toThrow();
    });
  });

  describe('Component Structure', () => {
    beforeEach(() => {
      mockUseLocalSearchParams.mockReturnValue({ mode: 'add' });
    });

    it('renders all DetailsRow components', () => {
      render(<ManageShirt />);

      const detailsRows = screen.getAllByTestId('details-row');
      expect(detailsRows).toHaveLength(4);
    });
  });
});
