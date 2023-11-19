import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Readonly<Props>) {
  return (
    <div
      className={clsx("rounded-3xl bg-white drop-shadow-lg px-10", className)}
    >
      {children}
    </div>
  );
}
