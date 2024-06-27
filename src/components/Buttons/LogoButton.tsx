"use client";

import { LogoButtonProps } from "@/types";

export function LogoButton(props: LogoButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
