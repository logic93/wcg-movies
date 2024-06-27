"use client";

export function LogoButton(props: any) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
