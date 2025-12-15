import React from 'react';
import { render } from '@testing-library/react-native';
import { ServiceSectionHeader } from '@modules/services/components/service-header';

describe('ServiceSectionHeader', () => {
  it('should render category correctly', () => {
    const { getByText } = render(
      <ServiceSectionHeader category="Atención al Cliente" />,
    );

    expect(getByText('Atención al Cliente')).toBeTruthy();
  });

  it('should render different categories', () => {
    const { getByText, rerender } = render(
      <ServiceSectionHeader category="Pagos y Facturación" />,
    );

    expect(getByText('Pagos y Facturación')).toBeTruthy();

    rerender(<ServiceSectionHeader category="Servicios Técnicos" />);

    expect(getByText('Servicios Técnicos')).toBeTruthy();
  });

  it('should render empty string category', () => {
    const { getByText } = render(<ServiceSectionHeader category="" />);

    expect(getByText('')).toBeTruthy();
  });
});
