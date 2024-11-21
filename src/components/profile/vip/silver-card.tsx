import background from "@assets/images/vip/silver-background.png";
import VipCard from "@components/profile/vip/card";

type SilverVipCardProps = {
  level: number;
  className?: string;
  experience: {
    to: number;
    from: number;
    current: number;
  };
};

export default function SilverVipCard(props: SilverVipCardProps) {
  return (
    <VipCard
      {...props}
      background={background.src}
      message={{ background: "#6B66A2" }}
      track={{ background: "#7B63E5" }}
    />
  );
}
