import {useState, useEffect} from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);
    setLoading(true);
    return () => {
      clearTimeout(handler);
      setLoading(false);
    }
  }, [value, delay]);
  return [debouncedValue, loading];
}
