"use client";

import { NavbarProps } from "@/types";
import Link from "next/link";
import { LogoButton } from "../Buttons/LogoButton";
import { AddIcon } from "../Icons/AddIcon";
import { ListIcon } from "../Icons/ListIcon";
import { MovieIcon } from "../Icons/MovieIcon";

export function Navbar(props: NavbarProps) {
  return (
    <>
      <div className="nav">
        <div className="nav-wrapper">
          <div className="nav-content">
            <Link href="/">
              <MovieIcon />
            </Link>

            <input
              className="search-input"
              type="text"
              value={props.value}
              onChange={props.onChange}
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
