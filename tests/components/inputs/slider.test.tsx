import CustomSlider from "@/components/inputs/slider";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders label and current value display', () => {
  render(
    <CustomSlider
      label="Rating"
      maxValue={10}
      minValue={0}
      onValueChange={jest.fn()}
      step={1}
      value={5}
    />
  );

  expect(screen.getByText('Rating')).toBeVisible();
  expect(screen.getByText('5/10')).toBeVisible();
});

it('calls onValueChange when slider value changes', () => {
  const mockOnValueChange = jest.fn();

  render(
    <CustomSlider
      label="Rating"
      maxValue={10}
      minValue={0}
      onValueChange={mockOnValueChange}
      step={1}
      value={3}
    />
  );

  const slider = screen.UNSAFE_getByType(require('@react-native-community/slider').default);
  fireEvent(slider, 'valueChange', 7);

  expect(mockOnValueChange).toHaveBeenCalledWith(7);
});

it('renders correct min and max values on slider', () => {
  render(
    <CustomSlider
      label="Size"
      maxValue={100}
      minValue={10}
      onValueChange={jest.fn()}
      step={5}
      value={50}
    />
  );

  const slider = screen.UNSAFE_getByType(require('@react-native-community/slider').default);
  expect(slider.props.minimumValue).toBe(10);
  expect(slider.props.maximumValue).toBe(100);
  expect(slider.props.step).toBe(5);
  expect(slider.props.value).toBe(50);
});
