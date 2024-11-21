import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function Bonus(props: IconProps) {
  const { size, children, ...attrs } = props;

  return (
    <svg height={size ?? "2.375em"} width={size ?? "2.375em"} {...attrs} fill="#FFF261" viewBox="0 0 44 44">
      <path d="M0 35.6803V0H44V35.6803L22.5 44L0 35.6803Z" fill="#EC4737" />
      <path d="M1 1H43V34.8385L22.5044 43.0367L1 34.8446V1ZM2 2V34.1554L22.4956 41.9633L42 34.1615V2H2Z" />
      <path d="M13.5605 6.53604C13.1071 7.3422 12.8551 8.21554 12.8048 9.22323H19.2204H22.0084H24.7796H31.212C31.1449 8.21554 30.8929 7.3422 30.4395 6.53604C29.9356 5.62911 29.1631 4.80616 28.1218 4H22.0084H15.8782C14.8369 4.80616 14.0644 5.62911 13.5605 6.53604ZM11.7467 9.22323C11.8139 8.03079 12.1162 6.9895 12.6536 6.03219C13.0567 5.31001 13.5941 4.63821 14.2827 4H13.7453C12.1833 4.62141 11.2428 5.3268 10.7054 6.21693C10.2183 7.0063 10.0504 7.9972 10 9.22323H11.7467ZM11.7467 22.4409V10.2645H10V22.4409H11.7467ZM24.2589 12.5318V10.2645H22.0084H19.7411V12.5318C19.7411 13.1533 19.993 13.7075 20.4129 14.1274C20.816 14.5304 21.387 14.7824 22.0084 14.7824C22.6298 14.7824 23.184 14.5304 23.6039 14.1274C24.007 13.7075 24.2589 13.1533 24.2589 12.5318ZM22.0084 11.4738C22.5794 11.4738 23.0497 11.944 23.0497 12.5318C23.0497 13.1029 22.5794 13.5731 22.0084 13.5731C21.4206 13.5731 20.9671 13.1029 20.9671 12.5318C20.9671 11.944 21.4206 11.4738 22.0084 11.4738ZM31.2288 22.4409V10.2645H25.3002V12.5318C25.3002 13.4388 24.9307 14.2617 24.3429 14.8663C23.7383 15.4542 22.9153 15.8237 22.0084 15.8237C21.1015 15.8237 20.2617 15.4542 19.6739 14.8663C19.0693 14.2617 18.6998 13.4388 18.6998 12.5318V10.2645H12.788V22.4409H31.2288ZM34 10.2645H32.2701V22.4409H34V10.2645ZM31.3632 6.03219C31.8838 6.9895 32.1861 8.03079 32.2533 9.22323H34C33.9664 7.9972 33.7817 7.0063 33.2946 6.21693C32.7572 5.3268 31.8335 4.62141 30.2715 4H29.7341C30.4059 4.63821 30.9433 5.31001 31.3632 6.03219Z" />
      {typeof children !== "undefined" && (
        <text
          className="font-bold"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize={12}
          textAnchor="middle"
          x="22"
          y="31.5"
        >
          {children}
        </text>
      )}
    </svg>
  );
}