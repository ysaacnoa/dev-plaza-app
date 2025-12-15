import { renderHook } from '@testing-library/react-native';
import { useFilteredServices } from '@modules/services/hooks/useFilteredService';
import { SERVICES_DATA } from '@modules/services/constants/services.constants';

describe('useFilteredServices', () => {
  it('should return all services when search query is empty', () => {
    const { result } = renderHook(() => useFilteredServices(''));

    expect(result.current).toEqual(SERVICES_DATA);
    expect(result.current.length).toBe(4);
  });

  it('should return all services when search query is only whitespace', () => {
    const { result } = renderHook(() => useFilteredServices('   '));

    expect(result.current).toEqual(SERVICES_DATA);
  });

  it('should filter services by title (case insensitive)', () => {
    const { result } = renderHook(() => useFilteredServices('pagar'));

    expect(result.current.length).toBe(1);
    expect(result.current[0].category).toBe('Pagos y Facturación');
    expect(result.current[0].data.length).toBe(1);
    expect(result.current[0].data[0].title).toBe('Pagar Factura');
  });

  it('should filter services with uppercase search query', () => {
    const { result } = renderHook(() => useFilteredServices('SOPORTE'));

    expect(result.current.length).toBe(1);
    expect(result.current[0].data[0].title).toBe('Soporte Técnico');
  });

  it('should return multiple sections if matches exist in different categories', () => {
    const { result } = renderHook(() => useFilteredServices('servicio'));

    expect(result.current.length).toBeGreaterThan(0);
    const allTitles = result.current.flatMap(section => 
      section.data.map(item => item.title)
    );
    
    allTitles.forEach(title => {
      expect(title.toLowerCase()).toContain('servicio');
    });
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useFilteredServices('xyz123'));

    expect(result.current).toEqual([]);
  });

  it('should filter partial matches', () => {
    const { result } = renderHook(() => useFilteredServices('rec'));

    const allTitles = result.current.flatMap(section => 
      section.data.map(item => item.title)
    );
    
    expect(allTitles.some(title => title.toLowerCase().includes('rec'))).toBe(true);
  });

  it('should recalculate when search query changes', () => {
    const { result, rerender } = renderHook(
      ({ query }: { query: string }) => useFilteredServices(query),
      {
        initialProps: { query: '' },
      },
    );

    expect(result.current.length).toBe(4);

    rerender({ query: 'instalación' });

    expect(result.current.length).toBe(1);
    expect(result.current[0].data[0].title).toBe('Instalación Nueva');
  });

  it('should exclude sections with no matching items', () => {
    const { result } = renderHook(() => useFilteredServices('reclamos'));

    expect(result.current.length).toBe(1);
    expect(result.current[0].category).toBe('Atención al Cliente');
  });
});
