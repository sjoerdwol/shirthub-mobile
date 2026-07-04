import JumpRow from "@/components/profile/jumpRow";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

it('renders the label and the provided icon', () => {
  render(
    <JumpRow
      icon={<Text testID="jump_icon">icon</Text>}
      label='Trikotsammlung'
      onPress={jest.fn()}
      testID="jump_row"
    />
  );

  expect(screen.getByText('Trikotsammlung')).toBeVisible();
  expect(screen.getByTestId('jump_icon')).toBeVisible();
});

it('calls onPress when the row is pressed', () => {
  const onPress = jest.fn();

  render(
    <JumpRow
      icon={<Text>icon</Text>}
      label='Statistiken'
      onPress={onPress}
      testID="jump_row"
    />
  );

  fireEvent.press(screen.getByTestId('jump_row'));

  expect(onPress).toHaveBeenCalledTimes(1);
});
