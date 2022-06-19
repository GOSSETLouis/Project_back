import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import type { Todo } from "../types/todo";

// HOOK LOCAL STORAGE
const useLocalStorage = (
  storageKey: string,
  fallbackState: Todo[]
): [Todo[], Dispatch<SetStateAction<Todo[]>>] => {
  const baseLocalStorage = localStorage.getItem(storageKey);
  const parseLocalStorage = (): Todo[] =>
    baseLocalStorage !== null
      ? (JSON.parse(baseLocalStorage) as Todo[])
      : fallbackState;
  const [value, setValue] = useState(parseLocalStorage());

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export { useLocalStorage };
