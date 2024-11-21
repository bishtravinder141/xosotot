export default function ProfileVipRulesSlot() {
  return (
    <>
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Promotion Criteria</strong>

        <p className="text-[0.5rem]">
          VIP members will be promoted to the corresponding VIP level when their experience points (based on valid bets)
          meet the requirements of that level. VIP data tracking starts from 00:00:00 on the day the VIP system is
          launched. VIP level computation is refreshed every 10 minutes! Experience points are calculated at a rate of
          1000:1 valid bets.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Upgrade Order</strong>

        <p className="text-[0.5rem]">
          VIP levels can be upgraded once per day when requirements are met, but you cannot skip levels.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Maintenance Requirements</strong>

        <p className="text-[0.5rem]">
          After upgrading their VIP level, members need to meet the maintenance requirements for that level within 30
          days. If an upgrade is achieved within this period, maintenance requirements will be recalculated based on the
          new current level.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Demotion Criteria</strong>

        <p className="text-[0.5rem]">
          If VIP members fail to meet the maintenance requirements for their level within 30 days, the system will
          automatically deduct the corresponding experience points. If there are insufficient points, the member will be
          demoted, and corresponding benefits will be adjusted to match the new level.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Promotion Bonuses</strong>

        <p className="text-[0.5rem]">
          After reaching a VIP level, members can claim upgrade benefits from the VIP interface, and each VIP member can
          only receive each level-up bonus once.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Monthly Bonuses</strong>

        <p className="text-[0.5rem]">
          VIP members can earn the highest monthly VIP rewards once a month. Rewards cannot be claimed more than once
          within the month and do not accumulate. Unclaimed rewards will be refreshed in the next payout cycle. Claiming
          the highest monthly bonus for the current month will deduct any earned monthly bonuses, e.g., if VIP1 earns
          500 and is then upgraded to VIP2, the 500 will be deducted from the monthly bonus.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Real-time Betting Cashback</strong>

        <p className="text-[0.5rem]">
          Higher VIP levels receive higher betting cashback rates. All games are calculated in real-time, and rewards
          can be claimed immediately!
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Safe Deposit Box</strong>

        <p className="text-[0.5rem]">
          VIP members at corresponding levels will earn additional interest on deposits in their safe deposit boxes,
          based on their VIP level.
        </p>
      </div>
    </>
  );
}
