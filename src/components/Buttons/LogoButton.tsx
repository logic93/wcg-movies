"use client";

import { LogoButtonProps } from "@/types";

export function LogoButton(props: LogoButtonProps) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
