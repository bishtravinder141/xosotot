import background from "@assets/images/vip/gold-background.png";
import VipCard from "@components/profile/vip/card";

type GoldVipCardProps = {
  level: number;
  className?: string;
  experience: {
    to: number;
    from: number;
    current: number;
  };
};

export default function GoldVipCard(props: GoldVipCardProps) {
  return (
    <VipCard
      {...props}
      background={background.src}
      message={{ background: "#E65F1D" }}
      track={{ background: "#EA2424" }}
    />
  );
}
