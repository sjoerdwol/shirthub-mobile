import { useEffect, useState } from "react";

// Returns a debounced copy of `value` that only updates after `delay` ms have
// passed without further changes. Used to avoid firing an API call on every
// keystroke in the user search.
export default function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
