"use client";

import advances from "@assets/images/vip/advances.png";
import { rem } from "@lib/utils";
import { forwardRef } from "react";

const positions = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
];

type ProfileAdvanceProps = {
  size: number;
  level: number;
  className?: string;
};

const ProfileAdvance = forwardRef<HTMLDivElement, ProfileAdvanceProps>(function ProfileAdvance(props, ref) {
  const level = Math.max(1, Math.min(positions.length, props.level)) - 1;

  return (
    <div
      className={props.className}
      ref={ref}
      style={{
        width: rem(props.size),
        height: rem(props.size),
        backgroundSize: `${props.size / 4}rem`,
        backgroundImage: `url(${advances.src})`,
        backgroundPositionX: rem(positions[level].x * -props.size),
        backgroundPositionY: rem(positions[level].y * -props.size),
      }}
    />
  );
});

export default ProfileAdvance;
