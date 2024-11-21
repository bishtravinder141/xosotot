export function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => index + from);
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function rem(px: number) {
  return `${px / 16}rem`;
}
