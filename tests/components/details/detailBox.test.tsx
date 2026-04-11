import DetailBox from "@/components/details/detailBox";
import { render, screen } from "@testing-library/react-native";

jest.mock('/Users/swjorl/Desktop/coding/shirthub-mobile/node_modules/@expo/vector-icons/build/FontAwesome6', () => {
  const { View, Text } = require('react-native');
  return () => <View><Text testID="icon_fontawesome">FontAwesomeIcon</Text></View>;
});

jest.mock('/Users/swjorl/Desktop/coding/shirthub-mobile/node_modules/@expo/vector-icons/build/Ionicons', () => {
  const { View, Text } = require('react-native');
  return () => <View><Text testID="icon_ionicons">IoniconsIcon</Text></View>;
})

it('renders detail box correctly with FontAwesome6', () => {
  render(
    <DetailBox
      icon='hashtag'
      tag="Test Tag"
      value="Test Value"
    />
  );

  const tag = screen.getByTestId('detail_box_tag');
  const value = screen.getByTestId('detail_box_value');
  expect(tag).toHaveTextContent('Test Tag');
  expect(value).toHaveTextContent('Test Value');
  expect(screen.getByTestId('icon_fontawesome')).toBeVisible();
  expect(screen.queryByTestId('icon_ionicons')).toBeNull();
});

it('renders detail box correctly with Ionicons', () => {
  render(
    <DetailBox
      icon='person'
      tag="Test Tag"
      value="Test Value"
    />
  );

  const tag = screen.getByTestId('detail_box_tag');
  const value = screen.getByTestId('detail_box_value');
  expect(tag).toHaveTextContent('Test Tag');
  expect(value).toHaveTextContent('Test Value');
  expect(screen.getByTestId('icon_ionicons')).toBeVisible();
  expect(screen.queryByTestId('icon_fontawesome')).toBeNull();
});