'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

type Key = 'color' | 'length' | 'width' | 'gauge' | 'type';

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback( async (key: Key, value: string, setLoading: (loading: boolean) => void) => {
    setLoading(true); 
    const current = qs.parse(searchParams.toString());
    const query: { [key in Key]?: string | string[] } = { ...current };

    if (current[key] !== undefined) {
      if (Array.isArray(current[key])) {
        const existingValues = current[key] as string[];
        if (existingValues.includes(value)) {
          query[key] = existingValues.filter((v) => v !== value);
        } else {
          query[key] = [...existingValues, value];
        }
      } else {
        query[key] = current[key] === value ? undefined : [current[key] as string, value];
      }
    } else {
      query[key] = value;
    }

    const url = qs.stringifyUrl(
      { url: window.location.pathname, query },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );

    router.push(url, {
      scroll: false,
    })
    setLoading(false); 

  }, [router, searchParams]);

  const debouncedUpdateSearchParams = useCallback(debounce(updateSearchParams, 300), [updateSearchParams]);

  return debouncedUpdateSearchParams;
};
