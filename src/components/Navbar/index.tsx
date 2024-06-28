import { NavbarProps } from "@/types";
import Link from "next/link";
import { LogoButton } from "../Buttons/LogoButton";
import { AddIcon } from "../Icons/AddIcon";
import { ListIcon } from "../Icons/ListIcon";
import TrashIcon from "../Icons/TrashIcon";
import WCGIcon from "../Icons/WCGIcon";

export function Navbar({
  value,
  onChange,
  onAddMovie,
  onDeleteAll,
  onFocus,
  showDelete = false,
  isMainPage = true,
}: NavbarProps) {
  return (
    <div className="nav">
      <div className="nav-wrapper">
        <div className="nav-content">
          <Link href="/">
            <WCGIcon />
          </Link>

          <input
            className={`search-input ${isMainPage ? "visible" : "invisible"}`}
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            placeholder="Search OMDb"
          />

          <div className="nav-buttons">
            {isMainPage && (
              <Link href="/list" className="pr-4">
                <ListIcon />
              </Link>
            )}

            {onAddMovie && (
              <LogoButton onClick={onAddMovie}>
                <AddIcon />
              </LogoButton>
            )}

            {showDelete && (
              <LogoButton onClick={onDeleteAll}>
                <TrashIcon />
              </LogoButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
