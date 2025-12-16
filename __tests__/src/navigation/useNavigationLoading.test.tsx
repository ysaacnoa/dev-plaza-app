import { useNavigationLoading } from '@navigation/hooks/useNavigationLoading';
import { act, renderHook } from '@testing-library/react-native';
import { LoadingProvider } from '@navigation/components/loading-context';
import type { RootStackParamList } from '@navigation/constants/linking';
import type { NavigationContainerRef } from '@react-navigation/native';

jest.useFakeTimers();

describe('useNavigationLoading', () => {
  it('should show and hide loading on route change', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LoadingProvider>{children}</LoadingProvider>
    );

    const { result } = renderHook(() => useNavigationLoading(), { wrapper });

    result.current.navigationRef.current = ({
      getCurrentRoute: () => ({ name: 'Home' }),
    } as unknown) as NavigationContainerRef<RootStackParamList>;

    act(() => result.current.handleReady());

    expect(result.current.navigationRef.current?.getCurrentRoute()?.name).toBe('Home');
    const navRef = result.current.navigationRef.current;
    if (navRef) {
      const originalGetCurrentRoute = navRef.getCurrentRoute;

      navRef.getCurrentRoute = (() => ({ name: 'Login' })) as any;

      act(() => {
        const cleanup = result.current.handleStateChange();
        jest.advanceTimersByTime(1200);
        cleanup?.();
      });

      navRef.getCurrentRoute = originalGetCurrentRoute;
    }
  });
});
