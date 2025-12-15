import { render, fireEvent } from '@testing-library/react-native';
import { useLoanForm } from '@modules/loans/hooks/useLoanForm';
import { LoansScreen } from '@modules/loans';

jest.mock('@modules/loans/hooks/useLoanForm');

const mockHook = {
  form: {
    documentType: 'DNI',
    documentNumber: '12345678',
    email: 'test@example.com',
    phone: '',
    names: 'Juan',
    lastnames: 'Pérez',
    amount: '',
    installments: '',
  },
  errors: {},
  submitting: false,
  updateField: jest.fn(),
  handleSubmit: jest.fn(),
};

jest.mock('react-native-hooks', () => {
  const React = require('react');
  const { Text, View, TouchableOpacity } = require('react-native');

  return {
    theme: {
      spacing: { xl: 16, lg: 12, md: 8 },
      colors: { surface: '#fff', text: '#000', textMuted: '#666' },
      typography: {
        title: { fontSize: 20, fontWeight: 'bold' },
        body: { fontSize: 14 },
      },
    },

    InputText: ({ testID, placeholder }: any) => (
      <Text testID={testID}>{placeholder}</Text>
    ),

    Dropdown: ({ testID }: any) => (
      <View testID={testID} />
    ),

    Button: ({ testID, onPress }: any) => (
      <TouchableOpacity testID={testID} onPress={onPress}>
        <Text>Button</Text>
      </TouchableOpacity>
    ),
  };
});


describe('LoansScreen', () => {
  beforeEach(() => {
    (useLoanForm as jest.Mock).mockReturnValue(mockHook);
  });

  it('renders title and subtitle', () => {
    const { getByTestId } = render(<LoansScreen />);
    expect(getByTestId('loan-title')).toBeTruthy();
    expect(getByTestId('loan-subtitle')).toBeTruthy();
  });

  it('renders document type dropdown', () => {
    const { getByTestId } = render(<LoansScreen />);
    expect(getByTestId('document-type-dropdown')).toBeTruthy();
  });

  it('renders document number input with correct placeholder for DNI', () => {
    const { getByTestId, getByText } = render(<LoansScreen />);
    expect(getByTestId('document-number-input')).toBeTruthy();
    expect(getByText('75012345')).toBeTruthy();

  });

  it('changes placeholder when document type is Pasaporte', () => {
    (useLoanForm as jest.Mock).mockReturnValue({
      ...mockHook,
      form: { ...mockHook.form, documentType: 'Pasaporte' },
    });

    const { getByText } = render(<LoansScreen />);
    expect(getByText('A12345678')).toBeTruthy();
  });

  it('renders all input fields', () => {
    const { getByTestId } = render(<LoansScreen />);
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('phone-input')).toBeTruthy();
    expect(getByTestId('names-input')).toBeTruthy();
    expect(getByTestId('lastnames-input')).toBeTruthy();
    expect(getByTestId('amount-input')).toBeTruthy();
    expect(getByTestId('installments-dropdown')).toBeTruthy();
  });

  it('calls handleSubmit when button is pressed', () => {
    const { getByTestId } = render(<LoansScreen />);
    fireEvent.press(getByTestId('submit-button'));
    expect(mockHook.handleSubmit).toHaveBeenCalled();
  });
});