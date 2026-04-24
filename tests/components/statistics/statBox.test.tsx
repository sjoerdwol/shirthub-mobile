import StatBox from "@/components/statistics/statBox";
import { Ionicons } from "@expo/vector-icons";
import { render, screen } from '@testing-library/react-native';

it('renders correctly with currency, icon and subtitle', () => {
  render(
    <StatBox
      currencyVisible
      icon={<Ionicons name="person" />}
      subtitle="Test subtitle"
      title="Test Statbox with currency"
      value={100}
    />
  );

  expect(screen.getByTestId('stat_box_title')).toBeVisible();
  expect(screen.getByTestId('stat_box_title')).toHaveTextContent('Test Statbox with currency');
  expect(screen.getByTestId('stat_box_value')).toBeVisible();
  expect(screen.getByTestId('stat_box_value')).toHaveTextContent('100,00 €');
  expect(screen.getByTestId('stat_box_subtitle')).toBeVisible();
  expect(screen.getByTestId('stat_box_subtitle')).toHaveTextContent('Test subtitle');
});

it('renders correctly without currency, icon and subtitle', () => {
  render(
    <StatBox
      currencyVisible={false}
      title="Test Statbox without currency"
      value={100}
    />
  );

  expect(screen.getByTestId('stat_box_title')).toBeVisible();
  expect(screen.getByTestId('stat_box_title')).toHaveTextContent('Test Statbox without currency');
  expect(screen.getByTestId('stat_box_value')).toBeVisible();
  expect(screen.getByTestId('stat_box_value')).toHaveTextContent('100');
  expect(screen.queryByTestId('stat_box_subtitle')).toBeNull();
});