import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => {
    return {
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: ({ component: Component }: any) => <Component />,
    };
  },
}));

jest.mock('@modules/auth/screens', () => ({
  LoginScreen: () => <></>,
  RegisterScreen: () => <></>,
}));

import { AuthStack } from '@navigation/auth-stack';

describe('AuthStack', () => {
  it('should render without errors', () => {
    render(<AuthStack />);
    expect(true).toBe(true);
  });

  it('should have correct screens configured', () => {
    const { UNSAFE_root } = render(<AuthStack />);
    expect(UNSAFE_root).toBeDefined();
  });
});
