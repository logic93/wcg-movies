import { OMDBbDropdownProps } from "@/types";

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
                    <img
                      src={item?.Poster}
                      width={40}
                      height={60}
                      alt={`${item.Title} Poster`}
                    />
                    <h2 className="ml-2 font-bold">
                      {item.Title} ({item.Year})
                    </h2>
                  </div>
                  <div></div>
                </li>
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
