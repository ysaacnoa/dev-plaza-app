import { Icon } from "@shared/components";
import { render } from "@testing-library/react-native";

it('renders Icon component', () => {
  const { getByTestId } = render(<Icon name="home" />);
  expect(getByTestId('icon-home')).toBeTruthy();
});
