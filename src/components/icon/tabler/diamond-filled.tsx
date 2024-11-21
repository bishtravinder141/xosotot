import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function DiamondFilled(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 14 14">
      <path d="M10.5 2.33333C10.5878 2.33333 10.6745 2.35316 10.7536 2.39134C10.8327 2.42952 10.9021 2.48506 10.9568 2.55383L10.9999 2.61683L12.7499 5.53349C12.8072 5.62913 12.8359 5.7392 12.8326 5.85064C12.8293 5.96209 12.7941 6.07026 12.7313 6.16233L12.6846 6.22241L7.70877 11.7833C7.61637 11.8776 7.50609 11.9525 7.38439 12.0035C7.26268 12.0546 7.13201 12.0809 7.00002 12.0808C6.76668 12.0808 6.5421 11.9992 6.35252 11.8376L6.27377 11.7641L1.31543 6.22241C1.24084 6.13918 1.19173 6.03627 1.17394 5.92593C1.15615 5.81558 1.17044 5.70245 1.2151 5.6L1.2501 5.53291L3.00768 2.60341L3.04502 2.55091C3.07178 2.51775 3.1021 2.48763 3.13543 2.46108L3.18735 2.42375L3.23868 2.39458L3.26785 2.38116L3.30285 2.36658L3.36643 2.34791L3.43177 2.33624L3.50002 2.33333H10.5ZM5.31652 4.63341C5.1839 4.554 5.02519 4.53046 4.87524 4.56798C4.72529 4.60549 4.59636 4.70099 4.51677 4.83349L4.16677 5.41683L4.13177 5.4845C4.08712 5.58744 4.07311 5.70108 4.09143 5.81179C4.10974 5.9225 4.1596 6.02558 4.23502 6.10866L5.40168 7.39199L5.45418 7.44333C5.56216 7.53573 5.70016 7.58553 5.84226 7.58338C5.98437 7.58123 6.1208 7.52728 6.22593 7.43166L6.27668 7.37916C6.36908 7.27118 6.41889 7.13318 6.41674 6.99108C6.41459 6.84898 6.36064 6.71255 6.26502 6.60741L5.38943 5.64491L5.5166 5.43316L5.54868 5.37308C5.6073 5.24275 5.61604 5.09544 5.57325 4.9591C5.53045 4.82275 5.4391 4.70686 5.31652 4.63341Z" />
    </svg>
  );
}
