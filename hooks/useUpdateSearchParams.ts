'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

type Key = 'color' | 'length' | 'width';

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (key: Key, value: string) => {
    const current = qs.parse(searchParams.toString());
    const query: { [key in Key]?: string | string[] } = { ...current };

    if (current[key] !== undefined) {
      // If the key already exists
      if (Array.isArray(current[key])) {
        const existingValues = current[key] as string[];
        if (existingValues.includes(value)) {
          // If the value is already present, remove it
          query[key] = existingValues.filter((v) => v !== value);
        } else {
          // If the value is not already present, add it
          query[key] = [...existingValues, value];
        }
      } else {
        // If it's not an array (i.e., a single value), toggle its presence
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
    });
  };

  return updateSearchParams;
};
