import { fetchMovements, PaginatedResponse } from '@modules/movements/services/fetch-movements';
import { MOCK_TRANSACTIONS, Movement } from '@modules/movements/mock/mock';

jest.useFakeTimers();

describe('fetchMovements', () => {
  it('should return paginated data correctly', async () => {
    const promise = fetchMovements(1, 2); // pedimos 2 elementos por página
    jest.advanceTimersByTime(1500); // avanzamos el timer
    const res: PaginatedResponse<Movement> = await promise;

    expect(res.data.length).toBe(2);
    expect(res.page).toBe(1);
    expect(res.pageSize).toBe(2);
    expect(res.totalItems).toBe(MOCK_TRANSACTIONS.length);
    expect(res.hasNextPage).toBe(MOCK_TRANSACTIONS.length > 2);
  });

  it('should return correct next page', async () => {
    const promise = fetchMovements(2, 2);
    jest.advanceTimersByTime(1500);
    const res = await promise;

    expect(res.page).toBe(2);
    expect(res.data.length).toBeLessThanOrEqual(2);
  });

  it('should return empty data if page exceeds', async () => {
    const pages = Math.ceil(MOCK_TRANSACTIONS.length / 2) + 1;
    const promise = fetchMovements(pages, 2);
    jest.advanceTimersByTime(1500);
    const res = await promise;

    expect(res.data).toEqual([]);
    expect(res.hasNextPage).toBe(false);
  });
});
