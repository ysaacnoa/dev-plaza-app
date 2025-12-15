import { MOCK_TRANSACTIONS, Movement } from "../mock/mock";

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
}

export function fetchMovements(
  page: number,
  pageSize: number,
): Promise<PaginatedResponse<Movement>> {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const data = MOCK_TRANSACTIONS.slice(start, end);

      resolve({
        data,
        page,
        pageSize,
        totalItems: MOCK_TRANSACTIONS.length,
        hasNextPage: end < MOCK_TRANSACTIONS.length,
      });
    }, 1500);
  });
}
