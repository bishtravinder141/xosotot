import BottomAppbar from "@components/layout/bottom-appbar";
import type { PropsWithChildren, ReactElement } from "react";

type RegistrationInterceptingLayoutProps = PropsWithChildren<{
  navbar: ReactElement;
}>;

export default function RegistrationInterceptingLayout(props: RegistrationInterceptingLayoutProps) {
  return (
    <div className="fixed inset-0 z-snackbar overflow-y-auto bg-white">
      {props.navbar}

      <div className="container scroll-mt-16 space-y-5 py-3 mb-safe-offset-32 mt-safe-offset-16">{props.children}</div>

      <BottomAppbar />
    </div>
  );
}
