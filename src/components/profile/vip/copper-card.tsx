import background from "@assets/images/vip/copper-background.png";
import VipCard from "@components/profile/vip/card";

type CopperVipCardProps = {
  level: number;
  className?: string;
  experience: {
    to: number;
    from: number;
    current: number;
  };
};

export default function CopperVipCard(props: CopperVipCardProps) {
  return (
    <VipCard
      {...props}
      background={background.src}
      message={{ background: "#D84E36" }}
      track={{ background: "#D74129" }}
    />
  );
}
