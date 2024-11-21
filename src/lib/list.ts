export function unique<T>(list: T[]) {
  return list.filter((item, index, items) => items.indexOf(item) === index);
}
