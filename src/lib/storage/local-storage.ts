function isBrowser() {
  return typeof window !== "undefined";
}

export const storage = {
  set<T>(key: string, value: T) {
    if (!isBrowser()) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // optional: log error
    }
  },

  get<T>(key: string): T | null {
    if (!isBrowser()) return null;

    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    if (!isBrowser()) return;
    localStorage.removeItem(key);
  },

  clear() {
    if (!isBrowser()) return;
    localStorage.clear();
  },
};
