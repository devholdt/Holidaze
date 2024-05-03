export function setItem(obj: { key: string; value: any }) {
   if (typeof window !== "undefined") {
      localStorage.setItem(obj.key, JSON.stringify(obj.value));
   }
}

export function getItem(key: string) {
   if (typeof window !== "undefined") {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
   }
   return null;
}
