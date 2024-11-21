import dayjs, { extend } from "dayjs";
import "dayjs/locale/vi";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

declare module "dayjs" {
  interface Dayjs {
    // eslint-disable-next-line @typescript-eslint/method-signature-style -- -
    toDateString(): string;

    // eslint-disable-next-line @typescript-eslint/method-signature-style -- -
    toDateTimeString(): string;
  }
}

extend(utc);
extend(timezone);
extend(duration);
extend(function plugin(_, dayjsClass) {
  dayjsClass.prototype.toDateString = function toDateString() {
    return this.format("MM-DD-YYYY");
  };

  dayjsClass.prototype.toDateTimeString = function toDateTimeString() {
    return this.format("YYYY-MM-DD HH:mm:ss");
  };
});

export default dayjs;
