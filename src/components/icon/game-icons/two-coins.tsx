import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function TwoCoins(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 14 14">
      <path d="M7.22963 2.59794C6.25619 2.5963 5.03666 2.90391 3.83353 3.53009C2.63232 4.15626 1.68021 4.97657 1.12131 5.77774C0.562129 6.57618 0.410918 7.31993 0.685996 7.8504C0.961347 8.37813 1.65752 8.68165 2.63342 8.68165C3.60932 8.68438 4.82885 8.3754 6.02924 7.75196C7.23236 7.12579 8.18393 6.30274 8.74174 5.5043C9.30229 4.70587 9.44994 3.96212 9.1765 3.43165C8.90033 2.90391 8.2058 2.59794 7.22963 2.59794ZM9.74252 4.51993C9.64682 4.93829 9.439 5.36759 9.14643 5.78595C8.52846 6.66915 7.51947 7.53048 6.25619 8.18673C4.99291 8.84571 3.71049 9.17657 2.63314 9.17657C2.12455 9.17657 1.65314 9.10001 1.25584 8.93868L1.54541 9.49649C1.82103 10.027 2.51529 10.3305 3.49174 10.3305C4.46791 10.3305 5.68744 10.0242 6.88783 9.39806C8.09096 8.77462 9.04252 7.95157 9.60033 7.1504C10.1581 6.35196 10.3113 5.60821 10.0351 5.08048L9.74252 4.51993ZM10.53 4.9793C10.8363 5.70938 10.5902 6.59805 10.005 7.43204C9.48822 8.17305 8.69799 8.8922 7.71908 9.49376C8.0226 9.52657 8.33978 9.54298 8.66244 9.54298C10.016 9.54298 11.241 9.25313 12.105 8.80196C12.9718 8.35079 13.4476 7.76016 13.4476 7.16407C13.4476 6.56798 12.9718 5.97735 12.105 5.52618C11.6648 5.29649 11.1288 5.10782 10.53 4.9793ZM13.4476 8.3918C13.1687 8.7172 12.7859 9.0043 12.3347 9.23946C11.3777 9.73712 10.0871 10.0352 8.66244 10.0352C8.08275 10.0352 7.52494 9.98594 7.00268 9.89298C6.3683 10.2129 5.73119 10.4508 5.11869 10.6066C5.1515 10.6258 5.18432 10.6422 5.21986 10.6613C6.08393 11.1125 7.30893 11.4024 8.66244 11.4024C10.016 11.4024 11.241 11.1125 12.105 10.6613C12.9718 10.2102 13.4476 9.61954 13.4476 9.02345V8.3918Z" />
    </svg>
  );
}
