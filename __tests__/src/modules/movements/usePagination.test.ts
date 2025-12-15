import { renderHook, act, waitFor } from '@testing-library/react-native';
import { usePagination } from '@modules/movements/hooks/usePagination';
import { PaginatedResponse } from '@modules/movements/services/fetch-movements';

type Item = { id: number };

const mockFetch: jest.Mock<
  Promise<PaginatedResponse<Item>>,
  [number, number]
> = jest.fn();

describe('usePagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load initial data', async () => {
    mockFetch.mockResolvedValueOnce({
      data: [{ id: 1 }],
      page: 1,
      pageSize: 10,
      totalItems: 1,
      hasNextPage: false,
    });

    const { result } = renderHook(() =>
      usePagination<Item>(mockFetch, { pageSize: 10 }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data.length).toBe(1);
    expect(result.current.data[0].id).toBe(1);
    expect(result.current.total).toBe(1);
    expect(mockFetch).toHaveBeenCalledWith(1, 10);
  });

  it('should load more data when loadMore is called', async () => {
    mockFetch
      .mockResolvedValueOnce({
        data: [{ id: 1 }],
        page: 1,
        pageSize: 10,
        totalItems: 2,
        hasNextPage: true,
      })
      .mockResolvedValueOnce({
        data: [{ id: 2 }],
        page: 2,
        pageSize: 10,
        totalItems: 2,
        hasNextPage: false,
      });

    const { result } = renderHook(() =>
      usePagination<Item>(mockFetch, { pageSize: 10 }),
    );

    await waitFor(() => {
      expect(result.current.data.length).toBe(1);
    });

    await act(async () => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.data.length).toBe(2);
      expect(result.current.data[1].id).toBe(2);
    });
  });

  it('should refresh and replace data', async () => {
    mockFetch
      .mockResolvedValueOnce({
        data: [{ id: 1 }],
        page: 1,
        pageSize: 10,
        totalItems: 1,
        hasNextPage: false,
      })
      .mockResolvedValueOnce({
        data: [{ id: 2 }],
        page: 1,
        pageSize: 10,
        totalItems: 1,
        hasNextPage: false,
      });

    const { result } = renderHook(() =>
      usePagination<Item>(mockFetch),
    );

    await waitFor(() => {
      expect(result.current.data[0].id).toBe(1);
    });

    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.data[0].id).toBe(2);
    });
  });

  it('should handle fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() =>
      usePagination<Item>(mockFetch),
    );

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });
  });
});
