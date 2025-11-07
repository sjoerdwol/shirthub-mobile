import StatBox from '@/components/statistics/statBox';
import { render, screen } from '@testing-library/react-native';

it('renders small statbox correctly', () => {
  render(<StatBox title='Testbox' value={10} />);

  screen.getByText('Testbox');
  screen.getByText('$10');
});

it('renders large statbox correctly', () => {
  render(<StatBox title='Testbox' value={10} size='large' />);

  screen.getByText('Testbox');
  screen.getByText('$10');
});