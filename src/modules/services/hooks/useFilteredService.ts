import { useMemo } from 'react';
import { SERVICES_DATA } from '../constants/services.constants';
import type { ServiceItemGroup } from '../constants/services.constants';

export function useFilteredServices(searchQuery: string): ServiceItemGroup[] {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return SERVICES_DATA;
    }

    return SERVICES_DATA.map(section => ({
      ...section,
      data: section.data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter(section => section.data.length > 0);
  }, [searchQuery]);
}