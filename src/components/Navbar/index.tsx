"use client";

import { NavbarProps } from "@/types";
import Link from "next/link";
import { LogoButton } from "../Buttons/LogoButton";
import { AddIcon } from "../Icons/AddIcon";
import { ListIcon } from "../Icons/ListIcon";
import WCGIcon from "../Icons/WCGIcon";

export function Navbar(props: NavbarProps) {
  return (
    <>
      <div className="nav">
        <div className="nav-wrapper">
          <div className="nav-content">
            <Link href="/">
              <WCGIcon />
            </Link>

            <input
              className="search-input"
              type="text"
              value={props.value}
              onChange={props.onChange}
              onFocus={props.onFocus}
              placeholder="Search OMDb"
            />

            <div className="nav-buttons">
              <Link className="pr-2" href="/list">
                <ListIcon />
              </Link>
              <LogoButton onClick={props.onAddMovie}>
                <AddIcon />
              </LogoButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
