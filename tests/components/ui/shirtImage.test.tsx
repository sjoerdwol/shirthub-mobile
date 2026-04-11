import ShirtImage from "@/components/ui/shirtImage";
import { render, screen } from "@testing-library/react-native";

it('renders avatar image', () => {
  render(
    <ShirtImage
      imageSrc={require('../../../assets/images/exampleshirt.png')}
      type="avatar"
    />
  );

  expect(screen.getByTestId('image_container').props.className).toBe('border-2 border-dark-border h-12 w-12 overflow-hidden rounded-full');
});

it('renders detail image', () => {
  render(
    <ShirtImage
      imageSrc={require('../../../assets/images/exampleshirt.png')}
      type="detailAndManage"
    />
  );

  expect(screen.getByTestId('image_container').props.className).toBe('border border-dark-border h-72 w-full overflow-hidden rounded-xl');
});

it('renders display vertical image', () => {
  render(
    <ShirtImage
      imageSrc={require('../../../assets/images/exampleshirt.png')}
      type="displayVertical"
    />
  );

  expect(screen.getByTestId('image_container').props.className).toBe('border border-dark-border h-24 w-24 overflow-hidden rounded-lg');
});

it('renders notification image', () => {
  render(
    <ShirtImage
      imageSrc={require('../../../assets/images/exampleshirt.png')}
      type="notification"
    />
  );

  expect(screen.getByTestId('image_container').props.className).toBe('aspect-video border border-dark-border mt-3 overflow-hidden relative rounded-lg');
});
