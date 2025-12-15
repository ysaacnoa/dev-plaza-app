import { render, fireEvent } from '@testing-library/react-native';
import { useLoanForm } from '@modules/loans/hooks/useLoanForm';
import { LoansScreen } from '@modules/loans';

jest.mock('@modules/loans/hooks/useLoanForm');
jest.mock('react-native-hooks', () => {
  const React = require('react');
  const { Text, View, TouchableOpacity } = require('react-native');

  return {
    theme: {
      spacing: { xl: 16, lg: 12, md: 8 },
      colors: { surface: '#fff', text: '#000', textMuted: '#666', primary: '#000', white: '#fff' },
      typography: {
        title: { fontSize: 20, fontWeight: 'bold' },
        body: { fontSize: 14 },
        label: { fontSize: 14, fontWeight: '500' },
      },
    },

    InputText: React.forwardRef((props: any, ref: any) => (
      <Text
        ref={ref}
        testID={props.testID}
        onPress={() => props.onChangeText && props.onChangeText('TEST')}
      >
        {props.placeholder}
      </Text>
    )),

    Dropdown: React.forwardRef((props: any, ref: any) => (
      <View
        ref={ref}
        testID={props.testID}
        onStartShouldSetResponder={() => true}
        onTouchEnd={() => props.onChange && props.onChange('TEST')}
      />
    )),

    Button: React.forwardRef((props: any, ref: any) => (
      <TouchableOpacity
        ref={ref}
        testID={props.testID}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Text>{props.label}</Text>
      </TouchableOpacity>
    )),
  };
});


const mockHook = {
  form: { documentType: 'DNI', documentNumber: '12345678', email: 'test@example.com', phone: '', names: 'Juan', lastnames: 'Pérez', amount: '', installments: '' },
  errors: {},
  submitting: false,
  updateField: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('LoansScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLoanForm as jest.Mock).mockReturnValue(mockHook);
  });

  it('renders all UI elements', () => {
    const { getByTestId, getByText } = render(<LoansScreen />);
    expect(getByTestId('loan-scrollview')).toBeTruthy();
    expect(getByText('75012345')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('updates fields', () => {
    const { getByTestId } = render(<LoansScreen />);
    fireEvent.press(getByTestId('document-number-input'));
    fireEvent.press(getByTestId('email-input'));
    fireEvent.press(getByTestId('phone-input'));
    fireEvent.press(getByTestId('names-input'));
    fireEvent.press(getByTestId('lastnames-input'));
    fireEvent.press(getByTestId('amount-input'));
    fireEvent(getByTestId('document-type-dropdown'), 'onTouchEnd');
    fireEvent(getByTestId('installments-dropdown'), 'onTouchEnd');
    expect(mockHook.updateField).toHaveBeenCalledTimes(8);
  });

  it('calls handleSubmit', () => {
    const { getByTestId } = render(<LoansScreen />);
    fireEvent.press(getByTestId('submit-button'));
    expect(mockHook.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('changes placeholder for Pasaporte', () => {
    (useLoanForm as jest.Mock).mockReturnValue({ ...mockHook, form: { ...mockHook.form, documentType: 'Pasaporte' } });
    const { getByText } = render(<LoansScreen />);
    expect(getByText('A12345678')).toBeTruthy();
  });
});
