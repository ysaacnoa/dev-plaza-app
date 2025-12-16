import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { LoadingProvider, useLoading } from '@navigation/components/loading-context';

const TestComponent = () => {
  const { loading, showLoading, hideLoading } = useLoading();

  return (
    <>
      <Text testID="loading">{loading ? 'true' : 'false'}</Text>
      <Button title="Show" onPress={showLoading} />
      <Button title="Hide" onPress={hideLoading} />
    </>
  );
};

describe('LoadingProvider', () => {
  it('should toggle loading state', () => {
    const { getByTestId, getByText } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    const loadingText = getByTestId('loading');
    expect(loadingText.props.children).toBe('false');

    act(() => fireEvent.press(getByText('Show')));
    expect(loadingText.props.children).toBe('true');

    act(() => fireEvent.press(getByText('Hide')));
    expect(loadingText.props.children).toBe('false');
  });
});
