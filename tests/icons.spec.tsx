import HeaderIcon from "@/components/ui/headerIcon";
import TabBarIcon from "@/components/ui/tabBarIcon";
import { render } from "@testing-library/react-native";

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

it('renders header icon correctly', () => {
  render(<HeaderIcon name="alert" size={20} color='black' />);
});

it('renders tab bar icon correctly', () => {
  render(<TabBarIcon name="alert" size={20} color='black' />);
});