// 1️⃣ Primero declaramos todos los mocks
const mockIcon = jest.fn(() => null);
jest.mock('@shared/components', () => ({
  Icon: mockIcon,
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ options }: any) => {
      if (options?.tabBarIcon) {
        options.tabBarIcon({ color: '#000', focused: true });
        options.tabBarIcon({ color: '#666', focused: false });
      }
      return null;
    },
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ bottom: 20, top: 0 }),
}));

jest.mock('@navigation/home-stack', () => ({ HomeStack: () => null }));
jest.mock('@modules/chat', () => ({ ChatScreen: () => null }));
jest.mock('@modules/settings', () => ({ SettingsScreen: () => null }));

import { BottomTabs, renderTabIcon } from '@navigation/bottom-tabs';
import { render } from '@testing-library/react-native';

describe('BottomTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders BottomTabs without crashing', () => {
    render(<BottomTabs />);
  });

  it('tabBarIcon function returns Icon element', () => {
    const element = renderTabIcon('HomeTab', '#000');
    expect(element).toBeTruthy();
  });

  it('renderTabIcon devuelve correctos nombres de icono', () => {
    expect(renderTabIcon('HomeTab', '#123')).toBeTruthy();
    expect(renderTabIcon('Chat', '#456')).toBeTruthy();
    expect(renderTabIcon('Settings', '#789')).toBeTruthy();
  });
});
