import { ReactNode } from "react";
import Logo from "@/components/logo";

export default function NextLayout({ children }: { children: ReactNode }) {
  return (
    <div className={""}>
      <Logo />
      {children}
    </div>
  );
}
