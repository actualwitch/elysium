import { useCallback, useEffect, useRef } from "react";

export function useEventEffect(type: string, listener: (...args: unknown[]) => void) {
  useEffect(() => {
    document.addEventListener(type, listener);
    listener();
    return () => {
      document.removeEventListener(type, listener);
    };
  }, [type, listener]);
}

export const useRafEffect = (callback?: () => void | true, shouldCancelQueued = false) => {
  useEffect(() => {
    if (!callback) return;
    const handle = requestAnimationFrame(async () => {
      const shouldContinue = await callback();
      if (shouldContinue) requestAnimationFrame(callback);
    });
    return () => {
      if (shouldCancelQueued) cancelAnimationFrame(handle);
    };
  }, [callback]);
};

export function useAsyncDebounce(defaultFn: () => void | (() => Promise<void>), defaultWait = 0) {
  const debounceRef = useRef<any>({});
  debounceRef.current.defaultFn = defaultFn;
  debounceRef.current.defaultWait = defaultWait;

  const debounce = useCallback(async (fn = debounceRef.current.defaultFn, wait = debounceRef.current.defaultWait) => {
    if (!debounceRef.current.promise) {
      debounceRef.current.promise = new Promise((resolve, reject) => {
        debounceRef.current.resolve = resolve;
        debounceRef.current.reject = reject;
      });
    }

    if (debounceRef.current.timeout) {
      clearTimeout(debounceRef.current.timeout);
    }

    debounceRef.current.timeout = setTimeout(async () => {
      delete debounceRef.current.timeout;
      try {
        debounceRef.current.resolve(await fn());
      } catch (err) {
        debounceRef.current.reject(err);
      } finally {
        delete debounceRef.current.promise;
        delete debounceRef.current.resolve;
        delete debounceRef.current.reject;
      }
    }, wait);

    return debounceRef.current.promise;
  }, []);

  return debounce;
}
