import { useCallback, useEffect, useState } from "react";

/**
 * Returns the value of the localStorage item with the given key and the function to update it.
 * @param key The key to store the value under.
 * @param initialValue The initial value to store.
 * @returns A tuple containing the value and a function to set the value.
 */
export const useStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState(initialValue);

  const setItem = useCallback(
    (item: T): void => {
      window.localStorage.setItem(key, JSON.stringify(item));
      setValue(item);
    },
    [key]
  );

  useEffect(() => {
    let item = initialValue;
    try {
      const storedValue = window.localStorage.getItem(key);
      item = storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch {
      item = initialValue;
    } finally {
      setItem(item);
      window.localStorage.setItem(key, JSON.stringify(item));
    }
  }, [initialValue, key, setItem]);

  return [value, setItem];
};
