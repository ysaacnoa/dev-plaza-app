import { useEffect, useRef, useState } from 'react';
import { PaginatedResponse } from '../services/fetch-movements';

export function usePagination<T>(
  fetchFunction: (
    page: number,
    pageSize: number,
  ) => Promise<PaginatedResponse<T>>,
  { pageSize = 10 } = {},
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const loadRef = useRef<
    ((pageToLoad: number, replace?: boolean) => void) | null
  >(null);

  const fetchFunctionRef = useRef(fetchFunction);
  const pageSizeRef = useRef(pageSize);

  useEffect(() => {
    loadRef.current = async (pageToLoad: number, replace = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunctionRef.current(
          pageToLoad,
          pageSizeRef.current,
        );

        if (result.totalItems !== undefined) {
          setTotal(result.totalItems);
        }

        setData(prev => (replace ? result.data : [...prev, ...result.data]));

        pageRef.current = pageToLoad;
        hasMoreRef.current = result.hasNextPage;
      } catch (err: any) {
        setError(err.message || 'Error cargando datos');
      } finally {
        setLoading(false);
      }
    };
  }, [loading]);

  const refresh = () => {
    pageRef.current = 1;
    hasMoreRef.current = true;
    loadRef.current?.(1, true);
  };

  const loadMore = () => {
    if (loading) return;
    if (!hasMoreRef.current) return;

    const nextPage = pageRef.current + 1;
    loadRef.current?.(nextPage);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    data,
    total,
    loading,
    error,
    page: pageRef.current,
    hasMore: hasMoreRef.current,
    refresh,
    loadMore,
  };
}

// import { useState, useEffect, useCallback } from "react";
// import { PaginatedResponse } from "../services/fetch-transactions";

// export const usePagination = <T,>(
//   fetchFunction: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>,
//   { initialPage = 1, pageSize = 10, autoLoad = true } = {}
// ) => {
//   const [data, setData] = useState<T[]>([]);
//   const [page, setPage] = useState(initialPage);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(
//     async (pageToLoad: number, replace = false) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const {data: fetchData, hasNextPage} = await fetchFunction(pageToLoad, pageSize);

//         setData(prev =>
//           replace ? fetchData : [...prev, ...fetchData]
//         );

//         setPage(pageToLoad);
//         setHasMore(hasNextPage);

//       } catch (err: any) {
//         setError(err.message || "Error cargando datos");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [fetchFunction, pageSize]
//   );

//   const refresh = useCallback(() => {
//     return load(1, true);
//   }, [load]);

//   const loadMore = useCallback(() => {
//     if (!loading && hasMore) {
//       load(page + 1);
//     }
//   }, [loading, hasMore, page, load]);

//   useEffect(() => {
//     if (autoLoad) refresh();
//   }, [autoLoad, refresh]);

//   return {
//     data,
//     loading,
//     error,
//     page,
//     hasMore,

//     loadMore,
//     refresh,
//   };
// };
