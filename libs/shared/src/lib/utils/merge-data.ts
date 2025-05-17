export function mergeData<T, U>(data: T[], customData: U): Array<T & U>;
export function mergeData<T, U>(data: T, customData: U): T & U;

export function mergeData<T, U>(
  data: T | T[],
  customData: U
): (T & U) | Array<T & U> {
  if (Array.isArray(data)) {
    return data.map((item) => ({ ...item, ...customData }));
  }
  return { ...data, ...customData };
}
