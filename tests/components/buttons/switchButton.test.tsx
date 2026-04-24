import SwitchButton from "@/components/buttons/switchButton";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

it('renders SwitchButton correctly', () => {
  const TestWrapper = () => {
    const [activeIndex, setActiveIndex] = React.useState<0 | 1>(0);

    return (
      <SwitchButton
        activeIndex={activeIndex}
        options={['Option1', 'Option2']}
        setActiveIndex={setActiveIndex}
      />
    );
  };

  render(<TestWrapper />);

  expect(screen.getByText('Option1')).toBeVisible();
  // Color for active text
  expect(screen.getByText('Option1').props.className).toContain('text-white/80');
  expect(screen.getByText('Option2')).toBeVisible();
  // Color for inactive text
  expect(screen.getByText('Option2').props.className).toContain('text-white/50');
});

it('triggers setActiveIndex on click', () => {
  const mockSetActiveIndex = jest.fn();

  render(
    <SwitchButton
      activeIndex={0}
      options={['Option1', 'Option2']}
      setActiveIndex={mockSetActiveIndex}
    />
  );

  fireEvent.press(screen.getByText('Option2'));

  expect(mockSetActiveIndex).toHaveBeenCalledTimes(1);
  expect(mockSetActiveIndex).toHaveBeenCalledWith(1);
});