import ShirtManageView from "@/views/shirtManageView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;

const mockReferenceData: ReferenceData = {
  leagues: [],
  teams: [],
};

jest.mock('@/components/forms/shirtManageForm', () => {
  const { Text, View } = require('react-native');
  return ({ mode, shirt }: { mode: string; shirt: Shirt | null }) => (
    <View>
      <Text testID="manage_form_mode">{mode}</Text>
      {shirt && <Text testID="manage_form_shirt">{shirt.team}</Text>}
    </View>
  );
});

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders shirt image', () => {
  render(<ShirtManageView data={mockReferenceData} mode="add" shirt={null} />);

  expect(screen.getByTestId('shirt_image')).toBeVisible();
});

it('renders the manage form in add mode', () => {
  render(<ShirtManageView data={mockReferenceData} mode="add" shirt={null} />);

  expect(screen.getByTestId('manage_form_mode')).toHaveTextContent('add');
});

it('renders the manage form in edit mode', () => {
  render(<ShirtManageView data={mockReferenceData} mode="edit" shirt={mockShirt} />);

  expect(screen.getByTestId('manage_form_mode')).toHaveTextContent('edit');
  expect(screen.getByTestId('manage_form_shirt')).toHaveTextContent('FC Bayern München');
});

it('renders the manage form with null shirt in add mode', () => {
  render(<ShirtManageView data={mockReferenceData} mode="add" shirt={null} />);

  expect(screen.queryByTestId('manage_form_shirt')).toBeNull();
});
