export const DAILY_PERIOD = 86400000;

export const ONLINE = [
  { time: [DAILY_PERIOD / 24, (DAILY_PERIOD / 24) * 9] /* from 1am to 9am */, range: [100, 500] },
  { time: [(DAILY_PERIOD / 24) * 9, (DAILY_PERIOD / 24) * 13] /* from 9am to 1pm */, range: [400, 800] },
  { time: [(DAILY_PERIOD / 24) * 13, (DAILY_PERIOD / 24) * 17] /* from 1pm to 5pm */, range: [1500, 2500] },
  { time: [(DAILY_PERIOD / 24) * 17, (DAILY_PERIOD / 24) * 20] /* from 5pm to 8pm */, range: [1200, 1800] },
  { time: [(DAILY_PERIOD / 24) * 20, (DAILY_PERIOD / 24) * 23] /* from 8pm to 11pm */, range: [2500, 5000] },
  { time: [(DAILY_PERIOD / 24) * 23, (DAILY_PERIOD / 24) * 25] /* from 11pm to 1am */, range: [1500, 2500] },
];
