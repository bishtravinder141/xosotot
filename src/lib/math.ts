export function factorial(value: number): number {
  if (value < 0) {
    return -1;
  }

  if (value < 1) {
    return 1;
  }

  return value * factorial(value - 1);
}

export function combinations<T>(values: T[], size: number): number {
  if (values.length < size) {
    return 0;
  }

  return factorial(values.length) / (factorial(size) * factorial(values.length - size));
}
