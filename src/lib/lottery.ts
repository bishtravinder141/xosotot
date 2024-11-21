import type { Bet } from "@components/primitive/lottery";

export function getK3LotreBets(bets: Bet[]) {
  const group2: string[] = [];
  const group3: string[] = [];
  const pairsA: string[] = [];
  const pairsB: string[] = [];

  const newBets = bets.filter((bet) => {
    switch (bet.type) {
      case "8":
        group2.push(bet.value);
        break;
      case "10":
        group3.push(bet.value);
        break;
      case "5:1":
        pairsA.push(bet.value);
        break;
      case "5:2":
        pairsB.push(bet.value);
        break;
      default:
        return true;
    }

    return false;
  });

  if (group2.length > 1) {
    for (const value of group2) {
      newBets.push({ type: "8", value: `|${value}|` });
    }
  }

  if (group3.length > 2) {
    for (const value of group3) {
      newBets.push({ type: "10", value: `.${value}.` });
    }
  }

  if (pairsA.length > 0 && pairsB.length > 0) {
    for (const a of pairsA) {
      for (const b of pairsB) {
        newBets.push({ type: "5", value: `:${a}${a}:${b}:` });
      }
    }
  }

  return newBets.map((bet) => {
    switch (bet.type) {
      case "4":
        return { type: bet.type, value: `|${bet.value}${bet.value}|` };
      case "6":
        return { type: bet.type, value: `|${bet.value}${bet.value}${bet.value}|` };
      case "7":
      case "9":
        return { type: bet.type, value: `|${bet.value}|` };
    }

    return bet;
  });
}

export function getLotteryExpired(time: Date | string | number, duration: number) {
  const timestamp = new Date(time).getTime();

  return timestamp + duration - (timestamp % duration);
}

export function getLotteryWonLost(latest: { profit: number | null }[]) {
  let won = 0;
  let lost = 0;

  for (const record of latest) {
    if (record.profit === null) {
      continue;
    }

    if (record.profit > 0) {
      won += record.profit;
    } else {
      lost -= record.profit;
    }
  }

  return [won, lost];
}

export function getVietnamLotteryModeLink(slug: string, area: number, cityId: number, cityName: string, date: string) {
  return `/lotteries/vietnam-lottery/${slug}?area=${area}&cityid=${cityId}&cityname=${cityName}&date=${date}`;
}
