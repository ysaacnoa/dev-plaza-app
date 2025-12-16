import { useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { useLoading } from '../components/loading-context';

export function useNavigationLoading() {
  const { showLoading, hideLoading } = useLoading();
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const routeNameRef = useRef<string | undefined>(undefined);

  const LOADING_DURATION = 1200;

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      showLoading();

      const timer = setTimeout(() => {
        hideLoading();
      }, LOADING_DURATION);

      return () => clearTimeout(timer);
    }

    routeNameRef.current = currentRouteName;
  };

  const handleReady = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };

  return {
    navigationRef,
    handleStateChange,
    handleReady,
  };
}
