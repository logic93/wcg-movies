import { OMDBbDropdownProps } from "@/types";
import Image from "next/image";

import PosterPlaceholder from "@/app/assets/images/poster-placeholder.png";

export default function OMDbDropdown(props: OMDBbDropdownProps) {
  return (
    <div className="omdb-container" onClick={props.onClose}>
      <div className={`omdb-content ${props.isVisible ? "show" : "hide"}`}>
        {props.isLoading ? (
          <div className="flex h-[40rem] items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <ul className="omdb-list">
            {props.data?.map((item, index) => (
              <button
                key={index}
                className="omdb-button"
                onClick={() => props.onClick(item)}
              >
                <li className="omdb-item">
                  <div className="omdb-info">
                    <div className="h-full">
                      <Image
                        src={item?.Poster || PosterPlaceholder}
                        width={40}
                        height={60}
                        alt={`${item.Title} Poster`}
                        className="h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-start py-2 pl-3">
                      <h1 className="font-bold">{item.Title}</h1>
                      <p className="text-slate-400">{item.Year}</p>
                    </div>
                  </div>
                </li>
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
