import ShirtImage from "@/components/ui/shirtImage";
import { render } from "@testing-library/react-native";

it('render image size small correctly', () => {
  render(<ShirtImage imageSrc={require('../assets/images/exampleshirt.png')} size="small" />)
});

it('render image size large correctly', () => {
  render(<ShirtImage imageSrc={require('../assets/images/exampleshirt.png')} size="large" />)
});

it('render image size maxi correctly', () => {
  render(<ShirtImage imageSrc={require('../assets/images/exampleshirt.png')} size="maxi" />)
});