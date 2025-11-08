import StatBox from '@/components/statistics/statBox';
import { render, screen } from '@testing-library/react-native';

it('renders small statbox correctly', () => {
  render(<StatBox title='Testbox' value={10} currencyVisible={false} />);

  screen.getByText('Testbox');
  screen.getByText('10');
});

it('renders large statbox correctly', () => {
  render(<StatBox title='Testbox' value={10} currencyVisible={true} />);

  screen.getByText('Testbox');
  screen.getByText('10 €');
});