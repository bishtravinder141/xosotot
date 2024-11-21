import { reset } from "@action/otp/phone";
import OneTimePassword from "@components/form/one-time-password";
import PasswordField from "@components/form/password";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import Usdt from "@components/icon/cryptocurrency/usdt";
import Calendar from "@components/icon/custom/calendar";
import Check from "@components/icon/custom/check";
import Clock from "@components/icon/custom/clock";
import Copy from "@components/icon/custom/copy";
import Document from "@components/icon/custom/document";
import Google from "@components/icon/custom/google";
import Tag from "@components/icon/custom/tag";
import Telegram from "@components/icon/custom/telegram";
import InfoFilled from "@components/icon/epi/info-filled";
import History from "@components/icon/fa-solid/history";
import PeopleTeam20Filled from "@components/icon/fluent/people-team-20-filled";
import BaselineLock from "@components/icon/ic/baseline-lock";
import Card from "@components/icon/ion/card";
import Cash from "@components/icon/ion/cash";
import QuestionFill from "@components/icon/mingcute/question-fill";
import MomoFill from "@components/icon/momo/momo-fill";
import BankFill from "@components/icon/ph/bank-fill";
import CashLine from "@components/icon/ri/cash-line";
import CustomerService2Fill from "@components/icon/ri/customer-service-2-fill";
import CupBold from "@components/icon/solar/cup-bold";
import Chart from "@components/icon/uis/chart";
import Ball from "@components/icon/xosotot/ball";
import ZalopayFill from "@components/icon/zolopay/zalopay-fill";
import PreviewContainer from "@components/preview/container";
import ButtonLink from "@components/shared/button-link";
import Skeleton from "@components/shared/skeleton";
import SubmitButton from "@components/shared/submit-button";
import WalletRechargeAmount from "@components/wallet/recharge/amount";
import { TUTORIAL_COMMISSIONS } from "@config/commision";
import { LOTTERY_COLORS, LOTTERY_COUNTS, LOTTERY_PERIODS, LOTTERY_SIZES } from "@config/lottery";
import { AVAILABLE_COUNTRY_CODES } from "@config/phone";
import { TRANSACTION_AMOUNTS } from "@config/transaction";
import { getBankDetails, getCryptoDetails } from "@data/payment";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import NextLink from "next/link";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

