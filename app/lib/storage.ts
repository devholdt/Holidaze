export function setItem(obj: { key: string; value: any }) {
   localStorage.setItem(obj.key, JSON.stringify(obj.value));
}

export function getItem(key: string) {
   const storedItem = localStorage.getItem(key);

   return JSON.parse(storedItem as string);
}
