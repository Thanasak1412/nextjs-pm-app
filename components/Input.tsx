import { DetailedHTMLProps, InputHTMLAttributes, HTMLProps } from "react";
import clsx from "clsx";

type IProps = {
  className: HTMLProps<HTMLElement>["className"];
};

type Props = IProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ className, ...props }: Readonly<Props>) {
  return (
    <input
      className={clsx(
        "w-full border-2 border-solid border-gray text-lg px-6 py-2 rounded-3xl",
        className
      )}
      {...props}
    />
  );
}