export default async function TutorialPage() {
  const t = await getTranslations();

  const bank = await getBankDetails();
  const crypto = await getCryptoDetails();

  return (
    <>
      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">1. Làm thế nào để đăng ký</h2>

        <ul className="list-decimal pl-3 text-[0.625rem]">
          <li>Điền số điện thoại của bạn</li>
          <li>Đặt mật khẩu của riêng bạn (6 chữ cái)</li>
          <li>Điền mã Đề xuất của bạn</li>
          <li>Nhấp vào Đăng ký</li>
        </ul>

        <PreviewContainer>
          <p className="w-8/12 text-sm">{t("Enter your details to enter your personal account")}</p>

          <div className="flex flex-col gap-2.5">
            <div className="flex gap-3 rounded-lg bg-blue-100 px-3 py-2">
              <label className="relative pr-3">
                <select
                  autoComplete="tel-country-code"
                  className="appearance-none bg-transparent py-1"
                  name="tel-country-code"
                  required
                >
                  {AVAILABLE_COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>{`+${code}`}</option>
                  ))}
                </select>
                <CaretDownFill className="absolute right-0 top-2.5" size={rem(12)} />
              </label>
              <div className="w-px bg-black" />
              <input
                autoComplete="tel-national"
                className="flex-1 bg-transparent py-2 text-xs"
                inputMode="numeric"
                name="tel-national"
                placeholder={t("Enter you phone")}
                required
                type="number"
              />
            </div>

            <PasswordField autoComplete="new-password" name="password" placeholder={t("Password")} required />
            <PasswordField name="repeat-password" placeholder={t("Repeat password")} required />

            <div className="flex rounded-lg bg-blue-100 px-3 py-2">
              <input
                className="flex-1 bg-transparent py-2 text-xs"
                name="ref"
                placeholder={t("Please enter the invitation code (Optional)")}
                type="text"
              />
            </div>

            <label className="flex items-center gap-3">
              <div className="relative inline-flex size-4">
                <input className="peer h-full w-full" name="agree" required type="radio" />
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-white text-white ring-1 ring-gray-200 transition-colors peer-checked:bg-red-300 peer-checked:ring-red-300">
                  <Check size={rem(10)} />
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {`${t("I agree")} `}
                <NextLink className="text-black" href="/about/privacy-policy">
                  {t("Privacy Policy")}
                </NextLink>
              </p>
            </label>

            <SubmitButton className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]">
              {t("Registration")}
            </SubmitButton>
          </div>
        </PreviewContainer>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">2. Cách cá cược</h2>

        <p className="text-[0.625rem]">Bấm vào bắt đầu trò chơi rồi chọn 1 phút, 3 phút, 5 phút hoặc 10 phút.</p>

        <PreviewContainer className="flex-row gap-3 py-2">
          {LOTTERY_PERIODS.map((item, index) => (
            <button
              className={twMerge(
                "flex-1 rounded bg-red-50 p-2.5 text-[0.625rem] font-bold leading-3",
                index === 0 && "bg-red-300 text-white",
              )}
              key={item.type}
              type="button"
            >
              {t("{value} min", { value: item.duration / 60_000 })}
            </button>
          ))}
        </PreviewContainer>

        <ul className="text-[0.625rem]">
          <li>Màu xanh lá cây: nếu kết quả hiển thị 1,3,7,9</li>
          <li>Màu đỏ: nếu kết quả hiển thị 2,4,6,8</li>
          <li>Tím: nếu kết quả hiển thị 0 hoặc 5</li>
        </ul>

        <PreviewContainer className="flex-row gap-3 py-2">
          {LOTTERY_COLORS.map((color, index) => (
            <button
              className={twMerge(
                "group flex w-0 grow items-center justify-between rounded-lg from-15% to-80% p-3 text-sm font-bold text-white bg-gradient-[177]",
                color.bg,
              )}
              data-state={index === 1 ? "active" : void 0}
              key={color.value}
              type="button"
            >
              {t(color.name)}
              <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
                <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-white" />
              </span>
            </button>
          ))}
        </PreviewContainer>

        <ul className="text-[0.625rem]">
          <li>Nhỏ: nếu kết quả hiển thị 0,1,2,3,4</li>
          <li>Tài: nếu kết quả ra 5,6,7,8,9 (Công ty này không được phép đặt cược phi pháp)</li>
          <li>Ví dụ: Đặt cược (Lớn và nhỏ cùng nhau) hoặc (Đỏ và Xanh cùng nhau) trong cùng một thời điểm.</li>
        </ul>

        <PreviewContainer className="flex-row gap-3 py-2">
          {LOTTERY_SIZES.map((size, index) => (
            <button
              className={twMerge(
                "group flex w-0 grow items-center justify-between rounded-lg from-15% to-80% p-3 text-sm font-bold text-white bg-gradient-[177]",
                size.bg,
              )}
              data-state={index === 1 ? "active" : void 0}
              key={size.value}
              type="button"
            >
              {t(size.name)}
              <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
                <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-white" />
              </span>
            </button>
          ))}
        </PreviewContainer>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">3. Làm thế nào để nạp tiền</h2>

        <p className="text-[0.625rem]">
          Nhấp vào Biểu tượng Ví, Nhấp vào Nút Nạp tiền và chọn phương thức nạp, bao gồm ( UPI, GIAO DỊCH NGÂN HÀNG,
          USDT/CRYPTO )
        </p>

        <PreviewContainer>
          <div className="space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
            <div className="flex items-center gap-2">
              <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
            </div>

            <Suspense fallback={<Skeleton className="h-10 rounded-md" />}>
              <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
                <CashLine size={rem(16)} />
                <span className="text-sm text-black">
                  {format(176627, {
                    style: "currency",
                  })}
                </span>
              </div>
            </Suspense>

            <div className="flex gap-3 text-xs font-bold tracking-wide text-white">
              <NextLink className="inline-flex w-0 grow gap-3 rounded-lg bg-blue-500 p-3" href="/wallet/withdraw">
                {t("Withdraw")}
                <Cash className="ml-auto" size={rem(14)} />
              </NextLink>
              <NextLink className="inline-flex w-0 grow gap-3 rounded-lg bg-blue-500 p-3" href="/wallet/recharge">
                {t("Recharge")}
                <Card className="ml-auto" size={rem(14)} />
              </NextLink>
            </div>
          </div>
        </PreviewContainer>

        <PreviewContainer>
          <div className="-my-3 space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
            <div className="grid grid-cols-2 gap-3 text-xs font-bold tracking-wide">
              <button
                className="flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                data-state="selected"
                type="button"
              >
                <BankFill className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                {t("Vietnam Bank")}
              </button>

              <button
                className="flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                type="button"
              >
                <Usdt className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                USDT
              </button>

              <button
                className="flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                type="button"
              >
                <MomoFill className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                MOMO QR
              </button>

              <button
                className="flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                type="button"
              >
                <ZalopayFill className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                ZaloPay
              </button>

              {bank && (
                <button
                  className="flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                  type="button"
                >
                  <Card className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                  {t("Bank Transfer")}
                </button>
              )}

              {crypto && (
                <button
                  className="flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                  type="button"
                >
                  <Card className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                  {t("USDT Transfer")}
                </button>
              )}
            </div>

            <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

            <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />

            <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
              {t("Recharge")}
            </SubmitButton>
          </div>
        </PreviewContainer>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">4. Cách rút tiền</h2>

        <p className="text-[0.625rem]">Nhấp vào Biểu tượng Ví, Nhấp vào nút Rút tiền.</p>

        <PreviewContainer>
          <div className="space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
            <div className="flex items-center gap-2">
              <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
            </div>

            <Suspense fallback={<Skeleton className="h-10 rounded-md" />}>
              <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
                <CashLine size={rem(16)} />
                <span className="text-sm text-black">
                  {format(176627, {
                    style: "currency",
                  })}
                </span>
              </div>
            </Suspense>

            <div className="flex gap-3 text-xs font-bold tracking-wide text-white">
              <NextLink className="inline-flex w-0 grow gap-3 rounded-lg bg-blue-500 p-3" href="/wallet/withdraw">
                {t("Withdraw")}
                <Cash className="ml-auto" size={rem(14)} />
              </NextLink>
              <NextLink className="inline-flex w-0 grow gap-3 rounded-lg bg-blue-500 p-3" href="/wallet/recharge">
                {t("Recharge")}
                <Card className="ml-auto" size={rem(14)} />
              </NextLink>
            </div>
          </div>
        </PreviewContainer>

        <ul className="text-[0.625rem]">
          <li>Nhập số tiền rút</li>
          <li>Đảm bảo tổng số tiền đặt cược của bạn cho đến khi bằng 0</li>
        </ul>

        <PreviewContainer>
          <div className="space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
            <div className="flex gap-3 text-xs font-bold tracking-wide">
              <button
                className="inline-flex w-0 grow gap-1.5 rounded-lg px-2.5 py-3 text-blue-500 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                data-state="selected"
                type="button"
              >
                {t("Bank Card")}
                <Card className="ml-auto" size={rem(14)} />
              </button>
              <button
                className="inline-flex w-0 grow gap-1.5 rounded-lg px-2.5 py-3 text-blue-500 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                type="button"
              >
                USDT
                <Usdt className="ml-auto" size={rem(14)} />
              </button>
            </div>

            <label className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5">
              <span className="text-sm font-bold">
                {format(0, { style: "currency", fractionDigits: 0 }).replaceAll(/\d|\s/g, "")}
              </span>
              <input
                className="w-full text-xs text-black"
                inputMode="numeric"
                name="amount"
                placeholder={t("Please Enter the Withdrawal Amount")}
                required
                type="number"
              />
            </label>
          </div>
        </PreviewContainer>

        <p className="text-[0.625rem]">Chọn tài khoản ngân hàng của bạn hoặc thêm tài khoản ngân hàng của bạn</p>

        <PreviewContainer>
          <div className="-my-3 flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
            <div className="space-y-2.5">
              <span className="text-xs font-bold">{t("Bank Name")}</span>

              <input
                className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                placeholder={`${t("Its required")} *`}
                required
                type="text"
              />
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold">{t("Holder Name")}</span>

              <input
                className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                placeholder={`${t("Its required")} *`}
                required
                type="text"
              />
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold">{t("Account Number")}</span>

              <input
                className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                placeholder={`${t("Its required")} *`}
                required
                type="text"
              />
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold">{t("Mobile")}</span>

              <input
                className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                placeholder={`${t("Its required")} *`}
                required
                type="text"
              />
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold">Email</span>

              <input
                className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                placeholder={`${t("Its required")} *`}
                required
                type="text"
              />
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold">{t("Branch")}</span>

              <input
                className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                placeholder={`${t("Its required")} *`}
                required
                type="text"
              />
            </div>

            <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
              {t("Add Bank Account")}
            </SubmitButton>
          </div>
        </PreviewContainer>

        <p className="text-[0.625rem]">Nhập mật khẩu đăng nhập của bạn</p>

        <PreviewContainer>
          <div className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
            <div className="space-y-2.5">
              <span className="text-xs font-bold">{t("Your password")}</span>

              <PasswordField className="bg-white text-black" placeholder={t("Password")} required />
            </div>

            <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
              {t("Submit")}
            </SubmitButton>
          </div>
        </PreviewContainer>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">5. Lịch sử</h2>

        <p className="text-[0.625rem]">
          Khi việc cá cược hoàn tất, bạn có thể nhấp vào lịch sử trò chơi để xem lịch sử đặt cược của bạn hoặc kiểm tra
          xu hướng biểu đồ.
        </p>

        <PreviewContainer>
          <div className="flex gap-3">
            {LOTTERY_COUNTS.map((value, index) => (
              <button
                className="w-0 grow rounded bg-red-50 py-2.5 text-[0.625rem] font-bold leading-3 data-[state=active]:bg-red-300 data-[state=active]:text-white"
                data-state={index === 3 ? "active" : void 0}
                key={value}
                type="button"
              >
                {`X${value}`}
              </button>
            ))}
            <button
              className="flex-1 rounded bg-red-50 p-2.5 text-[0.625rem] font-bold leading-3 data-[state=active]:bg-red-300 data-[state=active]:text-white"
              type="button"
            >
              {t("Random")}
            </button>
          </div>

          <div className="flex gap-3">
            {LOTTERY_SIZES.map((size, index) => (
              <button
                className={twMerge(
                  "group flex w-0 grow items-center justify-between rounded-lg from-15% to-80% p-3 text-sm font-bold text-white bg-gradient-[177]",
                  size.bg,
                )}
                data-state={index === 1 ? "active" : void 0}
                key={size.value}
                type="button"
              >
                {t(size.name)}
                <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
                  <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-white" />
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-2.5 whitespace-nowrap text-xs font-bold text-blue-500">
            <button
              className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              data-state="selected"
              type="button"
            >
              <History size={rem(16)} />
              {t("Game History")}
            </button>
            <button
              className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              type="button"
            >
              <Chart size={rem(16)} />
              {t("Chart")}
            </button>
            <button
              className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              type="button"
            >
              <CupBold size={rem(16)} />
              {t("My Results")}
            </button>
          </div>

          <div className="-mx-5 space-y-5 overflow-x-auto px-5">
            <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
              <header className="flex gap-4 rounded-lg bg-blue-100 px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
                <span className="w-20 text-left">{t("Period")}</span>
                <span className="flex-1">{t("Size")}</span>
                <span className="flex-1">{t("Result")}</span>
              </header>

              <div className="flex gap-4 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white">
                <span className="w-20 text-left">20240425276387</span>
                <span className="flex-1">{t("Small")}</span>
                <span className="flex flex-1 justify-center">
                  <Ball className="-my-0.5 text-2xl" color="green" size={rem(20)}>
                    {3}
                  </Ball>
                </span>
              </div>
            </div>
          </div>
        </PreviewContainer>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">6. Khuyến mãi</h2>

        <p className="text-[0.625rem]">
          Nếu bạn có đại lý hoặc giới thiệu thành viên , sử dụng tài khoản hội viên của bạn để đăng ký nhận thưởng (yêu
          cầu : hội viên bạn giới thiệu tham gia nạp tiền, bạn có thể nhận phần thưởng )
        </p>

        <PreviewContainer>
          <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5">
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
              data-state="selected"
              type="button"
            >
              <Document />
              {t("Data")}
            </button>
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
              type="button"
            >
              <PeopleTeam20Filled />
              {t("Team")}
            </button>
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
              type="button"
            >
              <Clock />
              {t("History")}
            </button>
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
              type="button"
            >
              <Copy />
              {t("Tutorial")}
            </button>
          </div>

          <div className="flex gap-3 text-[0.5rem]">
            <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
              <p className="flex items-center gap-0.5 rounded-md bg-white px-1 py-1.5">
                <CashLine size={rem(8)} />0
              </p>

              <div className="space-y-0.5">
                <h2 className="text-[0.625rem] font-bold">{t("Yesterday")}</h2>
                <p>{t("Total Commission")}</p>
              </div>
            </div>
            <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
              <p className="flex items-center gap-0.5 rounded-md bg-white px-1 py-1.5">
                <CashLine size={rem(8)} />0
              </p>

              <div className="space-y-0.5">
                <h2 className="text-[0.625rem] font-bold">{t("Direct")}</h2>
                <p>{t("Commission")}</p>
              </div>
            </div>
            <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
              <p className="flex items-center gap-0.5 rounded-md bg-white px-1 py-1.5">
                <CashLine size={rem(8)} />0
              </p>

              <div className="space-y-0.5">
                <h2 className="text-[0.625rem] font-bold">{t("Team")}</h2>
                <p>{t("Commission")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <h2 className="text-xs font-bold">{t("Long Press To Save The QR Code")}</h2>

            <div className="flex gap-3">
              <div className="flex w-0 grow flex-col gap-2 text-[0.5rem] font-bold text-white">
                <button className="rounded-md bg-red-300 p-2" type="button">
                  {t("Copy Invitation Code")}
                </button>
                <button className="rounded-md bg-red-300 p-2" type="button">
                  {t("Copy Link")}
                </button>
              </div>

              <button className="flex w-0 grow justify-center rounded-md bg-black" type="button">
                <NextImage
                  alt="QR Code"
                  className="m-1 size-14"
                  height={56}
                  src="https://api.xosotot.com/storage/qrcodes/01379577-f621-42cf-b254-26e63fd2e4bb.png"
                  width={56}
                />
              </button>
            </div>
          </div>
        </PreviewContainer>

        <p className="text-[0.625rem]">
          Đại lý sẽ nhận được hoa hồng tối thiểu 0,6 % (cấp 1) và 0,18% (cấp 2) từ mỗi giao dịch được thực hiện bởi
          người giới thiệu (Được thêm hàng ngày vào lúc 00:30 sáng.)
        </p>

        <div>
          <PreviewContainer wrap={false}>
            <div className="space-y-2.5 rounded-2xl bg-blue-100 p-1">
              <h2 className="mb-5 flex items-center gap-1.5 text-xs font-bold">
                <Tag className="text-blue-500" />
                {t("Rebate Amount Corresponding Table")}
              </h2>

              <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
                <span className="w-14 grow">{t("Agent Level")}</span>
                <span className="w-16 grow">{t("Total Referrals")}</span>
                <span className="w-10 grow">{t("Total Bet")}</span>
                <span className="w-10 grow">{t("Recharge")}</span>
              </div>

              {TUTORIAL_COMMISSIONS.map((commission) => (
                <div
                  className="flex gap-2.5 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white"
                  key={commission.id}
                >
                  <span className="w-14 grow">{commission.name}</span>
                  <span className="w-16 grow">{commission.total_referral}</span>
                  <span className="w-10 grow">
                    {format(commission.total_bet, {
                      style: "currency",
                      notation: "compact",
                    })}
                  </span>
                  <span className="w-10 grow">
                    {format(commission.recharge, {
                      style: "currency",
                      notation: "compact",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </PreviewContainer>

          <PreviewContainer wrap={false}>
            <div className="space-y-2.5 rounded-2xl bg-blue-100 p-1">
              <h2 className="mb-5 flex items-center gap-1.5 text-xs font-bold">
                <Calendar className="text-blue-500" />
                {t("Commission Calculation Method (Lottery)")}
              </h2>

              <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
                <span className="w-12 grow">{t("Hierarchy")}</span>
                <span className="w-10 grow">{t("Tier {value}", { value: 1 })}</span>
                <span className="w-10 grow">{t("Tier {value}", { value: 2 })}</span>
                <span className="w-10 grow">{t("Tier {value}", { value: 3 })}</span>
                <span className="w-10 grow">{t("Tier {value}", { value: 4 })}</span>
                <span className="w-10 grow">{t("Tier {value}", { value: 5 })}</span>
                <span className="w-10 grow">{t("Tier {value}", { value: 6 })}</span>
              </div>

              {TUTORIAL_COMMISSIONS.map((commission) => (
                <div
                  className="flex gap-2.5 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white"
                  key={commission.id}
                >
                  <span className="w-12 grow">{commission.name}</span>
                  <span className="w-10 grow">{commission.tier_1}</span>
                  <span className="w-10 grow">{commission.tier_2}</span>
                  <span className="w-10 grow">{commission.tier_3}</span>
                  <span className="w-10 grow">{commission.tier_4}</span>
                  <span className="w-10 grow">{commission.tier_5}</span>
                  <span className="w-10 grow">{commission.tier_6}</span>
                </div>
              ))}
            </div>
          </PreviewContainer>
        </div>

        <p className="text-[0.625rem]">
          Nếu giao dịch tích lũy của Người giới thiệu đạt đến một mục tiêu nhất định, đại lý sẽ nhận được thêm tiền
          thưởng với các khoản giảm giá sau.
        </p>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">7. Quên mật khẩu</h2>

        <p className="text-[0.625rem]">Bấm vào Quên mật khẩu</p>

        <PreviewContainer>
          <div className="flex flex-col gap-2.5">
            <SubmitButton className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]">
              {t("Log In")}
            </SubmitButton>

            <NextLink
              className="flex w-full justify-center rounded-lg from-red-700 from-15% to-red-300 to-80% p-3 font-bold text-white bg-gradient-[177]"
              href="/registration"
            >
              {t("Registration")}
            </NextLink>

            <div className="flex gap-2.5 text-[0.625rem] font-bold text-white">
              <NextLink
                className="flex w-0 grow items-center justify-center gap-1 rounded-lg bg-[#EC4737] p-3"
                href="#"
              >
                <Google className="rounded-full bg-white p-1" size={rem(24)} />
                {`${t("Log in with")} Google`}
              </NextLink>
              <NextLink className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#4678E3] p-3" href="#">
                <Telegram size={rem(24)} />
                {`${t("Log in with")} Telegram`}
              </NextLink>
            </div>

            <NextLink
              className="flex w-full justify-center rounded-lg p-3 text-xs text-gray-800 ring-2 ring-red-300"
              href="/forgot-password"
            >
              {t("Forgot Password")}
            </NextLink>
          </div>
        </PreviewContainer>

        <p className="text-[0.625rem]">Điền số điện thoại di động của bạn</p>

        <PreviewContainer>
          <p className="w-8/12 text-sm">{t("Enter your details to enter your personal account")}</p>

          <div className="flex flex-col gap-2.5">
            <div className="flex gap-3 rounded-lg bg-blue-100 px-3 py-2">
              <label className="relative pr-3">
                <select
                  autoComplete="tel-country-code"
                  className="appearance-none bg-transparent py-1"
                  name="tel-country-code"
                  required
                >
                  {AVAILABLE_COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>{`+${code}`}</option>
                  ))}
                </select>
                <CaretDownFill className="absolute right-0 top-2.5" size={rem(12)} />
              </label>
              <div className="w-px bg-black" />
              <input
                autoComplete="tel-national"
                className="flex-1 bg-transparent py-2 text-xs"
                inputMode="numeric"
                name="tel-national"
                placeholder={t("Enter you phone")}
                required
                type="number"
              />
            </div>
          </div>
        </PreviewContainer>

        <p className="text-[0.625rem]">Bấm OTP hệ thống sẽ gửi mã xác nhận đến bạn</p>

        <PreviewContainer className="py-2">
          <div className="flex gap-3 rounded-lg bg-blue-100 px-3 py-2">
            <input
              autoComplete="one-time-code"
              className="flex-1 bg-transparent py-2 text-xs"
              name="code"
              placeholder={t("Verification Code")}
              required
              type="text"
            />
            <OneTimePassword action={reset as never} className="text-xs font-bold text-blue-500" />
          </div>
        </PreviewContainer>

        <p className="text-[0.625rem]">Nhập mật khẩu mới mạnh nhất và nhấp vào Gửi.</p>

        <PreviewContainer className="py-2">
          <PasswordField autoComplete="new-password" name="password" placeholder={t("Your password")} required />
        </PreviewContainer>

        <p className="text-[0.625rem]">
          Nếu không nhận được OTP vui lòng liên hệ bộ phận chăm sóc khách hàng ngay lập tức.
        </p>

        <PreviewContainer className="py-2">
          <ButtonLink href="/customer">
            <CustomerService2Fill className="my-0.5" size={rem(16)} />
            {t("Customer Service")}
          </ButtonLink>
        </PreviewContainer>
      </div>

      <div className="rounded-md-lg space-y-4 rounded-xl bg-blue-100 px-3 py-4">
        <h2 className="text-sm font-bold text-blue-500">8. Về chúng tôi</h2>

        <p className="text-[0.625rem]">
          Nhấp vào Giới thiệu để biết thêm chi tiết về Chính sách quyền riêng tư và Thỏa thuận tiết lộ rủi ro.
        </p>

        <PreviewContainer>
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold text-blue-500 opacity-40">{t("Settings")}</h2>

            <ButtonLink className="opacity-40" href="/profile/reset">
              <BaselineLock className="my-0.5" size={rem(16)} />
              {t("Account Security")}
            </ButtonLink>
            <ButtonLink className="opacity-40" href="/tutorial">
              <QuestionFill className="my-0.5" size={rem(16)} />
              {t("Beginner Tutorial")}
            </ButtonLink>
            <ButtonLink href="/about">
              <InfoFilled className="my-0.5" size={rem(16)} />
              {t("About")}
            </ButtonLink>
            <ButtonLink className="opacity-40" href="/customer">
              <CustomerService2Fill className="my-0.5" size={rem(16)} />
              {t("Customer Service")}
            </ButtonLink>
          </div>

          <div className="flex flex-col opacity-40">
            <SubmitButton className="rounded-lg bg-red-300 p-3 text-sm font-bold text-white">
              {t("Logout")}
            </SubmitButton>
          </div>
        </PreviewContainer>

        <PreviewContainer className="gap-2.5 py-2">
          <ButtonLink href="/about/privacy-policy">{t("Privacy Policy")}</ButtonLink>
          <ButtonLink href="/about/term-of-use">{t("Term of Use")}</ButtonLink>
          <ButtonLink href="/about/risk-disclosure-agreement">{t("Risk Disclosure Agreement")}</ButtonLink>
        </PreviewContainer>
      </div>
    </>
  );
}
