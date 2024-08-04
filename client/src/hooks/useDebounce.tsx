import { useCallback, useEffect, useRef } from "react";

const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number = 500
) => {
  const timeoutRef = useRef<number | null>(null);
  const clear = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return clear;
  }, [clear]);

  return useCallback(
    (...args: any[]) => {
      clear();

      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, clear]
  );
};

export default useDebounce;
