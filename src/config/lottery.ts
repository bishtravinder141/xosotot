export const LOTTERY_PERIODS = [
  { type: "1", duration: 60_000 },
  // { type: "2", duration: 180_000 },
  // { type: "3", duration: 300_000 },
  // { type: "4", duration: 600_000 },
];

export const LOTTERY_TYPES = [
  { value: "O", name: "Odd", k3: "1|3|5|7|9" },
  { value: "E", name: "Even", k3: "0|2|4|6|8" },
];

export const LOTTERY_SIZES = [
  { value: "B", name: "Big", k3: "5|6|7|8|9", bg: "from-yellow-800 to-yellow-400", text: "text-yellow-700" },
  { value: "S", name: "Small", k3: "0|1|2|3|4", bg: "from-blue-700 to-blue-300", text: "text-blue-700" },
];

export const LOTTERY_COLORS = [
  { value: "green", name: "Green", bg: "from-green-800 to-green-600", text: "text-green-600" },
  { value: "violet", name: "Violet", bg: "from-violet-500 to-violet-300", text: "text-violet-500" },
  { value: "red", name: "Red", bg: "from-red-700 to-red-300", text: "text-red-700" },
];

export const LOTTERY_NUMBERS = [
  { value: "0", color: "red-violet" },
  { value: "1", color: "green" },
  { value: "2", color: "red" },
  { value: "3", color: "green" },
  { value: "4", color: "red" },
  { value: "5", color: "green-violet" },
  { value: "6", color: "red" },
  { value: "7", color: "green" },
  { value: "8", color: "red" },
  { value: "9", color: "green" },
];

export const LOTTERY_DICE_SUMS = [
  { value: "3", odds: 207.36 },
  { value: "4", odds: 69.12 },
  { value: "5", odds: 34.56 },
  { value: "6", odds: 20.74 },
  { value: "7", odds: 13.83 },
  { value: "8", odds: 9.88 },
  { value: "9", odds: 8.3 },
  { value: "10", odds: 7.68 },
  { value: "11", odds: 7.68 },
  { value: "12", odds: 8.3 },
  { value: "13", odds: 9.88 },
  { value: "14", odds: 13.83 },
  { value: "15", odds: 20.74 },
  { value: "16", odds: 34.56 },
  { value: "17", odds: 69.12 },
  { value: "18", odds: 207.36 },
];

export const LOTTERY_COUNTS = [
  1, //
  5, //
  10, //
  20, //
  50, //
  100, //
];

export const LOTTERY_AMOUNTS = [
  1000, //
  2000, //
  5000, //
  10000, //
  100000, //
];

export const LOTTERY_AUTOCLOSE_DELAY = 3;
