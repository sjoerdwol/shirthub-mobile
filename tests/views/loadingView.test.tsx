import LoadingView from "@/views/loadingView";
import { render, screen } from "@testing-library/react-native";

it('renders loading text', () => {
  render(<LoadingView />);

  expect(screen.getByText('Lade ...')).toBeVisible();
});

it('applies correct styles to the loading text', () => {
  render(<LoadingView />);

  const text = screen.getByText('Lade ...');
  expect(text.props.className).toContain('text-white/70');
  expect(text.props.className).toContain('font-Lexend');
});
