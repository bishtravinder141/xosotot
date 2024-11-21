import type { PropsWithChildren, ReactElement } from "react";

type RegistrationLayoutProps = PropsWithChildren<{
  intercepting: ReactElement;
}>;

export default function RegistrationLayout(props: RegistrationLayoutProps) {
  return (
    <>
      {props.children}
      {props.intercepting}
    </>
  );
}
