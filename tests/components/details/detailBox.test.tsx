import DetailBox from "@/components/details/detailBox";
import { render, screen } from "@testing-library/react-native";

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
});