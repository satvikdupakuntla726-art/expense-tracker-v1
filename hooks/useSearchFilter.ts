import { useMemo, useState } from "react";

export function useSearchFilter<T>(
  data: T[],
  filterFn: (item: T, query: string) => boolean
) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => data.filter((item) => filterFn(item, query)),
    [data, query, filterFn]
  );
  return { query, setQuery, filtered };
}
// Why: Custom hook for scalable, reusable search/filter logic.
