import { renderHook, act, waitFor } from '@testing-library/react-native';
import { usePagination } from '@modules/movements/hooks/usePagination';
import { PaginatedResponse } from '@modules/movements/services/fetch-movements';

type Item = { id: number };

const mockFetch: jest.Mock<Promise<PaginatedResponse<Item>>, [number, number]> = jest.fn();

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

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].id).toBe(1);
    expect(result.current.total).toBe(1);
    expect(result.current.page).toBe(1);
    expect(result.current.hasMore).toBe(false);
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

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await waitFor(() => expect(result.current.data).toHaveLength(1));

    await act(async () => {
      await result.current.loadMore();
    });

    await waitFor(() => expect(result.current.data).toHaveLength(2));

    expect(result.current.data.map(d => d.id)).toEqual([1, 2]);
    expect(result.current.page).toBe(2);
    expect(result.current.hasMore).toBe(false);
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

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await waitFor(() => expect(result.current.data[0].id).toBe(1));

    await act(async () => {
      await result.current.refresh();
    });

    await waitFor(() => expect(result.current.data[0].id).toBe(2));
  });

  it('should handle multiple loads and set pageRef/hasMoreRef correctly', async () => {
    mockFetch
      .mockResolvedValueOnce({ data: [{ id: 1 }], page: 1, pageSize: 10, totalItems: 3, hasNextPage: true })
      .mockResolvedValueOnce({ data: [{ id: 2 }], page: 2, pageSize: 10, totalItems: 3, hasNextPage: true })
      .mockResolvedValueOnce({ data: [{ id: 3 }], page: 3, pageSize: 10, totalItems: 3, hasNextPage: false });

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await waitFor(() => expect(result.current.data).toHaveLength(1));

    await act(async () => {
      await result.current.loadMore();
      await result.current.loadMore();
    });

    await waitFor(() => expect(result.current.data).toHaveLength(3));

    expect(result.current.data.map(d => d.id)).toEqual([1, 2, 3]);
    expect(result.current.page).toBe(3);
    expect(result.current.hasMore).toBe(false);
  });

  it('should not call fetchFunction if loading is true', async () => {
    mockFetch.mockResolvedValue({ data: [], page: 1, pageSize: 10, totalItems: 0, hasNextPage: false });

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    act(() => {
      // forzamos loadMore mientras loading está activo
      result.current.loadMore();
      result.current.loadMore();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1); // la segunda llamada no dispara fetch
  });

  it('should not call loadMore if hasMoreRef is false', async () => {
    mockFetch.mockResolvedValue({ data: [{ id: 1 }], page: 1, pageSize: 10, totalItems: 1, hasNextPage: false });

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.loadMore(); // no debería llamar fetch
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch error as Error instance', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
  });

  it('should handle fetch error as non-Error', async () => {
    mockFetch.mockRejectedValueOnce('Unknown error');

    const { result } = renderHook(() => usePagination<Item>(mockFetch, { pageSize: 10 }));

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.error).toBe('Unknown error');
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
  });
});

describe('usePagination branches coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not call fetchFunction if loading is true', async () => {
    mockFetch.mockResolvedValue({ data: [{ id: 1 }], page: 1, pageSize: 10, totalItems: 1, hasNextPage: true });
    const { result } = renderHook(() => usePagination<Item>(mockFetch));

    act(() => {
      (result.current as any).loading = true;
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchFunction if hasMoreRef is false', async () => {
    mockFetch.mockResolvedValue({ data: [{ id: 1 }], page: 1, pageSize: 10, totalItems: 1, hasNextPage: false });
    const { result } = renderHook(() => usePagination<Item>(mockFetch));

    await waitFor(() => expect(result.current.hasMore).toBe(false));

    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});